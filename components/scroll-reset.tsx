'use client';

import { useEffect } from 'react';

export function ScrollReset() {
  useEffect(() => {
    // 첫 렌더 시 항상 최상단으로 이동
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return null;
}
