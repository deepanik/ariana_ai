// GenImage.js
import React from 'react';

const GenImage = () => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center">
      <div className="relative flex-1 mb-4 lg:mb-0 lg:mr-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 pl-4 pr-10 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
        />
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <button className="w-full lg:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none">
        Generate AI
      </button>
    </div>
  );
};

export default GenImage;
