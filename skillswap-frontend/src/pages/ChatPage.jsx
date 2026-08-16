import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Send, Video, MessageSquare, Search, CheckCircle, Clock, Check, X, Paperclip, Smile, ShieldCheck, Zap } from 'lucide-react';

export default function ChatPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeChat, setActiveChat] = useState('Ava Patel');
  const [isTyping, setIsTyping] = useState(false);

  const [conversations, setConversations] = useState([
    { id: 1, name: 'Ava Patel', status: 'Confirmed', statusColor: 'bg-emerald-500 text-white', text: 'Awesome! Can we do early morning session?', time: '15 min ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { id: 2, name: 'Ava Meyer', status: 'Pending', statusColor: 'bg-amber-500 text-white', text: 'You Set works! Bring your guitar?', time: 'Just Now', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    { id: 3, name: 'Leo Martinez', status: 'In Review', statusColor: 'bg-blue-600 text-white', text: 'Great! I can print those brackets.', time: '5 min ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
  ]);

  const [swapRequests, setSwapRequests] = useState([
    { id: 101, name: 'Noah Kim', proposal: 'Frontend ↔ Guitar', time: '15 min ago', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Ava Patel', text: 'Hi Alex! Looking forward to our Spring Boot & Guitar session.', time: '10:14 AM', isSelf: false },
    { id: 2, sender: 'Alex Chen', text: 'Hey Ava! Absolutely, I have prepared code examples and guitar chords.', time: '10:16 AM', isSelf: true },
    { id: 3, sender: 'Ava Patel', text: 'Awesome! Can we do early morning session tomorrow?', time: '10:18 AM', isSelf: false }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: user && user.fullName ? user.fullName : 'Alex Chen',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMsg('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: activeChat,
        text: 'Got it! Looking forward to our video session.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false
      }]);
    }, 1500);
  };

  const handleAcceptRequest = (id) => {
    setSwapRequests(prev => prev.filter(r => r.id !== id));
    alert('Swap Request Accepted! Connection added.');
  };

  const handleDeclineRequest = (id) => {
    setSwapRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-500/20">
            Real-Time WebSocket STOMP Engine
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Chats & Swap Requests</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time messaging, typing status, and video call integration.</p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3.5 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>WebSocket STOMP Connected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[75vh]">
        
        {/* Left Column: Conversations List */}
        <div className="lg:col-span-1 theme-card p-4 flex flex-col justify-between overflow-y-auto space-y-5">
          
          <div className="space-y-4">
            
            {/* Search Bar */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full theme-input pl-11 text-xs py-2 font-medium"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
              {['All', 'Pending', 'Confirmed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition ${
                    filter === f ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Active Conversations */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Conversations</h4>
              {conversations.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveChat(c.name)}
                  className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition ${
                    activeChat === c.name ? 'bg-blue-50 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30' : 'bg-slate-50 dark:bg-white/5 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{c.name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${c.statusColor}`}>{c.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{c.text}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap ml-1">{c.time}</span>
                </div>
              ))}
            </div>

            {/* Swap Requests Section */}
            {swapRequests.length > 0 && (
              <div className="pt-3 border-t border-slate-100 dark:border-white/10 space-y-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Swap Requests</h4>
                {swapRequests.map((req) => (
                  <div key={req.id} className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs">
                    <div className="flex items-center gap-2.5">
                      <img src={req.avatar} alt={req.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{req.name}</span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Proposed swap: <span className="font-semibold text-blue-600 dark:text-blue-400">{req.proposal}</span></p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleAcceptRequest(req.id)}
                        className="flex-1 btn-primary-blue text-xs font-bold py-1.5"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(req.id)}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-1.5 rounded-xl transition"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Active Conversation Feed */}
        <div className="lg:col-span-2 theme-card p-0 flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="p-4 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt={activeChat} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{activeChat}</h4>
                <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online • Active Session
                </p>
              </div>
            </div>

            <a
              href="https://meet.jit.si/skillswap-session-spring-101"
              target="_blank"
              rel="noreferrer"
              className="btn-primary-blue text-xs font-bold px-3.5 py-2"
            >
              <Video className="w-4 h-4" />
              <span>Join Video Call</span>
            </a>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-md px-4 py-2.5 rounded-2xl text-xs ${
                  m.isSelf ? 'bg-blue-600 text-white rounded-br-none shadow-sm' : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 rounded-bl-none'
                }`}>
                  <p>{m.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1 flex items-center gap-1">
                  {m.time} {m.isSelf && <CheckCircle className="w-3 h-3 text-blue-500" />}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                {activeChat} is typing...
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/10 flex items-center gap-2">
            
            <button type="button" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white">
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Type your message via WebSockets..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 theme-input text-xs py-2.5"
            />

            <button type="submit" className="btn-primary-blue p-2.5 rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
