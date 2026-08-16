import React, { useState } from 'react';
import { X, Sparkles, MapPin, Calendar, CheckCircle } from 'lucide-react';

export default function NewSwapModal({ onClose, onSubmitSuccess }) {
  const [need, setNeed] = useState('');
  const [offer, setOffer] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('Stanford Campus / Online');
  const [selectedTimes, setSelectedTimes] = useState(['Sat - Morning', 'Sun - Afternoon']);
  const [allowMessaging, setAllowMessaging] = useState(true);

  const availableSlots = ['Sat - Morning', 'Sat - Afternoon', 'Sun - Morning', 'Sun - Afternoon', 'Weekdays Evening'];

  const toggleSlot = (slot) => {
    setSelectedTimes(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSwap = {
      id: Date.now(),
      need,
      offer,
      details,
      location,
      times: selectedTimes,
      allowMessaging
    };
    onSubmitSuccess && onSubmitSuccess(newSwap);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg theme-card p-6 relative border border-slate-200 dark:border-white/10 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-white/10">
          <div>
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">New Swap Request</h3>
            <p className="text-xs text-slate-500">Post what skill you want to learn and what you can teach in return.</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">What's your need? (Skill you want)</label>
            <input
              type="text"
              required
              placeholder="e.g. Guitar Basics, PyTorch, Docker Deployment"
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              className="w-full theme-input"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">What you offer? (Skill you teach)</label>
            <input
              type="text"
              required
              placeholder="e.g. React.js, Portrait Photography, Calculus"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              className="w-full theme-input"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Details & Preferences</label>
            <textarea
              rows="3"
              placeholder="Add timing, experience level, preferred topics, or meeting guidelines..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full theme-input"
            ></textarea>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full theme-input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">When you're available?</label>
            <div className="flex flex-wrap gap-2">
              {availableSlots.map((slot) => {
                const selected = selectedTimes.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => toggleSlot(slot)}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                      selected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="messagingCheck"
              checked={allowMessaging}
              onChange={(e) => setAllowMessaging(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="messagingCheck" className="text-slate-600 dark:text-slate-300 font-medium">
              Allow nearby users & classmates to message me
            </label>
          </div>

          <button
            type="submit"
            className="w-full btn-primary-blue py-3 rounded-xl font-bold text-sm shadow-md"
          >
            Post Swap Request
          </button>
        </form>

      </div>
    </div>
  );
}
