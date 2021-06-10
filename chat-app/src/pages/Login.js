import React, { useState,useContext ,useEffect} from 'react'
import './login.css'
import {v4 as uuidv4} from 'uuid'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import rooms from '../data/rooms'
import CurrUserContext from '../components/CurrUserContext'
import GoogleLogin from 'react-google-login'
import { set } from 'mongoose'

const Login = () => {
    
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    const [login,setLogin]=useState({
        name:"",
        password:"",
    })

    
    useEffect(() => {
        console.log('user:'+currUser.user,'room:'+currUser.room)

        fetch('http://localhost:8000/users').then(res=>{
            if(res.ok)return res.json()
        }).then(jsonRes=>{
            console.log(jsonRes,jsonRes.map(i=>i.name).includes(currUser.name))
            
            if(!jsonRes.map(i=>i.name).includes(currUser.name)){
                try{
                    axios.post("http://localhost:8000/new",currUser)
                     }catch(e){
                    console.log(e)
                    }
            }
        })
        
    }, [currUser])

    
        const responseGoogle=(res)=>{
            console.log(res)
            let room=document.getElementById('room').value
            setCurrUser({...currUser,name:res.profileObj.givenName, room:room,password:res.accessToken, avatar:res.profileObj.imageUrl,isSignedIn:true})
            
          }
        const loginUser=(e)=>{
            // e.preventDefault()
            const loginName=document.getElementById('username').value
            const loginPassword=document.getElementById('password').value
            setLogin({...login,name:loginName,password:loginPassword})
        }
        useEffect(() => {
            console.log(login)
        }, [login])
    

    return (
        <div className='login_container'>
            <form >
                <h2>Login</h2>
                <div className='loginInput'>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" required/>
                </div>
                <div className='loginInput'>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" required/>
                </div>
                <div className='loginInput'>
                    <label htmlFor="room">ChatRoom:</label>
                    <select name="room" id="room">
                        {rooms.map(room=><option value={room} key={uuidv4()}>{room}</option>)}      
                    </select>
                </div>
              <div className="loginBtn">
                  <Link to='/signin' className='btn'>Sign in</Link>
                  <button className='btn' id='login' onClick={loginUser}>Login</button>
              </div>
                <GoogleLogin 
                    clientId="975117729259-pshu9p1c915crtu22crg5thjf0nlrn0q.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                >
                {currUser.isSignedIn && <Redirect to='/window'/>}
                </GoogleLogin>
          </form>
        </div>
    )
}

export default Login
