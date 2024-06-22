import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    picUrl : {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    likes:{
        type: [{
            type:mongoose.Types.ObjectId,
            ref:'User'
        }],
    },
    likeCount:{
        type: Number,
        default:0
    }
},{timestamps:true});

const Blog = mongoose.model('blog', blogSchema);
export default Blog;
