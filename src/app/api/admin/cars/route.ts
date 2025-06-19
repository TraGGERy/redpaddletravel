import { NextResponse } from 'next/server';
import { db } from '@/db';
import { carHire } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Fetch car data from the database
    const cars = await db.select().from(carHire);
    return NextResponse.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
  }
}

// Handler to delete a car
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Car ID is required' }, { status: 400 });
    }
    
    // Delete the car from the database
    await db.delete(carHire).where(eq(carHire.id, parseInt(id)));
    
    return NextResponse.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 });
  }
}

// Handler to add a new car
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Insert the new car into the database
    const newCar = await db.insert(carHire).values({
      make: body.make,
      model: body.model,
      year: body.year,
      category: body.category,
      seats: body.seats || 5, // Default value if not provided
      transmission: body.transmission || 'automatic', // Default value if not provided
      fuelType: body.fuelType,
      pricePerDay: body.pricePerDay,
      location: body.location,
      available: body.available !== undefined ? body.available : true,
      imageUrl: body.imageUrl
    }).returning();
    
    return NextResponse.json({ message: 'Car created successfully', car: newCar[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating car:', error);
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 });
  }
}