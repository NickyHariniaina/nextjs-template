'use client';

import { useState } from 'react';
import { Header, Hero, Features, HowItWorks, AICards, Contact, Footer } from '@/components/landing';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  const handleLangChange = () => {
    setLang(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <div className="min-h-screen">
      <Header lang={lang} onLangChange={handleLangChange} />
      <Hero lang={lang} />
      <Features lang={lang} />
      <HowItWorks lang={lang} />
      <AICards lang={lang} />
      <Contact lang={lang} />
      <Footer />
    </div>
  );
}