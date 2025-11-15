'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ModelCharacters from '@/components/model-characters';
import MemoriesGallery from '@/components/memories-gallery';

export default function HomePage() {
  const [showModels, setShowModels] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#0f1435] to-[#0a0e27] relative overflow-hidden">
      {/* Starfield background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full star"
            style={{
              width: Math.random() > 0.7 ? '3px' : '1px',
              height: Math.random() > 0.7 ? '3px' : '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 pb-96">
        {/* Header Section */}
        <div className="text-center pt-12 pb-8 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            ✨ Unlimited Memories ✨
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-lg md:text-2xl text-gray-200 mb-12">
            <span>I Loved You before</span>
            <span className="text-3xl md:text-4xl">💙</span>
            <span>I Love You now</span>
            <span className="text-3xl md:text-4xl">💙</span>
            <span>I Will Love You more in the future</span>
          </div>
        </div>


        {/* Memories Gallery Section */}
        <div className="px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Our Moments</h2>
            <MemoriesGallery />
          </div>
        </div>
      </div>

      {showModels && <ModelCharacters />}
    </div>
  );
}
