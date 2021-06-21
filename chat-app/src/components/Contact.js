import axios from 'axios'
import { set } from 'mongoose'
import React,{useState,useEffect,useContext} from 'react'
import './contact.css'
import UsersContext from './UsersContext'
import Avatar from 'react-avatar'
import CurrUserContext from './CurrUserContext'
const Contact = () => {
    const [isSearching,setIsSearching]=useState(false)
    const [isFilterUsers,setIsFilterUsers]=useState(false)
    const [users,setUsers] = useContext(UsersContext)
    const [contacts,setContacts]=useState([])
    const [result,setResult]=useState([])
    const [currUser,setCurrUser]=useContext(CurrUserContext)
    
    const pressPlus=(e)=>{
        
        document.getElementById('searchBar').value=''
        
        var temp=users.filter(i=>i.name!==currUser.name)
        setResult(temp)
        e.preventDefault()
        setIsSearching(true)
        setIsFilterUsers(!isFilterUsers)
        console.log(isFilterUsers)
        document.getElementById('searchBar').focus()
        document.getElementById('searchBar').placeholder='search by username'
    }
    const filterFriend=()=>{
        setIsSearching(true)
        const value=document.getElementById('searchBar').value
        var result=null
        if(isFilterUsers){
            var temp=users.filter(i=>i.name!==currUser.name)
            result=temp.filter(i=>i.name.includes(value))
        }else{     
            result=contacts.filter(i=>i.name.includes(value))
        }
       
        console.log(result)
        setResult(result)
        
            
        
    }
    const addContact=(e)=>{
        if(isFilterUsers){
            setResult([])
            document.getElementById('searchBar').placeholder='search...'
            e.preventDefault()  
            setIsFilterUsers(!isFilterUsers)
            setIsSearching(false)
            document.getElementById('searchBar').value=''
            console.log(e.target.parentNode.id)
            const temp=result.filter(i=>i.name===e.target.parentNode.id)
            console.log(contacts,temp)
            const newContact={name:temp[0].name,avatar:temp[0].avatar}
            var contactsClone=null;
            if(contacts===null){
                console.log('empty contacts')
                const emptyArr=[]
                emptyArr.push(newContact)
                setCurrUser({...currUser,contacts:emptyArr})
            }else{
                console.log('not empty but exist')
                if(!contacts.map(i=>i.name).includes(temp[0].name)){
                    console.log('add contacts')
                    contactsClone=contacts.slice()
                    contactsClone.push(newContact)
                    console.log(contactsClone)
                    setCurrUser({...currUser,contacts:contactsClone})
                }
            }
        }
    }
    const privateMsg=(e)=>{
        
        const value=e.target.parentNode.id
        console.log(value,contacts)
        setCurrUser({...currUser,to:value})
    }
    useEffect(async() => {
        setContacts(currUser.contacts)
        await axios.put("http://localhost:8000/user",currUser)
        console.log(contacts)
    }, [currUser])


    return (
        <div className='contact_container'>
            <h2 >Contact</h2>
            <div className="search">
                <input type="text" id='searchBar' onChange={filterFriend} placeholder="search..." />
            </div>
            <ul className='contacts'>
                {isSearching && result && result.map((i,index)=>
                    <li key={index} id={i.name} >
                        <span className='userInfo'>{i.avatar===''?<Avatar name={i.name} round={true} size='30'/>:<img src={i.avatar} alt="" height='30px' style={{borderRadius:'50%'}}/>}
                        <span id={index}>{i.name}</span></span>
                        <button onClick={addContact}>{isFilterUsers?'add':'delete'}</button>
                    </li>)}
                {!isSearching && currUser.contacts && currUser.contacts.map((contact,index)=>
                    <li key={index} id={index} style={contact.name===currUser.to?{backgroundColor:'lightgreen'}:{backgroundColor:'azure'}}>
                        <span className='userInfo' id={contact.name} onDoubleClick={privateMsg}>{contact.avatar===''?<Avatar name={contact.name} round={true} size='30'/>:<img src={contact.avatar} alt="" height='30px' style={{borderRadius:'50%'}}/>}
                        <span>{contact.name}</span></span>
                        <button>delete</button>
                    </li>)}
            </ul>
            {!isFilterUsers && <button className='add' onClick={pressPlus}>+</button>}
            {isSearching && isFilterUsers &&<button className='add' onClick={()=>{
                setIsSearching(false)
                setIsFilterUsers(false)
                document.getElementById('searchBar').placeholder='search...'
            }}>back</button>}
        </div>
    )
}

export default Contact
