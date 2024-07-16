import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const CreateBlog = () => {
    const title=useRef('');
    const category=useRef('');
    const picUrl=useRef('');
    const desc=useRef('');
    const navigate=useNavigate();

    const submitHandler=async (e)=>{
        e.preventDefault();
        const str=String(category.current.value);
        const arr=str.split(' ');
        const formData={
            title: title.current.value,
            category: arr,
            picUrl: picUrl.current.value,
            desc: desc.current.value,
        }
        
        if(!formData.title || !formData.category || !formData.picUrl || !formData.desc){
            toast.error('all fields are required!');
            return;
        }
        try{
            const res=await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/blog/create',formData,{withCredentials: true});
            if(res.status===200){
                toast.success('blog created successfully');
                navigate('/');
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
    return (
        <form onSubmit={submitHandler} className='mt-8  flex justify-center'>
            <div className='flex flex-col '>
            
            <h2 className='text-3xl font-semibold text-center logo'>Create a Blog!</h2>

            <label htmlFor='title'>Title :</label>
            <input name='title' id='title' ref={title} className='mb-4'/>

            <label htmlFor='category'>Category :</label>
            <input name='category' id='category' ref={category}/>
            <h5 className='mb-4'>{'(can add multiple categories separated by a space)'}</h5>

            <label htmlFor='picUrl'>picUrl :</label>
            <input name='picUrl' id='picUrl' ref={picUrl} className='mb-4'/>

            <label htmlFor='desc'>Description :</label>
            <textarea name='desc' id='desc' ref={desc} className='mb-4'/>

            <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default CreateBlog