import React from 'react'
import ChatWindow from '../components/ChatWindow'
import Contact from '../components/Contact'
import SideWindow from '../components/SideWindow'
import './window.css'
const Window = () => {
    return (
        <div className='chat_room'>
            <SideWindow/>
            <ChatWindow />
            <Contact/>
        </div>
    )
}

export default Window
