'use client';

import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation'; // This line should be removed
import { FaEnvelope, FaPhone, FaPlane, FaCalendar, FaUser, FaSearch, FaSignOutAlt, FaUmbrellaBeach, FaShip, FaCar, FaPlus } from 'react-icons/fa';

interface Booking {
  id: string; // or number, depending on your schema
  email: string;
  phone: string;
  name?: string;
  bookingType: 'flight' | 'car' | 'hotel' | 'package' | 'cruise';
  status: BookingStatus;
  price?: number; // or string, depending on schema type

  // Flight specific fields (optional)
  tripType?: string;
  cabinClass?: string;
  fromLocation?: string;
  toLocation?: string;
  departureDate?: string; // or Date
  returnDate?: string; // or Date
  passengerCount?: number;

  // Car hire specific fields (optional)
  carMake?: string;
  carModel?: string;
  carCategory?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string; // or Date
  dropoffDate?: string; // or Date

  // Hotel specific fields (optional)
  hotelName?: string;
  roomType?: string;
  checkInDate?: string; // or Date
  checkOutDate?: string; // or Date
  guestCount?: number;

  // Holiday package specific fields (optional)
  packageName?: string;
  destination?: string;
  packageDuration?: number;

  // Cruise specific fields (optional)
  cruiseName?: string;
  cruiseCompany?: string;
  departurePort?: string;
  cruiseDuration?: number;

  createdAt: string; // or Date
  updatedAt?: string; // or Date
}

type BookingStatus = 'pending' | 'new' | 'contacted' | 'confirmed' | 'cancelled'; // Expanded BookingStatus type

interface HolidayPackage {
  id: number;
  name: string;
  destination: string;
  description: string;
  duration: number;
  price: number;
  inclusions: string;
  createdAt: string;
  updatedAt: string;
}

interface CruiseShip {
  id: number;
  name: string;
  company: string;
  capacity: number;
  destinations: string;
  duration: number;
  price: number;
  departurePort: string;
  createdAt: string;
  updatedAt: string;
}

