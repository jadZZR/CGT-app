import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Circle, CheckCircle2 } from 'lucide-react';
import StoryViewer from '../features/StoryViewer';

const storiesData = [
  { id: 0, title: "Grève Mercredi", desc: "Tous unis dès 06h00 devant le portail.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800", theme: 'red' },
  { id: 1, title: "Télétravail", desc: "Nous avons signé pour 2 jours garantis.", img: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=800", theme: 'blue' },
  { id: 2, title: "Sécurité Unité 12", desc: "Piquet de vigilance en place.", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800", theme: 'gray' }
];

const rawSites = [
  { id: 'carling', name: 'Carling', region: 'Est', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=60&w=400' },
  { id: 'donges', name: 'Donges', region: 'St-Nazaire', img: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=60&w=400' },
  { id: 'feyzin', name: 'Feyzin', region: 'Lyon', img: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?q=60&w=400' },
  { id: 'flandres', name: 'Flandres', region: 'Nord', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=60&w=400' },
  { id: 'grandpuits', name: 'Grandpuits', region: 'IDF', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=60&w=400' },
  { id: 'lamede', name: 'La Mède', region: 'Provence', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=60&w=400' },
  { id: 'normandie', name: 'Normandie', region: 'Le Havre', img: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=60&w=400' },
  { id: 'oudalle', name: 'Oudalle', region: 'Le Havre', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=60&w=400' }
];

export default function HomeView() {
  const [voted, setVoted] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  
  const handleVote = () => {
    if (navigator.vibrate) navigator.vibrate(50);
    setVoted(true);
  };

  return (
    <div className="pb-8">
      {/* Tracts Express (Stories) */}
      <div className="bg-white pb-5 pt-3 mb-6 rounded-b-[32px] shadow-soft relative z-20 -mt-8">
        <div className="px-6 flex justify-between items-center mb-3 mt-6">
          <h3 className="font-black text-gray-900 text-[13px] uppercase tracking-widest">Tracts Express</h3>
          <span className="text-[10px] text-cgtRed font-bold bg-red-50 px-2 py-0.5 rounded-full">Nouveau</span>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar px-6 snap-x pb-2">
          {storiesData.map((story, index) => (
            <motion.div 
              whileTap={{ scale: 0.95 }}
              key={story.id} 
              className="flex flex-col items-center gap-1.5 cursor-pointer snap-start shrink-0"
              onClick={() => setActiveStoryIndex(index)}
            >
              <div className={`p-[2.5px] rounded-full inline-block ${
                  story.theme === 'red' ? 'bg-gradient-to-tr from-orange-400 via-cgtRed to-[#B0000B]' :
                  story.theme === 'blue' ? 'bg-gradient-to-tr from-cyan-400 to-totalBlue' :
                  'bg-gradient-to-tr from-gray-200 to-gray-400'
                }`}>
                <img src={story.img} className="w-14 h-14 rounded-full border-[2.5px] border-white object-cover shadow-sm bg-gray-100" />
              </div>
              <span className="text-[10px] font-bold text-gray-800 tracking-tight">{story.title}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sondage Interactif */}
      <div className="px-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-[28px] p-6 shadow-soft border border-gray-100/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-cgtRed">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-bar-chart-2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
            </div>
            <h3 className="font-black text-gray-900 text-[11px] uppercase tracking-widest">Question du jour</h3>
          </div>
          <p className="font-black text-gray-800 text-[17px] mb-5 leading-tight">
            Ferez-vous grève lors de la mobilisation nationale de mercredi ?
          </p>
          
          <AnimatePresence mode="wait">
            {!voted ? (
              <motion.div key="options" exit={{ opacity: 0, scale: 0.95 }} className="space-y-3">
                <button onClick={handleVote} className="w-full text-left p-4 rounded-2xl border-2 border-gray-50 font-bold text-gray-600 hover:border-cgtRed hover:bg-red-50/20 active:scale-[0.98] transition-all flex justify-between items-center group">
                  Oui, je fais grève
                  <Circle className="text-gray-300 group-hover:text-cgtRed transition-colors" size={20} />
                </button>
                <button onClick={handleVote} className="w-full text-left p-4 rounded-2xl border-2 border-gray-50 font-bold text-gray-600 hover:border-totalBlue hover:bg-blue-50/20 active:scale-[0.98] transition-all flex justify-between items-center group">
                  Non, pas cette fois
                  <Circle className="text-gray-300 group-hover:text-totalBlue transition-colors" size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="thanks"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
              >
                <CheckCircle2 className="text-cgtRed mb-2" size={32} />
                <p className="font-black text-cgtRed">Vote enregistré !</p>
                <p className="text-xs text-red-600/70 font-bold mt-1">Merci pour votre participation.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Vos Sites Grid */}
      <div className="px-6">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Vos Sites</h3>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{rawSites.length} Sites</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {rawSites.map((site, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              key={site.id}
              className="relative h-[160px] rounded-[28px] overflow-hidden shadow-soft cursor-pointer bg-gray-100"
            >
              <img src={site.img} alt={site.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/20 backdrop-blur-md rounded mb-1 inline-block">
                  {site.region}
                </span>
                <h3 className="font-black text-lg text-white leading-tight">{site.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <StoryViewer 
        isOpen={activeStoryIndex !== null} 
        onClose={() => setActiveStoryIndex(null)}
        initialStoryIndex={activeStoryIndex ?? 0}
        stories={storiesData}
      />
    </div>
  );
}
