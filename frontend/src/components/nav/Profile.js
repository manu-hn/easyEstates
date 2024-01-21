import React, { useRef } from 'react';
import {  useSelector } from 'react-redux';

const Profile = () => {
  const fileRef=useRef(null)
  const { currentUser } = useSelector(store => store.user)
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8'>Profile</h1>
      <form className='flex flex-col' >
        <input type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={()=>fileRef.current.click()} className='h-28 w-28 rounded-full cursor-pointer object-cover self-center mt-4'
          src={currentUser.avatar} alt="" />
        <input type="text" name="fullName" id='fullName' placeholder='Full Name' className='my-2 outline-none rounded-lg px-4 py-2' />
        <input type="text" name="username" id='username' placeholder='Username' className='my-2 outline-none rounded-lg px-4 py-2' />
        <input type="text" name="email" id='email' placeholder='email' className='my-2 outline-none rounded-lg px-4 py-2' />
        <input type="text" name="mobile" id='mobile' placeholder='mobile' className='my-2 outline-none rounded-lg px-4 py-2' />
        <input type="text" name="password" id='password' placeholder='password' className='my-2 outline-none rounded-lg px-4 py-2' />
        <button className='bg-orange-600 my-2 py-2 rounded-lg text-white hover:opacity-90 disabled:opacity-60'>Update</button>
      </form>
      <div className='flex justify-between mt-6'>
        <span className='cursor-pointer font-medium text-red-700'>Delete account</span>
        <span className='cursor-pointer font-medium text-red-700'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile