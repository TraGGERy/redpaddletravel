import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Redpaddle Travel and Tours</h3>
            <p className="text-gray-400">Luxury travel experiences tailored for the discerning traveler. Premium flights, 5-star hotels, and exotic car rentals.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/flights" className="text-gray-400 hover:text-white transition">Flight Booking</Link></li>
              <li><Link href="/hotels" className="text-gray-400 hover:text-white transition">Hotel Reservations</Link></li>
              <li><Link href="/cars" className="text-gray-400 hover:text-white transition">Car Hiring</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Luxury Packages</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">+263 718680863</li>
              <li className="text-gray-400">+263 718680867</li>
              <li className="text-gray-400">info@redpaddletravel.co.zw</li>
              <li className="text-gray-400">Shop B2 , 160 Fife Avenue , Harare</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© 2024 Redpaddle Travel and Tours. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="https://www.facebook.com/share/1B8vzWwNSc/" className="text-gray-400 hover:text-white transition"><FaFacebook /></Link>
            <Link href="https://x.com/R_T_Tours?t=8qkxSY1msIpZHSTQpytJeg&s=09" className="text-gray-400 hover:text-white transition"><FaTwitter /></Link>
            <Link href="https://www.instagram.com/redpaddle_travel_and_tours?igsh=NG1ndWljaDlqaXE3" className="text-gray-400 hover:text-white transition"><FaInstagram /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}