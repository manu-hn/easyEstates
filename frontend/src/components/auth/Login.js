import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ESTATE_URL } from '../../utils/Constants';
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginInitiated, loginSuccess } from "../../redux/slices/userSlice.js"
import OAuth from './OAuth.js';
import jsCookie from 'js-cookie';



const Login = () => {

  const { loading, error } = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const email = useRef(null);
  const password = useRef(null);


  async function handleLoginSubmit(e) {
    e.preventDefault();
    dispatch(loginInitiated())
    try {
      const userData = { email: email.current.value, password: password.current.value, }
      const response = await axios.post(ESTATE_URL + 'login', JSON.stringify(userData),
        {
          headers: { 'Content-type': 'application/json' },
          withCredentials: true,
        });
      console.log(response?.data?.access_token)
      jsCookie.set('token',response?.data?.access_token )
      dispatch(loginSuccess(response.data.data))

      // setCookie('access_tokenF', response?.data?.access_token)
console.log("hiii")
      navigate('/')
    } catch (error) {
      dispatch(loginFailure(error?.response?.data?.message))

    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='font-semibold text-2xl text-center my-7'>Login</h1>
      <form className='flex flex-col gap-4' onSubmit={handleLoginSubmit}>
        <input className='rounded-lg outline-none border p-3' type="email" name="email" id="email" placeholder='Enter Email' ref={email} />
        <input className='rounded-lg outline-none border p-3' type="password" name="password" id="password" placeholder='Enter Password' ref={password} />
        <button disabled={loading} type='submit' className='bg-[#E58914] text-white disabled:opacity-20 p-3 rounded-lg hover:opacity-80'>{loading ? "Loading..." : "Login"}</button>

        <OAuth />
      </form>

      <div className='flex gap-3 mt-6'>
        <p>Don&apos;t have an account?</p>
        <Link to={'/signup'}> <span className='text-blue-600'>Sign Up</span> </Link>

      </div>
      {/* <p className='text-red-500 text-sm'>{error}</p> */}
    </div>
  )
}

export default Login