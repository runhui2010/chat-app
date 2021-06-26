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
    const createNewGroup=async(e)=>{
        e.preventDefault()
        const value=document.getElementById('newGroupName').value.trim()
        
        if(value!==''){
            document.getElementById('newGroupName').value=''
            console.log(chatGroup)
            if(chatGroup.map(i=>i.name).includes(value)){
                console.log("group already existed, search and join the group")
            }else{
                const tempGroup={name:value,history:null}
                console.log(tempGroup)
                setChatGroup([...chatGroup,tempGroup])
                await axios.post('http://localhost:8000/newGroup',tempGroup)
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
        }
        
    
    useEffect(async() => {
        setGroups(currUser.groups)
        console.log(chatGroup,groups)
        await axios.put('http://localhost:8000/user',currUser)
        
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
        var value=document.getElementById('searchGroup').value
        if(!add){
            setHideBtn(true)
            // hideBtn.current.classList.add('display')
            if(!value==''){
                var temp=currUser.groups.filter(i=>i.includes(value))
                setGroups(temp)
            }else{
            
                fetchGroup()
                // hideBtn.current.classList.remove('display')
            }
        }else{
            if(!value==''){
                var temp=chatGroup.filter(i=>i.name.includes(value))
                console.log(temp)
                setChatGroup(temp)
            }else{
            
                fetchGroup()
                // hideBtn.current.classList.remove('display')
            }
        }
        
    }
    const backToGroups=(e)=>{
        e.preventDefault()
        setAdd(false)
    }
    const addGroupFromChatGroup=(e)=>{
        const groupName=e.target.parentNode.childNodes[0].id
        // const groupFromDatabase=chatGroup.filter(i=>i.name===groupName)
        // console.log(groupFromDatabase)
        if(!groups.includes(groupName)){
            const temp=[...groups,groupName]
            setCurrUser({...currUser,groups:temp,to:groupName})
            setAdd(!add)

        }
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
                
                {!add && groups && groups.map((group,i)=>
                      <li key={i} id={group} style={group===currUser.to?{backgroundColor:'lightgreen'}:{backgroundColor:'azure'}}><span onDoubleClick={changeGroup} >{group}</span> 
                      {!hideBtn && <button onClick={deleteGroup} >delete</button>}
                      </li>
                  )
                }
                {add && chatGroup && chatGroup.map((group,i)=>
                    <li key={i} className='allGroups'><span id={group.name}>{group.name}</span><button style={groups.includes(group.name)?{backgroundColor:'lightgray'}:{backgroundColor:'green'}} onClick={addGroupFromChatGroup}>{groups.includes(group.name)?'Added':'add'}</button></li>
                    
                )}

                
                
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