
import React from 'react';
import type { Shape, Exercise } from './types.ts';

// Helper function to generate a random integer
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// SVG Components for each shape
const Circle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="none" />
    <line x1="50" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    <text x="73" y="45" fontSize="10" fill="currentColor">r</text>
  </svg>
);

const Square: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <rect x="5" y="5" width="90" height="90" stroke="currentColor" strokeWidth="4" fill="none" />
    <text x="48" y="55" fontSize="10" fill="currentColor">a</text>
  </svg>
);

const Rectangle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 60" className={className}>
    <rect x="5" y="5" width="90" height="50" stroke="currentColor" strokeWidth="4" fill="none" />
    <text x="48" y="35" fontSize="10" fill="currentColor">a</text>
    <text x="50" y="20" fontSize="10" fill="currentColor" transform="rotate(90 50 20)">b</text>
  </svg>
);

const Triangle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <polygon points="5,95 95,95 50,5" stroke="currentColor" strokeWidth="4" fill="none" />
    <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    <text x="52" y="55" fontSize="10" fill="currentColor">h</text>
    <text x="73" y="90" fontSize="10" fill="currentColor">g</text>
  </svg>
);

export const SHAPES: Shape[] = [
  {
    id: 'kreis',
    name: 'Kreis',
    description: 'Ein Kreis ist eine perfekt runde Form. Alle Punkte am Rand (Kreislinie) haben den gleichen Abstand zum Mittelpunkt.',
    properties: [
      { label: 'Seiten', value: 'Keine (eine durchgehende Linie)' },
      { label: 'Ecken', value: '0' },
    ],
    formulas: {
      area: {
        label: 'Flächeninhalt (A)',
        formula: 'A = π · r²',
        explanation: 'Pi mal dem Radius zum Quadrat.'
      },
      perimeter: {
        label: 'Umfang (U)',
        formula: 'U = 2 · π · r',
        explanation: 'Zwei mal Pi mal dem Radius.'
      }
    },
    component: Circle,
    generateExercise: (): Exercise => {
        const type = Math.random() > 0.5 ? 'area' : 'perimeter';
        const r = getRandomInt(1, 20);
        if (type === 'area') {
            return {
                type: 'area',
                parameters: { r },
                question: `Berechne den Flächeninhalt eines Kreises mit dem Radius r = ${r}. Runde auf zwei Dezimalstellen.`,
                calculateCorrectAnswer: params => Math.PI * params.r * params.r,
            };
        }
        return {
            type: 'perimeter',
            parameters: { r },
            question: `Berechne den Umfang eines Kreises mit dem Radius r = ${r}. Runde auf zwei Dezimalstellen.`,
            calculateCorrectAnswer: params => 2 * Math.PI * params.r,
        };
    }
  },
  {
    id: 'quadrat',
    name: 'Quadrat',
    description: 'Ein Quadrat ist ein Viereck mit vier gleich langen Seiten und vier rechten Winkeln (90°).',
    properties: [
      { label: 'Seiten', value: '4 (gleich lang)' },
      { label: 'Ecken', value: '4 (alle 90°)' },
    ],
    formulas: {
      area: {
        label: 'Flächeninhalt (A)',
        formula: 'A = a²',
        explanation: 'Seitenlänge mal Seitenlänge.'
      },
      perimeter: {
        label: 'Umfang (U)',
        formula: 'U = 4 · a',
        explanation: 'Vier mal die Seitenlänge.'
      }
    },
    component: Square,
    generateExercise: (): Exercise => {
        const type = Math.random() > 0.5 ? 'area' : 'perimeter';
        const a = getRandomInt(1, 25);
        if (type === 'area') {
            return {
                type: 'area',
                parameters: { a },
                question: `Berechne den Flächeninhalt eines Quadrats mit der Seitenlänge a = ${a}.`,
                calculateCorrectAnswer: params => params.a * params.a,
            };
        }
        return {
            type: 'perimeter',
            parameters: { a },
            question: `Berechne den Umfang eines Quadrats mit der Seitenlänge a = ${a}.`,
            calculateCorrectAnswer: params => 4 * params.a,
        };
    }
  },
  {
    id: 'rechteck',
    name: 'Rechteck',
    description: 'Ein Rechteck ist ein Viereck, bei dem die gegenüberliegenden Seiten gleich lang sind und alle Winkel rechte Winkel (90°) sind.',
     properties: [
      { label: 'Seiten', value: '4 (gegenüberliegende gleich lang)' },
      { label: 'Ecken', value: '4 (alle 90°)' },
    ],
    formulas: {
      area: {
        label: 'Flächeninhalt (A)',
        formula: 'A = a · b',
        explanation: 'Länge mal Breite.'
      },
      perimeter: {
        label: 'Umfang (U)',
        formula: 'U = 2 · (a + b)',
        explanation: 'Zwei mal die Summe aus Länge und Breite.'
      }
    },
    component: Rectangle,
    generateExercise: (): Exercise => {
        const type = Math.random() > 0.5 ? 'area' : 'perimeter';
        const a = getRandomInt(1, 20);
        let b = a;
        while (b === a) {
            b = getRandomInt(1, 20);
        }
        if (type === 'area') {
            return {
                type: 'area',
                parameters: { a, b },
                question: `Berechne den Flächeninhalt eines Rechtecks mit den Seitenlängen a = ${a} und b = ${b}.`,
                calculateCorrectAnswer: params => params.a * params.b,
            };
        }
        return {
            type: 'perimeter',
            parameters: { a, b },
            question: `Berechne den Umfang eines Rechtecks mit den Seitenlängen a = ${a} und b = ${b}.`,
            calculateCorrectAnswer: params => 2 * (params.a + params.b),
        };
    }
  },
  {
    id: 'dreieck',
    name: 'Gleichschenkliges Dreieck',
    description: 'Ein Dreieck ist eine Grundform mit drei Seiten und drei Ecken. Dieses spezielle Dreieck hat zwei gleich lange Seiten (Schenkel).',
    properties: [
      { label: 'Seiten', value: '3' },
      { label: 'Ecken', value: '3' },
    ],
    formulas: {
      area: {
        label: 'Flächeninhalt (A)',
        formula: 'A = (g · h) / 2',
        explanation: 'Grundseite mal Höhe, geteilt durch zwei.'
      },
      perimeter: {
        label: 'Umfang (U)',
        formula: 'U = a + b + c',
        explanation: 'Die Summe aller drei Seitenlängen.'
      }
    },
    component: Triangle,
    generateExercise: (): Exercise => {
        const type = Math.random() > 0.5 ? 'area' : 'perimeter';
        if (type === 'area') {
            const g = getRandomInt(2, 20) * 2; // Even base for cleaner numbers
            const h = getRandomInt(3, 20);
            return {
                type: 'area',
                parameters: { g, h },
                question: `Berechne den Flächeninhalt eines Dreiecks mit der Grundseite g = ${g} und der Höhe h = ${h}.`,
                calculateCorrectAnswer: params => (params.g * params.h) / 2,
            };
        }
        const g = getRandomInt(2, 15);
        const s = getRandomInt(Math.ceil(g / 2) + 1, 20);
        return {
            type: 'perimeter',
            parameters: { g, s },
            question: `Berechne den Umfang eines gleichschenkligen Dreiecks mit der Grundseite g = ${g} und zwei Schenkeln der Länge s = ${s}.`,
            calculateCorrectAnswer: params => params.g + 2 * params.s,
        };
    }
  },
];