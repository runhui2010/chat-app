import { set } from 'mongoose'
import React,{useContext, useEffect,useState,useRef} from 'react'
import rooms from '../data/rooms'
import  './chatWindow.css'
import CurrUserContext from './CurrUserContext'
import moment from 'moment'
import {v4 as uuidv4} from 'uuid'
import io from 'socket.io-client'

const ChatWindow = () => {
    const ref = useRef()
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    const [msg,setMsg]=useState({
        text:"",
        sender:'',
        recipient:'',
        time:''
    })
    const [chat,setChat]=useState([])      
   
    const socket = useRef()

    useEffect(() => {
        socket.current=io.connect("http://localhost:8000");
        socket.current.on('msg',(data)=>{
            if(data.text!=""){
                console.log("receive data from server:"+ data.text)
                 setChat((chat)=>[...chat,data])
            }
        
        })
        return () => socket.current.disconnect()
    }, [msg])
    

const changeRoom=()=>{
    const value=document.getElementById("chat_room").value
    setCurrUser({...currUser,room:value})
}
useEffect(()=>{
    console.log('msg:'+msg.text)
    socket.current.emit('msg',msg)
},[msg])

const sendMsg=(e)=>{
    e.preventDefault()
    const text=document.getElementById('text').value
    const sender=currUser.name
    const recipient=currUser.room
    const time=moment().format('h:mm:s a')
    const newMsg={text:text,sender:sender,recipient:recipient,time:time}
           setMsg({...msg,text:text,sender:sender,recipient:recipient,time:time})
            document.getElementById('text').value=""
            setChat([...chat,newMsg])
    
    
    document.getElementById('text').focus()
}   


useEffect(() => {
ref.current.scrollIntoView({ behavior: "smooth" })
}, [chat,currUser.room])
        
    return (
        <div className='chat_window'>
            <div className="chat_header">
                <select name="chat_room" id="chat_room" value={currUser.room} onChange={changeRoom}>
                    {rooms.map(room=>
                    <option value={room} key={rooms.indexOf(room)} >{room}</option>
                    )}
                </select>
            </div>
            <div className="chat_body" >
                {chat.filter(i=>i.recipient===currUser.room).map(m=>
                    <div key={uuidv4()} className={m.sender===currUser.name?'msg own':'msg'}>
                        <p className='sender'>{m.sender}</p>
                        <h2 className={m.sender===currUser.name?'text':'text others'}>{m.text}</h2>
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
