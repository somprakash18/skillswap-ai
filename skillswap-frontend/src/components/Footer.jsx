import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="glass-panel border-t border-white/10 mt-20 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-btn flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">SkillSwap <span className="gradient-text">AI</span></span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            The AI-powered credit marketplace empowering students and creators to trade skills, build resumes, and accelerate learning.
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition"><Github className="w-5 h-5" /></a>
            <a href="#" className="hover:text-indigo-400 transition"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-indigo-400 transition"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-semibold text-sm text-white uppercase tracking-wider mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><button onClick={() => setCurrentPage('explore')} className="hover:text-indigo-400 transition">Explore Skills</button></li>
            <li><button onClick={() => setCurrentPage('pricing')} className="hover:text-indigo-400 transition">Credit Pricing</button></li>
            <li><button onClick={() => setCurrentPage('certificates')} className="hover:text-indigo-400 transition">Certificates</button></li>
            <li><button onClick={() => setCurrentPage('faq')} className="hover:text-indigo-400 transition">FAQ & Help</button></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-semibold text-sm text-white uppercase tracking-wider mb-4">Community</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-indigo-400 transition">Campus Chapters</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Mentor Leaderboard</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Student Stories</a></li>
            <li><button onClick={() => setCurrentPage('contact')} className="hover:text-indigo-400 transition">Contact Us</button></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-semibold text-sm text-white uppercase tracking-wider mb-4">Newsletter</h4>
          <p className="text-xs text-slate-400 mb-3">Get weekly AI roadmap insights & new mentorship drops.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="glass-input px-3 py-2 rounded-xl text-xs flex-1"
            />
            <button className="gradient-btn text-white text-xs font-semibold px-3 py-2 rounded-xl">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <p>© 2026 SkillSwap AI Inc. Built for top student tech communities.</p>
        <p className="flex items-center gap-1">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for global student developers.
        </p>
      </div>
    </footer>
  );
}
