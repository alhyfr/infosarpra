import React, { useState, useEffect, useCallback } from "react";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import api from "../../libs/api";

const storageBaseUrl = "https://api7.sistelk.id/api/storage/";

export default function Team() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  const getTeam = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/teams");
      if (response.data && response.data.data) {
        setTeamData(response.data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching team:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTeam();
  }, [getTeam]);

  useEffect(() => {
    const websocketUrl =
      process.env.REACT_APP_WEBSOCKET_URL || "wss://api7.sistelk.id";
    const ws = new WebSocket(websocketUrl);

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "teamUpdated") {
        getTeam();
      }
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      ws.close();
    };
  }, [getTeam]);

  useEffect(() => {
    if (teamData.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamData.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [teamData.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      getTeam();
    }, 60000);
    return () => clearInterval(interval);
  }, [getTeam]);

  if (loading) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-14 h-14 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-lg font-bold text-white mb-2">
            Loading Team Data...
          </h2>
        </motion.div>
      </div>
    );
  }

  if (error && teamData.length === 0) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-bold text-white mb-2">
            Failed to Load Data
          </h2>
          <p className="text-white/80 text-sm">{error}</p>
        </motion.div>
      </div>
    );
  }

  const currentMember = teamData[currentIndex];

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-3 lg:p-4 shadow-lg overflow-hidden flex flex-col font-sans relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>

      {/* Header - Compact */}
      <motion.div
        className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm lg:text-base font-bold text-white flex items-center gap-2">
          <Users className="text-blue-400" size={18} />
          <span>IT, LAB, & SARPRA</span>
        </h2>
        {teamData.length > 0 && (
          <div className="text-white/80 text-xs font-medium">
            {currentIndex + 1} / {teamData.length}
          </div>
        )}
      </motion.div>

      {/* Main Content - FILLS ALL SPACE */}
      <div className="flex-1 flex items-center justify-center relative z-10 min-h-0">
        {teamData.length > 0 && currentMember ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full flex flex-col"
            >
              {/* Card with LARGE PHOTO and TEXT OVERLAY */}
              <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl border border-white/20">
                {/* Background Photo - FULL SIZE */}
                <motion.img
                  src={
                    currentMember?.foto
                      ? storageBaseUrl + currentMember.foto
                      : ""
                  }
                  alt={currentMember?.nama || "Team Member"}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Dark Overlay Gradient - THINNER for more photo visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    boxShadow: [
                      "inset 0 0 0px rgba(59, 130, 246, 0.2)",
                      "inset 0 0 40px rgba(59, 130, 246, 0.3)",
                      "inset 0 0 0px rgba(59, 130, 246, 0.2)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Text Overlay - Bottom - ALL text-xs */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-2 lg:p-3 z-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <motion.div
                    className=" text-white mb-0.5 drop-shadow-2xl leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {currentMember?.nama || "Team Member"}
                  </motion.div>
                  <motion.p
                    className="text-xs text-white/95 mb-0.5 drop-shadow-lg leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {currentMember?.jabatan || "Team"}
                  </motion.p>
                  {currentMember?.nikname && (
                    <motion.p
                      className="text-xs text-white/80 drop-shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      {currentMember.nikname}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Progress Bar */}
              <motion.div
                className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 10, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center text-white/80">
            <p className="text-sm">Tidak ada data team</p>
          </div>
        )}
      </div>
    </div>
  );
}