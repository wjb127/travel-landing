'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 섹션 이름을 정의합니다
export type SectionName = 
  | 'intro' 
  | 'experience' 
  | 'destination' 
  | 'activity' 
  | 'planning' 
  | 'booking';

interface StoryContextType {
  currentSection: SectionName;
  goToSection: (section: SectionName) => void;
  goToNextSection: () => void;
  goToPreviousSection: () => void;
  sectionCompleted: (section: SectionName) => void;
  completedSections: Set<SectionName>;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

// 섹션 순서를 정의합니다
const sectionOrder: SectionName[] = [
  'intro',
  'experience',
  'destination',
  'activity',
  'planning',
  'booking'
];

export function StoryProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState<SectionName>('intro');
  const [completedSections, setCompletedSections] = useState<Set<SectionName>>(new Set());

  const goToSection = (section: SectionName) => {
    setCurrentSection(section);
  };

  const goToNextSection = () => {
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex < sectionOrder.length - 1) {
      setCurrentSection(sectionOrder[currentIndex + 1]);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sectionOrder[currentIndex - 1]);
    }
  };

  const sectionCompleted = (section: SectionName) => {
    setCompletedSections(prev => {
      const updated = new Set(prev);
      updated.add(section);
      return updated;
    });
  };

  return (
    <StoryContext.Provider value={{ 
      currentSection, 
      goToSection, 
      goToNextSection,
      goToPreviousSection,
      sectionCompleted,
      completedSections
    }}>
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