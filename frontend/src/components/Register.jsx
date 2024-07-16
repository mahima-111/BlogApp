import axios from 'axios';
import { useState} from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Register = () => {
    const [passwordInput,setPasswordInput]=useState(false);
    const navigate=useNavigate();
    const [formData, setformData] = useState({
        username: '',
        password: '',
        profilePic: '',
    });
    const handleVisiblePassword=()=>{
        setPasswordInput(!passwordInput);
    }
    const [isEmpty, setIsEmpty] = useState({
        username: false,
        password: false,
        profilePic: false,
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
    const submitHandler=async (e)=>{
        e.preventDefault();
        if(!formData.username || !formData.password || !formData.profilePic){
            toast.error('all fields are required!');
            return;
        }
        try{
            const res=await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/auth/register',formData,{withCredentials: true});
            if(res.status===200){
                toast.success('registered successfully! Please login')
                navigate('/login');
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
    return (
        <form onSubmit={submitHandler} className='mt-8  flex justify-center'>
            <div className='flex flex-col w-[40%]'>
            
            <h2 className='text-3xl font-semibold text-center logo mb-6'>Register!</h2>

            <label htmlFor='username'>Username :</label>
            <input name='username' id='username' className={`${isEmpty.username?'border-red-500':'border-blue-400 mb-4'}`} onChange={handleChange} onFocus={handleFocus}/>
            {isEmpty.username && <p className="text-red-500 mb-4">Username cannot be empty!</p>}

            <label htmlFor='password'>Password :</label>
            <div className='relative'>
            <input name='password' id='password' className={`w-full ${isEmpty.password?'border-red-500':'border-blue-400'}`} onChange={handleChange} onFocus={handleFocus} type={passwordInput?'text':'password'} />
            <div className='absolute bottom-3 right-2 px-2 cursor-pointer' onClick={handleVisiblePassword}>{passwordInput?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</div>
            </div>
            {isEmpty.password && <p className="text-red-500">Password cannot be empty!</p>}
            
            <label htmlFor='profilePic' className='mt-4'>Profile Pic Url :</label>
            <input name='profilePic' id='profilePic' className={`${isEmpty.profilePic?'border-red-500':'border-blue-400 mb-4'}`} onFocus={handleFocus} onChange={handleChange}/>
            {isEmpty.profilePic && <p className="text-red-500 mb-4">Profile Pic cannot be empty!</p>}

            <h4 className='mb-6 font-medium'>Already have an account? Login  
                <Link to='/login'>
                <span className='text-blue-400 underline ml-1'>here</span></Link>
            </h4>

            <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Register