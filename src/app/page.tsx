'use client';

import { useState, useEffect, useRef } from 'react';
import TravelIntroSection from '@/components/TravelIntroSection';
import ExperienceSection from '@/components/ExperienceSection';
import DestinationSection from '@/components/DestinationSection';
import ActivitySection from '@/components/ActivitySection';
import PlanningSection from '@/components/PlanningSection';
import BookingSection from '@/components/BookingSection';
import { StoryProvider, useStory, SectionName } from '@/context/StoryContext';

function TravelApp() {
  const { currentSection, goToSection } = useStory();
  
  // 각 섹션에 대한 ref 생성
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    destination: useRef<HTMLDivElement>(null),
    activity: useRef<HTMLDivElement>(null),
    planning: useRef<HTMLDivElement>(null),
    booking: useRef<HTMLDivElement>(null)
  };
  
  // 스크롤 위치에 따라 현재 섹션 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // 각 섹션의 위치 확인
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          // 섹션이 화면의 중앙에 있는지 확인
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            goToSection(section as SectionName);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [goToSection, sectionRefs]);

  return (
    <main className="relative">
      <div ref={sectionRefs.intro} id="intro-section">
        <TravelIntroSection active={currentSection === 'intro'} />
      </div>
      <div ref={sectionRefs.experience} id="experience-section">
        <ExperienceSection active={currentSection === 'experience'} />
      </div>
      <div ref={sectionRefs.destination} id="destination-section">
        <DestinationSection active={currentSection === 'destination'} />
      </div>
      <div ref={sectionRefs.activity} id="activity-section">
        <ActivitySection active={currentSection === 'activity'} />
      </div>
      <div ref={sectionRefs.planning} id="planning-section">
        <PlanningSection active={currentSection === 'planning'} />
      </div>
      <div ref={sectionRefs.booking} id="booking-section">
        <BookingSection active={currentSection === 'booking'} />
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <StoryProvider>
      <TravelApp />
    </StoryProvider>
  );
}
