import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

export default function ChatbotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Bonjour Jad ! Nous sommes là pour répondre à vos questions. Comment pouvons-nous vous aider ?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (isOpen) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async () => {
    if (!inputMsg.trim()) return;
    if (navigator.vibrate) navigator.vibrate(50);

    const userMsg = inputMsg.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputMsg('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch (e) {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', error: true, text: "Nous rencontrons une erreur de connexion." }]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[200] bg-bgApp flex flex-col"
        >
          {/* Header */}
          <div className="px-6 safe-pt pb-4 bg-totalBlue rounded-b-[40px] shadow-sm relative z-10 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-white leading-tight">IA Syndicale</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></span> 
                  <span className="text-[9px] font-bold uppercase tracking-widest text-green-50">Connecté</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col min-h-0 hide-scrollbar gap-3 pb-8">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`max-w-[85%] text-sm px-4 py-3 shadow-sm ${
                  msg.role === 'bot' 
                    ? `bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 ${msg.error ? 'text-red-500 font-bold' : ''}`
                    : 'bg-totalBlue text-white rounded-2xl rounded-br-sm shadow-blue-glow self-end'
                }`}
              >
                {msg.text}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border border-gray-100 max-w-[80px] flex items-center justify-center gap-1 shadow-sm"
              >
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              </motion.div>
            )}
            <div ref={endOfMessagesRef} className="h-4" />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface border-t border-gray-100 safe-pb shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..." 
                className="flex-1 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 focus:border-totalBlue focus:ring-2 focus:ring-totalBlue/20 transition-all rounded-full py-3.5 pl-5 pr-4 text-[15px] font-medium outline-none"
              />
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                disabled={!inputMsg.trim()}
                className="w-12 h-12 bg-totalBlue disabled:bg-gray-300 text-white rounded-full flex items-center justify-center shadow-md shrink-0 transition-colors"
              >
                <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
