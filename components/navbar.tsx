// components/navbar.tsx
import React, { useState } from 'react';
import Image from 'next/image'; // Import the Image component from next/image
import Logo from '../public/logo-anime.svg'; 

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`bg-gray-700 p-4 flex justify-between items-center md:items-stretch overflow-hidden transition-all duration-500 ${isMenuOpen ? 'h-24' : 'h-16'}`}>
      {/* Logo on the left */}
      <div className="flex items-center">
        {/* Replace <img> with <Image /> */}
        <Image
          src={Logo}
          alt="Logo"
          className="h-12 w-12 rounded-full mr-4"
          width={48} // Set the width of the image
          height={48} 
        />
        <span className="text-2xl font-serif font-semibold text-white">ARIANA AI</span>
      </div>

      <div className="md:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6 block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-6 w-6 block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Navigation Buttons on the right */}
      <div className={`flex items-center space-x-4 md:space-x-8 md:flex ${isMenuOpen ? 'flex-col mt-4 md:mt-0' : 'hidden md:flex'}`}>
        <a href="#" className="text-white hover:text-gray-300">
          About
        </a>
        <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-full">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
