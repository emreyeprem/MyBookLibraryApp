import React, { Component } from 'react';


export class UpdateBook extends Component {

  constructor(props){
   super(props)
   this.state={
     books: []
   }
 }

  componentDidMount() {

let bookId = this.props.match.params.bookId
fetch('http://localhost:3001/api/getBooks').then((response)=>{
  return response.json()
}).then((json)=>{
    let bookToUpdate= json.find((book)=>{
      return book.id == bookId
    })
    console.log(bookToUpdate)
    this.setState({
      books:bookToUpdate
    })

})

}
//function updateBook(e){}  kisa hali..
UpdateBook = (e) => {
  this.setState({
    books : {
     ...this.state.books,
    [e.target.name] : e.target.value

    }
  })

}


  sendUpdateReq = () => {

    fetch('http://localhost:3001/updateBook/'+this.state.books.id,{
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
     body: JSON.stringify({
       title : this.state.books.booktitle,
       publisheddate : this.state.books.publisheddate,
       author : this.state.books.author,
       imageUrl : this.state.books.imageurl,
       category : this.state.books.category

     })
   }).then((response) => {
     return response.json()
   }).then((json) => {
     console.log(json)
     if(json.success == true){
       this.props.history.push('/')
     } else{}

   })

  }


 render() {
   return (

     <div className="inputContainer">
      <h2 className="addBook">Update Book Info</h2><hr/>
      <label>Enter Book Title :</label>
      <input className="updateBoxes" onChange={this.UpdateBook} type="text" name="booktitle" defaultValue={this.state.books.booktitle}/><br/>

      <label>Enter Published Date :</label>
      <input className="updateBoxes" onChange={this.UpdateBook} type="date" name="publisheddate" defaultValue={this.state.books.year}/><br/>

      <label>Enter Author :</label>
      <input className="updateBoxes" onChange={this.UpdateBook} type="text" name="author" defaultValue={this.state.books.author}/><br/>

      <label>Enter Img URL :</label>
      <input className="updateBoxes" onChange={this.UpdateBook} type="text" name="imageurl" defaultValue={this.state.books.imageurl}/><br/>

      <label>Choose genre of the book</label>
      <select name="category" onChange={this.UpdateBook}>
       <option selected disabled value>Select an option </option>
       <option value="Fiction">Fiction</option>
       <option value="Romance">Romance</option>
       <option value="Technical">Technical</option>
       <option value="Biography">Biography</option>
      </select>
      <button onClick={this.sendUpdateReq} className="btn btn-warning">Update</button>

      </div>



    )
  }

}
