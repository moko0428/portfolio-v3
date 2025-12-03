'use client';

import { motion } from 'motion/react';

export function ScrollHint() {
  const handleClick = () => {
    const el = document.getElementById('intro');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="mt-4 flex cursor-pointer flex-col items-center gap-1 text-[11px] text-muted-foreground"
      aria-label="아래로 스크롤하여 더 많은 내용을 확인하세요"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 1, 0.7, 1], y: [0, 6, 0] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <span>Scroll</span>
      <span className="text-lg leading-none">⌄</span>
    </motion.button>
  );
}
