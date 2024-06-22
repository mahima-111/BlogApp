import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import './index.css'
import { Toaster } from 'react-hot-toast';
const App = () => {
    return (
        <div className=''>
            <Toaster
            toastOptions={
                // Define default options
                {duration: 1000}
            }
            />
            <Navbar/>
            <div className='px-28 pb-20'>
            <Outlet/>
            </div>
        </div>
    )
}

export default App