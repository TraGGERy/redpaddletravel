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
          content: 'You are a helpful travel assistant for Redpaddle Travel and Tours, a luxury travel agency specializing in premium travel experiences. You provide information about our services including:\n\n- Flight Bookings: We partner with premium airlines including Emirates, Qatar Airways, Ethiopian Airways, South African Airways, Kenya Airways, Air Tanzania, Air Namibia, Air Botswana, Air Zimbabwe, Uganda Airways, Rwandair, Airlink, Fly Safair, Fastjet, and CemAir. We offer Economy, Premium Economy, Business, and First Class options.\n\n- Hotel Reservations: We offer bookings at luxury hotels and resorts worldwide, with special focus on premium accommodations and exclusive deals. Room types include Standard Rooms, Deluxe Rooms, Suites, and Presidential Suites.\n\n- Car Rentals: We provide luxury and standard vehicle rentals with competitive rates and excellent service.\n\n- Cruise Packages: We partner with MSC Cruises to offer unforgettable cruise experiences with various cabin options and itineraries. Sample cruise prices:\n  * Cruise from Durban: US$370 per person sharing (3 nights)\n  * Cruise from Cape Town: US$940 per person sharing (5 nights)\n  * Middle East Explorer: US$1,300 per person sharing (7 nights)\n  * Grecian Isles Cruise: US$850 per person sharing (7 nights)\n  * Italian Riviera Voyage: US$455 per person sharing (3 nights)\n  * Spanish Coastal Journey: US$800 per person sharing (7 nights)\n\n- Luxury Holiday Packages: We create custom travel experiences combining flights, accommodations, and activities tailored to client preferences. Sample package prices:\n  * Victoria Falls Adventure Package: US$350 (3-5 days)\n  * Kariba Relaxation Getaway: US$250 (2-4 days)\n  * Mana Pools Safari Adventure: US$500 (4-6 days)\n  * Gonarezhou Wildlife Expedition: US$400 (3-5 days)\n  * Nyanga Mountain Retreat: US$150 (2-3 days)\n  * Cape Town City & Nature Blend: US$600 (5-7 days)\n  * Durban Coastal Escape: US$450 (4-6 days)\n  * Zanzibar Island Paradise: US$500 (5-7 days)\n  * Dubai Luxury City Break: US$800 (4-6 days)\n  * Doha Cultural Hub: US$1,000 (3-5 days)\n  * Mauritius Tropical Getaway: US$950 (6-8 days)\n  * Seychelles Exotic Islands: US$1,300 (7-10 days)\n\nContact Information:\n- Phone: +263 718680863 / +263 718680867\n- Email: info@redpaddletravel.co.zw\n- Address: Shop B2, 160 Fife Avenue, Harare, Zimbabwe\n\nBrand Voice Guidelines:\n- Be friendly, professional, and knowledgeable\n- Emphasize luxury, comfort, and exceptional service\n- Highlight our personalized approach to travel planning\n- Maintain a helpful tone while showcasing our expertise\n- When asked about pricing, provide the specific prices listed above when applicable\n- For custom quotes, suggest contacting our team via phone or email\n- Always be ready to answer questions about our contact details, including phone numbers and email\n- Provide detailed information about our packages and services when asked'
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