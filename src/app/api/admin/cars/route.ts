import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // In a real application, you would fetch car data from a database
  const cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2023, category: 'Sedan', pricePerDay: 50, location: 'City Center', available: true },
    { id: 2, make: 'Honda', model: 'CR-V', year: 2023, category: 'SUV', pricePerDay: 70, location: 'Airport', available: false },
  ];

  return NextResponse.json(cars);
}

// You can add POST, PUT, DELETE handlers here as needed
// For example, to add a new car:
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     // Add logic to save the new car to your database
//     // const newCar = await db.insertInto('cars').values(body).returningAll().executeTakeFirstOrThrow();
//     // return NextResponse.json(newCar, { status: 201 });
//     return NextResponse.json({ message: 'Car created successfully', car: body }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating car:', error);
//     return NextResponse.json({ error: 'Failed to create car' }, { status: 500 });
//   }
// }