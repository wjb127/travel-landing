'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useStory } from '../context/StoryContext';
import SectionNavigation from './SectionNavigation';

interface TravelIntroSectionProps {
  active: boolean;
}

export default function TravelIntroSection({ active }: TravelIntroSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });
  
  const { goToNextSection, sectionCompleted } = useStory();

  // 인트로 애니메이션이 완료되면 자동으로 다음 섹션으로 이동
  useEffect(() => {
    if (active && inView) {
      const timer = setTimeout(() => {
        sectionCompleted('intro');
        goToNextSection();
      }, 5000); // 5초 후 자동 진행
      
      return () => clearTimeout(timer);
    }
  }, [active, inView, goToNextSection, sectionCompleted]);

  return (
    <motion.section
      ref={ref}
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-600 text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: active ? 1 : 0,
      }}
      transition={{ duration: 1 }}
    >
      <SectionNavigation currentSection="intro" />
      
      {/* 배경 요소 - 구름과 비행기 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-20 h-10 bg-white rounded-full"></div>
        <div className="absolute top-[15%] left-[25%] w-32 h-16 bg-white rounded-full"></div>
        <div className="absolute top-[8%] left-[60%] w-24 h-12 bg-white rounded-full"></div>
        <div className="absolute top-[20%] left-[80%] w-16 h-8 bg-white rounded-full"></div>
        <div className="absolute top-[30%] right-[10%] w-12 h-12 bg-white transform rotate-45" style={{clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 70%, 0% 100%)'}}></div>
      </div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: active && inView ? 1 : 0.8, 
          opacity: active && inView ? 1 : 0 
        }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-center z-10"
      >
        <h1 className="text-6xl font-bold mb-6">월드 트래블러</h1>
        <p className="text-xl mb-8">당신만의 특별한 여행을 디자인하세요</p>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: active && inView ? 0 : 50, 
            opacity: active && inView ? 1 : 0 
          }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <button 
            onClick={() => {
              sectionCompleted('intro');
              goToNextSection();
            }}
            className="px-8 py-4 bg-amber-500 rounded-full text-lg font-semibold hover:bg-amber-400 transition"
          >
            여행 시작하기
          </button>
        </motion.div>
      </motion.div>
      
      {/* 지구본 이미지 */}
      <div className="absolute bottom-0 w-full h-[30%] bg-blue-800 opacity-30 rounded-t-full transform translate-y-1/2"></div>
    </motion.section>
  );
} 