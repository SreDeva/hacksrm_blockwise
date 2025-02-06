import React, { useState } from 'react';
import ConnectWallet from './ConnectWallet';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-xl ">
      <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
      <a className="flex-none text-xl font-semibold focus:outline-none focus:opacity-80" to="/" aria-label="Brand">
           <div className=' flex gap-3'> <h1 className='font-bold text-3xl tracking-widest'>ZKF S&S Admin</h1></div>
          </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-600 rounded md:bg-transparent md:text-gray-700 md:p-0  "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
                <ConnectWallet/>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
              >
                About
              </a>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
