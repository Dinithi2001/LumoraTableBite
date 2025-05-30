import React from 'react'
import logo from '../assets/logo.png'
import { LogOut } from 'lucide-react';
import {useNavigate } from 'react-router-dom';

const Header = ({name,handleLogout}) => {

  const navigate = useNavigate();

  // const handleLogout = () => {
  //   navigate('/');
  // };

  return (
  <div className='bg-[#D4AF37] h-20  rounded-lg flex items-center gap-4 justify-between'>
    <img
       src={logo} 
       className='w-15 h-15 ml-4'
    >
    </img>
    <span className='font-bold text-3xl inspiration-regular'>
        Lumora TableBite
    </span>
    <button 
    className='flex items-center gap-5 bg-[#4B2E1E] rounded-lg px-4 py-2 ml-auto mr-5'
    onClick={handleLogout}>
        <span className='text-white'>{name}</span>
        {/* <LogOut className="w-5 h-5 ml-auto text-white" /> */}
    </button>
</div>
  )
}

export default Header