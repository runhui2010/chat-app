
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
import CurrUserContext from './components/CurrUserContext';


function App() {
  const [currUser,setCurrUser]=useState({name:'',room:''})
  


  return (
    <Router>
      <Switch>
        <CurrUserContext.Provider value={[currUser,setCurrUser]}>
        <Route exact path='/'>
          <Login/>
        </Route>
        <Route path='/window'>
          <Window/>
        </Route>
        </CurrUserContext.Provider>
      </Switch>
    </Router>
     
  );
}

export default App;
