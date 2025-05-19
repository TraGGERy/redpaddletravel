import { NextResponse } from 'next/server';
import { createBooking } from '@/db/utils';
import { BookingType } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, hotelDetails } = body;

    // Validate required fields
    if (!email || !phone || !hotelDetails) {
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
      bookingType: BookingType.HOTEL,
      status: 'pending',
      price: hotelDetails.price,
      
      // Hotel specific fields
      hotelName: hotelDetails.name,
      toLocation: hotelDetails.location,
      roomType: hotelDetails.roomType,
      checkInDate: new Date(hotelDetails.checkInDate),
      checkOutDate: new Date(hotelDetails.checkOutDate),
      guestCount: hotelDetails.guests,
    });

    return NextResponse.json(
      { message: 'Hotel booking created successfully', booking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating hotel booking:', error);
    return NextResponse.json(
      { error: 'Failed to create hotel booking' },
      { status: 500 }
    );
  }
}