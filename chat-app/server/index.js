const express= require('express');
const mongoose=require("mongoose")
const cors=require("cors")
const app=require('express')()
const server=require('http').createServer(app)
const io = require('socket.io')()
io.attach(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
  },
  // allowEIO3: true
});

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://run:8616716@cluster0.beu1u.mongodb.net/chat-app")
app.use('/',require("./router"))

let activeUsers = {};

// io.on("connection", (socket) => {
//   const id=socket.id

//     socket.on('name',(data)=>{
      
//       activeUsers[id]=data
//       console.log(activeUsers)
      
//         io.emit('name',activeUsers)
      
        
      
//     })
   
// });



server.listen(8000,()=>{
    console.log("Running port 8000")
})