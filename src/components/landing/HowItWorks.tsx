'use client';

import { motion } from 'framer-motion';

const COLORS = {
  primary: '#a089df',
  darkBg2: '#15122e',
};

const stepsData = [
  { step: '01', title: 'Create Account', description: 'Sign up in clicks.' },
  { step: '02', title: 'AI Analysis', description: 'We evaluate you.' },
  { step: '03', title: 'Follow Plan', description: 'Access training.' },
  { step: '04', title: 'Progress', description: 'Find your job.' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6" style={{ background: COLORS.darkBg2 }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">A Simple Journey, Guided by AI</h2>
          <p className="text-slate-400 text-lg">In a few steps, access personalized support.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {stepsData.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center p-6"
            >
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center mb-4" 
                style={{ background: `${COLORS.primary}15` }}
              >
                <span className="text-2xl font-bold" style={{ color: COLORS.primary }}>{s.step}</span>
              </div>
              <div className="pt-20">
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}