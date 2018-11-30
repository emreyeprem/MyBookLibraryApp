import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import {BaseLayout} from './components/BaseLayout'
import {Header} from './components/Header'
import {Footer} from './components/Footer'
import {UpdateBook} from './components/UpdateBook'
import {AllBooks} from './components/AllBooks'
import {AddBook} from './components/AddBook'
import {BrowserRouter, Switch, Route} from 'react-router-dom'



ReactDOM.render(

  <BrowserRouter>
 <BaseLayout>
   <Switch>

     <Route exact path="/" component={AllBooks} />
     <Route path="/add-book" component={AddBook} />
     <Route path="/update-book/:bookId" component={UpdateBook} />

   </Switch>
 </BaseLayout>
 </BrowserRouter>



  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
