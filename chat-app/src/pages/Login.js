import React, { useState,useContext } from 'react'
import './login.css'
import {v4 as uuidv4} from 'uuid'
import {Link} from 'react-router-dom'
import UserContext from '../components/UserContext'

const Login = () => {
    const [users,setUsers]=useContext(UserContext)
    const newUser=()=>{
        let username=document.getElementById('username').value
        let room=document.getElementById('room').value
        var user={id:uuidv4(),name:username,room:room}
        
        var storedUser=JSON.parse(localStorage.getItem('users'))
        if(storedUser==null)storedUser=[]
        storedUser[storedUser.length]=user
        console.log(storedUser)
        setUsers(storedUser)
        localStorage.setItem("users",JSON.stringify(storedUser))
    }

    return (
        <div className='login_container'>
            <form >
                <label htmlFor="username">username</label>
                <input type="text" name="username" id="username"  />
                <label htmlFor="room">room</label>
                <select name="room" id="room">
                    <option value="room1">room1</option>
                    <option value="room2">room2</option>
                    
                </select>
                <Link to="/window" onClick={newUser}>Submit</Link>
            </form>
        </div>
    )
}

export default Login
