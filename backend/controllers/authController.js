import UserModel from "../models/UserModel.js";
import { comparePassword,hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken"


export const registerController = async (req, res) => {
    try {
        const {FirstName,LastName,email,password,Phone,University,Course}=req.body
        if(!FirstName){
            return res.send({message:"FirstName is Required"})
        }
        if(!email){
            return res.send({message:"Email is Required"})
        }
        if(!password){
            return res.send({message:"Password is Required"})
        }
        if(!Phone){
            return res.send({message:"Phone is Required"})
        }
        if(!University){
            return res.send({message:"University is Required"})
        }
        if(!Course){
            return res.send({message:"Course is Required"})
        }
        const existingUser=await UserModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Email Already Exist"
            })
        }
        const hashedPassword=await hashPassword(password)
        const user=await new UserModel({
            FirstName,
            LastName,
            email,
            password:hashedPassword,
            Phone,
            University,
            Course
        }).save();
        res.status(200).send({
            success:true,
            message:"User Registered",
            user
        })

    } catch (error) {
        console.log(error)
        res.send(500).send({
            success:false,
            message:"Error in registeration"
        })
    }
};


export const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email||!password){
            return res.status(404).send({
                success:false,
                message:'Invalid Email or Password'
            })
        }
        const user=UserModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User do not exist"
            })
        }
        
        const match=comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token=JWT.sign({_id:user._id},"eproject123",
            {expiresIn:'7d'})

        return res.status(200).send({
            success:true,
            message:"Login Successfully",
            user:{
                _id:user._id,
                FirstName:user.FirstName,
                LastName:user.LastName,
                email:user.email,
                phone: user.phone,
                University:user.University,
                Course:user.Course,
                role:user.role
            },
            token
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
} 

