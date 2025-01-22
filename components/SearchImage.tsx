import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSparkles, IoImage, IoColorWand, IoDownloadOutline, IoShareSocialOutline } from 'react-icons/io5';
import Image from 'next/image';
import { query } from '../api/api';
import { generateImage } from '../api/huggingFaceApi';
import { generateImageWithReplicate } from '../api/replicateApi';
import { generateWithStableDiffusion } from '@/api/stableDiffusionApi';

interface SearchImageProps {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  selectedApi?: string;
}

interface ImageData {
  url: string;
  id: number;
}

type ApiType = 'huggingface' | 'openai' | 'replicate' | 'stable-diffusion';

const SearchImage: React.FC<SearchImageProps> = ({ setError }) => {
  const [selectedApi, setSelectedApi] = useState<ApiType>('huggingface');
  const [prompt, setPrompt] = useState('');
  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);
  const [previousImages, setPreviousImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    try {
      setIsLoading(true);
      setProgress(0);

      let imageUrl;
      switch (selectedApi) {
        case 'stable-diffusion':
          imageUrl = await generateWithStableDiffusion({
            inputs: prompt,
            onProgress: (loaded, total) => {
              const calculatedProgress = (loaded / total) * 95;
              setProgress(calculatedProgress);
            },
          });
          break;
        
        case 'huggingface':
          imageUrl = await generateImage({
            inputs: prompt,
            onProgress: (loaded, total) => {
              const calculatedProgress = (loaded / total) * 95;
              setProgress(calculatedProgress);
            },
          });
          break;
        
        case 'replicate':
          imageUrl = await generateImageWithReplicate({
            inputs: prompt,
            onProgress: (loaded, total) => {
              setProgress(loaded);
            },
          });
          break;
        
        default:
          imageUrl = await query({
            inputs: prompt,
            api: selectedApi,
            onProgress: (loaded, total) => {
              const calculatedProgress = (loaded / total) * 95;
              setProgress(calculatedProgress);
            },
          });
      }

      const newImage = { url: imageUrl, id: Date.now() };
      setCurrentImage(newImage);
      setPreviousImages(prev => [newImage, ...prev.slice(0, 5)]);
      setError(null);
    } catch (error: any) {
      console.error('Error:', error.message);
      if (error.message.includes('Authentication failed')) {
        setError('Authentication failed. Please check your API key configuration.');
      } else {
        const errorMessages = {
          'stable-diffusion': 'Failed to generate image with Stable Diffusion. Please try again.',
          huggingface: 'Failed to generate image with Hugging Face. Please try again.',
          replicate: 'Failed to generate image with Replicate AI. Please try again.',
          openai: 'Failed to generate image with OpenAI. Please try again.'
        };
        setError(errorMessages[selectedApi as ApiType]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ariana-ai-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download image');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] mb-4">
            Create Stunning Art with AI
          </h1>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Transform your imagination into masterpieces using cutting-edge AI technology.
            Just describe your vision, and watch it come to life.
          </p>
        </div>

        <div className="bg-[#1F1F1F] rounded-2xl p-8 shadow-2xl border border-[#2A2A2A]">
          <div className="flex flex-col gap-8">
            {/* Model Selection */}
            <div className="flex justify-center gap-4">
              {[
                { id: 'huggingface', label: 'Hugging Face' },
                { id: 'stable-diffusion', label: 'Stable Diffusion' },
                { id: 'replicate', label: 'Replicate AI' },
                { id: 'openai', label: 'OpenAI' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedApi(id as ApiType)}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    selectedApi === id
                      ? 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white shadow-lg'
                      : 'bg-[#2A2A2A] text-[#A0A0A0] hover:bg-[#333333]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Prompt Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
                <IoColorWand className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="A cyberpunk city at night with neon lights and flying cars..."
                className="w-full pl-12 pr-36 py-4 bg-[#2A2A2A] rounded-xl text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition-all"
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-lg transition-all ${
                  isLoading || !prompt.trim()
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <IoSparkles className="w-5 h-5" />
                    <span>Generate</span>
                  </div>
                )}
              </button>
            </div>

            {/* Progress Bar */}
            {isLoading && (
              <div className="relative w-full h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute h-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]"
                />
              </div>
            )}

            {/* Image Display */}
            <div className="space-y-6">
              {/* Current Image */}
              {currentImage ? (
                <div className="relative group">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative aspect-square rounded-xl overflow-hidden bg-[#2A2A2A]"
                  >
                    <Image
                      src={currentImage.url}
                      alt={prompt}
                      width={800}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownload(currentImage.url)}
                            className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                          >
                            <IoDownloadOutline className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                            <IoShareSocialOutline className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="aspect-square rounded-xl bg-[#1F1F1F] border-2 border-dashed border-[#2A2A2A] flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                      <IoImage className="w-8 h-8 text-[#666666]" />
                    </div>
                    <p className="text-[#666666]">Your masterpiece will appear here</p>
                  </div>
                </div>
              )}

              {/* Previous Images */}
              {previousImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {previousImages.map((image) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative group aspect-square rounded-xl overflow-hidden bg-[#2A2A2A]"
                    >
                      <Image
                        src={image.url}
                        alt="Generated image"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => handleDownload(image.url)}
                          className="absolute bottom-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                        >
                          <IoDownloadOutline className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchImage;
