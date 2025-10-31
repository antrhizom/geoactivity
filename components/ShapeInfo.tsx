
import React from 'react';
import type { Shape } from '../types';

interface ShapeInfoProps {
  shape: Shape;
}

const FormulaCard: React.FC<{ title: string; formula: string; explanation: string }> = ({ title, formula, explanation }) => (
    <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
        <h4 className="font-semibold text-slate-600 dark:text-slate-300">{title}</h4>
        <p className="text-2xl font-mono text-sky-600 dark:text-sky-400 my-2">{formula}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{explanation}</p>
    </div>
);

export const ShapeInfo: React.FC<ShapeInfoProps> = ({ shape }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg h-full flex flex-col">
      <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">{shape.name}</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">{shape.description}</p>
      
      <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-200">Eigenschaften</h3>
          <ul className="space-y-2">
            {shape.properties.map(prop => (
                <li key={prop.label} className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
                    <span className="text-slate-600 dark:text-slate-400">{prop.label}:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{prop.value}</span>
                </li>
            ))}
          </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-200">Formeln</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormulaCard title={shape.formulas.area.label} formula={shape.formulas.area.formula} explanation={shape.formulas.area.explanation} />
            <FormulaCard title={shape.formulas.perimeter.label} formula={shape.formulas.perimeter.formula} explanation={shape.formulas.perimeter.explanation}/>
        </div>
      </div>
    </div>
  );
};
