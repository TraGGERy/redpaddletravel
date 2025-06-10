'use client';

import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// FaHotel removed as it's unused
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaStar, FaSpinner, FaCheckCircle } from 'react-icons/fa'; 
import ContactModal from '@/components/ContactModal';

export default function HotelsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const [hotelDetails, setHotelDetails] = useState({
    name: '',
    location: '',
    roomType: 'Standard Room',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    price: 0
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
      const response = await fetch('/api/bookings/hotel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          hotelDetails
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
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Hotel"
            fill
            priority
            className="object-cover"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <div className="relative h-[120px] w-full max-w-[718px] mb-6">
            <Image 
              src="/ITINERARY IEP LARGE LOGO 718px X 160px.png"
              alt="Redpaddle Travel and Tours Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-200">
          Experience low cost to premium accommodations and exclusive resorts world-wide with Redpaddle Travel and Tours.</p>
        </div>
      </section>
      
      {/* Search Form */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 -mt-20 relative z-30">
            <h2 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Stay</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-sm font-medium mb-2">Destination</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="City, Region or Hotel Name" 
                    className="bg-transparent w-full outline-none" 
                    value={hotelDetails.location}
                    onChange={(e) => setHotelDetails({...hotelDetails, location: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Room Type</label>
                <select 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  value={hotelDetails.roomType}
                  onChange={(e) => setHotelDetails({...hotelDetails, roomType: e.target.value})}
                >
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Standard Room</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Deluxe Room</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Suite</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Presidential Suite</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Check-in Date</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full outline-none" 
                    value={hotelDetails.checkInDate}
                    onChange={(e) => setHotelDetails({...hotelDetails, checkInDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Check-out Date</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full outline-none" 
                    value={hotelDetails.checkOutDate}
                    onChange={(e) => setHotelDetails({...hotelDetails, checkOutDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Guests</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaUserAlt className="text-gray-400 mr-2" />
                  <select 
                    className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white w-full outline-none"
                    value={hotelDetails.guests}
                    onChange={(e) => setHotelDetails({...hotelDetails, guests: parseInt(e.target.value)})}
                  >
                    <option value="1" className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">1 Guest</option>
                    <option value="2" className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">2 Guests</option>
                    <option value="3" className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">3 Guests</option>
                    <option value="4" className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">4+ Guests</option>
                  </select>
                </div>
              </div>
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
                  <FaSearch /> Search Hotels
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
      
      {/* Featured Hotels */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Featured Luxury Hotels</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hotel 1 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop"
                  alt="Luxury Hotel"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                  5-Star
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">The Grand Palace Hotel</h3>
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">New York, USA</span>
                </div>
                <div className="flex text-red-400 mb-4">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">(245 reviews)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-red-600">$450</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per night</p>
                  </div>
                  <button 
                    className="py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                    onClick={() => {
                      setHotelDetails({
                        ...hotelDetails,
                        name: 'The Grand Palace Hotel',
                        location: 'New York, USA',
                        price: 450
                      });
                      setShowModal(true);
                    }}
                  >Book Now</button>
                </div>
              </div>
            </div>
            
            {/* Hotel 2 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1780&auto=format&fit=crop"
                  alt="Luxury Hotel"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                  5-Star
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Azure Beach Resort & Spa</h3>
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Bali, Indonesia</span>
                </div>
                <div className="flex text-red-400 mb-4">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">(189 reviews)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-red-600">$380</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per night</p>
                  </div>
                  <button 
                    className="py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                    onClick={() => {
                      setHotelDetails({
                        ...hotelDetails,
                        name: 'Majestic Mountain Lodge',
                        location: 'Swiss Alps, Switzerland',
                        price: 520
                      });
                      setShowModal(true);
                    }}
                  >Book Now</button>
                </div>
              </div>
            </div>
            
            {/* Hotel 3 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
                  alt="Luxury Hotel"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                  5-Star
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Majestic Mountain Lodge</h3>
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Swiss Alps, Switzerland</span>
                </div>
                <div className="flex text-red-400 mb-4">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">(156 reviews)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-red-600">$520</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per night</p>
                  </div>
                  <button 
                    className="py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                    onClick={() => {
                      setHotelDetails({
                        ...hotelDetails,
                        name: 'Majestic Mountain Lodge',
                        location: 'Swiss Alps, Switzerland',
                        price: 520
                      });
                      setShowModal(true);
                    }}
                  >Book Now</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="inline-block py-3 px-8 bg-white dark:bg-gray-700 text-red-600 font-medium rounded-full shadow hover:shadow-lg transition">View All Hotels</a>
          </div>
        </div>
      </section>
      
      {/* Hotel Amenities */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Premium Amenities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">High-Speed WiFi</h3>
              <p className="text-gray-600 dark:text-gray-300">Stay connected with complimentary high-speed internet access throughout your stay.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Spa & Wellness</h3>
              <p className="text-gray-600 dark:text-gray-300">Rejuvenate with our premium spa services, including massages, facials, and wellness treatments.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Fine Dining</h3>
              <p className="text-gray-600 dark:text-gray-300">Experience exquisite cuisine at our award-winning restaurants with world-class chefs.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Concierge Service</h3>
              <p className="text-gray-600 dark:text-gray-300">Our dedicated concierge team is available 24/7 to assist with all your needs and requests.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}