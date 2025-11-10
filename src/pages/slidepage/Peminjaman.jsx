import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  RotateCcw,
} from "lucide-react";
import dayjs from "dayjs";
import api from "../../libs/api";

const Peminjaman = () => {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [ruangan, setRuangan] = useState([]);
  const [atk, setAtk] = useState([]);
  const[pinjamAlat, setPinjamAlat] = useState([]);

  const getRuangan = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/pinjam-ruangan");
      // Pastikan response.data adalah array
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setRuangan(data);
      console.log("Data ruangan:", data);
    } catch (error) {
      console.error("Error fetching ruangan:", error);
      setRuangan([]); // Set empty array jika error
    } finally {
      setLoading(false);
    }
  }, []);
  const getAtk = useCallback(async () => {
    try {
      const response = await api.get("/ambil-atk");
      // Pastikan response.data adalah array
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setAtk(data);
      console.log("Data ATK:", data);
    } catch (error) {
      console.error("Error fetching ATK:", error);
      setAtk([]); // Set empty array jika error
    }
  }, []);
  const getPinjamAlat = useCallback(async () => {
    try {
      const response = await api.get("/pinjam-alat");
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setPinjamAlat(data);
      console.log("Data Pinjam Alat:", data);
    } catch (error) {
      console.error("Error fetching Pinjam Alat:", error);
      setPinjamAlat([]); // Set empty array jika error
    }
  }, []);
  

  useEffect(() => {
    getRuangan();
    getAtk();
    getPinjamAlat();
  }, [getRuangan, getAtk, getPinjamAlat]);

  useEffect(() => {
    const websocketUrl =
      process.env.REACT_APP_WEBSOCKET_URL || "wss://api7.sistelk.id";
    const ws = new WebSocket(websocketUrl);
    ws.onopen = () => {
      console.log("WebSocket Connected");
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "pinruanganUpdated") {
        getRuangan(); // Trigger refresh polling
      }
      if (msg.type === "atkPinjamUpdated") {
        getAtk(); // Trigger refresh polling untuk ATK
      }
      if (msg.type === "pinbarUpdated") {
        getPinjamAlat(); // Trigger refresh polling untuk Pinjam Alat
      }
    };
    ws.onclose = () => {
      console.log("WebSocket Disconnected");
    };
    return () => {
      ws.close();
    };
  }, [getRuangan, getAtk, getPinjamAlat]);
  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk menentukan status berdasarkan waktu
  const getStatusByTime = (tanggalPinjam, waktuMulai, waktuSelesai) => {
    if (!tanggalPinjam || (!waktuMulai && !waktuSelesai)) {
      return null; // Tidak bisa menentukan status jika tidak ada tanggal/waktu
    }

    const now = dayjs();
    const tanggal = dayjs(tanggalPinjam);

    // Jika ada waktu mulai dan selesai, gabungkan dengan tanggal
    let waktuStart = null;
    let waktuEnd = null;

    if (waktuMulai) {
      const [jamMulai, menitMulai] = waktuMulai.split(":");
      waktuStart = tanggal
        .hour(parseInt(jamMulai) || 0)
        .minute(parseInt(menitMulai) || 0)
        .second(0);
    }

    if (waktuSelesai) {
      const [jamSelesai, menitSelesai] = waktuSelesai.split(":");
      waktuEnd = tanggal
        .hour(parseInt(jamSelesai) || 23)
        .minute(parseInt(menitSelesai) || 59)
        .second(59);
    }

    // Jika waktu selesai sudah lewat
    if (waktuEnd && now.isAfter(waktuEnd)) {
      return "selesai";
    }

    // Jika sedang berlangsung (waktu sekarang di antara waktu mulai dan selesai)
    if (
      waktuStart &&
      waktuEnd &&
      now.isAfter(waktuStart) &&
      now.isBefore(waktuEnd)
    ) {
      return "on going";
    }

    // Jika waktu mulai belum tiba
    if (waktuStart && now.isBefore(waktuStart)) {
      return "coming soon";
    }

    // Fallback: jika hanya ada tanggal tanpa waktu, cek berdasarkan tanggal saja
    if (!waktuStart && !waktuEnd) {
      if (now.isAfter(tanggal.endOf("day"))) {
        return "selesai";
      } else if (now.isBefore(tanggal.startOf("day"))) {
        return "coming soon";
      } else {
        return "on going";
      }
    }

    return null;
  };

  const getStatusColor = (status) => {
    const statusLower = String(status).toLowerCase();
    switch (statusLower) {
      case "active":
      case "aktif":
      case "approved":
      case "disetujui":
      case "on going":
      case "ongoing":
        return "text-green-600 bg-green-100";
      case "pending":
      case "menunggu":
      case "waiting":
      case "coming soon":
        return "text-yellow-600 bg-yellow-100";
      case "completed":
      case "selesai":
      case "done":
      case "finished":
        return "text-blue-600 bg-blue-100";
      case "cancelled":
      case "dibatalkan":
      case "canceled":
        return "text-red-600 bg-red-100";
      case "rejected":
      case "ditolak":
        return "text-red-600 bg-red-100";
      case "belum kembali":
      case "not returned":
        return "text-orange-600 bg-orange-100";
      case "proses peminjaman":
      case "borrowing":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status) => {
    const statusLower = String(status).toLowerCase();
    switch (statusLower) {
      case "active":
      case "aktif":
      case "approved":
      case "disetujui":
      case "on going":
      case "ongoing":
        return "BERLANGSUNG";
      case "pending":
      case "menunggu":
      case "waiting":
        return "MENUNGGU";
      case "coming soon":
        return "SEGERA";
      case "completed":
      case "selesai":
      case "done":
      case "finished":
        return "SELESAI";
      case "cancelled":
      case "dibatalkan":
      case "canceled":
        return "DIBATALKAN";
      case "rejected":
      case "ditolak":
        return "DITOLAK";
      case "belum kembali":
      case "not returned":
        return "BELUM KEMBALI";
      case "proses peminjaman":
      case "borrowing":
        return "PROSES PINJAM";
      default:
        return "BELUM KEMBALI";
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = String(status).toLowerCase();
    switch (statusLower) {
      case "active":
      case "aktif":
      case "approved":
      case "disetujui":
      case "on going":
      case "ongoing":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
      case "menunggu":
      case "waiting":
      case "coming soon":
        return <Clock className="w-4 h-4" />;
      case "completed":
      case "selesai":
      case "done":
      case "finished":
        return <RotateCcw className="w-4 h-4" />;
      case "cancelled":
      case "dibatalkan":
      case "canceled":
      case "rejected":
      case "ditolak":
        return <XCircle className="w-4 h-4" />;
      case "belum kembali":
      case "not returned":
        return <AlertTriangle className="w-4 h-4" />;
      case "proses peminjaman":
      case "borrowing":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusBorderColor = (status) => {
    const statusLower = String(status).toLowerCase();
    switch (statusLower) {
      case "active":
      case "aktif":
      case "approved":
      case "disetujui":
      case "on going":
      case "ongoing":
        return "border-l-green-500";
      case "pending":
      case "menunggu":
      case "waiting":
      case "coming soon":
        return "border-l-yellow-500";
      case "completed":
      case "selesai":
      case "done":
      case "finished":
        return "border-l-blue-500";
      case "cancelled":
      case "dibatalkan":
      case "canceled":
      case "rejected":
      case "ditolak":
        return "border-l-red-500";
      case "belum kembali":
      case "not returned":
        return "border-l-orange-500";
      case "proses peminjaman":
      case "borrowing":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

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
          <h2 className="text-2xl font-bold text-white mb-2">
            Loading Peminjaman...
          </h2>
          <p className="text-gray-300">
            Please wait while we fetch the latest data
          </p>
        </motion.div>
      </div>
    );
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
                <p className="text-purple-200">
                  IT, LAB, DAN SARANA DAN PRASARANA
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {currentTime.format("HH:mm")}
              </div>
              <div className="text-purple-200">
                {currentTime.format("dddd, DD MMMM YYYY")}
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
              <h2 className="text-lg font-bold text-white">
                Peminjaman Ruangan
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 h-[calc(100%-50px)] overflow-y-auto">
              <AnimatePresence>
                {ruangan.length === 0 && !loading ? (
                  <div className="col-span-2 text-center text-gray-400 py-8">
                    <p>Tidak ada data peminjaman ruangan</p>
                  </div>
                ) : (
                  ruangan.map((booking, index) => {
                    // Mapping data dari API ke format yang diharapkan
                    const ruanganNama =
                      booking.ruangan ||
                      booking.nama_ruangan ||
                      booking.ruangan_nama ||
                      "-";
                    const peminjam =
                      booking.peminjam ||
                      booking.nama_peminjam ||
                      booking.user_nama ||
                      "-";
                    const tanggalPinjam =
                      booking.tgl ||
                      booking.tanggal ||
                      booking.tgl_pinjam ||
                      "";
                    const waktuMulai =
                      booking.waktu_mulai ||
                      booking.jam_mulai ||
                      booking.waktu_start ||
                      "";
                    const waktuSelesai =
                      booking.waktu_selesai ||
                      booking.jam_selesai ||
                      booking.waktu_end ||
                      "";
                    const keperluan =
                      booking.kegiatan ||
                      booking.keterangan ||
                      booking.alasan ||
                      "-";

                    // Tentukan status berdasarkan waktu atau dari API
                    const statusByTime = getStatusByTime(
                      tanggalPinjam,
                      waktuMulai,
                      waktuSelesai
                    );
                    const statusFromApi =
                      booking.status || booking.status_peminjaman;
                    // Prioritaskan status berdasarkan waktu jika tersedia, jika tidak gunakan dari API
                    const status = statusByTime || statusFromApi || "pending";

                    return (
                  <motion.div
                        key={booking.id || booking.id_peminjaman || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                          ...(status === "active" ||
                          status === "aktif" ||
                          status === "approved" ||
                          status === "on going" ||
                          status === "ongoing"
                            ? {
                        boxShadow: [
                          "0 0 0px rgba(34, 197, 94, 0.3)",
                          "0 0 10px rgba(34, 197, 94, 0.6)",
                                  "0 0 0px rgba(34, 197, 94, 0.3)",
                                ],
                              }
                            : {}),
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.02,
                          ...(status === "active" ||
                          status === "aktif" ||
                          status === "approved" ||
                          status === "on going" ||
                          status === "ongoing"
                            ? {
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                                  ease: "easeInOut",
                                },
                        }
                            : {}),
                    }}
                        className={`bg-white/10 backdrop-blur-sm border-l-3 ${getStatusBorderColor(
                          status
                        )} rounded-md p-2 hover:bg-white/20 transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xs font-bold text-white truncate">
                            {ruanganNama}
                          </h3>
                      <motion.span 
                            className={`px-1.5 py-0.5 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(
                              status
                            )}`}
                            animate={
                              status === "active" ||
                              status === "aktif" ||
                              status === "approved" ||
                              status === "on going" ||
                              status === "ongoing"
                                ? {
                          opacity: [1, 0.3, 1],
                                    scale: [1, 1.05, 1],
                                  }
                                : {}
                            }
                            transition={
                              status === "active" ||
                              status === "aktif" ||
                              status === "approved" ||
                              status === "on going" ||
                              status === "ongoing"
                                ? {
                          duration: 1.5,
                          repeat: Infinity,
                                    ease: "easeInOut",
                                  }
                                : {}
                            }
                          >
                            {getStatusIcon(status)}
                            <span className="hidden sm:inline">
                              {getStatusText(status)}
                            </span>
                      </motion.span>
                    </div>
                    <div className="space-y-0.5 text-xs text-gray-300">
                      <div className="flex items-center space-x-1">
                        <User className="w-2.5 h-2.5 text-blue-400 flex-shrink-0" />
                            <span className="truncate text-xs">{peminjam}</span>
                      </div>
                          {tanggalPinjam && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-2.5 h-2.5 text-green-400 flex-shrink-0" />
                              <span className="text-xs">
                                {dayjs(tanggalPinjam).format("DD/MM")}
                              </span>
                      </div>
                          )}
                          {(waktuMulai || waktuSelesai) && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-2.5 h-2.5 text-purple-400 flex-shrink-0" />
                              <span className="text-xs">
                                {waktuMulai}
                                {waktuMulai && waktuSelesai ? "-" : ""}
                                {waktuSelesai}
                              </span>
                      </div>
                          )}
                          {keperluan && (
                            <div className="text-gray-400 truncate text-xs">
                              {keperluan}
                            </div>
                          )}
                    </div>
                  </motion.div>
                    );
                  })
                )}
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
                {atk.length === 0 && !loading ? (
                  <div className="col-span-2 text-center text-gray-400 py-8">
                    <p>Tidak ada data pengambilan ATK</p>
                  </div>
                ) : (
                  atk.map((request, index) => {
                    // Mapping data dari API ke format yang diharapkan
                    const jumlah = request.vol || request.qty || request.quantity || "-";
                    const peminjam = request.pengambil|| request.nama_peminjam || request.user_nama || "-";
                    const tanggalPinjam = request.tanggal_pinjam || request.tanggal || request.tgl || request.tgl_pinjam || "";
                    const keperluan = request.peruntukan || request.keterangan || request.alasan || "-";
                    const status = request.status || request.status_pengambilan || "pending";

                    return (
                  <motion.div
                        key={request.id || request.id_pengambilan || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                          ...(status === "active" ||
                          status === "aktif" ||
                          status === "approved" ||
                          status === "disetujui"
                            ? {
                        boxShadow: [
                          "0 0 0px rgba(34, 197, 94, 0.3)",
                          "0 0 10px rgba(34, 197, 94, 0.6)",
                                  "0 0 0px rgba(34, 197, 94, 0.3)",
                                ],
                              }
                            : {}),
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.02,
                          ...(status === "active" ||
                          status === "aktif" ||
                          status === "approved" ||
                          status === "disetujui"
                            ? {
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                                  ease: "easeInOut",
                                },
                        }
                            : {}),
                    }}
                        className={`bg-white/10 backdrop-blur-sm border-l-3 ${getStatusBorderColor(
                          status
                        )} rounded-md p-2 hover:bg-white/20 transition-all duration-300`}
                  >
                    
                    <div className="space-y-0.5 text-xs text-gray-300">
                      <div className="flex items-center space-x-1">
                        <User className="w-2.5 h-2.5 text-blue-400 flex-shrink-0" />
                            <span className="truncate text-xs">
                              {peminjam}
                            </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Package className="w-2.5 h-2.5 text-orange-400 flex-shrink-0" />
                            <span className="text-xs">{jumlah}</span>
                      </div>
                          {tanggalPinjam && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-2.5 h-2.5 text-green-400 flex-shrink-0" />
                              <span className="text-xs">
                                {dayjs(tanggalPinjam).format("DD/MM")}
                              </span>
                      </div>
                          )}
                          {keperluan && (
                            <div className="text-gray-400 truncate text-xs">
                              {keperluan}
                            </div>
                          )}
                    </div>
                  </motion.div>
                    );
                  })
                )}
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
                {pinjamAlat.length === 0 && !loading ? (
                  <div className="col-span-2 text-center text-gray-400 py-8">
                    <p>Tidak ada data peminjaman alat</p>
                  </div>
                ) : (
                  pinjamAlat.map((booking, index) => {
                    // Mapping data dari API ke format yang diharapkan
                    const alat = booking.nabar || "-";
                    const spesifikasi = booking.spesifikasi || booking.spek || booking.deskripsi || "-";
                    const peminjam = booking.name || "-";
                    const tanggalPinjam = booking.tgl_pinjam || "";
                    const tanggalKembali = booking.tgl_kembali || null;
                    const keperluan = booking.peruntukan || booking.keterangan || booking.alasan || "-";
                    
                    // Tentukan status berdasarkan tanggal kembali
                    // Jika tanggal kembali terisi = "selesai", jika tidak terisi = "belum kembali"
                    const status = tanggalKembali && tanggalKembali !== null && tanggalKembali !== "" 
                      ? "selesai" 
                      : "belum kembali";

                    return (
                  <motion.div
                        key={booking.id || booking.id_peminjaman || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                          ...(status === "active" ||
                          status === "aktif" ||
                          status === "approved" ||
                          status === "disetujui" ||
                          status === "proses peminjaman"
                            ? {
                        boxShadow: [
                          "0 0 0px rgba(34, 197, 94, 0.3)",
                          "0 0 10px rgba(34, 197, 94, 0.6)",
                                  "0 0 0px rgba(34, 197, 94, 0.3)",
                                ],
                              }
                            : {}),
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.02,
                          ...(status === "active" ||
                          status === "aktif" ||
                          status === "approved" ||
                          status === "disetujui" ||
                          status === "proses peminjaman"
                            ? {
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                                  ease: "easeInOut",
                                },
                        }
                            : {}),
                    }}
                        className={`bg-white/10 backdrop-blur-sm border-l-3 ${getStatusBorderColor(
                          status
                        )} rounded-md p-2 hover:bg-white/20 transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xs font-bold text-white truncate">
                            {alat}
                          </h3>
                      <motion.span 
                            className={`px-1.5 py-0.5 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(
                              status
                            )}`}
                            animate={
                              status === "active" ||
                              status === "aktif" ||
                              status === "approved" ||
                              status === "disetujui" ||
                              status === "proses peminjaman"
                                ? {
                          opacity: [1, 0.3, 1],
                                    scale: [1, 1.05, 1],
                                  }
                                : {}
                            }
                            transition={
                              status === "active" ||
                              status === "aktif" ||
                              status === "approved" ||
                              status === "disetujui" ||
                              status === "proses peminjaman"
                                ? {
                          duration: 1.5,
                          repeat: Infinity,
                                    ease: "easeInOut",
                                  }
                                : {}
                            }
                          >
                            {getStatusIcon(status)}
                            <span className="hidden sm:inline">
                              {getStatusText(status)}
                            </span>
                      </motion.span>
                    </div>
                    <div className="space-y-0.5 text-xs text-gray-300">
                      <div className="flex items-center space-x-1">
                        <User className="w-2.5 h-2.5 text-blue-400 flex-shrink-0" />
                            <span className="truncate text-xs">
                              {peminjam}
                            </span>
                      </div>
                          
                          {tanggalPinjam && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-2.5 h-2.5 text-green-400 flex-shrink-0" />
                              <span className="text-xs">
                                {dayjs(tanggalPinjam).format("DD/MM")}
                              </span>
                      </div>
                          )}
                          {keperluan && (
                            <div className="text-gray-400 truncate text-xs">
                              {keperluan}
                            </div>
                          )}
                    </div>
                  </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Peminjaman;
