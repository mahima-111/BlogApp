import Categories from './Categories';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { FaHeart } from "react-icons/fa6";
import axios from 'axios';
import toast from 'react-hot-toast';
const ShowBlogs = ({elem,getBlogs}) => { 
    const {userInfo}=useContext(UserContext);
    const currentUserId=userInfo._id;
    const {_id,title,picUrl,desc,category,author,createdAt,likes,likeCount}=elem;  
    const [isLiked,setIsLiked]=useState(likes.includes(currentUserId));  
    const navigate=useNavigate();
    const [likeCounter,setLikeCounter]=useState(likeCount);
    const date1=new Date(createdAt);
    const blogDate=date1.toLocaleString();

    const handleLike=async()=>{
        if(!currentUserId){
            toast.error('login to like a post!');
            navigate('/login');
            return;
        }
        try{
            const res=await axios.put(import.meta.env.VITE_BACKEND_URL+'/api/blog/like',{blogId:_id});
            if(res.status===200){
                setIsLiked(true);
                setLikeCounter(res.data);
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }

    const handleUnlike=async()=>{
        try{
            const res=await axios.put(import.meta.env.VITE_BACKEND_URL+'/api/blog/unlike',{blogId:_id});
            if(res.status===200){
                setIsLiked(false);
                setLikeCounter(res.data);
                getBlogs();
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }

    return <div className='flex w-full gap-8 mb-8 h-max border-b-2 border-blue-400/90 p-4 ' key={_id}>
        <img src={picUrl} className='w-[40%] object-contain'/>
        <div className='py-4 px-4 flex flex-col gap-2 w-[50%]'>
            <h2 className='text-2xl font-medium'>{title}</h2>
            <div className='flex justify-between'>
            <h3 className='text-lg font-medium'>@{author}</h3>
            <div>
            {isLiked?<h3 className='text-red-500 cursor-pointer' onClick={handleUnlike}><FaHeart/></h3>:<h3 className='text-gray-400 cursor-pointer' onClick={handleLike}><FaHeart/></h3>}
            <h4>{likeCounter}</h4>
            </div>
            </div>
            <Categories catList={category}/>
            <p>{desc}</p>
            <Link to={`/blog/${_id}`} className='text-blue-400 self-end '>...see more</Link>
            <h4 className='self-end mt-4'>{blogDate}</h4>
        </div>
    </div>
}

export default ShowBlogs