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
import GroupsContext from './GroupsContext'


const ChatWindow = () => {
    const ref = useRef()
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    const [users,setUsers]=useContext(UsersContext)
    const [chatGroup,setChatGroup]=useContext(GroupsContext)
    const [msg,setMsg]=useState({
        text:"",
        sender:'',
        recipient:'',
        time:'',
    })
    const [chat,setChat]=useState([])
   
    const socket=io.connect('http://localhost:8000')
    
    useEffect(() => {
        socket.on('msg',(d)=>{
            setChat([...chat,d])
            
            console.log(d)
        })
        
    }, [])
   


useEffect(async() => {
    await axios.put('http://localhost:8000/user',currUser)
    const res=await fetch('http://localhost:8000/users')
    const data=await res.json()
        setUsers(data)

        await fetch('http://localhost:8000/groups').then(res=>{
            if(res.ok)return res.json()
                }).then(groups=>setChatGroup(groups))
        
    const size=users.filter(i=>i.to===currUser.to)
    console.log(size)
}, [currUser])

useEffect(() => {
    const currUserChat=users.map(i=>i.contacts)
    console.log(currUserChat,currUser.to)
}, [users])

useEffect(()=>{
    console.log('msg:'+msg.text)
    
},[msg])

const  sendMsg=(e)=>{
    e.preventDefault()
    const text=document.getElementById('text').value
    const sender=currUser.name
    const recipient=currUser.to
    const time=moment().format('h:mm:s a')
    const newMsg={text:text,sender:sender,recipient:recipient,time:time}
            setMsg({...msg,text:text,sender:sender,recipient:recipient,time:time})
            document.getElementById('text').value=""
             socket.emit('msg',newMsg)
             setChat([...chat,newMsg])
    
    document.getElementById('text').focus()
}   


useEffect(() => {
ref.current.scrollIntoView({ behavior: "smooth" })
}, [chat])
        
    return (
        <div className='chat_window'>
            <div className="chat_header">
                <div className='userInfo'>
                    {currUser.avatar===''?<Avatar name={currUser.name} round={true} size='30'/>:<img src={currUser.avatar} alt="" height='40px' style={{borderRadius:'50%'}}/>}
                    <span>{currUser.name}</span>
                </div>
                    <span id='group'>{currUser.to} <span id='peopleCount'>{chatGroup.map(i=>i.name).includes(currUser.to)?users.map(i=>i.groups).filter(i=>i.includes(currUser.to)).length>0?'('+users.map(i=>i.groups).filter(i=>i.includes(currUser.to)).length+' people)':'':''} </span></span>
                
            
            </div> 
            <div className="chat_body" >
                {chat.filter(i=>i.recipient===currUser.name).map(m=>
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
