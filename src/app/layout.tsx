import { ReactNode } from 'react';
import { Press_Start_2P } from 'next/font/google';
import './globals.css';

// Google Fonts 설정
const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pixelFont.variable}>
      <head>
        <title>횡스크롤 RPG 게임</title>
        <meta name="description" content="마리오와 같은 횡스크롤 RPG 게임" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
