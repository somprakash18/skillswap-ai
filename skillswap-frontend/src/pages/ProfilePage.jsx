import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, CheckCircle, Star, Edit3, Share2, Settings, Award, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const profileData = {
    name: user ? user.fullName : 'Albert Jones',
    location: 'Toronto, Canada',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Aspiring photographer specializing in portraiture and landscape photography. Eager to collaborate and explore new creative avenues.',
    stats: { completed: 12, ongoing: 3, mutuals: 2 },
    offers: ['Portrait Photography', 'Basic DSLR Tips', 'Lighting Tips', 'Composition Techniques'],
    lookingFor: ['Guitar Lessons', 'Spring Boot Backend', 'UI/UX Wireframing']
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      
      {/* Profile Card (Matching Image 3) */}
      <div className="theme-card p-0 overflow-hidden relative shadow-xl">
        
        {/* Cover Hero Photo */}
        <div className="h-64 relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600">
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Action Icons Top Right */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition">
              <Settings className="w-4 h-4" />
            </button>
            <button onClick={handleShare} className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-6 -mt-12 relative z-10">
          
          {/* Avatar & Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">{profileData.name}</h1>
              {profileData.verified && <CheckCircle className="w-5 h-5 text-blue-500 fill-blue-500 text-white" />}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {profileData.location}
            </p>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {profileData.bio}
          </p>

          {/* 3 Stat Cards Row (Matching Image 3) */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <p className="text-lg font-black text-slate-900 dark:text-white">{profileData.stats.completed}</p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Completed</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <p className="text-lg font-black text-blue-600 dark:text-blue-400">{profileData.stats.ongoing}</p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Ongoing</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <p className="text-lg font-black text-emerald-500">{profileData.stats.mutuals}</p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Mutuals</p>
            </div>
          </div>

          {/* Offers Tags */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Offers...</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.offers.map((off, i) => (
                <span key={i} className="tag-offer text-xs">{off}</span>
              ))}
            </div>
          </div>

          {/* Looking For Tags */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-500">Looking For...</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.lookingFor.map((look, i) => (
                <span key={i} className="tag-looking text-xs">{look}</span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
