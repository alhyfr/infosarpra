import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { User, Building2, MapPin, Calendar, Wrench, UserCheck, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react'
import dayjs from 'dayjs'

const Keluhan = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(dayjs())

  useEffect(() => {
    // Sample complaints data - replace with API call
    const sampleComplaints = [
      {
        id: 1,
        pemohon: "Ahmad Rizki",
        unit_kerja: "Bagian Keuangan",
        lokasi: "Gedung A Lantai 2",
        tanggal_rusak: "2024-01-15",
        status_perbaikan: "pending",
        penanggung_jawab: "Teknisi IT"
      },
      {
        id: 2,
        pemohon: "Siti Nurhaliza",
        unit_kerja: "Bagian HRD",
        lokasi: "Gedung B Lantai 1",
        tanggal_rusak: "2024-01-14",
        status_perbaikan: "in_progress",
        penanggung_jawab: "Tim Maintenance"
      },
      {
        id: 3,
        pemohon: "Budi Santoso",
        unit_kerja: "Bagian Operasional",
        lokasi: "Gedung C Lantai 3",
        tanggal_rusak: "2024-01-12",
        status_perbaikan: "completed",
        penanggung_jawab: "Tim IT Support"
      },
      {
        id: 4,
        pemohon: "Dewi Kartika",
        unit_kerja: "Bagian Marketing",
        lokasi: "Gedung A Lantai 1",
        tanggal_rusak: "2024-01-16",
        status_perbaikan: "pending",
        penanggung_jawab: "Teknisi Elektrik"
      },
      {
        id: 5,
        pemohon: "Rizki Pratama",
        unit_kerja: "Bagian Produksi",
        lokasi: "Gedung D Lantai 2",
        tanggal_rusak: "2024-01-13",
        status_perbaikan: "in_progress",
        penanggung_jawab: "Tim Teknisi"
      },
      {
        id: 6,
        pemohon: "Maya Sari",
        unit_kerja: "Bagian Administrasi",
        lokasi: "Gedung B Lantai 2",
        tanggal_rusak: "2024-01-11",
        status_perbaikan: "completed",
        penanggung_jawab: "Tim Maintenance"
      },
      {
        id: 7,
        pemohon: "Andi Wijaya",
        unit_kerja: "Bagian Keamanan",
        lokasi: "Gedung A Lantai 3",
        tanggal_rusak: "2024-01-17",
        status_perbaikan: "cancelled",
        penanggung_jawab: "Tim IT"
      },
      {
        id: 8,
        pemohon: "Eko Prasetyo",
        unit_kerja: "Bagian IT",
        lokasi: "Gedung A Lantai 4",
        tanggal_rusak: "2024-01-18",
        status_perbaikan: "pending",
        penanggung_jawab: "Tim IT Support"
      },
      {
        id: 9,
        pemohon: "Fitri Ayu",
        unit_kerja: "Bagian Training",
        lokasi: "Gedung B Lantai 3",
        tanggal_rusak: "2024-01-19",
        status_perbaikan: "in_progress",
        penanggung_jawab: "Tim Maintenance"
      },
      {
        id: 10,
        pemohon: "Gunawan",
        unit_kerja: "Bagian HRD",
        lokasi: "Gedung C Lantai 1",
        tanggal_rusak: "2024-01-20",
        status_perbaikan: "completed",
        penanggung_jawab: "Teknisi Elektrik"
      },
      {
        id: 11,
        pemohon: "Hani Sari",
        unit_kerja: "Bagian Marketing",
        lokasi: "Gedung D Lantai 2",
        tanggal_rusak: "2024-01-21",
        status_perbaikan: "pending",
        penanggung_jawab: "Tim IT"
      },
      {
        id: 12,
        pemohon: "Indra Kurniawan",
        unit_kerja: "Bagian Produksi",
        lokasi: "Gedung A Lantai 1",
        tanggal_rusak: "2024-01-22",
        status_perbaikan: "in_progress",
        penanggung_jawab: "Tim Teknisi"
      },
      {
        id: 13,
        pemohon: "Joko Widodo",
        unit_kerja: "Bagian Admin",
        lokasi: "Gedung B Lantai 4",
        tanggal_rusak: "2024-01-23",
        status_perbaikan: "completed",
        penanggung_jawab: "Tim Maintenance"
      },
      {
        id: 14,
        pemohon: "Kartika Sari",
        unit_kerja: "Bagian Keamanan",
        lokasi: "Gedung C Lantai 2",
        tanggal_rusak: "2024-01-24",
        status_perbaikan: "cancelled",
        penanggung_jawab: "Tim IT"
      },
      {
        id: 15,
        pemohon: "Lina Marlina",
        unit_kerja: "Bagian Operasional",
        lokasi: "Gedung D Lantai 3",
        tanggal_rusak: "2024-01-25",
        status_perbaikan: "pending",
        penanggung_jawab: "Teknisi IT"
      },
      {
        id: 16,
        pemohon: "Muhammad Ali",
        unit_kerja: "Bagian Keuangan",
        lokasi: "Gedung A Lantai 3",
        tanggal_rusak: "2024-01-26",
        status_perbaikan: "in_progress",
        penanggung_jawab: "Tim Maintenance"
      },
      {
        id: 17,
        pemohon: "Nina Sari",
        unit_kerja: "Bagian HRD",
        lokasi: "Gedung B Lantai 2",
        tanggal_rusak: "2024-01-27",
        status_perbaikan: "completed",
        penanggung_jawab: "Tim IT Support"
      },
      {
        id: 18,
        pemohon: "Oscar Pratama",
        unit_kerja: "Bagian Marketing",
        lokasi: "Gedung C Lantai 4",
        tanggal_rusak: "2024-01-28",
        status_perbaikan: "pending",
        penanggung_jawab: "Teknisi Elektrik"
      },
      {
        id: 19,
        pemohon: "Putri Maharani",
        unit_kerja: "Bagian Produksi",
        lokasi: "Gedung D Lantai 1",
        tanggal_rusak: "2024-01-29",
        status_perbaikan: "in_progress",
        penanggung_jawab: "Tim Teknisi"
      },
      {
        id: 20,
        pemohon: "Qori Sandria",
        unit_kerja: "Bagian Admin",
        lokasi: "Gedung A Lantai 2",
        tanggal_rusak: "2024-01-30",
        status_perbaikan: "completed",
        penanggung_jawab: "Tim Maintenance"
      },
      {
        id: 21,
        pemohon: "Rizki Pratama",
        unit_kerja: "Bagian Keamanan",
        lokasi: "Gedung B Lantai 3",
        tanggal_rusak: "2024-01-31",
        status_perbaikan: "cancelled",
        penanggung_jawab: "Tim IT"
      },
      {
        id: 22,
        pemohon: "Sari Dewi",
        unit_kerja: "Bagian Operasional",
        lokasi: "Gedung C Lantai 1",
        tanggal_rusak: "2024-02-01",
        status_perbaikan: "pending",
        penanggung_jawab: "Teknisi IT"
      },
      {
        id: 23,
        pemohon: "Tono Wijaya",
        unit_kerja: "Bagian Keuangan",
        lokasi: "Gedung D Lantai 4",
        tanggal_rusak: "2024-02-02",
        status_perbaikan: "in_progress",
        penanggung_jawab: "Tim Maintenance"
      },
      {
        id: 24,
        pemohon: "Umi Kalsum",
        unit_kerja: "Bagian HRD",
        lokasi: "Gedung A Lantai 4",
        tanggal_rusak: "2024-02-03",
        status_perbaikan: "completed",
        penanggung_jawab: "Tim IT Support"
      },
      {
        id: 25,
        pemohon: "Vina Panduwinata",
        unit_kerja: "Bagian Marketing",
        lokasi: "Gedung B Lantai 1",
        tanggal_rusak: "2024-02-04",
        status_perbaikan: "pending",
        penanggung_jawab: "Teknisi Elektrik"
      },
      {
        id: 26,
        pemohon: "Wahyu Nugroho",
        unit_kerja: "Bagian Produksi",
        lokasi: "Gedung C Lantai 3",
        tanggal_rusak: "2024-02-05",
        status_perbaikan: "in_progress",
        penanggung_jawab: "Tim Teknisi"
      },
      {
        id: 27,
        pemohon: "Xena Putri",
        unit_kerja: "Bagian Admin",
        lokasi: "Gedung D Lantai 2",
        tanggal_rusak: "2024-02-06",
        status_perbaikan: "completed",
        penanggung_jawab: "Tim Maintenance"
      },
      {
        id: 28,
        pemohon: "Yoga Pratama",
        unit_kerja: "Bagian Keamanan",
        lokasi: "Gedung A Lantai 1",
        tanggal_rusak: "2024-02-07",
        status_perbaikan: "cancelled",
        penanggung_jawab: "Tim IT"
      },
      {
        id: 29,
        pemohon: "Zara Sari",
        unit_kerja: "Bagian Operasional",
        lokasi: "Gedung B Lantai 4",
        tanggal_rusak: "2024-02-08",
        status_perbaikan: "pending",
        penanggung_jawab: "Teknisi IT"
      },
      {
        id: 30,
        pemohon: "Ahmad Fauzi",
        unit_kerja: "Bagian Keuangan",
        lokasi: "Gedung C Lantai 2",
        tanggal_rusak: "2024-02-09",
        status_perbaikan: "in_progress",
        penanggung_jawab: "Tim Maintenance"
      }
    ]

    // Simulate API call
    const fetchComplaints = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setComplaints(sampleComplaints)
      setLoading(false)
    }
    fetchComplaints()
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
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'in_progress': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'MENUNGGU'
      case 'in_progress': return 'SEDANG DIPERBAIKI'
      case 'completed': return 'SELESAI'
      case 'cancelled': return 'DIBATALKAN'
      default: return 'TIDAK DIKETAHUI'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'in_progress': return <Wrench className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'pending': return 'border-l-yellow-500'
      case 'in_progress': return 'border-l-blue-500'
      case 'completed': return 'border-l-green-500'
      case 'cancelled': return 'border-l-red-500'
      default: return 'border-l-gray-500'
    }
  }

  // Sort complaints by status: in_progress first, then pending, then completed, then cancelled
  const sortedComplaints = [...complaints].sort((a, b) => {
    const statusOrder = { 'in_progress': 0, 'pending': 1, 'completed': 2, 'cancelled': 3 }
    return statusOrder[a.status_perbaikan] - statusOrder[b.status_perbaikan]
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Complaints...</h2>
          <p className="text-gray-300">Please wait while we fetch the latest data</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Keluhan Pelanggan</h1>
                <p className="text-orange-200">IT, LAB, DAN SARANA DAN PRASARANA</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {currentTime.format('HH:mm')}
              </div>
              <div className="text-orange-200">
                {currentTime.format('dddd, DD MMMM YYYY')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="w-full mx-auto px-4 py-2 h-[calc(100vh-120px)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 h-full">
          <AnimatePresence>
            {sortedComplaints.map((complaint, index) => (
              <motion.div
                key={complaint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  ...(complaint.status_perbaikan === 'in_progress' ? {
                    boxShadow: [
                      "0 0 0px rgba(59, 130, 246, 0.3)",
                      "0 0 20px rgba(59, 130, 246, 0.6)",
                      "0 0 0px rgba(59, 130, 246, 0.3)"
                    ]
                  } : {})
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  ...(complaint.status_perbaikan === 'in_progress' ? {
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  } : {})
                }}
                className={`bg-white/10 backdrop-blur-sm border-l-3 ${getStatusBorderColor(complaint.status_perbaikan)} rounded-md p-3 hover:bg-white/20 transition-all duration-300 h-fit`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">#{complaint.id}</h3>
                    <motion.span 
                      className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(complaint.status_perbaikan)}`}
                      animate={complaint.status_perbaikan === 'in_progress' ? {
                        opacity: [1, 0.3, 1],
                        scale: [1, 1.05, 1]
                      } : {}}
                      transition={complaint.status_perbaikan === 'in_progress' ? {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      } : {}}
                    >
                      {getStatusIcon(complaint.status_perbaikan)}
                      <span className="hidden sm:inline">{getStatusText(complaint.status_perbaikan)}</span>
                    </motion.span>
                  </div>
                  
                  <div className="space-y-1 text-gray-300 flex-1">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-blue-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-400">Pemohon</div>
                        <div className="text-white font-semibold text-xs truncate">{complaint.pemohon}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Building2 className="w-3 h-3 text-green-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-400">Unit</div>
                        <div className="text-white font-semibold text-xs truncate">{complaint.unit_kerja}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-purple-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-400">Lokasi</div>
                        <div className="text-white font-semibold text-xs truncate">{complaint.lokasi}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-orange-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-400">Tanggal</div>
                        <div className="text-white font-semibold text-xs">{dayjs(complaint.tanggal_rusak).format('DD/MM')}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UserCheck className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-400">PJ</div>
                        <div className="text-white font-semibold text-xs truncate">{complaint.penanggung_jawab}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Wrench className="w-3 h-3 text-red-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-400">Durasi</div>
                        <div className="text-white font-semibold text-xs">
                          {dayjs().diff(dayjs(complaint.tanggal_rusak), 'day')}d
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {sortedComplaints.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-2 flex items-center justify-center h-full"
          >
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Tidak Ada Keluhan</h3>
              <p className="text-gray-400">Belum ada keluhan yang dilaporkan</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Keluhan