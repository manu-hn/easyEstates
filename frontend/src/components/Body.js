import React from 'react';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom"
import Home from './nav/Home';
import About from './nav/About';
import Profile from './nav/Profile';
import Login from "./auth/Login.js";
import SignUp from './auth/SignUp.js';
import PrivateRoute from './auth/PrivateRoute.js';
import Header from './nav/Header.js';

const Body = () => {



    return (
        <div className=''>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />

                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route element={<PrivateRoute />}>
                        <Route path='/profile' element={<Profile />} />
                    </Route>
                </Routes>
            </BrowserRouter>


        </div>
    )
}

export default Body