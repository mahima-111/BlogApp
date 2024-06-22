import React, { useState ,useRef,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
const UpdateBlog = () => {
    const {blogId}=useParams();
    const [blogObj,setBlogObj]=useState({});
    const titleRef=useRef('');
    const categoryRef=useRef('');
    const picUrlRef=useRef('');
    const descRef=useRef('');
    const navigate=useNavigate();
    const getBlog=async()=>{
        try{
            const res=await axios.get(import.meta.env.VITE_BACKEND_URL+`/api/blog/${blogId}`);
            if(res.status===200){
                setBlogObj(res.data);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getBlog();
    },[])

    const submitHandler=async (e)=>{
        e.preventDefault();
        const str=String(categoryRef.current.value);
        const arr=str.split(' ');
        const formData={
            title: titleRef.current.value,
            category: arr,
            picUrl: picUrlRef.current.value,
            desc: descRef.current.value,
        }
        try{
            const res=await axios.put(import.meta.env.VITE_BACKEND_URL+`/api/blog/update/${blogId}`,formData);

            if(res.status===200){
                toast.success('blog updated successfully');
                navigate(`/blog/${blogId}`);
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
    if(Object.keys(blogObj).length===0){
        return <h1>loading...</h1>
    }
    const {title,picUrl,desc,category}=blogObj;
    const newCat=category.join(' ');

    return (
        <form onSubmit={submitHandler} className='mt-8  flex justify-center'>
            <div className='flex flex-col '>
            
            <h2 className='text-3xl font-semibold text-center logo'>Create a Blog!</h2>

            <label htmlFor='title'>Title :</label>
            <input name='title' id='title' defaultValue={title} ref={titleRef} className='mb-4'/>

            <label htmlFor='category'>Category :</label>
            <input name='category' id='category' defaultValue={newCat} ref={categoryRef}/>
            <h5 className='mb-4'>{'(can add multiple categories separated by a space)'}</h5>

            <label htmlFor='picUrl'>picUrl :</label>
            <input name='picUrl' id='picUrl' defaultValue={picUrl} ref={picUrlRef} className='mb-4'/>

            <label htmlFor='desc'>Description :</label>
            <textarea name='desc' id='desc' defaultValue={desc} ref={descRef} className='mb-4'/>

            <button type='submit'>Update</button>
            </div>
        </form>
    )
}

export default UpdateBlog