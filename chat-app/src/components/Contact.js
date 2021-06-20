import axios from 'axios'
import { set } from 'mongoose'
import React,{useState,useEffect,useContext} from 'react'
import './contact.css'
import UsersContext from './UsersContext'
import Avatar from 'react-avatar'
const Contact = () => {
    const [search,setSearch]=useState(false)
    const [add,setAdd]=useState(false)
    const [users,setUsers] = useContext(UsersContext)
    const [contacts,setContacts]=useState([])
    const [result,setResult]=useState([])
    
    const pressPlus=(e)=>{
        document.getElementById('searchBar').value=''
        setResult([])
        e.preventDefault()
        setSearch(true)
        setAdd(!add)
        document.getElementById('searchBar').focus()
        document.getElementById('searchBar').placeholder='search by username'
    }
    const filterFriend=()=>{
        setSearch(true)
        const value=document.getElementById('searchBar').value
        var temp=''
        if(add){
            temp=[...users]
            
        }else{      
            temp=[...contacts]
        }
        const result=temp.filter(i=>i.name.includes(value))
        console.log(result)
        setResult(result)
        
            
        
    }
    const addContact=(e)=>{
        if(add){
            setResult([])
            document.getElementById('searchBar').placeholder='search...'
            e.preventDefault()  
            setAdd(!add)
            setSearch(false)
            document.getElementById('searchBar').value=''
            console.log(e.target.id)
            var temp=[...contacts]
            if(!temp.map(i=>i.name).includes(result[e.target.id].name)){
                const newContact={name:result[e.target.id].name,avatar:result[e.target.id].avatar}
                setContacts([...contacts,{name:result[e.target.id].name,avatar:result[e.target.id].avatar}])
                axios.post("http://localhost:8000/newContact",newContact)
            }
            
        }
        

    }
    useEffect(() => {
        console.log(contacts)
    }, [contacts])
    useEffect(async() => {
        const res=await fetch('http://localhost:8000/contacts').then(res=>{
            if(res.ok)return res.json()
                }).then(jsonRes=>{
                    console.log(jsonRes)
                setContacts(jsonRes) 
            })
        
        
    }, [])
    return (
        <div className='contact_container'>
            <h2 >Contact</h2>
            <div className="search">
                <input type="text" id='searchBar' onChange={filterFriend} placeholder="search..." />
            </div>
            <ul className='contacts'>
                {search && result && result.map((i,index)=><li key={index}  >{i.avatar===''?<Avatar name={i.name} round={true} size='30'/>:<img src={i.avatar} alt="" height='30px' style={{borderRadius:'50%'}}/>}<span id={index} onClick={addContact}>{i.name}</span></li>)}
                {!search && contacts && contacts.map((contact,index)=><li key={index} id={index}>{contact.avatar===''?<Avatar name={contact.name} round={true} size='30'/>:<img src={contact.avatar} alt="" height='30px' style={{borderRadius:'50%'}}/>}<span>{contact.name}</span></li>)}
            </ul>
            {!add && <button className='add' onClick={pressPlus}>+</button>}
        </div>
    )
}

export default Contact
