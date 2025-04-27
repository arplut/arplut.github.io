'use client';

import { Button } from "@/components/ui/button";
import { useClientTranslation } from "@/lib/use-client-translation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const languageNames = {
  en: 'English',
  kn: 'ಕನ್ನಡ'
};

export function LanguageSwitcher() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('en');
  const { refreshTranslations } = useClientTranslation();

  useEffect(() => {
    // Get language from localStorage or set default
    const savedLang = typeof window !== 'undefined' 
      ? localStorage.getItem('language') || 'en'
      : 'en';
    setCurrentLang(savedLang);
  }, []);

  const switchLanguage = async (lang: string) => {
    localStorage.setItem('language', lang);
    setCurrentLang(lang);
    // Refresh translations
    await refreshTranslations();
    // Refresh the page to apply language change
    router.refresh();
  };

  return (
    <div className="flex space-x-2">
      {Object.keys(languageNames).map((lang) => (
        <Button
          key={lang}
          variant={currentLang === lang ? "default" : "outline"}
          size="sm"
          onClick={() => switchLanguage(lang)}
          className="text-xs"
        >
          {languageNames[lang as keyof typeof languageNames]}
        </Button>
      ))}
    </div>
  );
}