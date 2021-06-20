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
    const [groups,setGroups]=useState([])
    const [add,setAdd]=useState(false)


    // const socket=io.connect('http://localhost:8000')
    

    const changeGroup= (e)=>{
        fetchGroup()
        document.getElementById('searchGroup').value=''
        const value=e.target.id
        setCurrUser({...currUser,to:value}) 
        
    }
    const createNewGroup=(e)=>{
        e.preventDefault()
        const value=document.getElementById('newGroupName').value
        document.getElementById('newGroupName').value=''
        console.log(value!='' && !groups.includes(value) )
        if(value!='' && !groups.includes(value) ){
            const temp=groups.slice()
            temp.push(value)
            console.log( temp)
            setCurrUser({...currUser,groups:temp})
            setAdd(!add)
        }else{
            document.getElementById('newGroupName').focus()
        }
    }
    
    useEffect(async() => {
        setGroups(currUser.groups)
        await axios.put('http://localhost:8000/user',currUser)
    }, [currUser])

    const deleteGroup=(e)=>{
        console.log("delete....")
        const groupIndex=groups.indexOf(e.target.id)
        const temp=groups.slice()
        temp.splice(groupIndex,1)
        console.log(temp)
        setGroups(temp)
        // setCurrUser({...currUser,groups:temp})        
    }
    const searchGroup=()=>{
        var value=document.getElementById('searchGroup').value
        if(!value==''){
            var temp=currUser.groups.filter(i=>i.includes(value))
            setGroups(temp)
        }else{
            fetchGroup()
        }
    }

   
    useEffect(async()=>{
        fetchGroup()
    },[])
    const fetchGroup=async()=>{
        await fetch('http://localhost:8000/users').then(res=>{
            console.log(groups)
            if(res.ok)return res.json()
                }).then(users=>{
            console.log(users)
            const groups=users.filter(i=>i.name===currUser.name)
            console.log(groups)
            setCurrUser(groups[0])
            
            })
    }
  
    return (
        <div className="side_window">
            <h2>Group</h2>
            <div className="search">
                <input type="text" id='searchGroup' placeholder="search..." onChange={searchGroup} autoComplete='off'/>
            </div>
            <ul className='group'>
                
                {
                  groups.map((group,i)=>
                      <li key={i} id={i} onClick={changeGroup} onDoubleClick={deleteGroup}>{group}</li>
                  )
                }
                
            </ul>
            {add && <form className="createGroup">
                
                <input type="text" id='newGroupName' placeholder='enter group name...' autoComplete='off'/>
                <button type='submit' onClick={createNewGroup}>Create</button>
            </form>}
            {!add && <button className='add' onClick={()=>{
                setAdd(!add)
            }}>+</button>}
            
        </div>
    )
}

export default SideWindow