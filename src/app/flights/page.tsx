'use client';

import Image from "next/image";
import { useState, useCallback } from 'react'; // Added useCallback
import { useRouter } from 'next/navigation';
// FaMapMarkerAlt removed from imports as it's unused
import { FaPlane, FaSearch, FaCalendarAlt, FaExchangeAlt, FaSpinner, FaCheckCircle } from 'react-icons/fa'; 
import AirportSelector from '@/components/AirportSelector';
import PassengerSelector from '@/components/PassengerSelector';
import ContactModal from '@/components/ContactModal';
import BookingModal, { BookingData } from "@/components/BookingModal";

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
  
  // State for flight deals booking modal
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<{
    from: string;
    to: string;
    price: number;
    image: string;
  } | null>(null);
  const [dealBookingSuccess, setDealBookingSuccess] = useState(false);

  const handlePassengerSelect = useCallback((passengers: { adults: number; children: number; infants: number }) => {
    setFlightDetails(prev => ({ ...prev, passengers }));
  }, []); // No dependencies needed as setFlightDetails is stable

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
  
  // Handler for opening the deal booking modal
  const handleBookDeal = (deal: { from: string; to: string; price: number; image: string }) => {
    setSelectedDeal(deal);
    setIsDealModalOpen(true);
  };
  
  // Handler for closing the deal booking modal
  const handleCloseDealModal = () => {
    setIsDealModalOpen(false);
    setSelectedDeal(null);
  };
  
  // Handler for submitting the deal booking
  const handleDealBookingSubmit = async (data: BookingData) => {
    try {
      if (!selectedDeal) return;
      
      // Prepare the data for the API
      const bookingData = {
        from: selectedDeal.from,
        to: selectedDeal.to,
        price: selectedDeal.price,
        departureDate: data.departureDate,
        returnDate: data.returnDate,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        adults: data.adults,
        kids: data.kids,
        infants: data.infants,
        cabinClass: 'Economy' // Default to Economy class for deals
      };

      // Send the data to the API
      const response = await fetch('/api/bookings/flight/deals', {
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

      // Close the modal and show success message
      setIsDealModalOpen(false);
      setDealBookingSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setDealBookingSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting deal booking:', error);
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
            Flight Booking
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-200">Experience First Class , Business Class and Economy Class to all the destinations world wide.</p>
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
                onSelect={(airport) => setFlightDetails(prev => ({ ...prev, from: airport ? airport.name : '' }))}
              />
              
              <AirportSelector
                label="To"
                placeholder="Enter city or airport"
                onSelect={(airport) => setFlightDetails(prev => ({ ...prev, to: airport ? airport.name : '' }))}
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
                  <input 
                    type="date" 
                    className="bg-transparent w-full outline-none" 
                    value={flightDetails.departureDate}
                    onChange={(e) => setFlightDetails(prev => ({ ...prev, departureDate: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Return Date</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full outline-none" 
                    value={flightDetails.returnDate}
                    onChange={(e) => setFlightDetails(prev => ({ ...prev, returnDate: e.target.value }))}
                    disabled={flightDetails.tripType === 'One Way'} // Optionally disable if one way
                  />
                </div>
              </div>
              
              <PassengerSelector
                onSelect={handlePassengerSelect} // Use the memoized callback
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
                  <p className="text-lg font-medium">Booking request sent successfully!</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              [
                // Harare Departures
                { from: "Harare", to: "Johannesburg", price: 295.00, image: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/481000/481987-Doha-And-Vicinity.jpg" },
                { from: "Harare", to: "Lusaka", price: 250.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" },
                { from: "Harare", to: "Cape Town", price: 450.00, image: "https://cdn.audleytravel.com/3959/2826/79/1029099-cape-town.jpg" },
                { from: "Harare", to: "Zanzibar", price: 395.00, image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?q=80&w=2070&auto=format&fit=crop" },
                { from: "Harare", to: "Victoria Falls", price: 290.00, image: "https://cdn.britannica.com/91/5391-050-78522514/Victoria-Falls-bridge-Zambezi-River-Zimbabwe-Zambia.jpg" },
                { from: "Harare", to: "London", price: 980.00, image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=2070&auto=format&fit=crop" },
                { from: "Harare", to: "New York", price: 1150.00, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop" },
                { from: "Harare", to: "Mauritius", price: 820.00, image: "https://images.unsplash.com/photo-1524222717473-730000096953?q=80&w=1974&auto=format&fit=cro" },
                { from: "Harare", to: "Washington DC", price: 1470.00, image: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?q=80&w=1974&auto=format&fit=crop" },
                { from: "Harare", to: "Mumbai", price: 490.00, image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070&auto=format&fit=crop" },
                { from: "Harare", to: "New Delhi", price: 810.00, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop" },
                { from: "Harare", to: "Dar es Salaam", price: 350.00, image: "https://images.unsplash.com/photo-1572431447238-425af66a273b?q=80&w=2070&auto=format&fit=crop" },
                { from: "Harare", to: "Dubai", price: 630.00, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop" },
                { from: "Harare", to: "Bulawayo", price: 320.00, image: "https://destinationtoplan.com/contents/uploads/2021/04/Bulawayo-.jpg" }, // Placeholder for Bulawayo
                { from: "Harare", to: "Warsaw", price: 1180.00, image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=1974&auto=format&fit=crop" },
                { from: "Harare", to: "Durban", price: 420.00, image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2070&auto=format&fit=crop" },
                { from: "Harare", to: "Windhoek", price: 480.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" },
                { from: "Harare", to: "Lilongwe", price: 495.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" }, // Updated image for Lilongwe
                { from: "Harare", to: "Lagos", price: 850.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" },
                { from: "Harare", to: "Doha", price: 820.00, image: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/481000/481987-Doha-And-Vicinity.jpg" },
                { from: "Harare", to: "Paris", price: 1210.00, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop" },
                { from: "Harare", to: "Kuala Lumpur", price: 1500.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" },
                // Johannesburg Departures
                { from: "Johannesburg", to: "Cape Town", price: 180.00, image: "https://cdn.audleytravel.com/3959/2826/79/1029099-cape-town.jpg" },
                { from: "Johannesburg", to: "Victoria Falls", price: 295.00, image: "https://cdn.britannica.com/91/5391-050-78522514/Victoria-Falls-bridge-Zambezi-River-Zimbabwe-Zambia.jpg" },
                { from: "Johannesburg", to: "Durban", price: 150.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" },
                { from: "Johannesburg", to: "Paris", price: 750.00, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop" },
                { from: "Johannesburg", to: "London", price: 670.00, image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=2070&auto=format&fit=crop" },
                { from: "Johannesburg", to: "Washington DC", price: 900.00, image: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?q=80&w=1974&auto=format&fit=crop" },
                { from: "Johannesburg", to: "Lagos", price: 600.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" },
                { from: "Johannesburg", to: "Kuala Lumpur", price: 800.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" },
                { from: "Johannesburg", to: "Mauritius", price: 630.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" },
                { from: "Johannesburg", to: "New Delhi", price: 695.00, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop" },
                { from: "Johannesburg", to: "New York", price: 900.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" },
                { from: "Johannesburg", to: "Dubai", price: 595.00, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop" },
                // Victoria Falls Departures
                { from: "Victoria Falls", to: "Dubai", price: 800.00, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop" },
                { from: "Victoria Falls", to: "London", price: 1225.00, image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=2070&auto=format&fit=crop" },
                { from: "Victoria Falls", to: "New York", price: 1335.00, image: "https://cdn.britannica.com/91/5391-050-78522514/Victoria-Falls-bridge-Zambezi-River-Zimbabwe-Zambia.jpg" },
                { from: "Victoria Falls", to: "New Delhi", price: 1125.00, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop" },
                { from: "Victoria Falls", to: "Paris", price: 1290.00, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop" },
                { from: "Victoria Falls", to: "Johannesburg", price: 280.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" },
                { from: "Victoria Falls", to: "Cape Town", price: 435.00, image: "https://cdn.audleytravel.com/3959/2826/79/1029099-cape-town.jpg" },
                { from: "Victoria Falls", to: "Windhoek", price: 430.00, image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg" },
              ].map((deal, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
                  <div className="h-48 overflow-hidden relative">
                    <Image 
                      src={deal.image} // Placeholder Image
                      alt={`Flight from ${deal.from} to ${deal.to}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h3 className="text-white text-xl font-bold">{deal.from} to {deal.to}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-gray-500 dark:text-gray-300">Return Ticket</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Per Person</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">US$ {deal.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleBookDeal(deal)}
                      className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
                    >
                      <FaPlane /> Book Now
                    </button>
                  </div>
                </div>
              ))}
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
              <p className="text-gray-600 dark:text-gray-300">Access to the world&apos;s top airlines with exclusive deals and premium seating options.</p>
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
      
      {/* Booking Modal for Flight Deals */}
      {isDealModalOpen && selectedDeal && (
        <BookingModal
          isOpen={isDealModalOpen}
          onClose={handleCloseDealModal}
          onSubmit={handleDealBookingSubmit}
          bookingType="Flight"
          itemName={`${selectedDeal.from} to ${selectedDeal.to}`}
          itemPrice={selectedDeal.price}
          itemDescription={`Flight from ${selectedDeal.from} to ${selectedDeal.to}`}
        />
      )}
      
      {/* Deal Booking Success Message */}
      {dealBookingSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <p className="text-lg font-medium">Flight deal booking request sent successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}
