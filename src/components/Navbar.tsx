'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlane, FaCar, FaHotel, FaBars, FaTimes, FaShip, FaSuitcase } from 'react-icons/fa';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-48">
            <Image 
              src={isScrolled ? "/ITINERARY IEP GENERIC LOGO 718px X 76px.png" : "/ITINERARY IEP LARGE LOGO 718px X 160px.png"}
              alt="Redpaddle Travel and Tours Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/flights" 
            className={`flex items-center gap-2 ${isScrolled ? 'text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400' : 'text-white/90 hover:text-white'} transition-colors`}
          >
            <FaPlane />
            <span>Flights</span>
          </Link>
          <Link 
            href="/hotels" 
            className={`flex items-center gap-2 ${isScrolled ? 'text-gray-700 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400' : 'text-white/90 hover:text-white'} transition-colors`}
          >
            <FaHotel />
            <span>Hotels</span>
          </Link>
          <Link 
            href="/cars" 
            className={`flex items-center gap-2 ${isScrolled ? 'text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400' : 'text-white/90 hover:text-white'} transition-colors`}
          >
            <FaCar />
            <span>Cars</span>
          </Link>
          <Link 
            href="/cruises" 
            className={`flex items-center gap-2 ${isScrolled ? 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400' : 'text-white/90 hover:text-white'} transition-colors`}
          >
            <FaShip />
            <span>Cruises</span>
          </Link>
          <Link 
            href="/packages" 
            className={`flex items-center gap-2 ${isScrolled ? 'text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400' : 'text-white/90 hover:text-white'} transition-colors`}
          >
            <FaSuitcase />
            <span>Holiday Packages</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FaTimes className={`w-6 h-6 ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`} />
          ) : (
            <FaBars className={`w-6 h-6 ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-xl absolute top-full left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/flights" 
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaPlane />
              <span>Flights</span>
            </Link>
            <Link 
              href="/hotels" 
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaHotel />
              <span>Hotels</span>
            </Link>
            <Link 
              href="/cars" 
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaCar />
              <span>Cars</span>
            </Link>
            <Link 
              href="/cruises" 
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaShip />
              <span>Cruises</span>
            </Link>
            <Link 
              href="/packages" 
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaSuitcase />
              <span>Holiday Packages</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}