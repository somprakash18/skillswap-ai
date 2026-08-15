import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <GlassCard className="border border-indigo-500/20 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-2">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Get in Touch</h1>
          <p className="text-xs text-slate-400">Have questions or want to partner your college society with SkillSwap AI?</p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="font-bold text-base text-white">Message Sent!</h3>
            <p className="text-xs text-slate-300">Our team will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Your Name</label>
              <input type="text" required placeholder="Alex Chen" className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Email Address</label>
              <input type="email" required placeholder="alex@stanford.edu" className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Message</label>
              <textarea rows="4" required placeholder="How can we help your tech society?" className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"></textarea>
            </div>
            <button type="submit" className="w-full gradient-btn py-3 rounded-xl font-bold text-white text-sm shadow-lg flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        )}
      </GlassCard>
    </div>
  );
}
