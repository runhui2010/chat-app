const mongoose = require("mongoose")

const userSchema={
    name:String,
    room:String
}
const User=mongoose.model("User",userSchema)

module.exports=User;