import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Coins, ArrowUpRight, ArrowDownLeft, ShieldCheck, CheckCircle2, CreditCard, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function WalletPage() {
  const { wallet, updateCredits } = useAuth();
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);

  const creditPacks = [
    { credits: 50, priceInr: 299, bonus: 'Standard Pack' },
    { credits: 120, priceInr: 599, bonus: '+20 Bonus Credits (Popular)', popular: true },
    { credits: 300, priceInr: 1299, bonus: '+60 Bonus Credits' }
  ];

  const transactions = [
    { id: 1, type: 'EARNED', amount: 35, desc: 'Earned from teaching Spring Boot Session #101', date: '2 hours ago' },
    { id: 2, type: 'PURCHASED', amount: 100, desc: 'Purchased Premium Credits via Razorpay', date: '1 day ago' },
    { id: 3, type: 'SPENT', amount: -15, desc: 'Spent on Fine-Tuning LLMs Session', date: '3 days ago' },
    { id: 4, type: 'SIGNUP_BONUS', amount: 50, desc: 'Welcome Signup Bonus Credits', date: '1 week ago' }
  ];

  const handleRazorpaySimulate = (pack) => {
    setSelectedPack(pack);
    setShowRazorpayModal(true);
  };

  const handlePaymentSuccess = () => {
    updateCredits(selectedPack.credits);
    setShowRazorpayModal(false);
    alert(`Payment Successful! ${selectedPack.credits} credits added via Razorpay.`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <GlassCard className="border border-amber-500/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Credit Balance
            </span>
            <h1 className="text-4xl font-black text-white mt-2 flex items-center gap-2">
              <Coins className="w-8 h-8 text-amber-400" />
              {wallet.balance} <span className="text-lg font-semibold text-slate-300">Credits</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Earn credits by teaching or top-up using Razorpay.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <p className="text-slate-400">Total Earned</p>
              <p className="text-lg font-bold text-emerald-400">+{wallet.totalEarned || 85}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
              <p className="text-slate-400">Total Spent</p>
              <p className="text-lg font-bold text-rose-400">-{wallet.totalSpent || 45}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Credit Top-up Packages */}
      <div>
        <h3 className="font-extrabold text-xl text-white mb-4">Top-up Credits via Razorpay</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creditPacks.map((pack, idx) => (
            <GlassCard key={idx} className={`relative ${pack.popular ? 'border-2 border-indigo-500 shadow-indigo-500/20' : ''}`}>
              {pack.popular && (
                <span className="absolute -top-3 right-4 bg-indigo-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">
                  Most Popular
                </span>
              )}
              <h4 className="font-black text-2xl text-white flex items-center gap-1">
                <Coins className="w-6 h-6 text-amber-400" />
                {pack.credits} Credits
              </h4>
              <p className="text-xs text-indigo-300 font-medium mt-1">{pack.bonus}</p>
              <div className="my-4 text-3xl font-black text-white">₹{pack.priceInr}</div>
              <button
                onClick={() => handleRazorpaySimulate(pack)}
                className="w-full gradient-btn py-2.5 rounded-xl font-bold text-white text-xs shadow-lg shadow-indigo-500/25"
              >
                Buy Pack
              </button>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Transaction History Table */}
      <GlassCard>
        <h3 className="font-extrabold text-lg text-white mb-4">Transaction Log</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {tx.amount > 0 ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-semibold text-white">{tx.desc}</p>
                  <p className="text-slate-400">{tx.date}</p>
                </div>
              </div>
              <span className={`font-bold text-sm ${tx.amount > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                {tx.amount > 0 ? `+${tx.amount}` : tx.amount} Credits
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Razorpay Simulation Modal */}
      {showRazorpayModal && selectedPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-sm glass-card rounded-3xl p-6 text-center space-y-4 border border-indigo-500/30">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">Razorpay Secure Checkout</h3>
            <p className="text-xs text-slate-300">
              Purchasing <span className="font-bold text-amber-400">{selectedPack.credits} Credits</span> for <span className="font-bold text-white">₹{selectedPack.priceInr}</span>
            </p>
            <div className="p-3 rounded-xl bg-white/5 text-left text-xs font-mono text-slate-400 space-y-1">
              <p>Merchant: SkillSwap AI Inc.</p>
              <p>Order ID: order_rzp_demo99481</p>
              <p>Status: Signature Verified</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowRazorpayModal(false)} className="flex-1 py-2.5 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold">
                Cancel
              </button>
              <button onClick={handlePaymentSuccess} className="flex-1 py-2.5 rounded-xl gradient-btn text-white text-xs font-bold shadow-lg">
                Pay ₹{selectedPack.priceInr}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
