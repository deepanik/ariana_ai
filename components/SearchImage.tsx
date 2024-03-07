// components/SearchImage.tsx
import React, { useState, useEffect } from 'react';
import { GiStarsStack } from 'react-icons/gi';
import { query } from '../api/api';

const SearchImage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleGenerateAI = async () => {
    try {
      const imageUrl = await query({ inputs: inputText, numImages: 1 });
      setImageSrc(imageUrl);
      setLocalError(null);
    } catch (error) {
      console.error('Error generating AI:', (error as Error).message);
      setImageSrc(null);
      setLocalError('Failed to generate AI. Please try again later.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerateAI();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!imageSrc && !localError) {
        try {
          const imageUrl = await query({ inputs: inputText, numImages: 1 });
          setImageSrc(imageUrl);
          setLocalError(null);
        } catch (error) {
          console.error('Error generating AI:', (error as Error).message);
          setImageSrc(null);
          setLocalError('Failed to generate AI. Please try again later.');
        }
      }
    };

    fetchData();
  }, [imageSrc, localError, inputText]);

  return (
    <div className="max-w-4xl mx-auto mb-8 bg-white p-8 rounded-md shadow-md">
      <div className="rounded-md overflow-hidden flex w-full bg-gray-700 p-2">
        <input
          type="text"
          placeholder="Generate AI"
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent border-none text-white px-4 focus:outline-none"
        />

        <button
          className="text-blue-200 px-1 py-2 focus:outline-none rounded-md flex items-center"
          onClick={handleGenerateAI}
        >
          <GiStarsStack size={20} className="mr-2" />
        </button>
      </div>

      {imageSrc && (
        <div className="mt-8">
          <img
            src={imageSrc}
            alt="Generated AI"
            className="mx-auto max-w-full h-auto rounded-md shadow-md"
          />
        </div>
      )}

      {localError && (
        <div className="mt-8">
          <p className="text-red-500">{localError}</p>
        </div>
      )}
    </div>
  );
};

export default SearchImage;
