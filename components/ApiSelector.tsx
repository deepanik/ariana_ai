// ApiSelector.tsx

import React from 'react';

interface ApiSelectorProps {
  selectedApi: string;
  onApiChange: (api: string) => void;
}

const ApiSelector: React.FC<ApiSelectorProps> = ({ selectedApi, onApiChange }) => {
  const apiOptions = [
    { id: 'api-hugging-face', value: 'Hugging_face', label: 'Hugging Face' },
    { id: 'api-open-ai', value: 'Open_AI', label: 'Open AI' },
    // { id: 'api-stablity-ai', value: 'Stablity', label: 'Stablity AI' },
  ];

  return (
    <div className="flex items-center justify-center mb-4">
      {apiOptions.map((api) => (
        <label key={api.id} className="flex flex-col items-center cursor-pointer mx-4">
          <input
            type="radio"
            id={api.id}
            name="api-select"
            value={api.value}
            className="hidden"
            checked={selectedApi === api.value}
            onChange={() => onApiChange(api.value)}
          />
          <div
            className={`w-12 h-12 rounded-full border-4 border-white mb-2 ${
              selectedApi === api.value ? 'bg-blue-500 border-blue-500' : 'bg-gray-700'
            }`}
          ></div>
          <span className="text-sm">{api.label}</span>
        </label>
      ))}
    </div>
  );
};

export default ApiSelector;
