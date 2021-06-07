const { json } = require('express')
const express=require('express')
const router=express.Router()
const User=require('./model')

router.route("/new").post((req,res)=>{
    console.log(req.body)
    const name=req.body.name
    const room=req.body.room
    const user=new User({name,room})

    user.save()
})

router.route("/users").get((req,res)=>{
    User.find(function(err,data){
        res.send(data) 
    })
    })

module.exports=router;