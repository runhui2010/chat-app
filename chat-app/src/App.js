
import io from 'socket.io-client'
import {useEffect, useState,useContext} from 'react'
import React from 'react'
import Login from "./pages/Login";
import Window from "./pages/Window";
import GoogleLogin from 'react-google-login'
import { useGoogleLogin } from 'react-use-googlelogin'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CurrUserContext from './components/CurrUserContext';
import SignIn from './pages/SignIn';
import UsersContext from './components/UsersContext';
import GroupsContext from './components/GroupsContext';


function App() {
  const [currUser,setCurrUser]=useState({name:'',password:'',avatar:'',to:''})
  const [users,setUsers]=useState([])
  const [chatGroup,setChatGroup]=useState({name:'',history:null})
  

  return (
    
    <Router>
      <Switch>
        <GroupsContext.Provider value={[chatGroup,setChatGroup]}>
        <UsersContext.Provider value={[users,setUsers]}>
        <CurrUserContext.Provider value={[currUser,setCurrUser]}>
        <Route exact path='/'>
          <Login/>
      </Route>
      <Route path='/signin'>
        <SignIn/>
      </Route>
      <Route path='/window'>
        <Window/>
      </Route>
      </CurrUserContext.Provider>
      </UsersContext.Provider>
      </GroupsContext.Provider>
    </Switch>
  </Router>
        
    
     
  );
}

export default App;
