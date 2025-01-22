const REPLICATE_API_KEY = process.env.NEXT_PUBLIC_REPLICATE_API_KEY;
const API_URL = "https://api.replicate.com/v1/predictions";

interface GenerateImageParams {
  inputs: string;
  onProgress?: (loaded: number, total: number) => void;
}

export const generateImageWithReplicate = async ({ inputs, onProgress }: GenerateImageParams): Promise<string> => {
  try {
    // Start the image generation through our API route
    const response = await fetch('/api/replicate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: inputs }),
    });

    if (!response.ok) {
      const error = await response.json();
      if (response.status === 402) {
        throw new Error('Free API credits exhausted. Please try again later or upgrade your account.');
      }
      throw new Error(error.error || 'Failed to start image generation');
    }

    const prediction = await response.json();
    
    if (!prediction.urls?.get) {
      throw new Error('Invalid response from Replicate API');
    }

    // Poll for results
    const maxAttempts = 60;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const statusResponse = await fetch(prediction.urls.get, {
        headers: {
          "Authorization": `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}`,
        },
      });

      if (!statusResponse.ok) {
        throw new Error(`Failed to check generation status: ${statusResponse.statusText}`);
      }

      const result = await statusResponse.json();
      
      if (result.status === "succeeded") {
        if (!result.output?.[0]) {
          throw new Error('No output image URL in response');
        }
        // Create a proxy URL for the image to avoid CORS
        const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(result.output[0])}`;
        const imageResponse = await fetch(proxyUrl);
        if (!imageResponse.ok) {
          throw new Error('Failed to fetch generated image');
        }
        const blob = await imageResponse.blob();
        return URL.createObjectURL(blob);
      } else if (result.status === "failed") {
        throw new Error(result.error || "Image generation failed");
      }

      // Update progress
      if (onProgress) {
        const progress = (attempts / maxAttempts) * 100;
        onProgress(progress, 100);
      }

      attempts++;
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    throw new Error("Timeout waiting for image generation");
  } catch (error: any) {
    console.error("Error generating image with Replicate:", error);
    throw new Error(error.message || 'Failed to generate image');
  }
}; 