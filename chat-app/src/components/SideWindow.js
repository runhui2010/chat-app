import React,{useContext} from 'react'
import  './sideWindow.css'
import UserContext from './UserContext'

const SideWindow = () => {
    const [users,setUsers] = useContext(UserContext)
    const currUser=users[users.length-1]==null?"":users[users.length-1].name
    console.log(users)
    return (
        <div className="side_window">
            <div className="profile">
                <span>avatar</span>
                <div>{currUser}</div>
             </div>
            <div className="search">
                <span>logo</span>
                <input type="text" placeholder="search" />
            </div>
            <ul className='room'>
                {users.map(user=> <li key={user.id}>{user.name}</li>
                )}
            </ul>
        </div>
    )
}

export default SideWindow