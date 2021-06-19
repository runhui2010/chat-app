import React from 'react'
import './contact.css'
const Contact = () => {
    return (
        <div className='contact_container'>
            <h2 >Contact</h2>
            <div className="search">
                <input type="text"  placeholder="search..." />
            </div>
            <ul className='contacts'>
                <li>sdf</li>
                <li>sdf</li>
                <li>sdf</li>
            </ul>
            <form className="createRoom">
                <input type="text"  placeholder='enter contact ...'/>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default Contact
