import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function ContactPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('contact');

  return (
    <main>
      {/* Contact Hero */}
      <section style={{
        minHeight: '60vh',
        backgroundColor: 'var(--bg-deep-blue)',
        color: 'var(--text-light)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 'var(--header-height)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            lineHeight: 1.1,
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            {t('heroTitle')} <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>{t('heroTitleAccent')}</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '600px', opacity: 0.9 }}>
            {t('heroSubtitle')}
          </p>
        </div>
        
        {/* Background Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url("https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          mixBlendMode: 'overlay',
          zIndex: 1
        }} />
      </section>

      {/* Form Section */}
      <section className="container">
        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}
