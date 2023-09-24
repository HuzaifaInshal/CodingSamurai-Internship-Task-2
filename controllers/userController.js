const asynchandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../database/models/users')

const registerUser = asynchandler(async(req,res)=>{
    const {name,bio,email,password} = req.body;

    //check all necessary fields are present
    if(!name || !email ||!password){
        res.status(401)
        throw new Error('Please add all the required fileds')
    }

    //check if user already exists with given email
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(401)
        throw new Error('User already exist for given mail!!')
    }

    //Hash the Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create user in database
    const user = await User.create({
        username:name,
        bio,
        email,
        password:hashedPassword
    })

    //return created user
    if(user){
        res.status(201).json({
            id:user.id, 
            name:user.username,
            bio:user.bio,
            email:user.email,
            token:generateToken(user.id)
        })
    }else{
        res.status(401)
        throw new Error("Invalid user data!!!")
    }
})

const loginUser = asynchandler(async(req,res)=>{
    const {email,password} = req.body;

    // check avaliabililty
    if(!email ||!password){
        res.status(401)
        throw new Error('Please add all the required fileds')
    }

    //check email and password
    const findUserByEmail = await User.findOne({email})

    if(!findUserByEmail){
        res.status(401)
        throw new Error("Email not found!!!")
    }

    const passwordCheck = await bcrypt.compare(password,findUserByEmail.password)

    //return founded user
    if(findUserByEmail && passwordCheck){
        res.json({
            id:findUserByEmail.id, 
            name:findUserByEmail.username,
            bio:findUserByEmail.bio,
            email:findUserByEmail.email,
            token:generateToken(findUserByEmail.id) 
        })
    }else{
        res.status(401)
        throw new Error("Invalid credenetials!!!")
    }
})

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
}