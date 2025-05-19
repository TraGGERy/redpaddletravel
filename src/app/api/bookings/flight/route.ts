import { NextResponse } from 'next/server';
import { createBooking } from '@/db/utils';
import { BookingType } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, flightDetails } = body;

    // Validate required fields
    if (!email || !phone || !flightDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create booking in database
    const booking = await createBooking({
      email,
      phone,
      bookingType: BookingType.FLIGHT,
      status: 'pending',
      
      // Flight specific fields
      tripType: flightDetails.tripType,
      cabinClass: flightDetails.cabinClass,
      fromLocation: flightDetails.from,
      toLocation: flightDetails.to,
      departureDate: flightDetails.departureDate ? new Date(flightDetails.departureDate) : undefined,
      returnDate: flightDetails.returnDate ? new Date(flightDetails.returnDate) : undefined,
      passengerCount: flightDetails.passengers ? 
        (flightDetails.passengers.adults || 0) + 
        (flightDetails.passengers.children || 0) + 
        (flightDetails.passengers.infants || 0) : 1,
    });

    return NextResponse.json(
      { message: 'Flight booking created successfully', booking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating flight booking:', error);
    return NextResponse.json(
      { error: 'Failed to create flight booking' },
      { status: 500 }
    );
  }
}