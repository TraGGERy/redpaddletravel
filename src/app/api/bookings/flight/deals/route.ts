import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, BookingType } from '@/db/schema';
import { z } from 'zod';

// Define the schema for flight deal booking validation
const flightDealBookingSchema = z.object({
  from: z.string().min(1, 'Departure location is required'),
  to: z.string().min(1, 'Destination is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  departureDate: z.string().min(1, 'Departure date is required'),
  returnDate: z.string().optional(),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  adults: z.number().int().min(1, 'At least one adult passenger is required'),
  kids: z.number().int().min(0, 'Number of kids cannot be negative').optional(),
  infants: z.number().int().min(0, 'Number of infants cannot be negative').optional(),
  cabinClass: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = flightDealBookingSchema.safeParse(body);

    if (!validation.success) {
      console.error('Validation failed:', validation.error.flatten().fieldErrors);
      return NextResponse.json({ errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { 
      from,
      to,
      price,
      departureDate,
      returnDate,
      fullName,
      email,
      phone,
      adults,
      kids = 0,
      infants = 0,
      cabinClass = 'Economy'
    } = validation.data;

    // Calculate total passenger count
    const passengerCount = adults + kids + infants;

    // Create the booking record
    const newBooking = await db.insert(bookings).values({
      bookingType: BookingType.FLIGHT,
      email: email,
      phone: phone,
      status: 'pending',
      price: price.toString(),
      
      // Flight specific fields
      fromLocation: from,
      toLocation: to,
      departureDate: new Date(departureDate),
      returnDate: returnDate ? new Date(returnDate) : undefined,
      passengerCount: passengerCount,
      cabinClass: cabinClass,
      tripType: returnDate ? 'Round Trip' : 'One Way',
      
      // Additional metadata
      // You could add more fields here if needed
    }).returning();

    return NextResponse.json({ 
      message: 'Flight deal booking created successfully', 
      booking: newBooking[0] 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating flight deal booking:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ 
      error: 'Failed to create flight deal booking', 
      details: errorMessage 
    }, { status: 500 });
  }
}