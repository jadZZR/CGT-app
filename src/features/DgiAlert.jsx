import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertOctagon, X } from 'lucide-react';

export default function DgiAlertModal({ isOpen, onClose }) {
  const handleAlert = () => {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
    alert("Procédure déclenchée auprès du CSE et de la Direction.");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white w-full max-w-[400px] rounded-[40px] p-8 text-center relative border border-white/20 shadow-[0_0_100px_rgba(227,6,19,0.3)]"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="w-24 h-24 bg-red-50 text-cgtRed rounded-full flex items-center justify-center mx-auto mb-6 shrink-0 border-[4px] border-red-100 relative">
              <span className="absolute inset-0 border-2 border-cgtRed rounded-full animate-ping opacity-20 hidden"></span>
              <AlertOctagon size={48} className="stroke-[2px]" />
            </div>

            <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight uppercase">Danger Grave &<br/>Imminent</h2>
            
            <p className="text-gray-600 font-semibold text-sm mb-8 leading-relaxed">
              Vous êtes témoin d'une situation de danger (risque d'explosion, fuite toxique, équipement défectueux) mettant en péril la vie des salariés ?
            </p>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleAlert}
              className="w-full bg-cgtRed hover:bg-[#c9000a] text-white py-5 rounded-[20px] font-black text-lg tracking-widest shadow-red-glow flex items-center justify-center gap-3 active:bg-[#a0000a] transition-all"
            >
              <AlertTriangle size={24} className="stroke-[2.5px]" />
              DÉCLENCHER DGI
            </motion.button>
            <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase mt-4">
              L'élu CSSCT d'astreinte sera averti
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
