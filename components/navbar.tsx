// GenImage.js
"use client"
import React from 'react';

const GenImage = () => {
  return (
    <>
      <nav className="bg-black p-4 flex justify-between items-center">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img
            src="your-logo.png"
            alt="Logo"
            className="h-12 w-12 rounded-full mr-4"
          />
          <span className="text-2xl font-serif font-semibold">ARIANA AI</span>
        </div>

        {/* Navigation Buttons on the right */}
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">
            About
          </a>
          <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-full">
            Logout
          </button>
        </div>
      </nav>

      {/* Content Section */}
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">TEXT TO IMAGE</h1>
        <p>Your content goes here.</p>
      </div>
    </>
  );
};

export default GenImage;
