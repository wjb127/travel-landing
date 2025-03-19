'use client';

import { motion } from 'framer-motion';
import { useStory, SectionName } from '../context/StoryContext';

interface SectionNavigationProps {
  currentSection: SectionName;
}

export default function SectionNavigation({ currentSection }: SectionNavigationProps) {
  const { goToSection, completedSections } = useStory();
  
  const sections = [
    { id: 'intro', name: '인트로', icon: '🏠' },
    { id: 'experience', name: '여행 경험', icon: '🎭' },
    { id: 'destination', name: '목적지', icon: '✈️' },
    { id: 'activity', name: '액티비티', icon: '🥾' },
    { id: 'planning', name: '계획', icon: '📝' },
    { id: 'booking', name: '예약', icon: '🏨' }
  ];

  const handleSectionClick = (section: SectionName) => {
    if (completedSections.has(section) || section === currentSection) {
      goToSection(section);
      
      // 직접 스크롤 처리 - window.scrollTo 사용
      const sectionElement = document.getElementById(`${section}-section`);
      if (sectionElement) {
        const yOffset = sectionElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: yOffset,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <motion.div 
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg">
        <div className="flex items-center space-x-1">
          {sections.map((section) => {
            const isCompleted = completedSections.has(section.id as SectionName);
            const isCurrent = currentSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id as SectionName)}
                className={`relative rounded-full p-2 transition-all ${
                  isCurrent 
                    ? 'bg-blue-500 text-white scale-110' 
                    : isCompleted
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                }`}
                title={section.name}
                disabled={!isCompleted && !isCurrent}
              >
                <span>{section.icon}</span>
                {isCurrent && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
} 