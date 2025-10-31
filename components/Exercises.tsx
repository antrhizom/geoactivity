
import React, { useState, useEffect } from 'react';
import type { Shape, Exercise } from '../types.ts';

interface ExercisesProps {
  shape: Shape;
}

export const Exercises: React.FC<ExercisesProps> = ({ shape }) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  const generateNewExercise = () => {
    setExercise(shape.generateExercise());
    setUserAnswer('');
    setFeedback(null);
  };

  useEffect(() => {
    generateNewExercise();
  }, [shape]);

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exercise || userAnswer.trim() === '') return;
    
    // Allow comma as decimal separator
    const answerNum = parseFloat(userAnswer.replace(',', '.'));
    
    if (isNaN(answerNum)) {
      setFeedback({ message: 'Bitte gib eine gültige Zahl ein.', isCorrect: false });
      return;
    }

    const correctAnswer = exercise.calculateCorrectAnswer(exercise.parameters);
    
    // Round both to 2 decimal places for robust comparison
    const isCorrect = Math.round(answerNum * 100) === Math.round(correctAnswer * 100);

    if (isCorrect) {
      setFeedback({ 
        message: `Perfekt! Die richtige Antwort ist ${correctAnswer.toLocaleString('de-DE', { maximumFractionDigits: 2 })}.`, 
        isCorrect: true 
      });
    } else {
      setFeedback({ 
        message: 'Leider nicht ganz richtig. Versuch es noch einmal!', 
        isCorrect: false 
      });
    }
  };

  if (!exercise) {
    return null; 
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Übungsaufgabe</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-4 text-lg">{exercise.question}</p>

      <form onSubmit={handleCheckAnswer} className="flex flex-col sm:flex-row items-stretch gap-3">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Deine Antwort"
          className="flex-grow px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-sky-500 focus:ring-0 focus:outline-none transition"
          aria-label="Antwort eingeben"
        />
        <div className="flex gap-3">
             <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors"
             >
                Prüfen
            </button>
            <button
                type="button"
                onClick={generateNewExercise}
                className="w-full sm:w-auto px-6 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-slate-500 transition-colors"
            >
                Neue Aufgabe
            </button>
        </div>
      </form>
      
      {feedback && (
         <div className={`mt-4 px-4 py-2 rounded-lg text-center font-medium ${feedback.isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'}`}>
            {feedback.message}
         </div>
      )}
    </div>
  );
};