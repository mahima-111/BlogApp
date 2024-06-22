import { useState,useContext } from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext.jsx';
import toast from 'react-hot-toast';
const Navbar = () => {
    const {userInfo,setUserInfo}=useContext(UserContext);
    const user=userInfo.username;
    const profile=userInfo.profilePic;
    const [isOpen,setIsOpen]=useState(false);
    const navigate=useNavigate();

    const handleLogout=async()=>{
        try{
            setIsOpen(false);
            const res=await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/auth/logout');
            if(res.status===200){
                setUserInfo({
                    _id:'',
                    username:'',
                    profilePic:''
                });
                toast.success('logout successful');
                navigate('/');
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }

    return (
        <nav className='py-2 px-28 flex justify-between items-center border-b-2 border-blue-400'>
            <ul className='font-medium text-xl text-blue-400 flex gap-4 '>
                <Link to='/'><li className=' hover:text-purple-400 duration-300'>Home</li></Link>
                <Link to='/about'><li className=' hover:text-purple-400 duration-300'>About</li></Link>
            </ul>
            <div className='flex items-center gap-4'>
                <img src={logo} className='h-10'/>
                <h2 className='logo'>Blogify</h2>
            </div>  
            <div className='flex'>
            <Link to='/blog/create'><button className='mr-4'>Create Blog</button> </Link>  
            {user?
            <div className='flex items-center gap-2 relative'>
                <img src={profile} className='rounded-full h-10 w-10'/>
                <h3 className='text-xl font-semibold text-blue-400 flex items-center cursor-pointer' onClick={()=>{
                    setIsOpen(!isOpen);
                }}>
                    {user}
                    <span className=''>
                    {isOpen?<FaCaretUp/>:<FaCaretDown/>}
                    </span>
                </h3>
                {isOpen && <ul className='absolute top-10 left-14 w-max bg-blue-400 text-white font-medium text-lg px-4 py-4'>
                    <Link to='/user/profile' className='mb-2' onClick={()=>{
                        setIsOpen(false);
                    }}><li>Profile</li></Link>
                    <Link to='/user/blogs' className='mb-2' onClick={()=>{
                        setIsOpen(false);
                    }}><li>Your Blogs</li></Link>
                    <Link to='/user/liked-blogs' className='mb-2' onClick={()=>{
                        setIsOpen(false);
                    }}><li>Liked Blogs</li></Link>
                    <li className='mb-2 cursor-pointer' onClick={handleLogout}>Logout</li>
                </ul>}
            </div>
            :<Link to='/login'><button>Login</button> </Link>}      
            
            </div>

        </nav>
    )
}

export default Navbar