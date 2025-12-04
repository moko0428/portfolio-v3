'use client';

import { useState } from 'react';
import Image from 'next/image';

import { motion, type Variants } from 'motion/react';

import { PROJECTS, type Project } from '@/data/data';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [page, setPage] = useState(1);

  const getPeriodScore = (period: string) => {
    // "YYYY.MM" 패턴을 우선 사용하고, 없으면 연도만 사용
    const ym = period.match(/(\d{4})\.(\d{2})/);
    if (ym) {
      const year = Number(ym[1]);
      const month = Number(ym[2]);
      if (!Number.isNaN(year) && !Number.isNaN(month)) {
        return year * 12 + month;
      }
    }
    const y = period.match(/(\d{4})/);
    if (y) {
      const year = Number(y[1]);
      if (!Number.isNaN(year)) {
        return year * 12;
      }
    }
    // 형식이 애매한 경우(예: "기간 미정")는 가장 오래된 것으로 간주
    return 0;
  };

  const sortedProjects = [...PROJECTS].sort(
    (a, b) => getPeriodScore(b.period) - getPeriodScore(a.period)
  );

  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(sortedProjects.length / pageSize));
  const start = (page - 1) * pageSize;
  const currentProjects = sortedProjects.slice(start, start + pageSize);

  const close = () => setSelected(null);

  return (
    <section id="projects" className="w-full space-y-6">
      {/* Title aligned with About section */}
      <div className="flex items-center justify-center">
        <h2 className="mb-8 border-b-2 border-primary pb-1 text-2xl font-semibold tracking-tight">
          Projects
        </h2>
      </div>

      {/* Cards (4 per page) */}
      <div className="grid gap-6 sm:grid-cols-2">
        {currentProjects.map((project) => {
          const techList = (project.tags ?? project.skills ?? []).filter(
            Boolean
          );

          return (
            <motion.button
              key={project.name}
              type="button"
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              onClick={() => setSelected(project)}
              className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card/60 text-left text-sm shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {project.coverImage && (
                <div className="relative h-40 w-full overflow-hidden border-b border-border/60 bg-muted">
                  <Image
                    src={project.coverImage}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 256px, 100vw"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold">{project.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {project.period}
                  </span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                {techList.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {techList.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className="mt-4 inline-flex items-center text-xs font-medium text-primary">
                  자세히 보기
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-full border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-accent/5 transition-colors"
          >
            이전
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              const isActive = p === page;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-full border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-accent/5 transition-colors"
          >
            다음
          </button>
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
          onClick={close}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{selected.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {selected.period}
                  {selected.teamName && ` · ${selected.teamName}`}
                  {selected.member && ` · ${selected.member}`}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                닫기
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {selected.description}
            </p>

            {selected.comment && (
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {selected.comment}
              </p>
            )}

            {selected.contributions && selected.contributions.length > 0 && (
              <div className="mt-4 space-y-1.5 text-sm">
                <h4 className="text-xs font-semibold text-primary">
                  주요 기여
                </h4>
                <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                  {selected.contributions.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {selected.skills && selected.skills.length > 0 && (
              <div className="mt-4 space-y-1">
                <h4 className="text-xs font-semibold text-primary">
                  사용 기술
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selected.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selected.troubleshooting &&
              selected.troubleshooting.length > 0 && (
                <div className="mt-4 space-y-1.5 text-sm">
                  <h4 className="text-xs font-semibold text-primary">
                    트러블 슈팅
                  </h4>
                  <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                    {selected.troubleshooting.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

            {selected.links && selected.links.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-semibold text-primary">링크</h4>
                <div className="flex flex-wrap gap-3 text-xs">
                  {selected.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent underline-offset-4 transition-colors hover:text-accent/80 hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {selected.video && (
              <div className="mt-6 space-y-2">
                <h4 className="text-xs font-semibold text-primary">
                  시연 영상
                </h4>
                <div className="relative w-full overflow-hidden rounded-lg border bg-black/5">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={selected.video}
                      alt={`${selected.name} 시연 영상`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
