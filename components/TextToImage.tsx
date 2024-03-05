// components/TextToImage.tsx
import React, { useState } from 'react';
import { query } from '../api/api';
// import '../styles.css';

const TextToImage: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');

  const handleGenerateImage = async () => {
    try {
      const imageUrl = await query({ inputs: inputText, numImages: 1 });
      setImageSrc(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error.message);
      setImageSrc(null);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Text 2 Image</h1>
        <div className="mb-4">
          <label htmlFor="input" className="block text-gray-600 mb-2">
            Create an image from text prompt:
          </label>
          <input
            type="text"
            id="input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleGenerateImage}
        >
          Generate
        </button>
        {imageSrc && (
          <div className="mt-4">
            <img
              src={imageSrc}
              alt="Generated Image"
              className="mx-auto mt-4 max-w-full h-auto rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};
// hii

export default TextToImage;
