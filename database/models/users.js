const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
    username:{
        type:String,
        required:[true,'PLease add a Name']
    },
    bio:{
        type:String,
        required:[false,'PLease add a Name']
    },
    email:{
        type:String,
        required:[true,'PLease add a Name'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'PLease add a Name']
    }
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model('Users',userSchema)