interface CarHire {
  id: number;
  make: string;
  model: string;
  year: number;
  category: string;
  pricePerDay: number;
  location: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

// Import form components
import AddCarForm from '@/components/AddCarForm';
import AddPackageForm from '@/components/AddPackageForm';
import AddCruiseForm from '@/components/AddCruiseForm';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [holidayPackages, setHolidayPackages] = useState<HolidayPackage[]>([]);
  const [cruiseShips, setCruiseShips] = useState<CruiseShip[]>([]);
  const [carHires, setCarHires] = useState<CarHire[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('bookings');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [showAddPackageForm, setShowAddPackageForm] = useState(false);
  const [showAddCruiseForm, setShowAddCruiseForm] = useState(false);
  // const router = useRouter(); // Removed unused router

  // Mock admin credentials - in a real app, this would be handled by a proper auth system
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  // Fetch bookings from API
  const fetchBookings = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch(`/api/admin/bookings?type=all`, {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      let data = await response.json();
      // Sort bookings by createdAt in descending order (latest first)
      data.sort((a: Booking, b: Booking) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setBookings(data);
      setFilteredBookings(data); // Also set the sorted data to filteredBookings initially
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, username, password, statusFilter, searchTerm]); // Added dependencies for useCallback

  // Fetch holiday packages
  const fetchHolidayPackages = useCallback(async () => { // Wrapped in useCallback
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch('/api/admin/packages', {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch holiday packages');
      }
      
      const data = await response.json();
      setHolidayPackages(data);
    } catch (error) {
      console.error('Error fetching holiday packages:', error);
      setError('Failed to load holiday packages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, username, password]); // Added dependencies for useCallback

  // Fetch cruise ships
  const fetchCruiseShips = useCallback(async () => { // Wrapped in useCallback
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch('/api/admin/cruises', {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch cruise ships');
      }
      
      const data = await response.json();
      setCruiseShips(data);
    } catch (error) {
      console.error('Error fetching cruise ships:', error);
      setError('Failed to load cruise ships. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, username, password]); // Added dependencies for useCallback

  // Fetch car hires
  const fetchCarHires = useCallback(async () => { // Wrapped in useCallback
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch('/api/admin/cars', {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch car hires');
      }
      
      const data = await response.json();
      setCarHires(data);
    } catch (error) {
      console.error('Error fetching car hires:', error);
      setError('Failed to load car hires. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, username, password]); // Added dependencies for useCallback

  // Fetch data when authenticated or filters change
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'bookings') {
        fetchBookings();
      } else if (activeTab === 'packages') {
        fetchHolidayPackages();
      } else if (activeTab === 'cruises') {
        fetchCruiseShips();
      } else if (activeTab === 'cars') {
        fetchCarHires();
      }
    }
  }, [isAuthenticated, searchTerm, statusFilter, activeTab, fetchBookings, fetchCarHires, fetchCruiseShips, fetchHolidayPackages]); // Added missing dependencies


  // Filter bookings based on search term and status
  useEffect(() => {
    if (bookings.length > 0) {
      let filtered = [...bookings];
      
      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(booking => 
          booking.email.toLowerCase().includes(term) ||
          booking.phone.includes(term) ||
          (booking.fromLocation && booking.fromLocation.toLowerCase().includes(term)) ||
          (booking.toLocation && booking.toLocation.toLowerCase().includes(term))
        );
      }
      
      // Apply status filter
      if (statusFilter !== 'all') {
        filtered = filtered.filter(booking => booking.status === statusFilter);
      }
      
      setFilteredBookings(filtered);
    }
  }, [searchTerm, statusFilter, bookings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setBookings([]);
    setFilteredBookings([]);
  };

  const updateBookingStatus = async (id: string, newStatus: 'new' | 'contacted' | 'confirmed' | 'cancelled') => {
    try {
      // Create basic auth header
      const credentials = btoa(`${username}:${password}`);
      
      const response = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }
      
      // Update local state
      const updatedBookings = bookings.map(booking => 
        booking.id === id ? { ...booking, status: newStatus } : booking
      );
      setBookings(updatedBookings);
      
      // Apply filters to updated bookings
      let filtered = [...updatedBookings];
      if (statusFilter !== 'all') {
        filtered = filtered.filter(booking => booking.status === statusFilter);
      }
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(booking => 
          booking.email.toLowerCase().includes(term) ||
          booking.phone.includes(term) ||
          (booking.fromLocation && booking.fromLocation.toLowerCase().includes(term)) ||
          (booking.toLocation && booking.toLocation.toLowerCase().includes(term))
        );
      }
      setFilteredBookings(filtered);
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Admin Login</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Please sign in to access the admin dashboard</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="px-4 sm:px-0 mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`${activeTab === 'bookings' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FaPlane className="mr-2" />
                All Bookings
              </button>
              <button
                onClick={() => setActiveTab('packages')}
                className={`${activeTab === 'packages' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FaUmbrellaBeach className="mr-2" />
                Holiday Packages
              </button>
              <button
                onClick={() => setActiveTab('cruises')}
                className={`${activeTab === 'cruises' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FaShip className="mr-2" />
                Cruise Ships
              </button>
              <button
                onClick={() => setActiveTab('cars')}
                className={`${activeTab === 'cars' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FaCar className="mr-2" />
                Car Hire
              </button>
            </nav>
          </div>
        </div>
        {/* Dashboard Stats */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <FaEnvelope className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Bookings</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">{bookings.length}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <FaPlane className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">New Requests</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {bookings.filter(b => b.status === 'new').length}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <FaPhone className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Contacted</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {bookings.filter(b => b.status === 'contacted').length}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <FaCalendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Confirmed</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {bookings.filter(b => b.status === 'confirmed').length}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'bookings' && (
        <div className="px-4 sm:px-0 mt-6">
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4 md:mb-0">All Booking Requests</h3>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search bookings"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <select
                    className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            
                        {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Info</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Booking Details</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Submitted</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-full">
                              <FaUser className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.email}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{booking.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                            {booking.bookingType.charAt(0).toUpperCase() + booking.bookingType.slice(1)}
                          </div>
                          {booking.bookingType === 'flight' && (
                            <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                              {booking.fromLocation && booking.toLocation && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Route:</span> {booking.fromLocation} → {booking.toLocation}</div>}
                              {booking.tripType && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Trip:</span> {booking.tripType}</div>}
                              {booking.cabinClass && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Class:</span> {booking.cabinClass}</div>}
                              {booking.departureDate && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Departure:</span> {new Date(booking.departureDate).toLocaleDateString()}</div>}
                              {booking.returnDate && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Return:</span> {new Date(booking.returnDate).toLocaleDateString()}</div>}
                              {booking.passengerCount != null && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Passengers:</span> {booking.passengerCount} Adult{booking.passengerCount !== 1 ? 's' : ''}</div>}
                            </div>
                          )}
                          {booking.bookingType === 'car' && (
                            <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                              {(booking.carMake || booking.carModel) && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Vehicle:</span> {booking.carMake} {booking.carModel}</div>}
                              {booking.carCategory && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Category:</span> {booking.carCategory}</div>}
                              {booking.pickupLocation && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Pickup:</span> {booking.pickupLocation}</div>}
                              {booking.dropoffLocation && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Dropoff:</span> {booking.dropoffLocation}</div>}
                              {booking.pickupDate && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Pickup Date:</span> {new Date(booking.pickupDate).toLocaleDateString()}</div>}
                              {booking.dropoffDate && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Dropoff Date:</span> {new Date(booking.dropoffDate).toLocaleDateString()}</div>}
                            </div>
                          )}
                          {booking.bookingType === 'hotel' && (
                            <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                              {booking.hotelName && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Hotel:</span> {booking.hotelName}</div>}
                              {booking.destination && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Location:</span> {booking.destination}</div>}
                              {booking.roomType && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Room:</span> {booking.roomType}</div>}
                              {booking.checkInDate && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Check-in:</span> {new Date(booking.checkInDate).toLocaleDateString()}</div>}
                              {booking.checkOutDate && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Check-out:</span> {new Date(booking.checkOutDate).toLocaleDateString()}</div>}
                              {booking.guestCount != null && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Guests:</span> {booking.guestCount} Guest{booking.guestCount !== 1 ? 's' : ''}</div>}
                            </div>
                          )}
                          {booking.bookingType === 'package' && (
                            <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                              {booking.packageName && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Package:</span> {booking.packageName}</div>}
                              {booking.destination && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Destination:</span> {booking.destination}</div>}
                              {booking.departureDate && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Start Date:</span> {new Date(booking.departureDate).toLocaleDateString()}</div>}
                              {booking.packageDuration != null && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Duration:</span> {booking.packageDuration} Day{booking.packageDuration !== 1 ? 's' : ''}</div>}
                              {booking.passengerCount != null && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Participants:</span> {booking.passengerCount} Participant{booking.passengerCount !== 1 ? 's' : ''}</div>}
                            </div>
                          )}
                          {booking.bookingType === 'cruise' && (
                            <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                              {booking.cruiseName && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Cruise:</span> {booking.cruiseName}</div>}
                              {booking.cruiseCompany && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Company:</span> {booking.cruiseCompany}</div>}
                              {booking.departurePort && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Departure Port:</span> {booking.departurePort}</div>}
                              {booking.departureDate && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Departure Date:</span> {new Date(booking.departureDate).toLocaleDateString()}</div>}
                              {booking.cruiseDuration != null && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Duration:</span> {booking.cruiseDuration} Day{booking.cruiseDuration !== 1 ? 's' : ''}</div>}
                              {booking.cabinClass && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Cabin:</span> {booking.cabinClass}</div>}
                              {booking.passengerCount != null && <div><span className="font-semibold text-gray-700 dark:text-gray-300">Guests:</span> {booking.passengerCount} Guest{booking.passengerCount !== 1 ? 's' : ''}</div>}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{new Date(booking.createdAt).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(booking.createdAt).toLocaleTimeString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${booking.status === 'new' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                            ${booking.status === 'contacted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                            ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''}
                            ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                          `}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <select 
                            className="block w-full py-1 px-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value as 'new' | 'contacted' | 'confirmed' | 'cancelled')}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No bookings found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            )}
          </div>
        </div>
        )}

        {/* Holiday Packages Section */}
        {activeTab === 'packages' && showAddPackageForm && (
          <AddPackageForm 
            onSuccess={() => {
              setShowAddPackageForm(false);
              fetchHolidayPackages();
            }}
            onCancel={() => setShowAddPackageForm(false)}
            credentials={btoa(`${username}:${password}`)}
          />
        )}
        {activeTab === 'packages' && (
          <div className="px-4 sm:px-0 mt-6">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Holiday Packages</h3>
                <button
                  onClick={() => setShowAddPackageForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2" /> Add Package
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Destination</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {holidayPackages.length > 0 ? (
                      holidayPackages.map((pkg) => (
                        <tr key={pkg.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{pkg.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{pkg.destination}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{pkg.duration} days</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">£{typeof pkg.price === 'number' ? pkg.price.toFixed(2) : pkg.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            <button 
                              onClick={() => {
                                // Implement edit functionality for packages
                                alert(`Edit package with ID: ${pkg.id}`);
                                // You would typically open a form with the package data pre-filled
                              }} 
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={async () => {
                                if (window.confirm(`Are you sure you want to delete ${pkg.name}?`)) {
                                  try {
                                    const credentials = btoa(`${username}:${password}`);
                                    const response = await fetch(`/api/admin/packages?id=${pkg.id}`, {
                                      method: 'DELETE',
                                      headers: {
                                        'Authorization': `Basic ${credentials}`
                                      }
                                    });
                                    
                                    if (!response.ok) {
                                      throw new Error('Failed to delete package');
                                    }
                                    
                                    // Remove the deleted package from the state
                                    setHolidayPackages(holidayPackages.filter(p => p.id !== pkg.id));
                                  } catch (error) {
                                    console.error('Error deleting package:', error);
                                    alert('Failed to delete package. Please try again.');
                                  }
                                }
                              }} 
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          {isLoading ? 'Loading packages...' : 'No holiday packages found'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Cruise Ships Section */}
        {activeTab === 'cruises' && showAddCruiseForm && (
          <AddCruiseForm 
            onSuccess={() => {
              setShowAddCruiseForm(false);
              fetchCruiseShips();
            }}
            onCancel={() => setShowAddCruiseForm(false)}
            credentials={btoa(`${username}:${password}`)}
          />
        )}
        {activeTab === 'cruises' && (
          <div className="px-4 sm:px-0 mt-6">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Cruise Ships</h3>
                <button
                  onClick={() => setShowAddCruiseForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2" /> Add Cruise Ship
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Capacity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Departure Port</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {cruiseShips.length > 0 ? (
                      cruiseShips.map((cruise) => (
                        <tr key={cruise.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{cruise.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{cruise.company}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{cruise.capacity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{cruise.departurePort}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">£{typeof cruise.price === 'number' ? cruise.price.toFixed(2) : cruise.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            <button 
                              onClick={() => {
                                // Implement edit functionality for cruises
                                alert(`Edit cruise with ID: ${cruise.id}`);
                                // You would typically open a form with the cruise data pre-filled
                              }} 
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={async () => {
                                if (window.confirm(`Are you sure you want to delete ${cruise.name}?`)) {
                                  try {
                                    const credentials = btoa(`${username}:${password}`);
                                    const response = await fetch(`/api/admin/cruises?id=${cruise.id}`, {
                                      method: 'DELETE',
                                      headers: {
                                        'Authorization': `Basic ${credentials}`
                                      }
                                    });
                                    
                                    if (!response.ok) {
                                      throw new Error('Failed to delete cruise');
                                    }
                                    
                                    // Remove the deleted cruise from the state
                                    setCruiseShips(cruiseShips.filter(c => c.id !== cruise.id));
                                  } catch (error) {
                                    console.error('Error deleting cruise:', error);
                                    alert('Failed to delete cruise. Please try again.');
                                  }
                                }
                              }} 
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          {isLoading ? 'Loading cruise ships...' : 'No cruise ships found'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Car Hire Section */}
        {activeTab === 'cars' && showAddCarForm && (
          <AddCarForm 
            onSuccess={() => {
              setShowAddCarForm(false);
              fetchCarHires();
            }}
            onCancel={() => setShowAddCarForm(false)}
            credentials={btoa(`${username}:${password}`)}
          />
        )}
        {activeTab === 'packages' && showAddPackageForm && (
          <AddPackageForm
            onSuccess={() => {
              setShowAddPackageForm(false);
              fetchHolidayPackages();
            }}
            onCancel={() => setShowAddPackageForm(false)}
            credentials={btoa(`${username}:${password}`)}
          />
        )}
        {activeTab === 'cruises' && showAddCruiseForm && (
          <AddCruiseForm
            onSuccess={() => {
              setShowAddCruiseForm(false);
              fetchCruiseShips();
            }}
            onCancel={() => setShowAddCruiseForm(false)}
            credentials={btoa(`${username}:${password}`)}
          />
        )}
        {activeTab === 'cars' && (
        <div className="px-4 sm:px-0 mt-6">
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4 md:mb-0">Car Hire</h3>
                <button
                  onClick={() => setShowAddCarForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2" /> Add Car
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Make & Model</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Year</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price Per Day</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {carHires.length > 0 ? (
                      carHires.map((car) => (
                        <tr key={car.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{car.make} {car.model}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{car.year}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{car.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">£{typeof car.pricePerDay === 'number' ? car.pricePerDay.toFixed(2) : car.pricePerDay}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{car.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${car.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                              {car.available ? 'Available' : 'Unavailable'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => {
                                // Implement edit functionality for cars
                                alert(`Edit car with ID: ${car.id}`);
                                // You would typically open a form with the car data pre-filled
                              }} 
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={async () => {
                                if (window.confirm(`Are you sure you want to delete ${car.make} ${car.model}?`)) {
                                  try {
                                    const credentials = btoa(`${username}:${password}`);
                                    const response = await fetch(`/api/admin/cars?id=${car.id}`, {
                                      method: 'DELETE',
                                      headers: {
                                        'Authorization': `Basic ${credentials}`
                                      }
                                    });
                                    
                                    if (!response.ok) {
                                      throw new Error('Failed to delete car');
                                    }
                                    
                                    // Remove the deleted car from the state
                                    setCarHires(carHires.filter(c => c.id !== car.id));
                                  } catch (error) {
                                    console.error('Error deleting car:', error);
                                    alert('Failed to delete car. Please try again.');
                                  }
                                }
                              }} 
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          No cars found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        )}
      </main>
    </div>
  );
}