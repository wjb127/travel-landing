'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type StoryChoice = {
  section: string;
  choice: string;
};

type StoryContextType = {
  progress: number;
  choices: StoryChoice[];
  updateProgress: (newProgress: number) => void;
  addChoice: (section: string, choice: string) => void;
};

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export function StoryProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [choices, setChoices] = useState<StoryChoice[]>([]);

  const updateProgress = (newProgress: number) => {
    setProgress(newProgress);
  };

  const addChoice = (section: string, choice: string) => {
    setChoices([...choices, { section, choice }]);
  };

  return (
    <StoryContext.Provider value={{ progress, choices, updateProgress, addChoice }}>
      {children}
    </StoryContext.Provider>
  );
}

export function useStory() {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
} 