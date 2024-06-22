import axios from 'axios';
import { useState, useContext, useEffect } from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate,Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import toast from 'react-hot-toast';
const Login = () => {
    const {userInfo,setUserInfo}=useContext(UserContext);
    const currentUserId=userInfo._id;
    const navigate=useNavigate();
    const [passwordInput,setPasswordInput]=useState(false);
    const [formData, setformData] = useState({
        username: '',
        password: '',
    });
    const handleVisiblePassword=()=>{
        setPasswordInput(!passwordInput);
    }
    const [isEmpty, setIsEmpty] = useState({
        username: false,
        password: false,
    });
    const handleChange=(e)=>{
        const {name,value} = e.target;
        if(value){
            setIsEmpty({...isEmpty,[name]: false});
        }
        setformData({...formData,[name]: value});
    }
    const handleFocus=(e)=>{
        const {name,value} = e.target;
        if(value===''){
            setIsEmpty({...isEmpty,[name]: true});
        }
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        if(!formData.username || !formData.password){
            toast.error('all fields are required!');
            return;
        }
        try{
            const res=await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/auth/login',formData,{withCredentials: true});
            if(res.status===200){
                setUserInfo(res.data);
                toast.success('log in successful!');
                navigate('/');
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
    if(currentUserId){
        return <Navigate to='/' />
    }
    return (
        <form onSubmit={submitHandler} className='mt-8  flex justify-center'>
            <div className='flex flex-col w-[40%]'>
            
            <h2 className='text-3xl font-semibold text-center logo mb-6'>Login!</h2>

            <label htmlFor='username'>Username :</label>
            <input name='username' id='username' className={`${isEmpty.username?'border-red-500':'border-blue-400 mb-4'}`} onChange={handleChange} onFocus={handleFocus}/>
            {isEmpty.username && <p className="text-red-500 mb-4">Username cannot be empty!</p>}

            <label htmlFor='password'>Password :</label>
            <div className='relative mb-4'>
            <input name='password' id='password' className={`w-full ${isEmpty.password?'border-red-500':'border-blue-400'}`} onChange={handleChange} onFocus={handleFocus}  type={passwordInput?'text':'password'}/>
            <div className='absolute bottom-3 right-2 px-2 cursor-pointer' onClick={handleVisiblePassword}>{passwordInput?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</div>
            </div>
            {isEmpty.password && <p className="text-red-500">Password cannot be empty!</p>}

            <h4 className='mb-6 font-medium mt-4'>Don't have an account? Register  
                <Link to='/register'>
                <span className='text-blue-400 underline ml-1'>here</span></Link>
            </h4>
            <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Login