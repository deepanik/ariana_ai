// pages/index.tsx
"use client"
import React from 'react';
import SearchImage from '../components/SearchImage';
import ImageDisplay from '@/components/ImageDisplay';
// import Navbar from '@/components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">AI Image Generator</h1>
      {/* <Navbar /> */}
      <SearchImage />
      <ImageDisplay />
    </div>
  );
};

export default Home;
