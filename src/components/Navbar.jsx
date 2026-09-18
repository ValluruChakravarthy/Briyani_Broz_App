import React from 'react';
import { useAuth } from './LoginFeature/AuthContext';
import { Link } from 'react-router-dom';

function Navbar({onClickMenu}){
    const { user } = useAuth();
    if(!user){return null;}
    const displayName = user
  ? user.user_metadata.full_name
  : "Test User";
  return (
    <nav className='fixed z-10 h-18  flex justify-between text-shadow-white
     backdrop-blur-md bg-[#3D1E16]
     w-full'>

      <div className='mx-4 flex items-center gap-4'>
      <button className='border-gray-300 bg-transparent hover:bg-orange-200 
        p-2 rounded-md text-ellipsis font-bold left-0 text-white'
        onClick={onClickMenu}>☰
        </button>
        <img 
          src='biryani.png' 
          className='h-10 w-10 object-cover rounded-full'
        />
        <span className='text-2xl font-bold text-white'>
          Biryani Bro's
        </span>
      </div>

      {/* Nav links */}
      <div className='hidden md:flex items-center gap-2 
      font-bold text-stone-600 mx-5'>
        <ul className='flex gap-8 text-gray-700 font-medium items-center'>
          {user&&<li className='cursor-pointer text-white hover:text-orange-500'>
                <Link to="/Profile">
      Your Bookings
    </Link></li>}
              <li className='text-white'>
              {user ? `Hi, ${user.user_metadata.full_name}` : 'Login'}
              </li>
        </ul>
      </div>

    </nav>
  );
}

export default Navbar;