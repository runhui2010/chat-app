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
        password:""
    })
    const [done,setDone]=useState(false)

    

    useEffect(async() => {
       await fetch('http://localhost:8000/users').then(res=>{
            if(res.ok)return res.json()
                }).then(jsonRes=>{
            setUsers(jsonRes)
            if(currUser.name!==''){ 
                if(!jsonRes.map(i=>i.name).includes(currUser.name)){
                    axios.post("http://localhost:8000/new",currUser)
                }
              
                setDone(true)
            } 
            
            })
            
        
    }, [currUser])

    
        const responseGoogle=async(res)=>{
            var temp=[...users]
            if(temp.map(i=>i.name).includes(res.profileObj.givenName)){
                const loginUser=users.filter(i=>i.name=res.profileObj.givenName)
                setCurrUser(loginUser[0])
            }else{
                await axios.post("http://localhost:8000/new",{name:res.profileObj.givenName,password:res.accessToken,avatar:res.profileObj.imageUrl,to:'',groups:'',contacts:'',chatHistory:''})
                setCurrUser({name:res.profileObj.givenName,password:res.accessToken,avatar:res.profileObj.imageUrl})
            } 
          }
          const responseGoogleFailed=()=>{
              console.log("GOOGLe login failed")
          }
        const  loginUser=(e)=>{
            e.preventDefault()
            if(login.name!==''){
                const loginUser=users.filter(i=>i.name===login.name)
                if(loginUser.length===0){
                    setLogin({...login,name:'',password:''})   
                } else{
                    
                    if(loginUser[0].password===login.password){
                        setCurrUser(loginUser[0])
                        
                    }else{
                        setLogin({...login,name:'',password:''})   
                    }
                } 
                    
                
            }
            
        }
        const updateInput=()=>{
            const loginName=document.getElementById('username').value
            const loginPassword=document.getElementById('password').value
            setLogin({...login,name:loginName,password:loginPassword})
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
              <div className="loginBtn">
                  <Link  to='/signin' className='btn' id='signIn' >Sign in</Link>
                  <button className='btn' id='login' onClick={loginUser}>Login</button>
              </div>
                <GoogleLogin 
                    clientId="975117729259-pshu9p1c915crtu22crg5thjf0nlrn0q.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogleFailed}
                    cookiePolicy={'single_host_origin'}
                >
                </GoogleLogin>
                
          </form>
          {done && <Redirect to='/window'/>}
        </div>
    )
}

export default Login
