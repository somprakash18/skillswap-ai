import React, { useState } from 'react';
import { BookOpen, Sparkles, GraduationCap, Code, Cpu, Globe, Award, CheckCircle, ArrowRight, Play } from 'lucide-react';

export default function CourseColumnsWidget({ setCurrentPage, setSelectedSkill }) {
  const [activeTab, setActiveTab] = useState('ALL');

  const courseColumns = [
    {
      id: 'java',
      category: 'Java & Spring Boot',
      icon: Code,
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      courses: [
        {
          id: 401,
          title: 'Java Core & Object-Oriented Programming (OOP)',
          instructor: 'Alex Chen (Stanford Senior)',
          rating: 4.9,
          reviews: 42,
          lessons: '12 Sessions',
          credits: 15,
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
          topics: ['Inheritance & Interfaces', 'Collections Framework', 'Multithreading & Streams']
        },
        {
          id: 402,
          title: 'Spring Boot 3 & Microservices Architecture',
          instructor: 'Rohan Sharma (Ex-Amazon Dev)',
          rating: 5.0,
          reviews: 58,
          lessons: '16 Sessions',
          credits: 25,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          topics: ['REST APIs & JPA Hibernate', 'Spring Security & JWT', 'Docker & Kubernetes']
        },
        {
          id: 403,
          title: 'Data Structures & Algorithms in Java',
          instructor: 'Marcus Vance (UC Berkeley)',
          rating: 4.8,
          reviews: 31,
          lessons: '10 Sessions',
          credits: 15,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          topics: ['Trees & Graphs', 'Dynamic Programming', 'LeetCode Medium/Hard']
        }
      ]
    },
    {
      id: 'python',
      category: 'Python & AI Data Science',
      icon: Cpu,
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      courses: [
        {
          id: 404,
          title: 'Python Masterclass: Zero to Advanced',
          instructor: 'Priya Sharma (MIT AI Lab)',
          rating: 5.0,
          reviews: 64,
          lessons: '14 Sessions',
          credits: 15,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          topics: ['Data Structures & Generators', 'Pandas & NumPy Analytics', 'Asyncio & Web Scraping']
        },
        {
          id: 405,
          title: 'Machine Learning & PyTorch LLM Fine-Tuning',
          instructor: 'Priya Sharma (MIT AI Lab)',
          rating: 5.0,
          reviews: 79,
          lessons: '18 Sessions',
          credits: 25,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          topics: ['Deep Neural Networks', 'Transformer Models', 'HuggingFace & CUDA']
        },
        {
          id: 406,
          title: 'Python Automation & Cloud Scripting',
          instructor: 'Anya Sharma (Software Engineer)',
          rating: 4.8,
          reviews: 28,
          lessons: '8 Sessions',
          credits: 10,
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          topics: ['REST API Automation', 'Selenium & BeautifulSoup', 'AWS Lambda Python']
        }
      ]
    },
    {
      id: 'webdev',
      category: 'Web Development',
      icon: Globe,
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      courses: [
        {
          id: 407,
          title: 'Full-Stack Web Dev (React.js + Node.js)',
          instructor: 'Sophia Ansari (Senior Frontend Lead)',
          rating: 4.9,
          reviews: 51,
          lessons: '15 Sessions',
          credits: 20,
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
          topics: ['React Hooks & Context API', 'Express REST Services', 'MongoDB & SQL Integration']
        },
        {
          id: 408,
          title: 'Modern Responsive UI/UX & Tailwind CSS',
          instructor: 'Maya Chen (Product Designer)',
          rating: 4.9,
          reviews: 39,
          lessons: '10 Sessions',
          credits: 15,
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          topics: ['Glassmorphic Layouts', 'Figma Prototyping', 'Framer Motion Animations']
        },
        {
          id: 409,
          title: 'Next.js 14 Server Actions & Fullstack Deployment',
          instructor: 'Albert Jones (Tech Architect)',
          rating: 5.0,
          reviews: 44,
          lessons: '12 Sessions',
          credits: 20,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          topics: ['App Router & SSR', 'Prisma ORM & PostgreSQL', 'Vercel Deployment']
        }
      ]
    },
    {
      id: 'jee',
      category: 'JEE Main & Advanced',
      icon: GraduationCap,
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      courses: [
        {
          id: 410,
          title: 'JEE Physics: Mechanics, Electrodynamics & Optics',
          instructor: 'Rohan Verma (IIT Bombay AIR 142)',
          rating: 5.0,
          reviews: 92,
          lessons: '20 Sessions',
          credits: 15,
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
          topics: ['Newtonian Laws & Rotational Motion', 'Calculus-based Physics Tricks', 'JEE Advanced PYQ Solving']
        },
        {
          id: 411,
          title: 'JEE Mathematics: Calculus, Algebra & Coordinate Geometry',
          instructor: 'Karan Patel (IIT Delhi EE)',
          rating: 4.9,
          reviews: 74,
          lessons: '18 Sessions',
          credits: 15,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          topics: ['Limits, Derivatives & Integrals', 'Matrices & Determinants', 'Speed Elimination Hacks']
        },
        {
          id: 412,
          title: 'JEE Chemistry: Organic Mechanisms & Physical Numericals',
          instructor: 'Vikram Singh (IIT Madras AIR 210)',
          rating: 5.0,
          reviews: 61,
          lessons: '16 Sessions',
          credits: 15,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          topics: ['Name Reactions & GOC', 'Thermodynamics & Kinetics', 'NCERT Inorganic Memory Maps']
        }
      ]
    },
    {
      id: 'neet',
      category: 'NEET UG Medical Prep',
      icon: Award,
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      courses: [
        {
          id: 413,
          title: 'NEET Biology: NCERT Line-by-Line 360/360 Mastery',
          instructor: 'Ananya Deshmukh (AIIMS New Delhi AIR 89)',
          rating: 5.0,
          reviews: 104,
          lessons: '22 Sessions',
          credits: 15,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          topics: ['Human Physiology & Genetics', 'Plant Anatomy & Ecology', 'High-Yield Diagram Revision']
        },
        {
          id: 414,
          title: 'NEET Physics: Formula Memory Shortcuts & Speed MCQs',
          instructor: 'Dr. Sneha Roy (KGMU Lucknow)',
          rating: 4.9,
          reviews: 83,
          lessons: '16 Sessions',
          credits: 15,
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          topics: ['Optics & Modern Physics', 'Formula Mind Maps', '180/180 Speed Tactics']
        },
        {
          id: 415,
          title: 'NEET Chemistry: Inorganic Memory Hacks & Organic PYQs',
          instructor: 'Dr. Arjun Mehta (Maulana Azad Medical)',
          rating: 5.0,
          reviews: 68,
          lessons: '15 Sessions',
          credits: 15,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          topics: ['P-Block & Coordination Chemistry', 'Reaction Charts & Mechanisms', 'Mock Test Strategy']
        }
      ]
    }
  ];

  const filteredColumns = activeTab === 'ALL'
    ? courseColumns
    : courseColumns.filter(c => c.id === activeTab);

  return (
    <div className="space-y-6 pt-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-500/20">
            Categorized Course Columns
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Featured Skill & Exam Courses</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Explore Java, Python, Web Development, JEE Advanced & NEET Medical courses in dedicated category columns.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none bg-slate-100 dark:bg-white/5 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'ALL' ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            All Columns
          </button>
          <button
            onClick={() => setActiveTab('java')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'java' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Java
          </button>
          <button
            onClick={() => setActiveTab('python')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'python' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Python & AI
          </button>
          <button
            onClick={() => setActiveTab('webdev')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'webdev' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Web Dev
          </button>
          <button
            onClick={() => setActiveTab('jee')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'jee' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            JEE Prep
          </button>
          <button
            onClick={() => setActiveTab('neet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'neet' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            NEET Prep
          </button>
        </div>
      </div>

      {/* Grid of Category Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColumns.map((col) => {
          const Icon = col.icon;
          return (
            <div key={col.id} className="theme-card space-y-4 flex flex-col justify-between border border-slate-100 dark:border-white/10 hover:border-blue-500/30">
              
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${col.badgeColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{col.category}</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md">
                  3 Courses
                </span>
              </div>

              {/* Course Cards inside this Column */}
              <div className="space-y-3.5 flex-1">
                {col.courses.map((crs) => (
                  <div key={crs.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-2.5 transition hover:bg-slate-100 dark:hover:bg-white/10">
                    
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-snug">{crs.title}</h4>
                      <span className="text-xs font-extrabold text-amber-500 shrink-0">
                        {crs.credits} Credits
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <img src={crs.avatar} alt={crs.instructor} className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-blue-600 dark:text-blue-400 font-bold">{crs.instructor}</span>
                      </div>
                      <span className="text-amber-500 font-bold">⭐ {crs.rating} ({crs.reviews})</span>
                    </div>

                    {/* Topics Bullets */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {crs.topics.map((top, i) => (
                        <span key={i} className="text-[9.5px] font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-white/10">
                          {top}
                        </span>
                      ))}
                    </div>

                    {/* Book Course Button */}
                    <button
                      onClick={() => {
                        setSelectedSkill && setSelectedSkill({ id: crs.id, title: crs.title, mentorName: crs.instructor, creditCost: crs.credits });
                        setCurrentPage && setCurrentPage('skill-detail');
                      }}
                      className="w-full btn-primary-blue py-1.5 text-xs font-bold rounded-xl mt-1"
                    >
                      Book Course Session ({crs.credits} Credits)
                    </button>

                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
