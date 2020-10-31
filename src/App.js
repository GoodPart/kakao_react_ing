import React, { Component, setState } from 'react';
import KakaoLogin from 'react-kakao-login';
import Kakao from 'kakaojs'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from './Router/Home'
import Detail from './Router/Detail'
import Login from './Router/Login'
import DetailPage from './page/DetailPage'


function App() {
  const isLogin = false;
  return (
    <>
      <Router>
        <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Detail">Detail</Link>
            </li>
          </ul>
      
      
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Detail">
            {isLogin ? <DetailPage /> : <Redirect to='/Login' /> }
            <Detail />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App;
