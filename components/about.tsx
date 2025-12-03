'use client';

import { motion, type Variants } from 'motion/react';

import { INTRO, STACKS } from '@/data/data';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
  },
};

export function About() {
  const github = INTRO.links[0];

  return (
    <section id="intro" className="">
      <div className="flex justify-center items-center">
        <h2 className="text-2xl font-semibold tracking-tight border-b-2 border-primary pb-1 mb-8">
          About Me
        </h2>
      </div>

      <div className="grid items-start gap-10 grid-cols-1 sm:grid-cols-2">
        <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="text-2xl font-semibold tracking-tight">
            반갑습니다. 👋
          </span>
          <motion.div
            variants={itemVariants}
            className="space-y-4 text-base leading-relaxed text-muted-foreground"
          >
            {INTRO.description.map((description) => (
              <p key={description}>{description}</p>
            ))}
          </motion.div>
        </motion.div>
        <div className="">
          <span className="text-2xl font-semibold tracking-tight mb-4 block">
            Tech Stack
          </span>
          <div>
            {STACKS.map((stack) => (
              <div key={stack.category} className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm text-muted-foreground border rounded-md p-2 bg-white text-center"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
