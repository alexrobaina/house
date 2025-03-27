import Image from 'next/image'
import { Space } from '@/types'
import { useState } from 'react'

interface ImageGalleryProps {
  space: Space
  onImageClick: (index: number) => void
}

export default function ImageGallery({
  space,
  onImageClick,
}: ImageGalleryProps) {
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({})

  const handleImageError = (src: string) => {
    setImageError((prev) => ({ ...prev, [src]: true }))
  }

  return (
    <section className="text-center mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {space.photos.map((photo, index) => (
          <div
            key={`${photo.name}-${index}`}
            className="shadow-xl rounded-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            onClick={() => onImageClick(index)}
          >
            <div className="relative w-full h-64">
              <Image
                src={photo.src}
                alt={photo.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover ${
                  imageError[photo.src] ? 'hidden' : ''
                }`}
                onError={() => handleImageError(photo.src)}
                priority={index < 3}
              />
              {imageError[photo.src] && (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">Image not available</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                {photo.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
