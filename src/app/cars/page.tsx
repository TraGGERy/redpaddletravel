'use client';

import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCar, FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaGasPump, FaCog, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import ContactModal from '@/components/ContactModal';

export default function CarsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const [carDetails, setCarDetails] = useState({
    make: '',
    model: '',
    category: 'Luxury Sedan',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
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
      const response = await fetch('/api/bookings/car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          carDetails
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
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Car Rental"
            fill
            priority
            className="object-cover"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Premium Car Hiring
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-200">Experience luxury and performance with our exclusive fleet of premium vehicles.</p>
        </div>
      </section>
      
      {/* Search Form */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 -mt-20 relative z-30">
            <h2 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Car</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-sm font-medium mb-2">Pickup Location</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="City, Airport or Address" 
                    className="bg-transparent w-full outline-none" 
                    value={carDetails.pickupLocation}
                    onChange={(e) => setCarDetails({...carDetails, pickupLocation: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Car Type</label>
                <select 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent"
                  value={carDetails.category}
                  onChange={(e) => setCarDetails({...carDetails, category: e.target.value})}
                >
                  <option>Luxury Sedan</option>
                  <option>Sports Car</option>
                  <option>SUV</option>
                  <option>Convertible</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Date</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full outline-none" 
                    value={carDetails.pickupDate}
                    onChange={(e) => setCarDetails({...carDetails, pickupDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Time</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <input type="time" className="bg-transparent w-full outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Return Date</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full outline-none" 
                    value={carDetails.dropoffDate}
                    onChange={(e) => setCarDetails({...carDetails, dropoffDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Drop-off Location</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="City, Airport or Address" 
                    className="bg-transparent w-full outline-none" 
                    value={carDetails.dropoffLocation}
                    onChange={(e) => setCarDetails({...carDetails, dropoffLocation: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleSearch}
              disabled={isLoading}
              className="mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-8 rounded-full font-bold flex items-center justify-center gap-2 w-full md:w-auto md:mx-auto hover:from-green-700 hover:to-green-800 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <FaSearch /> Search Cars
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
      
      {/* Featured Cars */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Premium Fleet</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Car 1 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-56 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop"
                  alt="Mercedes-Benz S-Class"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                  Luxury
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Mercedes-Benz S-Class</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <FaUserAlt className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">5 Seats</span>
                    </div>
                    <div className="flex items-center">
                      <FaGasPump className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Hybrid</span>
                    </div>
                    <div className="flex items-center">
                      <FaCog className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Auto</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">$250</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per day</p>
                  </div>
                  <button className="py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">Hire Now</button>
                </div>
              </div>
            </div>
            
            {/* Car 2 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-56 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop"
                  alt="BMW 7 Series"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                  Luxury
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">BMW 7 Series</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <FaUserAlt className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">5 Seats</span>
                    </div>
                    <div className="flex items-center">
                      <FaGasPump className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Hybrid</span>
                    </div>
                    <div className="flex items-center">
                      <FaCog className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Auto</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">$230</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per day</p>
                  </div>
                  <button className="py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">Hire Now</button>
                </div>
              </div>
            </div>
            
            {/* Car 3 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-56 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=1932&auto=format&fit=crop"
                  alt="Porsche 911"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                  Sports
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Porsche 911</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <FaUserAlt className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">2 Seats</span>
                    </div>
                    <div className="flex items-center">
                      <FaGasPump className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Petrol</span>
                    </div>
                    <div className="flex items-center">
                      <FaCog className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Auto</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">$350</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per day</p>
                  </div>
                  <button className="py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">Hire Now</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="inline-block py-3 px-8 bg-white dark:bg-gray-700 text-green-600 font-medium rounded-full shadow hover:shadow-lg transition">View All Cars</a>
          </div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
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
    </div>
  );
}