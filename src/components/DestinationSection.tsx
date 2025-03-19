'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface DestinationSectionProps {
  active: boolean;
  onComplete: () => void;
}

export default function DestinationSection({ active, onComplete }: DestinationSectionProps) {
  const [destinationIndex, setDestinationIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // 이미지 슬라이드 애니메이션
  useEffect(() => {
    if (active && inView) {
      const interval = setInterval(() => {
        const destination = destinations[destinationIndex];
        setImageIndex((prev) => (prev < destination.images.length - 1 ? prev + 1 : 0));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [active, inView, destinationIndex]);

  const destinations = [
    {
      title: "발리, 인도네시아",
      description: "신비로운 사원, 아름다운 해변, 그리고 풍부한 문화가 어우러진 열대 낙원",
      icon: "✈️",
      highlights: [
        "우붓의 신성한 원숭이 숲과 테라스 라이스 필드",
        "울루와투 사원에서 전통 케착 댄스 관람",
        "세미냑과 쿠타의 황금빛 해변에서 서핑과 일몰 감상",
        "발리니스 요리 클래스와 전통 스파 체험"
      ],
      bestTimeToVisit: "4월-10월 (건기)",
      recommendedDays: "7-10일",
      travelStyle: "문화 체험, 휴양",
      images: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=800"
      ],
      mapLocation: "8.3405° S, 115.0920° E"
    },
    {
      title: "교토, 일본",
      description: "천년의 역사와 전통이 살아 숨쉬는 일본의 문화 중심지",
      icon: "🏯",
      highlights: [
        "금각사와 은각사의 아름다운 건축미 감상",
        "아라시야마의 대나무 숲 산책과 원숭이 공원 방문",
        "기온 지구에서 게이샤 문화 체험",
        "전통 다도 의식과 일본 정원 탐방"
      ],
      bestTimeToVisit: "3-4월 (벚꽃), 11월 (단풍)",
      recommendedDays: "4-6일",
      travelStyle: "문화 체험, 역사 탐방",
      images: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1493997181344-712f2f19d87a?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800"
      ],
      mapLocation: "35.0116° N, 135.7681° E"
    },
    {
      title: "산토리니, 그리스",
      description: "눈부신 하얀 건물과 푸른 지붕이 에게해와 어우러진 낭만적인 섬",
      icon: "🏝️",
      highlights: [
        "이아(Oia)에서 세계적으로 유명한 일몰 감상",
        "화산 칼데라 크루즈와 온천 체험",
        "피라 마을의 좁은 골목길 탐험",
        "지역 와이너리 투어와 그리스 요리 체험"
      ],
      bestTimeToVisit: "4월-6월, 9월-10월",
      recommendedDays: "4-5일",
      travelStyle: "로맨틱 여행, 휴양",
      images: [
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1601581875039-e899893d520c?auto=format&fit=crop&w=800"
      ],
      mapLocation: "36.3932° N, 25.4615° E"
    },
    {
      title: "마추픽추, 페루",
      description: "안데스 산맥 고지대에 숨겨진 신비로운 잉카 문명의 유적지",
      icon: "🏔️",
      highlights: [
        "해 뜨는 시간에 마추픽추 유적 탐험",
        "와이나픽추 정상 등반과 장대한 전망",
        "잉카 트레일 하이킹 체험",
        "쿠스코의 역사적인 도시 탐방과 현지 음식 체험"
      ],
      bestTimeToVisit: "5월-9월 (건기)",
      recommendedDays: "3-4일 (쿠스코 포함 7일)",
      travelStyle: "모험, 역사 탐방",
      images: [
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1531065208531-4036c0dba3d3?auto=format&fit=crop&w=800"
      ],
      mapLocation: "13.1631° S, 72.5450° W"
    }
  ];

  const currentDestination = destinations[destinationIndex];

  const nextDestination = () => {
    if (destinationIndex < destinations.length - 1) {
      setDestinationIndex(destinationIndex + 1);
      setImageIndex(0);
    } else {
      onComplete();
    }
  };

  return (
    <motion.section
      ref={ref}
      className="h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-sky-100 to-blue-200 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: active && inView ? 1 : 0,
      }}
      transition={{ duration: 0.8 }}
    >
      {/* 배경 요소 - 구름과 비행기 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-20 h-10 bg-white rounded-full"></div>
        <div className="absolute top-[15%] left-[25%] w-32 h-16 bg-white rounded-full"></div>
        <div className="absolute top-[8%] left-[60%] w-24 h-12 bg-white rounded-full"></div>
        <div className="absolute top-[20%] left-[80%] w-16 h-8 bg-white rounded-full"></div>
        <div className="absolute top-[30%] right-[10%] w-12 h-12 bg-white transform rotate-45" style={{clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 70%, 0% 100%)'}}>
          {/* 비행기 모양 */}
        </div>
      </div>
      
      <h2 className="text-4xl font-bold text-blue-800 mb-8 relative z-10 font-mono tracking-wide">목적지 탐색</h2>
      
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
            <span className="text-4xl mr-3">{currentDestination.icon}</span>
            <h3 className="text-2xl font-semibold text-blue-800 font-mono tracking-wide">{currentDestination.title}</h3>
          </div>
          <p className="text-lg text-blue-900 mb-4">{currentDestination.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 rounded-full text-blue-800 text-sm">
              최적 방문 시기: {currentDestination.bestTimeToVisit}
            </span>
            <span className="px-3 py-1 bg-blue-100 rounded-full text-blue-800 text-sm">
              추천 일정: {currentDestination.recommendedDays}
            </span>
            <span className="px-3 py-1 bg-blue-100 rounded-full text-blue-800 text-sm">
              여행 스타일: {currentDestination.travelStyle}
            </span>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">주요 볼거리</h4>
            <ul className="space-y-2">
              {currentDestination.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">위치</h4>
            <div className="bg-blue-50 p-2 rounded-md text-blue-800">
              <span className="font-mono">{currentDestination.mapLocation}</span>
            </div>
          </div>
          
          <button 
            onClick={nextDestination}
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition text-white font-bold font-mono tracking-wide transform hover:scale-105"
          >
            {destinationIndex < destinations.length - 1 ? "다음 목적지" : "여행 경험 보기"}
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
            {/* 목적지 이미지 슬라이더 */}
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden border-4 border-white shadow-xl">
              <div 
                className="w-full h-full flex items-center justify-center transition-opacity duration-1000"
                style={{ 
                  backgroundImage: `url(${currentDestination.images[imageIndex]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              
              {/* 이미지 인디케이터 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {currentDestination.images.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`w-3 h-3 rounded-full ${idx === imageIndex ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`이미지 ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* 여행 팁 */}
            <div className="mt-4 bg-white/80 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-blue-800 mb-2">여행 팁</h4>
              <p className="text-blue-900">
                {destinationIndex === 0 && "발리에서는 사원 방문 시 사롱(전통 천)을 착용해야 합니다. 대부분의 사원에서 대여 가능합니다."}
                {destinationIndex === 1 && "교토의 인기 명소는 아침 일찍 방문하는 것이 좋습니다. 특히 아라시야마 대나무 숲은 해 뜨는 시간에 방문하세요."}
                {destinationIndex === 2 && "산토리니에서는 이아(Oia)의 일몰을 놓치지 마세요. 좋은 자리를 잡으려면 최소 1시간 전에 도착하는 것이 좋습니다."}
                {destinationIndex === 3 && "마추픽추 방문은 사전 예약이 필수입니다. 입장 티켓은 몇 달 전부터 매진되는 경우가 많으니 미리 계획하세요."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 목적지 선택 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {destinations.map((_, index) => (
          <button 
            key={index}
            onClick={() => {
              setDestinationIndex(index);
              setImageIndex(0);
            }}
            className={`w-3 h-3 rounded-full ${index === destinationIndex ? 'bg-blue-600' : 'bg-blue-300'}`}
            aria-label={`목적지 ${index + 1}로 이동`}
          ></button>
        ))}
      </div>
    </motion.section>
  );
} 