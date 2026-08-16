import React, { useState } from 'react';
import { Search, MapPin, Grid, Star, MessageSquare, CheckCircle, Award, BookOpen, Sparkles } from 'lucide-react';
import LocalMapExchange from '../components/LocalMapExchange';

export default function ExploreSkills({ setCurrentPage, setSelectedSkill }) {
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'JEE Prep', 'NEET Prep', 'Coding', 'Design', 'Music', 'Languages'];

  const skillsList = [
    {
      id: 301,
      title: 'JEE Physics Mechanics & Calculus Problem Solving',
      category: 'JEE Prep',
      mentorName: 'Rohan Verma (IIT Bombay AIR 142)',
      college: 'IIT Bombay Computer Science',
      rating: 5.0,
      reviews: 48,
      creditCost: 15,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      offers: ['JEE Physics Mechanics', 'Calculus Shortcuts', 'JEE Mock Test Strategy'],
      lookingFor: ['Python & Web Development', 'React.js']
    },
    {
      id: 302,
      title: 'NEET Biology NCERT Line-by-Line & 360/360 Strategy',
      category: 'NEET Prep',
      mentorName: 'Ananya Deshmukh (AIIMS New Delhi AIR 89)',
      college: 'AIIMS New Delhi Medical College',
      rating: 5.0,
      reviews: 52,
      creditCost: 15,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      offers: ['NEET Biology NCERT', 'Human Physiology', 'Genetics & Molecular Biology'],
      lookingFor: ['Figma UI Design', 'Graphic Design']
    },
    {
      id: 303,
      title: 'JEE Math Coordinate Geometry, Algebra & Speed Tricks',
      category: 'JEE Prep',
      mentorName: 'Karan Patel (IIT Delhi EE)',
      college: 'IIT Delhi Electrical Engineering',
      rating: 4.9,
      reviews: 34,
      creditCost: 15,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      offers: ['JEE Math Coordinate Geometry', 'Algebra & Matrices', 'JEE Advanced Problem Solving'],
      lookingFor: ['Guitar Lessons', 'Music Theory']
    },
    {
      id: 304,
      title: 'NEET Chemistry Organic Reactions & Inorganic Memory Hacks',
      category: 'NEET Prep',
      mentorName: 'Dr. Sneha Roy (KGMU Lucknow)',
      college: 'King George Medical University',
      rating: 4.9,
      reviews: 29,
      creditCost: 15,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      offers: ['NEET Chemistry Organic', 'Inorganic NCERT Hacks', 'Physical Chemistry Formulas'],
      lookingFor: ['Public Speaking', 'Spoken English']
    },
    {
      id: 1,
      title: 'Portrait & Outdoor Photography',
      category: 'Design',
      mentorName: 'Maya Chen',
      college: 'Stanford University',
      rating: 4.9,
      reviews: 36,
      creditCost: 15,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      offers: ['Portrait Photography', 'DSLR Camera Tips'],
      lookingFor: ['Guitar Lessons']
    },
    {
      id: 2,
      title: 'React & Tailwind UI Systems',
      category: 'Coding',
      mentorName: 'Anya Sharma',
      college: 'MIT',
      rating: 4.9,
      reviews: 42,
      creditCost: 20,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      offers: ['React.js', 'Tailwind CSS'],
      lookingFor: ['Piano Lessons']
    }
  ];

  const filteredSkills = skillsList.filter(sk => {
    const matchesCategory = activeCategory === 'All' || sk.category === activeCategory;
    const matchesSearch = sk.title.toLowerCase().includes(search.toLowerCase()) ||
                          sk.mentorName.toLowerCase().includes(search.toLowerCase()) ||
                          sk.offers.some(o => o.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-500/20">
            JEE & NEET Mentorship Active
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Explore Exam & Skill Swaps</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Learn JEE Advanced, NEET Medical Prep & Tech Skills from AIR Rankers & College Seniors.</p>
        </div>

        <div className="flex bg-slate-200 dark:bg-white/10 p-1 rounded-xl w-fit">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'grid' ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Grid View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'map' ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Local Map View
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <LocalMapExchange
          setCurrentPage={setCurrentPage}
          onSelectSwapper={(swapper) => {
            setSelectedSkill({ id: swapper.id, title: swapper.offers, mentorName: swapper.name, creditCost: 15 });
            setCurrentPage('skill-detail');
          }}
        />
      ) : (
        <div className="space-y-6">
          
          {/* Search & Category Pills */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search JEE Physics, NEET Biology, React, Mentors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full theme-input pl-10 text-xs py-2.5"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    activeCategory === cat
                      ? cat.includes('JEE')
                        ? 'bg-amber-500 text-white shadow-sm'
                        : cat.includes('NEET')
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSkills.map((sk) => (
              <div key={sk.id} className="theme-card space-y-4 border border-slate-100 dark:border-white/10 hover:border-blue-500/40">
                
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={sk.avatar} alt={sk.mentorName} className="w-12 h-12 rounded-2xl object-cover shrink-0" />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">{sk.title}</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-0.5">{sk.mentorName}</p>
                      <span className="text-[10px] text-slate-400">{sk.college}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                    sk.category === 'JEE Prep'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : sk.category === 'NEET Prep'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                  }`}>
                    {sk.category}
                  </span>
                </div>

                {/* Offers Tags */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Offers...</span>
                  <div className="flex flex-wrap gap-1.5">
                    {sk.offers.map((off, i) => (
                      <span key={i} className="tag-offer">{off}</span>
                    ))}
                  </div>
                </div>

                {/* Looking For Tags */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 block">Looking For...</span>
                  <div className="flex flex-wrap gap-1.5">
                    {sk.lookingFor.map((look, i) => (
                      <span key={i} className="tag-looking">{look}</span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                  <button
                    onClick={() => setCurrentPage('chat')}
                    className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    Chat Mentor
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSkill(sk);
                      setCurrentPage('skill-detail');
                    }}
                    className="flex-1 btn-primary-blue text-xs font-bold py-2"
                  >
                    Book Session (15 Credits)
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
