import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Category, VocabularyItem } from '../types';
import { GameMode } from '../types';
import { speak } from '../services/speechService';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, SpeakerIcon, StarIcon, XMarkIcon } from './Icons';

// Utility to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};


// Learning Mode Component
const LearnMode: React.FC<{ items: VocabularyItem[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const item = items[currentIndex];

  const changeCard = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
        if (direction === 'next') {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        } else {
            setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
        }
        setIsAnimating(false);
    }, 200);
  };

  useEffect(() => {
    speak(item.swissGerman, 'de-CH');
  }, [item]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className={`relative w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 border-8 border-slate-200 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <img src={item.image} alt={item.italian} className="w-full h-80 object-cover rounded-2xl mb-4 bg-slate-100" />
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-700">{item.italian}</h2>
            <button onClick={() => speak(item.italian, 'it-IT')} className="text-blue-500 hover:text-blue-700 transition-colors active:scale-90">
              <SpeakerIcon className="w-9 h-9" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-4xl md:text-5xl font-bold text-emerald-600">{item.swissGerman}</h3>
            <button onClick={() => speak(item.swissGerman, 'de-CH')} className="text-emerald-500 hover:text-emerald-700 transition-colors active:scale-90">
              <SpeakerIcon className="w-9 h-9" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-lg mt-6">
        <button onClick={() => changeCard('prev')} className="bg-white p-5 rounded-full shadow-lg hover:bg-slate-100 transition-colors active:scale-90"><ArrowLeftIcon className="w-10 h-10 text-slate-600"/></button>
        <div className="text-2xl font-bold text-slate-500 self-center">{currentIndex + 1} / {items.length}</div>
        <button onClick={() => changeCard('next')} className="bg-white p-5 rounded-full shadow-lg hover:bg-slate-100 transition-colors active:scale-90"><ArrowRightIcon className="w-10 h-10 text-slate-600" /></button>
      </div>
    </div>
  );
};


// Quiz Mode Component
const QuizMode: React.FC<{ items: VocabularyItem[], onQuizComplete: (score: number, total: number) => void }> = ({ items, onQuizComplete }) => {
  const [questions, setQuestions] = useState<VocabularyItem[]>([]);
  const [options, setOptions] = useState<VocabularyItem[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [answered, setAnswered] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(items);
    setQuestions(shuffledQuestions);
    setOptions(shuffledQuestions.map(correctAnswer => {
        const otherOptions = shuffleArray(items.filter(item => item.id !== correctAnswer.id)).slice(0, 2);
        return shuffleArray([correctAnswer, ...otherOptions]);
    }));
    setCurrentIndex(0);
    setScore(0);
  }, [items]);

  const currentQuestion = questions[currentIndex];
  const currentOptions = options[currentIndex];

  useEffect(() => {
    if (currentQuestion && !answered) {
      speak(currentQuestion.swissGerman, 'de-CH');
    }
  }, [currentQuestion, answered]);
  
  const handleAnswer = (selectedItem: VocabularyItem) => {
    if (answered) return;
    
    setAnswered(true);
    setSelectedId(selectedItem.id);
    if (selectedItem.id === currentQuestion.id) {
      setFeedback('correct');
      setScore(s => s + 1);
      speak('Super!', 'it-IT');
    } else {
      setFeedback('incorrect');
      speak('Oh no!', 'it-IT');
    }

    setTimeout(() => {
      const isCorrect = selectedItem.id === currentQuestion.id;
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setFeedback(null);
        setAnswered(false);
        setSelectedId(null);
      } else {
        onQuizComplete(score + (isCorrect ? 1 : 0), questions.length);
      }
    }, 2000);
  };

  if (!currentQuestion) return <div className="text-2xl">Caricamento quiz...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
          <p className="text-2xl text-slate-600">Ascolta e scegli l'immagine giusta!</p>
          <button onClick={() => speak(currentQuestion.swissGerman, 'de-CH')} 
                  className="mt-2 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-600 transition flex items-center gap-3 mx-auto active:scale-95">
              <SpeakerIcon className="w-8 h-8" />
              <span className="text-3xl font-bold">{currentQuestion.swissGerman}</span>
          </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {currentOptions.map((option) => (
          <button 
            key={option.id} 
            onClick={() => handleAnswer(option)}
            disabled={answered}
            className={`relative rounded-2xl overflow-hidden border-8 transition-all duration-300 transform hover:scale-105 active:scale-95
            ${!answered 
                ? 'border-transparent hover:border-yellow-300' 
                : option.id === currentQuestion.id 
                    ? 'border-green-500 scale-105 animate-bounce-short' 
                    : option.id === selectedId 
                        ? 'opacity-50 animate-shake' 
                        : 'opacity-50'
            }
            `}
          >
            <img src={option.image} alt={option.italian} className="w-full h-48 md:h-56 object-cover bg-slate-100" loading="lazy"/>
            {answered && option.id === currentQuestion.id && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-70 flex items-center justify-center">
                    <CheckIcon className="w-24 h-24 text-white" />
                </div>
            )}
            {answered && option.id === selectedId && option.id !== currentQuestion.id && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-70 flex items-center justify-center">
                    <XMarkIcon className="w-20 h-20 text-white" />
                </div>
            )}
          </button>
        ))}
      </div>
        <div className="flex justify-center mt-8 space-x-3">
            {[...Array(questions.length)].map((_, i) => (
                <div key={i} className={`w-5 h-5 rounded-full transition-colors ${i < currentIndex ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
            ))}
        </div>
    </div>
  );
};

