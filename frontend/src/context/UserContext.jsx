import {createContext,useEffect,useState} from 'react';
export const UserContext=createContext({});
import axios from 'axios';
export const UserContextProvider=({children})=>{
    const [userInfo,setUserInfo]=useState({
        _id: '',
        username:'',
        profilePic:''
    });

    const refetch=async()=>{
        try{
            const res=await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/auth/refetch',{withCredentials: true});
            if(res.status===200 && res.data!=='not logged in'){
                setUserInfo(res.data);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        refetch();
    },[]);

    return (<UserContext.Provider value={{userInfo,setUserInfo}}>
        {children}
    </UserContext.Provider>)
}