import React, { useState,useContext ,useEffect} from 'react'
import './login.css'
import {v4 as uuidv4} from 'uuid'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import rooms from '../data/rooms'
import CurrUserContext from '../components/CurrUserContext'
import GoogleLogin from 'react-google-login'
import { set } from 'mongoose'
import UsersContext from '../components/UsersContext'

const Login = () => {
    const [users,setUsers] = useContext(UsersContext)
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    const [login,setLogin]=useState({
        name:"",
        password:"",
        room:""
    })
    const [done,setDone]=useState(false)

    

    useEffect(() => {
        fetch('http://localhost:8000/users').then(res=>{
            if(res.ok)return res.json()
                }).then(jsonRes=>{
            setUsers(jsonRes)
            })
            console.log(currUser)
        if(currUser.name!==''){
            if(!users.map(i=>i.name).includes(currUser.name)){
                axios.post("http://localhost:8000/new",currUser)
            }else{
                axios.put('http://localhost:8000/user',currUser)
            }
            setDone(true)
        } 
        
    }, [currUser])

    
        const responseGoogle=(res)=>{
            console.log(res)
            let room=document.getElementById('room').value
            setCurrUser({...currUser,name:res.profileObj.givenName, room:room,password:res.accessToken, avatar:res.profileObj.imageUrl,isSignedIn:true})
            
          }
        const  loginUser=async(e)=>{
            e.preventDefault()
            if(login.name!==''){
                const fetchUser=users.filter(i=>i.name===login.name)
                console.log(fetchUser)
                if(fetchUser.length===0){
                    setLogin({...login,name:'',password:''})   
                } else{
                    
                    if(fetchUser[0].password===login.password){
                        console.log(login)
                        await setCurrUser({...currUser,name:login.name, room:login.room,password:login.password, avatar:"",isSignedIn:true})
                        await axios.put('http://localhost:8000/user',currUser)
                        
                    }else{
                        setLogin({...login,name:'',password:''})   
                    }
                } 
                    
                
            }
            
        }
        const updateInput=()=>{
            const loginName=document.getElementById('username').value
            const loginPassword=document.getElementById('password').value
            const room=document.getElementById('room').value
            setLogin({...login,name:loginName,password:loginPassword,room:room})
        }
    return (
        <div className='login_container'>
            <form >
                <h2>Login</h2>
                <div className='loginInput'>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" value={login.name} onChange={updateInput}  placeholder='username'  autoComplete='off' required/>
                </div>
                <div className='loginInput'>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" value={login.password} onChange={updateInput} placeholder='username' placeholder='password' required/>
                </div>
                <div className='loginInput'>
                    <label htmlFor="room">ChatRoom:</label>
                    <select name="room" id="room" value={login.room} onChange={updateInput}>
                        {rooms.map(room=><option  key={uuidv4()}>{room}</option>)}      
                    </select>
                </div>
              <div className="loginBtn">
                  <Link  to='/signin' className='btn' id='signIn' >Sign in</Link>
                  <button className='btn' id='login' onClick={loginUser}>Login</button>
              </div>
                <GoogleLogin 
                    clientId="975117729259-pshu9p1c915crtu22crg5thjf0nlrn0q.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                >
                </GoogleLogin>
                
          </form>
          {done && <Redirect to='/window'/>}
        </div>
    )
}

export default Login
