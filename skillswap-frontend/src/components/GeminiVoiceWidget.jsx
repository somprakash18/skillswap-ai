import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, X, Check, RefreshCw, Play, Square, MessageSquare } from 'lucide-react';

export default function GeminiVoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiVoiceResponse, setAiVoiceResponse] = useState('');
  const [activeDomain, setActiveDomain] = useState('JEE'); // 'JEE', 'NEET', 'CODING'

  // Voice AI Presets
  const voicePresets = {
    JEE: {
      question: 'Explain rotational motion down an inclined plane',
      response: 'When a solid sphere rolls down an incline of angle theta without slipping, its acceleration is 5/7 g sin theta. Torque is provided by static friction at the contact point.'
    },
    NEET: {
      question: 'What is the function of Secretin in human digestion?',
      response: 'Secretin is released by mucosal S-cells in the duodenum. It stimulates pancreatic duct cells to secrete water and bicarbonate ions to neutralize stomach acid.'
    },
    CODING: {
      question: 'Explain LinkedList reversal in Java',
      response: 'To reverse a LinkedList iteratively, maintain three pointers: prev, current, and next. In each step, point current.next to prev, then advance both pointers.'
    }
  };

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('Listening to your voice doubt...');
    setAiVoiceResponse('');

    setTimeout(() => {
      setIsListening(false);
      const preset = voicePresets[activeDomain];
      setTranscript(`"${preset.question}"`);
      speakResponse(preset.response);
    }, 2500);
  };

  const speakResponse = (text) => {
    setAiVoiceResponse(text);
    setIsSpeaking(true);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 4000);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <>
      {/* Floating Bottom-Left Voice Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-2xl hover:scale-105 transition-all duration-200 border border-white/20"
        >
          <div className="relative">
            <Mic className="w-5 h-5 animate-pulse text-emerald-200" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-slate-900" />
          </div>
          <span className="font-extrabold text-xs tracking-wide">🎙️ Gemini Voice AI</span>
        </button>
      )}

      {/* Expandable Voice AI Dialog Modal */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[92vw] sm:w-[420px] bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-2xl rounded-[32px] p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md">
                <Mic className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  Gemini Live Voice AI
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-[10px] text-slate-400">Interactive voice doubt resolution</p>
              </div>
            </div>

            <button
              onClick={() => { stopSpeaking(); setIsOpen(false); }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 transition"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Subject Domain Selector */}
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl text-xs">
            {['JEE', 'NEET', 'CODING'].map((dom) => (
              <button
                key={dom}
                onClick={() => setActiveDomain(dom)}
                className={`flex-1 py-1.5 rounded-xl font-extrabold transition ${
                  activeDomain === dom ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-200/60'
                }`}
              >
                {dom} Voice
              </button>
            ))}
          </div>

          {/* Audio Waveform Animation Box */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-4">
            
            {/* Pulsing Mic Circle */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                isListening
                  ? 'bg-rose-500/20 animate-ping'
                  : isSpeaking
                  ? 'bg-emerald-500/20 animate-pulse'
                  : 'bg-emerald-500/10'
              }`} />

              <button
                onClick={isSpeaking ? stopSpeaking : handleStartListening}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-transform active:scale-95 ${
                  isListening
                    ? 'bg-rose-600'
                    : isSpeaking
                    ? 'bg-amber-500'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-105'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </button>
            </div>

            {/* Dynamic Waveform Visualizer Bars */}
            <div className="flex items-end justify-center gap-1.5 h-8">
              <div className={`w-1.5 bg-emerald-500 rounded-full ${isListening || isSpeaking ? 'animate-waveform-1' : 'h-2'}`} />
              <div className={`w-1.5 bg-emerald-500 rounded-full ${isListening || isSpeaking ? 'animate-waveform-2' : 'h-3'}`} />
              <div className={`w-1.5 bg-teal-500 rounded-full ${isListening || isSpeaking ? 'animate-waveform-3' : 'h-4'}`} />
              <div className={`w-1.5 bg-teal-500 rounded-full ${isListening || isSpeaking ? 'animate-waveform-4' : 'h-2'}`} />
              <div className={`w-1.5 bg-cyan-500 rounded-full ${isListening || isSpeaking ? 'animate-waveform-2' : 'h-3'}`} />
            </div>

            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {isListening ? '🎙️ Listening... Speak your doubt now!' : isSpeaking ? '🔊 Gemini Voice AI is speaking...' : 'Tap the microphone to ask your doubt'}
            </p>
          </div>

          {/* Transcribed Output & AI Answer */}
          {transcript && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 block">Your Voice Input</span>
                <p className="font-bold text-slate-900 dark:text-white italic">{transcript}</p>
              </div>

              {aiVoiceResponse && (
                <div className="pt-2 border-t border-emerald-500/20">
                  <span className="text-[10px] font-extrabold uppercase text-teal-600 dark:text-teal-400 block">Gemini Voice Response</span>
                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{aiVoiceResponse}</p>
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </>
  );
}
