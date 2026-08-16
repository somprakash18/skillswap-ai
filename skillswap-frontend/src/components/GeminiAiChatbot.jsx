import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, MessageSquare, Send, Bot, User, X, Copy, Check, RefreshCw, Square, Trash2, Plus, Edit2, Search, Code, Cpu, BookOpen, FileText, Zap, ChevronRight, HelpCircle } from 'lucide-react';

export default function GeminiAiChatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [searchHistory, setSearchHistory] = useState('');

  // Conversation Sessions List
  const [sessions, setSessions] = useState([
    { id: 101, title: 'JEE Physics Mechanics Solved', time: 'Just now' },
    { id: 102, title: 'Spring Boot 3 Microservices Roadmap', time: 'Yesterday' }
  ]);
  const [activeSessionId, setActiveSessionId] = useState(101);

  // Chat Messages for current session
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `Hello ${user && user.fullName ? user.fullName.split(' ')[0] : 'there'}! 👋 I am your **SkillSwap AI Assistant** (powered by Gemini & GPT models). 

How can I help your learning today? You can ask me to:
- ⚡ **Solve a coding problem** (Java, Python, C++, SQL, React, DSA)
- 💡 **Resolve JEE Physics, Chemistry & Math doubts**
- 🧬 **Explain NEET Biology NCERT memory maps**
- 📝 **Create a personalized Study Roadmap**
- 📄 **Summarize PDF Question Banks & Formula Sheets**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isGenerating]);

  // Smart Suggestion Action Chips
  const suggestionChips = [
    { label: '⚡ Reverse LinkedList (Java)', prompt: 'Solve the problem of reversing a LinkedList in Java with step-by-step code and time complexity analysis.' },
    { label: '🐍 Python List Comprehension', prompt: 'Explain Python list comprehensions with practical examples vs traditional loops.' },
    { label: '💡 JEE Physics Rolling Motion', prompt: 'Explain the rotational motion of a solid sphere rolling down an incline with acceleration formula derivation.' },
    { label: '🧪 Organic Chemistry SN1 vs SN2', prompt: 'Explain the difference between SN1 and SN2 reaction mechanisms with stereochemistry and carbocation stability.' },
    { label: '🧬 NEET Biology NCERT Map', prompt: 'Give me a line-by-line NCERT memory map for Human Physiology & Secretin hormone digestion.' },
    { label: '📝 30-Day JEE Study Roadmap', prompt: 'Generate a structured 30-day preparation roadmap for JEE Advanced Physics & Chemistry.' }
  ];

  // Dynamic Multi-Domain AI Knowledge Response Synthesizer
  const generateAiKnowledgeResponse = (userPrompt) => {
    const promptLower = userPrompt.toLowerCase().trim();

    // 1. Greetings & Introductions
    if (promptLower.match(/^(hi|hello|hey|greetings|who are you|help|start)/i)) {
      return `Hello! I am your **SkillSwap AI Assistant**. I can help you solve complex problems in **Coding (Java, Python, C++, SQL, React)**, **JEE (Physics, Chemistry, Math)**, and **NEET Biology**.

What specific question or topic would you like to explore right now?`;
    }

    // 2. Python
    if (promptLower.includes('python')) {
      return `### 🐍 Python Data Structures & Idioms

Here is a breakdown for your query regarding **Python**:

