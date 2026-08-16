import React, { useState, useEffect } from 'react';
import { HelpCircle, Clock, CheckCircle2, XCircle, Bookmark, ArrowRight, ArrowLeft, RefreshCw, Trophy, Target, Award, Sparkles, Check, AlertTriangle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function QuizEnginePage({ setCurrentPage }) {
  const [activeCategory, setActiveCategory] = useState('JEE');
  const [quizState, setQuizState] = useState('INTRO'); // 'INTRO', 'ACTIVE', 'RESULT'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [bookmarkedQs, setBookmarkedQs] = useState({});
  const [timer, setTimer] = useState(1800); // 30 minutes (1800 seconds)

  const quizQuestions = {
    JEE: [
      {
        id: 1,
        question: 'A solid sphere of mass M and radius R rolls without slipping down an inclined plane of angle θ. What is its acceleration down the incline?',
        options: ['(5/7) g sin θ', '(3/5) g sin θ', '(2/3) g sin θ', '(1/2) g sin θ'],
        correctIndex: 0,
        marks: 4,
        negative: -1,
        explanation: 'Using a = (g sin θ) / (1 + I/MR²), for a solid sphere I = (2/5)MR², giving a = (5/7) g sin θ.'
      },
      {
        id: 2,
        question: 'What is the work done by friction when a cylinder rolls purely on a horizontal surface without slipping?',
        options: ['Zero', 'Positive', 'Negative', 'Depends on radius'],
        correctIndex: 0,
        marks: 4,
        negative: -1,
        explanation: 'In pure rolling on a flat surface, the point of contact is instantaneously at rest, so work done by static friction is zero.'
      },
      {
        id: 3,
        question: 'Find the magnetic field at the center of a circular loop of radius R carrying current I.',
        options: ['μ₀I / (2R)', 'μ₀I / (4R)', '2μ₀I / R', 'μ₀I / (2πR)'],
        correctIndex: 0,
        marks: 4,
        negative: -1,
        explanation: 'B = μ₀I / (2R) at the center of a current-carrying loop according to Biot-Savart Law.'
      }
    ],
    NEET: [
      {
        id: 4,
        question: 'Which hormone triggers the release of pancreatic juice rich in bicarbonate ions into the duodenum during digestion?',
        options: ['Secretin', 'Cholecystokinin (CCK)', 'Gastrin', 'Insulin'],
        correctIndex: 0,
        marks: 4,
        negative: -1,
        explanation: 'Secretin is produced by S-cells in the duodenum mucosa and stimulates bicarbonate secretion from pancreas.'
      },
      {
        id: 5,
        question: 'Which part of the human brain regulates body temperature, hunger, and thirst?',
        options: ['Hypothalamus', 'Cerebellum', 'Medulla Oblongata', 'Thalamus'],
        correctIndex: 0,
        marks: 4,
        negative: -1,
        explanation: 'The Hypothalamus serves as the master thermostat of the brain controlling homeostasis, hunger, and thirst.'
      }
    ],
    CODING: [
      {
        id: 6,
        question: 'In Spring Boot 3, which annotation binds configuration properties from application.yml directly to a Java bean class?',
        options: ['@ConfigurationProperties', '@Value', '@Autowired', '@Component'],
        correctIndex: 0,
        marks: 4,
        negative: 0,
        explanation: '@ConfigurationProperties(prefix = "app") binds structured YAML config parameters directly to Java POJO fields.'
      },
      {
        id: 7,
        question: 'What is the average time complexity of searching an element in a balanced Binary Search Tree (BST)?',
        options: ['O(log N)', 'O(N)', 'O(1)', 'O(N log N)'],
        correctIndex: 0,
        marks: 4,
        negative: 0,
        explanation: 'In a balanced BST, tree height is log₂N, resulting in O(log N) search complexity.'
      }
    ]
  };

  const currentQuestions = quizQuestions[activeCategory] || quizQuestions.JEE;

  useEffect(() => {
    let interval = null;
    if (quizState === 'ACTIVE' && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0 && quizState === 'ACTIVE') {
      setQuizState('RESULT');
    }
    return () => clearInterval(interval);
  }, [quizState, timer]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQIndex]: optIndex }));
  };

  const toggleBookmark = () => {
    setBookmarkedQs(prev => ({ ...prev, [currentQIndex]: !prev[currentQIndex] }));
  };

  const calculateScore = () => {
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    currentQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] !== undefined) {
        if (selectedAnswers[idx] === q.correctIndex) {
          score += q.marks;
          correctCount++;
        } else {
          score += q.negative;
          incorrectCount++;
        }
      }
    });

    return { score, correctCount, incorrectCount, totalMarks: currentQuestions.length * 4 };
  };

  const scoreData = calculateScore();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Quiz Intro View */}
      {quizState === 'INTRO' && (
        <div className="theme-card space-y-6 text-center py-10 px-6">
          <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Interactive Practice Quiz Engine</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
              Real examination engine with countdown timer, negative marking, question bookmarking, and step-by-step explanations.
            </p>
          </div>

          {/* Subject Category Selectors */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setActiveCategory('JEE')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeCategory === 'JEE' ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
            >
              JEE Physics Test
            </button>

            <button
              onClick={() => setActiveCategory('NEET')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeCategory === 'NEET' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
            >
              NEET Biology Test
            </button>

            <button
              onClick={() => setActiveCategory('CODING')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeCategory === 'CODING' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
            >
              Java & CS Test
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-xs max-w-md mx-auto space-y-1 text-left">
            <p className="font-semibold text-slate-900 dark:text-white">Test Rules:</p>
            <p className="text-slate-600 dark:text-slate-300">• 30 Minutes Countdown Timer</p>
            <p className="text-slate-600 dark:text-slate-300">• +4 Marks for Correct, -1 Mark for Incorrect</p>
            <p className="text-slate-600 dark:text-slate-300">• Step-by-step solutions unlocked after submission</p>
          </div>

          <button
            onClick={() => { setTimer(1800); setQuizState('ACTIVE'); }}
            className="btn-primary text-sm font-bold px-8 py-3 rounded-xl mx-auto shadow-md"
          >
            Start Quiz Now
          </button>
        </div>
      )}

      {/* Active Quiz Question View */}
      {quizState === 'ACTIVE' && (
        <div className="theme-card space-y-6">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-md">
                {activeCategory} Exam Engine
              </span>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                Question {currentQIndex + 1} of {currentQuestions.length}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl">
                <Clock className="w-4 h-4" />
                {formatTimer(timer)}
              </span>

              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-xl transition ${bookmarkedQs[currentQIndex] ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                title="Bookmark Question"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQuestions[currentQIndex].question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-2.5 pt-2">
              {currentQuestions[currentQIndex].options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQIndex] === optIdx;
                return (
                  <div
                    key={optIdx}
                    onClick={() => handleOptionSelect(optIdx)}
                    className={`p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition flex items-center gap-3 ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                        : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] ${
                      isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="btn-secondary text-xs font-bold px-4 py-2 disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentQIndex < currentQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex(prev => prev + 1)}
                className="btn-primary text-xs font-bold px-5 py-2"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setQuizState('RESULT')}
                className="btn-success-green text-xs font-bold px-5 py-2"
              >
                <span>Submit Quiz</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      )}

      {/* Quiz Result View */}
      {quizState === 'RESULT' && (
        <div className="theme-card space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-3xl bg-emerald-500 flex items-center justify-center text-white mx-auto shadow-md shadow-emerald-500/30">
              <Trophy className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Quiz Score Analysis</h2>
            <p className="text-xs text-slate-500">Test results for {activeCategory} Exam Series</p>
          </div>

          {/* Score Card Metrics */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100">
              <p className="text-xs text-slate-500">Total Score</p>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{scoreData.score} / {scoreData.totalMarks}</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100">
              <p className="text-xs text-slate-500">Correct Answers</p>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{scoreData.correctCount}</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100">
              <p className="text-xs text-slate-500">Incorrect</p>
              <p className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{scoreData.incorrectCount}</p>
            </div>
          </div>

          {/* Answer Key Explanations */}
          <div className="space-y-4 pt-2">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Step-by-Step Answer Explanations</h3>
            {currentQuestions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctIndex;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-slate-900 dark:text-white">Q{idx + 1}: {q.question}</p>
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${isCorrect ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                      {isCorrect ? '✓ Correct (+4)' : userAns === undefined ? 'Unattempted (0)' : '✗ Incorrect (-1)'}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300">
                    Correct Option: <strong className="text-emerald-600 dark:text-emerald-400">{q.options[q.correctIndex]}</strong>
                  </p>

                  <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 text-slate-600 dark:text-slate-300 border border-blue-100 dark:border-blue-900/30">
                    <strong className="text-blue-600 block mb-0.5">Solution & Concept:</strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setQuizState('INTRO')}
            className="w-full btn-primary text-xs font-bold py-3"
          >
            Retake Quiz / Switch Subject
          </button>
        </div>
      )}

    </div>
  );
}
