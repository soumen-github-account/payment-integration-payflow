import React, { useState } from 'react'
import { bank_data } from '../assets/bank_data'

const AllBank = () => {
    const [search, setSearch] = useState('')

    const filteredBanks = bank_data.filter((bank)=> bank.bankName.toLowerCase().includes(search.toLowerCase()))
    

  return (
    <div className='bg-black text-white relative w-full min-h-screen'>
        <div className="absolute w-full h-[500px] inset-0 bg-gradient-to-b from-teal-800 to-black blur-3xl"></div>
        
        <div className='flex relative items-center justify-center z-20 py-4 px-3 mt-5'>
            <input
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Mobile number"
            className="w-full text-white h-12 rounded-full bg-gray-500 border border-gray-700 px-4 outline-none focus:border-teal-500"
            />
        </div>

        <div className='z-20 relative px-5 text-[18px] mt-5'>
            <h1 className='text-gray-100'>All Banks</h1>

            <div className='grid grid-cols-2 gap-3 mt-3'>
                {filteredBanks.length > 0 ? (
            filteredBanks.map((bank, index) => (
              <div
                key={index}
                className='flex items-center gap-3 p-3 rounded-lg border border-teal-700 bg-gradient-to-t from-teal-950 to-black cursor-pointer transition-all duration-300'
              >
                <img
                  src={bank.logo}
                  alt={bank.bankName}
                  className='w-7 h-7 rounded-full'
                />
                <p className='text-[15px] font-medium text-gray-200'>
                  {bank.bankName}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-400 mt-10">
              No banks found
            </p>
          )}
            </div>
        </div>
    </div>
  )
}

export default AllBank
