import React, { useState } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import { NavLink } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { contact_users } from '../assets/contact_user';
import { hasActiveUpiByMobile } from '../utils/upiCheck';
import { bank_data } from '../assets/bank_data';

const PayMobileNumber = () => {
  const [search, setSearch] = useState('')

  const filteredContacts = contact_users.filter((contact)=> contact.name.toLowerCase().includes(search.toLowerCase()) || contact.mobileNumber.includes(search))

  return (
    <div className='w-full min-h-screen text-white'>
        <nav className='p-2 bg-black  text-gray-100 fixed z-30 min-w-[82vw] lg:min-w-[52vw] border-b-1 border-b-gray-500 shadow-lg max-sm:min-w-[99vw]'>
            <div className='flex gap-3 mt-2'>
              <NavLink to={-1}><GoArrowLeft className='text-[27px] cursor-pointer'/></NavLink>
              <p className='font-medium'>Send Money</p>
            </div>
            <div className='w-full flex bg-gray-800 p-2 rounded-full mt-4 text-gray-300'>
              <CiSearch className='text-[30px]' />
              <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" className='w-full outline-none px-4' placeholder='Search any contact number'/>
            </div>
        </nav>

        <div className='pt-[130px] px-2'>
        {filteredContacts.map(contact => {

          const hasUpi = hasActiveUpiByMobile(
            bank_data,
            contact.mobileNumber
          );

          return (
            <div
              key={contact.contactId}
              className='flex items-center justify-between p-3 border-b border-gray-800'
            >
              <div className='flex gap-3 items-center'>
                <img
                  src={contact.avatar}
                  className='w-12 h-12 rounded-full'
                  alt={contact.name}
                />
                <div>
                  <p className='font-medium'>{contact.name}</p>
                  <p className='text-sm text-gray-400'>
                    {contact.mobileNumber}
                  </p>
                </div>
              </div>

              {hasUpi ? (
                <NavLink to={`/chat-pay-screen/${contact.contactId}`}>
                  <button className='bg-teal-600 px-6 py-1 rounded-full text-sm'>
                    Pay
                  </button>
                </NavLink>
              ) : (
                <button className='border-2 border-teal-500 px-4 py-1 rounded-full text-sm text-gray-400'>
                  Invite
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default PayMobileNumber
