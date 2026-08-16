import React, { useState } from 'react';
import { MapPin, MessageSquare, Send, User, Star, CheckCircle, RefreshCcw } from 'lucide-react';

export default function LocalMapExchange({ onSelectSwapper, setCurrentPage }) {
  const [selectedPin, setSelectedPin] = useState(null);

  const topStories = [
    { name: 'Maya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', tag: 'Offers: Guitar', color: 'bg-rose-500' },
    { name: 'Alex', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', tag: 'French', color: 'bg-teal-500' },
    { name: 'Priya', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', tag: 'Wants: French', color: 'bg-amber-500' },
    { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', tag: 'Yoga', color: 'bg-orange-500' },
  ];

  const mapPins = [
    { id: 1, name: 'Alex', x: '45%', y: '35%', offers: 'Guitar Lessons', wants: 'Learn French', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', distance: '20m distance', pinColor: 'text-rose-500' },
    { id: 2, name: 'Maya Chen', x: '65%', y: '48%', offers: 'Portrait Photography', wants: 'Guitar Basics', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', distance: '150m distance', pinColor: 'text-teal-500' },
    { id: 3, name: 'Priya Sharma', x: '30%', y: '60%', offers: 'PyTorch LLM Fine-Tuning', wants: 'UI/UX Wireframing', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', distance: '300m distance', pinColor: 'text-amber-500' },
    { id: 4, name: 'Sophia Ansari', x: '75%', y: '25%', offers: 'FX Makeup & Design', wants: 'React Hooks', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', distance: '1.2km distance', pinColor: 'text-blue-500' }
  ];

  const activePin = selectedPin || mapPins[0];

  return (
    <div className="space-y-6">
      
      {/* Top Stories Row (Matching Image 1 Phone Top) */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
        {topStories.map((story, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
            <div className="relative">
              <img
                src={story.avatar}
                alt={story.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform"
              />
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white px-2 py-0.2 rounded-full whitespace-nowrap shadow-xs ${story.color}`}>
                {story.tag}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">{story.name}</span>
          </div>
        ))}
      </div>

      {/* Interactive Map Canvas Container (Matching Image 1) */}
      <div className="relative w-full h-[450px] bg-slate-200 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl">
        
        {/* SVG Stylized Map Background */}
        <svg className="w-full h-full opacity-40 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Roads & Campus Park Curves */}
          <path d="M -50 150 Q 200 80 400 300 T 900 200" stroke="#3b82f6" strokeWidth="12" fill="none" opacity="0.5" />
          <path d="M 150 -50 Q 180 200 350 500" stroke="#10b981" strokeWidth="8" fill="none" opacity="0.4" />
          <circle cx="500" cy="220" r="120" fill="#10b981" opacity="0.15" />
        </svg>

        {/* Map Header Overlay */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-[#121026]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10 shadow-md">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            Local Skill Exchange Map
          </h3>
          <p className="text-[10px] text-slate-500">Live nearby campus swappers around you</p>
        </div>

        {/* Map Pins */}
        {mapPins.map((pin) => (
          <button
            key={pin.id}
            onClick={() => setSelectedPin(pin)}
            style={{ left: pin.x, top: pin.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 z-20 group"
          >
            <MapPin className={`w-8 h-8 fill-current ${pin.pinColor} drop-shadow-md`} />
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {pin.name}
            </span>
          </button>
        ))}

        {/* Selected Pin Callout Card Overlay (Matching Image 1 Callout) */}
        {activePin && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-30 animate-fade-in">
            <div className="bg-white dark:bg-[#181534] rounded-2xl p-4 shadow-2xl border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <img src={activePin.avatar} alt={activePin.name} className="w-11 h-11 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{activePin.name}</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">Offers: <span className="font-bold text-slate-900 dark:text-white">{activePin.offers}</span></p>
                  <p className="text-[11px] text-slate-500">Wants: <span className="font-semibold text-blue-600 dark:text-blue-400">{activePin.wants}</span></p>
                </div>
              </div>

              <div className="flex gap-2 pt-1 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setCurrentPage && setCurrentPage('chat')}
                  className="flex-1 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                  Message
                </button>
                <button
                  onClick={() => onSelectSwapper && onSelectSwapper(activePin)}
                  className="flex-1 btn-primary-blue py-1.5 rounded-xl font-bold text-xs"
                >
                  Interest
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Nearby Skill Swappers List Below Map (Matching Image 1 Bottom List) */}
      <div className="theme-card space-y-3">
        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Skill Swappers Nearby</h4>
        <div className="space-y-2">
          {mapPins.map((swapper) => (
            <div key={swapper.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img src={swapper.avatar} alt={swapper.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white">{swapper.name}</h5>
                  <p className="text-[11px] text-slate-500">Offers: {swapper.offers}</p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-400">{swapper.distance}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
