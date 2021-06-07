import React,{useState,useEffect, useContext} from 'react'
import  './sideWindow.css'
import CurrUserContext from './CurrUserContext'

const SideWindow = () => {
    const [users,setUsers] = useState([])
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    useEffect(() => {
        fetch('http://localhost:8000/users').then(res=>{
            if(res.ok)return res.json()
        }).then(jsonRes=>{
            console.log(jsonRes)
            setUsers(jsonRes.filter(i=>i.room===currUser.room))
        })

    }, [currUser])
    useEffect(() => {
        console.log(users,currUser)
    }, [users])
  
    return (
        <div className="side_window">
            <div className="profile">
                <span>avatar</span>
                <div>{'user: '+currUser.name}  {"room: "+currUser.room}  {users.length}</div>
             </div>
            <div className="search">
                <span>logo</span>
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