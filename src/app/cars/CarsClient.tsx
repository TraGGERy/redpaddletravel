'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import ContactModal from '@/components/ContactModal';

export default function CarsClient() {
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
  );
}