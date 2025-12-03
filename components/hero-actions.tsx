'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

export function HeroActions() {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async () => {
    const phone = '010-4129-9408';
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(phone);
      } else {
        // fallback
        const textarea = document.createElement('textarea');
        textarea.value = phone;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 -mt-10">
      <div className="flex items-center justify-center gap-2">
        <Button
          type="button"
          onClick={scrollToProjects}
          variant="default"
          className="bg-primary text-primary-foreground hover:bg-primary/90 py-7 px-7"
        >
          <span className="text-lg font-medium">프로젝트 보기</span>
        </Button>
        <Button
          type="button"
          onClick={handleCopyPhone}
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10 py-7 px-7"
        >
          <span className="text-lg font-medium">연락하기</span>
        </Button>
      </div>
      {copied && (
        <p className="text-[11px] text-emerald-600">
          전화번호가 복사되었습니다:)
        </p>
      )}
    </div>
  );
}
