// pages/index.tsx
"use client"
import React, { useState } from 'react';
import SearchImage from '../components/SearchImage';
import ImageDisplay from '../components/ImageDisplay';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  const [selectedApi, setSelectedApi] = useState<string>('Hugging Face');

  const handleApiChange = (api: string) => {
    setSelectedApi(api);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Navbar />
      <div className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 text-center">AI Image Generator</h1>

        {/* Render the SearchImage and ImageDisplay components */}
        <SearchImage selectedApi={selectedApi} />
        <ImageDisplay />
      </div>
    </div>
  );
};

export default Home;
