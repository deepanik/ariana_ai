// components/Navbar.tsx

import Link from 'next/link';
import { IoLogoGithub, IoMenu } from 'react-icons/io5';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-lg border-b border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-transparent bg-clip-text">
                Ariana AI
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="/explore" className="text-[#A0A0A0] hover:text-white transition-colors">
                Explore
              </Link>
              <Link href="/community" className="text-[#A0A0A0] hover:text-white transition-colors">
                Community
              </Link>
              <Link href="/pricing" className="text-[#A0A0A0] hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex px-4 py-2 bg-[#1F1F1F] text-white rounded-lg hover:bg-[#2A2A2A] transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-lg hover:opacity-90 transition-opacity">
              Get Started
            </button>
            <button className="md:hidden p-2 text-white">
              <IoMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
