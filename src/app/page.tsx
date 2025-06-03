import dynamic from 'next/dynamic';
import Image from "next/image";
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
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-200">Experience premium travel services with our elite offerings designed for discerning travelers.</p>
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
