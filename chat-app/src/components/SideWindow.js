import React,{useState,useEffect, useContext,useRef} from 'react'
import  './sideWindow.css'
import CurrUserContext from './CurrUserContext'
import UsersContext from './UsersContext'
import io from 'socket.io-client'
import { set } from 'mongoose'
import axios from 'axios'
import GroupsContext from './GroupsContext'

const SideWindow = () => {
    const [users,setUsers] = useContext(UsersContext)
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    const [chatGroup,setChatGroup]=useContext(GroupsContext)
    const [groups,setGroups]=useState([])
    const [add,setAdd]=useState(false)
    const [hideBtn,setHideBtn]=useState(false)

    // const socket=io.connect('http://localhost:8000')
    

    const changeGroup= (e)=>{
        document.getElementById('searchGroup').value=''
        const value=e.target.parentNode.id
        console.log(value)
        setCurrUser({...currUser,to:value})
        setGroups(currUser.groups)
        setHideBtn(false)
    }
    const createNewGroup=(e)=>{
        e.preventDefault()
        const value=document.getElementById('newGroupName').value
        document.getElementById('newGroupName').value=''
        console.log(chatGroup)
        if(chatGroup.map(i=>i.name).includes(value)){
            console.log("group already existed, search and join the group")
        }else{
            const tempGroup={name:value,history:null}
            setChatGroup([...chatGroup,tempGroup])
            if(value.trim()!='' && groups===null){
                const tempUserGroup=[value]
                setCurrUser({...currUser,groups:tempUserGroup})
                setAdd(!add)
            }else if(value.trim()!='' && !groups.includes(value) ){
                const tempUserGroup=groups.slice()
                tempUserGroup.push(value)
                console.log( tempUserGroup)
                setCurrUser({...currUser,groups:tempUserGroup,to:value})
                setAdd(!add)
            }else{
                document.getElementById('newGroupName').focus()
            }
            
        }
        
        // const value=document.getElementById('newGroupName').value
        // document.getElementById('newGroupName').value=''
        // console.log(groups)
        // if(value.trim()!='' && groups===null){
        //     const temp=[value]
        //     setCurrUser({...currUser,groups:temp})
        //     setAdd(!add)
        // }else if(value.trim()!='' && !groups.includes(value) ){
        //     const temp=groups.slice()
        //     temp.push(value)
        //     console.log( temp)
        //     setCurrUser({...currUser,groups:temp,to:value})
        //     setAdd(!add)
        // }else{
        //     document.getElementById('newGroupName').focus()
        // }
    }
    
    useEffect(async() => {
        setGroups(currUser.groups)
        console.log(currUser.groups,groups)
        await axios.put('http://localhost:8000/user',currUser)
        await axios.post('http://localhost:8000/newGroup',chatGroup)
    }, [currUser])

    const deleteGroup=(e)=>{
        console.log("delete....")
        const item=e.target.parentNode.id
        console.log(item)
        const temp=groups.slice()
        temp.splice(temp.indexOf(item),1)
        console.log(temp)
        setCurrUser({...currUser,groups:temp,to:''})
    }
    const searchGroup=()=>{
        setHideBtn(true)
        // hideBtn.current.classList.add('display')
        var value=document.getElementById('searchGroup').value
        if(!value==''){
            var temp=currUser.groups.filter(i=>i.includes(value))
            setGroups(temp)
        }else{
            
            fetchGroup()
            // hideBtn.current.classList.remove('display')
        }
    }
    const backToGroups=(e)=>{
        e.preventDefault()
        setAdd(false)
    }

   
    useEffect(()=>{
        fetchGroup()
    },[])
    
    const fetchGroup=async()=>{
        await fetch('http://localhost:8000/users').then(res=>{
            if(res.ok)return res.json()
                }).then(users=>{
            const groups=users.filter(i=>i.name===currUser.name)
            console.log(groups[0])
            setCurrUser(groups[0])
            setHideBtn(false)
            
            })
            await fetch('http://localhost:8000/groups').then(res=>{
            if(res.ok)return res.json()
                }).then(groups=>setChatGroup(groups))
    }
  
    return (
        <div className="side_window">
            <h2>Group</h2>
            <div className="search">
                <input type="text" id='searchGroup' placeholder="search..." onChange={searchGroup} autoComplete='off'/>
            </div>
            <ul className='group'>
                
                {
                  groups && groups.map((group,i)=>
                      <li key={i} id={group} style={group===currUser.to?{backgroundColor:'lightgreen'}:{backgroundColor:'azure'}}><span onDoubleClick={changeGroup} >{group}</span> 
                      {!hideBtn && <button onClick={deleteGroup} >delete</button>}
                      </li>
                  )
                }
                
            </ul>
            {add && <form className="createGroup">
                <button onClick={backToGroups}>Back</button>
                <input type="text" id='newGroupName' placeholder='Enter new group name...' autoComplete='off'/>
                <button type='submit'  onClick={createNewGroup}>Create</button>
            </form>}
            {!add && <button className='add' onClick={()=>{setAdd(!add)}}>+</button>}
            
        </div>
    )
}

export default SideWindow