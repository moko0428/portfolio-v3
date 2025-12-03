'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const NAV_SECTIONS = [
  { id: 'intro', label: 'about' },
  { id: 'projects', label: 'project' },
] as const;

type SectionId = (typeof NAV_SECTIONS)[number]['id'];

export function TopNav() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>('intro');

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const doc = document.documentElement;
      const docHeight = doc.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? currentY / docHeight : 0;

      setScrollY(currentY);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_SECTIONS.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            if (sectionIds.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const hasScrolled = scrollY > 10;

  return (
    <div
      className={`sticky top-0 z-40 border-b backdrop-blur transition-colors duration-300 ${
        hasScrolled
          ? 'bg-background/90 border-border/60'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <div className="text-sm font-semibold tracking-tight text-foreground">
          MOKO
        </div>
        <nav className="flex gap-4 text-[11px] font-medium text-muted-foreground sm:gap-6 sm:text-xs">
          {NAV_SECTIONS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  'relative pb-1 uppercase tracking-wide transition-colors hover:text-foreground',
                  isActive && 'text-primary'
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'pointer-events-none absolute inset-x-0 -bottom-[3px] h-px origin-left scale-x-0 bg-primary/70 transition-transform duration-200',
                    isActive && 'scale-x-100'
                  )}
                />
              </a>
            );
          })}
        </nav>

        {/* Scroll progress bar at the bottom of the nav */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border/40">
          <div
            className="h-full bg-primary transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
