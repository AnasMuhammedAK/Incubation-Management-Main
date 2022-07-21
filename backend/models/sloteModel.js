const mongoose = require('mongoose')

const sloteSchema = mongoose.Schema({
    name :{
        type : String,
        default :""
    },
    Company : {
        type : String,
        default : ""
    },
    Booked :{
        type:Boolean,
        default:false
    }

},{
    timestamps : true,

    
})

module.exports = mongoose.model('Slote',sloteSchema)