const jwt = require('jsonwebtoken')
const  asyncHandler = require('express-async-handler')
const USER = require('../models/userModel')
const Admin = require('../models/adminModel')

const protect = asyncHandler(async(req,res,next)=>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token header
            
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            //get user from token
            req.user = await USER.findById(decoded.id).select('-password')
            console.log("🚀 ~ file: authMiddleware.js ~ line 16 ~ protect ~ req.user", req.user)
            

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error ('Not Authorized')
            
        }
    }
    if(!token){
        res.status(401)
        throw new Error ('Not Authorized , No token')
    }
})
const protectAdmin = asyncHandler(async(req,res,next)=>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token header
            
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET2)
            //get user from token
            req.admin = await Admin.findById(decoded.id).select('-password')
            console.log("🚀 ~ file: authMiddleware.js ~ line 44 ~ protectAdmin ~ req.admin", req.admin)
            
            

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error ('Not Authorized')
            
        }
    }
    if(!token){
       
        res.status(401)
        throw new Error ('Not Authorized , No token..')
    }
})

// const protectAdmin = asyncHandler(async(req,res,next)=>{
    
//     if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//         try {
            
//             // Get token header
//            let admintoken = req.headers.authorization.split(' ')[1]
//             console.log("🚀 ~ file: authMiddleware.js ~ line 41 ~ protectAdmin ~ admintoken", admintoken)
            
//             //verify token
            
//             const decoded = jwt.verify(admintoken,process.env.JWT_SECRET2)
//             //get user from token
//             req.admin = await Admin.findById(decoded.id).select('-password')
//             console.log("🚀 ~ file: authMiddleware.js ~ line 46 ~ protectAdmin ~ req.admin..", req.admin)
//             next()

//         } catch (error) {
//             console.log(error) 
//             res.status(401)
//             throw new Error ('Not Authorized')
            
//         }
//     }else {
//         res.status(401)
//         throw new Error ('Not Authorized , No token...........')
       
//     }
// })
module.exports = {protect,protectAdmin}