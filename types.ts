
export interface VocabularyItem {
  id: number;
  italian: string;
  swissGerman: string;
  image: string;
}

export interface Category {
  id: string;
  title: {
    italian: string;
    swissGerman: string;
  };
  items: VocabularyItem[];
  icon: (props: { className?: string }) => JSX.Element;
  color: {
    bg: string;
    text: string;
    border: string;
  }
}

export enum GameMode {
  LEARN = 'LEARN',
  QUIZ_AUDIO_TO_IMAGE = 'QUIZ_AUDIO_TO_IMAGE',
}
