import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-cyan-400" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 glass-panel border border-white/10 px-4 py-3 rounded-2xl shadow-2xl animate-bounce">
      {icons[type]}
      <span className="text-sm font-medium text-white">{message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-white transition">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
