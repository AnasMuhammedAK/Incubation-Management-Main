const mongoose = require('mongoose')

const applicationSchema = mongoose.Schema({
    User :{
        type : String,
        required : [true , ' please Enter Your userid'],
        unique : true
    },
    Name :{
        type : String,
        required : [true , ' please Enter Your Name']
    },
    Address:{
        type : String,
        required : [true , ' please Enter Your Name']
    },
    City :{
        type : String,
        required : [true , ' please Enter Your City'],
       
    },
    State :{
        type : String,
        required : [true , ' please Enter Your state']
    },
    Email:{
        type : String,
        required : [true , ' please Enter Your userid'],
        unique : true
    },
    Phone:{
        type : Number,
        required : [true , ' please Enter Your mobile no']
    },
    CompanyName:{
        type : String,
        required : [true , ' please Enter Your company name']
    },
    AboutTeam:{
        type : String,
        required : [true , ' please Enter Your background']
    },
    AboutProduct:{
        type : String,
        required : [true , ' please Enter Your products']
    },
    AboutProblem:{
        type : String,
        required : [true , ' please Enter Your problems']
    },
    AboutSolution:{
        type : String,
        required : [true , ' please Enter Your problems']
    },
    AboutValue:{
        type : String,
        required : [true , ' please Enter Your problems']
    },
    AboutRevenue:{
        type : String,
        required : [true , ' please Enter Your problems']
    },
    AboutMarket:{
        type : String,
        required : [true , ' please Enter Your problems']
    },
    Status:{
        type : String,
        default:"new"

    }



},{
    timestamps : true,

    
})

module.exports = mongoose.model('Application',applicationSchema)
