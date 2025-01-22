import { NextResponse } from 'next/server';

const REPLICATE_API_KEY = process.env.NEXT_PUBLIC_REPLICATE_API_KEY;
const REPLICATE_API_URL = "https://api.replicate.com/v1/predictions";

export async function POST(request: Request) {
  if (!REPLICATE_API_KEY) {
    return NextResponse.json(
      { error: 'Replicate API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const response = await fetch(REPLICATE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b", // Free model version
        input: {
          prompt,
          negative_prompt: "blurry, bad quality, worst quality, low quality, text, watermark",
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 25, // Reduced steps to save credits
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Replicate API error:', errorData);
      
      if (response.status === 402) {
        return NextResponse.json(
          { error: 'Free API credits exhausted. Please check your Replicate account.' },
          { status: 402 }
        );
      }

      return NextResponse.json(
        { error: errorData.detail || `Replicate API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const prediction = await response.json();
    return NextResponse.json(prediction);
  } catch (error) {
    console.error('Replicate API error:', error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
} 