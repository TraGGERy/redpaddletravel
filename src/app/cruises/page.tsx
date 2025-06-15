'use client';

import Image from "next/image";
import { useState } from "react";
import { FaShip, FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaAnchor } from 'react-icons/fa';
import AutoChangingBackground from "@/components/AutoChangingBackground";
import BookingModal, { BookingData } from "@/components/BookingModal";

const cruiseImages = [
  "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2064&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
];

export default function CruisesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCruise, setSelectedCruise] = useState({
    name: "",
    price: 0,
    description: ""
  });

  const handleBookNow = (name: string, price: number, description: string) => {
    setSelectedCruise({
      name,
      price,
      description
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitBooking = async (data: BookingData) => {
    try {
      // Prepare the data for the API
      const bookingData = {
        cruiseName: selectedCruise.name,
        numberOfPeople: data.adults + data.kids,
        departureDate: data.departureDate,
        returnDate: data.returnDate,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        price: selectedCruise.price,
        description: selectedCruise.description
      };

      // Send the data to the API
      const response = await fetch('/api/bookings/cruise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit booking');
      }

      const result = await response.json();
      console.log("Booking submitted successfully:", result);
      
      // Close the modal after submission
      setIsModalOpen(false);
      
      // You could also show a success message or redirect
      alert('Booking submitted successfully!');
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div className="absolute inset-0 overflow-hidden">
          <AutoChangingBackground 
            images={cruiseImages} 
            interval={3000}
            alt="Cruise destination backgrounds"
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
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-200">Experience luxury cruises to exotic destinations worldwide with Redpaddle travel and tours.</p>
        </div>
      </section>
      
      {/* Search Form */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 -mt-20 relative z-30">
            <h2 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Cruise</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-sm font-medium mb-2">Destination</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <input type="text" placeholder="Caribbean, Mediterranean, Alaska..." className="bg-transparent w-full outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Cruise Line</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Any Cruise Line</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Royal Caribbean</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Norwegian Cruise Line</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Carnival Cruise Line</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Celebrity Cruises</option>
                </select>
              </div>
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
                <label className="block text-sm font-medium mb-2">Duration</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Any Duration</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">2-5 Nights</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">6-9 Nights</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">10-14 Nights</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">15+ Nights</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Passengers</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaUserAlt className="text-gray-400 mr-2" />
                  <select className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white w-full outline-none">
                    <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">1 Passenger</option>
                    <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">2 Passengers</option>
                    <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">3 Passengers</option>
                    <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">4+ Passengers</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-full font-bold flex items-center justify-center gap-2 w-full md:w-auto md:mx-auto hover:from-blue-700 hover:to-blue-800 transition shadow-lg">
              <FaSearch /> Search Cruises
            </button>
          </div>
        </div>
      </section>
      
      {/* Featured Cruises */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Featured Cruise Deals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Durban Cruise */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2064&auto=format&fit=crop" // Placeholder Image
                  alt="Cruise from Durban"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Cruise from Durban</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">South Africa Departures</p>
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">Ship Name (Optional)</p> */}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">US$ 370.00</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person sharing</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Starting from 3 Nights</span>
                  <span>Departs from Durban</span>
                </div>
                <button 
                  onClick={() => handleBookNow("Cruise from Durban", 370, "South Africa Departures - 3 Nights")} 
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Cape Town Cruise */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?q=80&w=2070&auto=format&fit=crop" // Placeholder Image
                  alt="Cruise from Cape Town"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Cruise from Cape Town</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">South Africa Departures</p>
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">Ship Name (Optional)</p> */}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">US$ 940.00</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person sharing</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Starting from 5 Nights</span>
                  <span>Departs from Cape Town</span>
                </div>
                <button 
                  onClick={() => handleBookNow("Cruise from Cape Town", 940, "South Africa Departures - 5 Nights")} 
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Middle East Explorer */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1974&auto=format&fit=crop" // Placeholder Image
                  alt="Middle East Cruise"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Middle East Explorer</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">Dubai, Doha, Bahrain, Abu Dhabi</p>
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">Ship Name (Optional)</p> */}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">US$ 1,300.00</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person sharing</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Starting from 7 Nights</span>
                  <span>Multiple Departures</span>
                </div>
                <button 
                  onClick={() => handleBookNow("Middle East Explorer", 1300, "Dubai, Doha, Bahrain, Abu Dhabi - 7 Nights")} 
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Greece Cruise */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop" // Placeholder Image
                  alt="Greece Cruise"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Grecian Isles Cruise</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">Mediterranean Gems</p>
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">Ship Name (Optional)</p> */}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">US$ 850.00</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person sharing</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Starting from 7 Nights</span>
                  <span>Departs from Greece</span>
                </div>
                <button 
                  onClick={() => handleBookNow("Grecian Isles Cruise", 850, "Mediterranean Gems - 7 Nights")} 
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Italy Cruise */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?q=80&w=2070&auto=format&fit=crop" // Placeholder Image
                  alt="Italy Cruise"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Italian Riviera Voyage</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">Mediterranean Classics</p>
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">Ship Name (Optional)</p> */}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">US$ 455.00</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person sharing</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Starting from 3 Nights</span>
                  <span>Departs from Italy</span>
                </div>
                <button 
                  onClick={() => handleBookNow("Italian Riviera Voyage", 455, "Mediterranean Classics - 3 Nights")} 
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Spain Cruise */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop" // Placeholder Image
                  alt="Spain Cruise"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Spanish Coastal Journey</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">Iberian Adventures</p>
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">Ship Name (Optional)</p> */}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">US$ 800.00</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person sharing</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Starting from 7 Nights</span>
                  <span>Departs from Spain</span>
                </div>
                <button 
                  onClick={() => handleBookNow("Spanish Coastal Journey", 800, "Iberian Adventures - 7 Nights")} 
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Cruise Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Our Cruise Booking Service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShip className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Cruise Lines</h3>
              <p className="text-gray-600 dark:text-gray-300">Access to the world&apos;s top cruise lines with exclusive deals and premium cabin options.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-300">We guarantee the best prices for premium cruises with our price match policy.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAnchor className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Shore Excursions</h3>
              <p className="text-gray-600 dark:text-gray-300">Access to exclusive shore excursions and activities at each port of call.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Our dedicated support team is available around the clock to assist with any inquiries.</p>
            </div>
          </div>
        </div>
      </section>
      {/* BookingModal component */}
      {isModalOpen && selectedCruise && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitBooking}
          bookingType="Cruise"
          itemName={selectedCruise.name}
          itemPrice={selectedCruise.price}
          itemDescription={selectedCruise.description}
        />
      )}
    </div>
  );
}
