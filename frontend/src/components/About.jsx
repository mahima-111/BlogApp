import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import { UserContext } from '../context/UserContext';
const About = () => {
    const {userInfo}=useContext(UserContext);
    const userId=userInfo._id;
    return (
        <div className='flex flex-col items-start mt-12 gap-2 ml-12'>
            <div className='flex items-center'>
            <h1 className='logo text-3xl'>Have something to share?</h1>
            <h2 className='ml-3 font-semibold text-2xl text-violet-400 '>write a blog post!</h2>
            </div>

            <div className='flex items-center mb-6'>
            <h1 className='logo text-3xl'>Want to engage in a journey of exploration?</h1>
            <h2 className='ml-3 font-semibold text-2xl text-violet-400 '>explore!</h2>
            </div>

            <Link to={userId?'/':'/login'}><button className='flex items-center gap-4 py-3 px-6 text-2xl'>
                Get Started
                <span><FaArrowRight/></span>
            </button></Link>

        </div>
    )
}

export default About