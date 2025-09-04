
import React, { useState } from 'react';
import { CategorySelector } from './components/CategorySelector';
import { GameScreen } from './components/GameScreen';
import type { Category } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBackToMenu = () => {
    setSelectedCategory(null);
  };

  return (
    <main className="min-h-screen">
      {!selectedCategory ? (
        <CategorySelector onSelectCategory={handleSelectCategory} />
      ) : (
        <GameScreen category={selectedCategory} onBack={handleBackToMenu} />
      )}
    </main>
  );
}

export default App;
