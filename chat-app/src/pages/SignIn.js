import axios from 'axios'
import { set } from 'mongoose'
import React, {useState,useEffect,useContext}from 'react'
import { Link, Redirect } from 'react-router-dom'
import UsersContext from '../components/UsersContext'
const SignIn = () => {
    const [users,setUsers] = useContext(UsersContext)
    const [register,setRegister]=useState({
        username:'',
        password1:'',
        password2:''
    })
    const [newAccount,setNewAccount]=useState({
        name:'',room:'',password:'',avatar:'',isSignedIn:false,socketID:''})
    const createAccount=(e)=>{
           if (register.username===''){
            document.getElementById('username').focus()
            setRegister({...register,username:''})
               e.preventDefault()
            }
           else if(register.password1===''){
            document.getElementById('password1').focus()
            setRegister({...register,password1:''})
               e.preventDefault()
           }
           else if(register.password2==='' || register.password1!==register.password2){
            document.getElementById('password2').focus()
            setRegister({...register,password2:''})
               e.preventDefault()
           }else{
            console.log(register)
            setNewAccount({...newAccount,name:register.username,password:register.password1})
           
           }
           
    }
    useEffect(() => {
        console.log(newAccount)
        console.log(newAccount.name!=='' && !users.map(i=>i.name).includes(newAccount.name))
        if(newAccount.name!=='' && !users.map(i=>i.name).includes(newAccount.name)){
            axios.post("http://localhost:8000/new",newAccount)
            window.location.assign('/')
            
        }
         
        
    }, [newAccount])

    const updateInput=(e)=>{
        const username=document.getElementById('username').value
        const password1=document.getElementById('password1').value
        const password2=document.getElementById('password2').value
        setRegister({...register,username:username,password1:password1,password2:password2})
        
    }
 
    return (
        <div className='login_container'>
            <form >
                <h2>Sign in</h2>
                <div className='loginInput'>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id='username' placeholder='username' onChange={updateInput} value={register.username} required autoComplete="off"/>
                    
                </div>
                <div className='loginInput'>
                    <label htmlFor="password1">Password:</label>
                    <input type="password" name="password1" id="password1" placeholder='password' value={register.password1} onChange={updateInput} required/>
                   
                </div>
                <div className='loginInput'>
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" name="password2" id="password2"  placeholder='confirm password' value={register.password2} onChange={updateInput} required/>
                </div>
                <div className="loginBtn">
                     <button onClick={createAccount}  type='button' className='btn'>create account</button>
                     
                </div>

                
            </form>
        </div>
    )
}

export default SignIn
