
import React from 'react';
import type { Category } from '../types';
import { CATEGORIES } from '../constants';

interface CategorySelectorProps {
  onSelectCategory: (category: Category) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black text-emerald-700">Ciao!</h1>
        <p className="text-xl text-slate-600 mt-2">Cosa vuoi imparare oggi?</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl w-full">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={`group flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg border-4 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 ${category.color.bg} ${category.color.border} ${category.color.text}`}
          >
            <category.icon className="text-6xl mb-3 transition-transform duration-300 group-hover:scale-125" />
            <span className="text-2xl font-bold">{category.title.italian}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
