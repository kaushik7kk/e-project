import mongoose from "mongoose"

const userSchema= new mongoose.Schema(
{
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
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
        required:true
    },
    University:{
        type:String,
        required:true
    },
    Course:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }
},
{timestamps:true});

export default mongoose.model("user",userSchema)