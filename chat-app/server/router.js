const { json } = require('express')
const express=require('express')
const Contact = require('./contactModel')
const Room = require('./roomModel')
const router=express.Router()
const User=require('./userModel')

router.route("/new").post((req,res)=>{
    console.log(req.body)
    const name=req.body.name
    const password=req.body.password
    const avatar=req.body.avatar
    const to=req.body.to
    const groups=req.body.groups
    const contacts=req.body.contacts
    const chatHistory=req.body.chatHistory
    const user=new User({ name:name,password:password,avatar:avatar,to:to,groups:groups,contacts:contacts,chatHistory:chatHistory})
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
    const name=req.body.name
    const password=req.body.password
    const avatar=req.body.avatar
    const to=req.body.to
    const groups=req.body.groups
    const contacts=req.body.contacts
    const chatHistory=req.body.chatHistory
    User.findOneAndUpdate({name:name},{ name:name,password:password,avatar:avatar,to:to,groups:groups,contacts:contacts,chatHistory:chatHistory},{new:true},function(err,data){
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

// router.route("/newRoom").post((req,res)=>{
//     console.log(req.body)
//     const name=req.body.name
//     const user=new Room({name})

//     user.save().then(data => {
//         res.status(200).json(data);
//     }).catch(err => {
//         res.status(500).json({
//           message: "Fail!",
//           error: err.message
//         });
//     });
// })


// router.route("/rooms").get((req,res)=>{
//     Room.find(function(err,data){
//         res.status(200).send(data) 
//     }).catch(err => {
//         res.status(500).json({
//           message: "Fail!",
//           error: err.message
//         });
//     });
// })
// router.route("/remove").post((req,res)=>{
//     Room.remove({
//         name:req.body.name
//     },function(err) {  
//         if(err){  
//             res.send(err);  
//         }  
//         else{    
//                res.send({data:"Record has been Deleted..!!"});             
//            }})
// })

// router.route("/newContact").post((req,res)=>{
//     const user=new Contact({name:req.body.name,avatar:req.body.avatar})

//     user.save().then(data => {
//         res.status(200).json(data);
//     }).catch(err => {
//         res.status(500).json({
//           message: "Fail!",
//           error: err.message
//         });
//     });
// })


// router.route("/contacts").get((req,res)=>{
//     Contact.find(function(err,data){
//         res.status(200).send(data) 
//     }).catch(err => {
//         res.status(500).json({
//           message: "Fail!",
//           error: err.message
//         });
//     });
// })
// router.route("/removeContact").post((req,res)=>{
//     Contact.remove({
//         name:req.body.name
//     },function(err) {  
//         if(err){  
//             res.send(err);  
//         }  
//         else{    
//                res.send({data:"Record has been Deleted..!!"});             
//            }})
// })
module.exports=router;