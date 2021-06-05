import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layouts/Header'
import Home from './components/Home'
import Posts from './components/Posts'
import NotFound from './components/NotFound'
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import Post from './components/Post';

import ReactNotifications from 'react-notifications-component';
import "react-notifications-component/dist/theme.css";
import "animate.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <div>
        <ReactNotifications />
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/add" component={AddPost} />
          <Route exact path="/post/edit/:id" component={EditPost} />
          <Route exact path="/posts/:id" component={Post} />

          <Route component={NotFound} />
        </Switch>


      </div>
    </Router>
  )
}

export default App
