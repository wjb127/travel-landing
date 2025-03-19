'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface PlanningSectionProps {
  active: boolean;
  onComplete: () => void;
}

export default function PlanningSection({ active, onComplete }: PlanningSectionProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const planningSteps = [
    {
      title: "여행 스타일 정의",
      description: "여행의 목적과 스타일을 정의하는 것부터 시작하세요. 휴양, 모험, 문화 체험, 미식 여행 등 당신이 원하는 경험이 무엇인지 생각해보세요.",
      icon: "🧭",
      tips: [
        "혼자 여행, 커플 여행, 가족 여행, 친구와의 여행 등 동반자에 따라 계획을 조정하세요.",
        "여행 기간과 예산을 미리 설정하고 현실적인 계획을 세우세요.",
        "여행 중 꼭 하고 싶은 활동 목록을 작성해보세요."
      ],
      image: "https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&w=800"
    },
    {
      title: "최적의 시기 선택",
      description: "목적지의 기후, 성수기/비수기, 현지 축제나 이벤트 등을 고려하여 최적의 여행 시기를 선택하세요.",
      icon: "🗓️",
      tips: [
        "성수기에는 인기 명소가 붐비고 가격이 비싸지만, 모든 관광 시설이 운영됩니다.",
        "비수기에는 가격이 저렴하고 한적하지만, 날씨나 운영 시간을 확인해야 합니다.",
        "어깨 시즌(성수기와 비수기 사이)은 좋은 타협점이 될 수 있습니다."
      ],
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800"
    },
    {
      title: "일정 계획",
      description: "목적지에서의 일정을 계획하되, 유연성을 유지하세요. 주요 명소와 활동에 충분한 시간을 할당하고, 이동 시간도 고려하세요.",
      icon: "📝",
      tips: [
        "하루에 너무 많은 활동을 계획하지 마세요. 여유 시간이 필요합니다.",
        "주요 명소는 개장 직후나 마감 직전에 방문하면 혼잡을 피할 수 있습니다.",
        "현지 교통 수단과 이동 시간을 미리 조사하세요.",
        "예상치 못한 발견과 경험을 위한 자유 시간을 포함하세요."
      ],
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800"
    },
    {
      title: "숙소 및 교통편 예약",
      description: "숙소와 교통편은 가능한 한 일찍 예약하세요. 특히 성수기나 인기 목적지라면 더욱 중요합니다.",
      icon: "🏨",
      tips: [
        "숙소 선택 시 위치, 안전성, 편의시설, 리뷰를 고려하세요.",
        "항공권은 일반적으로 출발 1-3개월 전에 예약하는 것이 가장 저렴합니다.",
        "현지 교통 옵션(대중교통, 렌터카, 택시 등)을 미리 조사하세요.",
        "예약 확인서와 중요 연락처를 인쇄하거나 오프라인으로 저장해두세요."
      ],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800"
    }
  ];

  const currentStep = planningSteps[stepIndex];

  const handleNext = () => {
    if (stepIndex < planningSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.section
      ref={ref}
      className="h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-green-50 to-green-200 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: active && inView ? 1 : 0,
      }}
      transition={{ duration: 0.8 }}
    >
      {/* 배경 요소 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[15%] left-[15%] w-32 h-32 bg-green-500 rounded-full"></div>
        <div className="absolute top-[25%] right-[20%] w-24 h-24 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-[25%] left-[25%] w-40 h-40 bg-green-500 rounded-full"></div>
      </div>
      
      <h2 className="text-4xl font-bold text-green-800 mb-12 relative z-10 font-mono tracking-wide">여행 계획</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl relative z-10">
        <motion.div 
          className="md:w-1/2 p-6 bg-white/80 rounded-lg backdrop-blur-sm shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: active && inView ? 0 : 50, 
            opacity: active && inView ? 1 : 0 
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-3">{currentStep.icon}</span>
            <h3 className="text-2xl font-semibold text-green-800 font-mono tracking-wide">{currentStep.title}</h3>
          </div>
          
          <p className="text-lg text-green-900 mb-6">{currentStep.description}</p>
          
          <div className="mb-8">
            <h4 className="text-xl text-green-800 mb-3">유용한 팁</h4>
            <ul className="space-y-2">
              {currentStep.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-green-800">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <button 
            onClick={handleNext}
            className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-500 transition text-white font-bold font-mono tracking-wide transform hover:scale-105"
          >
            {stepIndex < planningSteps.length - 1 ? "다음 단계" : "예약 상담"}
          </button>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 mt-8 md:mt-0 md:pl-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ 
            y: active && inView ? 0 : -50, 
            opacity: active && inView ? 1 : 0 
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
            <div 
              className="w-full h-full"
              style={{ 
                backgroundImage: `url(${currentStep.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          </div>
          
          {/* 진행 상태 표시 */}
          <div className="mt-6 flex items-center justify-center">
            <div className="w-full max-w-md bg-white/50 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-600 rounded-full transition-all duration-500"
                style={{ width: `${((stepIndex + 1) / planningSteps.length) * 100}%` }}
              ></div>
            </div>
            <span className="ml-3 text-green-800 font-semibold">
              {stepIndex + 1}/{planningSteps.length}
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* 단계 선택 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {planningSteps.map((_, index) => (
          <button 
            key={index}
            onClick={() => setStepIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === stepIndex ? 'bg-green-600 scale-125' : 'bg-green-300'
            }`}
            aria-label={`계획 단계 ${index + 1}로 이동`}
          ></button>
        ))}
      </div>
    </motion.section>
  );
} 