import React, { useState } from 'react';
import { Star, Coins, Calendar, Clock, Award, ShieldCheck, ArrowLeft, CheckCircle2, MessageSquare } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import BookingModal from '../components/BookingModal';

export default function SkillDetailPage({ skill, setCurrentPage }) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!skill) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <p className="text-slate-400">No skill selected.</p>
        <button onClick={() => setCurrentPage('explore')} className="mt-4 px-4 py-2 gradient-btn rounded-xl text-xs font-semibold text-white">
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Back Link */}
      <button
        onClick={() => setCurrentPage('explore')}
        className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Skill Marketplace
      </button>

      {/* Main Header Banner */}
      <GlassCard className="border border-indigo-500/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              {skill.categoryLabel || 'Backend Development'}
            </span>
            <h1 className="text-3xl font-extrabold text-white">{skill.title}</h1>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {skill.rating || 4.9} ({skill.reviewCount || 28} Reviews)
              </span>
              <span>•</span>
              <span>Level: <span className="text-slate-200 font-semibold">{skill.experienceLevel || 'Advanced'}</span></span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-right w-full md:w-auto">
            <p className="text-xs text-slate-400 mb-1">Session Cost</p>
            <p className="text-2xl font-black text-amber-400 flex items-center gap-1.5 justify-end">
              <Coins className="w-6 h-6" />
              {skill.creditCost} Credits
            </p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="mt-3 w-full px-6 py-2.5 gradient-btn rounded-xl font-bold text-white text-xs shadow-lg shadow-indigo-500/25"
            >
              Book Session
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Mentor Profile & Description */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-6">
          
          <GlassCard>
            <h3 className="font-bold text-lg text-white mb-3">About This Skill Session</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {skill.description}
            </p>

            <h4 className="font-bold text-sm text-white mt-6 mb-3">What You Will Learn</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {['Comprehensive codebase walkthrough & architecture patterns', 'Live interactive pair programming & debugging session', 'Code review & industry best practices guidance'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Student Reviews */}
          <GlassCard>
            <h3 className="font-bold text-lg text-white mb-4">Student Reviews ({skill.reviewCount || 28})</h3>
            <div className="space-y-3">
              {[
                { name: 'Sarah Jenkins', rating: 5, date: '2 days ago', text: 'Alex explained Spring Security custom filters exceptionally well! Best 15 credits spent.' },
                { name: 'Marcus Vance', rating: 5, date: '1 week ago', text: 'Clean explanation of JPA Hibernate relationships. Highly recommend this mentor.' }
              ].map((rev, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">{rev.name}</span>
                    <span className="text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <p className="text-slate-300 mt-1">{rev.text}</p>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

        {/* Mentor Sidebar */}
        <div className="space-y-6">
          <GlassCard>
            <div className="text-center space-y-3">
              <img
                src={skill.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'}
                alt={skill.mentorName || 'Mentor'}
                className="w-20 h-20 rounded-2xl object-cover mx-auto shadow-lg"
              />
              <div>
                <h4 className="font-bold text-base text-white">{skill.mentorName || 'Alex Chen'}</h4>
                <p className="text-xs text-indigo-400">{skill.college || 'Stanford University'}</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full-stack software developer & open-source contributor. Dedicated to helping junior engineers level up.
              </p>
              <button
                onClick={() => setCurrentPage('chat')}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Message Mentor
              </button>
            </div>
          </GlassCard>
        </div>

      </div>

      {showBookingModal && (
        <BookingModal
          skill={skill}
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => setCurrentPage('dashboard')}
        />
      )}

    </div>
  );
}
