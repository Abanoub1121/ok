'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MemoryDetailPage() {
  const params = useParams();
  const memoryId = params.id as string;
  const [story, setStory] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(true);

  const handleAddPhoto = () => {
    const newPhotos = [...photos, `/placeholder.svg?height=400&width=400&query=memory+photo`];
    setPhotos(newPhotos);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save this to a database
    localStorage.setItem(
      `memory-${memoryId}`,
      JSON.stringify({ story, photos, savedAt: new Date().toISOString() })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#0f1435] to-[#0a0e27]">
      {/* Starfield background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() > 0.7 ? '3px' : '1px',
              height: Math.random() > 0.7 ? '3px' : '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${2.5 + Math.random() * 1}s infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto p-6">
        <Link
          href="/"
          className="inline-block mb-8 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          ← Back to Gallery
        </Link>

        <div className="bg-card rounded-lg p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-6">Memory #{memoryId}</h1>

          {isEditing ? (
            <div className="space-y-6">
              {/* Story Text Area */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Tell your story
                </label>
                <textarea
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Write about this day... What happened? How did you feel? What made it special?"
                  className="w-full h-48 px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Photos Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-200">
                    Add photos from this day
                  </label>
                  <button
                    onClick={handleAddPhoto}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                  >
                    + Add Photo
                  </button>
                </div>

                {photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Memory photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleRemovePhoto(index)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <span className="text-white font-bold text-xl">Remove</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Save Memory
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium text-gray-300 mb-2">Story</h2>
                <p className="text-gray-100 whitespace-pre-wrap">{story || 'No story added yet.'}</p>
              </div>

              {photos.length > 0 && (
                <div>
                  <h2 className="text-sm font-medium text-gray-300 mb-4">Photos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo || "/placeholder.svg"}
                        alt={`Memory photo ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setIsEditing(true)}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Edit Memory
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
