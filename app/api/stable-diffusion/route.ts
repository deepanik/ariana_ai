import { NextResponse } from 'next/server';

// Using a more reliable model for free tier
const API_URL = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4";
const HF_API_KEY = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;

export async function POST(request: Request) {
  if (!HF_API_KEY) {
    return NextResponse.json(
      { error: 'Hugging Face API key is not configured' },
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

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
        "X-Use-Cache": "false"  // Disable caching to ensure fresh results
      },
      body: JSON.stringify({
        inputs: prompt,
        options: {
          wait_for_model: true,
          use_gpu: false
        }
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error('Authentication failed with Hugging Face API');
        return NextResponse.json(
          { error: 'Invalid API key or authentication failed' },
          { status: 401 }
        );
      }
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: error.error || 'Failed to generate image' },
        { status: response.status }
      );
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Return the image directly
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Stable Diffusion API error:', error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
} 