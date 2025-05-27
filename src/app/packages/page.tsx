import Image from "next/image";
import { FaSuitcase, FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaGlobe } from 'react-icons/fa';

export default function PackagesPage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
            alt="Holiday Packages"
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package 1 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1602002418082-dd4a9f45a2d5?q=80&w=1974&auto=format&fit=crop"
                  alt="Bali Package"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Bali Luxury Escape</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">All Inclusive</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Flight + 5-Star Resort</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">$2,499</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>7 Nights</span>
                  <span>Includes Activities</span>
                </div>
                <button className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">Book Now</button>
              </div>
            </div>
            
            {/* Package 2 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop"
                  alt="Maldives Package"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Maldives Paradise</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">Premium Package</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Overwater Villa</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">$3,899</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>5 Nights</span>
                  <span>Full Board</span>
                </div>
                <button className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">Book Now</button>
              </div>
            </div>
            
            {/* Package 3 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=2070&auto=format&fit=crop"
                  alt="Swiss Alps Package"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Swiss Alps Adventure</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">Adventure Package</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ski Resort + Activities</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">$2,799</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>6 Nights</span>
                  <span>Guided Tours</span>
                </div>
                <button className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">Book Now</button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="inline-block py-3 px-8 bg-white dark:bg-gray-700 text-red-600 font-medium rounded-full shadow hover:shadow-lg transition">View All Holiday Packages</a>
          </div>
        </div>
      </section>
      
      {/* Package Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Our Holiday Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSuitcase className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">All-Inclusive Packages</h3>
              <p className="text-gray-600 dark:text-gray-300">Our packages include flights, accommodation, transfers, and selected activities for a hassle-free experience.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Best Value Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-300">We guarantee the best value for your money with our carefully curated luxury packages.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Destinations</h3>
              <p className="text-gray-600 dark:text-gray-300">Access to exclusive resorts and destinations that aren&apos;t available through standard booking channels.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Service</h3>
              <p className="text-gray-600 dark:text-gray-300">Our travel experts provide personalized service to customize your package to your exact preferences.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}