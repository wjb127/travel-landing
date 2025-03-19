'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface BookingSectionProps {
  active: boolean;
  onComplete: () => void;
}

export default function BookingSection({ active, onComplete }: BookingSectionProps) {
  const [formState, setFormState] = useState({
    destination: '',
    dates: '',
    travelers: '2',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 실제 폼 제출 로직을 구현할 수 있습니다
    setSubmitted(true);
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-purple-50 to-purple-200 relative overflow-auto py-16"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: active && inView ? 1 : 0,
      }}
      transition={{ duration: 0.8 }}
    >
      {/* 배경 요소 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-purple-500 rounded-full"></div>
        <div className="absolute top-[30%] right-[15%] w-24 h-24 bg-purple-500 rounded-full"></div>
        <div className="absolute bottom-[20%] left-[20%] w-40 h-40 bg-purple-500 rounded-full"></div>
      </div>
      
      <h2 className="text-4xl font-bold text-purple-800 mb-8 relative z-10 font-mono tracking-wide">여행 상담 예약</h2>
      
      <div className="w-full max-w-4xl relative z-10 mb-16">
        {!submitted ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ 
              y: active && inView ? 0 : 50, 
              opacity: active && inView ? 1 : 0 
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">여행 정보</h3>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="destination" className="block text-purple-900 font-medium">희망 목적지</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formState.destination}
                  onChange={handleChange}
                  placeholder="예: 발리, 교토, 산토리니..."
                  className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="dates" className="block text-purple-900 font-medium">여행 날짜</label>
                <input
                  type="text"
                  id="dates"
                  name="dates"
                  value={formState.dates}
                  onChange={handleChange}
                  placeholder="예: 2023년 7월 1일 - 7월 10일"
                  className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="travelers" className="block text-purple-900 font-medium">여행자 수</label>
                <select
                  id="travelers"
                  name="travelers"
                  value={formState.travelers}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="1">1명</option>
                  <option value="2">2명</option>
                  <option value="3">3명</option>
                  <option value="4">4명</option>
                  <option value="5+">5명 이상</option>
                </select>
              </div>
              
              <div className="col-span-2 mt-2">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">연락처 정보</h3>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="name" className="block text-purple-900 font-medium">이름</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="block text-purple-900 font-medium">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="phone" className="block text-purple-900 font-medium">전화번호</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="010-1234-5678"
                  className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="col-span-2 space-y-1">
                <label htmlFor="specialRequests" className="block text-purple-900 font-medium">특별 요청사항</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formState.specialRequests}
                  onChange={handleChange}
                  placeholder="특별한 요청사항이 있으시면 알려주세요."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
              
              <div className="col-span-2 mt-4 flex justify-center">
                <button 
                  type="submit"
                  className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition transform hover:scale-105 font-semibold"
                >
                  상담 예약하기
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1 
            }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-xl text-center"
          >
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-semibold text-purple-800 mb-4">예약이 완료되었습니다!</h3>
            <p className="text-lg text-purple-900 mb-6">
              {formState.name}님, 여행 상담 요청이 접수되었습니다. 24시간 이내에 이메일({formState.email})로 연락드리겠습니다.
            </p>
            <button 
              onClick={onComplete}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition"
            >
              홈으로 돌아가기
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
} 