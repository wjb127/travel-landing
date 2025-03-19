'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Providers from '@/components/Providers';
import TravelIntroSection from '@/components/TravelIntroSection';
import ExperienceSection from '@/components/ExperienceSection';
import DestinationSection from '@/components/DestinationSection';
import PlanningSection from '@/components/PlanningSection';
import BookingSection from '@/components/BookingSection';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  
  // 각 섹션에 대한 ref 생성
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  
  // 스크롤 위치에 따라 현재 섹션 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // 현재 보이는 섹션 계산
      const sectionIndex = Math.floor((scrollY + windowHeight / 2) / windowHeight);
      if (sectionIndex >= 0 && sectionIndex < sectionRefs.length) {
        setCurrentSection(sectionIndex);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 섹션 전환 함수
  const navigateToSection = (index: number) => {
    if (index >= 0 && index < sectionRefs.length && sectionRefs[index].current) {
      // 부드러운 스크롤 이동
      sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(index);
    }
  };

  return (
    <Providers>
      <main className="relative">
        <div ref={sectionRefs[0]}>
          <TravelIntroSection 
            active={currentSection === 0} 
            onComplete={() => navigateToSection(1)} 
          />
        </div>
        
        <div ref={sectionRefs[1]}>
          <ExperienceSection 
            active={currentSection === 1} 
            onComplete={() => navigateToSection(2)} 
          />
        </div>
        
        <div ref={sectionRefs[2]}>
          <DestinationSection 
            active={currentSection === 2} 
            onComplete={() => navigateToSection(3)} 
          />
        </div>
        
        <div ref={sectionRefs[3]}>
          <PlanningSection 
            active={currentSection === 3} 
            onComplete={() => navigateToSection(4)} 
          />
        </div>
        
        <div ref={sectionRefs[4]}>
          <BookingSection 
            active={currentSection === 4} 
          />
        </div>
        
        {/* 네비게이션 인디케이터 */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
          <div className="flex flex-col gap-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                onClick={() => navigateToSection(index)}
                className={`w-4 h-4 rounded-full border-2 border-white transition-all ${
                  currentSection === index ? 'bg-white scale-125' : 'bg-transparent'
                }`}
                aria-label={`섹션 ${index + 1}로 이동`}
              />
            ))}
          </div>
        </div>
      </main>
    </Providers>
  );
}
