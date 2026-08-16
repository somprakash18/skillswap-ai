import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, Award, Sparkles, ArrowRight, RefreshCw, Lock, Download } from 'lucide-react';

export default function QuizModule({ category = 'JEE Prep', onUnlockPro }) {
  const [selectedQuiz, setSelectedQuiz] = useState('JEE_PHYSICS');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const quizData = {
    JEE_PHYSICS: {
      title: 'JEE Advanced Physics: Mechanics & Calculus Quiz',
      subject: 'JEE Physics',
      questions: [
        {
          id: 1,
          q: 'A particle moves in a straight line with velocity v = k√x, where k is a positive constant. What is the acceleration of the particle?',
          options: ['k²/2', 'k²', '2k²', 'k/2'],
          correct: 0,
          explanation: 'Since v = k√x, acceleration a = v(dv/dx) = (k√x) * (k / (2√x)) = k²/2.'
        },
        {
          id: 2,
          q: 'In a uniform circular motion of radius R, the centripetal acceleration is proportional to:',
          options: ['1/R²', 'v²/R', 'v/R', 'R²'],
          correct: 1,
          explanation: 'Centripetal acceleration is given by a_c = v²/R.'
        },
        {
          id: 3,
          q: 'What is the work done by friction force on a body sliding down a rough inclined plane of angle θ?',
          options: ['Zero', 'Positive', 'Negative', 'Depends on mass'],
          correct: 2,
          explanation: 'Friction opposes the relative motion of sliding, so the work done by friction is negative.'
        }
      ]
    },
    NEET_BIOLOGY: {
      title: 'NEET UG Biology: NCERT Human Physiology & Genetics Quiz',
      subject: 'NEET Biology',
      questions: [
        {
          id: 1,
          q: 'Which part of the human brain controls body temperature and urge for eating/drinking?',
          options: ['Cerebellum', 'Thalamus', 'Hypothalamus', 'Medulla Oblongata'],
          correct: 2,
          explanation: 'Hypothalamus contains centers which control body temperature, urge for eating and drinking.'
        },
        {
          id: 2,
          q: 'In Mendelian dihybrid cross, what is the phenotypic ratio obtained in the F2 generation?',
          options: ['3:1', '9:3:3:1', '1:2:1', '9:7'],
          correct: 1,
          explanation: 'The classic dihybrid phenotypic ratio for independent assortment is 9:3:3:1.'
        },
        {
          id: 3,
          q: 'Which enzyme is known as the "molecular scissors" in genetic engineering?',
          options: ['DNA Ligase', 'Restriction Endonuclease', 'DNA Polymerase', 'RNA Polymerase'],
          correct: 1,
          explanation: 'Restriction Endonucleases cut DNA strands at specific recognition sequences.'
        }
      ]
    },
    JAVA_SPRING: {
      title: 'Java Core & Spring Boot Microservices Quiz',
      subject: 'Java & Spring',
      questions: [
        {
          id: 1,
          q: 'Which annotation in Spring Boot marks a class as a RESTful web controller?',
          options: ['@Controller', '@RestController', '@Service', '@Component'],
          correct: 1,
          explanation: '@RestController combines @Controller and @ResponseBody.'
        },
        {
          id: 2,
          q: 'Which interface in Java 8 represents a function that takes one argument and produces a result?',
          options: ['Supplier', 'Consumer', 'Function<T, R>', 'Predicate'],
          correct: 2,
          explanation: 'Function<T, R> accepts one argument of type T and returns a result of type R.'
        }
      ]
    }
  };

  const activeQuiz = quizData[selectedQuiz] || quizData.JEE_PHYSICS;
  const currentQ = activeQuiz.questions[currentQIndex];

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQIndex]: optIndex }));
  };

  const handleNext = () => {
    if (currentQIndex < activeQuiz.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="theme-card space-y-6">
      
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-white/10">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-500/10 px-3 py-1 rounded-full border border-purple-100 dark:border-purple-500/20">
            Interactive Practice Quizzes
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">JEE, NEET & Tech Q&A Quizzes</h3>
        </div>

        {/* Quiz Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => { setSelectedQuiz('JEE_PHYSICS'); setCurrentQIndex(0); setShowResults(false); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedQuiz === 'JEE_PHYSICS' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600'}`}
          >
            JEE Physics
          </button>
          <button
            onClick={() => { setSelectedQuiz('NEET_BIOLOGY'); setCurrentQIndex(0); setShowResults(false); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedQuiz === 'NEET_BIOLOGY' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600'}`}
          >
            NEET Biology
          </button>
          <button
            onClick={() => { setSelectedQuiz('JAVA_SPRING'); setCurrentQIndex(0); setShowResults(false); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedQuiz === 'JAVA_SPRING' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600'}`}
          >
            Java / Tech
          </button>
        </div>
      </div>

      {/* Quiz Body */}
      {!showResults ? (
        <div className="space-y-5">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Question {currentQIndex + 1} of {activeQuiz.questions.length}</span>
            <span className="text-blue-600 dark:text-blue-400">{activeQuiz.subject}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-relaxed">
              {currentQ.q}
            </h4>

            <div className="space-y-2 pt-2">
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedAnswers[currentQIndex] === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    className={`w-full p-3 rounded-xl text-left text-xs font-semibold transition border flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-blue-400'
                    }`}
                  >
                    <span>{String.fromCharCode(65 + i)}. {opt}</span>
                    {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 disabled:opacity-30"
            >
              &larr; Previous Question
            </button>

            <button
              onClick={handleNext}
              className="btn-primary-blue text-xs font-bold px-5 py-2.5"
            >
              {currentQIndex === activeQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question &gt;'}
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">Quiz Complete!</h4>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              You Scored {calculateScore()} / {activeQuiz.questions.length} Correct
            </p>
          </div>

          {/* Download Q&A PDF Prompt */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 max-w-md mx-auto text-left space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
              <Download className="w-4 h-4" />
              Download Full Q&A Question Bank PDF
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Pro Subscribers can download the complete 500+ Q&A Answer Key PDF with step-by-step solutions!
            </p>
            <button
              onClick={onUnlockPro}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2 rounded-xl transition"
            >
              Unlock Pro Subscription & Download PDF
            </button>
          </div>

          <button
            onClick={() => { setCurrentQIndex(0); setSelectedAnswers({}); setShowResults(false); }}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline block mx-auto"
          >
            Retake Quiz
          </button>
        </div>
      )}

    </div>
  );
}
