import { useContext, useEffect, useState } from 'react'
import Categories from './Categories';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { UserContext } from '../context/UserContext.jsx';
import { FaHeart } from "react-icons/fa6";
import toast from 'react-hot-toast';

const OneBlog = () => {
    const {userInfo}=useContext(UserContext);
    const currentUserId=userInfo._id; 

    const navigate=useNavigate();
    const [blogObj,setBlogObj]=useState({});
    const {blogId}=useParams();
    
    const {_id,title,picUrl,desc,category,author,updatedAt,likeCount,likes,createdAt,userId}=blogObj;
    const updatedDate=new Date(updatedAt);
    const localUpdatedDate=updatedDate.toLocaleString();
    const createdDate=new Date(createdAt);
    const localCreatedDate=createdDate.toLocaleString();
    const [isLiked,setIsLiked]=useState(likes?.includes(currentUserId));  
    const [likeCounter,setLikeCounter]=useState(likeCount);

    const getBlog=async()=>{
        try{
            const res=await axios.get(import.meta.env.VITE_BACKEND_URL+`/api/blog/${blogId}`,{withCredentials: true});
            if(res.status===200){
                setBlogObj(res.data);
                setIsLiked(res.data.likes?.includes(currentUserId));
                setLikeCounter(res.data.likeCount);
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
    useEffect(()=>{
        getBlog();
    },[])

    const handleLike=async()=>{
        if(!currentUserId){
            toast.error('login to like a post!');
            navigate('/login');
            return;
        }
        try{
            const res=await axios.put(import.meta.env.VITE_BACKEND_URL+'/api/blog/like',{blogId:_id},{withCredentials: true});
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
            const res=await axios.put(import.meta.env.VITE_BACKEND_URL+'/api/blog/unlike',{blogId:_id},{withCredentials: true});
            if(res.status===200){
                setIsLiked(false);
                setLikeCounter(res.data);
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
    if(Object.keys(blogObj).length===0){
        return <h1>loading...</h1>
    }

    return (
        <div className='flex flex-col gap-2 items-center mt-8'>
            <h2 className='text-4xl font-semibold text-blue-400'>{title}</h2>
            <h3 className='text-xl font-medium flex gap-32 items-center justify-center'>@{author}
            {userId===currentUserId && <span className='cursor-pointer' onClick={()=>{
                navigate(`/blog/update/${_id}`);
            }}><FaRegEdit/></span>}
            </h3>
            <Categories catList={category}/>
            <div>
            {isLiked?<h3 className='text-red-500 cursor-pointer' onClick={handleUnlike}><FaHeart/></h3>:<h3 className='text-gray-400 cursor-pointer' onClick={handleLike}><FaHeart/></h3>}
            <h4>{likeCounter}</h4>
            </div>
            <img src={picUrl} className='w-[50%] my-4'/>
            <p className='w-[70%] text-lg text-gray-600'>{desc}</p>
            <div className='flex gap-8 mt-4'>
            <h4 className='text-lg font-medium'>Created at: {localCreatedDate}</h4>
            <h4 className='text-lg font-medium'>Updated at: {localUpdatedDate}</h4>
            </div>
        </div>
    )
}

export default OneBlog