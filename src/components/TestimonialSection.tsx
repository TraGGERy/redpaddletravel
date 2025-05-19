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
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Client"
                  fill
                  sizes="48px"
                  quality={70}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">James Wilson</h4>
                <p className="text-gray-500 dark:text-gray-300 text-sm">Business Executive</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-200 italic">"The flight booking service was exceptional. I was able to secure a business class seat at a competitive price, and the entire process was seamless."</p>
            <div className="flex mt-4 text-amber-400">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative mr-4">
                <Image 
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Client"
                  fill
                  sizes="48px"
                  quality={70}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">Sophia Martinez</h4>
                <p className="text-gray-500 dark:text-gray-300 text-sm">Travel Influencer</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-200 italic">"I've booked luxury hotels through many platforms, but none compare to the exclusive deals and personalized service I received here."</p>
            <div className="flex mt-4 text-amber-400">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative mr-4">
                <Image 
                  src="https://randomuser.me/api/portraits/men/62.jpg"
                  alt="Client"
                  fill
                  sizes="48px"
                  quality={70}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">Robert Chen</h4>
                <p className="text-gray-500 dark:text-gray-300 text-sm">Entrepreneur</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-200 italic">"The luxury car rental service exceeded my expectations. The vehicle was immaculate, and the delivery to my hotel was right on time."</p>
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