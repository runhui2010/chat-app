import { set } from 'mongoose'
import React,{useContext, useEffect,useState,useRef} from 'react'
import rooms from '../data/rooms'
import  './chatWindow.css'
import CurrUserContext from './CurrUserContext'
import moment from 'moment'
import {v4 as uuidv4} from 'uuid'
import io from 'socket.io-client'
import axios from 'axios'
import UsersContext from './UsersContext'
import Avatar from 'react-avatar'

const ChatWindow = () => {
    const ref = useRef()
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    const [users,setUsers]=useContext(UsersContext)
    const [msg,setMsg]=useState({
        text:"",
        sender:'',
        recipient:'',
        time:'',
        socketID:''
    })
    const [chat,setChat]=useState([])
    const [peopleInGroup,setPeopleInGroup]=useState('')
   
    const socket=io.connect('http://localhost:8000'
    )
    
    useEffect(() => {
        socket.on('new',(d)=>{
            socket.emit('name',currUser.name)
            console.log(d)
        })
        return () => {
            socket.off('new',(d)=>{
                console.log(d)
            })
        }
    }, [])
   


useEffect(async() => {
    await axios.put('http://localhost:8000/user',currUser)
    const res=await fetch('http://localhost:8000/users')
    const data=await res.json()
        setUsers(data)
        
    const size=users.filter(i=>i.to===currUser.to)
    console.log(size)
}, [currUser])

useEffect(()=>{
    console.log('msg:'+msg.text)
    
},[msg])

const  sendMsg=async(e)=>{
    e.preventDefault()
    const text=document.getElementById('text').value
    const sender=currUser.name
    const recipient=currUser.room
    const time=moment().format('h:mm:s a')
    const newMsg={text:text,sender:sender,recipient:recipient,time:time}
            setMsg({...msg,text:text,sender:sender,recipient:recipient,time:time})
            document.getElementById('text').value=""
            await socket.emit('msg',newMsg)
    
    document.getElementById('text').focus()
}   


useEffect(() => {
ref.current.scrollIntoView({ behavior: "smooth" })
}, [chat,currUser.room])
        
    return (
        <div className='chat_window'>
            <div className="chat_header">
                <div className='userInfo'>
                    {currUser.avatar===''?<Avatar name={currUser.name} round={true} size='30'/>:<img src={currUser.avatar} alt="" height='40px' style={{borderRadius:'50%'}}/>}
                    <span>{currUser.name}</span>
                    </div>
                    <span id='group'>{currUser.to}</span>
                
            
                {/* <h2>{currUser.room}</h2> */}
            </div>
            <div className="chat_body" >
                {chat.filter(i=>i.recipient===currUser.room).map(m=>
                    <div key={uuidv4()} className={m.sender===currUser.name?'msg own':m.sender==='Admin'?'msg adminMsg':'msg'}>
                        <p className='sender'>{m.sender==='Admin'?'':m.sender}</p>
                        <h2 className={m.sender===currUser.name?'text':m.sender==='Admin'?'admin':'text others'}>{m.text}</h2>
                        <p className='time' >{m.time}</p>
                    </div>
                    )}
                    <p ref={ref} style={{margin:0}}></p>
            </div>
            <form className="chat_footer" onSubmit={sendMsg}>
                <input type="text" id="text" placeholder='text your message' autoComplete='off' required/>
                <button type='submit' >send</button>
            </form>
        </div>
    )
}

export default ChatWindow
