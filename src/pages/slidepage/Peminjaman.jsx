import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Building2, 
  Package, 
  Wrench, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  RotateCcw
} from 'lucide-react'
import dayjs from 'dayjs'

const Peminjaman = () => {
  const [roomBookings, setRoomBookings] = useState([])
  const [atkRequests, setAtkRequests] = useState([])
  const [equipmentBookings, setEquipmentBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(dayjs())

  useEffect(() => {
    // Sample data for room bookings
    const sampleRoomBookings = [
      {
        id: 1,
        ruangan: "Ruang Rapat Utama",
        peminjam: "Ahmad Rizki",
        unit_kerja: "Bagian Keuangan",
        tanggal_pinjam: "2024-01-15",
        tanggal_kembali: "2024-01-15",
        waktu_mulai: "09:00",
        waktu_selesai: "12:00",
        status: "active",
        keperluan: "Rapat Koordinasi Bulanan"
      },
      {
        id: 2,
        ruangan: "Lab Komputer A",
        peminjam: "Siti Nurhaliza",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-16",
        tanggal_kembali: "2024-01-16",
        waktu_mulai: "14:00",
        waktu_selesai: "17:00",
        status: "pending",
        keperluan: "Pelatihan Sistem"
      },
      {
        id: 3,
        ruangan: "Auditorium",
        peminjam: "Budi Santoso",
        unit_kerja: "Bagian HRD",
        tanggal_pinjam: "2024-01-14",
        tanggal_kembali: "2024-01-14",
        waktu_mulai: "08:00",
        waktu_selesai: "16:00",
        status: "completed",
        keperluan: "Seminar Karyawan"
      },
      {
        id: 4,
        ruangan: "Ruang Meeting A",
        peminjam: "Eko Prasetyo",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-16",
        tanggal_kembali: "2024-01-16",
        waktu_mulai: "09:00",
        waktu_selesai: "11:00",
        status: "active",
        keperluan: "Rapat Tim IT"
      },
      {
        id: 5,
        ruangan: "Lab Komputer 1",
        peminjam: "Fitri Ayu",
        unit_kerja: "Bagian Training",
        tanggal_pinjam: "2024-01-17",
        tanggal_kembali: "2024-01-17",
        waktu_mulai: "13:00",
        waktu_selesai: "17:00",
        status: "pending",
        keperluan: "Workshop Database"
      },
      {
        id: 6,
        ruangan: "Ruang Meeting B",
        peminjam: "Gunawan",
        unit_kerja: "Bagian HRD",
        tanggal_pinjam: "2024-01-18",
        tanggal_kembali: "2024-01-18",
        waktu_mulai: "08:00",
        waktu_selesai: "10:00",
        status: "completed",
        keperluan: "Rapat Evaluasi"
      },
      {
        id: 7,
        ruangan: "Lab Komputer 2",
        peminjam: "Hani Sari",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-19",
        tanggal_kembali: "2024-01-19",
        waktu_mulai: "14:00",
        waktu_selesai: "16:00",
        status: "active",
        keperluan: "Pelatihan Web Dev"
      },
      {
        id: 8,
        ruangan: "Ruang Meeting C",
        peminjam: "Indra Kurniawan",
        unit_kerja: "Bagian Marketing",
        tanggal_pinjam: "2024-01-20",
        tanggal_kembali: "2024-01-20",
        waktu_mulai: "10:00",
        waktu_selesai: "12:00",
        status: "pending",
        keperluan: "Rapat Tim Marketing"
      },
      {
        id: 9,
        ruangan: "Lab Komputer 3",
        peminjam: "Joko Widodo",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-21",
        tanggal_kembali: "2024-01-21",
        waktu_mulai: "09:00",
        waktu_selesai: "13:00",
        status: "completed",
        keperluan: "Pelatihan Mobile App"
      },
      {
        id: 10,
        ruangan: "Ruang Meeting D",
        peminjam: "Kartika Sari",
        unit_kerja: "Bagian HRD",
        tanggal_pinjam: "2024-01-22",
        tanggal_kembali: "2024-01-22",
        waktu_mulai: "11:00",
        waktu_selesai: "13:00",
        status: "active",
        keperluan: "Rapat Tim HR"
      },
      {
        id: 11,
        ruangan: "Lab Komputer 4",
        peminjam: "Lina Marlina",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-23",
        tanggal_kembali: "2024-01-23",
        waktu_mulai: "15:00",
        waktu_selesai: "17:00",
        status: "pending",
        keperluan: "Workshop UI/UX"
      },
      {
        id: 12,
        ruangan: "Ruang Meeting E",
        peminjam: "Muhammad Ali",
        unit_kerja: "Bagian Keuangan",
        tanggal_pinjam: "2024-01-24",
        tanggal_kembali: "2024-01-24",
        waktu_mulai: "08:00",
        waktu_selesai: "10:00",
        status: "completed",
        keperluan: "Rapat Tim Finance"
      },
      {
        id: 13,
        ruangan: "Lab Komputer 5",
        peminjam: "Nina Sari",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-25",
        tanggal_kembali: "2024-01-25",
        waktu_mulai: "13:00",
        waktu_selesai: "15:00",
        status: "active",
        keperluan: "Pelatihan Cloud Computing"
      },
      {
        id: 14,
        ruangan: "Ruang Meeting F",
        peminjam: "Oscar Pratama",
        unit_kerja: "Bagian Operations",
        tanggal_pinjam: "2024-01-26",
        tanggal_kembali: "2024-01-26",
        waktu_mulai: "14:00",
        waktu_selesai: "16:00",
        status: "pending",
        keperluan: "Rapat Tim Operations"
      },
      {
        id: 15,
        ruangan: "Lab Komputer 6",
        peminjam: "Putri Maharani",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-27",
        tanggal_kembali: "2024-01-27",
        waktu_mulai: "09:00",
        waktu_selesai: "12:00",
        status: "completed",
        keperluan: "Workshop DevOps"
      },
      {
        id: 16,
        ruangan: "Ruang Meeting G",
        peminjam: "Qori Sandria",
        unit_kerja: "Bagian Sales",
        tanggal_pinjam: "2024-01-28",
        tanggal_kembali: "2024-01-28",
        waktu_mulai: "10:00",
        waktu_selesai: "12:00",
        status: "active",
        keperluan: "Rapat Tim Sales"
      },
      {
        id: 17,
        ruangan: "Lab Komputer 7",
        peminjam: "Rizki Pratama",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-29",
        tanggal_kembali: "2024-01-29",
        waktu_mulai: "16:00",
        waktu_selesai: "18:00",
        status: "pending",
        keperluan: "Pelatihan AI/ML"
      },
      {
        id: 18,
        ruangan: "Ruang Meeting H",
        peminjam: "Sari Dewi",
        unit_kerja: "Bagian Legal",
        tanggal_pinjam: "2024-01-30",
        tanggal_kembali: "2024-01-30",
        waktu_mulai: "11:00",
        waktu_selesai: "13:00",
        status: "completed",
        keperluan: "Rapat Tim Legal"
      },
      {
        id: 19,
        ruangan: "Lab Komputer 8",
        peminjam: "Tono Wijaya",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-31",
        tanggal_kembali: "2024-01-31",
        waktu_mulai: "08:00",
        waktu_selesai: "11:00",
        status: "active",
        keperluan: "Workshop Cybersecurity"
      },
      {
        id: 20,
        ruangan: "Ruang Meeting I",
        peminjam: "Umi Kalsum",
        unit_kerja: "Bagian Quality",
        tanggal_pinjam: "2024-02-01",
        tanggal_kembali: "2024-02-01",
        waktu_mulai: "09:00",
        waktu_selesai: "11:00",
        status: "pending",
        keperluan: "Rapat Tim Quality"
      },
      {
        id: 21,
        ruangan: "Lab Komputer 9",
        peminjam: "Vina Panduwinata",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-02-02",
        tanggal_kembali: "2024-02-02",
        waktu_mulai: "14:00",
        waktu_selesai: "16:00",
        status: "completed",
        keperluan: "Pelatihan Blockchain"
      },
      {
        id: 22,
        ruangan: "Ruang Meeting J",
        peminjam: "Wahyu Nugroho",
        unit_kerja: "Bagian Admin",
        tanggal_pinjam: "2024-02-03",
        tanggal_kembali: "2024-02-03",
        waktu_mulai: "10:00",
        waktu_selesai: "12:00",
        status: "active",
        keperluan: "Rapat Tim Admin"
      }
    ]

    // Sample data for ATK requests
    const sampleAtkRequests = [
      {
        id: 1,
        item: "Kertas A4",
        jumlah: "5 rim",
        peminjam: "Dewi Kartika",
        unit_kerja: "Bagian Administrasi",
        tanggal_pinjam: "2024-01-15",
        tanggal_kembali: "2024-01-20",
        status: "active",
        keperluan: "Dokumentasi Proyek"
      },
      {
        id: 2,
        item: "Pulpen Hitam",
        jumlah: "20 pcs",
        peminjam: "Rizki Pratama",
        unit_kerja: "Bagian Produksi",
        tanggal_pinjam: "2024-01-16",
        tanggal_kembali: "2024-01-18",
        status: "pending",
        keperluan: "Pelatihan Staff"
      },
      {
        id: 3,
        item: "Binder A4",
        jumlah: "10 pcs",
        peminjam: "Maya Sari",
        unit_kerja: "Bagian Marketing",
        tanggal_pinjam: "2024-01-12",
        tanggal_kembali: "2024-01-12",
        status: "completed",
        keperluan: "Presentasi Klien"
      },
      {
        id: 4,
        item: "Stapler",
        jumlah: "3 pcs",
        peminjam: "Ahmad Rizki",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-17",
        tanggal_kembali: "2024-01-19",
        status: "active",
        keperluan: "Dokumentasi Sistem"
      },
      {
        id: 5,
        item: "Kertas HVS",
        jumlah: "10 rim",
        peminjam: "Siti Nurhaliza",
        unit_kerja: "Bagian HRD",
        tanggal_pinjam: "2024-01-18",
        tanggal_kembali: "2024-01-22",
        status: "pending",
        keperluan: "Formulir Karyawan"
      },
      {
        id: 6,
        item: "Pensil 2B",
        jumlah: "50 pcs",
        peminjam: "Budi Santoso",
        unit_kerja: "Bagian Training",
        tanggal_pinjam: "2024-01-19",
        tanggal_kembali: "2024-01-19",
        status: "completed",
        keperluan: "Ujian Karyawan"
      },
      {
        id: 7,
        item: "Map Folder",
        jumlah: "25 pcs",
        peminjam: "Eko Prasetyo",
        unit_kerja: "Bagian Keuangan",
        tanggal_pinjam: "2024-01-20",
        tanggal_kembali: "2024-01-24",
        status: "active",
        keperluan: "Arsip Laporan"
      },
      {
        id: 8,
        item: "Tinta Printer",
        jumlah: "4 cartridge",
        peminjam: "Fitri Ayu",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-21",
        tanggal_kembali: "2024-01-25",
        status: "pending",
        keperluan: "Print Dokumen"
      },
      {
        id: 9,
        item: "Kalkulator",
        jumlah: "2 pcs",
        peminjam: "Gunawan",
        unit_kerja: "Bagian Keuangan",
        tanggal_pinjam: "2024-01-22",
        tanggal_kembali: "2024-01-22",
        status: "completed",
        keperluan: "Perhitungan Budget"
      },
      {
        id: 10,
        item: "Pensil Warna",
        jumlah: "12 set",
        peminjam: "Hani Sari",
        unit_kerja: "Bagian Marketing",
        tanggal_pinjam: "2024-01-23",
        tanggal_kembali: "2024-01-26",
        status: "active",
        keperluan: "Presentasi Visual"
      },
      {
        id: 11,
        item: "Kertas Karton",
        jumlah: "20 lembar",
        peminjam: "Indra Kurniawan",
        unit_kerja: "Bagian Marketing",
        tanggal_pinjam: "2024-01-24",
        tanggal_kembali: "2024-01-27",
        status: "pending",
        keperluan: "Banner Promosi"
      },
      {
        id: 12,
        item: "Lem Kertas",
        jumlah: "5 pcs",
        peminjam: "Joko Widodo",
        unit_kerja: "Bagian Admin",
        tanggal_pinjam: "2024-01-25",
        tanggal_kembali: "2024-01-25",
        status: "completed",
        keperluan: "Dokumentasi Manual"
      },
      {
        id: 13,
        item: "Pensil Mekanik",
        jumlah: "15 pcs",
        peminjam: "Kartika Sari",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-26",
        tanggal_kembali: "2024-01-29",
        status: "active",
        keperluan: "Sketsa Sistem"
      },
      {
        id: 14,
        item: "Kertas Manila",
        jumlah: "30 lembar",
        peminjam: "Lina Marlina",
        unit_kerja: "Bagian Training",
        tanggal_pinjam: "2024-01-27",
        tanggal_kembali: "2024-01-30",
        status: "pending",
        keperluan: "Flipchart Training"
      },
      {
        id: 15,
        item: "Penghapus",
        jumlah: "20 pcs",
        peminjam: "Muhammad Ali",
        unit_kerja: "Bagian HRD",
        tanggal_pinjam: "2024-01-28",
        tanggal_kembali: "2024-01-28",
        status: "completed",
        keperluan: "Koreksi Formulir"
      },
      {
        id: 16,
        item: "Spidol Permanent",
        jumlah: "10 pcs",
        peminjam: "Nina Sari",
        unit_kerja: "Bagian Marketing",
        tanggal_pinjam: "2024-01-29",
        tanggal_kembali: "2024-02-01",
        status: "active",
        keperluan: "Label Produk"
      },
      {
        id: 17,
        item: "Kertas Stiker",
        jumlah: "50 lembar",
        peminjam: "Oscar Pratama",
        unit_kerja: "Bagian Operations",
        tanggal_pinjam: "2024-01-30",
        tanggal_kembali: "2024-02-02",
        status: "pending",
        keperluan: "Label Inventory"
      },
      {
        id: 18,
        item: "Pensil HB",
        jumlah: "30 pcs",
        peminjam: "Putri Maharani",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-31",
        tanggal_kembali: "2024-01-31",
        status: "completed",
        keperluan: "Sketsa Database"
      },
      {
        id: 19,
        item: "Kertas Origami",
        jumlah: "100 lembar",
        peminjam: "Qori Sandria",
        unit_kerja: "Bagian Sales",
        tanggal_pinjam: "2024-02-01",
        tanggal_kembali: "2024-02-03",
        status: "active",
        keperluan: "Dekorasi Event"
      },
      {
        id: 20,
        item: "Pensil Warna",
        jumlah: "24 set",
        peminjam: "Rizki Pratama",
        unit_kerja: "Bagian Marketing",
        tanggal_pinjam: "2024-02-02",
        tanggal_kembali: "2024-02-05",
        status: "pending",
        keperluan: "Desain Kreatif"
      },
      {
        id: 21,
        item: "Kertas Kado",
        jumlah: "40 lembar",
        peminjam: "Sari Dewi",
        unit_kerja: "Bagian HRD",
        tanggal_pinjam: "2024-02-03",
        tanggal_kembali: "2024-02-03",
        status: "completed",
        keperluan: "Hadiah Karyawan"
      },
      {
        id: 22,
        item: "Pensil Conte",
        jumlah: "8 set",
        peminjam: "Tono Wijaya",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-02-04",
        tanggal_kembali: "2024-02-06",
        status: "active",
        keperluan: "Sketsa Teknis"
      }
    ]

    // Sample data for equipment bookings
    const sampleEquipmentBookings = [
      {
        id: 1,
        alat: "Laptop Dell",
        spesifikasi: "i7, 16GB RAM",
        peminjam: "Andi Wijaya",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-15",
        tanggal_kembali: "2024-01-17",
        status: "active",
        keperluan: "Maintenance Server"
      },
      {
        id: 2,
        alat: "Proyektor Epson",
        spesifikasi: "3000 Lumens",
        peminjam: "Eka Putri",
        unit_kerja: "Bagian Training",
        tanggal_pinjam: "2024-01-16",
        tanggal_kembali: "2024-01-16",
        status: "pending",
        keperluan: "Presentasi Training"
      },
      {
        id: 3,
        alat: "Printer Canon",
        spesifikasi: "Laser Multifungsi",
        peminjam: "Fajar Nugroho",
        unit_kerja: "Bagian Keuangan",
        tanggal_pinjam: "2024-01-13",
        tanggal_kembali: "2024-01-13",
        status: "completed",
        keperluan: "Print Laporan Bulanan"
      },
      {
        id: 4,
        alat: "Monitor Samsung",
        spesifikasi: "24 inch 4K",
        peminjam: "Gita Sari",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-17",
        tanggal_kembali: "2024-01-19",
        status: "active",
        keperluan: "Development Work"
      },
      {
        id: 5,
        alat: "Kamera Canon",
        spesifikasi: "DSLR EOS 80D",
        peminjam: "Hendra Pratama",
        unit_kerja: "Bagian Marketing",
        tanggal_pinjam: "2024-01-18",
        tanggal_kembali: "2024-01-20",
        status: "pending",
        keperluan: "Foto Produk"
      },
      {
        id: 6,
        alat: "Scanner HP",
        spesifikasi: "A4 Flatbed",
        peminjam: "Indira Sari",
        unit_kerja: "Bagian Admin",
        tanggal_pinjam: "2024-01-19",
        tanggal_kembali: "2024-01-19",
        status: "completed",
        keperluan: "Digitalisasi Dokumen"
      },
      {
        id: 7,
        alat: "Router Cisco",
        spesifikasi: "Gigabit Switch",
        peminjam: "Joko Susilo",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-20",
        tanggal_kembali: "2024-01-22",
        status: "active",
        keperluan: "Network Setup"
      },
      {
        id: 8,
        alat: "Speaker JBL",
        spesifikasi: "Bluetooth Portable",
        peminjam: "Kartika Dewi",
        unit_kerja: "Bagian Training",
        tanggal_pinjam: "2024-01-21",
        tanggal_kembali: "2024-01-23",
        status: "pending",
        keperluan: "Presentasi Audio"
      },
      {
        id: 9,
        alat: "Tablet iPad",
        spesifikasi: "Pro 12.9 inch",
        peminjam: "Lina Marlina",
        unit_kerja: "Bagian Marketing",
        tanggal_pinjam: "2024-01-22",
        tanggal_kembali: "2024-01-22",
        status: "completed",
        keperluan: "Demo Produk"
      },
      {
        id: 10,
        alat: "Server HP",
        spesifikasi: "ProLiant DL380",
        peminjam: "Muhammad Ali",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-23",
        tanggal_kembali: "2024-01-25",
        status: "active",
        keperluan: "Data Center Setup"
      },
      {
        id: 11,
        alat: "Mikrofon Shure",
        spesifikasi: "SM58 Dynamic",
        peminjam: "Nina Sari",
        unit_kerja: "Bagian Training",
        tanggal_pinjam: "2024-01-24",
        tanggal_kembali: "2024-01-26",
        status: "pending",
        keperluan: "Recording Training"
      },
      {
        id: 12,
        alat: "UPS APC",
        spesifikasi: "1500VA",
        peminjam: "Oscar Pratama",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-25",
        tanggal_kembali: "2024-01-25",
        status: "completed",
        keperluan: "Backup Power"
      },
      {
        id: 13,
        alat: "Webcam Logitech",
        spesifikasi: "4K Pro",
        peminjam: "Putri Maharani",
        unit_kerja: "Bagian HRD",
        tanggal_pinjam: "2024-01-26",
        tanggal_kembali: "2024-01-28",
        status: "active",
        keperluan: "Video Conference"
      },
      {
        id: 14,
        alat: "Drone DJI",
        spesifikasi: "Mavic Air 2",
        peminjam: "Qori Sandria",
        unit_kerja: "Bagian Marketing",
        tanggal_pinjam: "2024-01-27",
        tanggal_kembali: "2024-01-29",
        status: "pending",
        keperluan: "Aerial Photography"
      },
      {
        id: 15,
        alat: "Harddisk External",
        spesifikasi: "2TB SSD",
        peminjam: "Rizki Pratama",
        unit_kerja: "Bagian IT",
        tanggal_pinjam: "2024-01-28",
        tanggal_kembali: "2024-01-28",
        status: "completed",
        keperluan: "Data Backup"
      },
      {
        id: 16,
        alat: "Smartboard",
        spesifikasi: "75 inch Interactive",
        peminjam: "Sari Dewi",
        unit_kerja: "Bagian Training",
        tanggal_pinjam: "2024-01-29",
        tanggal_kembali: "2024-01-31",
        status: "active",
        keperluan: "Interactive Training"
      },
      {
        id: 17,
        alat: "3D Printer",
        spesifikasi: "Creality Ender 3",
        peminjam: "Tono Wijaya",
        unit_kerja: "Bagian R&D",
        tanggal_pinjam: "2024-01-30",
        tanggal_kembali: "2024-02-01",
        status: "pending",
        keperluan: "Prototype Development"
      },
      {
        id: 18,
        alat: "Oscilloscope",
        spesifikasi: "Tektronix TBS1000",
        peminjam: "Umi Kalsum",
        unit_kerja: "Bagian Engineering",
        tanggal_pinjam: "2024-01-31",
        tanggal_kembali: "2024-01-31",
        status: "completed",
        keperluan: "Circuit Testing"
      },
      {
        id: 19,
        alat: "VR Headset",
        spesifikasi: "Oculus Quest 2",
        peminjam: "Vina Panduwinata",
        unit_kerja: "Bagian Training",
        tanggal_pinjam: "2024-02-01",
        tanggal_kembali: "2024-02-03",
        status: "active",
        keperluan: "VR Training"
      },
      {
        id: 20,
        alat: "Multimeter",
        spesifikasi: "Fluke 87V",
        peminjam: "Wahyu Nugroho",
        unit_kerja: "Bagian Maintenance",
        tanggal_pinjam: "2024-02-02",
        tanggal_kembali: "2024-02-04",
        status: "pending",
        keperluan: "Electrical Testing"
      },
      {
        id: 21,
        alat: "Generator",
        spesifikasi: "Honda EU2200i",
        peminjam: "Xena Putri",
        unit_kerja: "Bagian Operations",
        tanggal_pinjam: "2024-02-03",
        tanggal_kembali: "2024-02-03",
        status: "completed",
        keperluan: "Emergency Power"
      },
      {
        id: 22,
        alat: "Laser Cutter",
        spesifikasi: "Epilog Mini 24",
        peminjam: "Yoga Pratama",
        unit_kerja: "Bagian R&D",
        tanggal_pinjam: "2024-02-04",
        tanggal_kembali: "2024-02-06",
        status: "active",
        keperluan: "Prototype Cutting"
      }
    ]

    // Simulate API calls
    const fetchData = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setRoomBookings(sampleRoomBookings)
      setAtkRequests(sampleAtkRequests)
      setEquipmentBookings(sampleEquipmentBookings)
      setLoading(false)
    }
    fetchData()
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
      case 'active': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'AKTIF'
      case 'pending': return 'MENUNGGU'
      case 'completed': return 'SELESAI'
      case 'cancelled': return 'DIBATALKAN'
      default: return 'TIDAK DIKETAHUI'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'completed': return <RotateCcw className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'active': return 'border-l-green-500'
      case 'pending': return 'border-l-yellow-500'
      case 'completed': return 'border-l-blue-500'
      case 'cancelled': return 'border-l-red-500'
      default: return 'border-l-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Peminjaman...</h2>
          <p className="text-gray-300">Please wait while we fetch the latest data</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Package className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Peminjaman</h1>
                <p className="text-purple-200">IT, LAB, DAN SARANA DAN PRASARANA</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {currentTime.format('HH:mm')}
              </div>
              <div className="text-purple-200">
                {currentTime.format('dddd, DD MMMM YYYY')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 3 Columns */}
      <div className="w-full mx-auto px-4 py-4 h-[calc(100vh-100px)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          
          {/* Room Bookings Column */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 mb-3">
              <Building2 className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Peminjaman Ruangan</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 h-[calc(100%-50px)] overflow-y-auto">
              <AnimatePresence>
                {roomBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      ...(booking.status === 'active' ? {
                        boxShadow: [
                          "0 0 0px rgba(34, 197, 94, 0.3)",
                          "0 0 10px rgba(34, 197, 94, 0.6)",
                          "0 0 0px rgba(34, 197, 94, 0.3)"
                        ]
                      } : {})
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.02,
                      ...(booking.status === 'active' ? {
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      } : {})
                    }}
                    className={`bg-white/10 backdrop-blur-sm border-l-3 ${getStatusBorderColor(booking.status)} rounded-md p-2 hover:bg-white/20 transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xs font-bold text-white truncate">{booking.ruangan}</h3>
                      <motion.span 
                        className={`px-1.5 py-0.5 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(booking.status)}`}
                        animate={booking.status === 'active' ? {
                          opacity: [1, 0.3, 1],
                          scale: [1, 1.05, 1]
                        } : {}}
                        transition={booking.status === 'active' ? {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                      >
                        {getStatusIcon(booking.status)}
                        <span className="hidden sm:inline">{getStatusText(booking.status)}</span>
                      </motion.span>
                    </div>
                    <div className="space-y-0.5 text-xs text-gray-300">
                      <div className="flex items-center space-x-1">
                        <User className="w-2.5 h-2.5 text-blue-400 flex-shrink-0" />
                        <span className="truncate text-xs">{booking.peminjam}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-2.5 h-2.5 text-green-400 flex-shrink-0" />
                        <span className="text-xs">{dayjs(booking.tanggal_pinjam).format('DD/MM')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-2.5 h-2.5 text-purple-400 flex-shrink-0" />
                        <span className="text-xs">{booking.waktu_mulai}-{booking.waktu_selesai}</span>
                      </div>
                      <div className="text-gray-400 truncate text-xs">{booking.keperluan}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* ATK Requests Column */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 mb-3">
              <Package className="w-5 h-5 text-orange-400" />
              <h2 className="text-lg font-bold text-white">Pengambilan ATK</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 h-[calc(100%-50px)] overflow-y-auto">
              <AnimatePresence>
                {atkRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      ...(request.status === 'active' ? {
                        boxShadow: [
                          "0 0 0px rgba(34, 197, 94, 0.3)",
                          "0 0 10px rgba(34, 197, 94, 0.6)",
                          "0 0 0px rgba(34, 197, 94, 0.3)"
                        ]
                      } : {})
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.02,
                      ...(request.status === 'active' ? {
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      } : {})
                    }}
                    className={`bg-white/10 backdrop-blur-sm border-l-3 ${getStatusBorderColor(request.status)} rounded-md p-2 hover:bg-white/20 transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xs font-bold text-white truncate">{request.item}</h3>
                      <motion.span 
                        className={`px-1.5 py-0.5 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(request.status)}`}
                        animate={request.status === 'active' ? {
                          opacity: [1, 0.3, 1],
                          scale: [1, 1.05, 1]
                        } : {}}
                        transition={request.status === 'active' ? {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                      >
                        {getStatusIcon(request.status)}
                        <span className="hidden sm:inline">{getStatusText(request.status)}</span>
                      </motion.span>
                    </div>
                    <div className="space-y-0.5 text-xs text-gray-300">
                      <div className="flex items-center space-x-1">
                        <User className="w-2.5 h-2.5 text-blue-400 flex-shrink-0" />
                        <span className="truncate text-xs">{request.peminjam}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Package className="w-2.5 h-2.5 text-orange-400 flex-shrink-0" />
                        <span className="text-xs">{request.jumlah}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-2.5 h-2.5 text-green-400 flex-shrink-0" />
                        <span className="text-xs">{dayjs(request.tanggal_pinjam).format('DD/MM')}</span>
                      </div>
                      <div className="text-gray-400 truncate text-xs">{request.keperluan}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Equipment Bookings Column */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 mb-3">
              <Wrench className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Peminjaman Alat</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 h-[calc(100%-50px)] overflow-y-auto">
              <AnimatePresence>
                {equipmentBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      ...(booking.status === 'active' ? {
                        boxShadow: [
                          "0 0 0px rgba(34, 197, 94, 0.3)",
                          "0 0 10px rgba(34, 197, 94, 0.6)",
                          "0 0 0px rgba(34, 197, 94, 0.3)"
                        ]
                      } : {})
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.02,
                      ...(booking.status === 'active' ? {
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      } : {})
                    }}
                    className={`bg-white/10 backdrop-blur-sm border-l-3 ${getStatusBorderColor(booking.status)} rounded-md p-2 hover:bg-white/20 transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xs font-bold text-white truncate">{booking.alat}</h3>
                      <motion.span 
                        className={`px-1.5 py-0.5 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(booking.status)}`}
                        animate={booking.status === 'active' ? {
                          opacity: [1, 0.3, 1],
                          scale: [1, 1.05, 1]
                        } : {}}
                        transition={booking.status === 'active' ? {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                      >
                        {getStatusIcon(booking.status)}
                        <span className="hidden sm:inline">{getStatusText(booking.status)}</span>
                      </motion.span>
                    </div>
                    <div className="space-y-0.5 text-xs text-gray-300">
                      <div className="flex items-center space-x-1">
                        <User className="w-2.5 h-2.5 text-blue-400 flex-shrink-0" />
                        <span className="truncate text-xs">{booking.peminjam}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Wrench className="w-2.5 h-2.5 text-cyan-400 flex-shrink-0" />
                        <span className="truncate text-xs">{booking.spesifikasi}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-2.5 h-2.5 text-green-400 flex-shrink-0" />
                        <span className="text-xs">{dayjs(booking.tanggal_pinjam).format('DD/MM')}</span>
                      </div>
                      <div className="text-gray-400 truncate text-xs">{booking.keperluan}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Peminjaman