import React, { useState } from 'react';
import { FaDownload, FaImage } from 'react-icons/fa';
import { query } from '../api/api';
import ApiSelector from './ApiSelector';
import { GiFallingStar } from 'react-icons/gi';

interface SearchImageProps {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ImageData {
  url: string;
  id: number;
}

const SearchImage: React.FC<SearchImageProps> = ({ setError }) => {
  const [selectedApi, setSelectedApi] = useState<string>('Hugging_face');
  const [inputText, setInputText] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);
  const [previousImages, setPreviousImages] = useState<ImageData[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleGenerateAI = async () => {
    try {
      setLoading(true);
      setProgress(0);

      const imageUrl = await query({
        inputs: inputText,
        api: selectedApi,
        onProgress: (loaded, total) => {
          const calculatedProgress = (loaded / total) * 95;
          setProgress(calculatedProgress);
        },
      });

      const newImage = { url: imageUrl, id: Date.now() };
      setCurrentImage(newImage);
      setPreviousImages(prevImages => [newImage, ...prevImages.slice(0, 2)]);
      setLocalError(null);
    } catch (error: any) { // Explicitly type the error
      console.error('Error generating AI:', error.message);
      setLocalError('Failed to generate AI. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

const handleDownload = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `generated_image_${Date.now()}.png`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerateAI();
    }
  };


  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="w-full max-w-3xl mx-auto p-8 rounded-md shadow-md bg-gray-900">
        <ApiSelector selectedApi={selectedApi} onApiChange={setSelectedApi} />

        <div className="flex flex-col md:flex-row justify-between items-center w-full md:space-x-8 mb-8">
          <div className="flex-grow mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Generate AI"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-gray-800 border-b-2 border-white text-white px-4 py-2 focus:outline-none"
            />
          </div>
          <button
            className="text-blue-500 px-4 py-2 focus:outline-none rounded-md flex items-center bg-gray-700"
            onClick={handleGenerateAI}
          >
            <GiFallingStar size={20} className="mr-2"/>
            Generate
          </button>
        </div>

        <div className="mt-4">
          {loading && (
            <div className="relative pt-1">
              {/* Loading indicator */}
            </div>
          )}

          {currentImage ? (
            <div className="relative overflow-hidden mb-4 flex items-center justify-center max-w-360 max-h-360 mx-auto">
              {/* Display current image */}
              <img
                src={currentImage.url}
                alt={`Generated AI Image - ${currentImage.id}`}
                className="object-cover rounded-md"
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />

              {/* Download button */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-2 bg-gray-800 rounded-b-md">
                <FaDownload
                  size={20}
                  className="text-white hover:text-blue-500 cursor-pointer"
                  onClick={() => handleDownload(currentImage.url)}
                  style={{ maxWidth: '300px'}}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-gray-700 w-full h-64 rounded-md">
              {/* Placeholder for no image */}
              <FaImage size={50} className="text-white" />
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {/* Display previous images */}
            {previousImages.map((image) => (
              <div key={image.id} className="relative overflow-hidden w-full md:w-1/4 h-48 md:h-1/4 rounded-md">
                <img
                  src={image.url}
                  alt={`Generated AI Image - ${image.id}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md">
                  {/* Download button for previous images */}
                  <FaDownload
                    size={20}
                    className="text-white hover:text-blue-500 cursor-pointer"
                    onClick={() => handleDownload(image.url)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchImage;
