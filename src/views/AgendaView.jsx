import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const agendaEvents = [
  { day: "12", month: "Mars", title: "Réunion NAO #4", loc: "Siège Paris", type: "national" },
  { day: "15", month: "Mars", title: "AG du Personnel", loc: "Local CGT / Cantine", type: "local" },
  { day: "18", month: "Mars", title: "Commission CSSCT", loc: "Salle de réunion A", type: "local" },
  { day: "20", month: "Mars", title: "Permanence Juridique", loc: "Bureau CGT", type: "local" },
  { day: "25", month: "Mars", title: "CSE Central", loc: "Salle Plénière", type: "national" }
];

export default function AgendaView() {
  return (
    <div className="p-6 safe-pt h-full pb-32">
      <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Calendrier</h2>
      <p className="text-gray-500 text-sm font-semibold mb-8">Prochains rendez-vous sociaux.</p>
      
      <div className="space-y-4">
        {agendaEvents.map((event, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            key={index} 
            className="bg-surface p-4 rounded-[28px] border border-gray-100 shadow-soft flex items-center gap-4 relative overflow-hidden group hover:border-gray-200 transition-colors"
          >
            <div className={`absolute top-0 left-0 w-1.5 h-full ${event.type === 'national' ? 'bg-cgtRed/90' : 'bg-totalBlue/90'}`}></div>
            
            <div className="w-16 h-16 bg-gray-50 rounded-[20px] flex items-center justify-center text-gray-900 font-black flex-shrink-0 border border-gray-100/80 ml-1.5 shadow-sm group-hover:bg-white transition-colors">
              <div className="text-center">
                <div className="leading-none text-2xl tracking-tighter">{event.day}</div>
                <div className={`text-[9px] uppercase font-black tracking-widest mt-1 ${event.type === 'national' ? 'text-cgtRed' : 'text-totalBlue'}`}>
                  {event.month}
                </div>
              </div>
            </div>
            
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-[16px] font-black text-gray-900 leading-tight mb-1 truncate">{event.title}</p>
              <p className="text-[12px] text-gray-500 font-bold flex items-center gap-1.5 truncate">
                <MapPin size={14} className="text-gray-400 shrink-0" />
                <span className="truncate">{event.loc}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
