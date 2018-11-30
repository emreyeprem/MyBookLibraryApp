import React, { Component } from 'react';
import {Header} from './Header'
import {Footer} from './Footer'
import {UpdateBook} from './UpdateBook'
import {AllBooks} from './AllBooks'
import {AddBook} from './AddBook'
import './Main.css';

export class BaseLayout extends Component {

  render() {
    return (

      <div>
          <Header />
              {this.props.children}
          <Footer />

      </div>

    )
  }

}
