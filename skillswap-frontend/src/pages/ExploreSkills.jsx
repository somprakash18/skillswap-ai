import React, { useState } from 'react';
import { Search, MapPin, Grid, Star, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import LocalMapExchange from '../components/LocalMapExchange';

export default function ExploreSkills({ setCurrentPage, setSelectedSkill }) {
  const [viewMode, setViewMode] = useState('map'); // 'grid' or 'map'
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Coding', 'Design', 'Music', 'Photography', 'Languages'];

  const skillsList = [
    { id: 1, title: 'Portrait & Outdoor Photography', category: 'Photography', mentorName: 'Maya Chen', rating: 4.9, creditCost: 15, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', offers: ['Portrait Photography', 'DSLR Camera Tips'], lookingFor: ['Guitar Lessons'] },
    { id: 2, title: 'Guitar & Songwriting Basics', category: 'Music', mentorName: 'Alex Chen', rating: 5.0, creditCost: 10, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', offers: ['Guitar Lessons', 'Chords'], lookingFor: ['French Conversation'] },
    { id: 3, title: 'React & Tailwind UI Systems', category: 'Coding', mentorName: 'Anya Sharma', rating: 4.9, creditCost: 20, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', offers: ['React.js', 'Tailwind CSS'], lookingFor: ['Piano Lessons'] },
    { id: 4, title: 'Editorial & FX Makeup Design', category: 'Design', mentorName: 'Sophia Ansari', rating: 4.8, creditCost: 15, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', offers: ['FX Makeup', 'Bridal Glam'], lookingFor: ['Guitar Basics'] }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & View Toggle (Matching Image 1 Map View) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Explore Campus Swaps</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Discover skills near you or explore the interactive local map.</p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex bg-slate-200 dark:bg-white/10 p-1 rounded-xl w-fit">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'map' ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Local Map View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'grid' ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Grid View
          </button>
        </div>
      </div>

      {/* Map View Mode */}
      {viewMode === 'map' ? (
        <LocalMapExchange
          setCurrentPage={setCurrentPage}
          onSelectSwapper={(swapper) => {
            setSelectedSkill({ id: swapper.id, title: swapper.offers, mentorName: swapper.name, creditCost: 10 });
            setCurrentPage('skill-detail');
          }}
        />
      ) : (
        /* Grid View Mode */
        <div className="space-y-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills, categories, or mentors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full theme-input pl-10 text-xs py-2.5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsList.map((sk) => (
              <div key={sk.id} className="theme-card space-y-4">
                <div className="flex items-center gap-3">
                  <img src={sk.avatar} alt={sk.mentorName} className="w-11 h-11 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{sk.title}</h4>
                    <p className="text-xs text-slate-500">Mentor: {sk.mentorName}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                  <button
                    onClick={() => setCurrentPage('chat')}
                    className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSkill(sk);
                      setCurrentPage('skill-detail');
                    }}
                    className="flex-1 btn-primary-blue text-xs font-bold py-2"
                  >
                    Confirm Swap
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
