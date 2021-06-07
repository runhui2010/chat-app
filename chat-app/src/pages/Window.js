import React from 'react'
import ChatWindow from '../components/ChatWindow'
import SideWindow from '../components/SideWindow'
import './window.css'
const Window = () => {
    return (
        <div className='chat_room'>
            <SideWindow/>
            <ChatWindow/>
        </div>
    )
}

export default Window
