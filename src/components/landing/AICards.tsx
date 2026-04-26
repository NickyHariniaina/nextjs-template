'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';

const COLORS = {
  primary: '#a089df',
  secondary: '#807be4',
  darkBg: '#181136',
  darkBg2: '#1a1a4e',
};

const aiCardsData = [
  { 
    num: '1', 
    icon: Sparkles, 
    title: 'Personalized Support', 
    description: 'AI tailors a plan to your goals.' 
  },
  { 
    num: '2', 
    icon: Zap, 
    title: 'Concrete Tools', 
    description: 'Everything integrated.' 
  },
  { 
    num: '3', 
    icon: TrendingUp, 
    title: 'Continuous Evolution', 
    description: 'Real-time updates.' 
  },
];

interface AICardsProps {
  lang: 'en' | 'fr';
}

const translations = {
  en: { 
    title: 'Artificial Intelligence for Your Future', 
    subtitle: 'Analysis, recommendations, evolution.' 
  },
  fr: { 
    title: 'IA pour votre avenir', 
    subtitle: 'Analyse, recommandations.' 
  },
};

export function AICards({ lang }: AICardsProps) {
  const t = translations[lang];

  return (
    <section 
      className="py-32 px-6" 
      style={{ 
        background: `linear-gradient(180deg, ${COLORS.darkBg} 0%, ${COLORS.secondary}10 100%)` 
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-slate-400">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {aiCardsData.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl cursor-pointer transition-all duration-300"
                style={{ 
                  background: COLORS.darkBg2, 
                  border: `1px solid ${COLORS.primary}20` 
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" 
                    style={{ background: `${COLORS.primary}20`, color: COLORS.primary }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-6xl font-bold" style={{ color: `${COLORS.primary}15` }}>{card.num}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-slate-400">{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}