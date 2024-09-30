import mongoose from "mongoose"

const teacherSchema= new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true  
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    university:{
        type:String,
        required:true
    },
    course:[{
        type:String,
        required:true
    }],
},
{timestamps:true})


export default mongoose.model("teacher",teacherSchema)