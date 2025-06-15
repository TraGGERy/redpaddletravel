import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, BookingType } from '@/db/schema';
import { z } from 'zod';

// Define the schema for cruise booking validation
const cruiseBookingSchema = z.object({
  cruiseName: z.string().min(1, 'Cruise name is required'),
  numberOfPeople: z.number().int().min(1, 'Number of people must be at least 1'),
  departureDate: z.string().min(1, 'Departure date is required'),
  returnDate: z.string().optional(),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  price: z.number().optional(),
  description: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = cruiseBookingSchema.safeParse(body);

    if (!validation.success) {
      console.error('Validation failed:', validation.error.flatten().fieldErrors);
      return NextResponse.json({ errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { 
      cruiseName,
      numberOfPeople,
      departureDate,
      returnDate,
      fullName,
      email,
      phone,
      price,
      description
    } = validation.data;

    // Create the booking record
    const newBooking = await db.insert(bookings).values({
      bookingType: BookingType.CRUISE,
      email: email,
      phone: phone,
      status: 'pending',
      price: price ? price.toString() : undefined,
      
      // Cruise specific fields
      cruiseName: cruiseName,
      passengerCount: numberOfPeople,
      
      // Dates
      departureDate: new Date(departureDate),
      returnDate: returnDate ? new Date(returnDate) : undefined,
      
      // Additional metadata that might be useful
      // You could add more fields here if needed
    }).returning();

    return NextResponse.json({ 
      message: 'Cruise booking created successfully', 
      booking: newBooking[0] 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating cruise booking:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ 
      error: 'Failed to create cruise booking', 
      details: errorMessage 
    }, { status: 500 });
  }
}

// You might also want a GET handler if you plan to list cruise bookings via this route
// export async function GET() {
//   try {
//     const cruiseBookings = await db.select().from(bookings).where(eq(bookings.bookingType, BookingType.CRUISE));
//     return NextResponse.json(cruiseBookings, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching cruise bookings:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Internal server error';
//     return NextResponse.json({ error: 'Failed to fetch cruise bookings', details: errorMessage }, { status: 500 });
//   }
// }