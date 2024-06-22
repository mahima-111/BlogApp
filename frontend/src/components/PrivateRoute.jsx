import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import {Outlet,Navigate} from 'react-router-dom';

const PrivateRoute = () => {
    const {userInfo}=useContext(UserContext);
    const userId=userInfo._id;

    if(userId){
        return <Outlet/>
    }
    else{
        return <Navigate to='/login'/>
    }
    
}

export default PrivateRoute