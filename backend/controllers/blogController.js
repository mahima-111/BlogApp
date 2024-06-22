import mongoose from "mongoose";
import Blog from "../models/blogModel.js";

export const createBlog=async(req,res,next)=>{
    try{
        const data=req.body;
        const fullData={...data,userId:req.user._id,author:req.user.username};
        const newBlog=new Blog(fullData);
        const savedBlog=await newBlog.save();
        res.status(200).json(savedBlog);
    }
    catch(err){
        next(err);
    }
}

export const getAllBlogs=async(req,res,next)=>{
    try{
        const searchTerm=req.query.searchTerm || '';
        const sortTerm=req.query.sortTerm;
        let sortCriteria={createdAt: -1};
        if(sortTerm==='oldest'){
            sortCriteria={createdAt: 1}
        }
        else if(sortTerm==='trending'){
            sortCriteria={likeCount: -1}
        }
        const blogList=await Blog.aggregate([
            {$match:{
                $or:[
                    {title:{$regex: searchTerm,$options:'i'}},
                    {desc:{$regex:searchTerm,$options:'i'}},
                    {category:{$elemMatch:{$regex:searchTerm,$options:'i'}}}
                ]
            }},
            {$sort:sortCriteria}
        ]);
        res.status(200).json(blogList);
    }
    catch(err){
        next(err);
    }
}

export const userBlogs=async (req,res,next)=>{
    try{
        const ObjectId=mongoose.Types.ObjectId;
        const userId=req.user._id;
        const id=String(userId);
        // const blogList=await Blog.find({userId});
        const blogList=await Blog.aggregate([
            {$match:
                {userId: new ObjectId(id)} 
            },
            {$sort:{createdAt:-1}}
        ]);
        res.status(200).json(blogList);
    }
    catch(err){
        next(err);
    }
}

export const likedBlogs=async (req,res,next)=>{
    try{
        const ObjectId=mongoose.Types.ObjectId;
        const userId=req.user._id;
        const id=String(userId);
        // const blogList=await Blog.find({ likes: { $in: [id] } });
        const blogList=await Blog.aggregate([
            {$match:
                {likes: { $in: [new ObjectId(id)] }}
            },
            {$sort:{createdAt:-1}}
        ]);
        res.status(200).json(blogList);
    }
    catch(err){
        next(err);
    }
}

export const oneBlog=async (req,res,next)=>{
    try{
        const blogId=req.params.blogId;
        const blog=await Blog.find({_id:blogId});
        res.status(200).json(blog[0]);
    }
    catch(err){
        next(err);
    }
}

export const likeBlog=async (req,res,next)=>{
    try{
        const blogId=req.body.blogId;
        const userId=req.user._id;

        const blog=await Blog.findById(blogId);
        if(blog.likes.includes(userId)){
            return res.status(400).json('already liked');
        }
        blog.likeCount+=1;
        blog.likes.push(userId);
        await blog.save();
        res.status(200).json(blog.likeCount);
    }
    catch(err){
        next(err);
    }
}

export const UnlikeBlog=async (req,res,next)=>{
    try{
        const blogId=req.body.blogId;
        const userId=req.user._id;

        const blog=await Blog.findById(blogId);
        if(!blog.likes.includes(userId)){
            return res.status(400).json('not liked so cannot unlike');
        }
        blog.likeCount-=1;
        blog.likes=blog.likes.filter((elem)=>{
            return elem!=userId;
        })
        await blog.save();
        res.status(200).json(blog.likeCount);
    }
    catch(err){
        next(err);
    }
}

export const updateBlog=async(req,res,next)=>{
    try{
        const blogId=req.params.blogId;
        const data=req.body;
        const updatedBlog=await Blog.findByIdAndUpdate(blogId,data,{
            new:true,
            runValidators:true
        });
        res.status(200).json(updatedBlog);
    }
    catch(err){
        next(err);
    }
}
