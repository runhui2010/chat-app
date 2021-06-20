const mongoose = require("mongoose")

const userSchema={
    name:String,
    password:String,
    avatar:String,
    to:String,
    groups:Object,
    contacts:Object,
    chatHistory:Object

}

const User=mongoose.model("User",userSchema)

module.exports=User;

