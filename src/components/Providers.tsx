'use client';

import { ReactNode } from 'react';
import { StoryProvider } from '@/context/StoryContext';
import { AnimatePresence } from 'framer-motion';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <StoryProvider>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </StoryProvider>
  );
} 