import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Users, Globe, Building2, Briefcase } from 'lucide-react';
import api from '../../libs/api';
import Marquee from '../../components/Marquee';

export default function COE() {
    // State untuk filter kategori (opsional, untuk interaksi masa depan)
    const [activeTab, setActiveTab] = useState('all');
    const [external, setExternal] = useState([]);
    const [internal, setInternal] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/event');
            const payload = response.data.data || response.data;

            const transformData = (items, type) => {
                if (!Array.isArray(items)) return [];
                return items.map((item, index) => {
                    // Logic to handle dates
                    let dateDisplay = '';
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                    // Helper to parse date safely
                    const parseDate = (d) => {
                        if (!d) return null;
                        const dateObj = new Date(d);
                        return isNaN(dateObj.getTime()) ? null : dateObj;
                    };

                    let tglMulai, tglSelesai;

                    if (type === 'internal') {
                        // Internal uses: tgl, end (from coes table)
                        tglMulai = parseDate(item.tgl);
                        tglSelesai = parseDate(item.end);
                    } else {
                        // External uses: tgl_mulai, tgl_selesai (from signages table)
                        tglMulai = parseDate(item.tgl_mulai);
                        tglSelesai = parseDate(item.tgl_selesai);
                    }

                    if (tglMulai && tglSelesai) {
                        if (tglMulai.getTime() === tglSelesai.getTime()) {
                            dateDisplay = `${tglMulai.getDate()} ${months[tglMulai.getMonth()]}`;
                        } else if (tglMulai.getMonth() === tglSelesai.getMonth()) {
                            dateDisplay = `${tglMulai.getDate()}-${tglSelesai.getDate()} ${months[tglMulai.getMonth()]}`;
                        } else {
                            dateDisplay = `${tglMulai.getDate()} ${months[tglMulai.getMonth()]} - ${tglSelesai.getDate()} ${months[tglSelesai.getMonth()]}`;
                        }
                    } else if (tglMulai) {
                        dateDisplay = `${tglMulai.getDate()} ${months[tglMulai.getMonth()]}`;
                    }

                    // Assign colors based on type or index
                    const colors = type === 'internal'
                        ? ["from-emerald-400 to-teal-500", "from-green-400 to-emerald-600", "from-teal-400 to-cyan-500"]
                        : ["from-blue-400 to-indigo-500", "from-indigo-400 to-violet-500", "from-sky-400 to-blue-600"];

                    // Check if event is currently ongoing
                    const now = new Date();
                    now.setHours(0, 0, 0, 0); // Reset to start of day for comparison
                    const isOngoing = tglMulai && tglSelesai && now >= tglMulai && now <= tglSelesai;

                    // Field mapping based on table structure
                    if (type === 'internal') {
                        // coes table fields
                        return {
                            id: item.id || Math.random(),
                            title: item.kegiatan || 'No Title',
                            date: dateDisplay || 'Date TBA',
                            location: item.lokasi || 'Headquarters',
                            category: item.nama || 'Internal',
                            status: item.status || 'Scheduled',
                            color: colors[index % colors.length],
                            isOngoing: isOngoing
                        };
                    } else {
                        // signages table fields
                        return {
                            id: item.id || Math.random(),
                            title: item.nama_kegiatan || item.acara || item.kegiatan || 'No Title',
                            date: dateDisplay || 'Date TBA',
                            location: item.tempat || item.lokasi || 'External Location',
                            category: item.kategori || item.pemohon || 'External',
                            desc: item.deskripsi || item.keterangan || '-',
                            status: item.status_kegiatan || item.status || 'Scheduled',
                            color: colors[index % colors.length],
                            isOngoing: isOngoing
                        };
                    }
                });
            };

            setInternal(transformData(payload.internal, 'internal'));
            setExternal(transformData(payload.external, 'external'));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white font-sans selection:bg-indigo-500/30 overflow-hidden flex flex-col">
            {/* Enhanced Background Gradients for TV */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-emerald-600/20 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <main className="flex-1 w-full h-full p-6 lg:p-8 flex flex-col overflow-hidden relative z-10">


                {/* Main Grid Content */}
                <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative pb-4">

                    {/* Divider Line */}
                    <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -ml-px z-20" />

                    {/* Left Column: Internal Events */}
                    <section className="flex flex-col h-full overflow-hidden">
                        <div className="flex-none flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10">
                                <Building2 size={24} strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Internal Agenda</h2>
                                    {internal.filter(e => e.isOngoing).length > 0 && (
                                        <span className="px-2 py-1 rounded-full bg-red-500/30 text-red-300 text-xs font-bold border border-red-500/60 animate-pulse shadow-md shadow-red-500/20">
                                            {internal.filter(e => e.isOngoing).length} SEDANG BERJALAN
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-neutral-400 font-medium">Kegiatan dalam perusahaan</p>
                            </div>
                        </div>

                        <div className="flex-1 relative overflow-hidden mask-gradient-b">
                            {loading ? (
                                <p className="text-sm text-neutral-400 animate-pulse mt-4">Loading internal schedule...</p>
                            ) : internal.length > 0 ? (
                                <Marquee
                                    direction="up"
                                    className="h-full w-full"
                                    pauseOnHover={true}
                                    speed={10}
                                    gradient={false}
                                >
                                    <div className="flex flex-col gap-3 w-full py-2">
                                        {internal.map((event) => (
                                            <EventCard key={event.id} data={event} type="internal" />
                                        ))}
                                    </div>
                                </Marquee>
                            ) : (
                                <p className="text-sm text-neutral-400 italic mt-4">No upcoming internal events.</p>
                            )}
                        </div>
                    </section>

                    {/* Right Column: External Events */}
                    <section className="flex flex-col h-full overflow-hidden">
                        <div className="flex-none flex items-center gap-3 mb-6 lg:flex-row-reverse lg:text-right">
                            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/40 text-indigo-400 shadow-lg shadow-indigo-500/10">
                                <Globe size={24} strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 lg:justify-end mb-1">
                                    <h2 className="text-xl lg:text-2xl font-bold tracking-tight">External Agenda</h2>
                                    {external.filter(e => e.isOngoing).length > 0 && (
                                        <span className="px-2 py-1 rounded-full bg-red-500/30 text-red-300 text-xs font-bold border border-red-500/60 animate-pulse shadow-md shadow-red-500/20">
                                            {external.filter(e => e.isOngoing).length} LIVE
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-neutral-400 font-medium">Kunjungan, Event & Client</p>
                            </div>
                        </div>

                        <div className="flex-1 relative overflow-hidden mask-gradient-b">
                            {loading ? (
                                <p className="text-sm text-neutral-400 animate-pulse mt-4 lg:text-right">Loading external schedule...</p>
                            ) : external.length > 0 ? (
                                <Marquee
                                    direction="up"
                                    className="h-full w-full"
                                    pauseOnHover={true}
                                    speed={30}
                                    gradient={false}
                                >
                                    <div className="flex flex-col gap-4 w-full py-3">
                                        {external.map((event) => (
                                            <EventCard key={event.id} data={event} type="external" />
                                        ))}
                                    </div>
                                </Marquee>
                            ) : (
                                <p className="text-sm text-neutral-400 italic mt-4 lg:text-right">No upcoming external events.</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}



// Event Card Component
function EventCard({ data, type }) {
    const isInternal = type === 'internal';
    const accentColor = isInternal ? 'group-hover:border-emerald-500/50' : 'group-hover:border-indigo-500/50';
    const iconColor = isInternal ? 'text-emerald-400' : 'text-indigo-400';
    const badgeBg = isInternal ? 'bg-emerald-950/30 text-emerald-300' : 'bg-indigo-950/30 text-indigo-300';

    // Styling for ongoing events
    const ongoingBorder = data.isOngoing
        ? (isInternal ? 'border-emerald-500/70 shadow-emerald-500/20' : 'border-indigo-500/70 shadow-indigo-500/20')
        : 'border-white/5';
    const ongoingBg = data.isOngoing ? 'bg-neutral-900/80' : 'bg-neutral-900/50';
    const ongoingShadow = data.isOngoing ? 'shadow-xl' : '';

    return (
        <div className={`group relative w-full p-4 rounded-2xl ${ongoingBg} border-2 ${ongoingBorder} ${ongoingShadow} ${accentColor} transition-all duration-300 hover:bg-neutral-900 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden ${data.isOngoing ? 'animate-pulse-border' : ''}`}>

            {/* Glow Effect */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${data.color} opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-500`} />

            {/* Ongoing Event Glow */}
            {data.isOngoing && (
                <div className={`absolute inset-0 bg-gradient-to-br ${isInternal ? 'from-emerald-500/10' : 'from-indigo-500/10'} to-transparent blur-xl animate-pulse`} />
            )}

            <div className="flex gap-4 items-start relative z-10">
                {/* Date Block */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors p-1.5">
                    {data.date.includes('-') && data.date.length > 10 ? (
                        // Layout untuk Range Lintas Bulan (2 baris)
                        <>
                            <span className={`text-[10px] font-bold uppercase tracking-wider leading-tight ${isInternal ? 'text-emerald-500' : 'text-indigo-500'}`}>
                                {data.date.split('-')[0].trim()}
                            </span>
                            <div className="w-8 h-[1px] bg-white/20 my-1"></div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider leading-tight ${isInternal ? 'text-emerald-500' : 'text-indigo-500'}`}>
                                {data.date.split('-')[1].trim()}
                            </span>
                        </>
                    ) : (
                        // Layout Normal (1 Bulan)
                        <>
                            <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isInternal ? 'text-emerald-500' : 'text-indigo-500'}`}>
                                {data.date.includes('-') ? data.date.split(' ').slice(1).join(' ') : data.date.split(' ')[1]}
                            </span>
                            <span className="text-base font-bold text-white text-center leading-tight px-1">
                                {data.date.includes('-') ? data.date.split(' ')[0] : data.date.split(' ')[0]}
                            </span>
                        </>
                    )}
                </div>

                {/* Content */}
                <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-md text-[8px] uppercase font-bold tracking-wider ${badgeBg}`}>
                            {data.category}
                        </span>
                        {data.isOngoing && (
                            <span className="relative px-2 py-0.5 rounded-md text-[8px] uppercase font-bold tracking-wider bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse">
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                                <span className="relative">● LIVE NOW</span>
                            </span>
                        )}
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all">
                        {data.title}
                    </h3>

                    {data.status && (
                        <div className="mb-3">
                            <span className="px-2 py-0.5 rounded-md text-[8px] uppercase font-bold tracking-wider bg-neutral-800/50 text-neutral-300 border border-white/10">
                                {data.status}
                            </span>
                        </div>
                    )}

                    <p className="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                        {data.desc}
                    </p>

                    <div className={`flex items-center gap-2 text-xs font-medium ${iconColor} opacity-80 group-hover:opacity-100`}>
                        <MapPin size={14} />
                        <span>{data.location}</span>
                        <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                </div>
            </div>
        </div>
    );
}