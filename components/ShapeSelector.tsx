
import React from 'react';
import type { Shape } from '../types';

interface ShapeSelectorProps {
  shapes: Shape[];
  selectedShape: Shape;
  onSelectShape: (shape: Shape) => void;
}

export const ShapeSelector: React.FC<ShapeSelectorProps> = ({ shapes, selectedShape, onSelectShape }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Formen auswählen</h2>
      <div className="space-y-3">
        {shapes.map((shape) => (
          <button
            key={shape.id}
            onClick={() => onSelectShape(shape)}
            className={`w-full text-left px-4 py-3 rounded-lg text-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-sky-500 ${
              selectedShape.id === shape.id
                ? 'bg-sky-600 text-white font-semibold shadow-md'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-600'
            }`}
          >
            {shape.name}
          </button>
        ))}
      </div>
    </div>
  );
};
