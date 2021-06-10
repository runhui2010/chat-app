const mongoose = require("mongoose")

const loginSchema={
    name:String,
    password:String
}
const Login=mongoose.model('Login',loginSchema)

module.exports=Login;