import Image from "next/image";
import { memo } from 'react';

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Clients Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative mr-4">
                <Image 
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="Client"
                  fill
                  sizes="48px"
                  quality={70}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">Theresa Singano</h4>
                <p className="text-gray-500 dark:text-gray-300 text-sm">Finance Director</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-200 italic">&quot;I had a fantastic experience with this travel agency. The team has always been professional, attentive, and went above and beyond to tailor the trips to my preferences. Everything from the itinerary to accommodations was perfectly organized, making my travel with my family completely stress free. I highly recommend for anyone looking for a seamless and enjoyable travel experience.&quot;</p>
            <div className="flex mt-4 text-amber-400">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative mr-4">
                <Image 
                  src="https://randomuser.me/api/portraits/women/28.jpg"
                  alt="Client"
                  fill
                  sizes="48px"
                  quality={70}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">Tafadzwa Zifamba</h4>
                <p className="text-gray-500 dark:text-gray-300 text-sm">Travel Enthusiast</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-200 italic">&quot;Absolutely Outstanding Service! I had an incredible experience booking through Redpaddle travel agency. From the first inquiry to the final details of my trip, everything was handled with so much care and professionalism. The team was knowledgeable, patient, and truly went above and beyond to make sure my journey was smooth and enjoyable. What stood out most was the personal touch — they really take the time to understand what you want and tailor the experience perfectly. Many thanks to Kudzai the travel consultant, she was so patient 😊&quot;</p>
            <div className="flex mt-4 text-amber-400">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative mr-4">
                <Image 
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="Client"
                  fill
                  sizes="48px"
                  quality={70}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">Michael Thompson</h4>
                <p className="text-gray-500 dark:text-gray-300 text-sm">Business Owner</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-200 italic">&quot;Redpaddle Travel has consistently delivered exceptional service for both my business and leisure trips. Their attention to detail and commitment to customer satisfaction is unmatched. The team goes the extra mile to ensure every aspect of the journey is perfect. I wouldn't trust my travel arrangements to anyone else!&quot;</p>
            <div className="flex mt-4 text-amber-400">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(TestimonialSection);