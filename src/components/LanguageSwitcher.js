'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function LanguageSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageChange = () => {
    const nextLocale = locale === 'en' ? 'tr' : 'en';
    router.replace(
      // @ts-expect-error -- TypeScript will complain about dynamic params, but it's fine for our use case
      { pathname, params },
      { locale: nextLocale }
    );
  };

  return (
    <button 
      onClick={handleLanguageChange}
      style={{
        background: 'transparent',
        border: '1px solid currentColor',
        color: 'inherit',
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
      }}
    >
      {locale === 'en' ? 'TR' : 'EN'}
    </button>
  );
}
