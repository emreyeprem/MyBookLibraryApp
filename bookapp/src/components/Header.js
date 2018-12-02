import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'

export class Header extends Component {

  render() {
    return (

      <nav style={this.props.headerStyle} className="navbar navbar-light bg-dark justify-content-between text-white">

   <Link to = "/" className="navbar-brand">All Books</Link>
   <Link to = "/" className="navbar-brand cat">Fiction</Link>
   <Link to = "/" className="navbar-brand cat">Romance</Link>
   <Link to = "/" className="navbar-brand cat">Technical</Link>
   <Link to = "/" className="navbar-brand cat">Biography</Link>
  <form className="form-inline">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
      </nav>

    )
  }

}
