import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, HandCoins } from 'lucide-react';

export default function SimulatorModal({ isOpen, onClose }) {
  const [salary, setSalary] = useState(2500);

  const formatEuro = (val) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);
  };

  const directionAugment = salary * 0.02; // 2% 
  const cgtAugment = salary * 0.06; // 6%

  const maxBarHeight = 180;
  const directionHeight = (directionAugment / cgtAugment) * maxBarHeight;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
        >
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white w-full sm:w-[400px] sm:rounded-[40px] rounded-t-[40px] p-6 pb-12 pt-8 relative shadow-float"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-50 text-totalBlue rounded-2xl flex items-center justify-center">
                <TrendingUp size={24} className="stroke-[2.5px]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 leading-tight">Simulateur NAO</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ce que vous perdez</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-gray-500">Votre salaire de base</span>
                <span className="text-2xl font-black text-gray-900">{formatEuro(salary)}</span>
              </div>
              <input 
                type="range" 
                min="1800" 
                max="6000" 
                step="50"
                value={salary} 
                onChange={(e) => {
                  if (navigator.vibrate) navigator.vibrate(20);
                  setSalary(Number(e.target.value));
                }}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-totalBlue"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2">
                <span>1 800 €</span>
                <span>6 000 €</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[28px] p-6 border border-gray-100 relative overflow-hidden">
              <div className="flex justify-around items-end h-[180px] mb-6 relative z-10">
                
                {/* Direction Bar */}
                <div className="flex flex-col items-center gap-2 group">
                  <span className="font-black text-gray-500 text-lg">+{formatEuro(directionAugment)}</span>
                  <motion.div 
                    layout
                    className="w-16 bg-gray-300 rounded-t-2xl relative overflow-hidden transition-all duration-300 group-hover:bg-gray-400"
                    style={{ height: `${directionHeight}px` }}
                  ></motion.div>
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Direction<br/>(2%)</span>
                </div>

                {/* CGT Bar */}
                <div className="flex flex-col items-center gap-2 group">
                  <span className="font-black text-cgtRed text-2xl">+{formatEuro(cgtAugment)}</span>
                  <motion.div 
                    layout
                    className="w-16 bg-gradient-to-t from-cgtRed to-red-400 rounded-t-2xl shadow-red-glow relative overflow-hidden"
                    style={{ height: `${maxBarHeight}px` }}
                  >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                  </motion.div>
                  <span className="text-[10px] font-black uppercase text-cgtRed tracking-wider">Revendication CGT<br/>(6% min)</span>
                </div>

              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-red-100 flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-red-50 text-cgtRed rounded-full flex items-center justify-center shrink-0">
                  <HandCoins size={24} className="stroke-[2.5px]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold leading-tight mb-0.5">La différence pour vous :</p>
                  <p className="text-lg font-black text-cgtRed leading-none">-{formatEuro(cgtAugment - directionAugment)} / mois</p>
                </div>
              </div>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
