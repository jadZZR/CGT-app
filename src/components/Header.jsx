import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [greeting, setGreeting] = useState("Bonjour, Jad");
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 5) {
      setGreeting("Bonsoir, Jad");
    }
  }, []);

  const handleNotificationClick = () => {
    if (navigator.vibrate) navigator.vibrate(50);
    setShowNotifications(true);
  };

  return (
    <>
      <div className="brand-header safe-pt px-6 relative z-10" id="main-header">
        <div className="flex justify-between items-center mt-2 relative z-10">
          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-lg flex items-center justify-center p-0.5 relative group"
            >
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-full" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white"
            >
              <h1 className="font-bold text-[10px] uppercase tracking-[0.2em] opacity-75 mb-0.5">TotalEnergies</h1>
              <h2 className="text-2xl font-black tracking-tight leading-none">{greeting}</h2>
            </motion.div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleNotificationClick}
            className="relative w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white shadow-sm transition-all"
          >
            <Bell size={22} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-yellow-400 border-2 border-cgtRed rounded-full shadow-sm animate-pulse"></span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showNotifications && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute top-24 left-6 right-6 bg-white rounded-2xl p-4 shadow-float z-50 border border-red-50"
          >
            <div className="flex items-center gap-3">
              <div className="bg-red-50 p-2 rounded-full text-cgtRed">
                <Bell size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Réunion NAO Confirmée</h4>
                <p className="text-xs text-gray-500 mt-0.5">La réunion aura lieu demain à 14h.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowNotifications(false)}
              className="w-full mt-3 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-600 active:scale-95 transition-transform"
            >
              FERMER
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
