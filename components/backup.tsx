// components/SearchImage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { FaDownload, FaImage } from 'react-icons/fa';
import { query } from '../api/api';
import ApiSelector from './ApiSelector';
import { GiFallingStar } from "react-icons/gi";

interface SearchImageProps {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  selectedApi: string;
}

interface ImageData {
  url: string;
  id: number;
}

// const SearchImage: React.FC<SearchImageProps> = ({ setError, selectedApi }) => {
  const SearchImage: React.FC<SearchImageProps> = ({ setError }) => {
    const [selectedApi, setSelectedApi] = useState<string>('Hugging_face');
  const [inputText, setInputText] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);
  const [previousImages, setPreviousImages] = useState<ImageData[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  let intervalId: NodeJS.Timeout;
<ApiSelector selectedApi={selectedApi} onApiChange={setSelectedApi} />



  const loadDataFromDatabase = async () => {
    // Simulate fetching data from a database
    const response = await fetch('../data/images.json');
    const data = await response.json();
    setCurrentImage(data.currentImage);
    setPreviousImages(data.previousImages);
  };

  const saveDataToDatabase = useCallback(() => {
    // Simulate saving data to a database
    const data = { currentImage, previousImages };
    fetch('../data/images.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }, [currentImage, previousImages]);


  const handleGenerateAI = async () => {
    try {
      setLoading(true);
      setProgress(0);

      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          if (newProgress >= 95) {
            clearInterval(intervalId);
          }
          return newProgress;
        });
      }, 50);

      const imageUrl = await query({
        inputs: inputText,
        api: selectedApi, // Ensure that selectedApi is correctly set here
        onProgress: (loaded, total) => {
          const calculatedProgress = (loaded / total) * 95;
          setProgress(calculatedProgress);
        },
      });

      const newImage = { url: imageUrl, id: Date.now() };

      setPreviousImages((prevImages) => {
        const updatedImages = [
          newImage,
          ...(currentImage ? [currentImage, ...prevImages.slice(0, 2)] : prevImages.slice(0, 2)),
        ];
      
        // Remove duplicate images based on id
        const uniqueImages = Array.from(new Set(updatedImages.map((image) => image.id)))
          .map((id) => updatedImages.find((image) => image.id === id))
          .filter((image) => image !== undefined) as ImageData[];
      
        return uniqueImages;
      });
      
      
      setCurrentImage(newImage);
      setLocalError(null);
    } catch (error) {
      console.error('Error generating AI:', (error as Error).message);
      setCurrentImage(null);
      setLocalError('Failed to generate AI. Please try again later.');
    } finally {
      setLoading(false);
      clearInterval(intervalId);
      setProgress(100);
      saveDataToDatabase(); 
    }
  };

  


  const handleDownload = (imageUrl: string) => {
    const downloadLink = document.createElement('a');
    
    downloadLink.href = imageUrl;
    downloadLink.download = `generated_image_${Date.now()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerateAI();
    }
  };

  const handleApiChange = (newApi: string) => {
    setSelectedApi(newApi);
  };
  

  useEffect(() => {
    loadDataFromDatabase();
  }, []);

  useEffect(() => {
    saveDataToDatabase();
  }, [currentImage, previousImages, saveDataToDatabase]);
  

  useEffect(() => {
    loadDataFromDatabase();
  }, []);

  useEffect(() => {
    saveDataToDatabase();
  }, [currentImage, previousImages, saveDataToDatabase]);

  useEffect(() => {
    if (!currentImage || localError) {
      setPreviousImages([]);
    }
  }, [currentImage, localError]);

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="w-full max-w-3xl mx-auto p-8 rounded-md shadow-md bg-gray-900">
        <ApiSelector selectedApi={selectedApi} onApiChange={setSelectedApi} />

  {/* return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="w-full max-w-3xl mx-auto p-8 rounded-md shadow-md bg-gray-900">
        <ApiSelector selectedApi={selectedApi} onApiChange={setSelectedApi} /> */}

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

        {loading && (
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  In Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {progress.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="flex mb-2 items-center justify-start">
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="rounded-full bg-blue-600 h-2"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          {currentImage ? (
            <div className="relative overflow-hidden mb-4 flex items-center justify-center max-w-360 max-h-360 mx-auto">
              
              <svg>
              <svg>
              <svg>
  <image
    xlinkHref={currentImage?.url} // Use xlinkHref instead of src for SVG images
    className="object-cover rounded-md"
    style={{ maxWidth: '100%', maxHeight: '300px' }}
  />
</svg>

</svg>

</svg>




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
              <FaImage size={50} className="text-white" />
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {previousImages.map((image) => (
              <div key={image.id} className="relative overflow-hidden w-full md:w-1/4 h-48 md:h-1/4 rounded-md">
                <img
                  src={image.url}
                  alt={`Generated AI Image - ${image.id}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md">
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