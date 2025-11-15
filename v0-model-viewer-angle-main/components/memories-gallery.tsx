'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function MemoriesGallery() {
  const [memories] = useState(
    [...Array(90)].map((_, i) => ({
      id: i + 1,
      title: `Memory ${i + 1}`,
      thumbnail: `/placeholder.svg?height=300&width=300&query=memory+photo+${i + 1}`,
    }))
  );

  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {memories.map((memory) => (
        <Link key={memory.id} href={`/memory/${memory.id}`}>
          <div className="group relative aspect-square bg-card rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
            <img
              src={memory.thumbnail || "/placeholder.svg"}
              alt={memory.title}
              className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-3">
              <p className="text-white font-medium">{memory.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
