const mongoose = require("mongoose")

const userSchema={
    name:String,
    password:String,
    room:String,
    avatar:String,
    isSignedIn:Boolean

}

const User=mongoose.model("User",userSchema)

module.exports=User;
