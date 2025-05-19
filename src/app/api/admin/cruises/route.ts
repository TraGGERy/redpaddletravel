import { NextRequest, NextResponse } from 'next/server';
import { getAllCruiseShips, createCruiseShip, updateCruiseShip, deleteCruiseShip } from '@/db/utils';
import { NewCruiseShip } from '@/db/schema';

// Basic auth middleware
function isAuthenticated(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false;
  }
  
  // In a real app, you would validate against stored credentials
  // This is just a simple example
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = atob(base64Credentials);
  const [username, password] = credentials.split(':');
  
  return username === 'admin' && password === 'admin123';
}

// GET all cruise ships
export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const cruiseShips = await getAllCruiseShips();
    return NextResponse.json(cruiseShips);
  } catch (error) {
    console.error('Error fetching cruise ships:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch cruise ships' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// POST create a new cruise ship
export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await req.json();
    const newCruise: NewCruiseShip = {
      name: data.name,
      company: data.company,
      capacity: data.capacity,
      route: data.route || data.destinations, // Support both route and destinations for backward compatibility
      duration: data.duration,
      price: data.price,
      departurePort: data.departurePort,
      amenities: data.amenities || [], // Add amenities field
      imageUrl: data.imageUrl,
      isActive: data.isActive !== undefined ? data.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await createCruiseShip(newCruise);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating cruise ship:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to create cruise ship' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// PATCH update a cruise ship
export async function PATCH(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await req.json();
    const { id, ...updateData } = data;
    
    if (!id) {
      return new NextResponse(JSON.stringify({ error: 'Cruise ship ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await updateCruiseShip(id, updateData);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating cruise ship:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to update cruise ship' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// DELETE a cruise ship
export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return new NextResponse(JSON.stringify({ error: 'Cruise ship ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await deleteCruiseShip(Number(id));
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting cruise ship:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to delete cruise ship' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}