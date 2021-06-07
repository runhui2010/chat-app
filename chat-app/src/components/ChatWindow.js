import React from 'react'
import  './chatWindow.css'

const ChatWindow = () => {
    return (
        <div className='chat_window'>
            <div className="chat_header">
                <div>member A</div>
            </div>
            <div className="chat_body">
                
            </div>
            <div className="chat_footer">
                <input type="text" placeholder='text your message' />
                <button>send</button>
            </div>
        </div>
    )
}

export default ChatWindow
