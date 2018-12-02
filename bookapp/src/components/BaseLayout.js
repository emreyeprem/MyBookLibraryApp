import React, { Component } from 'react';
import {Header} from './Header'
import {Footer} from './Footer'
import {UpdateBook} from './UpdateBook'
import {AllBooks} from './AllBooks'
import {AddBook} from './AddBook'
import {Login} from './Login'
import {Register} from './Register'
import './Main.css';

import '../images/icons/favicon.ico'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../vendor/animate/animate.css'
import '../vendor/css-hamburgers/hamburgers.min.css'
import '../css/util.css'
import '../css/main.css'


const hideHeaderStyle = {
 display: 'none'
}

const showHeaderStyle = {
 display: 'block'
}

export class BaseLayout extends Component {

 render() {

   let isAuthenticated = false

   let headerStyle = isAuthenticated ? showHeaderStyle : hideHeaderStyle

   return (

     <div>
         <Header headerStyle = {headerStyle} />
             {this.props.children}
         <Footer headerStyle = {headerStyle}/>

     </div>

   )
 }

}
