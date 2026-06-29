'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.infoBlock}>
          <span className={styles.infoTitle}>{t('info.email')}</span>
          <a href={`mailto:hello@tinxcreative.com`} className={styles.infoText}>
            hello@tinxcreative.com
          </a>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.infoTitle}>{t('info.phone')}</span>
          <a href={`tel:+905551234567`} className={styles.infoText}>
            +90 555 123 4567
          </a>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.infoTitle}>{t('info.location')}</span>
          <span className={styles.infoText}>Istanbul, Turkey</span>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.infoTitle}>{t('info.social')}</span>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
            <a href="#" style={{ fontSize: '1.125rem' }}>Instagram</a>
            <a href="#" style={{ fontSize: '1.125rem' }}>Vimeo</a>
            <a href="#" style={{ fontSize: '1.125rem' }}>Behance</a>
          </div>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input type="text" className={styles.input} placeholder={t('form.name')} required />
        </div>
        <div className={styles.formGroup}>
          <input type="email" className={styles.input} placeholder={t('form.email')} required />
        </div>
        
        <div className={styles.formGroup}>
          <span style={{ marginBottom: '0.5rem', fontWeight: 500, opacity: 0.8 }}>
            {t('form.services')}
          </span>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} />
              {t('form.product')}
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} />
              {t('form.location')}
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} />
              {t('form.web')}
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} />
              {t('form.content')}
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <textarea className={styles.input} placeholder={t('form.message')} required></textarea>
        </div>

        <button type="submit" className={`button ${styles.submitBtn}`} disabled={status === 'sending'}>
          {status === 'sending' ? t('form.sending') : t('form.send')}
        </button>

        {status === 'success' && (
          <p style={{ color: 'green', marginTop: '1rem' }}>{t('form.success')}</p>
        )}
      </form>
    </div>
  );
}
