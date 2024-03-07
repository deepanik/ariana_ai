// api/api.ts

// Define configuration for different APIs
const API_CONFIG: Record<string, string> = {
  Hugging_face_API: "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",
  Hugging_face_Fetch_Link: "https://api-inference.huggingface.co/models/SaiRaj03/Text_To_Image",
  Open_AI_API: "your_open_ai_token", // Replace with your Open AI token
  Open_AI_Fetch_Link: "https://api.openai.com/v1/your/endpoint", // Replace with your Open AI endpoint
  // Add more API configurations as needed
};

interface QueryData {
  inputs: string;
  api: keyof typeof API_CONFIG; // Use keyof to ensure the correct API key
  onProgress?: (loaded: number, total: number) => void; // Add onProgress property
}

export const query = async (data: QueryData): Promise<string> => {
  try {
    const randomString = Math.random().toString(36).substring(7);
    const inputWithRandomness = data.inputs + randomString;

    const response = await fetch(API_CONFIG[data.api + '_Fetch_Link'], {
      headers: {
        Authorization: `Bearer ${API_CONFIG[data.api + '_API']}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ...data, inputs: inputWithRandomness }),
    });

    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.blob();
    return URL.createObjectURL(result);
  } catch (error) {
    console.error(`Error querying the API: ${error.message}`);
    throw error;
  }
};
