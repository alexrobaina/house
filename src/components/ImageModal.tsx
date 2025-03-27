import Image from 'next/image'
import { Photo } from '@/types'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageModalProps {
  photo: Photo
  onClose: () => void
  onPrevious: (e: React.MouseEvent) => void
  onNext: (e: React.MouseEvent) => void
  currentIndex: number
  totalImages: number
}

export default function ImageModal({
  photo,
  onClose,
  onPrevious,
  onNext,
  currentIndex,
  totalImages,
}: ImageModalProps) {
  const [loading, setLoading] = useState(true)

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrevious((e as unknown) as React.MouseEvent)
      if (e.key === 'ArrowRight') onNext((e as unknown) as React.MouseEvent)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrevious, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
        <div className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-md">
          <span className="text-white text-sm">
            {currentIndex + 1} / {totalImages}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors duration-200"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="relative h-full max-w-7xl mx-auto p-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <div
              className={`transition-opacity duration-300 ${
                loading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.name}
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
                onLoadingComplete={() => setLoading(false)}
                priority
              />
            </div>

            {/* Loading spinner */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent rounded-b-lg">
              <h2 className="text-white text-xl font-semibold">{photo.name}</h2>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrevious(e)
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-200 transform hover:scale-110 pointer-events-auto"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext(e)
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-200 transform hover:scale-110 pointer-events-auto"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
