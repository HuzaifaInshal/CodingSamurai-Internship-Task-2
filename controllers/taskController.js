const asyncHandler = require('express-async-handler')
const Tasks = require('../database/models/tasks')

const viewTaks = asyncHandler(async(req,res)=>{
    const tasks = await Tasks.find({user:req.user.id})
    res.status(201).json(tasks)
})

const addTaks = asyncHandler(async(req,res)=>{
    const {title,description,mark,priority} = req.body

    //check if all are present
    if(!title || !description || !mark ||!priority){
        throw new Error("Please type/select all required fields!!")
    }

    //create task in database
    const task = await Tasks.create({
        user:req.user.id,
        title,description,mark:JSON.parse(mark),priority
    })
    //return created task
    res.status(200).json(task)
})

const updateTaks = asyncHandler(async(req,res)=>{
    const task = await Tasks.findById(req.params.id)

    //check if task doesn`t exist
    if(!task){
        res.status(401)
        throw new Error("No such task!!")
    }

    //check if user doesn`t exist
    if(!req.user){
        res.status(401)
        throw new Error('User not found!!')
    }

    //authorize the user
    if(task.user.toString() != req.user.id){
        res.status(401)
        throw new Error('User is  not authorized to modify!!')
    }

    const  updatedTask = await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedTask)
})

const deleteTaks = asyncHandler(async(req,res)=>{
    const task = await Tasks.findById(req.params.id)

    //check if task doesn`t exist
    if(!task){
        res.status(401)
        throw new Error("No such task!!")
    }

    //check if user doesn`t exist
    if(!req.user){
        res.status(401)
        throw new Error('User not found!!')
    }

    //authorize the user
    if(task.user.toString() != req.user.id){
        res.status(401)
        throw new Error('User is  not authorized to delete!!')
    }

    await task.deleteOne()
    res.status(200).json({status:"success",id:req.params.id})
})

const markTaks = asyncHandler(async(req,res)=>{
    const task = await Tasks.findById(req.params.id)

    //check if task doesn`t exist
    if(!task){
        res.status(401)
        throw new Error("No such task!!")
    }

    //check if user doesn`t exist
    if(!req.user){
        res.status(401)
        throw new Error('User not found!!')
    }

    //authorize the user
    if(task.user.toString() != req.user.id){
        res.status(401)
        throw new Error('User is  not authorized to modify!!')
    }

    // Toggle the mark field
    task.mark = !task.mark;

    // Save the updated task
    await task.save();

    res.status(200).json(task);
})

module.exports = {
    viewTaks,
    addTaks,
    updateTaks,
    deleteTaks,
    markTaks
}