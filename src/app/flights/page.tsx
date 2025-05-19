'use client';

import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlane, FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaExchangeAlt, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import AirportSelector from '@/components/AirportSelector';
import PassengerSelector from '@/components/PassengerSelector';
import ContactModal from '@/components/ContactModal';

export default function FlightsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const [flightDetails, setFlightDetails] = useState({
    tripType: 'Round Trip',
    cabinClass: 'Economy',
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: { adults: 1, children: 0, infants: 0 }
  });

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 2000);
  };

  const handleContactSubmit = async (data: { email: string; phone: string }) => {
    try {
      const response = await fetch('/api/bookings/flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          flightDetails
        }),
      });

      if (!response.ok) throw new Error('Failed to create booking');

      setShowModal(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit booking. Please try again.');
    }
  };
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=2070&auto=format&fit=crop"
            alt="Flight Booking"
            fill
            priority
            className="object-cover"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Premium Flight Booking
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-200">Experience first-class and business-class flights with premium airlines worldwide.</p>
        </div>
      </section>
      
      {/* Search Form */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 -mt-20 relative z-30">
            <h2 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Flight</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Trip Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tripType" defaultChecked className="w-4 h-4 text-red-600" />
                    <span>Round Trip</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tripType" className="w-4 h-4 text-red-600" />
                    <span>One Way</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tripType" className="w-4 h-4 text-red-600" />
                    <span>Multi-City</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Cabin Class</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none">
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative">
              <AirportSelector
                label="From"
                placeholder="Enter city or airport"
                onSelect={(airport) => console.log('Selected departure:', airport)}
              />
              
              <AirportSelector
                label="To"
                placeholder="Enter city or airport"
                onSelect={(airport) => console.log('Selected arrival:', airport)}
              />
              <button className="absolute left-1/2 top-1/2 -translate-x-1/2 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-600 md:block hidden">
                <FaExchangeAlt className="text-gray-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Departure Date</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <input type="date" className="bg-transparent w-full outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Return Date</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <input type="date" className="bg-transparent w-full outline-none" />
                </div>
              </div>
              
              <PassengerSelector
                onSelect={(passengers) => console.log('Selected passengers:', passengers)}
              />
            </div>
            
            <button 
              onClick={handleSearch}
              disabled={isLoading}
              className="mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-full font-bold flex items-center justify-center gap-2 w-full md:w-auto md:mx-auto hover:from-red-700 hover:to-red-800 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <FaSearch /> Search Flights
                </>
              )}
            </button>

            <ContactModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSubmit={handleContactSubmit}
            />

            {/* Success Message */}
            {showSuccess && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-2xl" />
                  <p className="text-gray-900 dark:text-white font-medium">Our customer team will contact you shortly!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Flights */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Featured Flight Deals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Flight Deal 1 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1507812984078-917a274065be?q=80&w=1974&auto=format&fit=crop"
                  alt="New York"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">New York to London</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">Business Class</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">British Airways</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">$2,450</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Round Trip</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Dec 10 - Dec 20</span>
                  <span>Direct Flight</span>
                </div>
                <button className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">Book Now</button>
              </div>
            </div>
            
            {/* Flight Deal 2 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1543832923-44667a44c804?q=80&w=2044&auto=format&fit=crop"
                  alt="Paris"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Los Angeles to Paris</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">First Class</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Air France</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">$3,200</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Round Trip</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Jan 15 - Jan 25</span>
                  <span>Direct Flight</span>
                </div>
                <button className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">Book Now</button>
              </div>
            </div>
            
            {/* Flight Deal 3 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=1933&auto=format&fit=crop"
                  alt="Tokyo"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">San Francisco to Tokyo</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">Business Class</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Japan Airlines</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">$2,850</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Round Trip</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Feb 5 - Feb 15</span>
                  <span>Direct Flight</span>
                </div>
                <button className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">Book Now</button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="inline-block py-3 px-8 bg-white dark:bg-gray-700 text-red-600 font-medium rounded-full shadow hover:shadow-lg transition">View All Flight Deals</a>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Our Flight Booking Service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPlane className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Airlines</h3>
              <p className="text-gray-600 dark:text-gray-300">Access to the world's top airlines with exclusive deals and premium seating options.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-300">We guarantee the best prices for premium flights with our price match policy.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Booking</h3>
              <p className="text-gray-600 dark:text-gray-300">Your booking and payment information is always secure with our encrypted platform.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Our dedicated support team is available around the clock to assist with any inquiries.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}