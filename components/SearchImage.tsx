// SearchImage.tsx
import React, { useState, useEffect } from 'react';
import { GiStarsStack } from 'react-icons/gi';
import { query } from '../api/api'; // Adjust the path as needed

interface SearchImageProps {
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchImage: React.FC<SearchImageProps> = ({ setInputText, setImageSrc, setError }) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const loadDefaultImage = () => {
    setImageSrc(null);
  };

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
    if (!imageSrc || localError) {
      loadDefaultImage();
    }
  }, [imageSrc, localError]);
  

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

      {imageSrc ? (
        <div className="mt-8">
          <img
            src={imageSrc}
            alt="Generated AI"
            className="mx-auto max-w-full h-auto rounded-md shadow-md"
          />
        </div>
      ) : (
        localError && (
          <div className="mt-8">
            <img
              src="https://images.unsplash.com/photo-1578632749014-ca77efd052eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Generated AI"
              className="mx-auto max-w-full h-auto rounded-md shadow-md"
            />
            <p className="mt-4 text-red-500">{localError}</p>
          </div>
        )
      )}
    </div>
  );
};

export default SearchImage;
