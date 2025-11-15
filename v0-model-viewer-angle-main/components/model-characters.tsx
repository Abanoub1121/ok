'use client';

import { useState } from 'react';
import ModelViewer from './model-viewer';

export default function ModelCharacters() {
  const characters = [
    {
      id: 'boba',
      name: 'Boba',
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chibi_astronaut-pXRdNIGT4Wwa7ZX2UzvueU6QfEiovd.glb',
      cameraOrbit: '270deg 90deg 105%',
      size: 'h-20 w-16', // Reduced Boba (astronaut) size - now on left
    },
    {
      id: 'lolla',
      name: 'Lolla',
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chibi_dog-yUsdNxvzkbOLEsadXw59fY3MoTcXqk.glb',
      cameraOrbit: '360deg 150deg 105%',
      size: 'h-32 w-24', // Lolla (dog) - original size - now in middle
    },
    {
      id: 'totta',
      name: 'Totta',
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chibi_cat-uX6KsFeNhXeMfg7hpieTjSpO4NS0FX.glb',
      cameraOrbit: '90deg 90deg 105%',
      size: 'h-20 w-16', // Reduced Totta (cat) size
    },
  ];

  const [hoveredName, setHoveredName] = useState<string | null>(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-end gap-8 flex-wrap p-4 bg-gradient-to-t from-[#0a0e27] via-[#0a0e27]/50 to-transparent">
      {characters.map((char) => (
        <div
          key={char.id}
          className={`relative ${char.size}`}
          onMouseEnter={() => setHoveredName(char.id)}
          onMouseLeave={() => setHoveredName(null)}
        >
          <ModelViewer
            src={char.src}
            name={char.name}
            cameraOrbit={char.cameraOrbit}
          />
          {hoveredName === char.id && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 px-3 py-1 rounded-full text-white text-sm font-medium">
              {char.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
