import React, { useContext, useEffect, useState } from 'react'
import { contact_users } from '../assets/contact_user';
import axios from 'axios';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import ContactsSkeleton from './ContactsSkeleton';
import PeopleKnowSkeleton from './PeopleKnowSkeleton';

const PeopleKnow = () => {
  const {backendUrl, getChatScreenDetails, user} = useContext(AppContext)

  const filteredContacts = contact_users
  
  const [contactsWithUpi, setContactsWithUpi] = useState([])
  const navigate = useNavigate()
  const [contactsLoading, setContactsLoading] = useState(true);

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
    <div className='mt-5 px-4 min-h-[40vh]'>
        <h1 className='font-medium ml-2 text-[17px] text-teal-50'>People you know</h1>

        <div>
          {
          contactsLoading ? 
          (
            <PeopleKnowSkeleton />
          ) : 
          (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {filteredContacts.map(contact => {
                const match = contactsWithUpi.find(
                  u => u.mobileNumber === contact.mobileNumber
                );

                const hasUpi = match?.upiActive || false;

                // only show UPI users
                if (!hasUpi) return null;

                return (
                  <div
                    key={contact.contactId}
                    onClick={() => {
                      getChatScreenDetails(user?.mobileNumber, contact.mobileNumber);
                      navigate(`/chat-pay-screen/${contact.mobileNumber}/`);
                    }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        className="w-14 h-14 rounded-full object-cover"
                        alt={contact.name}
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                    </div>
                    <p className="text-sm text-center text-neutral-200 truncate w-16">
                      {contact.name}
                    </p>
                  </div>
                );
              })}
            </div>
          )
          }
        </div>
    </div>
  )
}

export default PeopleKnow
