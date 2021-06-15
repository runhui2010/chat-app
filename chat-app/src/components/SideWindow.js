import React,{useState,useEffect, useContext,useRef} from 'react'
import  './sideWindow.css'
import CurrUserContext from './CurrUserContext'
import UsersContext from './UsersContext'
import io from 'socket.io-client'
import { set } from 'mongoose'

const SideWindow = () => {
    const [users,setUsers] = useContext(UsersContext)
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    const [roomUsers,setRoomUsers]=useState([])


    const socket=io.connect('http://localhost:8000'
    )
    useEffect(()=>{
        console.log(roomUsers)
    },[roomUsers])
    useEffect(() => {
        socket.on('name',(name)=>{
            var arr=[]
            for(let i in name){
                arr.unshift(name[i])
            }
            setRoomUsers(arr)
      
        })
        return () => {
            socket.off('name',(d)=>{
                console.log(d)
            })
        }
    }, [])
    // useEffect(async()=>{
    //     // var res=await fetch('http://localhost:8000/users')
    //     // var data=await res.json()
    //     // await setUsers(data)
    //     await fetch('http://localhost:8000/users').then(res=>{
    //         console.log(currUser)
    //         if(res.ok)return res.json()
    //             }).then(jsonRes=>{
    //         console.log(jsonRes)
    //         setUsers(jsonRes)
    //         })
    // },[roomUsers])
    // useEffect( () => {             
    //         setRoomUsers(users.filter(i=>i.room===currUser.room) )    
    // }, [users])
  
    return (
        <div className="side_window">
            <div className="profile">
                <img src={currUser.avatar}/>
                <ul>
                    <li>{'Name: '+currUser.name}</li>
                    <li>{'Room: '+currUser.room}</li> 
                    <li>{'Users:'+ roomUsers.length}</li>  
                </ul>
             </div>
            <div className="search">
                <input type="text" placeholder="search" />
            </div>
            <ul className='room'>
                
                {
                   roomUsers&&roomUsers.map((user,i)=>
                    <li key={i}>{user}</li>)
                }
                
            </ul>
        </div>
    )
}

export default SideWindow