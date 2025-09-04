import React from 'react';
import type { Category } from '../types';
import { CATEGORIES } from '../constants';

interface CategorySelectorProps {
  onSelectCategory: (category: Category) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-fadein">
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-black text-emerald-700">Ciao!</h1>
        <p className="text-xl md:text-2xl text-slate-600 mt-2">Scegli una categoria per iniziare.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl w-full">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={`group flex flex-col items-center justify-center p-4 rounded-3xl shadow-lg border-8 w-40 h-40 md:w-48 md:h-48 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 active:scale-95 ${category.color.bg} ${category.color.border} ${category.color.text}`}
          >
            <category.icon className="text-7xl md:text-8xl mb-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
            <span className="text-xl md:text-2xl font-bold text-center">{category.title.italian}</span>
          </button>
        ))}
      </div>
    </div>
  );
};