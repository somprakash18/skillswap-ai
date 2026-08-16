import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Camera, Edit3, Check, Award, GraduationCap, MapPin, Globe, Github, Linkedin, Twitter, Sparkles, BookOpen, Users, ShieldCheck } from 'lucide-react';

export default function UserProfilePage() {
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user ? user.fullName : 'Som Prakash');
  const [college, setCollege] = useState(user ? user.college || 'SkillSwap AI Founder Office' : 'SkillSwap AI Founder Office');
  const [branch, setBranch] = useState(user ? user.branch || 'Computer Science & AI' : 'Computer Science & AI');
  const [bio, setBio] = useState(user ? user.bio || 'Founder & Lead Architect of SkillSwap AI EdTech Platform.' : 'Founder & Lead Architect of SkillSwap AI EdTech Platform.');
  const [avatarUrl, setAvatarUrl] = useState(user ? user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=1200');

  const certificates = [
    { id: 1, title: 'JEE Advanced Physics Rotational Dynamics Mastery', mentor: 'Rohan Verma (AIR 142)', code: 'SKILLSWAP-JEE-2026-8841', date: 'Aug 14, 2026' },
    { id: 2, title: 'Java Spring Boot 3 Enterprise Microservices', mentor: 'Alex Chen (Stanford Senior)', code: 'SKILLSWAP-JAVA-2026-9023', date: 'Aug 10, 2026' }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const triggerCloudinaryUpload = (type) => {
    const newUrl = prompt(`Enter Cloudinary image URL for your ${type}:`, type === 'avatar' ? avatarUrl : coverUrl);
    if (newUrl) {
      if (type === 'avatar') setAvatarUrl(newUrl);
      else setCoverUrl(newUrl);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Profile Card Container */}
      <div className="theme-card p-0 overflow-hidden space-y-0">
        
        {/* Cover Photo */}
        <div className="h-48 sm:h-64 w-full relative bg-slate-800">
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
          <button
            onClick={() => triggerCloudinaryUpload('cover photo')}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 border border-white/20 transition"
          >
            <Camera className="w-4 h-4" />
            <span>Edit Cover</span>
          </button>
        </div>

        {/* Profile Details Container */}
        <div className="p-6 sm:p-8 space-y-6 -mt-16 sm:-mt-20 relative z-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            
            {/* Avatar & Name */}
            <div className="flex items-end gap-4">
              <div className="relative group">
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl"
                />
                <button
                  onClick={() => triggerCloudinaryUpload('profile photo')}
                  className="absolute bottom-1 right-1 p-2 rounded-xl bg-blue-600 text-white shadow-md hover:scale-105 transition"
                  title="Upload to Cloudinary"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="pb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  {fullName}
                  <ShieldCheck className="w-5 h-5 text-blue-600 fill-blue-600 text-white" />
                </h1>
                <p className="text-xs text-slate-500 font-medium">{college} • {branch}</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary text-xs font-bold px-4 py-2.5 self-start sm:self-auto"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Social Stats Counters */}
          <div className="flex items-center gap-6 pt-2 border-t border-b border-slate-100 dark:border-slate-800 py-3 text-xs">
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white text-base">1,240</span>
              <span className="text-slate-400 font-medium ml-1.5">Followers</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white text-base">48</span>
              <span className="text-slate-400 font-medium ml-1.5">Following</span>
            </div>
            <div>
              <span className="font-extrabold text-amber-500 text-base">2 Certificates</span>
              <span className="text-slate-400 font-medium ml-1.5">Earned</span>
            </div>
          </div>

          {/* Bio & Form */}
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full theme-input text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">College / University</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full theme-input text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Branch & Specialization</label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full theme-input text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Bio</label>
                <textarea
                  rows="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full theme-input text-xs"
                />
              </div>

              <button type="submit" className="btn-primary text-xs font-bold py-2.5 px-6">
                Save Profile Changes
              </button>
            </form>
          ) : (
            <div className="space-y-3 pt-2 text-xs text-slate-600 dark:text-slate-300">
              <p className="text-sm leading-relaxed">{bio}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="tag-offer">Spring Boot 3</span>
                <span className="tag-offer">React.js</span>
                <span className="tag-offer">MySQL DDL</span>
                <span className="tag-looking">JEE Advanced Physics</span>
                <span className="tag-looking">NEET Biology</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Earned Certificates Showcase */}
      <div className="theme-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Earned SkillSwap Certificates ({certificates.length})</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">QR Verified Educational Credentials</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-amber-600 dark:text-amber-400">{cert.code}</span>
                <span className="text-[10px] text-slate-400">{cert.date}</span>
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">{cert.title}</h4>
              <p className="text-slate-500">Mentor: {cert.mentor}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
