import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, BookingType } from '@/db/schema';
import { z } from 'zod';

// Define the schema for package booking validation
const packageBookingSchema = z.object({
  packageName: z.string().min(1, 'Package name is required'),
  // Assuming destination and duration might be part of the package details retrieved elsewhere or not directly submitted by user in this specific form
  // If they are part of the form, add them here.
  numberOfPeople: z.number().int().min(1, 'Number of people must be at least 1'),
  startDate: z.string().min(1, 'Start date is required'), // Assuming dates are sent as ISO strings
  endDate: z.string().min(1, 'End date is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  // price will likely be calculated or retrieved based on the package and number of people
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = packageBookingSchema.safeParse(body);

    if (!validation.success) {
      console.error('Validation failed:', validation.error.flatten().fieldErrors); // <-- Add this line
      return NextResponse.json({ errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { 
      packageName,
      numberOfPeople,
      startDate,
      endDate,
      name, // This will be used for a general contact name, not a user account name from `users` table
      email,
      phone 
    } = validation.data;

    // TODO: Add logic to calculate or retrieve the price for the package booking
    const calculatedPrice = 0; // Placeholder for price calculation

    const newBooking = await db.insert(bookings).values({
      bookingType: BookingType.PACKAGE, // Using the enum for type safety
      email: email,
      phone: phone,
      name: name,
      status: 'pending', // Default status
      price: calculatedPrice.toString(), // Ensure price is a string if your decimal type expects it
      
      // Holiday package specific fields from the unified bookings table
      packageName: packageName,
      // destination: body.destination, // If destination is part of the form and needed
      // packageDuration: body.packageDuration, // If duration is part of the form and needed
      
      // For a package, passengerCount might be equivalent to numberOfPeople
      passengerCount: numberOfPeople, 
      
      // Dates - ensure they are in a format compatible with your timestamp columns
      // For simplicity, assuming direct insertion if they are already ISO strings
      // You might need to parse them into Date objects if your DB driver requires it
      departureDate: new Date(startDate), // Example: using 'departureDate' for package start
      returnDate: new Date(endDate),     // Example: using 'returnDate' for package end
      
      // Other common fields like name (if you add a 'customerName' field to bookings table)
      // If 'name' from the form is meant to be stored, ensure your 'bookings' table has a suitable column
      // For now, it's not directly mapped to a specific column in the provided 'bookings' schema other than potentially being part of a description or notes if you add such a field.

      // createdAt and updatedAt are handled by defaultNow()
    }).returning();

    return NextResponse.json({ message: 'Package booking created successfully', booking: newBooking[0] }, { status: 201 });

  } catch (error) {
    console.error('Error creating package booking:', error);
    // Check if the error is an instance of Error to safely access message property
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: 'Failed to create package booking', details: errorMessage }, { status: 500 });
  }
}

// You might also want a GET handler if you plan to list package bookings via this route
// export async function GET() {
//   try {
//     const packageBookings = await db.select().from(bookings).where(eq(bookings.bookingType, BookingType.PACKAGE));
//     return NextResponse.json(packageBookings, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching package bookings:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Internal server error';
//     return NextResponse.json({ error: 'Failed to fetch package bookings', details: errorMessage }, { status: 500 });
//   }
// }