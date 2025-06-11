import Image from "next/image";
import { FaShip, FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaAnchor } from 'react-icons/fa';
import AutoChangingBackground from "@/components/AutoChangingBackground";

const cruiseImages = [
  "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2064&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
];

export default function CruisesPage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div className="absolute inset-0 overflow-hidden">
          <AutoChangingBackground 
            images={cruiseImages} 
            interval={5000}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cruise Deal 1 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1974&auto=format&fit=crop"
                  alt="Caribbean Cruise"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Caribbean Paradise</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">Royal Caribbean</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Oasis of the Seas</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">$1,299</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>7 Nights</span>
                  <span>Miami Departure</span>
                </div>
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Book Now</button>
              </div>
            </div>
            
            {/* Cruise Deal 2 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1566375638485-8493998a06a2?q=80&w=2070&auto=format&fit=crop"
                  alt="Mediterranean Cruise"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Mediterranean Explorer</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">Norwegian Cruise Line</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Norwegian Epic</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">$1,599</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>10 Nights</span>
                  <span>Barcelona Departure</span>
                </div>
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Book Now</button>
              </div>
            </div>
            
            {/* Cruise Deal 3 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1580541631950-7282082b53ce?q=80&w=2071&auto=format&fit=crop"
                  alt="Alaska Cruise"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Alaskan Adventure</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300">Celebrity Cruises</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Celebrity Solstice</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">$1,849</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per person</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>7 Nights</span>
                  <span>Seattle Departure</span>
                </div>
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Book Now</button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="inline-block py-3 px-8 bg-white dark:bg-gray-700 text-blue-600 font-medium rounded-full shadow hover:shadow-lg transition">View All Cruise Deals</a>
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
    </div>
  );
}