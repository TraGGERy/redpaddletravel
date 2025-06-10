import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from 'next/link';
import { Suspense } from 'react';

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

const PartnersSection = dynamic(() => import('@/components/PartnersSection'), {
  loading: () => <div className="py-16 bg-gray-50 dark:bg-gray-900"><div className="container mx-auto px-4 text-center">Loading partners...</div></div>,
});

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
          <div className="relative h-[100px] md:h-[160px] w-full max-w-[718px] mb-4 md:mb-6 px-4 md:px-0">
            <Image 
              src="/ITINERARY IEP LARGE LOGO 718px X 160px.png"
              alt="Redpaddle Travel and Tours Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl md:text-3xl block mt-2 md:mt-4 font-light px-4">Your travel made easy</span>
          <p className="text-base md:text-xl max-w-2xl mb-6 md:mb-10 text-gray-200 px-4">Experience premium travel services with our elite offerings designed for discerning travelers.</p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2 w-full px-4 sm:px-6 md:px-8 max-w-4xl mx-auto justify-center">
            <Link href="/flights" className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto text-center">
              Book Flights
            </Link>
            <Link href="/hotels" className="px-6 sm:px-8 py-3 sm:py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto text-center">
              Book Hotels
            </Link>
            <Link href="/cars" className="px-6 sm:px-8 py-3 sm:py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto text-center">
              Rent Cars
            </Link>
            <Link href="/cruises" className="px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto text-center">
              Book Cruises
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services Section - Dynamically loaded */}
      <Suspense fallback={<div className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black"><div className="container mx-auto px-4 text-center">Loading services...</div></div>}>
        <ServicesSection />
      </Suspense>
      
      {/* Partners Section - Dynamically loaded */}
      <Suspense fallback={<div className="py-16 bg-gray-50 dark:bg-gray-900"><div className="container mx-auto px-4 text-center">Loading partners...</div></div>}>
        <PartnersSection />
      </Suspense>
      
      {/* Testimonials Section - Dynamically loaded */}
      <Suspense fallback={<div className="py-20 bg-gray-100 dark:bg-gray-800"><div className="container mx-auto px-4 text-center">Loading testimonials...</div></div>}>
        <TestimonialSection />
      </Suspense>
    </div>
  );
}
