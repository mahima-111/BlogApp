import { useContext } from 'react'
import BlogList from './BlogList';
import { UserContext } from '../context/UserContext.jsx';
const Home = () => {
    const {userInfo}=useContext(UserContext);
    const user=userInfo.username;
    return (
        <div className='flex flex-col items-center mt-8 gap-2'>
            <h1 className='font-semibold text-4xl mb-4 text-blue-400'>Hello {user?user:'user'}!</h1>

            <BlogList/>
        </div>
    )
}

export default Home