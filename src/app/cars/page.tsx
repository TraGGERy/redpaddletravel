'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCar, FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaGasPump, FaCog, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import AutoChangingBackground from '@/components/AutoChangingBackground';
import BookingModal, { BookingData } from '@/components/BookingModal';
import { CarHire } from '@/db/schema';
import CarsClient from './CarsClient';

export default function CarsPage() {
  const [cars, setCars] = useState<CarHire[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarHire | null>(null);

  // Fetch cars from the database
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/cars`, {
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        
        const carsData = await response.json();
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  const handleBookNow = (car: CarHire) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  const handleBookingSubmit = async (bookingData: BookingData) => {
    if (!selectedCar) return;

    try {
      const response = await fetch('/api/bookings/car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: bookingData.email,
          phone: bookingData.phone,
          name: bookingData.fullName,
          carDetails: {
            make: selectedCar.make,
            model: selectedCar.model,
            category: selectedCar.category,
            price: parseFloat(selectedCar.pricePerDay.toString()),
            pickupLocation: selectedCar.location,
            dropoffLocation: selectedCar.location,
            pickupDate: bookingData.departureDate,
            dropoffDate: bookingData.returnDate || bookingData.departureDate,
          }
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Booking successfully submitted for ${selectedCar.make} ${selectedCar.model}!\nBooking ID: ${result.booking?.id || 'N/A'}\nWe will contact you shortly to confirm your booking.`);
        handleCloseModal();
      } else {
        const error = await response.json();
        alert(`Failed to submit booking: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
    }
  };

  // Array of background images for auto-changing
  const carImages = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"
  ];
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <AutoChangingBackground 
          images={carImages} 
          alt="Luxury Car Rental"
          interval={3000} // Change image every 6 seconds
        />
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Car Hiring
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-200">Experience the low cost to luxury car hire with us anytime.</p>
        </div>
      </section>
      
      {/* Search Form */}
      <CarsClient />
      
      {/* Featured Cars */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Premium Fleet</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <FaSpinner className="animate-spin text-4xl text-green-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">Loading our premium fleet...</p>
            </div>
          ) : cars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cars.slice(0, 6).map((car) => (
                  <div key={car.id} className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
                    <div className="h-56 overflow-hidden relative">
                      <Image 
                        src={car.imageUrl || "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop"}
                        alt={`${car.make} ${car.model}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                        {car.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{car.make} {car.model}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <FaUserAlt className="text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">{car.seats} Seats</span>
                          </div>
                          <div className="flex items-center">
                            <FaGasPump className="text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">{car.fuelType}</span>
                          </div>
                          <div className="flex items-center">
                            <FaCog className="text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">{car.transmission}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">${car.pricePerDay}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">per day</p>
                        </div>
                        <button 
                          onClick={() => handleBookNow(car)}
                          className="py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <a href="#" className="inline-block py-3 px-8 bg-white dark:bg-gray-700 text-green-600 font-medium rounded-full shadow hover:shadow-lg transition">View All Cars</a>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No cars available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Our Car Hiring Service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCar className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Vehicles</h3>
              <p className="text-gray-600 dark:text-gray-300">Choose from our fleet of luxury and exotic cars from top manufacturers worldwide.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Fully Insured</h3>
              <p className="text-gray-600 dark:text-gray-300">All our vehicles come with comprehensive insurance coverage for your peace of mind.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7A2 2 0 00-2-2H5A2 2 0 00-2 2v6A2 2 0 002 2h2m2 4h10A2 2 0 002-2v-6A2 2 0 00-2-2H9A2 2 0 00-2 2v6A2 2 0 002 2zm7-5A2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Flexible Pricing</h3>
              <p className="text-gray-600 dark:text-gray-300">Choose from daily, weekly, or monthly rental options with transparent pricing.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Doorstep Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">We deliver and collect your vehicle at your preferred location for maximum convenience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedCar && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleBookingSubmit}
          bookingType="Package"
          itemName={`${selectedCar.make} ${selectedCar.model}`}
          itemPrice={parseFloat(selectedCar.pricePerDay.toString())}
          itemDescription={`${selectedCar.category} • ${selectedCar.seats} Seats • ${selectedCar.fuelType} • ${selectedCar.transmission}`}
        />
      )}
    </div>
  );
}