const QuizCompleteScreen: React.FC<{ score: number, total: number, onRestart: () => void, onBack: () => void }> = ({ score, total, onRestart, onBack }) => {
    return (
        <div className="flex flex-col items-center text-center bg-white p-8 rounded-3xl shadow-xl border-8 border-slate-200">
            <h2 className="text-5xl font-black text-emerald-700 mb-4">Fantastico!</h2>
            <p className="text-3xl text-slate-600 mb-6">Hai totalizzato {score} su {total}!</p>
            <div className="flex text-yellow-400 mb-8">
                {[...Array(total)].map((_, i) => (
                    <div key={i} className="animate-fadein" style={{ animationDelay: `${i * 100}ms` }}>
                        <StarIcon className="w-16 h-16" filled={i < score} />
                    </div>
                ))}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <button onClick={onRestart} className="bg-emerald-500 text-white px-10 py-4 rounded-full text-2xl font-bold shadow-lg hover:bg-emerald-600 transition active:scale-95">Riprova</button>
                <button onClick={onBack} className="bg-slate-500 text-white px-10 py-4 rounded-full text-2xl font-bold shadow-lg hover:bg-slate-600 transition active:scale-95">Menu</button>
            </div>
        </div>
    );
};


export const GameScreen: React.FC<{ category: Category; onBack: () => void; }> = ({ category, onBack }) => {
  const [mode, setMode] = useState<GameMode>(GameMode.LEARN);
  const [quizScore, setQuizScore] = useState<{score: number, total: number} | null>(null);

  const handleQuizComplete = useCallback((score: number, total: number) => {
    setQuizScore({score, total});
  }, []);

  const handleRestartQuiz = () => {
    setQuizScore(null);
    setMode(GameMode.QUIZ_AUDIO_TO_IMAGE);
  };
  
  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-screen w-full animate-fadein">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-8">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-bold transition-colors active:scale-95">
                <ArrowLeftIcon className="w-10 h-10 p-1.5 bg-white rounded-full shadow"/>
                <span className="hidden md:inline text-2xl">Categorie</span>
            </button>
            <h1 className={`text-3xl md:text-5xl font-black text-center ${category.color.text}`}>{category.title.italian}</h1>
            <div className="w-24 md:w-40"></div>
        </div>

        {quizScore ? (
            <QuizCompleteScreen score={quizScore.score} total={quizScore.total} onRestart={handleRestartQuiz} onBack={onBack}/>
        ) : (
            <>
                <div className="flex justify-center mb-8 bg-slate-200 p-1.5 rounded-full w-full max-w-sm mx-auto">
                <button
                    onClick={() => setMode(GameMode.LEARN)}
                    className={`w-1/2 py-3 text-xl font-bold rounded-full transition-colors ${mode === GameMode.LEARN ? 'bg-white text-emerald-600 shadow' : 'text-slate-500 hover:bg-slate-300'}`}
                >
                    Impara
                </button>
                <button
                    onClick={() => setMode(GameMode.QUIZ_AUDIO_TO_IMAGE)}
                    className={`w-1/2 py-3 text-xl font-bold rounded-full transition-colors ${mode === GameMode.QUIZ_AUDIO_TO_IMAGE ? 'bg-white text-emerald-600 shadow' : 'text-slate-500 hover:bg-slate-300'}`}
                >
                    Quiz
                </button>
                </div>
        
                <div className="w-full flex justify-center">
                {mode === GameMode.LEARN && <LearnMode items={category.items} />}
                {mode === GameMode.QUIZ_AUDIO_TO_IMAGE && <QuizMode items={category.items} onQuizComplete={handleQuizComplete}/>}
                </div>
            </>
        )}

      </div>
    </div>
  );
};