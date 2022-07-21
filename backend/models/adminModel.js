const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
   email :{
        type : String,
        required : [true , ' please Enter Your Email'],
        unique : true
    },
    password :{
        type : String,
        required : [true , ' please Enter Your Password']
    }
})

module.exports = mongoose.model('Admin',adminSchema)