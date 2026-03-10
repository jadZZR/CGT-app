import React from 'react';
import { motion } from 'framer-motion';
import { Headset, Mail, MessageCircle } from 'lucide-react';

export default function ContactView() {
  return (
    <div className="p-6 safe-pt h-full pb-32 flex flex-col">
      <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight mb-6 transition-colors">Contact</h2>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#111] dark:bg-black p-8 rounded-[36px] text-white text-center mb-8 relative overflow-hidden shadow-float border border-gray-800 dark:border-gray-900 transition-colors"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cgtRed/30 rounded-full blur-[40px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-totalBlue/20 rounded-full blur-[40px] pointer-events-none"></div>
        
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/10 relative z-10 text-white shadow-lg">
          <Headset size={32} />
        </div>
        
        <h2 className="text-2xl font-black mb-2 tracking-tight relative z-10">Vos Délégués</h2>
        <p className="text-xs text-gray-300 font-medium leading-relaxed relative z-10">
          Une question ?<br/>Confidentialité garantie.
        </p>
      </motion.div>

      <div className="space-y-4">
        <motion.a 
          whileTap={{ scale: 0.96 }}
          href="mailto:Jad.zorgui07@gmail.com" 
          className="flex items-center justify-center gap-3 w-full bg-cgtRed text-white py-5 rounded-2xl font-black text-sm shadow-red-glow transition-all hover:bg-[#c9000a]"
        >
          <Mail size={20} /> ÉCRIRE À LA CGT
        </motion.a>
        
        <motion.a 
          whileTap={{ scale: 0.96 }}
          href="https://wa.me/33788408004" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-surface dark:bg-darkSurface border-2 border-green-50 dark:border-green-900/30 py-5 rounded-2xl font-black text-sm text-[#25D366] shadow-soft transition-all hover:bg-green-50/30 dark:hover:bg-green-900/20 hover:border-green-100 dark:hover:border-green-800"
        >
          <MessageCircle size={22} className="fill-current" /> WHATSAPP
        </motion.a>
      </div>
    </div>
  );
}
