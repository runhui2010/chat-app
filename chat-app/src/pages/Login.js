import React, { useState,useContext ,useEffect} from 'react'
import './login.css'
import {v4 as uuidv4} from 'uuid'
import {Link} from 'react-router-dom'
import axios from 'axios'
import rooms from '../data/rooms'
import CurrUserContext from '../components/CurrUserContext'

const Login = () => {
    
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    
    useEffect(() => {
        console.log('user:'+currUser.user,'room:'+currUser.room)
    }, [currUser])
    const newUser=(e)=>{
        // e.preventDefault()
        let user=document.getElementById('username').value
        let room=document.getElementById('room').value
        var newUser={name:user,room:room}
        console.log("user:"+newUser.name)
        var temp={...currUser}
        temp.name=user
        temp.room=room
        setCurrUser(temp)
        console.log(temp.user)
        try{
            axios.post("http://localhost:8000/new",newUser)
        }catch(e){
            console.log(e)
        }

        

    }

    return (
        <div className='login_container'>
            <form >
                <label htmlFor="username">username</label>
                <input type="text" name="username" id="username" autoComplete="off" />
                <label htmlFor="room">room</label>
                <select name="room" id="room">
                    {rooms.map(room=><option value={room} key={uuidv4()}>{room}</option>)}      
                </select>
                <Link to="/window" onClick={newUser}>Submit</Link>
            </form>
        </div>
    )
}

export default Login
