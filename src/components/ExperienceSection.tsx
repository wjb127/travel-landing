'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useStory } from '../context/StoryContext';
import SectionNavigation from './SectionNavigation';

interface ExperienceSectionProps {
  active: boolean;
}

export default function ExperienceSection({ active }: ExperienceSectionProps) {
  const [currentExperience, setCurrentExperience] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });
  
  const { goToNextSection, sectionCompleted, goToPreviousSection } = useStory();

  const experiences = [
    {
      title: "문화 체험",
      description: "현지인의 삶에 직접 참여하고 전통 문화를 체험하세요. 요리 클래스, 전통 공예, 축제 참여 등 다양한 문화 활동을 통해 더 깊이 있는 여행을 경험할 수 있습니다.",
      icon: "🎭",
      image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800"
    },
    {
      title: "모험 & 액티비티",
      description: "아드레날린이 솟구치는 모험을 찾고 계신가요? 트레킹, 스쿠버 다이빙, 패러글라이딩, 사파리 등 다양한 액티비티로 잊지 못할 추억을 만드세요.",
      icon: "🧗‍♂️",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800"
    },
    {
      title: "휴양 & 웰니스",
      description: "일상에서 벗어나 완벽한 휴식을 취하세요. 프라이빗 비치, 럭셔리 스파, 요가 리트릿, 명상 프로그램 등을 통해 몸과 마음의 균형을 되찾을 수 있습니다.",
      icon: "🧘‍♀️",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800"
    },
    {
      title: "미식 여행",
      description: "세계 각국의 다양한 맛을 경험하세요. 현지 시장 투어, 미슐랭 레스토랑, 와이너리 방문, 스트릿 푸드 체험 등 미식가를 위한 특별한 여행을 제안합니다.",
      icon: "🍽️",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800"
    }
  ];

  const handleNext = () => {
    if (currentExperience < experiences.length - 1) {
      setCurrentExperience(currentExperience + 1);
    } else {
      sectionCompleted('experience');
      goToNextSection();
    }
  };

  const handleNextSection = () => {
    sectionCompleted('experience');
    goToNextSection();
    
    // 직접 스크롤 처리
    const destinationSection = document.getElementById('destination-section');
    if (destinationSection) {
      destinationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePreviousSection = () => {
    goToPreviousSection();
    
    // 직접 스크롤 처리
    const introSection = document.getElementById('intro-section');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const experience = experiences[currentExperience];

  return (
    <motion.section
      ref={ref}
      className="h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-amber-50 to-amber-200 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: active && inView ? 1 : 0,
      }}
      transition={{ duration: 0.8 }}
    >
      <SectionNavigation currentSection="experience" />
      
      {/* 배경 요소 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-amber-500 rounded-full"></div>
        <div className="absolute top-[30%] right-[15%] w-24 h-24 bg-amber-500 rounded-full"></div>
        <div className="absolute bottom-[20%] left-[20%] w-40 h-40 bg-amber-500 rounded-full"></div>
      </div>
      
      <h2 className="text-4xl font-bold text-amber-800 mb-12 relative z-10 font-mono tracking-wide">여행 경험</h2>
      
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ 
            x: active && inView ? 0 : -50, 
            opacity: active && inView ? 1 : 0 
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center mb-4">
            <span className="text-5xl mr-4">{experience.icon}</span>
            <h3 className="text-3xl font-semibold text-amber-800">{experience.title}</h3>
          </div>
          
          <p className="text-lg text-amber-900 mb-8 leading-relaxed">
            {experience.description}
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={handlePreviousSection}
              className="px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition"
            >
              이전 경험
            </button>
            
            <button 
              onClick={handleNextSection}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition transform hover:scale-105 font-semibold"
            >
              {currentExperience < experiences.length - 1 ? "다음 경험" : "목적지 탐색"}
            </button>
            
            <button className="px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition">
              더 알아보기
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ 
            x: active && inView ? 0 : 50, 
            opacity: active && inView ? 1 : 0 
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="rounded-xl overflow-hidden shadow-2xl h-[400px]">
            <div 
              className="w-full h-full"
              style={{ 
                backgroundImage: `url(${experience.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          </div>
        </motion.div>
      </div>
      
      {/* 경험 선택 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {experiences.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentExperience(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentExperience ? 'bg-amber-600 scale-125' : 'bg-amber-300'
            }`}
            aria-label={`경험 ${index + 1}로 이동`}
          ></button>
        ))}
      </div>
    </motion.section>
  );
} 