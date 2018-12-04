const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const PORT = 3001
const bcrypt = require('bcryptjs');
var cors = require('cors')
const jwt = require('jsonwebtoken')
// ======== parse application json =====
app.use(bodyParser.json())
app.use(cors())
// ========== to enable CORS ===========
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// ----------------- pg-promise ----------------
const pgp = require('pg-promise')()
const connectionString = "postgres://localhost:5432/book"
const db = pgp(connectionString)

// ---------------------------------------------

app.listen(PORT, function(){
   console.log("Server is started...")
})
// ==========================================================

//--------middleware------------------
function authenticate(req,res,next) {
  // authorization should be lower case
  let authorizationHeader = req.headers["authorization"]
console.log(authorizationHeader)
  console.log("in authenticate function "+ authorizationHeader)
  if(!authorizationHeader) {
    res.status(400).json({error: 'Authorization failed!'})
    return
  }
  // Bearer token
  const token = authorizationHeader.split(' ')[1] // token
  jwt.verify(token,'somesecretkey',function(error,decoded){
    if(decoded){
      userId = decoded.id
      db.one('SELECT id,email,password FROM users WHERE id = $1',[userId]).then((response)=>{
        next()
      }).catch((error)=>{
        res.status(400).json({error: 'User does not exist!'})
      })
    }
  })
}
//----------------------------------------

app.post('/addBook',function(req,res){
   let title = req.body.title
   let author = req.body.author
   let category = req.body.category
   let year = req.body.year
   let image = req.body.image
   db.none('INSERT INTO books (booktitle,publisheddate,imageurl,category,author,userid) VALUES ($1,$2,$3,$4,$5,$6)',[title,year,image,category,author,userId]).then(function(){
     res.json({success:true})
   })
})

app.get('/api/getBooks',authenticate,function(req,res){
  db.any('SELECT id,booktitle,publisheddate,imageurl,category,author FROM books WHERE userid = $1',[userId]).then(function(response){

      res.json(response)

  })
})

app.delete('/delete-book/:id',function(req,res){
  let bookId = req.params.id

db.none('DELETE from books WHERE id=$1',[bookId]).then(function(){
  res.json({success:true})
})
})

app.post('/updateBook/:id',function(req,res){
  let id = req.params.id
  let title = req.body.title
  let publisheddate = req.body.publisheddate
  let author = req.body.author
  let imageUrl = req.body.imageUrl
  let category = req.body.category

  db.none('UPDATE books SET booktitle=$1,author=$2,publisheddate=$3,imageurl=$4,category=$5,userid=$6 WHERE id = $7', [title,author,publisheddate,imageUrl,category,userId,id]).then(()=>{
    console.log("Update is successful!")
    res.json({success:true})
  })
})

app.post('/register',function(req,res){
  let email = req.body.email
  let password = req.body.password

  db.one('SELECT id,email,password FROM users WHERE email= $1',[email]).then(function(user){

    res.json('Opps! This email is already taken. Please try with different credential!')

  }).catch((error) => {
    console.log(error.received)
    if(error.received == 0){
      bcrypt.hash(password, 10, function(err, hash) {

          if(hash) {
               db.none('INSERT INTO users (email,password) VALUES ($1,$2)',[email,hash]).then(()=>{
                 res.json({success: true})   //bu ifade client side da gozukecek response
             // then function'in parametresi bos birakildi, cunku db.none response vermez
           })

          }

      });
    }
  })

})

app.post('/login',function(req,res){
 let email = req.body.email
 let password = req.body.password

db.one('SELECT id,email,password FROM users WHERE email = $1',[email]).then((response)=>{
      console.log('User is found')
     // check for the password
     bcrypt.compare(password,response.password,function(error,result){
       if(result) {
         // password match

         // create a token
         const token = jwt.sign({ id : response.id },"somesecretkey")

         // send back the token to the user
         res.json({token: token})

       } else {
         // password dont match
         res.json('The password you entered is incorrect!')
       }
     })

}).catch((error)=>{
 console.log(error)
 console.log(error.received)
 if(error.received == 0){
    res.json('The email you entered is invalid!')
   }

})
})
