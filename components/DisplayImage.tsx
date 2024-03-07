// DisplayImage.tsx
import React, { useState } from 'react';
import SearchImage from './SearchImage';

const DisplayImage: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Add this line for error state

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Text to Image</h1>

        <SearchImage
          setInputText={setInputText}
          setImageSrc={setImageSrc}
          setError={setError} // Pass setError function to SearchImage
        />

        {imageSrc && (
          <div className="mt-4">
            <img
              src={imageSrc}
              alt="Generated Image"
              className="mx-auto mt-4 max-w-[330px] max-h-[330px] rounded-md"
            />
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayImage;
