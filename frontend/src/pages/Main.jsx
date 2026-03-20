import React from 'react'
import { assets } from '../assets/assets'
import { User } from 'lucide-react';
import MidSection from '../components/MidSection';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import PeopleKnow from '../components/PeopleKnow';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import MobileNavbar from '../components/mobileNavbar';

const Main = () => {
  return (
    <div className='w-full bg-black relative min-h-[95vh] pt-[260px]'>
      {/* Header / Hero Section */}
      <header className='absolute top-0 left-0 w-full h-[260px] z-0 overflow-hidden'>
        <img src={assets.header_img} alt="" className='w-full h-full object-cover' />
        
        <img 
          src={assets.card_png} 
          className='absolute w-50 -bottom-24 left-6' 
          alt="" 
        />

        <p className='absolute top-16 left-14 text-white text-[15px]'>
          Fetch & Settle instantly Payway
        </p>

        <div className='absolute top-25 right-9 text-white'>
          <span className='text-[15px] flex items-center gap-1'>
            <p className='font-medium text-[#00FFFF]'>Quick</p> 
            and reliable payments
          </span>
          <p className='text-[12px] text-gray-200'>
            for all recharges & monthly bills
          </p>

          <button className='rounded-md px-4 py-1 bg-gray-50 text-neutral-800 font-medium cursor-pointer mt-4 border-2 border-gray-300 flex items-center justify-center gap-2'>
            <p>Pay Now</p>
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </header>

      {/* Navbar */}
      <nav className='absolute top-0 left-0 w-full z-20 px-4 pt-1 flex items-center justify-between'>
        <NavLink to={'/profile'} className='flex flex-col bg-gray-50 items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer'>
          <User className='text-[22px]' />
          <img src={assets.upi_icon} alt="" className='w-6' />
        </NavLink>
        <img src={assets.logo} alt="" className='w-30' />
      </nav>
      <div className="absolute top-70 w-full h-[200px] inset-0 bg-gradient-to-b from-teal-800 to-black blur-3xl"></div>
      {/* Mid Section */}
      <div className='relative z-10 mt-6'>
        <MidSection />
        <PeopleKnow />
      </div>
      <Footer />
      <MobileNavbar />
    </div>
  )
}


export default Main
