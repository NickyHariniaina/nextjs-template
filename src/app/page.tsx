'use client';

import { Header, Hero, Features, HowItWorks, AICards, Contact, Footer } from '@/components/landing';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <AICards />
      <Contact />
      <Footer />
    </div>
  );
}