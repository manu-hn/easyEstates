import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [search, setSearch] = useState('');
  const { currentUser, isAuthenticated } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHeaderFormSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('search', search);
    const searchQuery = urlParams.toString();
    navigate(`/fetch?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get('search');
    if (searchTermFromURL) {
      setSearch(searchTermFromURL);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-300 shadow-md">
      <div className="flex justify-between items-center max-w-6xl p-4 mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className=" text-gray-400">easy</span>
            <span className=" text-orange-600">Estates</span>
          </h1>
        </Link>
        <form
          action=""
          className="bg-slate-100 rounded-md py-1 px-4 flex items-center"
          onSubmit={handleHeaderFormSubmit}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 rounded-lg bg-transparent outline-none w-24 sm:text-lg sm:w-56 placeholder:text-xs sm:placeholder::text-lg"
            placeholder="Search Here..."
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        <div>
          <ul className="flex gap-6 items-center">
            <li className="hidden sm:inline-block text-slate-600 hover:underline font-semibold">
              <Link to="/">Home</Link>
            </li>
            <li className="hidden sm:inline-block text-slate-600 hover:underline font-semibold">
              <Link to="/about">About</Link>
            </li>
            <Link to="/profile">
              {isAuthenticated && currentUser ? (
                <img
                  className="rounded-full w-8 h-8 object-cover"
                  src={currentUser.avatar}
                  alt="Profile Photo"
                />
              ) : (
                <li className="text-slate-600 hover:underline font-semibold">
                  Login
                </li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
