'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ActivitySectionProps {
  active: boolean;
  onComplete: () => void;
}

export default function ActivitySection({ active, onComplete }: ActivitySectionProps) {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const activities = [
    {
      title: "트레킹 & 하이킹",
      description: "세계 각지의 아름다운 자연 속에서 트레킹과 하이킹을 즐겨보세요. 초보자부터 전문가까지 모든 수준에 맞는 코스를 제공합니다.",
      icon: "🥾",
      images: [
        "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800"
      ],
      difficulty: "초급 ~ 고급",
      duration: "반나절 ~ 다중일",
      bestLocations: "네팔 히말라야, 뉴질랜드 밀포드 트랙, 페루 잉카 트레일"
    },
    {
      title: "수상 스포츠",
      description: "에메랄드빛 바다에서 스노클링, 스쿠버 다이빙, 서핑, 카약 등 다양한 수상 활동을 경험해보세요.",
      icon: "🏄‍♂️",
      images: [
        "https://images.unsplash.com/photo-1499242611767-cf8b9be02854?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800"
      ],
      difficulty: "초급 ~ 중급",
      duration: "2~4시간",
      bestLocations: "몰디브, 하와이, 태국 피피섬, 호주 그레이트 배리어 리프"
    },
    {
      title: "문화 체험",
      description: "현지인의 일상에 직접 참여하고 전통 공예, 요리, 음악, 춤 등을 배워보세요. 진정한 문화 교류를 경험할 수 있습니다.",
      icon: "🎭",
      images: [
        "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1583318432730-a19c89692612?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1565073624497-7e91b2d7586a?auto=format&fit=crop&w=800"
      ],
      difficulty: "모든 수준",
      duration: "2~6시간",
      bestLocations: "일본 교토, 인도 바라나시, 모로코 페스, 멕시코 오악사카"
    },
    {
      title: "야생동물 관찰",
      description: "자연 서식지에서 야생동물을 관찰하는 특별한 경험을 해보세요. 전문 가이드와 함께 안전하고 책임감 있는 투어를 제공합니다.",
      icon: "🦁",
      images: [
        "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800"
      ],
      difficulty: "초급",
      duration: "반나절 ~ 종일",
      bestLocations: "탄자니아 세렝게티, 코스타리카, 보르네오, 갈라파고스 제도"
    }
  ];

  // 자동 슬라이드 효과
  useEffect(() => {
    if (active && inView) {
      const interval = setInterval(() => {
        setCurrentActivity((prev) => {
          const nextIndex = (prev + 1) % activities.length;
          return nextIndex;
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [active, inView, activities]);

  const currentActivityData = activities[currentActivity];

  const nextActivity = () => {
    if (currentActivity < activities.length - 1) {
      setCurrentActivity(currentActivity + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.section
      ref={ref}
      className="h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-teal-50 to-teal-200 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: active && inView ? 1 : 0,
      }}
      transition={{ duration: 0.8 }}
    >
      {/* 배경 요소 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-teal-500 rounded-full"></div>
        <div className="absolute top-[30%] right-[15%] w-24 h-24 bg-teal-500 rounded-full"></div>
        <div className="absolute bottom-[20%] left-[20%] w-40 h-40 bg-teal-500 rounded-full"></div>
      </div>
      
      <h2 className="text-4xl font-bold text-teal-800 mb-8 relative z-10 font-mono tracking-wide">액티비티 & 체험</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl relative z-10">
        <motion.div 
          className="md:w-1/2 p-6 bg-white/80 rounded-lg backdrop-blur-sm shadow-lg"
          initial={{ x: -50, opacity: 0 }}
          animate={{ 
            x: active && inView ? 0 : -50, 
            opacity: active && inView ? 1 : 0 
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-3">{currentActivityData.icon}</span>
            <h3 className="text-2xl font-semibold text-teal-800 font-mono tracking-wide">{currentActivityData.title}</h3>
          </div>
          
          <p className="text-lg text-teal-900 mb-6">{currentActivityData.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-teal-100 rounded-full text-teal-800 text-sm">
              난이도: {currentActivityData.difficulty}
            </span>
            <span className="px-3 py-1 bg-teal-100 rounded-full text-teal-800 text-sm">
              소요 시간: {currentActivityData.duration}
            </span>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-teal-800 mb-2">추천 장소</h4>
            <p className="text-teal-900">{currentActivityData.bestLocations}</p>
          </div>
          
          <button 
            onClick={nextActivity}
            className="px-6 py-3 bg-teal-600 rounded-lg hover:bg-teal-500 transition text-white font-bold font-mono tracking-wide transform hover:scale-105"
          >
            {currentActivity < activities.length - 1 ? "다음 액티비티" : "여행 계획하기"}
          </button>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 mt-8 md:mt-0 md:pl-8"
          initial={{ x: 50, opacity: 0 }}
          animate={{ 
            x: active && inView ? 0 : 50, 
            opacity: active && inView ? 1 : 0 
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative">
            {/* 액티비티 이미지 슬라이더 */}
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <div 
                className="w-full h-full transition-opacity duration-1000"
                style={{ 
                  backgroundImage: `url(${currentActivityData.images[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              
              {/* 이미지 인디케이터 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {currentActivityData.images.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentActivity(idx)}
                    className={`w-3 h-3 rounded-full ${idx === currentActivity ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`이미지 ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 액티비티 선택 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {activities.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentActivity(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentActivity ? 'bg-teal-600 scale-125' : 'bg-teal-300'
            }`}
            aria-label={`액티비티 ${index + 1}로 이동`}
          ></button>
        ))}
      </div>
    </motion.section>
  );
} 