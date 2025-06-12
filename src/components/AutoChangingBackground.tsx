'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AutoChangingBackgroundProps {
  images: string[];
  interval?: number; // Time in milliseconds between image changes
  alt: string;
}

const AutoChangingBackground: React.FC<AutoChangingBackgroundProps> = ({
  images,
  interval = 3000, // Default to 5 seconds
  alt,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // Skip effect if there's only one image
    if (images.length <= 1) return;

    // Set up the interval to change images
    const intervalId = setInterval(() => {
      // Start fade out
      setFadeIn(false);
      
      // After fade out completes, change the image and start fade in
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true);
      }, 500); // This should match the CSS transition duration
    }, interval);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [images, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image 
          src={images[currentImageIndex]}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzMzMzIi8+PC9zdmc+"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AutoChangingBackground;