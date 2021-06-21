const mongoose = require("mongoose")

const userSchema={
    name:String,
    password:String,
    avatar:String,
    to:String,
    groups:Array,
    contacts:Array,
    chatHistory:Object

}

const User=mongoose.model("User",userSchema)

module.exports=User;

