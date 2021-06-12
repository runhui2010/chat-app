import React,{useState,useEffect, useContext,useRef} from 'react'
import  './sideWindow.css'
import CurrUserContext from './CurrUserContext'
import UsersContext from './UsersContext'

const SideWindow = () => {
    const [users,setUsers] = useContext(UsersContext)
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    const [roomUsers,setRoomUsers]=useState([])



    useEffect(async()=>{
        // var res=await fetch('http://localhost:8000/users')
        // var data=await res.json()
        // await setUsers(data)
        await fetch('http://localhost:8000/users').then(res=>{
            console.log(currUser)
            if(res.ok)return res.json()
                }).then(jsonRes=>{
            console.log(jsonRes)
            setUsers(jsonRes)
            })
    },[])
    useEffect( () => {             
            setRoomUsers(users.filter(i=>i.room===currUser.room) )    
    }, [users])
  
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
                
                {roomUsers&&roomUsers.map(user=> 
                    <li key={user._id}>{user.name} {user.room}</li>
                )}
                
            </ul>
        </div>
    )
}

export default SideWindow