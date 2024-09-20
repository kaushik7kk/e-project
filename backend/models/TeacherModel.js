import mongoose from "mongoose"

const teacherSchema= new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
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
    Phone:{
        type:Number,
        required:true,
        unique:true
    },
    University:{
        type:String,
        required:true
    },
    Course:[{
        type:String,
        required:true
    }],
},
{timestamps:true})


export default mongoose.model("teacher",teacherSchema)