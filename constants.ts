
import type { Category } from './types';
import { FruitIcon, VegetableIcon, ToyIcon, HomeIcon, NeedsIcon } from './components/Icons';

export const CATEGORIES: Category[] = [
  {
    id: 'fruits',
    title: { italian: 'Frutta', swissGerman: 'Frücht' },
    color: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
    icon: FruitIcon,
    items: [
      { id: 1, italian: 'Mela', swissGerman: 'Öpfel', image: 'https://picsum.photos/id/488/300/300' },
      { id: 2, italian: 'Banana', swissGerman: 'Banane', image: 'https://picsum.photos/id/1080/300/300' },
      { id: 3, italian: 'Pera', swissGerman: 'Pere', image: 'https://picsum.photos/id/490/300/300' },
      { id: 4, italian: 'Uva', swissGerman: 'Trüübe', image: 'https://picsum.photos/id/102/300/300' },
      { id: 5, italian: 'Arancia', swissGerman: 'Orange', image: 'https://picsum.photos/id/212/300/300' },
    ],
  },
  {
    id: 'vegetables',
    title: { italian: 'Verdura', swissGerman: 'Gmües' },
    color: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    icon: VegetableIcon,
    items: [
      { id: 6, italian: 'Carota', swissGerman: 'Rüebli', image: 'https://picsum.photos/id/188/300/300' },
      { id: 7, italian: 'Pomodoro', swissGerman: 'Tomate', image: 'https://picsum.photos/id/206/300/300' },
      { id: 8, italian: 'Patata', swissGerman: 'Härdöpfel', image: 'https://picsum.photos/id/292/300/300' },
      { id: 9, italian: 'Lattuga', swissGerman: 'Salat', image: 'https://picsum.photos/id/312/300/300' },
      { id: 10, italian: 'Cipolla', swissGerman: 'Zibele', image: 'https://picsum.photos/id/440/300/300' },
    ],
  },
  {
    id: 'toys',
    title: { italian: 'Giocattoli', swissGerman: 'Spillsache' },
    color: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    icon: ToyIcon,
    items: [
      { id: 11, italian: 'Palla', swissGerman: 'Ball', image: 'https://picsum.photos/id/1066/300/300' },
      { id: 12, italian: 'Bambola', swissGerman: 'Puppä', image: 'https://picsum.photos/id/1027/300/300' },
      { id: 13, italian: 'Macchinina', swissGerman: 'Autöli', image: 'https://picsum.photos/id/133/300/300' },
      { id: 14, italian: 'Orsacchiotto', swissGerman: 'Teddybär', image: 'https://picsum.photos/id/1074/300/300' },
      { id: 15, italian: 'Mattoncini', swissGerman: 'Bauklötzli', image: 'https://picsum.photos/id/25/300/300' },
    ],
  },
  {
    id: 'home',
    title: { italian: 'A casa', swissGerman: 'Dihei' },
    color: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    icon: HomeIcon,
    items: [
      { id: 16, italian: 'Sedia', swissGerman: 'Stuel', image: 'https://picsum.photos/id/1082/300/300' },
      { id: 17, italian: 'Tavolo', swissGerman: 'Tisch', image: 'https://picsum.photos/id/24/300/300' },
      { id: 18, italian: 'Letto', swissGerman: 'Bett', image: 'https://picsum.photos/id/3/300/300' },
      { id: 19, italian: 'Cucchiaio', swissGerman: 'Löffel', image: 'https://picsum.photos/id/355/300/300' },
      { id: 20, italian: 'Bicchiere', swissGerman: 'Glas', image: 'https://picsum.photos/id/87/300/300' },
    ],
  },
  {
    id: 'needs',
    title: { italian: 'Bisogni', swissGerman: 'Bedürfniss' },
    color: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
    icon: NeedsIcon,
    items: [
      { id: 21, italian: 'Ho fame', swissGerman: 'Ich ha Hunger', image: 'https://picsum.photos/id/645/300/300' },
      { id: 22, italian: 'Ho sete', swissGerman: 'Ich ha Durscht', image: 'https://picsum.photos/id/326/300/300' },
      { id: 23, italian: 'Devo fare pipì', swissGerman: 'Ich mues Bisi mache', image: 'https://picsum.photos/id/565/300/300' },
      { id: 24, italian: 'Devo fare cacca', swissGerman: 'Ich mues Gaggi mache', image: 'https://picsum.photos/id/65/300/300' },
      { id: 25, italian: 'Sono stanco', swissGerman: 'Ich bi müed', image: 'https://picsum.photos/id/386/300/300' },
    ],
  },
];
