const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fname :{
        type : String,
        required : [true , ' please Enter Your Name']
    },
    lname :{
        type : String,
        required : [true , ' please Enter Your Name']
    },
    email :{
        type : String,
        required : [true , ' please Enter Your Email'],
        unique : true
    },
    password :{
        type : String,
        required : [true , ' please Enter Your Password']
    },
    block:{
        type : Boolean,
        default :false
    }

},{
    timestamps : true,

    
})

module.exports = mongoose.model('USER',userSchema)