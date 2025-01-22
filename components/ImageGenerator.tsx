import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSparkles, IoImage, IoColorWand } from 'react-icons/io5';
import ImageDisplay from './ImageDisplay';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [activeModel, setActiveModel] = useState<'huggingface' | 'openai'>('huggingface');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedImage('/path-to-generated-image.jpg');
    setIsLoading(false);
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
              {['huggingface', 'openai'].map((model) => (
                <button
                  key={model}
                  onClick={() => setActiveModel(model as 'huggingface' | 'openai')}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    activeModel === model
                      ? 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white shadow-lg'
                      : 'bg-[#2A2A2A] text-[#A0A0A0] hover:bg-[#333333]'
                  }`}
                >
                  {model === 'huggingface' ? 'Hugging Face' : 'OpenAI'}
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

            {/* Image Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#2A2A2A] p-6 rounded-xl"
            >
              <ImageDisplay
                src={generatedImage}
                alt={prompt}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator; 