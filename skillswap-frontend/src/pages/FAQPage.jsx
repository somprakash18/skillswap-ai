import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: 'How does SkillSwap AI work?', a: 'SkillSwap AI is a peer-to-peer credit economy. You earn credits by teaching skills to other students and spend credits to receive 1-on-1 mentorship or generate AI roadmaps.' },
    { q: 'What happens if a mentor misses a session?', a: 'If a mentor fails to attend or cancels, your escrowed credits are automatically refunded to your wallet instantly.' },
    { q: 'Are the certificates verified?', a: 'Yes! Every certificate contains a unique cryptographic code that can be verified publicly at /certificates/verify/{code}.' },
    { q: 'How do Razorpay credit top-ups work?', a: 'You can instantly buy credit packages in INR using UPI, Credit Cards, or Netbanking via Razorpay.' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Help & Frequently Asked Questions</h1>
        <p className="text-sm text-slate-400">Everything you need to know about SkillSwap AI.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <GlassCard
            key={idx}
            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
            className="cursor-pointer"
          >
            <div className="flex justify-between items-center font-semibold text-sm text-white">
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-indigo-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
            </div>
            {activeFaq === idx && (
              <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-white/5 leading-relaxed">
                {faq.a}
              </p>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