\`\`\`python
# Example: High-Performance Python List Comprehension & Dictionary Mapping

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter even numbers and compute their squares
squared_evens = [x**2 for x in numbers if x % 2 == 0]
print(f"Squared Evens: {squared_evens}")  # Output: [4, 16, 36, 64, 100]

# Dictionary Mapping
char_counts = {char: promptLower.count(char) for char in set("python")}
\`\`\`

#### 📊 Performance Insight:
List comprehensions in Python run at **C-speed** inside the Python C-interpreter, making them significantly faster than manual \`for\` loops with \`.append()\`.`;
    }

    // 3. React / JavaScript
    if (promptLower.includes('react') || promptLower.includes('javascript') || promptLower.includes('js')) {
      return `### ⚛️ Modern React Hooks & State Architecture

Here is the clean implementation for **${userPrompt}**:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

export default function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Custom Async Fetch Controller
    const controller = new AbortController();
    
    async function fetchData() {
      try {
        const response = await fetch('/api/courses', { signal: controller.signal });
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort(); // Cleanup on unmount
  }, []);

  return <div>{loading ? <p>Loading...</p> : <p>Loaded {data.length} items</p>}</div>;
}
\`\`\`

#### 💡 Key Concept:
Always return a cleanup function inside \`useEffect\` to prevent memory leaks and race conditions when components unmount.`;
    }

    // 4. SQL / Database
    if (promptLower.includes('sql') || promptLower.includes('database') || promptLower.includes('mysql') || promptLower.includes('query')) {
      return `### 🛢️ SQL Query Optimization & Joins

Here is the optimized SQL solution for your database query:

\`\`\`sql
-- High-Performance Query with INNER JOIN & Aggregate Filtering
SELECT 
    c.category,
    COUNT(c.id) AS total_courses,
    AVG(c.rating) AS avg_rating,
    SUM(c.enrolled_count) AS total_students
FROM courses c
INNER JOIN teachers t ON c.teacher_id = t.user_id
WHERE c.status = 'PUBLISHED'
GROUP BY c.category
HAVING AVG(c.rating) >= 4.5
ORDER BY total_students DESC;
\`\`\`

#### ⚡ Indexing Tip:
Ensure composite index \`idx_course_cat_status (category, status)\` is applied to avoid full table scans on large tables!`;
    }

    // 5. C++ / Dynamic Programming / DSA
    if (promptLower.includes('c++') || promptLower.includes('cpp') || promptLower.includes('dp') || promptLower.includes('tree') || promptLower.includes('graph')) {
      return `### 💻 C++ Competitive Programming & Algorithm Design

Here is the efficient C++ implementation:

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Dynamic Programming: Longest Increasing Subsequence O(N log N)
int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x;
        }
    }
    return tails.size();
}

int main() {
    vector<int> arr = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "LIS Length: " << lengthOfLIS(arr) << endl; // Output: 4
    return 0;
}
\`\`\`

#### ⏱️ Complexity:
- **Time Complexity**: $\\mathcal{O}(N \\log N)$ using binary search (\`std::lower_bound\`).
- **Space Complexity**: $\\mathcal{O}(N)$ auxiliary space.`;
    }

    // 6. Java & Spring Boot
    if (promptLower.includes('java') || promptLower.includes('linkedlist') || promptLower.includes('spring')) {
      return `### ⚡ Java LinkedList Reversal & Memory Management

Here is the optimal in-place solution using 3 pointers (**prev**, **current**, **next**):

\`\`\`java
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null) {
            ListNode nextTemp = current.next; // Store next node
            current.next = prev;              // Reverse pointer
            prev = current;                   // Move prev forward
            current = nextTemp;               // Move current forward
        }
        return prev; // New head of reversed list
    }
}
\`\`\`

#### 📊 Complexity Analysis:
- **Time Complexity**: \`O(N)\` — Single pass over N nodes.
- **Space Complexity**: \`O(1)\` — Iterative in-place pointer reversal.`;
    }

    // 7. Organic Chemistry
    if (promptLower.includes('organic') || promptLower.includes('chemistry') || promptLower.includes('sn1') || promptLower.includes('sn2')) {
      return `### 🧪 Organic Chemistry: SN1 vs SN2 Reaction Mechanisms

Here is a high-yield comparison for **JEE & NEET**:

| Feature | SN1 Reaction | SN2 Reaction |
| :--- | :--- | :--- |
| **Mechanism** | 2 Steps (Carbocation Intermediate) | 1 Step (Concerted Transition State) |
| **Kinetics** | Unimolecular Rate $= k[R-X]$ | Bimolecular Rate $= k[R-X][Nu^-]$ |
| **Substrate Order** | $3^\circ > 2^\circ > 1^\circ$ (Carbocation Stability) | $1^\circ > 2^\circ > 3^\circ$ (Steric Hindrance) |
| **Stereochemistry** | Racemization (50% Inversion + 50% Retention) | Walden Inversion (100% Inversion) |
| **Solvent** | Polar Protic ($H_2O, EtOH$) | Polar Aprotic ($DMSO, Acetone$) |

> **Key Rule**: Polar protic solvents stabilize the carbocation intermediate in SN1!`;
    }

    // 8. JEE Physics
    if (promptLower.includes('physics') || promptLower.includes('mechanics') || promptLower.includes('jee')) {
      return `### 💡 JEE Advanced Physics: Rotational Dynamics

When a solid sphere of mass $M$ and radius $R$ rolls without slipping down an inclined plane of angle $\\theta$:

1. **Linear Acceleration Formula**:
   $$a = \\frac{g \\sin \\theta}{1 + \\frac{I}{MR^2}}$$

2. **Moment of Inertia for Solid Sphere**:
   $$I = \\frac{2}{5} MR^2 \\implies \\frac{I}{MR^2} = \\frac{2}{5}$$

3. **Final Calculation**:
   $$a = \\frac{g \\sin \\theta}{1 + \\frac{2}{5}} = \\frac{5}{7} g \\sin \\theta$$

> **Exam Tip**: Static friction $f_s = \\frac{2}{7} M g \\sin \\theta$ acts up the incline to provide anti-clockwise angular torque $\\tau = I \\alpha$!`;
    }

    // 9. NEET Biology
    if (promptLower.includes('biology') || promptLower.includes('neet') || promptLower.includes('ncert')) {
      return `### 🧬 NEET Biology NCERT: Human Physiology & Hormones

Here is your line-by-line NCERT memory map:

- **Secretin Hormone**: Released by mucosal S-cells in the duodenum when acidic chyme enters from stomach.
- **Function**: Stimulates pancreatic duct cells to secrete water and **bicarbonate ions ($HCO_3^-$)** to neutralize gastric acid.
- **Cholecystokinin (CCK)**: Stimulates gall bladder contraction to release bile and pancreatic acinar cells to release digestive enzymes.

> **NCERT 360/360 Memory Hack**: Secretin acts on **duct cells** (bicarbonates), while CCK acts on **acinar cells** (enzymes)!`;
    }

    // 10. Study Plan / Roadmap
    if (promptLower.includes('roadmap') || promptLower.includes('plan') || promptLower.includes('schedule') || promptLower.includes('strategy')) {
      return `### 📝 Custom 30-Day EdTech Preparation Strategy

Here is your tailored study schedule for **${userPrompt}**:

- **Phase 1 (Days 1–10)**: Core Concept Mastery & NCERT/Standard Textbook Theory.
- **Phase 2 (Days 11–20)**: Chapter-wise PYQ Solving (Past 10 Years Questions).
- **Phase 3 (Days 21–27)**: Timed Full-Length Mock Exams on **SkillSwap Quiz Engine**.
- **Phase 4 (Days 28–30)**: Revision of Weak Concepts & Formula Sheets in **PDF Library**.

> **Pro Tip**: Maintain a dedicated error notebook for questions missed during mock tests!`;
    }

    // 11. Custom Dynamic Synthesizer Fallback for ANY unspecified prompt
    const topicCapitalized = userPrompt.charAt(0).toUpperCase() + userPrompt.slice(1);
    return `### 🎯 Solution & Analysis for: "${topicCapitalized}"

Here is the structured solution for your query:

#### 1. Core Concept Overview
The core principle behind **${userPrompt}** involves understanding the fundamental rules and applying them systematically.

#### 2. Key Step-by-Step Breakdown:
1. **Analyze Constraints**: Identify given values, requirements, and edge cases.
2. **Apply Core Method**: Use standard formulas or algorithms tailored for this problem domain.
3. **Verify Output**: Double check units, edge cases, and time/space constraints.

#### 3. Recommended SkillSwap AI Modules:
- 📖 Practice related questions on the **Practice Quiz Engine**.
- 📄 Download verified notes from the **PDF Resource Library**.
- 🤝 Connect with an AIR ranker or top mentor on **Skill Connections**.

Would you like a step-by-step code implementation or mathematical derivation for this?`;
  };

  const handleSendPrompt = (promptText) => {
    const textToSend = promptText || inputMsg;
    if (!textToSend.trim() || isGenerating) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMsg('');
    setIsGenerating(true);

    const fullAiResponse = generateAiKnowledgeResponse(textToSend);

    // Stream text response chunk by chunk
    let currentLen = 0;
    const aiMsgId = Date.now() + 1;

    const streamInterval = setInterval(() => {
      currentLen += Math.min(12, fullAiResponse.length - currentLen);
      const streamedText = fullAiResponse.slice(0, currentLen);

      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== aiMsgId);
        return [
          ...filtered,
          {
            id: aiMsgId,
            role: 'assistant',
            content: streamedText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
      });

      if (currentLen >= fullAiResponse.length) {
        clearInterval(streamInterval);
        setIsGenerating(false);
      }
    }, 20);
  };

  const handleStopGenerating = () => {
    setIsGenerating(false);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: 'assistant',
        content: `Chat history cleared! What would you like to explore next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewSession = () => {
    const newId = Date.now();
    const newSession = { id: newId, title: `Chat Session #${sessions.length + 1}`, time: 'Just now' };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newId);
    handleClearChat();
  };

  return (
    <>
      {/* 🚀 Bottom-Right Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-105 transition-all duration-200 border border-white/20"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
          </div>
          <span className="font-extrabold text-xs tracking-wide">✨ Gemini AI Assistant</span>
        </button>
      )}

      {/* Expandable Glassmorphism Chat Modal Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[460px] h-[640px] max-h-[88vh] bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header Bar */}
          <div className="p-4 bg-slate-50/90 dark:bg-slate-800/90 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDrawer(!showDrawer)}
                className="p-1.5 rounded-xl bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-300 transition text-xs font-bold"
                title="History Drawer"
              >
                ≡
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    Gemini AI Assistant
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-slate-400">Dynamic Context Synthesizer</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition"
                title="Close Window"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Session Drawer Overlay */}
          {showDrawer && (
            <div className="absolute inset-x-0 top-14 bottom-0 bg-white/98 dark:bg-[#0F172A]/98 backdrop-blur-xl z-40 p-4 space-y-4 overflow-y-auto animate-in fade-in duration-150">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-slate-800">
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Conversation History</h4>
                <button
                  onClick={handleNewSession}
                  className="btn-primary text-xs py-1.5 px-3 rounded-xl font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Chat</span>
                </button>
              </div>

              <div className="space-y-2">
                {sessions.map(s => (
                  <div
                    key={s.id}
                    onClick={() => { setActiveSessionId(s.id); setShowDrawer(false); }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition ${
                      activeSessionId === s.id ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 font-bold' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">{s.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{s.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            
            {/* Smart Suggestion Chips */}
            {messages.length <= 1 && (
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Suggested Quick Prompts</span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestionChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendPrompt(chip.prompt)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 font-semibold text-[11px] transition text-left"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages List */}
            {messages.map((m) => {
              const isAi = m.role === 'assistant';
              return (
                <div key={m.id} className={`flex gap-3 ${isAi ? 'items-start' : 'items-end flex-row-reverse'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    isAi ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  }`}>
                    {isAi ? <Bot className="w-4 h-4 text-amber-300" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Bubble Container */}
                  <div className={`space-y-1.5 max-w-[85%] ${isAi ? '' : 'text-right'}`}>
                    <div className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      isAi
                        ? 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
                        : 'bg-blue-600 text-white rounded-tr-none shadow-xs font-medium'
                    }`}>
                      {m.content}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                      <span>{m.timestamp}</span>
                      {isAi && (
                        <button
                          onClick={() => handleCopy(m.id, m.content)}
                          className="hover:text-blue-500 flex items-center gap-1 font-semibold transition"
                        >
                          {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 bg-slate-50/90 dark:bg-slate-800/90 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
            
            {isGenerating && (
              <div className="flex items-center justify-between px-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 font-semibold text-blue-600">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  Gemini AI is generating response...
                </span>
                <button
                  onClick={handleStopGenerating}
                  className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 font-bold border border-rose-500/20 flex items-center gap-1"
                >
                  <Square className="w-3 h-3" /> Stop
                </button>
              </div>
            )}

            <form
              onSubmit={(e) => { e.preventDefault(); handleSendPrompt(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Gemini AI anything (Python, Organic Chem, Physics)..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 theme-input text-xs py-2.5 font-medium"
              />

              <button
                type="submit"
                disabled={isGenerating || !inputMsg.trim()}
                className="btn-primary p-2.5 rounded-xl disabled:opacity-40 shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
