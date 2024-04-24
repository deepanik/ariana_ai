// components/Navbar.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../public/girl-logo.svg';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 cursor-pointer">
            <Image src={Logo} alt="Arian AI" width={60} height={60} />
            <span className="text-2xl font-semibold whitespace-nowrap text-white">Ariana AI</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="block md:hidden text-gray-500 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 text-white">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden text-white">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/about">About</MobileNavLink>
            <MobileNavLink href="/services">Services</MobileNavLink>
            <MobileNavLink href="/pricing">Pricing</MobileNavLink>
            <MobileNavLink href="/contact">Contact</MobileNavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

// Custom NavLink component for desktop navigation
const NavLink: React.FC<{ href: string }> = ({ href, children }) => (
  <a href={href} className="hover:text-gray-300">
    {children}
  </a>
);

// Custom MobileNavLink component for mobile navigation
const MobileNavLink: React.FC<{ href: string }> = ({ href, children }) => (
  <a href={href} className="block py-2 border-b border-gray-700 hover:bg-gray-700">
    {children}
  </a>
);

export default Navbar;
