const mongoose = require("mongoose")

const roomSchema={
    name:String

}

const Room=mongoose.model("Room",roomSchema)

module.exports=Room;
