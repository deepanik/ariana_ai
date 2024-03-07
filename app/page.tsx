"use client"
import React, { useState } from 'react';
import DisplayImage from '../components/DisplayImage';
import SearchImage from '../components/SearchImage'; // Adjust the import path

const Home = () => {
  const [inputText, setInputText] = useState<string>('');

  return (
    <div>
      <DisplayImage />
      <SearchImage />
    </div>
  );
};

export default Home;
