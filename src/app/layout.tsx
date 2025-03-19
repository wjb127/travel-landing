'use client';

import { ReactNode, useEffect } from 'react';
import { Press_Start_2P } from 'next/font/google';
import './globals.css';

// Google Fonts 설정
const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 클라이언트 측에서만 클래스 추가
    document.body.classList.add('vsc-initialized');
    
    // 스크롤 잠금 제거
    // document.body.style.overflow = 'hidden';
    
    // return () => {
    //   document.body.style.overflow = '';
    // };
  }, []);

  return (
    <html lang="ko" className={pixelFont.variable}>
      <head>
        <title>월드 트래블러</title>
        <meta name="description" content="당신만의 특별한 여행을 디자인하세요" />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
