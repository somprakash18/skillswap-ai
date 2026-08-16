import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Sparkles, MoreVertical, X } from 'lucide-react';

export default function LiveVideoCallRoom({ session, onEndCall }) {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [showInCallChat, setShowInCallChat] = useState(false);
  const [inCallMessages, setInCallMessages] = useState([
    { sender: 'Al Harden', text: 'Hey Jenny! Great to see you in our Still Life painting session.' },
    { sender: 'You', text: 'Hi Al! Ready with my canvas & brushes.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const mentorName = session?.mentorName || 'Al Harden';
  const topic = session?.skillTitle || 'Learning Still Life Painting';

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setInCallMessages(prev => [...prev, { sender: 'You', text: chatInput }]);
    setChatInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden animate-fade-in">
      
      {/* Video Container (Matching Image 2 Screen 3) */}
      <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
        
        {/* Mentor Live Video Stream / Avatar */}
        {videoOn ? (
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
            alt={mentorName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
              alt={mentorName}
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-700 shadow-2xl"
            />
            <p className="text-white font-bold text-lg">{mentorName} (Camera Off)</p>
          </div>
        )}

        {/* Dark Gradient Overlay for Control Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

        {/* Top Header Overlay */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 text-white">
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            <span className="text-xs font-mono font-bold">LIVE 12:41</span>
          </div>

          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-right">
            <h3 className="font-extrabold text-sm text-white">{mentorName}</h3>
            <p className="text-[11px] text-slate-300">{topic}</p>
          </div>
        </div>

        {/* Self Video PIP (Picture-in-Picture) */}
        <div className="absolute top-20 right-6 w-32 h-44 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl z-10 hidden sm:block">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300"
            alt="You"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold">You</span>
        </div>

        {/* Floating Session Progress Widget (Matching Image 2 Screen 3 Overlay) */}
        <div className="absolute bottom-28 left-6 bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-white z-10 flex items-center gap-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-purple-600/60 flex items-center justify-center font-bold text-xs border border-white/20">
            77%
          </div>
          <div>
            <p className="text-[10px] text-slate-200 uppercase font-bold tracking-wider">Session Progress</p>
            <p className="text-xs font-extrabold text-white">Learning Still Life Painting</p>
          </div>
        </div>

        {/* In-Call Chat Overlay Drawer */}
        {showInCallChat && (
          <div className="absolute right-6 bottom-28 w-80 h-96 bg-black/80 backdrop-blur-md rounded-3xl border border-white/20 p-4 flex flex-col justify-between z-20 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-white/10 text-white">
              <h4 className="font-bold text-xs flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                In-Call Chat
              </h4>
              <button onClick={() => setShowInCallChat(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 py-2">
              {inCallMessages.map((m, i) => (
                <div key={i} className="text-xs bg-white/10 p-2 rounded-xl text-white">
                  <span className="font-bold text-blue-400 block text-[10px]">{m.sender}</span>
                  <p className="text-slate-200">{m.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-white/10">
              <input
                type="text"
                placeholder="Send a note..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-white/10 text-white text-xs px-3 py-1.5 rounded-xl outline-none"
              />
              <button type="submit" className="bg-blue-600 px-3 py-1.5 rounded-xl text-white text-xs font-bold">
                Send
              </button>
            </form>
          </div>
        )}

        {/* Bottom Call Controls (Matching Image 2 Screen 3 Controls) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/15 z-30 shadow-2xl">
          
          {/* Mic Button */}
          <button
            onClick={() => setMicOn(!micOn)}
            className={`p-3.5 rounded-full transition ${micOn ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-rose-500 text-white'}`}
          >
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* End Call Button (Red Circle) */}
          <button
            onClick={onEndCall}
            className="p-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition shadow-lg shadow-rose-600/40 transform hover:scale-110"
            title="End Session"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          {/* Video Camera Button */}
          <button
            onClick={() => setVideoOn(!videoOn)}
            className={`p-3.5 rounded-full transition ${videoOn ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-rose-500 text-white'}`}
          >
            {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* Chat Toggle */}
          <button
            onClick={() => setShowInCallChat(!showInCallChat)}
            className="p-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

        </div>

      </div>

    </div>
  );
}
