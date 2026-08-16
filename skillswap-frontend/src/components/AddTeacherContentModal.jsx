import React, { useState } from 'react';
import { X, PlusCircle, BookOpen, GraduationCap, Award, Upload, CheckCircle2 } from 'lucide-react';
import GlassCard from './GlassCard';

export default function AddTeacherContentModal({ onClose, onPublishSuccess }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('JEE Prep');
  const [teacherName, setTeacherName] = useState('');
  const [qualification, setQualification] = useState('');
  const [offers, setOffers] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [creditCost, setCreditCost] = useState('15');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newListing = {
        id: Date.now(),
        name: teacherName || 'Verified Educator',
        verified: true,
        qualification: qualification || 'Subject Specialist',
        category,
        distance: 'Campus Verified',
        rating: 5.0,
        reviews: 1,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        bio: bio || `Offering expert 1-on-1 mentorship sessions in ${title}.`,
        offers: offers ? offers.split(',').map(s => s.trim()) : [title],
        lookingFor: lookingFor ? lookingFor.split(',').map(s => s.trim()) : ['Python', 'Web Dev'],
        creditCost: parseInt(creditCost) || 15
      };

      // Store in localStorage to persist across navigation
      const existing = JSON.parse(localStorage.getItem('teacher_listings') || '[]');
      existing.unshift(newListing);
      localStorage.setItem('teacher_listings', JSON.stringify(existing));

      setLoading(false);
      setSuccessMsg('Course published successfully into ' + category + ' section!');

      setTimeout(() => {
        onPublishSuccess && onPublishSuccess(newListing);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-lg theme-card p-6 border border-blue-500/30 shadow-2xl space-y-5 relative my-8">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Publish Course / Mentor Content</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Add content for JEE, NEET, Coding, Guitar, or Music</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Course / Topic Title</label>
            <input
              type="text"
              required
              placeholder="e.g. JEE Physics Mechanics & Rotation Mastery"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full theme-input text-xs py-2.5 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full theme-input text-xs py-2.5 font-bold"
              >
                <option value="JEE Prep">🎓 JEE Prep</option>
                <option value="NEET Prep">🩺 NEET Prep</option>
                <option value="Coding">💻 Coding</option>
                <option value="Guitar">🎸 Guitar</option>
                <option value="Music">🎵 Music</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Credit Cost</label>
              <input
                type="number"
                required
                min="5"
                max="100"
                value={creditCost}
                onChange={(e) => setCreditCost(e.target.value)}
                className="w-full theme-input text-xs py-2.5 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Teacher / Mentor Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rohan Verma"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full theme-input text-xs py-2.5 font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Qualification / Rank</label>
              <input
                type="text"
                required
                placeholder="e.g. IIT Bombay AIR 142"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full theme-input text-xs py-2.5 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">What You Offer (comma separated)</label>
            <input
              type="text"
              required
              placeholder="e.g. Mechanics, Calculus Physics, PYQ Solving"
              value={offers}
              onChange={(e) => setOffers(e.target.value)}
              className="w-full theme-input text-xs py-2.5 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">What You Want in Return (comma separated)</label>
            <input
              type="text"
              required
              placeholder="e.g. Python, Web Dev, Guitar Lessons"
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              className="w-full theme-input text-xs py-2.5 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Course Description & Bio</label>
            <textarea
              rows="3"
              placeholder="Provide details about your course sessions, schedule, and PDF notes..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full theme-input text-xs py-2 font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary-blue py-3 rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2"
          >
            {loading ? 'Publishing Course...' : 'Publish Course to Category'}
          </button>

        </form>

      </div>
    </div>
  );
}
