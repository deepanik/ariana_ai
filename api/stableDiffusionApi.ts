interface GenerateImageParams {
  inputs: string;
  onProgress?: (loaded: number, total: number) => void;
}

export const generateWithStableDiffusion = async ({ inputs, onProgress }: GenerateImageParams): Promise<string> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000); // 50s timeout

    const response = await fetch('/api/stable-diffusion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: inputs }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      }
      throw new Error(error.error || 'Failed to generate image');
    }

    // Update progress to indicate completion
    if (onProgress) {
      onProgress(100, 100);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    console.error("Error generating image with Stable Diffusion:", error);
    throw new Error(error.message || 'Failed to generate image');
  }
}; 