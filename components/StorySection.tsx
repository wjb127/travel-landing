'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface StorySectionProps {
  active: boolean;
  onComplete: () => void;
}

export default function StorySection({ active, onComplete }: StorySectionProps) {
  const [storyStep, setStoryStep] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // 스토리 내용 배열
  const storyContent = [
    "먼 미래, 인류는 새로운 행성을 발견했습니다...",
    "그러나 그 행성에는 예상치 못한 위험이 도사리고 있었죠...",
    "당신은 이 위험에 맞서 싸울 용기가 있습니까?"
  ];

  // 사용자 선택에 따른 스토리 진행
  const handleChoice = (choice: string) => {
    if (storyStep < storyContent.length - 1) {
      setStoryStep(storyStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: active && inView ? 1 : 0,
        y: active && inView ? 0 : 50
      }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="max-w-2xl bg-black/80 p-8 rounded-lg text-white"
        key={storyStep}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl mb-6">게임 스토리</h2>
        <p className="text-xl mb-8">{storyContent[storyStep]}</p>
        
        {storyStep < storyContent.length - 1 ? (
          <button 
            onClick={() => handleChoice('continue')}
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            계속하기
          </button>
        ) : (
          <div className="flex gap-4">
            <button 
              onClick={() => handleChoice('brave')}
              className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              용기를 내겠다
            </button>
            <button 
              onClick={() => handleChoice('cautious')}
              className="px-6 py-3 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition"
            >
              더 알아보겠다
            </button>
          </div>
        )}
      </motion.div>
    </motion.section>
  );
} 