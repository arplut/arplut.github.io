'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

export function useClientTranslation() {
  const { t, i18n: i18nInstance } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const refreshTranslations = async () => {
    const savedLanguage = localStorage.getItem("language") || "en";
    await i18nInstance.changeLanguage(savedLanguage);
  };

  return {
    t: mounted ? t : (key: string) => key,
    i18n: i18nInstance,
    refreshTranslations
  };
}