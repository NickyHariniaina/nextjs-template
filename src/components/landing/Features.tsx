'use client';

import { motion } from 'framer-motion';
import { FileText, Video, Users, Code } from 'lucide-react';

const COLORS = {
  primary: '#a089df',
  darkBg: '#181136',
  darkBg2: '#1a1a4e',
};

const featuresData = [
  { icon: FileText, title: 'CV Analysis', description: 'Optimize your CV with our AI-powered analysis tool.' },
  { icon: Video, title: 'Interview Simulation', description: 'Practice with realistic interview scenarios.' },
  { icon: Users, title: 'Soft Skills', description: 'Develop leadership and communication.' },
  { icon: Code, title: 'Hard Skills', description: 'Strengthen technical skills.' },
];

interface FeaturesProps {
  lang: 'en' | 'fr';
}

const translations = {
  en: { title: 'Boost your career', subtitle: "Here's how we help you prepare for your dream job." },
  fr: { title: 'Boostez votre carrière', subtitle: 'Voici comment nous vous aidons.' },
};

export function Features({ lang }: FeaturesProps) {
  const t = translations[lang];

  return (
    <section id="features" className="py-32 px-6" style={{ background: COLORS.darkBg }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl cursor-pointer transition-all duration-300"
                style={{ 
                  background: COLORS.darkBg2, 
                  border: `1px solid ${COLORS.primary}20`,
                  boxShadow: '0 4px 30px rgba(0,0,0,0.2)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" 
                  style={{ background: `${COLORS.primary}20`, color: COLORS.primary }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}