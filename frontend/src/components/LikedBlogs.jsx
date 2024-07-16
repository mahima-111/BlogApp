import { useEffect, useState,useContext } from 'react'
import axios from 'axios';
import ShowBlogs from './ShowBlogs';
import { UserContext } from '../context/UserContext.jsx';
import toast from 'react-hot-toast';

const LikedBlogs = () => {
    const [list,setList]=useState([]);
    // const {userInfo}=useContext(UserContext);
    // const user=userInfo.username;
    const getBlogs= async()=>{
        try{
            const res=await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/blog/liked-blogs',{withCredentials: true});
            if(res.status===200){
                setList(res.data);
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
    useEffect(()=>{
        getBlogs();
    },[])
    
    return <div className='flex flex-col items-center mt-8 gap-2'>
        <h1 className='font-semibold text-4xl mb-2 text-blue-400'> Liked Blogs!</h1>
        <div>
        <div className=''>
            {list.map((elem)=>{
                return <ShowBlogs elem={elem} key={elem._id} getBlogs={getBlogs}/>
            })}
        </div>
        </div>
    </div>
}

export default LikedBlogs