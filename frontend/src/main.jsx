import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import CreateBlog from './components/CreateBlog.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Error from './components/Error.jsx';
import UserProfile from './components/UserProfile.jsx';
import UserBlogs from './components/UserBlogs.jsx';
import OneBlog from './components/OneBlog.jsx';
import UpdateBlog from './components/UpdateBlog.jsx';
import { UserContextProvider } from './context/UserContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import About from './components/About.jsx';
import LikedBlogs from './components/LikedBlogs.jsx';
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "",
                element: <PrivateRoute/>,
                children:[
                    {
                        path: "/blog/create",
                        element: <CreateBlog />
                    },
                    {
                        path: "/blog/update/:blogId",
                        element: <UpdateBlog />
                    },
                    {
                        path: "/user/profile",
                        element: <UserProfile />
                    },
                    {
                        path: "/user/blogs",
                        element: <UserBlogs />
                    },
                    {
                        path: "/user/liked-blogs",
                        element: <LikedBlogs />
                    },
                ]
            },
            {
                path: "/blog/:blogId",
                element: <OneBlog />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/about",
                element: <About />
            },
        ],
        errorElement: <Error />
    },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        
        <RouterProvider router={router} />
    </UserContextProvider>
)
