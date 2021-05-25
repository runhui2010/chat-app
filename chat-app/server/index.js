const app=require('express')()
const server=require('http').createServer(app)
const io=require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });


io.on('connection', function(socket) {
    console.log('A user connected')
    socket.on('msg',(data)=>{
        console.log(data)
    })

})

server.listen(8000,()=>{
    console.log("Running port 8000")
})