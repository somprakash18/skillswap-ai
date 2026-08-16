import React, { useState } from 'react';
import { Sparkles, MapPin, Users, HelpCircle, CheckCircle, ArrowRight, Loader2, BookOpen, Award } from 'lucide-react';
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

    const isJeeOrNeet = skillTitle.toLowerCase().includes('jee') || skillTitle.toLowerCase().includes('neet') || goal.toLowerCase().includes('jee') || goal.toLowerCase().includes('neet');

    setTimeout(() => {
      if (isJeeOrNeet) {
        setRoadmap({
          skillTitle: skillTitle || 'JEE / NEET 4-Week Exam Revision Track',
          targetGoal: goal || 'Score top AIR rank & master NCERT + Mock Tests',
          estimatedTime: '4 Weeks (10-12 hrs/week)',
          isExamTrack: true,
          modules: [
            { week: 1, title: 'High-Weightage Core Theory & Formulas', topics: ['Mechanics & Calculus (JEE) / NCERT Biology (NEET)', 'Formula Flashcards & Key Reactions', 'Chapterwise PYQ Solving'], milestone: 'Complete 100 Previous Year Questions' },
            { week: 2, title: 'Speed & Accuracy Problem Solving', topics: ['Timer-based Sectional Tests', 'Organic Reaction Mechanisms & Memory Tricks', 'Elimination Techniques for MCQ'], milestone: 'Score >80% accuracy in sectional tests' },
            { week: 3, title: 'Full Syllabus Mock Tests & Error Analysis', topics: ['Full 3-Hour Simulated Exam', 'Error Log Analysis & Weak Area Fixes', 'Time Allocation Strategy'], milestone: 'Complete 3 Full Mock Exam Papers' },
            { week: 4, title: 'Final Revision & Test Day Mindset', topics: ['High Yield Formula Sheet Review', 'Stress Management & Exam Room Tactics', 'Final Revision of NCERT Highlights'], milestone: 'AIR Exam Ready!' }
          ]
        });
      } else {
        setRoadmap({
          skillTitle: skillTitle || 'Spring Boot Architecture',
          targetGoal: goal || 'Build production REST APIs',
          estimatedTime: '4 Weeks (4-6 hrs/week)',
          isExamTrack: false,
          modules: [
            { week: 1, title: 'Foundations & Dependency Injection', topics: ['Spring IoC Container', 'Beans Lifecycle', 'Configuration Classes'], milestone: 'Build starter CRUD service' },
            { week: 2, title: 'Data Persistence & JPA Hibernate', topics: ['Repositories', 'Custom JPQL Queries', 'Entity Relationships'], milestone: 'Integrate MySQL & H2 database' },
            { week: 3, title: 'Spring Security & JWT Authentication', topics: ['Custom Filter Chain', 'BCrypt Hashing', 'Stateless Tokens'], milestone: 'Implement secure login & role authorization' },
            { week: 4, title: 'Testing & Cloud Deployment', topics: ['JUnit 5 & Mockito', 'Swagger OpenAPI', 'Docker Containerization'], milestone: 'Deploy live API on Render' }
          ]
        });
      }
      setLoading(false);
    }, 600);
  };

  return (
    <GlassCard className="border border-indigo-500/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">AI Learning & Exam Roadmap Generator</h3>
          <p className="text-xs text-slate-400">Generate a custom 4-week curriculum for any skill, JEE Advanced, or NEET Medical track.</p>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="space-y-3 mb-6">
        <div>
          <label className="text-xs font-medium text-slate-300 block mb-1">What skill or exam do you want to master?</label>
          <input
            type="text"
            required
            placeholder="e.g. JEE Physics Mechanics, NEET Biology NCERT, React.js, PyTorch"
            value={skillTitle}
            onChange={(e) => setSkillTitle(e.target.value)}
            className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-300 block mb-1">What is your target goal?</label>
          <input
            type="text"
            placeholder="e.g. Crack JEE Advanced 2026, Score 360/360 in NEET Biology"
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
          {loading ? 'Generating Custom AI Roadmap...' : 'Generate AI Roadmap'}
        </button>
      </form>

      {roadmap && (
        <div className="space-y-4 pt-4 border-t border-white/10 animate-fade-in">
          <div className="flex justify-between items-center bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/20">
            <div>
              <p className="text-xs font-semibold text-indigo-300">{roadmap.skillTitle}</p>
              <p className="text-[11px] text-slate-400">{roadmap.estimatedTime}</p>
            </div>
            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md border ${
              roadmap.isExamTrack ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
            }`}>
              {roadmap.isExamTrack ? 'JEE / NEET Track' : 'Skill Track'}
            </span>
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

    setTimeout(() => {
      if (wantedSkill.toLowerCase().includes('jee') || wantedSkill.toLowerCase().includes('physics') || wantedSkill.toLowerCase().includes('math')) {
        setMentors([
          { mentorId: 301, mentorName: 'Rohan Verma (IIT Bombay AIR 142)', college: 'IIT Bombay CS', rating: 5.0, skillTitle: 'JEE Physics Mechanics & Calculus', matchScore: 99, creditCost: 15, aiReason: 'AIR 142 ranker specialized in JEE Physics & Speed Strategies.' },
          { mentorId: 303, mentorName: 'Karan Patel (IIT Delhi EE)', college: 'IIT Delhi EE', rating: 4.9, skillTitle: 'JEE Math Coordinate Geometry & Algebra', matchScore: 96, creditCost: 15, aiReason: 'Expert in JEE Advanced mathematics & shortcut problem solving.' }
        ]);
      } else if (wantedSkill.toLowerCase().includes('neet') || wantedSkill.toLowerCase().includes('biology') || wantedSkill.toLowerCase().includes('chem')) {
        setMentors([
          { mentorId: 302, mentorName: 'Ananya Deshmukh (AIIMS New Delhi AIR 89)', college: 'AIIMS New Delhi', rating: 5.0, skillTitle: 'NEET Biology NCERT Line-by-Line', matchScore: 99, creditCost: 15, aiReason: 'AIIMS Topper specialized in 360/360 Biology scoring tactics.' },
          { mentorId: 304, mentorName: 'Dr. Sneha Roy (KGMU Lucknow)', college: 'KGMU Lucknow', rating: 4.9, skillTitle: 'NEET Chemistry Organic & NCERT Hacks', matchScore: 94, creditCost: 15, aiReason: 'Medical scholar expert in Organic Chemistry memory tricks.' }
        ]);
      } else {
        setMentors([
          { mentorId: 2, mentorName: 'Alex Chen', college: 'Stanford University', rating: 4.9, skillTitle: 'Spring Boot & Microservices Mastery', matchScore: 98, creditCost: 15, aiReason: 'High compatibility match based on 4.9 rating & 28 completed sessions.' },
          { mentorId: 3, mentorName: 'Priya Sharma', college: 'MIT', rating: 5.0, skillTitle: 'Fine-Tuning LLMs with PyTorch', matchScore: 95, creditCost: 25, aiReason: 'Expert match for requested AI / ML skill track.' }
        ]);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <GlassCard className="border border-purple-500/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">AI Mentor Matchmaker</h3>
          <p className="text-xs text-slate-400">Match with JEE AIR Rankers, NEET Toppers & Tech Mentors.</p>
        </div>
      </div>

      <form onSubmit={handleMatch} className="flex gap-2 mb-6">
        <input
          type="text"
          required
          placeholder="Skill/Exam keyword (e.g. JEE Physics, NEET Biology, React)"
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
