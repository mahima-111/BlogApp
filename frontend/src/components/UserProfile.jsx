import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import { Link } from 'react-router-dom';
const UserProfile = () => {
    const {userInfo}=useContext(UserContext);
    const user=userInfo.username;
    const profile=userInfo.profilePic;
    return (
        <div className='mt-14 flex flex-col items-center gap-4'>
            <img src={profile} className='h-40 w-40 rounded-full'/>
            <h2 className='font-medium text-3xl'>@{user}</h2>
            <div>
                <Link to='/user/blogs'><button className='mr-4'>Your Blogs</button></Link>
                <Link to='/user/liked-blogs'><button className='mr-4'>Liked Blogs</button></Link>
            </div>
        </div>
    )
}

export default UserProfile