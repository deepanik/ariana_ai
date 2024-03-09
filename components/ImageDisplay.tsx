// components/ImageDisplay.tsx
import React from 'react';
import Image from 'next/image';

interface ImageDisplayProps {
  imageUrl: string;
  altText: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, altText }) => {
  return (
    <div className="relative overflow-hidden mb-4 flex items-center justify-center max-w-360 max-h-360 mx-auto">
      {/* Replace <img> with <Image /> */}
      <Image
        src={imageUrl}
        alt={altText}
        className="object-cover rounded-md"
        layout="fill" // This ensures the image takes up the full container
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-2 bg-gray-800 rounded-b-md">
        {/* Add your download button or any other content */}
      </div>
    </div>
  );
};

export default ImageDisplay;
