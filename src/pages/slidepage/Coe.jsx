import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Calendar, MapPin, Activity } from 'lucide-react'
import dayjs from 'dayjs'

const Coe = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(dayjs())

  useEffect(() => {
    // Sample events data - replace with API call
    const sampleEvents = [
      {
        id: 1,
        kegiatan: "Rapat Koordinasi Bulanan",
        tanggal_mulai: "2024-01-15",
        tanggal_selesai: "2024-01-15",
        lokasi: "Ruang Rapat Utama",
        status: "ongoing"
      },
      {
        id: 2,
        kegiatan: "Pelatihan Sistem Baru",
        tanggal_mulai: "2024-01-16",
        tanggal_selesai: "2024-01-18",
        lokasi: "Lab Komputer A",
        status: "incoming"
      },
      {
        id: 3,
        kegiatan: "Presentasi Proyek Q1",
        tanggal_mulai: "2024-01-10",
        tanggal_selesai: "2024-01-10",
        lokasi: "Auditorium",
        status: "ended"
      },
      {
        id: 4,
        kegiatan: "Maintenance Server",
        tanggal_mulai: "2024-01-20",
        tanggal_selesai: "2024-01-20",
        lokasi: "Data Center",
        status: "incoming"
      },
      {
        id: 5,
        kegiatan: "Workshop Digital Marketing",
        tanggal_mulai: "2024-01-12",
        tanggal_selesai: "2024-01-12",
        lokasi: "Ruang Seminar B",
        status: "ended"
      },
      {
        id: 6,
        kegiatan: "Sosialisasi Kebijakan Baru",
        tanggal_mulai: "2024-01-22",
        tanggal_selesai: "2024-01-22",
        lokasi: "Aula Utama",
        status: "incoming"
      },
      {
        id: 7,
        kegiatan: "Evaluasi Kinerja Bulanan",
        tanggal_mulai: "2024-01-14",
        tanggal_selesai: "2024-01-14",
        lokasi: "Ruang Meeting 1",
        status: "ongoing"
      }
    ]

    // Simulate API call
    const fetchEvents = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setEvents(sampleEvents)
      setLoading(false)
    }
    fetchEvents()
  }, [])

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'incoming': return 'text-blue-600 bg-blue-100'
      case 'ongoing': return 'text-green-600 bg-green-100'
      case 'ended': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'incoming': return 'AKAN DATANG'
      case 'ongoing': return 'SEDANG BERLANGSUNG'
      case 'ended': return 'SELESAI'
      default: return 'TIDAK DIKETAHUI'
    }
  }

  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'incoming': return 'border-l-blue-500'
      case 'ongoing': return 'border-l-green-500'
      case 'ended': return 'border-l-gray-500'
      default: return 'border-l-gray-500'
    }
  }

  // Sort events by status: ongoing first, then incoming, then ended
  const sortedEvents = [...events].sort((a, b) => {
    const statusOrder = { 'ongoing': 0, 'incoming': 1, 'ended': 2 }
    return statusOrder[a.status] - statusOrder[b.status]
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Events...</h2>
          <p className="text-gray-300">Please wait while we fetch the latest schedule</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Calendar of Events</h1>
                <p className="text-blue-200">IT, LAB, DAN SARANA DAN PRASARANA</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {currentTime.format('HH:mm')}
              </div>
              <div className="text-blue-200">
                {currentTime.format('dddd, DD MMMM YYYY')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-4">
          <AnimatePresence>
            {sortedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  ...(event.status === 'ongoing' ? {
                    boxShadow: [
                      "0 0 0px rgba(34, 197, 94, 0.3)",
                      "0 0 20px rgba(34, 197, 94, 0.6)",
                      "0 0 0px rgba(34, 197, 94, 0.3)"
                    ]
                  } : {})
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  ...(event.status === 'ongoing' ? {
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  } : {})
                }}
                className={`bg-white/10 backdrop-blur-sm border-l-4 ${getStatusBorderColor(event.status)} rounded-xl p-6 hover:bg-white/20 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">{event.kegiatan}</h3>
                      <motion.span 
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(event.status)}`}
                        animate={event.status === 'ongoing' ? {
                          opacity: [1, 0.3, 1],
                          scale: [1, 1.05, 1]
                        } : {}}
                        transition={event.status === 'ongoing' ? {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                      >
                        {getStatusText(event.status)}
                      </motion.span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-sm text-gray-400">Tanggal Mulai</div>
                          <div className="text-white font-semibold">{dayjs(event.tanggal_mulai).format('DD MMMM YYYY')}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="text-sm text-gray-400">Tanggal Selesai</div>
                          <div className="text-white font-semibold">{dayjs(event.tanggal_selesai).format('DD MMMM YYYY')}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-sm text-gray-400">Lokasi</div>
                          <div className="text-white font-semibold">{event.lokasi}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="text-center"
                      animate={event.status === 'ongoing' ? {
                        scale: [1, 1.05, 1]
                      } : {}}
                      transition={event.status === 'ongoing' ? {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      } : {}}
                    >
                      <Activity className={`w-8 h-8 mx-auto mb-2 ${event.status === 'ongoing' ? 'text-green-400' : 'text-gray-400'}`} />
                      <div className="text-sm text-gray-400">Status</div>
                      <motion.div 
                        className={`font-semibold text-lg ${event.status === 'ongoing' ? 'text-green-400' : 'text-white'}`}
                        animate={event.status === 'ongoing' ? {
                          opacity: [1, 0.5, 1]
                        } : {}}
                        transition={event.status === 'ongoing' ? {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                      >
                        {getStatusText(event.status)}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {sortedEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Tidak Ada Kegiatan</h3>
            <p className="text-gray-400">Belum ada jadwal kegiatan yang tersedia</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Coe