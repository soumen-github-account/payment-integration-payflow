import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { IoMdTime } from "react-icons/io";
import { BsQrCodeScan } from "react-icons/bs";
import { LuBell } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";


const MobileNavbar = () => {
  return (
    <div>
      <div className='bg-black border-t-1 rounded-full border-t-teal-500 fixed bottom-0 left-0 w-full lg:left-92 lg:w-[52vw] h-[4rem] px-0 z-10 items-center' id="nav-menu">
      <ul className="flex justify-between">
        <li className='py-3 px-3'>
            <NavLink to='/main' className={({isActive})=>`active-link flex flex-col items-center gap-x-4 sm:text-sm text-[12px] justify-center font-bold ${isActive ? 'text-teal-600' :'text-gray-400'}`}>
                <AiFillHome className='text-[22px]' />
                <span className="nav__name">Home</span>
            </NavLink>
        </li>

        <li className='py-3 px-3'>
            <NavLink to='/check-balance' onClick={() => window.scrollTo(0, 0)} className={({isActive})=>`active-link flex flex-col items-center gap-x-4 sm:text-sm text-[12px] justify-center font-bold ${isActive ? 'text-teal-600' :'text-gray-400'}`}>
                <IoWalletOutline className='text-[22px]' />
                <span className="nav__name">Balance</span>
            </NavLink>
        </li>

        <li className='px-3'>
            <NavLink to={'/scan'} className='active-link text-gray-100 flex flex-col items-center gap-x-4 sm:text-sm text-[12px] justify-center font-bold bg-teal-700 rounded-full w-17 h-17'>
                <BsQrCodeScan className='sm:text-[25px] text-[20px]' />
                <span className="nav__name text-[10px] sm:mt-1">Scan & Pay</span>
            </NavLink>
        </li>

        <li className='py-3 px-3'>
            <NavLink to='/main' onClick={() => window.scrollTo(0, 0)} className={({isActive})=>`active-link flex flex-col items-center gap-x-4 sm:text-sm text-[12px] justify-center font-bold ${isActive ? 'text-teal-600' :'text-gray-400'}`}>
                <LuBell className='text-[22px]' />
                <span className="nav__name">Alerts</span>
            </NavLink>
        </li>

        <li className='py-3 px-3 mr-1'>
            <NavLink to='/transaction-history' onClick={() => window.scrollTo(0, 0)} className={({isActive})=>`active-link flex flex-col items-center gap-x-4 sm:text-sm text-[12px] justify-center font-bold ${isActive ? 'text-teal-600' :'text-gray-400'}`}>
                <IoMdTime className='text-[22px]' />
                <span className="nav__name">History</span>
            </NavLink>
        </li>
    </ul>
    </div>
        </div>
  )
}

export default MobileNavbar
