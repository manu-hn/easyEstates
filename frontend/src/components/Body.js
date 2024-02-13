import React from 'react';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom"
import Home from './nav/Home';
import About from './nav/About';
import Profile from './nav/Profile';
import Login from "./auth/Login.js";
import SignUp from './auth/SignUp.js';
import PrivateRoute from './auth/PrivateRoute.js';
import Header from './nav/Header.js';
import CreateListing from './Listing/CreateListing.js';
import EditListing from './Listing/EditListing.js';
import Listing from './Listing/Listing.js';
import SearchListings from './Listing/SearchListings.js';

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
                    <Route path='/listing/:id' element={<Listing />} />
                    <Route path='/fetch' element={<SearchListings />} />
                    <Route element={<PrivateRoute />}>
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/create-listing' element={<CreateListing />} />
                        <Route path='/update-listing/:id' element={<EditListing />} />
                    </Route>
                </Routes>
            </BrowserRouter>


        </div>
    )
}

export default Body