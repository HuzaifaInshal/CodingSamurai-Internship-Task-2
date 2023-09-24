const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    title:{
        type:String,
        required:[true,'please add a Title text']
    },
    description:{
        type:String,
        required:[false,'please add a Description text']
    },
    mark:{
        type:Boolean,
        required:[true,'please select true or false']
    },
    priority:{
        type:Number,
        required:[true,'please select a number; 1 for hogh, 2 for medium, 3 for low']
    }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Task',taskSchema)