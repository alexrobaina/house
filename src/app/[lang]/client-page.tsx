'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import ImageGallery from '@/components/ImageGallery'
import ImageModal from '@/components/ImageModal'
import Footer from '@/components/Footer'
import { Space, Dictionary } from '@/types'

interface ClientPageProps {
  dict: Dictionary
  spaces: Space[]
}

export default function ClientPage({ dict, spaces }: ClientPageProps) {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  )

  const closeModal = () => {
    setSelectedSpace(null)
    setSelectedPhotoIndex(null)
  }

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedSpace || selectedPhotoIndex === null) return
    setSelectedPhotoIndex(
      (selectedPhotoIndex + 1) % selectedSpace.photos.length,
    )
  }

  const showPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedSpace || selectedPhotoIndex === null) return
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + selectedSpace.photos.length) %
        selectedSpace.photos.length,
    )
  }

  const handleImageClick = (space: Space, index: number) => {
    setSelectedSpace(space)
    setSelectedPhotoIndex(index)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header title={dict.home.welcome} subtitle={dict.home.subtitle} />

      <main className="container mx-auto px-4 py-12">
        <div className="mt-4 mb-12">
          <a
            href="https://wa.me/573178283000"
            className="inline-block px-6 py-3 bg-teal-500 text-white font-bold rounded-full hover:bg-teal-600 transition-colors duration-300"
          >
            {dict.home.contact}
          </a>
        </div>

        {spaces.map((space, index) => (
          <div key={`space-${index}`} className="mb-16">
            <h2 className="text-3xl text-gray-800 font-bold mb-4">
              {space.title}
            </h2>
            <p className="text-gray-600 mb-8">{space.description}</p>
            <ImageGallery
              space={space}
              onImageClick={(index) => handleImageClick(space, index)}
            />
          </div>
        ))}

        <AnimatePresence>
          {selectedSpace && selectedPhotoIndex !== null && (
            <ImageModal
              photo={selectedSpace.photos[selectedPhotoIndex]}
              onClose={closeModal}
              onPrevious={showPreviousImage}
              onNext={showNextImage}
              currentIndex={selectedPhotoIndex}
              totalImages={selectedSpace.photos.length}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer rights={dict.footer.rights} />
    </div>
  )
}
