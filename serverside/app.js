const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const PORT = 3001
// ======== parse application json =====
app.use(bodyParser.json())

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

app.post('/addBook',function(req,res){
   let title = req.body.title
   let author = req.body.author
   let category = req.body.category
   let year = req.body.year
   let image = req.body.image
   db.none('INSERT INTO books (booktitle,publisheddate,imageurl,category,author) VALUES ($1,$2,$3,$4,$5)',[title,year,image,category,author]).then(function(){
     res.json({success:true})
   })
})

app.get('/api/getBooks',function(req,res){
  db.any('SELECT id,booktitle,publisheddate,imageurl,category,author FROM books').then(function(response){

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

  db.none('UPDATE books SET booktitle=$1,author=$2,publisheddate=$3,imageurl=$4,category=$5 WHERE id = $6', [title,author,publisheddate,imageUrl,category,id]).then(()=>{
    console.log("Update is successful!")
    res.json({success:true})
  })
})
