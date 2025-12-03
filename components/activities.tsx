'use client';

import { motion, type Variants } from 'motion/react';

import { ACTIVITIES } from '@/data/data';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ActivitiesSection() {
  return (
    <section id="activities" className="w-full space-y-6">
      <div className="flex justify-center items-center">
        <h2 className="text-2xl font-semibold tracking-tight border-b-2 border-primary pb-1 mb-8">
          Activities
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {ACTIVITIES.map((activity) => (
          <motion.div
            key={activity.title + activity.period}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-3 gap-4 rounded-xl border bg-card/60 p-4 text-sm shadow-sm sm:grid-cols-3 sm:rounded-none sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none"
          >
            <div className="col-span-1 flex flex-col justify-start items-start gap-2 sm:items-end">
              <h3 className="text-sm font-semibold text-foreground">
                {activity.title}
              </h3>
              <span className="text-[11px] text-muted-foreground text-left sm:text-right">
                {activity.period}
              </span>
            </div>
            <div className="col-span-2 flex flex-col justify-start items-start gap-1">
              {activity.content && (
                <p className="mt-1 text-xs font-medium text-primary">
                  {activity.content}
                </p>
              )}
              {Array.isArray(activity.description) &&
                activity.description.length > 0 && (
                  <div className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
                    {activity.description.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
