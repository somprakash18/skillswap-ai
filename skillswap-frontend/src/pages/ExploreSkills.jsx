import React, { useState } from 'react';
import { Search, Filter, Star, Coins, User, ArrowRight, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function ExploreSkills({ setCurrentPage, setSelectedSkill }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [skillTypeFilter, setSkillTypeFilter] = useState('OFFERED');

  const categories = [
    { id: 'ALL', label: 'All Categories' },
    { id: 'BACKEND', label: 'Backend' },
    { id: 'FRONTEND', label: 'Frontend' },
    { id: 'AI_ML', label: 'AI & Machine Learning' },
    { id: 'DEVOPS', label: 'DevOps & Cloud' },
    { id: 'DESIGN', label: 'UI/UX & Design' }
  ];

  const sampleSkills = [
    {
      id: 1,
      title: 'Spring Boot & Microservices Mastery',
      category: 'BACKEND',
      categoryLabel: 'Backend Development',
      mentorName: 'Alex Chen',
      college: 'Stanford University',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      rating: 4.9,
      reviewCount: 28,
      creditCost: 15,
      skillType: 'OFFERED',
      experienceLevel: 'ADVANCED',
      description: 'Learn production layered architecture, RESTful API design, Spring Security custom JWT filters, and JPA Hibernate ORM with MySQL.',
      tags: ['Java', 'Spring Boot', 'REST', 'JWT']
    },
    {
      id: 2,
      title: 'React.js & Modern State Management',
      category: 'FRONTEND',
      categoryLabel: 'Frontend Development',
      mentorName: 'Alex Chen',
      college: 'Stanford University',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      rating: 4.9,
      reviewCount: 28,
      creditCost: 12,
      skillType: 'OFFERED',
      experienceLevel: 'ADVANCED',
      description: 'Master React hooks, Context API state patterns, Tailwind CSS glassmorphic layout design, and async API integration.',
      tags: ['React', 'Tailwind', 'JavaScript']
    },
    {
      id: 3,
      title: 'Fine-Tuning LLMs with PyTorch & HuggingFace',
      category: 'AI_ML',
      categoryLabel: 'Artificial Intelligence',
      mentorName: 'Priya Sharma',
      college: 'MIT',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5.0,
      reviewCount: 35,
      creditCost: 25,
      skillType: 'OFFERED',
      experienceLevel: 'EXPERT',
      description: 'Hands-on guide to LoRA & QLoRA fine-tuning, custom prompt engineering, and deploying LLM models on GPU instances.',
      tags: ['Python', 'AI', 'PyTorch', 'LLMs']
    },
    {
      id: 4,
      title: 'Startup Product UI/UX & Figma Design Systems',
      category: 'DESIGN',
      categoryLabel: 'Design & UX',
      mentorName: 'Marcus Vance',
      college: 'UC Berkeley',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 4.8,
      reviewCount: 19,
      creditCost: 10,
      skillType: 'OFFERED',
      experienceLevel: 'INTERMEDIATE',
      description: 'Learn modern design systems, glassmorphism, responsive auto-layout components, and rapid interactive prototyping in Figma.',
      tags: ['Figma', 'UI/UX', 'Design']
    },
    {
      id: 5,
      title: 'Docker & Kubernetes Cloud Infrastructure',
      category: 'DEVOPS',
      categoryLabel: 'DevOps & Cloud',
      mentorName: 'Sarah Jenkins',
      college: 'Harvard University',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      rating: 4.95,
      reviewCount: 40,
      creditCost: 20,
      skillType: 'OFFERED',
      experienceLevel: 'EXPERT',
      description: 'Build multi-stage containerized applications, setup GitHub Actions CI/CD pipelines, and deploy to AWS & Render.',
      tags: ['Docker', 'Kubernetes', 'DevOps']
    }
  ];

  const filteredSkills = sampleSkills.filter(s => {
    const matchesCategory = selectedCategory === 'ALL' || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.mentorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Skill Marketplace</h1>
          <p className="text-sm text-slate-400 mt-1">Discover mentors, swap skills, or post skills you want to learn.</p>
        </div>

        {/* Toggle Offered / Wanted */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setSkillTypeFilter('OFFERED')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              skillTypeFilter === 'OFFERED' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
            }`}
          >
            Mentors Offering Skills
          </button>
          <button
            onClick={() => setSkillTypeFilter('WANTED')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              skillTypeFilter === 'WANTED' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400'
            }`}
          >
            Students Requesting Skills
          </button>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by skill name, topic, or mentor name (e.g. Spring Boot, PyTorch, Alex Chen)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-input pl-12 pr-4 py-3 rounded-2xl text-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white border border-indigo-400/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <GlassCard key={skill.id} className="flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                  {skill.categoryLabel}
                </span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg flex items-center gap-1 border border-amber-500/20">
                  <Coins className="w-3.5 h-3.5" />
                  {skill.creditCost} Credits
                </span>
              </div>

              <h3 className="font-bold text-lg text-white mb-2 line-clamp-1">{skill.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">{skill.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {skill.tags.map((t, idx) => (
                  <span key={idx} className="text-[11px] text-slate-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Mentor Info Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={skill.avatarUrl}
                  alt={skill.mentorName}
                  className="w-9 h-9 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-semibold text-xs text-white">{skill.mentorName}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-amber-300">{skill.rating}</span>
                    <span>({skill.reviewCount})</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedSkill(skill);
                  setCurrentPage('skill-detail');
                }}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
              >
                View
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  );
}
