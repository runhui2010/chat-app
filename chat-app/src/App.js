
import io from 'socket.io-client'
import {useEffect, useState,useContext} from 'react'
import React from 'react'
import Login from "./pages/Login";
import Window from "./pages/Window";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UserContext from './components/UserContext';


function App() {
  
  // const socket = io("http://localhost:8000");
  // useEffect(() => {
    
  //   socket.emit("msg","first msg")
  // }, [])
 
  const [users,setUsers]=useState([])


  return (
    <Router>
      <Switch>
        <UserContext.Provider value={[users,setUsers]}>
        <Route exact path='/'>
          <Login/>
        </Route>
        <Route path='/window'>
          <Window/>
        </Route>
        </UserContext.Provider>
      </Switch>
    </Router>
     
  );
}

export default App;
