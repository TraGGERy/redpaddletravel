'use client';

import { useState, useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingData) => void;
  bookingType: 'Package' | 'Cruise' | 'Flight';
  itemName: string;
  itemPrice?: number;
  itemDescription?: string;
  initialData?: Partial<BookingData>;
}

export interface BookingData {
  adults: number;
  kids: number;
  infants?: number;
  departureDate: string;
  returnDate?: string;
  fullName: string;
  email: string;
  phone: string;
}

export default function BookingModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  bookingType, 
  itemName, 
  itemPrice, 
  itemDescription,
  initialData 
}: BookingModalProps) {
  const [adults, setAdults] = useState(initialData?.adults || 1);
  const [kids, setKids] = useState(initialData?.kids || 0);
  const [infants, setInfants] = useState(initialData?.infants || 0);
  const [departureDate, setDepartureDate] = useState(initialData?.departureDate || '');
  const [returnDate, setReturnDate] = useState(initialData?.returnDate || '');
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [isValid, setIsValid] = useState(true);

  // Determine if return date is required based on booking type
  const requiresReturnDate = bookingType === 'Package' || bookingType === 'Flight';
  const showInfants = bookingType === 'Flight';

  useEffect(() => {
    // Reset form when modal opens or item changes
    if (isOpen) {
      setAdults(initialData?.adults || 1);
      setKids(initialData?.kids || 0);
      setInfants(initialData?.infants || 0);
      setDepartureDate(initialData?.departureDate || '');
      setReturnDate(initialData?.returnDate || '');
      setFullName(initialData?.fullName || '');
      setEmail(initialData?.email || '');
      setPhone(initialData?.phone || '');
      setIsValid(true);
    }
  }, [isOpen, itemName, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const emailRegex = /^[\S@]+@[\S@]+\.[\S@]+$/;
    const phoneRegex = /^[\d\s-+()]{10,}$/;
    
    const isFormValid = 
      adults > 0 &&
      departureDate &&
      (!requiresReturnDate || returnDate) &&
      fullName.trim() !== '' &&
      emailRegex.test(email) &&
      phoneRegex.test(phone);
    
    if (isFormValid) {
      setIsValid(true);
      const submissionData: BookingData = {
        adults,
        kids,
        departureDate,
        fullName,
        email,
        phone,
      };
      
      if (showInfants) {
        submissionData.infants = infants;
      }
      
      if (requiresReturnDate && returnDate) {
        submissionData.returnDate = returnDate;
      }
      
      onSubmit(submissionData);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto h-full">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 w-full max-w-lg mx-auto my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Book {bookingType}: {itemName}</h3>
        {itemPrice && (
          <p className="text-base sm:text-lg font-semibold text-blue-600 mb-2">Price: US$ {itemPrice.toFixed(2)}</p>
        )}
        {itemDescription && (
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">{itemDescription}</p>
        )}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">Please fill in your details to proceed with the booking.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="adults">Adults (12+)</label>
              <input
                type="number"
                id="adults"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                value={adults}
                onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value, 10) || 1))}
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="kids">
                {bookingType === 'Flight' ? 'Children (2-11)' : 'Kids (2-11)'}
              </label>
              <input
                type="number"
                id="kids"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                value={kids}
                onChange={(e) => setKids(Math.max(0, parseInt(e.target.value, 10) || 0))}
                min="0"
              />
            </div>
            {showInfants && (
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-medium mb-1" htmlFor="infants">Infants (Under 2)</label>
                <input
                  type="number"
                  id="infants"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                  value={infants}
                  onChange={(e) => setInfants(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  min="0"
                />
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="departureDate">
                {bookingType === 'Cruise' ? 'Cruise Date' : 'Departure Date'}
              </label>
              <input
                type="date"
                id="departureDate"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            {requiresReturnDate && (
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="returnDate">Return Date</label>
                <input
                  type="date"
                  id="returnDate"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departureDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
              placeholder="+1 (234) 567-8900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          
          {!isValid && (
            <p className="text-red-500 text-sm">Please fill in all required fields correctly.</p>
          )}
          
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 sm:py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition shadow-md text-center"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}