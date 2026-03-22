import React, { useContext, useEffect, useState } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import { NavLink, useNavigate } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { contact_users } from '../assets/contact_user';
import { hasActiveUpiByMobile } from '../utils/upiCheck';
import { bank_data } from '../assets/bank_data';
import axios from 'axios';
import { AppContext } from '../contexts/AppContext';
import ContactsSkeleton from '../components/ContactsSkeleton';

const PayMobileNumber = () => {
  const {backendUrl, getChatScreenDetails, user} = useContext(AppContext)
  const [search, setSearch] = useState('')
  const [searchedUser, setSearchedUser] = useState(null);
  const filteredContacts = contact_users.filter((contact)=> contact.name.toLowerCase().includes(search.toLowerCase()) || contact.mobileNumber.includes(search))
  const [searchLoading, setSeacrhLoading] = useState(false);
  const [message, setMessage] = useState('')
  const [contactsWithUpi, setContactsWithUpi] = useState([])
  const navigate = useNavigate()
  const [contactsLoading, setContactsLoading] = useState(true);

  const searchNumberHandler = async(mobile) =>{
    setSeacrhLoading(true)
    try {
      const {data} = await axios.get(`${backendUrl}/api/account/${mobile}`)
      console.log(data)
      setSearchedUser(data);
      setSeacrhLoading(false)
      if(!data.success){
        setSearchedUser(null)
        setMessage('number not found !')
      }
      
    } catch (error) {
      console.log(error)
      setSeacrhLoading(false)
    }
  }
  const mobiles = contact_users.map(c => c.mobileNumber);
  const checkContactsUpi = async () => {
    try {
      setContactsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/account/check-upi`,
        mobiles
      );

      // console.log(data);

      setContactsWithUpi(data);
      setContactsWithUpi(data);
    } catch (error) {
      console.log(error);
    } finally {
      setContactsLoading(false);
    }
  };

  useEffect(() => {
    checkContactsUpi();
  }, []);

  return (
    <div className='w-full min-h-screen text-white'>
        <nav className='p-2 bg-black  text-gray-100 fixed z-30 min-w-[82vw] lg:min-w-[52vw] border-b-1 border-b-gray-500 shadow-lg max-sm:min-w-[99vw]'>
            <div className='flex gap-3 mt-2'>
              <NavLink to={-1}><GoArrowLeft className='text-[27px] cursor-pointer'/></NavLink>
              <p className='font-medium'>Send Money</p>
            </div>
            <div className='w-full flex bg-gray-800 p-2 rounded-full mt-4 text-gray-300'>
              <CiSearch className='text-[30px]' />
              <input 
              onChange={(e)=> {
                const value = e.target.value;
                setSearch(value)

                if(/^\d{10}$/.test(value)){
                  const existsInContacts = contact_users.some(
                    (contact) => contact.mobileNumber === value
                  );
                  if (!existsInContacts) {
                    searchNumberHandler(value);
                  }
                } else{
                  setSearchedUser(null)
                  setMessage('')
                }
              }} 
              value={search} type="text" className='w-full outline-none px-4' placeholder='Search any contact number'/>
            </div>
        </nav>

        <div className='pt-[130px] px-2'>
        {
          contactsLoading ? (
            <ContactsSkeleton />
          ) : (
        filteredContacts.map(contact => {

          // const hasUpi = hasActiveUpiByMobile(
          //   bank_data,
          //   contact.mobileNumber
          // );
          const match = contactsWithUpi.find(
            u => u.mobileNumber === contact.mobileNumber
          );

          const hasUpi = match?.upiActive || false;

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
                <button onClick={() => {getChatScreenDetails(user?.mobileNumber, contact.mobileNumber); navigate(`/chat-pay-screen/${contact.mobileNumber}/`)}} className='bg-teal-600 px-6 py-1 rounded-full text-sm'>
                  Pay
                </button>
              ) : (
                <button className='border-2 border-teal-500 px-4 py-1 rounded-full text-sm text-gray-400'>
                  Invite
                </button>
              )}
            </div>
          );
        }))
      }

        {
          searchLoading && 
          <section class="dots-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </section>
        }

        {message != '' && <p className='text-center mt-4 text-neutral-300'>{message}</p>}

        {searchedUser && (
          <div className="p-3 border-b border-gray-700 bg-gray-900">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{searchedUser.name}</p>
                <p className="text-sm text-gray-400">
                  {searchedUser.mobileNumber}
                </p>
              </div>

              {searchedUser.upiActive ? (
                <button onClick={() => {getChatScreenDetails(user?.mobileNumber, searchedUser.mobileNumber); navigate(`/chat-pay-screen/${searchedUser.mobileNumber}/`)}} className="bg-teal-600 px-6 py-1 rounded-full text-sm">
                  Pay
                </button>
              ) : (
                <button className="border-2 border-teal-500 px-4 py-1 rounded-full text-sm text-gray-400">
                  Invite
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PayMobileNumber
