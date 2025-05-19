import { NextRequest, NextResponse } from 'next/server';
import { getAllHolidayPackages, createHolidayPackage, updateHolidayPackage, deleteHolidayPackage } from '@/db/utils';
import { NewHolidayPackage } from '@/db/schema';

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

// GET all holiday packages
export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const holidayPackages = await getAllHolidayPackages();
    return NextResponse.json(holidayPackages);
  } catch (error) {
    console.error('Error fetching holiday packages:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch holiday packages' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// POST create a new holiday package
export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await req.json();
    const newPackage: NewHolidayPackage = {
      name: data.name,
      destination: data.destination,
      description: data.description,
      duration: data.duration,
      price: data.price,
      inclusions: data.inclusions,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await createHolidayPackage(newPackage);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating holiday package:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to create holiday package' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// PATCH update a holiday package
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
      return new NextResponse(JSON.stringify({ error: 'Package ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await updateHolidayPackage(id, updateData);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating holiday package:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to update holiday package' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// DELETE a holiday package
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
      return new NextResponse(JSON.stringify({ error: 'Package ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await deleteHolidayPackage(Number(id));
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting holiday package:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to delete holiday package' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}