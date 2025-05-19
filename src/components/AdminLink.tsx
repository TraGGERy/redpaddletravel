'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaLock } from 'react-icons/fa';

export default function AdminLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href="/admin" 
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Admin Access"
    >
      <FaLock className="h-5 w-5" />
      {isHovered && (
        <span className="ml-2 text-sm whitespace-nowrap">Admin Access</span>
      )}
    </Link>
  );
}