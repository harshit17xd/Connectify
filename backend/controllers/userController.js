import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const register = async(req,res)=>{
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;
        if(!fullname || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({message:"All fields are requires!!"});
        }
        if(password != confirmPassword){
            return res.status(400).json({message:"Passwords doesnt match!!!"});
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"Username alr exists!!!"});
        }
        //hashed password
        const hashedPassword = await bcrypt.hash(password,10);

        //profile photo
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`

        await  User.create({
            fullname,
            username,
            password:hashedPassword,
            profilePhoto:gender=="male"? maleProfilePhoto:femaleProfilePhoto  ,
            gender
        });
        return res.status(201).json({
            message:"Account Created Successfully",
            sucess:true
        })
    } catch (error) {
        console.log(error);
        
    }
};

export const login = async(req,res) =>{
    try {
        const{username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({message:"All fields are requires!!"});
        }
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({message:"Incorrect username or password",sucess:false});
        };

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:"Incorrect username or password",sucess:false});
        }

        const tokenData = {
            userId:user._id
        };
        const token = jwt.sign(tokenData,process.env.JWT_SCERET_KEY,{expiresIn:'1d'});
        

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpOnly:true,sameSite:'strict'}).json({
            _id:user._id,
            username:user.username,
            fullname:user.fullname,
            profilephoto:user.profilePhoto
        });

    } catch (error) {
        console.log(error);
    }
}


export const logout = (req,res) =>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logout sucessfull"
        })
    } catch (error) {
        console.log(error);
        
    }
}


export const getOtherUSers = async (req,res) =>{
    try {
        const loggedInUserId = req.id
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}