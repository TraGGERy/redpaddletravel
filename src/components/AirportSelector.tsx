'use client';

import { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
}

interface AirportSelectorProps {
  label: string;
  placeholder: string;
  onSelect: (airport: Airport) => void;
  required?: boolean;
  error?: string;
}

export default function AirportSelector({ label, placeholder, onSelect, required = true, error }: AirportSelectorProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchAirports = async () => {
      if (query.length < 2) {
        setAirports([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/airports/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setAirports(data);
      } catch (error) {
        console.error('Error fetching airports:', error);
        setAirports([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchAirports, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (airport: Airport) => {
    onSelect(airport);
    setQuery(`${airport.city} (${airport.iata})`);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium mb-2">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <div className={`flex items-center border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-3`}>
        <FaMapMarkerAlt className="text-gray-400 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="bg-transparent w-full outline-none"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Loading airports...
            </div>
          ) : airports.length > 0 ? (
            <ul className="py-2">
              {airports.map((airport) => (
                <li
                  key={airport.iata}
                  onClick={() => handleSelect(airport)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div className="font-medium">{airport.city} ({airport.iata})</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {airport.name}, {airport.country}
                  </div>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No airports found
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Enter at least 2 characters to search
            </div>
          )}
        </div>
      )}
    </div>
  );
}