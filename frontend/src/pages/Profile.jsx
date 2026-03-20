import React from 'react'
import { User } from 'lucide-react';
import { MdVerifiedUser } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import pnb_logo from "../assets/images/pnb.png"
import barcode_img from "../assets/images/barcode.png"
import { BsBank2 } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

const Profile = () => {
    const bankDetails = {
        "logo": pnb_logo,
        "name": "Punjab National Bank",
        "account_no": "91276712213",
        "upi_id": "76231575@huahb",
        "barcode_img": barcode_img,
    }
  return (
    <div className='w-full bg-black min-h-screen pb-10 text-white'>
      <div className="absolute -top-90 w-full h-[500px] inset-0 bg-gradient-to-t from-teal-800 to-black blur-3xl"></div>
        
        <nav className='p-2 bg-black fixed z-30 min-w-[82vw] lg:min-w-[52vw] border-b-1 border-b-gray-500 shadow-lg max-sm:min-w-[80vh]'>
            <NavLink to={-1}><GoArrowLeft className='text-[27px] cursor-pointer'/></NavLink>
        </nav>
      <div className='w-full relative z-20 flex justify-center pt-10'>
        <div className='mt-6 flex items-center justify-center flex-col'>
            <div className='bg-teal-500 text-neutral-100 rounded-full w-20 h-20 flex items-center justify-center'><User size={40} /></div>
            <span className='flex relative gap-1 items-center font-medium text-[20px]'>
                <p>Soumen Das</p>
                <MdVerifiedUser className='text-teal-400 absolute -right-6' />
            </span>
            <p className='text-[15px] font-medium text-neutral-500'>+91-130293763</p>
        </div>
      </div>
    <div className='px-3 mt-5'>
      <div className='border-1 border-teal-300 rounded-lg p-3'>
            <div className='flex cursor-pointer items-center gap-3'>
                <img src={bankDetails.logo} alt="" className='w-16 rounded-lg' />
                <div>
                    <p className='text-[15px] font-medium'>{bankDetails.name}</p>
                    <p className='text-[12px] font-medium'>UPI ID: {bankDetails.upi_id}</p>
                </div> 
            </div>
            <div className='mt-6 flex items-center justify-center'>
                <img src={bankDetails.barcode_img} alt="" />
            </div>
      </div>

      <NavLink to={'/all-bank'}>
      <div className='flex mt-3 border-1 border-teal-300 rounded-md py-3 px-4 gap-3 cursor-pointer transition-all duration-75 hover:bg-gradient-to-t from-teal-900/50 to-black'>
        <BsBank2 size={20}/>
        <p>Add Bank account</p>
      </div>
      </NavLink>
    </div>
    </div>
  )
}

export default Profile
