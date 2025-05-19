'use client';

import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; phone: string }) => void;
}

export default function ContactModal({ isOpen, onClose, onSubmit }: ContactModalProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s-+()]{10,}$/;
    
    if (emailRegex.test(email) && phoneRegex.test(phone)) {
      setIsValid(true);
      onSubmit({ email, phone });
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Please provide your contact details to proceed with the search.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
              placeholder="+1 (234) 567-8900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          
          {!isValid && (
            <p className="text-red-600 mb-4 text-sm">Please enter valid email and phone number.</p>
          )}
          
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}