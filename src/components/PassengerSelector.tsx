'use client';

import { useState, useEffect, useRef } from 'react';
import { FaUserAlt } from 'react-icons/fa';

interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

interface PassengerSelectorProps {
  onSelect: (passengers: PassengerCount) => void;
  required?: boolean;
  error?: string;
}

export default function PassengerSelector({ onSelect, required = true, error }: PassengerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [passengers, setPassengers] = useState<PassengerCount>({ adults: 1, children: 0, infants: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Call onSelect when passengers state changes
  useEffect(() => {
    onSelect(passengers);
  }, [passengers, onSelect]);

  const handlePassengerChange = (type: 'adults' | 'children' | 'infants', operation: 'increase' | 'decrease') => {
    setPassengers(prev => {
      const newCount = {
        ...prev,
        [type]: operation === 'increase' ? prev[type] + 1 : Math.max(type === 'adults' ? 1 : 0, prev[type] - 1)
      };
      // onSelect(newCount); // Removed from here
      return newCount;
    });
  };

  const getDisplayText = () => {
    const parts = [];
    if (passengers.adults > 0) {
      parts.push(`${passengers.adults} Adult${passengers.adults !== 1 ? 's' : ''}`);
    }
    if (passengers.children > 0) {
      parts.push(`${passengers.children} Child${passengers.children !== 1 ? 'ren' : ''}`);
    }
    if (passengers.infants > 0) {
      parts.push(`${passengers.infants} Infant${passengers.infants !== 1 ? 's' : ''}`);
    }
    return parts.join(', ');
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium mb-2">Passengers{required && <span className="text-red-500 ml-1">*</span>}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-3 cursor-pointer bg-gray-50 dark:bg-gray-700`}
      >
        <FaUserAlt className="text-gray-400 mr-2" />
        <span className="flex-grow">{getDisplayText()}</span>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4 space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Adults</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Age 12+</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePassengerChange('adults', 'decrease')}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled={passengers.adults <= 1}
                >
                  -
                </button>
                <span className="w-8 text-center">{passengers.adults}</span>
                <button
                  onClick={() => handlePassengerChange('adults', 'increase')}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Children</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Age 2-11</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePassengerChange('children', 'decrease')}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled={passengers.children <= 0}
                >
                  -
                </button>
                <span className="w-8 text-center">{passengers.children}</span>
                <button
                  onClick={() => handlePassengerChange('children', 'increase')}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Infants</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Age 0-1</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePassengerChange('infants', 'decrease')}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled={passengers.infants <= 0}
                >
                  -
                </button>
                <span className="w-8 text-center">{passengers.infants}</span>
                <button
                  onClick={() => handlePassengerChange('infants', 'increase')}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}