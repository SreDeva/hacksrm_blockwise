import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import ShowNotification from './ShowNotification';
import ConnectWallet from './ConnectWallet';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full shadow-md bg-white text-sm py-3">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link className="flex-none text-xl font-semibold focus:outline-none focus:opacity-80" to="/" aria-label="Brand">
           <div className=' flex gap-3'> <h1 className='font-bold text-3xl tracking-widest'>ZKF S&S</h1></div>
          </Link>
          <div className="sm:hidden">
            <button
              type="button"
              className="relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              aria-expanded={isOpen}
              aria-controls="navbar"
              aria-label="Toggle navigation"
              onClick={toggleNavbar}
            >
              {isOpen ? (
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              ) : (
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>

        <div
          id="navbar"
          className={`${isOpen ? 'block' : 'hidden'} hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block`}
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
          <div className=' flex flex-row gap-2'> 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> 
            <Link className="font-medium text-gray-600 text-lg focus:outline-none" to="/" aria-current="page">Home</Link>
            </div>
          <div className=' flex flex-row gap-2'> 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big">
          <path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
            <Link className="font-medium text-gray-600 text-lg hover:text-gray-400 focus:outline-none focus:text-gray-400" to="/verification">Verify</Link>
            </div>
           <div className=' flex flex-row gap-2'> 
           
            {/* <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" to="/wallet"> */}
           <ConnectWallet />
            </div>
            <div className=' flex flex-row gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
            <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none text-lg focus:text-gray-400" to="/view">View uploaded</Link>
          </div>
          <div className=' flex flex-row gap-2'>
            <button onClick={toggleNotifications} className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none text-lg focus:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
          </div>
          </div>
        </div>
      </nav>
       {showNotifications && (
        <ShowNotification/>
      )}
    </header>
  );
}
