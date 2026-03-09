import React from 'react';
import { Home, CalendarDays, IdCard, MessageCircleWarning } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'agenda', icon: CalendarDays, label: 'Agenda' },
    { id: 'tools', icon: IdCard, label: 'Outils' },
    { id: 'contact', icon: MessageCircleWarning, label: 'Contact' }
  ];

  return (
    <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[88%] p-2 rounded-[36px] flex justify-around items-center z-50 glass-nav shadow-float">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(50);
              setActiveTab(tab.id);
            }}
            className="relative w-[65px] h-[56px] flex flex-col items-center justify-center rounded-3xl transition-all duration-300"
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-cgtRed/10 rounded-3xl"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
            <motion.div
              animate={{
                y: isActive ? -6 : 0,
                color: isActive ? '#E30613' : '#94A3B8'
              }}
              className="relative z-10"
            >
              <Icon size={20} className="stroke-[2.5px]" />
            </motion.div>
            
            <motion.span
              animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 8
              }}
              className={`absolute bottom-1.5 text-[0.55rem] font-extrabold uppercase tracking-wider relative z-10 ${isActive ? 'text-cgtRed' : 'text-slate-400'}`}
            >
              {tab.label}
            </motion.span>
          </button>
        );
      })}
    </nav>
  );
}
