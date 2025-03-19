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
  // suppressHydrationWarning을 사용하여 하이드레이션 경고 억제
  useEffect(() => {
    // 클라이언트 측에서만 실행되는 코드
    // VSCode 관련 클래스는 더 이상 추가하지 않음
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
