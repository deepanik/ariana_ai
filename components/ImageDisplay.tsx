// components/ImageDisplay.tsx
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IoExpandOutline, IoCloseOutline, IoDownloadOutline, IoShareSocialOutline } from 'react-icons/io5';

interface ImageDisplayProps {
  src: string;
  alt: string;
  onGenerate?: () => void;
  isLoading?: boolean;
}

const ImageDisplay = ({ src, alt, isLoading }: ImageDisplayProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!src) {
    return (
      <div className="aspect-square rounded-xl bg-[#1F1F1F] border-2 border-dashed border-[#2A2A2A] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A2A2A] flex items-center justify-center">
            <IoExpandOutline className="w-8 h-8 text-[#666666]" />
          </div>
          <p className="text-[#666666]">Your masterpiece will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative group">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative aspect-square rounded-xl overflow-hidden"
        >
          <Image
            src={src}
            alt={alt}
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex gap-2">
                <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                  <IoDownloadOutline className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                  <IoShareSocialOutline className="w-5 h-5 text-white" />
                </button>
              </div>
              <button
                onClick={() => setIsExpanded(true)}
                className="p-2 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg hover:opacity-90 transition-opacity"
              >
                <IoExpandOutline className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={1920}
                height={1080}
                className="w-full h-full object-contain rounded-lg"
                priority
              />
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 p-3 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full hover:opacity-90 transition-opacity"
              >
                <IoCloseOutline className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageDisplay;
