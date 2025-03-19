'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TravelActivitiesSectionProps {
  active: boolean;
  onComplete: () => void;
}

export default function TravelActivitiesSection({ active, onComplete }: TravelActivitiesSectionProps) {
  const [activityIndex, setActivityIndex] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // 애니메이션 효과
  useEffect(() => {
    if (active && inView) {
      const interval = setInterval(() => {
        setAnimationFrame((prev) => (prev < 3 ? prev + 1 : 0));
      }, 150);
      return () => clearInterval(interval);
    }
  }, [active, inView]);

  const travelActivities = [
    {
      title: "현지 투어",
      description: "현지 가이드와 함께하는 특별한 투어로 숨겨진 명소와 현지인만 아는 장소를 방문하세요. 관광객이 아닌 여행자로서의 경험을 제공합니다.",
      imageSrc: "https://via.placeholder.com/800x400/4CAF50/FFFFFF?text=현지+투어",
      icon: "🧭"
    },
    {
      title: "모험 액티비티",
      description: "짜릿한 모험을 원하시나요? 패러글라이딩, 스쿠버 다이빙, 정글 트레킹 등 다양한 액티비티로 잊지 못할 추억을 만드세요.",
      imageSrc: "https://via.placeholder.com/800x400/2196F3/FFFFFF?text=모험+액티비티",
      icon: "🏄‍♂️"
    },
    {
      title: "문화 체험",
      description: "현지 문화를 직접 체험해보세요. 전통 요리 클래스, 공예품 만들기, 전통 의상 체험 등 다양한 문화 프로그램을 제공합니다.",
      imageSrc: "https://via.placeholder.com/800x400/FFC107/000000?text=문화+체험",
      icon: "🎭"
    },
    {
      title: "휴식과 웰니스",
      description: "여행 중에도 휴식은 중요합니다. 스파, 요가, 명상 등 몸과 마음을 재충전할 수 있는 웰니스 프로그램을 경험해보세요.",
      imageSrc: "https://via.placeholder.com/800x400/F44336/FFFFFF?text=휴식과+웰니스",
      icon: "🧘‍♀️"
    }
  ];

  const currentActivity = travelActivities[activityIndex];

  const nextActivity = () => {
    if (activityIndex < travelActivities.length - 1) {
      setActivityIndex(activityIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.section
      ref={ref}
      className="h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-600 to-teal-600 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: active && inView ? 1 : 0,
      }}
      transition={{ duration: 0.8 }}
    >
      {/* 배경 요소 - 구름과 파도 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-20 h-10 bg-white rounded-full"></div>
        <div className="absolute top-[15%] left-[25%] w-32 h-16 bg-white rounded-full"></div>
        <div className="absolute top-[8%] left-[60%] w-24 h-12 bg-white rounded-full"></div>
        <div className="absolute top-[20%] left-[80%] w-16 h-8 bg-white rounded-full"></div>
      </div>
      
      {/* 해변 배경 */}
      <div className="absolute bottom-0 left-0 w-full h-[15%] bg-amber-200"></div>
      <div className="absolute bottom-[15%] left-0 w-full h-[5%] bg-blue-400 opacity-50"></div>
      
      <h2 className="text-4xl font-bold text-white mb-8 relative z-10 font-mono tracking-wide">여행 액티비티</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl relative z-10">
        <motion.div 
          className="md:w-1/2 p-6 bg-white/20 rounded-lg backdrop-blur-sm"
          initial={{ x: -50, opacity: 0 }}
          animate={{ 
            x: active && inView ? 0 : -50, 
            opacity: active && inView ? 1 : 0 
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-3">{currentActivity.icon}</span>
            <h3 className="text-2xl font-semibold text-white font-mono tracking-wide">{currentActivity.title}</h3>
          </div>
          <p className="text-lg text-white mb-8">{currentActivity.description}</p>
          
          <button 
            onClick={nextActivity}
            className="px-6 py-3 bg-amber-500 rounded-lg hover:bg-amber-400 transition text-black font-bold font-mono tracking-wide transform hover:scale-105"
          >
            {activityIndex < travelActivities.length - 1 ? "다음 액티비티" : "여행 계획하기"}
          </button>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 mt-8 md:mt-0"
          initial={{ x: 50, opacity: 0 }}
          animate={{ 
            x: active && inView ? 0 : 50, 
            opacity: active && inView ? 1 : 0 
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative">
            {/* 액티비티 이미지 */}
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden border-4 border-white/30">
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ 
                  backgroundImage: `url(${currentActivity.imageSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              
              {/* 움직이는 여행자 아이콘 */}
              <div 
                className="absolute bottom-5 left-1/2 transform -translate-x-1/2 h-16 w-16"
                style={{
                  backgroundImage: "url('https://via.placeholder.com/64x256/FF5722/FFFFFF?text=여행자')",
                  backgroundPosition: `0 -${animationFrame * 64}px`,
                  backgroundRepeat: 'no-repeat',
                  imageRendering: 'pixelated'
                }}
              ></div>
            </div>
            
            {/* 액티비티 선택 UI */}
            <div className="mt-4 flex justify-center gap-4">
              <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">🏖️</button>
              <button className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">🏔️</button>
              <button className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">🏛️</button>
              <button className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">🍽️</button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 진행 표시기 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {travelActivities.map((_, index) => (
          <button 
            key={index}
            onClick={() => setActivityIndex(index)}
            className={`w-3 h-3 rounded-full ${index === activityIndex ? 'bg-amber-500' : 'bg-white/50'}`}
            aria-label={`액티비티 ${index + 1}로 이동`}
          ></button>
        ))}
      </div>
    </motion.section>
  );
} 