import React, { useState } from 'react';
import { Search, Star, CheckCircle, MessageSquare, Filter, Compass, MapPin } from 'lucide-react';

export default function MatchesPage({ setCurrentPage, setSelectedSkill }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Best match');

  const filters = ['Best match', 'Within 5km', 'Guitar', 'Coding', 'Design', 'Photography', 'Music'];

  const matchesList = [
    {
      id: 201,
      name: 'Maya Chen',
      verified: true,
      distance: '2 km',
      rating: 4.9,
      reviews: 36,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      bio: "Looking to trade expertise! I'm offering my skills in Photography and I'm eager to learn Guitar in return.",
      offers: ['Portrait Photography', 'DSLR Camera Tips', 'Lighting Techniques', 'Lightroom Editing'],
      lookingFor: ['Guitar Lessons', 'Sourdough Baking', 'Advanced Spanish']
    },
    {
      id: 202,
      name: 'Anya Sharma',
      verified: true,
      distance: '1.5 km',
      rating: 4.9,
      reviews: 12,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      bio: 'Full stack student developer and UI designer. Ready to exchange frontend development for piano lessons.',
      offers: ['React Development', 'Tailwind CSS', 'Figma Wireframing'],
      lookingFor: ['Piano Basics', 'Vocal Coaching', 'German Conversation']
    },
    {
      id: 203,
      name: 'Sophia Ansari',
      verified: true,
      distance: '3 km',
      rating: 4.8,
      reviews: 42,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      bio: 'Versatile makeup artist and designer specializing in runway, bridal, and FX makeup. Open to creative collaborations.',
      offers: ['Runway Looks', 'Bridal Glam', 'FX Makeup', 'Editorial Shoots'],
      lookingFor: ['Guitar Lessons', 'Sourdough', 'Drum Classes']
    },
    {
      id: 204,
      name: 'Albert Jones',
      verified: true,
      distance: ' Toronto, Canada',
      rating: 5.0,
      reviews: 24,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      bio: 'Aspiring photographer specializing in portraiture and landscape photography. Eager to collaborate.',
      offers: ['Portrait Photography', 'DSLR Camera Tips', 'Composition Techniques'],
      lookingFor: ['Spring Boot', 'PostgreSQL', 'Docker Setup']
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Find Skill Matches</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Discover people who want to learn what you teach and vice versa.</p>
      </div>

      {/* Search & Filter Bar (Matching Image 2) */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills, people, or tags (e.g. Guitar, Photography, React)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full theme-input pl-12 pr-4 py-3 text-sm"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeFilter === f
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matchesList.map((m) => (
          <div key={m.id} className="theme-card space-y-4">
            <div className="flex items-center gap-3">
              <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-2xl object-cover" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{m.name}</h4>
                  {m.verified && <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {m.rating} ({m.reviews})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {m.distance}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{m.bio}</p>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Offers...</span>
              <div className="flex flex-wrap gap-1.5">
                {m.offers.map((off, i) => <span key={i} className="tag-offer">{off}</span>)}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 block">Looking For...</span>
              <div className="flex flex-wrap gap-1.5">
                {m.lookingFor.map((look, i) => <span key={i} className="tag-looking">{look}</span>)}
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <button
                onClick={() => setCurrentPage('chat')}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-blue-500" />
                Chat to Swap
              </button>
              <button
                onClick={() => {
                  setSelectedSkill({ id: m.id, title: m.offers[0], mentorName: m.name, creditCost: 10 });
                  setCurrentPage('skill-detail');
                }}
                className="flex-1 btn-primary-blue text-xs font-bold py-2.5"
              >
                Confirm Swap
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
