import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const registerUser=async(req,res,next)=>{
    try{
        const {username,password,profilePic}=req.body;
        if(!username || !password || !profilePic){
            res.status(400);
            throw new Error('all fields are required!');
        }
        const isUserPresent=await User.findOne({username});
        if(isUserPresent){
            res.status(500);
            throw new Error('user already exists');
        }
        const newUser=new User(req.body);
        const savedUser= await newUser.save();
        res.status(200).json('register success');
    }
    catch(err){
        next(err);
    }
}

export const loginUser=async(req,res,next)=>{
    try{
        const {username,password}=req.body;
        const isUserPresent=await User.findOne({username});
        if(!isUserPresent){
            res.status(400);
            throw new Error('username or password is invalid');
        }
        const isPasswordValid=await isUserPresent.comparePassword(password);
        if(!isPasswordValid){
            res.status(400);
            throw new Error('username or password is invalid');
        }

        const payload={
            _id: isUserPresent._id,
            username: isUserPresent.username,
            // profilePic: isUserPresent.profilePic
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET);
        //store token in local storage
        res.cookie('jwt',token,{httpOnly: true});

        // res.status(200).json({
        //     username: isUserPresent.username,
        //     profilePic: isUserPresent.profilePic
        // });
        const userDetails={
            _id: isUserPresent._id,
            username: isUserPresent.username,
            profilePic: isUserPresent.profilePic
        }
        res.status(200).json(userDetails);
    }
    catch(err){
        next(err);
    }
}

export const logoutUser=(req,res,next)=>{
    try{
        res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0)
        });
        res.status(200).json('logout successful');
    }
    catch(err){
        next(err);
    }
}

export const refetchUser=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            res.status(200).json('not logged in');
            // throw new Error('unauthorized! no token');
            return;
        }
        
        const tokenData=jwt.verify(token,process.env.JWT_SECRET);
        if(!tokenData){
            res.status(401);
            throw new Error('unauthorized! token is not valid');
        }
        // const {_id,...rest}=tokenData;
        const userId=tokenData._id;
        const userInfo= await User.findById(userId);
        if(!userInfo){
            throw new Error('not logged in');
        }
        const userDetails={
            _id: userInfo._id,
            username: userInfo.username,
            profilePic: userInfo.profilePic
        }
        res.header('Access-Control-Allow-Credentials', true);
        res.status(200).json(userDetails);
    }
    catch(err){
        next(err);
    }
} 