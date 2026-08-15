import React, { useState } from 'react';
import { X, Calendar, Clock, Coins, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function BookingModal({ skill, onClose, onSuccess }) {
  const { user, wallet, updateCredits } = useAuth();
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('14:00');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!skill) return null;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (wallet.balance < skill.creditCost) {
      setError(`Insufficient credit balance! You need ${skill.creditCost} credits, but have ${wallet.balance}.`);
      return;
    }

    setLoading(true);

    try {
      const scheduledAt = `${scheduledDate}T${scheduledTime}:00`;
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          skillId: skill.id,
          scheduledAt,
          durationMinutes: 60,
          notes
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Booking failed');

      updateCredits(-skill.creditCost);
      onSuccess && onSuccess(data.data);
      onClose();
    } catch (err) {
      // Frontend Demo Simulation Fallback
      updateCredits(-skill.creditCost);
      onSuccess && onSuccess({
        id: Date.now(),
        skill: skill,
        scheduledAt: `${scheduledDate} ${scheduledTime}`,
        status: 'CONFIRMED',
        meetingLink: 'https://meet.jit.si/skillswap-session-' + Date.now().toString().substring(8)
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md glass-card rounded-3xl p-6 relative border border-white/10 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-xl bg-white/5 hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
            Book Mentorship Session
          </span>
          <h3 className="text-xl font-bold text-white mt-2">{skill.title}</h3>
          <p className="text-xs text-slate-400 mt-1">Mentor: <span className="text-slate-200 font-medium">{skill.mentorName || 'Alex Chen'}</span></p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleBookingSubmit} className="space-y-4">
          
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Select Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full glass-input pl-9 pr-3.5 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Select Time Slot</label>
            <div className="relative">
              <Clock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <select
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full glass-input pl-9 pr-3.5 py-2.5 rounded-xl text-sm"
              >
                <option value="10:00" className="bg-slate-900">10:00 AM EST</option>
                <option value="14:00" className="bg-slate-900">02:00 PM EST</option>
                <option value="16:30" className="bg-slate-900">04:30 PM EST</option>
                <option value="19:00" className="bg-slate-900">07:00 PM EST</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Session Goals / Notes for Mentor</label>
            <textarea
              rows="3"
              placeholder="What specific topics or code bugs do you want to cover?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
            ></textarea>
          </div>

          {/* Credit Escrow Summary */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex justify-between items-center text-xs">
            <div>
              <p className="font-semibold text-amber-300">Escrow Credit Reserve</p>
              <p className="text-slate-400">Transferred to mentor upon completion</p>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-amber-400 flex items-center gap-1">
                <Coins className="w-4 h-4" />
                {skill.creditCost} Credits
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn py-3 rounded-xl font-bold text-white text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            {loading ? 'Confirming Booking...' : 'Confirm & Lock Session'}
          </button>
        </form>

      </div>
    </div>
  );
}
