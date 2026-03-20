import React from 'react'
import { RiContactsBookFill } from "react-icons/ri";
import { RiBankFill } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { NavLink } from 'react-router-dom';

const MidSection = () => {

    const transferSystem = [
        {
            "name": "to mobile",
            "icon": <RiContactsBookFill />,
            "link": "/pay-mobile"
        }, 
        {
            "name": "Pay to bank",
            "icon": <RiBankFill />,
            "link": "/bank-transfer"
        }, 
        {
            "name": "Pay using UPI",
            "icon": <FaCreditCard />,
            "link": ""
        }, 
        {
            "name": "Check Balance",
            "icon": <GiWallet />,
            "link": "/check-balance"
        }, 
    ]

  return (
    <div className='border-t-1 border-t-teal-400 rounded-t-4xl min-h-[10vh] px-4'>
        <h1 className='mt-3 ml-3 font-medium text-[17px] text-teal-50'>Money Transfer</h1>
        <div className='grid grid-cols-4 w-full sm:gap-6 gap-2 mt-4'>
            {
                transferSystem.map((t, index)=>(
                    <NavLink to={t.link}>
                    <div key={index} className='flex h-full items-center flex-col gap-2 border-1 rounded-lg border-teal-300 p-2 cursor-pointer hover:bg-gradient-to-b from-teal-900 to-black transition-all ease-in-out duration-700'>
                        <div className='bg-[#c0f9f9] sm:w-15 sm:h-15 w-11 h-11 rounded-full flex items-center justify-center text-[25px] text-teal-900'>
                            {t.icon}
                        </div>
                        <p className='text-[11px] text-center font-medium text-teal-50'>{t.name}</p>
                    </div>
                    </NavLink>
                ))
            }
        </div>
    </div>
  )
}

export default MidSection
