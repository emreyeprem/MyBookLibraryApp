import React, { Component } from 'react';
import {setAuthenticationToken} from '../utils'
import axios from 'axios'

export class AllBooks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books : []
    }
  }

  addBookButton = () => {
    this.props.history.push('/add-book')
  }

  componentDidMount() {
    let token = localStorage.getItem('jsonwebtoken')
      console.log(token)
      setAuthenticationToken(token)
      axios.get("http://localhost:3001/api/getBooks").then((res)=> {
        console.log(res.data)
        this.setState({
           books: res.data
           })
      })
    }

   deleteBook = (each) =>{
     console.log('hey')
   fetch('http://localhost:3001/delete-book/'+each.id,{
     method:'delete'
   }).then((response)=>{
     let arr = this.state.books
     let newarr = arr.filter(function(book){
       return each.id != book.id
     })
     this.setState({
       books : newarr
     })
     console.log("success!")
     this.props.history.push('/')
   })

}

edit = (bookId)=>{
  this.props.history.push(`/update-book/${bookId}`)
}

  render() {

     let bookItems = this.state.books.map((each)=>{
       return <div className="card">
     <img id="pictures" className="card-img-top" src={each.imageurl} alt="Card image cap" />
     <div className="card-body">
       <h3 className="card-text">{each.booktitle}</h3>
       <p className="card-text">Author : {each.author}</p>
       <p className="card-text">Category : {each.category}</p>
       <p className="card-text">Published on : {each.publisheddate}</p>
       <button className="btn btn-primary" onClick={this.deleteBook.bind(this,each)}>Delete</button>
       <button className="btn btn-warning" onClick={() => this.edit(each.id)}>Edit</button>
     </div>
     </div>
     })
    return (
      <div>
       <div className="maindiv">
       {bookItems}
      </div>
      <button onClick={this.addBookButton} className="btn btn-warning">Add Book</button>
      </div>
    )
  }

}
