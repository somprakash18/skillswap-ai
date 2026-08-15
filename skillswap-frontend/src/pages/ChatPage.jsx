import React, { useState } from 'react';
import { Send, Video, Phone, Paperclip, MoreVertical, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Priya Sharma', text: 'Hi Alex! Looking forward to our Spring Boot session tomorrow.', time: '10:14 AM', isSelf: false },
    { id: 2, sender: 'Alex Chen', text: 'Hey Priya! Absolutely, I have prepared code examples for JWT security setup.', time: '10:16 AM', isSelf: true },
    { id: 3, sender: 'Priya Sharma', text: 'Awesome! Should I review any specific docs beforehand?', time: '10:18 AM', isSelf: false }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: user.fullName,
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMsg('');

    // Simulated instant reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'Priya Sharma',
        text: 'Got it! See you in the meeting room tomorrow.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false
      }]);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[75vh]">
        
        {/* Active Conversations Sidebar */}
        <GlassCard className="md:col-span-1 p-4 flex flex-col justify-between overflow-y-auto">
          <div>
            <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              Active Chats
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center gap-3 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Priya" className="w-10 h-10 rounded-xl object-cover" />
                <div className="overflow-hidden">
                  <h4 className="font-semibold text-xs text-white">Priya Sharma</h4>
                  <p className="text-[11px] text-indigo-300 truncate">Spring Boot Session</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Conversation View */}
        <GlassCard className="md:col-span-3 p-0 flex flex-col overflow-hidden border border-white/10">
          
          {/* Chat Header */}
          <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Priya" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-sm text-white">Priya Sharma</h4>
                <p className="text-[11px] text-emerald-400 font-medium">● Online — Mentorship Chat</p>
              </div>
            </div>

            <a
              href="https://meet.jit.si/skillswap-session-spring-101"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl gradient-btn text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Video className="w-4 h-4" />
              Join Call
            </a>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-md px-4 py-2.5 rounded-2xl text-xs ${
                  m.isSelf ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white/10 text-slate-200 rounded-bl-none'
                }`}>
                  <p>{m.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 bg-white/5 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 glass-input px-4 py-2.5 rounded-xl text-xs"
            />
            <button type="submit" className="p-2.5 rounded-xl gradient-btn text-white">
              <Send className="w-4 h-4" />
            </button>
          </form>

        </GlassCard>

      </div>
    </div>
  );
}
