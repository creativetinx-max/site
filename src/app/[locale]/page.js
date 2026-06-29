import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Marquee from '@/components/Marquee';
import Philosophy from '@/components/Philosophy';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

export default function HomePage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('hero');

  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Marquee />
      <Philosophy />
      <ContactCTA />
      <Footer />
    </main>
  );
}
