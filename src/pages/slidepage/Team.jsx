import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import dayjs from 'dayjs'
import api from '../../libs/api'
const url = 'http://localhost:3002/api/storage/'


const Team = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentCenterImage, setCurrentCenterImage] = useState(0)
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getTeam = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/teams')
      
      if (response.data && response.data.data) {
        setGalleryImages(response.data.data)
        console.log('Team data loaded:', response.data.data)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      console.error('Error fetching team data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTeam()
  }, [])
 



  //   {
  //     id: 1,
  //     src: Asrul,
  //     title: "Tim Leadership",
  //     category: "Leadership"
  //   },
  //   {
  //     id: 2,
  //     src: Ali,
  //     title: "Marketing Team",
  //     category: "Marketing"
  //   },
  //   {
  //     id: 3,
  //     src: Matius,
  //     title: "Development Team",
  //     category: "Development"
  //   },
  //   {
  //     id: 4,
  //     src: Kirman,
  //     title: "Design Team",
  //     category: "Design"
  //   },
  //   {
  //     id: 5,
  //     src: Eka,
  //     title: "Sales Team",
  //     category: "Sales"
  //   },
  //   {
  //     id: 6,
  //     src: Khaerul,
  //     title: "Support Team",
  //     category: "Support"
  //   },
  //   {
  //     id: 7,
  //     src: Ahwan,
  //     title: "Creative Team",
  //     category: "Creative"
  //   },
  //   {
  //     id: 8,
  //     src: Okta,
  //     title: "Analytics Team",
  //     category: "Analytics"
  //   }
  // ]

  // Auto change center image every 15 seconds
  useEffect(() => {
    if (galleryImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentCenterImage((prev) => (prev + 1) % galleryImages.length)
    }, 10000) // 15 seconds

    return () => clearInterval(interval)
  }, [galleryImages.length])


  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const centerImageVariants = {
    enter: {
      opacity: 0,
      scale: 0.1,
      filter: "blur(30px) brightness(0.3)",
      z: -200
    },
    center: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      z: 0,
      transition: {
        duration: 1.8,
        ease: [0.34, 1.56, 0.64, 1], // Custom elastic ease
        filter: { duration: 2.2 }
      }
    },
    exit: {
      opacity: 0,
      scale: 2.5,
      filter: "blur(40px) brightness(3)",
      z: 200,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        filter: { duration: 1.5 }
      }
    }
  }

  const centerImageHoverVariants = {
    hover: {
      scale: 1.05,
      rotateY: 5,
      rotateX: 2,
      filter: "brightness(1.1) contrast(1.05)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }

  const particleVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 0,
      x: 0
    },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-20, -100],
      x: [0, Math.random() * 100 - 50],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className='h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Team Data...</h2>
          <p className="text-gray-300">Please wait while we fetch the latest information</p>
        </motion.div>
      </div>
    )
  }

  // Error state
  if (error && galleryImages.length === 0) {
    return (
      <div className='h-screen w-full bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center'>
        <motion.div
          className="text-center max-w-md mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Data</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <motion.button
            onClick={getTeam}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className='h-screen w-full bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 overflow-hidden relative'>
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Background Grid Gallery */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Grid Container */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4 h-full">
            {galleryImages.length > 0 && galleryImages
              .filter((_, index) => index !== currentCenterImage) // Exclude current image
              .map((image, index) => {
                // Check if this image will be the next one to appear
                const nextImageIndex = (currentCenterImage + 1) % galleryImages.length;
                const isNextImage = galleryImages.findIndex(img => img.id === image.id) === nextImageIndex;
                
                if (!image) return null;
                
                return (
                  <motion.div
                    key={`grid-${image.id}`}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: isNextImage ? 0.6 : 0.3,
                      scale: isNextImage ? 1.1 : 1,
                      filter: isNextImage ? "brightness(1.2)" : "brightness(1)"
                    }}
                    transition={{ 
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      opacity: 0.5,
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800 aspect-square">
                      <img
                        src={image?.foto ? url + image.foto : ''}
                        alt={image?.nama || 'Team Member'}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Next image highlight */}
                      {isNextImage && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                      
                      {/* Glow effect for next image */}
                      {isNextImage && (
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(147, 51, 234, 0.5)",
                              "0 0 20px rgba(147, 51, 234, 0.8)",
                              "0 0 0px rgba(147, 51, 234, 0.5)"
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      
                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Image info on hover */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs transform translate-y-full group-hover:translate-y-0"
                        transition={{ duration: 0.2 }}
                      >
                        <p className="font-semibold truncate">{image?.nama || 'Team Member'}</p>
                        <p className="text-gray-300 text-xs truncate">{image?.nikname || 'Team'}</p>
                        {isNextImage && (
                          <motion.p 
                            className="text-purple-300 text-xs font-bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            Next →
                          </motion.p>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            
            {/* Fill remaining grid spaces with other images (excluding current) */}
            {galleryImages.length > 0 && Array.from({ length: 16 }).map((_, index) => {
              // Get a different image that's not the current one
              const availableImages = galleryImages.filter((_, imgIndex) => imgIndex !== currentCenterImage);
              const imageIndex = index % availableImages.length;
              const image = availableImages[imageIndex];
              
              if (!image) return null;
              
              return (
                <motion.div
                  key={`fill-${index}`}
                  className="relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: (index + galleryImages.length - 1) * 0.05
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800 aspect-square">
                    <img
                      src={image?.foto ? url + image.foto : ''}
                      alt="Background"
                      className="w-full h-full object-cover filter blur-sm"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Morphing Connection Lines */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {/* Find next image position and create morphing line */}
        {galleryImages.length > 0 && galleryImages
          .filter((_, index) => index !== currentCenterImage)
          .map((image, index) => {
            if (!image) return null;
            
            const nextImageIndex = (currentCenterImage + 1) % galleryImages.length;
            const isNextImage = galleryImages.findIndex(img => img.id === image.id) === nextImageIndex;
            
            if (!isNextImage) return null;
            
            return (
              <motion.div
                key={`morph-line-${image.id}`}
                className="absolute"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ 
                  opacity: 0.8,
                  scaleX: 1,
                  pathLength: [0, 1]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + index * 10}%`,
                  top: `${30 + (index % 3) * 20}%`,
                  width: '200px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.8), transparent)',
                  transformOrigin: 'left center'
                }}
              />
            );
          })}
      </div>

      {/* Center Large Image - Full Screen */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {galleryImages.length > 0 && galleryImages[currentCenterImage] && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCenterImage}
              variants={centerImageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              whileHover="hover"
              className="relative group cursor-pointer max-w-4xl mx-4"
              onClick={() => setSelectedImage(galleryImages[currentCenterImage])}
            >
            <motion.div
              variants={centerImageHoverVariants}
              className="relative overflow-hidden rounded-3xl shadow-2xl"
            >
              <img
                src={galleryImages[currentCenterImage]?.foto ? url + galleryImages[currentCenterImage].foto : ''}
                alt={galleryImages[currentCenterImage]?.nama || 'Team Member'}
                className="w-full h-[70vh] object-cover"
              />
              
              {/* Animated Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0"
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)",
                  filter: "blur(30px)"
                }}
              />
              
              {/* Particle Effects */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-400 rounded-full"
                  variants={particleVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    transition: {
                      ...particleVariants.visible.transition,
                      delay: i * 0.2
                    }
                  }}
                />
              ))}
              
              {/* Gradient Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                transition={{ duration: 0.3 }}
              />
              
              {/* Content Overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.h3 
                  className="text-4xl md:text-4xl font-bold mb-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  {galleryImages[currentCenterImage]?.nama || 'Team Member'}
                </motion.h3>
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  {galleryImages[currentCenterImage]?.jabatan || 'Team'}
                </motion.p>
                <motion.p 
                  className="text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  status:
                </motion.p>
              </motion.div>

              {/* Animated Progress Bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden rounded-b-3xl"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 60, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
                {/* Progress Bar Glow */}
                <motion.div
                  className="absolute inset-0 h-full bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 opacity-50"
                  animate={{
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        )}
        
        {/* Image Counter - Fixed Position */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute top-8 right-8 z-30"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white text-lg font-semibold">
            {dayjs().format('DD MMMM YYYY')}
          </div>
        </motion.div>

        {/* Title - Fixed Position */}
        <div
          className="absolute top-8 left-50% z-30"
        >
          <h1
            className="text-3xl md:text-5xl font-bold text-white"
            variants={floatingVariants}
          >
            UNIT IT,LAB & SARPRA
          </h1>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage?.foto ? url + selectedImage.foto : ''}
                alt={selectedImage?.nama || 'Team Member'}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-2xl">
                <h3 className="text-3xl font-bold mb-2">{selectedImage?.nama || 'Team Member'}</h3>
                <p className="text-lg text-gray-300">{selectedImage?.jabatan || 'Team'}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Team