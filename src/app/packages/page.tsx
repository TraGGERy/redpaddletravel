
'use client'; // <-- Add this line at the very top

import Image from "next/image";
import { FaSuitcase, FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaGlobe } from 'react-icons/fa';
import AutoChangingBackground from '@/components/AutoChangingBackground';
import BookingModal, { BookingData } from '@/components/BookingModal'; // <-- Import BookingData
import { useState } from 'react';

export default function PackagesPage() {
  const packageImages = [
    "https://cdn.britannica.com/91/5391-050-78522514/Victoria-Falls-bridge-Zambezi-River-Zimbabwe-Zambia.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/f5/03/81/kariba-dam-wall-dec-2016.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/71/bd/af/infinity-pool.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/4d/27/8f/the-residence-zanzibar.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/78/84/94/dubai-aquarium-underwater.jpg"
  ];

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  interface PackageDetails {
    name: string;
    price: number;
    description: string;
    details: string;
    duration: number;
    image: string;
  }

  const [selectedPackage, setSelectedPackage] = useState<PackageDetails | null>(null);

  const handleBookNowClick = (packageDetails: PackageDetails) => {
    setSelectedPackage(packageDetails);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedPackage(null);
  };

  const handleBookingSubmit = async (data: BookingData) => { // data comes from BookingModal
    if (!selectedPackage) return;

    // Ensure these mappings are correct and data from the modal is valid
    const bookingPayload = {
      packageName: selectedPackage.name,
      numberOfPeople: (data.adults || 0) + (data.kids || 0), // Ensure adults/kids are numbers, default to 0 if undefined
      startDate: data.departureDate, // Make sure data.departureDate is a non-empty string
      endDate: data.returnDate,     // Make sure data.returnDate is a non-empty string
      name: data.fullName,          // Make sure data.fullName is a non-empty string
      email: data.email,
      phone: data.phone,
      
      packagePrice: selectedPackage.price, 
      packageDescription: selectedPackage.description,
      packageDetails: selectedPackage.details,
      packageDuration: selectedPackage.duration,
      bookingType: 'package',
      status: 'pending',
    };

    // CRITICAL DEBUG STEP: Log the payload right before sending
    console.log('Attempting to send booking data:', JSON.stringify(bookingPayload, null, 2));

    try {
      const response = await fetch('/api/bookings/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload), // Send the stringified payload
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Booking successful:', result);
        // Assuming the API returns bookingId in result.booking.id or similar based on your .returning()
        const bookingId = result.booking?.id || result.bookingId || 'N/A'; 
        alert('Booking successful! Your booking ID is: ' + bookingId);
      } else {
        const errorResult = await response.json();
        // Correctly access the error message from the API's response structure
        const message = errorResult.details || errorResult.error || 'Unknown booking error';
        console.error('Booking failed:', message);
        alert('Booking failed: ' + message);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('An error occurred while submitting your booking. Please try again.');
    }

    handleCloseBookingModal();
  };

  const packages = [
    {
      name: "VICTORIA FALLS",
      price: 350,
      image: "https://cdn.britannica.com/91/5391-050-78522514/Victoria-Falls-bridge-Zambezi-River-Zimbabwe-Zambia.jpg",
      description: "Adventure Package",
      details: "Activities + Accommodation",
      duration: "3-5 Days"
    }, {
      name: "KARIBA",
      price: 250,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/f5/03/81/kariba-dam-wall-dec-2016.jpg",
      description: "Relaxation Getaway",
      details: "Houseboat + Game Viewing",
      duration: "2-4 Days"
    }, {
      name: "MANA POOLS",
      price: 500,
      image: "https://wildtimessafaris.com/wp-content/uploads/2020/03/mana.jpg",
      description: "Safari Adventure",
      details: "Guided Safari + Lodge Stay",
      duration: "4-6 Days"
    }, {
      name: "GONAREZHOU",
      price: 400,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/61/65/29/one-of-the-park-s-many.jpg",
      description: "Wildlife Expedition",
      details: "Camping + Bush Walks",
      duration: "3-5 Days"
    }, {
      name: "NYANGA",
      price: 150,
      image: "https://zimbabwetourism.net/wp-content/uploads/2022/01/Nyanga-1.jpg",
      description: "Mountain Retreat",
      details: "Hiking + Scenic Views",
      duration: "2-3 Days"
    }, {
      name: "CAPE TOWN",
      price: 600,
      image: "https://cdn.audleytravel.com/3959/2826/79/1029099-cape-town.jpg",
      description: "City & Nature Blend",
      details: "Table Mountain + Winelands",
      duration: "5-7 Days"
    }, {
      name: "DURBAN",
      price: 450,
      image: "https://content.r9cdn.net/rimg/dimg/50/22/266b6677-city-33744-167795c3051.jpg",
      description: "Coastal Escape",
      details: "Beach + Cultural Tours",
      duration: "4-6 Days"
    }, {
      name: "ZANZIBAR",
      price: 500,
      image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg",
      description: "Island Paradise",
      details: "Spice Tours + Beaches",
      duration: "5-7 Days"
    }, {
      name: "DUBAI",
      price: 800,
      image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/81/9c/fe.jpg",
      description: "Luxury City Break",
      details: "Shopping + Desert Safari",
      duration: "4-6 Days"
    }, {
      name: "DOHA",
      price: 1000,
      image: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/481000/481987-Doha-And-Vicinity.jpg",
      description: "Cultural Hub",
      details: "Museums + Souqs",
      duration: "3-5 Days"
    }, {
      name: "MAURITIUS",
      price: 950,
      image: "https://images.unsplash.com/photo-1524222717473-730000096953?q=80&w=1974&auto=format&fit=crop",
      description: "Tropical Getaway",
      details: "Beaches + Water Sports",
      duration: "6-8 Days"
    }, {
      name: "SEYCHELLES",
      price: 1300,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fb/42/seychelles.jpg",
      description: "Exotic Islands",
      details: "Luxury Resorts + Nature",
      duration: "7-10 Days"
    }
  ];

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <AutoChangingBackground 
          images={packageImages} 
          alt="Holiday Packages"
          interval={3000} // Change image every 3 seconds
        />
        
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
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-200">Experience all-inclusive luxury holiday packages to exotic destinations worldwide.</p>
        </div>
      </section>
      
      {/* Search Form */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 -mt-20 relative z-30">
            <h2 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Holiday Package</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-sm font-medium mb-2">Destination</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <input type="text" placeholder="Bali, Maldives, Switzerland..." className="bg-transparent w-full outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Package Type</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">All Inclusive</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Flight + Hotel</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Hotel + Activities</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Cruise + Stay</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">Custom Package</option>
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
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">3-5 Days</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">6-8 Days</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">9-12 Days</option>
                  <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">13+ Days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Travelers</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <FaUserAlt className="text-gray-400 mr-2" />
                  <select className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white w-full outline-none">
                    <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">1 Traveler</option>
                    <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">2 Travelers</option>
                    <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">3 Travelers</option>
                    <option className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white">4+ Travelers</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button className="mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-full font-bold flex items-center justify-center gap-2 w-full md:w-auto md:mx-auto hover:from-red-700 hover:to-red-800 transition shadow-lg">
              <FaSearch /> Search Packages
            </button>
          </div>
        </div>
      </section>
      
      {/* Featured Packages */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Featured Holiday Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="relative h-56 w-full">
                  <Image src={pkg.image} alt={pkg.name} layout="fill" objectFit="cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-red-500 font-semibold text-lg mb-2">${pkg.price} per person</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><FaSuitcase className="inline mr-2" />{pkg.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1"><FaGlobe className="inline mr-2" />{pkg.details}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4"><FaCalendarAlt className="inline mr-2" />{pkg.duration}</p>
                  <button 
                    onClick={() => handleBookNowClick({
                      ...pkg,
                      duration: parseInt(pkg.duration.split('-')[0]) // Convert duration string to number using first value
                    })}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition shadow-md"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="inline-block py-3 px-8 bg-white dark:bg-gray-700 text-red-600 font-medium rounded-full shadow hover:shadow-lg transition">View All Holiday Packages</a>
          </div>
        </div> {/* This div closes the container for Featured Packages */}
      </section>

      {/* Package Features - This section was causing issues if the above div was misplaced */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Our Holiday Packages</h2>
          {/* ... rest of the package features section ... */}
        </div>
      </section>

      {isBookingModalOpen && selectedPackage && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          onSubmit={handleBookingSubmit}
          bookingType="Package"
          itemName={selectedPackage.name}
          itemPrice={selectedPackage.price}
          itemDescription={selectedPackage.description}
        />
      )}
    </div>
  );
}