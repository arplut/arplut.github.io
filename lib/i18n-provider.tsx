'use client';

import { ReactNode, useEffect } from 'react';
// Import initialized i18n instance
import i18n from '@/lib/i18n';
import { I18nextProvider } from 'react-i18next';

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  // Wrap children with I18nextProvider to provide the i18n instance
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}