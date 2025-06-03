'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { name: 'Amadeus', logo: '/partners/amadeus.svg' },
  { name: 'MSC Cruise', logo: '/partners/msc-cruise.svg' },
  { name: 'Air Zimbabwe', logo: '/partners/air-zimbabwe.svg' },
  { name: 'Fastjet', logo: '/partners/fastjet.svg' },
  { name: 'Airlink', logo: '/partners/airlink.svg' },
  { name: 'Cemair', logo: '/partners/cemair.svg' },
  { name: 'Fly Safair', logo: '/partners/fly-safair.svg' },
  { name: 'South African Airways', logo: '/partners/south-african-airways.svg' },
  { name: 'Air Tanzania', logo: '/partners/air-tanzania.svg' },
  { name: 'Air Botswana', logo: '/partners/air-botswana.svg' },
  { name: 'Air Namibia', logo: '/partners/air-namibia.svg' },
  { name: 'Uganda Airways', logo: '/partners/uganda-airways.svg' },
  { name: 'Rwandair', logo: '/partners/rwandair.svg' },
  { name: 'Kenya Airways', logo: '/partners/kenya-airways.svg' },
  { name: 'Ethiopian Airways', logo: '/partners/ethiopian-airways.svg' },
  { name: 'Fly Emirates', logo: '/partners/fly-emirates.svg' },
  { name: 'Qatar Airways', logo: '/partners/qatar-airways.svg' }
];

export default function PartnersSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Our Trusted Partners
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative w-32 h-20">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                {partner.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}