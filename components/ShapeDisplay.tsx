
import React from 'react';
import type { Shape } from '../types';

interface ShapeDisplayProps {
  shape: Shape;
}

export const ShapeDisplay: React.FC<ShapeDisplayProps> = ({ shape }) => {
  const ShapeComponent = shape.component;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg h-full flex flex-col justify-center items-center aspect-square">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{shape.name}</h3>
        <div className="w-full max-w-[250px] text-sky-500 dark:text-sky-400">
             <ShapeComponent className="w-full h-auto" />
        </div>
    </div>
  );
};
