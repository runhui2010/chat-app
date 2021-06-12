const express= require('express');
const mongoose=require("mongoose")
const cors=require("cors")
const app=require('express')()
const server=require('http').createServer(app)
const io=require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://run:8616716@cluster0.beu1u.mongodb.net/chat-app")
app.use('/',require("./router"))

io.on('connection', function(socket) {    
    socket.broadcast.emit('connection',{text:"someone connected",
    sender:'Admin',
    recipient:'Room1',
    time:''})
    socket.on('msg',(data)=>{
      console.log('msg from users:'+data.text)
      socket.broadcast.emit('msg',data)
        
    })
    socket.on('disconnect',function(){
      console.log(socket)
      socket.broadcast.emit('inOut',{text:"someone left",
      sender:'Admin',
      recipient:'Room1',
      time:''})
    })

})



server.listen(8000,()=>{
    console.log("Running port 8000")
})