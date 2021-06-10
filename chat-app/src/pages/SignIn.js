import React, {useState,useEffect}from 'react'
import { Link, Redirect } from 'react-router-dom'
const SignIn = () => {
    
    const username=document.getElementById('username')
    const password1=document.getElementById('password1')
    const password2=document.getElementById('password2')
    const [register,setRegister]=useState({
        username:'',
        password1:'',
        password2:''
    })
    const [newAccount,setNewAccount]=useState({
        name:'',room:'',password:'',avatar:'',isSignedIn:false})
    const createAccount=(e)=>{
        if(username.text==='' || password1.text==='' || password2.text==='')window.location.assign('/')
        
    }
    const updateInput=(e)=>{
        const username=document.getElementById('username').value
        const password1=document.getElementById('password1').value
        const password2=document.getElementById('password2').value
        setRegister({...register,username:username.value,password1:password1.value,password2:password2.value})
        
    }
    useEffect(() => {
        console.log(register)
    }, [register])
    return (
        <div className='login_container'>
            <form >
                <h2>Sign in</h2>
                <div className='loginInput'>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id='username' onChange={updateInput} value={register.username} required/>
                    
                </div>
                <div className='loginInput'>
                    <label htmlFor="password1">Password:</label>
                    <input type="password" name="password1" id="password1" value={register.password1} onChange={updateInput} required/>
                   
                </div>
                <div className='loginInput'>
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" name="password2" id="password2" value={register.password2} onChange={updateInput} required/>
                </div>
                <div className="loginBtn">
                     <button onClick={createAccount}  className='btn'>create account</button>
                </div>

                
            </form>
        </div>
    )
}

export default SignIn
