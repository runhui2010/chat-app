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
  
    socket.on('msg',(data)=>{
      console.log(data)
      socket.broadcast.emit('msg',data)
        
    })

})


server.listen(8000,()=>{
    console.log("Running port 8000")
})