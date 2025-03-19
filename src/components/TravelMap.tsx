'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TravelMapProps {
  destination?: string;
  interactive?: boolean;
}

export default function TravelMap({ destination = '세계', interactive = true }: TravelMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 여기에 지도 관련 로직 구현 (예: 외부 지도 API 연동)
    const initMap = () => {
      if (mapRef.current) {
        // 지도 초기화 로직
        console.log(`${destination} 지도를 초기화합니다.`);
      }
    };
    
    initMap();
    
    return () => {
      // 정리 로직
    };
  }, [destination]);
  
  return (
    <motion.div
      ref={mapRef}
      className="w-full h-full rounded-lg overflow-hidden bg-blue-100 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-blue-200 opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">{destination} 지도</h3>
          {interactive && (
            <p className="text-blue-600 text-sm">인터랙티브 지도를 로드하는 중...</p>
          )}
        </div>
      </div>
    </motion.div>
  );
} 