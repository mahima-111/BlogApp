import Blog from "../models/blogModel.js";
const checkOwnership=async (req,res,next)=>{
    try{
        const userId=req.user._id;
        console.log(userId);
        const blogId=req.params.blogId;
        const UserBlog=await Blog.findById(blogId);
        if(UserBlog.userId!=userId){
            res.status(403);
            throw new Error('u cannot alter this blog');
        }
        next();
    }
    catch(err){
        next(err);
    }
}
export default checkOwnership;