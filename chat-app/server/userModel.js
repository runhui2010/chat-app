const mongoose = require("mongoose")

const userSchema={
    name:String,
    room:String,
    password:String,
    avatar:String,
    isSignedIn:Boolean,
    socketID:String

}

const User=mongoose.model("User",userSchema)

module.exports=User;
