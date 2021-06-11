import React,{useState,useEffect, useContext} from 'react'
import  './sideWindow.css'
import CurrUserContext from './CurrUserContext'

const SideWindow = () => {
    const [users,setUsers] = useContext(UsersContext)
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    const [roomUsers,setRoomUsers]=useState([])
    useEffect(() => {
        setRoomUsers(users.filter(i=>i.room===currUser.room))
    }, [currUser])
    useEffect(() => {
        console.log(users,currUser)
    }, [users])
  
    return (
        <div className="side_window">
            <div className="profile">
                <img src={currUser.avatar}/>
                <ul>
                    <li>{'Name: '+currUser.name}</li>
                    <li>{'Room: '+currUser.room}</li> 
                    <li>{'Users:'+ users.length}</li>  
                </ul>
             </div>
            <div className="search">
                <input type="text" placeholder="search" />
            </div>
            <ul className='room'>
                
                {users&&users.map(user=> 
                    <li key={user._id}>{user.name} {user.room}</li>
                )}
                
            </ul>
        </div>
    )
}

export default SideWindow