import React from 'react'
import  './app.css'

const SideWindow = () => {
    return (
        <div className="side_window">
            <div className="profile">
                <div>username</div>
             </div>
            <div className="search">
                <input type="text" placeholder="search" />
            </div>
            <div className="room">
                <div>room name</div>
                <div>room member</div>
            </div>
        </div>
    )
}

export default SideWindow