import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"



const Header = () => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const { currentUser, isAuthenticated } = useSelector(store => store.user)

  function handleNavbar(e) {
    e.preventDefault()
    setIsNavBarOpen(!isNavBarOpen);
  }

  return (
    <header className='bg-slate-300 shadow-lg '>
      <div className='flex justify-between items-center max-w-6xl p-4 mx-auto'>
        <Link to={'/'}>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className=' text-gray-400'>easy</span>
            <span className=' text-orange-600'>Estates</span>
          </h1>
        </Link>
        <form action="" className='bg-slate-100 rounded-md py-1 px-4 flex items-center'>

          <input type="text" name="" id=""
            className='px-4 rounded-lg bg-transparent outline-none w-24 sm:w-56 placeholder:text-xs '
            placeholder='Search Here...' />

          <button><FaSearch /></button>
        </form>
        <div className=''>
          <ul className='flex gap-6 items-center'>
            <li className='hidden sm:inline-block text-slate-600 hover:underline font-semibold'><Link to={'/'}>Home</Link></li>
            <li className='hidden sm:inline-block text-slate-600 hover:underline font-semibold'><Link to={'/about'}>About</Link></li>
            <Link to={'/profile'}>
              {isAuthenticated && currentUser ?
                <img className='rounded-full w-8 h-8 object-cover' src={currentUser.avatar} alt="Profile Photo" />
                :
                <li className='text-slate-600 hover:underline font-semibold'>Login</li>
              }
            </Link>
          </ul>
        </div>

      </div>

    </header>
  )
}

export default Header