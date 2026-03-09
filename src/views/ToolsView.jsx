import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Calculator, Bot, AlertTriangle } from 'lucide-react';
import ChatbotModal from '../features/Chatbot';
import SimulatorModal from '../features/SimulateurNAO';
import DgiAlertModal from '../features/DgiAlert';

export default function ToolsView() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSim, setShowSim] = useState(false);
  const [showDgi, setShowDgi] = useState(false);

  const handleFlip = () => {
    if (navigator.vibrate) navigator.vibrate(50);
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="p-6 safe-pt h-full flex flex-col">
      <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Adhérent</h2>
      <p className="text-gray-500 text-sm font-semibold mb-8">Vos outils syndicaux au quotidien.</p>

      {/* Carte Adhérent 3D */}
      <div 
        className="w-full h-[210px] perspective-[1200px] cursor-pointer mb-8"
        onClick={handleFlip}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="relative w-full h-full preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Recto */}
          <div className="absolute inset-0 backface-hidden bg-[#0A0A0A] p-7 text-white flex flex-col justify-between rounded-[28px] border border-gray-800 overflow-hidden" 
               style={{ backfaceVisibility: 'hidden' }}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <img src="/logo.jpg" alt="Logo CGT" className="w-12 h-12 bg-white rounded-xl p-1.5 object-contain" />
              <Wifi className="text-gray-500 rotate-90" size={24} />
            </div>
            
            <div className="relative z-10 mt-8">
              <div className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em] mb-1">Syndicat TotalEnergies</div>
              <h3 className="text-[28px] font-black tracking-widest font-mono">JAD ZORGUI</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]"></span>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest">ADH-2024-08942</p>
              </div>
            </div>
          </div>

          {/* Verso */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-cgtRed to-[#8A0008] p-7 text-white flex flex-col justify-center items-center rounded-[28px] shadow-red-glow"
               style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="bg-white p-3 rounded-2xl mb-4 shadow-xl">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=ADH-2024-08942" alt="QR Code" className="w-24 h-24 mix-blend-multiply" />
            </div>
            <p className="text-[10px] font-bold text-white/90 text-center tracking-wide leading-relaxed">
              Présentez ce code lors des<br/>Assemblées Générales.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Grille d'Outils */}
      <div className="grid grid-cols-2 gap-4 flex-1 pb-10">
        <motion.div 
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowChat(true)}
          className="bg-gradient-to-br from-totalBlue to-blue-800 p-5 rounded-3xl shadow-blue-glow border border-blue-400 flex flex-col items-center justify-center text-center col-span-2 cursor-pointer"
        >
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-2xl mb-2 border border-white/30">
            <Bot size={26} />
          </div>
          <h4 className="font-black text-white text-lg tracking-tight">Assistant Juridique IA</h4>
          <p className="text-[10px] text-blue-100 font-bold mt-1 uppercase tracking-wider">Réponses confidentielles</p>
        </motion.div>
        
        <motion.div 
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowSim(true)}
          className="bg-surface p-5 rounded-3xl shadow-soft border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors"></div>
          <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center mb-3 relative z-10 group-hover:bg-white transition-colors">
            <Calculator size={22} className="stroke-[2.5px]" />
          </div>
          <h4 className="font-black text-gray-900 text-[13px] leading-tight relative z-10">Simulateur<br/>NAO</h4>
        </motion.div>
        
        <motion.div 
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowDgi(true)}
          className="bg-[#FFF5F5] p-5 rounded-3xl shadow-soft border border-red-100 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-red-50 rounded-full group-hover:bg-red-100 transition-colors"></div>
          <div className="w-12 h-12 bg-red-100 text-cgtRed rounded-full flex items-center justify-center mb-2 relative z-10 group-hover:bg-white transition-colors">
            <AlertTriangle size={22} className="stroke-[2.5px]" />
          </div>
          <h4 className="font-black text-cgtRed text-[13px] leading-tight mt-1 relative z-10">Alerte<br/>DGI</h4>
        </motion.div>
      </div>

      <ChatbotModal isOpen={showChat} onClose={() => setShowChat(false)} />
      <SimulatorModal isOpen={showSim} onClose={() => setShowSim(false)} />
      <DgiAlertModal isOpen={showDgi} onClose={() => setShowDgi(false)} />
    </div>
  );
}
