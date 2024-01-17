import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ESTATE_URL } from '../../utils/Constants';
import Cookies from 'js-cookie';


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate();

  const email = useRef(null);
  const password = useRef(null);


  async function handleLoginSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    try {
      const userData = { email: email.current.value, password: password.current.value, }
      const response = await axios.post(ESTATE_URL + 'login', JSON.stringify(userData), { headers: { 'Content-type': 'application/json' } });

      Cookies.set('accessToken', response.data.accessToken);
      console.log(response.data)
      setIsLoading(false);
      navigate('/')
    } catch (error) {
      setIsLoading(false);
      console.log(error);

    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='font-semibold text-2xl text-center my-7'>Login</h1>
      <form className='flex flex-col gap-4' onSubmit={handleLoginSubmit}>
        <input className='rounded-lg outline-none border p-3' type="email" name="email" id="email" placeholder='Enter Email' ref={email} />
        <input className='rounded-lg outline-none border p-3' type="password" name="password" id="password" placeholder='Enter Password' ref={password} />
        <button disabled={isLoading} type='submit' className='bg-[#E50914] text-white disabled:opacity-20 p-3 rounded-lg hover:opacity-80'>{isLoading ? "Loading..." : "Login"}</button>
      </form>
      <div className='flex gap-3 mt-6'>
        <p>Don&apos;t have an account?</p>
        <Link to={'/signup'}> <span className='text-blue-600'>Sign Up</span> </Link>

      </div>
    </div>
  )
}

export default Login