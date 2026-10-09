import React from 'react';
import { getDictionary } from '../../lib/dictionaries';
import { Locale } from '../../i18n.config';
import Header from '../../features/landing/components/Header';
import UrgencyRibbon from '../../features/landing/components/UrgencyRibbon';
import Hero from '../../features/landing/components/Hero';
import ManifestoTicker from '../../features/landing/components/ManifestoTicker';
import MindsetQuote from '../../features/landing/components/MindsetQuote';
import Pillars from '../../features/landing/components/Pillars';
import Mentor from '../../features/landing/components/Mentor';
import Testimonials from '../../features/landing/components/Testimonials';
import Pricing from '../../features/landing/components/Pricing';
import FAQ from '../../features/landing/components/FAQ';
import Footer from '../../features/landing/components/Footer';
import ScrollRevealLoader from '../../features/landing/components/ScrollRevealLoader';

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <ScrollRevealLoader>
      <Header dict={dict.header} lang={lang} />
      <main className="w-full pt-28 bg-carbon-void relative min-h-screen">
        <div className="flex flex-col w-full text-on-surface">
          <UrgencyRibbon dict={dict.urgencyRibbon} />
          <Hero dict={dict.hero} />
          <ManifestoTicker dict={dict.manifesto} />
          <MindsetQuote />
          <Pillars />
          <Mentor />
          <Testimonials />
          <Pricing />
          <FAQ />
        </div>
      </main>
      <Footer />
    </ScrollRevealLoader>
  );
}
