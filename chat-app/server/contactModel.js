const mongoose = require("mongoose")

const contactSchema={
    name:String,  
    avatar:String,
}

const Contact=mongoose.model("Contact",contactSchema)

module.exports=Contact;
