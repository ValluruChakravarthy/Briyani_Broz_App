import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { NavLink , useNavigate} from 'react-router-dom';
import { useAuth } from './LoginFeature/AuthContext';
import supabase from '../supabase';


function Sidebar({onClickClose}){
const {user}= useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error.message);
      return;
    }

    onClickClose();
  };

  const linkClass=({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 font-md rounded-xl transition-colors ${
        isActive ?'bg-amber-100 text-amber-700': 'hover:bg-amber-50 hover:text-amber-700'
      }`;
  return (
    <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />&&
    <div className="fixed h-screen inset-0 overlay w-71 z-10 bg-[#3f1b04] flex flex-col">
          <div className='flex justify-between text-ellipsis font-bold 
          text-2xl p-4 m-2 text-white'>
              Biryani Bro's
                <button
                type="button"
                onClick={onClickClose}
                className="flex justify-center bg-amber-200  text-black w-8 h-8 rounded-full 
                border-[0.2vw] text-lg hover:bg-orange-400">
                ✕
              </button>
          </div>

        <nav className='py-6 flex text-center 
              flex-col gap-2 text-stone-200 font-medium mt-5'>
         <NavLink to="/Home" onClick={onClickClose} className={linkClass}>
          Home
          </NavLink>
          <NavLink to="/Reservations" onClick={onClickClose} className={linkClass}>
          Table Reservation
          </NavLink>
          <NavLink to="/Menu" onClick={onClickClose} className={linkClass}>
          Menu
          </NavLink>
          <NavLink to="/Profile" onClick={onClickClose} className={linkClass}>
          Profile
          </NavLink>
        </nav>

{user?
      <>
        <p className='text-white mt-auto mb-4 text-center'>Logged in as {user.user_metadata.full_name}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="mb-1 flex justify-center
          items-center rounded-xl font-bold text-xl py-3
          bg-[#FAF8F5] text-black hover:bg-amber-100
          transition-colors text-center"
        >
          Logout
        </button>
      </>
      :
       <NavLink
        to="/Login"
        onClick={onClickClose}
        className="mt-auto mb-1 flex justify-center
         items-center rounded-xl font-bold text-xl py-4 bg-[#FAF8F5] text-black hover:bg-amber-100 transition-colors text-center"
      >
        Login
      </NavLink>

}

      <div className='bg-slate-800 justify-center flex flex-row px-3 py-1 mt-auto
      text-white font-semibold text-sm'>
        {new Date().getFullYear()} All Rights Reserved..
      </div>

      </div>

        
  )
};

export default Sidebar;
