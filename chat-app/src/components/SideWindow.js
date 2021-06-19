import React,{useState,useEffect, useContext,useRef} from 'react'
import  './sideWindow.css'
import CurrUserContext from './CurrUserContext'
import UsersContext from './UsersContext'
import io from 'socket.io-client'
import { set } from 'mongoose'
import axios from 'axios'

const SideWindow = () => {
    const [users,setUsers] = useContext(UsersContext)
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    const [rooms,setRooms]=useState([])


    const socket=io.connect('http://localhost:8000')
    

    const changeRoom= (e)=>{
        fetchRoom()
        document.getElementById('searchRoom').value=''
        const value=e.target.id
        setCurrUser({...currUser,room:value}) 
        
    }
    const createNewRoom=(e)=>{
        e.preventDefault()
        const value=document.getElementById('newRoomName').value
        if(value!='' && !rooms.map(room=>room.name).includes(value) ){
            setRooms([...rooms,{name:value}])
            axios.post('http://localhost:8000/newRoom',{name:value})
        }else{
            document.getElementById('newRoomName').focus()
        }
        document.getElementById('newRoomName').value=''
        
    }
    const deleteRoom=(e)=>{
        console.log("delete....")
         axios.post('http://localhost:8000/remove',{name:e.target.id})
        var temp=[...rooms]
        temp=temp.filter(i=>i.name!==e.target.id)
        console.log(temp)
        setRooms(temp)
    }
    const searchRoom=()=>{
        var value=document.getElementById('searchRoom').value
        if(!value==''){
            var temp=[...rooms]
            temp=temp.filter(i=>i.name.includes(value))
            console.log(temp)
            setRooms(temp)
        }else{
            fetchRoom()
        }
    }
    useEffect(() => { 
        console.log(currUser)
    }, [currUser])
    useEffect(() => {
        console.log(rooms)
    }, [rooms])
    useEffect(async()=>{
        fetchRoom()
        
    },[])
    const fetchRoom=async()=>{
        await fetch('http://localhost:8000/rooms').then(res=>{
            console.log(rooms)
            if(res.ok)return res.json()
                }).then(jsonRes=>{
            console.log(jsonRes)
            setRooms(jsonRes)
            })
    }
  
    return (
        <div className="side_window">
            <div className="profile">
                <img src={currUser.avatar}/>
                <ul>
                    <li>{'Name: '+currUser.name}</li>
                    <li>{'Room: '+currUser.room}</li> 
                </ul>
             </div>
            <div className="search">
                <input type="text" id='searchRoom' placeholder="search..." onChange={searchRoom}/>
            </div>
            <ul className='room'>
                
                {
                  rooms.map((room,i)=>
                      <li key={i} id={room.name} onClick={changeRoom} onDoubleClick={deleteRoom}>{room.name}</li>
                  )
                }
                
            </ul>
            <form className="createRoom">
                <input type="text" id='newRoomName' placeholder='enter group name...'/>
                <button type='submit' onClick={createNewRoom}>Create</button>
            </form>
        </div>
    )
}

export default SideWindow