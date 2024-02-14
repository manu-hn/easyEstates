import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ESTATE_URL } from '../../utils/Constants';
import OAuth from "./OAuth.js";



const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({});
    
    const handleSignUpFormDataChange=(e)=>{
        setSignUpData({...signUpData, [e.target.id] : e.target.value});  

    }

    async function handleSignUpSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.post(ESTATE_URL + "signup", JSON.stringify(signUpData), { headers: { 'Content-type': 'application/json' } });
         
            setIsLoading(false);
            navigate('/login');

        } catch (error) {
            setIsLoading(false)
            console.log(error);

        }
    }


    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='font-semibold text-2xl text-center my-7'>Sign Up</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSignUpSubmit}>
                <input onChange={handleSignUpFormDataChange} className='rounded-lg outline-none border p-3' type="text" name="fullName" id="fullName" placeholder='Enter Full Name' />
                <input onChange={handleSignUpFormDataChange} className='rounded-lg outline-none border p-3' type="text" name="username" id="username" placeholder='Enter User name' />
                <input onChange={handleSignUpFormDataChange} className='rounded-lg outline-none border p-3' type="email" name="email" id="email" placeholder='Enter Email' />
                <input onChange={handleSignUpFormDataChange} className='rounded-lg outline-none border p-3' type="number" name="mobile" id="mobile" placeholder='Enter Mobile' />
                <input onChange={handleSignUpFormDataChange} className='rounded-lg outline-none border p-3' type="password" name="password" id="password" placeholder='Enter Password' />
                <button disabled={isLoading} type='submit' className='bg-[#E58914] text-white disabled:opacity-20 p-3 rounded-lg hover:opacity-80'>{isLoading ? "Loading..." : "Sign Up"}</button>
                <OAuth />
            </form>
            <div className='flex gap-3 mt-6'>
                <p>Already have an Account?</p>
                <Link to={'/login'}> <span className='text-blue-600'>Login</span> </Link>

            </div>
        </div>
    )
}

export default SignUp