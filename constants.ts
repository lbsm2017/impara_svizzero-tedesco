import type { Category } from './types';
import { FruitIcon, VegetableIcon, HouseIcon, ToysIcon, GardenIcon, ForestIcon, NeedsIcon } from './components/Icons';

export const CATEGORIES: Category[] = [
  {
    id: 'frutta',
    title: { italian: 'Frutta', swissGerman: 'Frücht' },
    color: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
    icon: FruitIcon,
    items: [
      { id: 1, italian: 'Mela', swissGerman: 'Öpfel', image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 2, italian: 'Banana', swissGerman: 'Banane', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 3, italian: 'Fragola', swissGerman: 'Erdbeeri', image: 'https://images.unsplash.com/photo-1578984442379-e2f751d36d4f?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 4, italian: 'Uva', swissGerman: 'Trüübe', image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 5, italian: 'Arancia', swissGerman: 'Orange', image: 'https://images.unsplash.com/photo-1580053442349-8a29b23c2fb1?q=80&w=400&auto=format&fit=crop&v=2' },
    ],
  },
  {
    id: 'verdura',
    title: { italian: 'Verdura', swissGerman: 'Gmües' },
    color: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
    icon: VegetableIcon,
    items: [
      { id: 6, italian: 'Carota', swissGerman: 'Rüebli', image: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 7, italian: 'Pomodoro', swissGerman: 'Tomate', image: 'https://images.unsplash.com/photo-1617173978677-490c6d356950?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 8, italian: 'Lattuga', swissGerman: 'Salat', image: 'https://images.unsplash.com/photo-1550482031-6257f8625905?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 9, italian: 'Patata', swissGerman: 'Härdöpfel', image: 'https://images.unsplash.com/photo-1590165482129-1b8b2769878a?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 10, italian: 'Peperone', swissGerman: 'Peperoni', image: 'https://images.unsplash.com/photo-1568432321150-13d802f0637b?q=80&w=400&auto=format&fit=crop&v=2' },
    ],
  },
  {
    id: 'casa',
    title: { italian: 'Casa', swissGerman: 'Huus' },
    color: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    icon: HouseIcon,
    items: [
      { id: 11, italian: 'Letto', swissGerman: 'Bett', image: 'https://images.unsplash.com/photo-1598035411032-ae405f6b6a22?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 12, italian: 'Tavolo', swissGerman: 'Tisch', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fd4?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 13, italian: 'Sedia', swissGerman: 'Stuel', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 14, italian: 'Porta', swissGerman: 'Türe', image: 'https://images.unsplash.com/photo-1550081693-4903645a7a44?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 15, italian: 'Finestra', swissGerman: 'Feischter', image: 'https://images.unsplash.com/photo-1516495269382-47425b991b5c?q=80&w=400&auto=format&fit=crop&v=2' },
    ],
  },
  {
    id: 'giochi',
    title: { italian: 'Giochi', swissGerman: 'Spieli' },
    color: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    icon: ToysIcon,
    items: [
      { id: 16, italian: 'Palla', swissGerman: 'Ball', image: 'https://images.unsplash.com/photo-1517452639242-b9a3a165b64c?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 17, italian: 'Bambola', swissGerman: 'Puppe', image: 'https://images.unsplash.com/photo-1620295874404-e538f0e5b7c7?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 18, italian: 'Macchinina', swissGerman: 'Autöli', image: 'https://images.unsplash.com/photo-1582492921430-67c2f0638536?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 19, italian: 'Orsacchiotto', swissGerman: 'Teddybär', image: 'https://images.unsplash.com/photo-1566479878233-1c1809033333?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 20, italian: 'Mattoncini', swissGerman: 'Legöli', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=400&auto=format&fit=crop&v=2' },
    ],
  },
    {
    id: 'giardino',
    title: { italian: 'Giardino', swissGerman: 'Garte' },
    color: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    icon: GardenIcon,
    items: [
        { id: 21, italian: 'Fiore', swissGerman: 'Blueme', image: 'https://images.unsplash.com/photo-1507608443049-ca3434683457?q=80&w=400&auto=format&fit=crop&v=2' },
        { id: 22, italian: 'Albero', swissGerman: 'Baum', image: 'https://images.unsplash.com/photo-1444492417251-4bee5b018159?q=80&w=400&auto=format&fit=crop&v=2' },
        { id: 23, italian: 'Erba', swissGerman: 'Gras', image: 'https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=400&auto=format&fit=crop&v=2' },
        { id: 24, italian: 'Sasso', swissGerman: 'Stei', image: 'https://images.unsplash.com/photo-1606121588692-351a08457b32?q=80&w=400&auto=format&fit=crop&v=2' },
        { id: 25, italian: 'Farfalla', swissGerman: 'Schmetterling', image: 'https://images.unsplash.com/photo-1542108226-94343d3b332b?q=80&w=400&auto=format&fit=crop&v=2' },
    ]
  },
  {
    id: 'foresta',
    title: { italian: 'Foresta', swissGerman: 'Wald' },
    color: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
    icon: ForestIcon,
    items: [
        { id: 26, italian: 'Pino', swissGerman: 'Tanne', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop&v=2' },
        { id: 27, italian: 'Fungo', swissGerman: 'Pilz', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=400&auto=format&fit=crop&v=2' },
        { id: 28, italian: 'Volpe', swissGerman: 'Fuchs', image: 'https://images.unsplash.com/photo-1516934024016-192d4392a832?q=80&w=400&auto=format&fit=crop&v=2' },
        { id: 29, italian: 'Scoiattolo', swissGerman: 'Eichhörnli', image: 'https://images.unsplash.com/photo-1505391309990-562e8483b156?q=80&w=400&auto=format&fit=crop&v=2' },
        { id: 30, italian: 'Gufo', swissGerman: 'Eule', image: 'https://images.unsplash.com/photo-1555352819-756d13a69533?q=80&w=400&auto=format&fit=crop&v=2' },
    ]
  },
  {
    id: 'bisogni',
    title: { italian: 'Bisogni', swissGerman: 'Bedürfnis' },
    color: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-300' },
    icon: NeedsIcon,
    items: [
      { id: 31, italian: 'Ho fame', swissGerman: 'Ich han Hunger', image: 'https://images.unsplash.com/photo-1579781403213-118f3a3629e4?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 32, italian: 'Ho sete', swissGerman: 'Ich han Durscht', image: 'https://images.unsplash.com/photo-1563220803-305c75467554?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 33, italian: 'Ho sonno', swissGerman: 'Ich bin müed', image: 'https://images.unsplash.com/photo-1498146831523-747c16472483?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 34, italian: 'Vado in bagno', swissGerman: 'Ich gang ufs WC', image: 'https://images.unsplash.com/photo-1616078330364-783454b3833b?q=80&w=400&auto=format&fit=crop&v=2' },
      { id: 35, italian: 'Voglio un abbraccio', swissGerman: 'Ich wett e Uumarmig', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=400&auto=format&fit=crop&v=2' },
    ],
  },
];