import dynamic from 'next/dynamic';
import Image from "next/image";
import { Suspense } from 'react';
import { FaPlane, FaCar, FaHotel, FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUserAlt } from 'react-icons/fa';

// Import AutoChangingBackground component
const AutoChangingBackground = dynamic(() => import('@/components/AutoChangingBackground'), {
  loading: () => <div className="absolute inset-0 bg-gray-900"></div>,
});


// Lazy load components
const TestimonialSection = dynamic(() => import('@/components/TestimonialSection'), {
  loading: () => <div className="py-20 bg-gray-100 dark:bg-gray-800"><div className="container mx-auto px-4 text-center">Loading testimonials...</div></div>,
});

const ServicesSection = dynamic(() => import('@/components/ServicesSection'), {
  loading: () => <div className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black"><div className="container mx-auto px-4 text-center">Loading services...</div></div>,
});

// const Footer = dynamic(() => import('@/components/Footer'), { // Removed unused Footer import
//   ssr: true
// });


export default function Home() {
  // Use client-side rendering for this component
  "use client";

  // Array of background images for auto-changing
  const backgroundImages = [
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1780&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
  ];

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        {/* Auto-changing background component */}
        <AutoChangingBackground 
          images={backgroundImages}
          interval={7000} // Change image every 7 seconds
          alt="Luxury Travel"
        />
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <div className="relative h-[160px] w-full max-w-[718px] mb-6">
            <Image 
              src="/ITINERARY IEP LARGE LOGO 718px X 160px.png"
              alt="Redpaddle Travel and Tours Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl md:text-3xl block mt-4 font-light">Luxury at Your Fingertips</span>
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-200">Experience premium car hiring, flight booking, and hotel reservations with our elite service designed for discerning travelers.</p>
          
          {/* Booking Tabs */}
          <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-xl p-6 mt-8">
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium">
                <FaPlane /> Flights
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-black/30 text-white rounded-full font-medium hover:bg-white/20 transition">
                <FaHotel /> Hotels
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-black/30 text-white rounded-full font-medium hover:bg-white/20 transition">
                <FaCar /> Cars
              </button>
            </div>
            
            {/* Flight Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-4">
                <label className="block text-sm font-medium mb-1 text-left">From</label>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  <input type="text" placeholder="City or Airport" className="bg-transparent w-full outline-none" />
                </div>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4">
                <label className="block text-sm font-medium mb-1 text-left">To</label>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  <input type="text" placeholder="City or Airport" className="bg-transparent w-full outline-none" />
                </div>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4">
                <label className="block text-sm font-medium mb-1 text-left">Dates</label>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <input type="text" placeholder="Departure - Return" className="bg-transparent w-full outline-none" />
                </div>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4">
                <label className="block text-sm font-medium mb-1 text-left">Travelers</label>
                <div className="flex items-center gap-2">
                  <FaUserAlt />
                  <select className="bg-transparent w-full outline-none">
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4+ Adults</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button className="mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-full font-bold flex items-center justify-center gap-2 w-full md:w-auto md:mx-auto hover:from-red-700 hover:to-red-800 transition shadow-lg">
              <FaSearch /> Search Flights
            </button>
          </div>
        </div>
      </section>
      
      {/* Services Section - Dynamically loaded */}
      <Suspense fallback={<div className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black"><div className="container mx-auto px-4 text-center">Loading services...</div></div>}>
        <ServicesSection />
      </Suspense>
      
      {/* Testimonials Section - Dynamically loaded */}
      <Suspense fallback={<div className="py-20 bg-gray-100 dark:bg-gray-800"><div className="container mx-auto px-4 text-center">Loading testimonials...</div></div>}>
        <TestimonialSection />
      </Suspense>
      
      {/* Footer is already loaded in layout.tsx */}
    </div>
  );
}
