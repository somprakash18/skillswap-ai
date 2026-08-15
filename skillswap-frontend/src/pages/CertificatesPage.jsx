import React, { useState } from 'react';
import { Award, Download, CheckCircle2, ShieldCheck, ExternalLink, Printer } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: 1,
      skillTitle: 'Docker & Kubernetes Cloud Infrastructure',
      mentorName: 'Sarah Jenkins',
      learnerName: 'Alex Chen',
      issuedDate: 'August 12, 2026',
      code: 'CERT-SKILLSWAP-2026-884920'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      <div>
        <h1 className="text-3xl font-extrabold text-white">Your Verified Certificates</h1>
        <p className="text-sm text-slate-400 mt-1">Download and feature cryptographically verified completion badges on your resume & LinkedIn.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <GlassCard key={cert.id} className="border border-emerald-500/20 space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                VERIFIED HASH
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-white">{cert.skillTitle}</h3>
              <p className="text-xs text-slate-400 mt-1">Mentored by <span className="text-slate-200 font-semibold">{cert.mentorName}</span></p>
              <p className="text-[11px] text-slate-500 mt-0.5">Issued on {cert.issuedDate}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 font-mono text-xs text-indigo-300 flex justify-between items-center">
              <span className="truncate">{cert.code}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCert(cert)}
                className="flex-1 py-2 rounded-xl gradient-btn text-white text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                View & Print
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Printable Certificate Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-950 border-4 border-indigo-500/40 rounded-3xl p-8 text-center text-white space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="w-16 h-16 rounded-full gradient-btn flex items-center justify-center mx-auto shadow-xl">
              <Award className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Certificate of Completion</span>
              <h2 className="text-3xl font-extrabold gradient-text">{selectedCert.skillTitle}</h2>
              <p className="text-sm text-slate-300">This certifies that <strong className="text-white">{selectedCert.learnerName}</strong> has successfully completed 1-on-1 mentorship with <strong className="text-white">{selectedCert.mentorName}</strong>.</p>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs text-slate-400 font-mono">
              <div>
                <p>Verification Code: {selectedCert.code}</p>
                <p>SkillSwap AI Campus Network</p>
              </div>
              <button
                onClick={handlePrint}
                className="px-4 py-2 gradient-btn text-white rounded-xl font-bold font-sans text-xs flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
