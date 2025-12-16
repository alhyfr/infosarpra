import React, { useState, useEffect, useCallback } from 'react';
import Marquee from '../../components/Marquee';
import { User, Clock, HouseWifi, Building2 } from 'lucide-react';
import dayjs from 'dayjs';
import api from '../../libs/api';

export default function PinjamRuangan() {
    const [ruangan, setRuangan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRuangan = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get("/pinjam-ruangan");
            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];
            setRuangan(data);
            console.log("Data ruangan:", data);
        } catch (error) {
            console.error("Error fetching ruangan:", error);
            setRuangan([]);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getRuangan();
    }, [getRuangan]);

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
                getRuangan();
            }
        };

        ws.onclose = () => {
            console.log("WebSocket Disconnected");
        };

        return () => {
            ws.close();
        };
    }, [getRuangan]);

    useEffect(() => {
        const interval = setInterval(() => {
            getRuangan();
        }, 60000);
        return () => clearInterval(interval);
    }, [getRuangan]);

    const getStatusByTime = (tanggalPinjam, waktuMulai, waktuSelesai) => {
        if (!tanggalPinjam || (!waktuMulai && !waktuSelesai)) {
            return null;
        }
        const now = dayjs();
        const tanggal = dayjs(tanggalPinjam);
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

        if (waktuEnd && now.isAfter(waktuEnd)) {
            return "selesai";
        }

        if (waktuStart && waktuEnd && now.isAfter(waktuStart) && now.isBefore(waktuEnd)) {
            return "on going";
        }

        if (waktuStart && now.isBefore(waktuStart)) {
            return "coming soon";
        }

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

    const loans = ruangan.map((booking, index) => {
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

        const statusByTime = getStatusByTime(tanggalPinjam, waktuMulai, waktuSelesai);
        const statusFromApi = booking.status || booking.status_peminjaman;
        const status = statusByTime || statusFromApi || "pending";

        const timeDisplay = waktuMulai && waktuSelesai
            ? `${waktuMulai} - ${waktuSelesai}`
            : waktuMulai
            ? `${waktuMulai} -`
            : waktuSelesai
            ? `- ${waktuSelesai}`
            : "";

        let statusText = "Akan Datang";
        if (status === "on going" || status === "active" || status === "aktif" || status === "ongoing") {
            statusText = "Sedang Berlangsung";
        } else if (status === "selesai" || status === "completed" || status === "done" || status === "finished") {
            statusText = "Selesai";
        } else if (status === "coming soon") {
            statusText = "Akan Datang";
        }

        return {
            id: booking.id || booking.id_peminjaman || index + 1,
            room: ruanganNama,
            time: timeDisplay,
            activity: keperluan,
            status: statusText,
            pic: peminjam,
            isActive: status === "on going" || status === "active" || status === "aktif" || status === "ongoing",
        };
    });

    const extendedLoans = loans.length > 0 ? [...loans, ...loans, ...loans, ...loans] : [];

    if (loading) {
        return (
            <div className="h-full w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full mx-auto mb-3 animate-spin"></div>
                    <h2 className="text-base font-bold text-white mb-2">Loading Data...</h2>
                </div>
            </div>
        );
    }

    if (error && loans.length === 0) {
        return (
            <div className="h-full w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-base font-bold text-white mb-2">Failed to Load Data</h2>
                    <p className="text-white/80 text-xs">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-2 shadow-lg overflow-hidden flex flex-col font-sans">
            {/* Header - SMALLER */}
            <div className="flex justify-between items-center mb-2 border-b border-slate-100 pb-1.5 shadow-lg">
                <h2 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <HouseWifi className="text-white" size={16} />
                    <span className="text-white">
                        Peminjaman Ruangan
                    </span>
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full border border-slate-200">
                    {dayjs().format('dddd, DD MMMM YYYY')}
                </span>
            </div>

            {/* Marquee Container */}
            {loans.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-white/80 text-xs">Tidak ada data peminjaman ruangan</p>
                </div>
            ) : (
                <div className="flex-1 min-h-0 w-full overflow-hidden relative">
                    <Marquee
                        direction="up"
                        speed={10}
                        pauseOnHover={true}
                        className="h-full"
                    >
                        <div className="w-full px-1.5">
                            <div className="grid grid-cols-1 gap-1.5">
                                {extendedLoans.map((loan, index) => (
                                    <div key={`${loan.id}-${index}`} className="relative">
                                        {/* Card - SMALLER HEIGHT */}
                                        <div className="relative flex flex-row h-12 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                            {/* Top Status Bar - THINNER */}
                                            <div 
                                                className={`absolute top-0 left-0 w-full h-0.5 ${
                                                    loan.isActive
                                                        ? 'bg-red-500' 
                                                        : loan.status === 'Selesai'
                                                        ? 'bg-green-500'
                                                        : 'bg-amber-500'
                                                }`}
                                            />

                                            {/* Left Section - Icon - SMALLER */}
                                            <div 
                                                className={`w-10 flex items-center justify-center ${
                                                    loan.isActive
                                                        ? 'bg-red-500' 
                                                        : loan.status === 'Selesai'
                                                        ? 'bg-green-500'
                                                        : 'bg-amber-500'
                                                }`}
                                            >
                                                <Building2 className="text-white w-5 h-5" strokeWidth={2.5} />
                                            </div>

                                            {/* Right Section - Info - SMALLER TEXT */}
                                            <div className="flex-1 bg-white p-1.5 flex flex-col justify-between">
                                                {/* Room Name - SMALLER */}
                                                <h3 className="text-[10px] font-bold uppercase text-gray-800 truncate leading-tight">
                                                    {loan.room}
                                                </h3>

                                                {/* Activity - SMALLER */}
                                                <p className="text-[9px] text-gray-600 truncate leading-tight">
                                                    {loan.activity}
                                                </p>

                                                {/* Bottom Info Bar - SMALLER */}
                                                <div className="flex items-center gap-1 text-gray-500">
                                                    {loan.time && (
                                                        <>
                                                            <div className="flex items-center gap-0.5">
                                                                <Clock className="w-2.5 h-2.5" />
                                                                <span className="text-[9px] font-medium">{loan.time}</span>
                                                            </div>
                                                            <span className="text-[9px]">|</span>
                                                        </>
                                                    )}
                                                    <div className="flex items-center gap-0.5 flex-1 min-w-0">
                                                        <User className="w-2.5 h-2.5" />
                                                        <span className="text-[9px] font-medium truncate">{loan.pic}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Marquee>
                </div>
            )}
        </div>
    );
}