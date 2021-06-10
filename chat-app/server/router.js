const { json } = require('express')
const express=require('express')
const router=express.Router()
const User=require('./userModel')
const Login=require('./loginModel')

router.route("/new").post((req,res)=>{
    console.log(req.body)
    const name=req.body.name
    const room=req.body.room
    const password=req.body.password
    const avatar=req.body.avatar
    const isSignedIn=req.body.isSignedIn
    const user=new User({name,room,password,avatar,isSignedIn})

    user.save()
})

router.route('/login').get((req,res)=>{
    Login.find((data)=>{
        res.send(data)
    })
})
router.route("/users").get((req,res)=>{
    User.find(function(err,data){
        res.send(data) 
    })
})

module.exports=router;