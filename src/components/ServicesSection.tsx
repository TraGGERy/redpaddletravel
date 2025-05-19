import Image from "next/image";
import { FaPlane, FaCar, FaHotel } from 'react-icons/fa';
import { memo } from 'react';

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Premium Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Flight Booking */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
                alt="Luxury Flight"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={75}
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <FaPlane className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Flight Booking</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Experience first-class and business-class flights with premium airlines. Enjoy priority boarding, exclusive lounges, and personalized service.</p>
              <a href="#" className="text-red-600 font-medium flex items-center gap-1 hover:underline">Book a Flight <span className="ml-1">→</span></a>
            </div>
          </div>
          
          {/* Hotel Booking */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                alt="Luxury Hotel"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={75}
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-4">
                <FaHotel className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Hotel Booking</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Stay at 5-star hotels and luxury resorts worldwide. Enjoy premium amenities, exquisite dining, and exceptional service during your stay.</p>
              <a href="#" className="text-amber-600 font-medium flex items-center gap-1 hover:underline">Find a Hotel <span className="ml-1">→</span></a>
            </div>
          </div>
          
          {/* Car Hiring */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
                alt="Luxury Car"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={75}
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <FaCar className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Car Hiring</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Rent luxury and exotic cars for your journey. Choose from premium brands like Mercedes, BMW, Audi, and more with personalized delivery.</p>
              <a href="#" className="text-green-600 font-medium flex items-center gap-1 hover:underline">Hire a Car <span className="ml-1">→</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(ServicesSection);