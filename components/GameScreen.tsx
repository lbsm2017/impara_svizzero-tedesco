
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Category, VocabularyItem } from '../types';
import { GameMode } from '../types';
import { speak } from '../services/speechService';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, SpeakerIcon, StarIcon, XMarkIcon } from './Icons';

// Utility to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};


// Learning Mode Component defined outside GameScreen
const LearnMode: React.FC<{ items: VocabularyItem[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const item = items[currentIndex];

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  useEffect(() => {
    speak(item.swissGerman, 'de-CH');
  }, [item]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border-4 border-slate-200">
        <img src={item.image} alt={item.italian} className="w-full h-64 object-cover rounded-lg mb-4" />
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-slate-700">{item.italian}</h2>
            <button onClick={() => speak(item.italian, 'it-IT')} className="text-blue-500 hover:text-blue-700 transition-colors">
              <SpeakerIcon className="w-7 h-7" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-3xl font-bold text-emerald-600">{item.swissGerman}</h3>
            <button onClick={() => speak(item.swissGerman, 'de-CH')} className="text-emerald-500 hover:text-emerald-700 transition-colors">
              <SpeakerIcon className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-md mt-6">
        <button onClick={goToPrev} className="bg-white p-4 rounded-full shadow-lg hover:bg-slate-100 transition-colors"><ArrowLeftIcon className="w-8 h-8 text-slate-600"/></button>
        <div className="text-lg font-bold text-slate-500 self-center">{currentIndex + 1} / {items.length}</div>
        <button onClick={goToNext} className="bg-white p-4 rounded-full shadow-lg hover:bg-slate-100 transition-colors"><ArrowRightIcon className="w-8 h-8 text-slate-600" /></button>
      </div>
    </div>
  );
};


// Quiz Mode Component defined outside GameScreen
const QuizMode: React.FC<{ items: VocabularyItem[], onQuizComplete: (score: number, total: number) => void }> = ({ items, onQuizComplete }) => {
  const [questions, setQuestions] = useState<VocabularyItem[]>([]);
  const [options, setOptions] = useState<VocabularyItem[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [answered, setAnswered] = useState(false);

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
    if (currentQuestion) {
      speak(currentQuestion.swissGerman, 'de-CH');
    }
  }, [currentQuestion]);
  
  const handleAnswer = (selectedItem: VocabularyItem) => {
    if (answered) return;
    
    setAnswered(true);
    if (selectedItem.id === currentQuestion.id) {
      setFeedback('correct');
      setScore(s => s + 1);
      speak('Bravo!', 'it-IT');
    } else {
      setFeedback('incorrect');
      speak('Oh no!', 'it-IT');
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setFeedback(null);
        setAnswered(false);
      } else {
        onQuizComplete(score + (selectedItem.id === currentQuestion.id ? 1 : 0), questions.length);
      }
    }, 1500);
  };

  if (!currentQuestion) return <div className="text-2xl">Caricamento quiz...</div>;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
          <p className="text-xl text-slate-600">Ascolta e scegli l'immagine giusta!</p>
          <button onClick={() => speak(currentQuestion.swissGerman, 'de-CH')} 
                  className="mt-2 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-600 transition flex items-center gap-3 mx-auto">
              <SpeakerIcon className="w-8 h-8" />
              <span className="text-2xl font-bold">{currentQuestion.swissGerman}</span>
          </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {currentOptions.map((option) => (
          <button 
            key={option.id} 
            onClick={() => handleAnswer(option)}
            disabled={answered}
            className={`relative rounded-xl overflow-hidden border-8 transition-all duration-300 transform hover:scale-105
            ${!answered ? 'border-transparent hover:border-emerald-400' : ''}
            ${answered && option.id === currentQuestion.id ? 'border-green-500 scale-105' : ''}
            ${answered && option.id !== currentQuestion.id ? 'border-transparent opacity-50' : ''}
            `}
          >
            <img src={option.image} alt={option.italian} className="w-full h-48 object-cover"/>
            {answered && option.id === currentQuestion.id && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-70 flex items-center justify-center">
                    <CheckIcon className="w-20 h-20 text-white" />
                </div>
            )}
            {answered && feedback === 'incorrect' && option.id !== currentQuestion.id && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-70 flex items-center justify-center">
                    <XMarkIcon className="w-16 h-16 text-white" />
                </div>
            )}
          </button>
        ))}
      </div>
        <div className="flex justify-center mt-6 space-x-2">
            {[...Array(questions.length)].map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded-full ${i < currentIndex ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
            ))}
        </div>
    </div>
  );
};

const QuizCompleteScreen: React.FC<{ score: number, total: number, onRestart: () => void, onBack: () => void }> = ({ score, total, onRestart, onBack }) => {
    return (
        <div className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-xl border-4 border-slate-200">
            <h2 className="text-4xl font-black text-emerald-700 mb-4">Quiz Finito!</h2>
            <p className="text-2xl text-slate-600 mb-6">Hai fatto {score} su {total}!</p>
            <div className="flex text-yellow-400 mb-8">
                {[...Array(total)].map((_, i) => <StarIcon key={i} className="w-12 h-12" filled={i < score} />)}
            </div>
            <div className="flex gap-4">
                <button onClick={onRestart} className="bg-emerald-500 text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-emerald-600 transition">Riprova</button>
                <button onClick={onBack} className="bg-slate-500 text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-slate-600 transition">Indietro</button>
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
    setMode(GameMode.LEARN); // Go back to learn mode before starting quiz again
    setTimeout(() => setMode(GameMode.QUIZ_AUDIO_TO_IMAGE), 100);
  };
  
  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-screen w-full">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-bold transition-colors">
                <ArrowLeftIcon className="w-8 h-8 p-1 bg-white rounded-full shadow"/>
                <span className="hidden md:inline">Categorie</span>
            </button>
            <h1 className={`text-4xl font-black ${category.color.text}`}>{category.title.italian}</h1>
            <div className="w-24"></div>
        </div>

        {quizScore ? (
            <QuizCompleteScreen score={quizScore.score} total={quizScore.total} onRestart={handleRestartQuiz} onBack={onBack}/>
        ) : (
            <>
                <div className="flex justify-center mb-8 bg-slate-200 p-1 rounded-full w-full max-w-sm mx-auto">
                <button
                    onClick={() => setMode(GameMode.LEARN)}
                    className={`w-1/2 py-3 text-xl font-bold rounded-full transition-colors ${mode === GameMode.LEARN ? 'bg-white text-emerald-600 shadow' : 'text-slate-500'}`}
                >
                    Impara
                </button>
                <button
                    onClick={() => setMode(GameMode.QUIZ_AUDIO_TO_IMAGE)}
                    className={`w-1/2 py-3 text-xl font-bold rounded-full transition-colors ${mode === GameMode.QUIZ_AUDIO_TO_IMAGE ? 'bg-white text-emerald-600 shadow' : 'text-slate-500'}`}
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
