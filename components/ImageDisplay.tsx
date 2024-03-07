// components/ImageDisplay.tsx
import React from 'react';

interface ImageDisplayProps {
  currentImage: string | null;
  previousImages?: string[]; // Make previousImages optional
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ currentImage, previousImages = [] }) => {
  return (
    <div className="flex flex-col items-center mt-8">
      {/* Display current generated image */}
      {currentImage && (
        <div className="mb-4">
          <img src={currentImage} alt="Current Generated AI" className="rounded-md shadow-md" width={360} height={360} />
        </div>
      )}

      {/* Display last four previous generated images in a size of 200x200 */}
      <div className="flex justify-center">
        {previousImages.slice(0, 4).map((prevImage, index) => (
          <div key={index} className="m-2">
            <img src={prevImage} alt={`Previous Generated AI ${index + 1}`} className="rounded-md shadow-md" width={200} height={200} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDisplay;
