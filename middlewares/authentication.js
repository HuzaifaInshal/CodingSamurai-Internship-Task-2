const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../database/models/users')

const authenticate = asyncHandler(async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1] 

            //verify the token and extract/decode info from it
            const decoded = jwt.verify(token,process.env.JWT_SECRET) 

            //find user by id and exclude password field from selected user schema
            const user = await User.findById(decoded.id).select('-password')

            // pass on the req.user for every further middleware, 
            req.user = user
            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized!!!')
        }
    }
    if(!token){
        res.status(401)
        throw new Error("No token found!!")
    }
})

module.exports = {authenticate}