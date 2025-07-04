import React from 'react';
import {assets} from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='bg-black flex justify-between items-center w-screen'>
      <NavLink to="/" className="no-underline"><h5 className='p-5 pb-6 text-white hover:text-gray-500 transition-colors duration-200'>RotMG Loot Tracker</h5></NavLink>
      <NavLink to="/settings">< img src={assets.userImg} className='px-5'></img></NavLink>
    </div>
  )
}

export default Navbar
