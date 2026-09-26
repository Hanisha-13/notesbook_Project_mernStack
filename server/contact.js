const mongoose = require("mongoose")

const contactSchema =mongoose.Schema({name:{
    type:String,
    required:true,
    minlength:3
},
    email:{
        type:String,
        required:true,
        unique:true,
    } ,phonenumber:{
        type:number,
        required:true
    }
})

module.exports = mongoose.model("contact",contactSchema)