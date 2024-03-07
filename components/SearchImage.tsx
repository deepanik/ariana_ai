// components/SearchImage.tsx
import React, { useState, useEffect } from 'react';
import { GiStarsStack } from 'react-icons/gi';
import { query } from '../api/api';
import ImageDisplay from './ImageDisplay';

interface SearchImageProps {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchImage: React.FC<SearchImageProps> = ({ setError }) => {
  const [inputText, setInputText] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [previousImages, setPreviousImages] = useState<string[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleGenerateAI = async () => {
    try {
      const imageUrl = await query({ inputs: inputText, numImages: 1 });
      setPreviousImages((prevImages) => [imageUrl, ...prevImages.slice(0, 3)]); // Keep only the last four images
      setCurrentImage(imageUrl);
      setLocalError(null);
    } catch (error) {
      console.error('Error generating AI:', (error as Error).message);
      setCurrentImage(null);
      setLocalError('Failed to generate AI. Please try again later.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerateAI();
    }
  };

  useEffect(() => {
    if (!currentImage || localError) {
      setPreviousImages([]);
    }
  }, [currentImage, localError]);

  return (
    <div className="max-w-4xl mx-auto mb-8 bg-white p-8 rounded-md shadow-md">
      <div className="rounded-md overflow-hidden flex w-full bg-gray-700 p-2">
        <input
          type="text"
          placeholder="Generate AI"
          value={inputText}
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

      {currentImage ? (
        <div className="mt-8">
          <ImageDisplay currentImage={currentImage} previousImages={previousImages} />
        </div>
      ) : (
        localError && (
          <div className="mt-8">
            <p className="text-red-500">{localError}</p>
          </div>
        )
      )}
    </div>
  );
};

export default SearchImage;
