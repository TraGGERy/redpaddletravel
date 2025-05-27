import { NextRequest, NextResponse } from 'next/server';

// interface Message {  // Removed unused Message interface
//   role: 'user' | 'assistant' | 'system';
//   content: string;
// }

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request. Messages array is required.' },
        { status: 400 }
      );
    }

    // Prepare the payload for OpenAI API
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful travel assistant for Redpaddle Travel and Tours. You help users with information about luxury travel services including flights, hotels, and car rentals. Be friendly, professional, and knowledgeable about travel destinations and premium travel experiences.'
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    };

    // Get API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key is not configured');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return NextResponse.json(
        { error: data.error?.message || 'Failed to get response from OpenAI' },
        { status: response.status }
      );
    }

    // Return the assistant's response
    return NextResponse.json({
      message: data.choices[0].message.content
    });
    
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}