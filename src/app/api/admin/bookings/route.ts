import { NextResponse } from 'next/server';
import { getAllBookings, getBookingsByType, updateBookingStatus, updateBooking } from '@/db/utils';


// Basic authentication middleware
const authenticate = (request: Request) => {
  // In a real application, this would use proper authentication
  // For demo purposes, we're using a simple check
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false;
  }
  
  // Decode the Base64 credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = atob(base64Credentials);
  const [username, password] = credentials.split(':');
  
  // Check against hardcoded credentials (for demo only)
  return username === 'admin' && password === 'admin123';
};

// GET handler to retrieve all bookings
export async function GET(request: Request) {
  // Check authentication
  if (!authenticate(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();
    const type = searchParams.get('type') || 'flight'; // Default to flight bookings
    
    // Get bookings from the database
    let bookings;
    if (type === 'all') {
      bookings = await getAllBookings();
    } else {
      bookings = await getBookingsByType(type);
    }
    
    let filteredBookings = [...bookings];
    
    // Apply status filter if provided
    if (status && status !== 'all') {
      filteredBookings = filteredBookings.filter(booking => booking.status === status);
    }
    
    // Apply search filter if provided
    if (search) {
      filteredBookings = filteredBookings.filter(booking => {
        // Common fields to search
        const commonMatch = 
          booking.email.toLowerCase().includes(search) ||
          booking.phone.includes(search);
          
        // Type-specific fields to search
        let typeSpecificMatch = false;
        
        switch(booking.bookingType) {
          case 'flight':
            typeSpecificMatch = 
              (booking.fromLocation?.toLowerCase().includes(search) || false) ||
              (booking.toLocation?.toLowerCase().includes(search) || false);
            break;
          case 'car':
            typeSpecificMatch = 
              (booking.carMake?.toLowerCase().includes(search) || false) ||
              (booking.carModel?.toLowerCase().includes(search) || false) ||
              (booking.pickupLocation?.toLowerCase().includes(search) || false);
            break;
          case 'hotel':
            typeSpecificMatch = 
              (booking.hotelName?.toLowerCase().includes(search) || false) ||
              (booking.roomType?.toLowerCase().includes(search) || false);
            break;
          case 'package':
            typeSpecificMatch = 
              (booking.packageName?.toLowerCase().includes(search) || false) ||
              (booking.destination?.toLowerCase().includes(search) || false);
            break;
          case 'cruise':
            typeSpecificMatch = 
              (booking.cruiseName?.toLowerCase().includes(search) || false) ||
              (booking.cruiseCompany?.toLowerCase().includes(search) || false) ||
              (booking.departurePort?.toLowerCase().includes(search) || false);
            break;
        }
        
        return commonMatch || typeSpecificMatch;
      });
    }
    
    // Transform database bookings to match the expected format in the frontend
    const formattedBookings = filteredBookings.map(booking => {
      // Common booking data
      const commonData = {
        id: booking.id.toString(),
        email: booking.email,
        phone: booking.phone,
        createdAt: booking.createdAt?.toISOString() ?? new Date().toISOString(),
        status: booking.status,
        bookingType: booking.bookingType
      };
      
      // Type-specific data
      switch(booking.bookingType) {
        case 'flight':
          return {
            ...commonData,
            flightDetails: {
              tripType: booking.tripType,
              cabinClass: booking.cabinClass,
              from: booking.fromLocation,
              to: booking.toLocation,
              departureDate: booking.departureDate?.toISOString(),
              returnDate: booking.returnDate ? booking.returnDate.toISOString() : undefined,
              passengers: {
                adults: Math.floor((booking.passengerCount || 0) / 2), // Approximation for demo
                children: Math.floor((booking.passengerCount || 0) / 4), // Approximation for demo
                infants: Math.floor((booking.passengerCount || 0) / 8)  // Approximation for demo
              }
            }
          };
        case 'car':
          return {
            ...commonData,
            carDetails: {
              make: booking.carMake,
              model: booking.carModel,
              category: booking.carCategory,
              pickupLocation: booking.pickupLocation,
              dropoffLocation: booking.dropoffLocation,
              pickupDate: booking.pickupDate?.toISOString(),
              dropoffDate: booking.dropoffDate?.toISOString()
            }
          };
        case 'hotel':
          return {
            ...commonData,
            hotelDetails: {
              name: booking.hotelName,
              roomType: booking.roomType,
              checkInDate: booking.checkInDate?.toISOString(),
              checkOutDate: booking.checkOutDate?.toISOString(),
              guestCount: booking.guestCount
            }
          };
        case 'package':
          return {
            ...commonData,
            packageDetails: {
              name: booking.packageName,
              destination: booking.destination,
              duration: booking.packageDuration
            }
          };
        case 'cruise':
          return {
            ...commonData,
            cruiseDetails: {
              name: booking.cruiseName,
              company: booking.cruiseCompany,
              departurePort: booking.departurePort,
              duration: booking.cruiseDuration
            }
          };
        default:
          return commonData;
      }
    });
    
    return NextResponse.json(formattedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

// PATCH handler to update booking
export async function PATCH(request: Request) {
  // Check authentication
  if (!authenticate(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    const { id, status, ...otherFields } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
    }
    
    let result;
    
    // If only status is being updated, use the dedicated function
    if (status && Object.keys(otherFields).length === 0) {
      result = await updateBookingStatus(parseInt(id), status);
    } else {
      // For more complex updates, use the general update function
      result = await updateBooking(parseInt(id), body);
    }
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Booking ${id} status updated to ${status}`,
      booking: result[0]
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}