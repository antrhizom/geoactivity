import React, { useState, useEffect } from 'react';
import { ShapeSelector } from './components/ShapeSelector';
import { ShapeDisplay } from './components/ShapeDisplay';
import { ShapeInfo } from './components/ShapeInfo';
import { Exercises } from './components/Exercises';
import { SHAPES } from './constants';
import type { Shape } from './types';

const App: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<Shape>(SHAPES[0]);
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsContentVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectShape = (shape: Shape) => {
    setIsContentVisible(false);
    setTimeout(() => {
      setSelectedShape(shape);
      setIsContentVisible(true);
    }, 300); // Duration of the fade-out transition
  };
  
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-600 dark:text-sky-400">
            Interaktiver Geometrie-Lernhelfer
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Wähle eine Form, um ihre Eigenschaften und Formeln zu entdecken.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1">
            <ShapeSelector
              shapes={SHAPES}
              selectedShape={selectedShape}
              onSelectShape={handleSelectShape}
            />
          </aside>

          <div className="lg:col-span-2 space-y-8">
            <div 
              className="grid grid-cols-1 md:grid-cols-5 gap-8 transition-opacity duration-300 ease-in-out" 
              style={{ opacity: isContentVisible ? 1 : 0 }}
            >
              <div className="md:col-span-2">
                <ShapeDisplay shape={selectedShape} />
              </div>
              <div className="md:col-span-3">
                <ShapeInfo shape={selectedShape} />
              </div>
            </div>
            <div 
              className="transition-opacity duration-300 ease-in-out" 
              style={{ opacity: isContentVisible ? 1 : 0 }}
            >
              <Exercises shape={selectedShape} key={selectedShape.id} />
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-400">
            <p>&copy; {new Date().getFullYear()} Geometrie-Lernhelfer. Alle Rechte vorbehalten.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;