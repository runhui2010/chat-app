const mongoose = require("mongoose")

const groupSchema={
    name:String,
    history:Array

}

const Group=mongoose.model("Group",groupSchema)

module.exports=Group;
