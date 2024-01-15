import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from './nav/Home';
import About from './nav/About';
import Profile from './nav/Profile';
import Login from "./auth/Login.js";
import Logout from "./auth/Logout.js";
import Layout from './Layout.js';

const Body = () => {

    const rootRouter = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children : [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: "/about",
                    element: <About />
                },
                {
                    path: '/profile',
                    element : <Profile />
                },
                {
                    path : 'login',
                    element : <Login />
                },
                {
                    path : 'logout',
                    element : <Logout />
                }
            ]
        },
       
    ])

    return (
        <div className=''>
            <RouterProvider router={rootRouter} />
        </div>
    )
}

export default Body