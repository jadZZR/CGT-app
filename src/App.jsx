import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeView from './views/HomeView';
import AgendaView from './views/AgendaView';
import ToolsView from './views/ToolsView';
import ContactView from './views/ContactView';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="app-frame font-sans text-gray-900">
      {/* Dynamic Header, hide on specific pages if needed */}
      {activeTab === 'home' && <Header />}

      <main id="main-scroll" className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full absolute inset-0 pb-[120px]"
          >
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'agenda' && <AgendaView />}
            {activeTab === 'tools' && <ToolsView />}
            {activeTab === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
