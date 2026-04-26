'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, User, LifeBuoy, HelpCircle } from 'lucide-react';

const COLORS = {
  primary: '#a089df',
  darkBg: '#181136',
};

const contactInfo = [
  { icon: MapPin, text: 'Antananarivo, 101, Madagascar' },
  { icon: Phone, text: '+261 34 49 000 00' },
  { icon: Mail, text: 'hello@hacker.app' },
];

const helpLinks = [
  { icon: User, label: 'Manage my account' },
  { icon: LifeBuoy, label: 'Assistance' },
  { icon: HelpCircle, label: 'FAQs' },
];

interface ContactProps {
  lang: 'en' | 'fr';
}

const translations = {
  en: {
    contactTitle: 'Contact Us', contactSubtitle: "We'd love to hear from you!",
    namePlaceholder: 'Name', messagePlaceholder: 'Message', send: 'Send',
    needHelp: 'Need help?',
    newsletterTitle: 'Newsletter', newsletterSubtitle: 'Sign up for our newsletter to get the latest updates.',
    subscribe: 'Subscribe'
  },
  fr: {
    contactTitle: 'Contactez-nous', contactSubtitle: 'Nous attendons votre message!',
    namePlaceholder: 'Nom', messagePlaceholder: 'Message', send: 'Envoyer',
    needHelp: 'Besoin d\'aide?',
    newsletterTitle: 'Newsletter', newsletterSubtitle: 'Inscrivez-vous pour recevoir les dernières nouvelles.',
    subscribe: 'S\'abonner'
  }
};

export function Contact({ lang }: ContactProps) {
  const t = translations[lang];

  return (
    <section id="contact" className="py-32 px-6" style={{ background: COLORS.darkBg }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">{t.contactTitle}</h2>
            <p className="text-slate-400 mb-8">{t.contactSubtitle}</p>
            
            <div className="space-y-4">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <Icon className="w-5 h-5" style={{ color: COLORS.primary }} />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-4"
          >
            <input 
              type="text" 
              placeholder={t.namePlaceholder} 
              className="input-dark rounded-xl px-4 py-3.5 transition-all duration-200 focus:border-primary" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="input-dark rounded-xl px-4 py-3.5 transition-all duration-200 focus:border-primary" 
            />
            <textarea 
              placeholder={t.messagePlaceholder} 
              rows={4} 
              className="input-dark rounded-xl px-4 py-3.5 resize-none transition-all duration-200 focus:border-primary" 
            />
            <button 
              type="submit" 
              className="btn-gradient py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.send}
            </button>
          </motion.form>
        </div>

        {/* Need help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">{t.needHelp}</h3>
          <div className="flex flex-wrap gap-4">
            {helpLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <a 
                  key={i}
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="w-5 h-5" style={{ color: COLORS.primary }} />
            <h3 className="text-lg font-semibold text-white">{t.newsletterTitle}</h3>
          </div>
          <p className="text-slate-400 text-sm text-center mb-4">{t.newsletterSubtitle}</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Email" 
              className="input-dark flex-1 rounded-xl px-4 py-3 transition-all duration-200 focus:border-primary" 
            />
            <button 
              type="submit" 
              className="btn-gradient px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {t.subscribe}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MailComponent(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}