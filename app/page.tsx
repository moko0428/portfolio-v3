import { INTRO, STUDIES } from '@/data/data';
import { About } from '@/components/about';
import { ProjectsSection } from '@/components/projects';
import { ActivitiesSection } from '@/components/activities';
import { HeroActions } from '@/components/hero-actions';
import { ScrollHint } from '@/components/scroll-hint';
import { ScrollReset } from '@/components/scroll-reset';
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ScrollReset />
      <div className="mx-auto flex max-w-5xl flex-col px-4 md:px-6 lg:px-8">
        {/* Intro hero: 한 화면 꽉 채우기 */}
        <section className="flex min-h-screen flex-col items-center justify-center gap-8 pb-16">
          <div className="flex items-center justify-center rounded-full bg-primary/10 px-4 py-1">
            <span className="text-xs font-medium text-primary">
              {INTRO.englishName} · {INTRO.title}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-4xl font-semibold tracking-tight text-center">
              번뜩이는 아이디어 현실적인 기획 실행력 있는 개발
            </span>
            <span className="text-3xl font-semibold tracking-tight text-primary">
              {'"AI를 곁들인"'}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <span className="text-base leading-relaxed text-muted-foreground"></span>
            <div className="flex items-center justify-center py-20">
              <HeroActions />
            </div>
            <ScrollHint />
          </div>
        </section>

        {/* 아래부터는 스크롤 내려야 보이도록 */}
        <div className="flex flex-col items-center gap-24 pb-20">
          {/* About Me */}
          <About />

          {/* Activities & History */}
          <ActivitiesSection />

          {/* Projects */}
          <ProjectsSection />

          {/* Study */}
          <section id="study" className="w-full space-y-6">
            <div className="flex items-center justify-center">
              <h2 className="mb-8 border-b-2 border-primary pb-1 text-2xl font-semibold tracking-tight">
                Studies
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {STUDIES.map((study) => (
                <div
                  key={study.title}
                  className="rounded-xl border bg-card/60 p-4 text-sm shadow-sm"
                >
                  <h3 className="text-sm font-semibold">{study.title}</h3>
                  {'period' in study && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {study.period}
                    </p>
                  )}
                  <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                    {Array.isArray(study.description) ? (
                      study.description.map((line: string) => (
                        <p key={line}>{line}</p>
                      ))
                    ) : (
                      <p>{study.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-4 w-full border-t pt-6 text-xs text-muted-foreground">
            <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
              <span>
                © {new Date().getFullYear()} Junyoung Lee. All rights reserved.
              </span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
