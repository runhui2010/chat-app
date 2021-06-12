const { json } = require('express')
const express=require('express')
const router=express.Router()
const User=require('./userModel')

router.route("/new").post((req,res)=>{
    console.log(req.body)
    const name=req.body.name
    const room=req.body.room
    const password=req.body.password
    const avatar=req.body.avatar
    const isSignedIn=req.body.isSignedIn
    const user=new User({name,room,password,avatar,isSignedIn})

    user.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
          message: "Fail!",
          error: err.message
        });
    });
})


router.route("/users").get((req,res)=>{
    User.find(function(err,data){
        res.status(200).send(data) 
    }).catch(err => {
        res.status(500).json({
          message: "Fail!",
          error: err.message
        });
    });
})

router.route('/user').put((req,res)=>{
    User.findOneAndUpdate({name:req.body.name},{room:req.body.room,isSignedIn:req.body.isSignedIn},{new:true},function(err,data){
        if(err){
            res.status(500).json({
                message: "Fail!",
                error: err.message
              });
        }else{
            res.status(200).send(data) 
        }
    })
})

module.exports=router;