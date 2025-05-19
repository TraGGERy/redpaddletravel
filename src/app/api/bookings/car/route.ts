import { NextResponse } from 'next/server';
import { createBooking } from '@/db/utils';
import { BookingType } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, carDetails } = body;

    // Validate required fields
    if (!email || !phone || !carDetails) {
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
      bookingType: BookingType.CAR,
      status: 'pending',
      price: carDetails.price,
      
      // Car specific fields
      carMake: carDetails.make,
      carModel: carDetails.model,
      carCategory: carDetails.category,
      pickupLocation: carDetails.pickupLocation,
      dropoffLocation: carDetails.dropoffLocation,
      pickupDate: new Date(carDetails.pickupDate),
      dropoffDate: new Date(carDetails.dropoffDate),
    });

    return NextResponse.json(
      { message: 'Car booking created successfully', booking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating car booking:', error);
    return NextResponse.json(
      { error: 'Failed to create car booking' },
      { status: 500 }
    );
  }
}