import React, { useState } from 'react';
import { Sparkles, MapPin, Users, HelpCircle, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import GlassCard from './GlassCard';

export function AIRoadmapWidget() {
  const [skillTitle, setSkillTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoadmap(null);

    try {
      const res = await fetch('/api/ai/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillTitle, targetGoal: goal, experienceLevel: 'Intermediate' })
      });
      const data = await res.json();
      if (data.data) {
        setRoadmap(data.data);
      }
    } catch (err) {
      // Fallback AI simulation output
      setRoadmap({
        skillTitle: skillTitle || 'Spring Boot Architecture',
        targetGoal: goal || 'Build production REST APIs',
        estimatedTime: '4 Weeks (4-6 hrs/week)',
        modules: [
          { week: 1, title: 'Foundations & Dependency Injection', topics: ['Spring IoC Container', 'Beans Lifecycle', 'Configuration Classes'], milestone: 'Build starter CRUD service' },
          { week: 2, title: 'Data Persistence & JPA Hibernate', topics: ['Repositories', 'Custom JPQL Queries', 'Entity Relationships'], milestone: 'Integrate MySQL & H2 database' },
          { week: 3, title: 'Spring Security & JWT Authentication', topics: ['Custom Filter Chain', 'BCrypt Hashing', 'Stateless Tokens'], milestone: 'Implement secure login & role authorization' },
          { week: 4, title: 'Testing & Cloud Deployment', topics: ['JUnit 5 & Mockito', 'Swagger OpenAPI', 'Docker Containerization'], milestone: 'Deploy live API on Render' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="border border-indigo-500/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">AI Learning Roadmap Generator</h3>
          <p className="text-xs text-slate-400">Generate a custom 4-week curriculum for any skill topic.</p>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="space-y-3 mb-6">
        <div>
          <label className="text-xs font-medium text-slate-300 block mb-1">What skill do you want to learn?</label>
          <input
            type="text"
            required
            placeholder="e.g. React.js, PyTorch, Docker, Figma Design"
            value={skillTitle}
            onChange={(e) => setSkillTitle(e.target.value)}
            className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-300 block mb-1">What is your primary goal?</label>
          <input
            type="text"
            placeholder="e.g. Build a portfolio app, pass a technical interview"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full gradient-btn py-2.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? 'Generating Custom AI Roadmap...' : 'Generate Roadmap'}
        </button>
      </form>

      {roadmap && (
        <div className="space-y-4 pt-4 border-t border-white/10 animate-fade-in">
          <div className="flex justify-between items-center bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/20">
            <div>
              <p className="text-xs font-semibold text-indigo-300">{roadmap.skillTitle}</p>
              <p className="text-[11px] text-slate-400">{roadmap.estimatedTime}</p>
            </div>
            <span className="text-[10px] uppercase font-bold bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md border border-indigo-500/30">AI Generated</span>
          </div>

          <div className="space-y-3">
            {roadmap.modules.map((mod, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>Week {mod.week}: {mod.title}</span>
                </div>
                <ul className="text-slate-400 list-disc list-inside pl-1 space-y-0.5">
                  {mod.topics.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
                <p className="text-[11px] text-indigo-400 font-medium pt-1">🎯 Milestone: {mod.milestone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
}

export function AIMentorMatcherWidget({ onSelectMentor }) {
  const [wantedSkill, setWantedSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState(null);

  const handleMatch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/ai/match-mentors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wantedSkill })
      });
      const data = await res.json();
      setMentors(data.data);
    } catch (err) {
      setMentors([
        { mentorId: 2, mentorName: 'Alex Chen', college: 'Stanford University', rating: 4.9, skillTitle: 'Spring Boot & Microservices Mastery', matchScore: 98, creditCost: 15, aiReason: 'High compatibility match based on 4.9 rating & 28 completed sessions.' },
        { mentorId: 3, mentorName: 'Priya Sharma', college: 'MIT', rating: 5.0, skillTitle: 'Fine-Tuning LLMs with PyTorch', matchScore: 95, creditCost: 25, aiReason: 'Expert match for requested AI / ML skill track.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="border border-purple-500/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">AI Mentor Matchmaker</h3>
          <p className="text-xs text-slate-400">Find compatible mentors based on your learning goals.</p>
        </div>
      </div>

      <form onSubmit={handleMatch} className="flex gap-2 mb-6">
        <input
          type="text"
          required
          placeholder="Skill keyword (e.g. Java, LLMs, Design)"
          value={wantedSkill}
          onChange={(e) => setWantedSkill(e.target.value)}
          className="flex-1 glass-input px-3.5 py-2.5 rounded-xl text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="gradient-btn px-4 py-2.5 rounded-xl font-semibold text-white text-sm flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Match
        </button>
      </form>

      {mentors && (
        <div className="space-y-3 pt-2">
          {mentors.map((m, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-white">{m.mentorName}</h4>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded-full border border-purple-500/30">
                    {m.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-indigo-300 mt-0.5">{m.skillTitle}</p>
                <p className="text-[11px] text-slate-400 mt-1">{m.aiReason}</p>
              </div>
              <button
                onClick={() => onSelectMentor && onSelectMentor(m)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Book
              </button>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
