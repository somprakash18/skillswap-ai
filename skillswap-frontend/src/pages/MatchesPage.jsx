import React, { useState, useEffect } from 'react';
import { Search, Star, CheckCircle, MessageSquare, Filter, Compass, MapPin, PlusCircle, GraduationCap, Award, Code, Music, Guitar } from 'lucide-react';
import AddTeacherContentModal from '../components/AddTeacherContentModal';

export default function MatchesPage({ setCurrentPage, setSelectedSkill }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Categories');
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [teacherListings, setTeacherListings] = useState([]);

  const filters = [
    { id: 'All Categories', label: '🌟 All Categories' },
    { id: 'JEE Prep', label: '🎓 JEE Prep' },
    { id: 'NEET Prep', label: '🩺 NEET Prep' },
    { id: 'Coding', label: '💻 Coding & Tech' },
    { id: 'Guitar', label: '🎸 Guitar' },
    { id: 'Music', label: '🎵 Music & Vocals' }
  ];

  // Base categorized teacher listings
  const baseMatchesList = [
    {
      id: 301,
      name: 'Rohan Verma',
      verified: true,
      qualification: 'IIT Bombay CS (AIR 142)',
      category: 'JEE Prep',
      distance: 'IIT Bombay Campus',
      rating: 5.0,
      reviews: 92,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      bio: 'Offering 1-on-1 JEE Advanced Physics (Mechanics & Calculus) and Organic Chemistry shortcuts.',
      offers: ['JEE Physics Mechanics', 'Calculus Shortcuts', 'JEE Advanced PYQs'],
      lookingFor: ['Python & AI Data Science', 'Guitar Lessons'],
      creditCost: 15
    },
    {
      id: 302,
      name: 'Ananya Deshmukh',
      verified: true,
      qualification: 'AIIMS New Delhi (AIR 89)',
      category: 'NEET Prep',
      distance: 'AIIMS New Delhi',
      rating: 5.0,
      reviews: 104,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      bio: 'Offering NEET Biology NCERT Line-by-Line 360/360 strategy and Human Physiology diagrams.',
      offers: ['NEET Biology 360/360', 'Human Physiology', 'Genetics Memory Maps'],
      lookingFor: ['Figma UI Design', 'Web Development'],
      creditCost: 15
    },
    {
      id: 303,
      name: 'Alex Chen',
      verified: true,
      qualification: 'Stanford Senior Engineer',
      category: 'Coding',
      distance: 'Stanford Campus',
      rating: 4.9,
      reviews: 58,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      bio: 'Full stack Java & Spring Boot developer. Mentoring students in REST APIs, Microservices, and DSA.',
      offers: ['Java Core & OOP', 'Spring Boot 3', 'Data Structures & Algorithms'],
      lookingFor: ['Acoustic Guitar', 'NEET Physics Hints'],
      creditCost: 20
    },
    {
      id: 304,
      name: 'Karan Patel',
      verified: true,
      qualification: 'IIT Delhi Electrical (AIR 210)',
      category: 'JEE Prep',
      distance: 'IIT Delhi Campus',
      rating: 4.9,
      reviews: 74,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      bio: 'Teaching JEE Mathematics: Calculus, Algebra, Matrices, and speed elimination tactics.',
      offers: ['JEE Math Calculus', 'Coordinate Geometry', 'Advanced Problem Solving'],
      lookingFor: ['Guitar Lessons', 'Vocal Coaching'],
      creditCost: 15
    },
    {
      id: 305,
      name: 'Dr. Sneha Roy',
      verified: true,
      qualification: 'KGMU Lucknow Senior Resident',
      category: 'NEET Prep',
      distance: 'KGMU Lucknow',
      rating: 4.9,
      reviews: 83,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      bio: 'NEET Chemistry & Physics formula memory shortcuts, Organic name reactions, and mock test strategy.',
      offers: ['NEET Chemistry Organic', 'Formula Mind Maps', 'Physical Chemistry Hacks'],
      lookingFor: ['Public Speaking', 'React Web Dev'],
      creditCost: 15
    },
    {
      id: 306,
      name: 'Marcus Vance',
      verified: true,
      qualification: 'UC Berkeley Music & Audio Lead',
      category: 'Guitar',
      distance: 'Berkeley Music Dept',
      rating: 4.9,
      reviews: 47,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      bio: 'Professional guitarist & audio engineer offering Acoustic Fingerstyle, Electric Riffs, and Chord Theory.',
      offers: ['Acoustic Guitar Chords', 'Fingerstyle Techniques', 'Electric Guitar Riffs'],
      lookingFor: ['Python Scripting', 'JEE Math Basics'],
      creditCost: 15
    },
    {
      id: 307,
      name: 'Sophia Ansari',
      verified: true,
      qualification: 'Royal Academy Vocal Coach',
      category: 'Music',
      distance: 'London Music Conservatory',
      rating: 5.0,
      reviews: 62,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      bio: 'Vocal training, pitch control, breath work, and classical & pop vocal performance coaching.',
      offers: ['Vocal Pitch & Warmups', 'Classical & Pop Singing', 'Songwriting Basics'],
      lookingFor: ['React Web Development', 'Python Automation'],
      creditCost: 15
    }
  ];

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('teacher_listings') || '[]');
      setTeacherListings(Array.isArray(stored) ? stored : []);
    } catch (e) {
      setTeacherListings([]);
    }
  }, []);

  const allListings = [...teacherListings, ...baseMatchesList];

  const filteredMatches = allListings.filter((m) => {
    const matchesCategory = activeFilter === 'All Categories' || m.category === activeFilter;
    const matchesQuery = !search || 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.bio.toLowerCase().includes(search.toLowerCase()) ||
      m.offers.some(o => o.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-500/20">
            Categorized Mentor Marketplace
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">JEE, NEET, Coding, Guitar & Music Mentors</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Connect with AIR rankers, AIIMS toppers, coding leads, and music educators.</p>
        </div>

        {/* Add Teacher Content Button */}
        <button
          onClick={() => setShowAddTeacherModal(true)}
          className="btn-primary-blue text-xs font-bold px-4 py-2.5 flex items-center justify-center gap-2 shrink-0 shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Teacher: Add Content</span>
        </button>
      </div>

      {/* Search & Category Filters */}
      <div className="space-y-3">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Search JEE Physics, NEET Biology, Java, Python, Guitar, Music..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full theme-input pl-11 text-xs py-3 font-medium"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition ${
                activeFilter === f.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMatches.map((m) => (
          <div key={m.id} className="theme-card space-y-4 border border-slate-100 dark:border-white/10 hover:border-blue-500/30">
            
            <div className="flex items-center gap-3">
              <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-2xl object-cover" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{m.name}</h4>
                  {m.verified && <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />}
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-500/20">
                    {m.category}
                  </span>
                </div>
                
                <p className="text-[11px] font-extrabold text-amber-500 mt-0.5">{m.qualification}</p>

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
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Teaches & Offers...</span>
              <div className="flex flex-wrap gap-1.5">
                {m.offers.map((off, i) => <span key={i} className="tag-offer">{off}</span>)}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 block">Looking to Learn...</span>
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
                  setSelectedSkill({ id: m.id, title: m.offers[0], mentorName: m.name, creditCost: m.creditCost || 15 });
                  setCurrentPage('skill-detail');
                }}
                className="flex-1 btn-primary-blue text-xs font-bold py-2.5"
              >
                Book Session ({m.creditCost || 15} Credits)
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Teacher Content Publisher Modal */}
      {showAddTeacherModal && (
        <AddTeacherContentModal
          onClose={() => setShowAddTeacherModal(false)}
          onPublishSuccess={(newListing) => {
            setTeacherListings(prev => [newListing, ...prev]);
          }}
        />
      )}

    </div>
  );
}
