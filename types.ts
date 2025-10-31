import type React from 'react';

export interface Exercise {
  type: 'area' | 'perimeter';
  question: string;
  parameters: Record<string, number>;
  calculateCorrectAnswer: (params: Record<string, number>) => number;
}

export interface Shape {
  id: 'kreis' | 'quadrat' | 'rechteck' | 'dreieck';
  name: string;
  description: string;
  properties: { label: string; value: string }[];
  formulas: {
    area: {
      label: string;
      formula: string;
      explanation: string;
    };
    perimeter: {
      label: string;
      formula: string;
      explanation: string;
    };
  };
  component: React.FC<{ className?: string }>;
  generateExercise: () => Exercise;
}