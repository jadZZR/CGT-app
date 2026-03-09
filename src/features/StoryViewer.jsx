import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

export default function StoryViewer({ isOpen, onClose, initialStoryIndex = 0, stories }) {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);

  const STORY_DURATION = 5000; // 5 seconds per story

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialStoryIndex);
      setProgress(0);
    }
  }, [isOpen, initialStoryIndex]);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + (100 / (STORY_DURATION / 50));
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const currentStory = stories[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[400] bg-black text-white flex flex-col"
        >
          {/* Progress Bars */}
          <div className="safe-pt px-2 pt-4 flex gap-1 relative z-20">
            {stories.map((story, idx) => (
              <div key={story.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{ 
                    width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%' 
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="px-4 py-3 flex justify-between items-center relative z-20">
            <div className="flex items-center gap-2">
              <div className={`p-0.5 rounded-full bg-gradient-to-tr ${
                  currentStory.theme === 'red' ? 'from-orange-400 to-cgtRed' :
                  currentStory.theme === 'blue' ? 'from-cyan-400 to-totalBlue' :
                  'from-gray-300 to-gray-500'
                }`}>
                <img src={currentStory.img} className="w-8 h-8 rounded-full border border-white/20 object-cover" />
              </div>
              <span className="font-bold text-sm tracking-tight">{currentStory.title}</span>
              <span className="text-white/60 text-xs ml-1 font-medium">1h</span>
            </div>
            <button onClick={onClose} className="p-2 -mr-2 text-white/80 active:scale-90 transition-transform">
              <X size={24} />
            </button>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative bg-[#111] overflow-hidden rounded-xl mx-2 mt-2">
            <motion.img 
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              src={currentStory.img} 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pb-8 px-6">
              <motion.h2 
                key={`title-${currentIndex}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-black mb-2 tracking-tight leading-tight"
              >
                {currentStory.title}
              </motion.h2>
              <motion.p 
                key={`desc-${currentIndex}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/80 font-medium text-lg"
              >
                {currentStory.desc}
              </motion.p>
            </div>
            
            {/* Touch Zones for Navigation */}
            <div className="absolute inset-y-0 left-0 w-1/3 z-30" onClick={handlePrev} />
            <div className="absolute inset-y-0 right-0 w-2/3 z-30" onClick={handleNext} />
          </div>

          {/* Action Footer */}
          <div className="safe-pb p-4 flex items-center justify-center relative z-20">
            <button 
              className="flex items-center justify-center gap-2 w-full max-w-[200px] border border-white/30 rounded-full py-3 bg-white/10 backdrop-blur-md font-bold text-sm active:bg-white/20 transition-colors"
            >
              <ExternalLink size={16} />
              Voir le tract
            </button>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
