// require mongose
const mongoose = require("mongoose");

// create a schema
const modelSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
},{timestamps:true})

// save the schema
const dataBase = mongoose.model("classProject", modelSchema);

// export the schema module
module.exports = dataBase