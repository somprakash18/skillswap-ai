import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Download, Lock, CheckCircle, Sparkles, BookOpen, Award, FileText, X } from 'lucide-react';
import QuizModule from '../components/QuizModule';

export default function StudyMaterialsPage({ setCurrentPage }) {
  const { user } = useAuth();
  const [showSubModal, setShowSubModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const isSubscribed = user?.isSubscribed || user?.isFounder;

  const pdfMaterials = [
    {
      id: 1,
      title: 'JEE Advanced Physics 500+ Q&A Master Question Bank',
      category: 'JEE Main & Advanced',
      pages: '142 Pages PDF',
      size: '12.4 MB',
      description: 'Complete solved mechanics, electrodynamics, calculus tricks, and 10-year PYQ answer keys.',
      filename: 'JEE_Advanced_Physics_QA_Mastery_Bank.pdf',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    {
      id: 2,
      title: 'NEET Biology NCERT Line-by-Line 360/360 Q&A Bank',
      category: 'NEET UG Medical',
      pages: '185 Pages PDF',
      size: '15.8 MB',
      description: 'Line-by-line NCERT questions, human physiology diagrams, and genetics memory maps.',
      filename: 'NEET_Biology_NCERT_360_QA_Bank.pdf',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      id: 3,
      title: 'Java Core & Spring Boot Microservices Interview Q&A',
      category: 'Java & Spring',
      pages: '98 Pages PDF',
      size: '8.2 MB',
      description: 'Top 100 Spring Security, JPA Hibernate, and System Design interview questions with answers.',
      filename: 'Java_Spring_Boot_Interview_QA_Bank.pdf',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    },
    {
      id: 4,
      title: 'Python, PyTorch & LLM Fine-Tuning Code Q&A Guide',
      category: 'Python & AI',
      pages: '110 Pages PDF',
      size: '9.5 MB',
      description: 'Complete code solutions for Transformers, CUDA setup, and Data Science interview Q&A.',
      filename: 'Python_Data_Science_AI_QA_Bank.pdf',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
    }
  ];

  const handleDownload = (material) => {
    if (!isSubscribed) {
      setShowSubModal(true);
      return;
    }

    // Trigger local PDF file download
    const element = document.createElement("a");
    const file = new Blob([`SkillSwap AI Official Q&A Document: ${material.title}\n\nDownloaded by: ${user?.fullName} (${user?.email})\nSubscription Status: Verified Pro\n\nContent:\n${material.description}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = material.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadSuccess(`Downloaded ${material.filename} successfully!`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Subscription PDF Downloads & Quizzes
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">Study Materials & Q&A PDF Banks</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Download official JEE, NEET & Tech Question Bank PDFs with detailed answer keys & solutions.</p>
        </div>

        {isSubscribed ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>Pro Subscription Active — Unlimited Downloads</span>
          </div>
        ) : (
          <button
            onClick={() => setShowSubModal(true)}
            className="btn-primary-blue text-xs font-bold px-4 py-2.5 flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Unlock PDF Downloads (₹299/mo)</span>
          </button>
        )}
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Interactive Practice Quiz Widget */}
      <QuizModule onUnlockPro={() => setShowSubModal(true)} />

      {/* Downloadable PDF Question Banks Grid */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          Official Q&A Question Bank PDFs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pdfMaterials.map((mat) => (
            <div key={mat.id} className="theme-card space-y-4 flex flex-col justify-between border border-slate-100 dark:border-white/10 hover:border-blue-500/30">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${mat.color}`}>
                    {mat.category}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">{mat.pages} • {mat.size}</span>
                </div>

                <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">{mat.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{mat.description}</p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleDownload(mat)}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                  isSubscribed
                    ? 'btn-success-green'
                    : 'bg-slate-900 dark:bg-white/10 text-white hover:bg-slate-800'
                }`}
              >
                {isSubscribed ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4 text-amber-400" />}
                <span>{isSubscribed ? `Download ${mat.filename}` : 'Pro Subscription Required to Download'}</span>
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* Subscription Gate Modal */}
      {showSubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md theme-card p-6 border border-amber-500/30 shadow-2xl space-y-5 relative">
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">SkillSwap Pro Subscription</h3>
              </div>
              <button onClick={() => setShowSubModal(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                PDF Question Banks & Answer Key downloads require an active <span className="font-bold text-amber-500">SkillSwap AI Pro Subscription</span>.
              </p>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                <p className="font-bold text-amber-600 dark:text-amber-400 text-sm">Pro Subscription Benefits:</p>
                <ul className="space-y-1 text-slate-700 dark:text-slate-200">
                  <li>✓ Unlimited PDF Question Bank & Solution Downloads</li>
                  <li>✓ Full JEE, NEET & Tech Practice Quizzes</li>
                  <li>✓ 100 Extra Bonus Wallet Credits Every Month</li>
                </ul>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    setCurrentPage('pricing');
                    setShowSubModal(false);
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl shadow-md text-xs"
                >
                  Upgrade to Pro Subscription (₹299 / month)
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
