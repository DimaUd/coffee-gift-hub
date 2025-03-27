
import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = {
  code: string;
  name: string;
  isRTL: boolean;
};

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', isRTL: false },
  { code: 'he', name: 'עברית', isRTL: true },
  { code: 'ru', name: 'Русский', isRTL: false },
];

type LanguageContextType = {
  currentLanguage: Language;
  setLanguageByCode: (code: string) => void;
  translate: (key: string) => string;
};

const defaultLanguage = LANGUAGES[0];

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: defaultLanguage,
  setLanguageByCode: () => {},
  translate: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    // Auto-detect browser language on first load
    const detectBrowserLanguage = () => {
      const savedLang = localStorage.getItem('preferredLanguage');
      
      if (savedLang) {
        const lang = LANGUAGES.find(l => l.code === savedLang);
        if (lang) {
          setCurrentLanguage(lang);
          return;
        }
      }
      
      const browserLang = navigator.language.split('-')[0];
      const matchedLang = LANGUAGES.find(l => l.code === browserLang);
      
      if (matchedLang) {
        setCurrentLanguage(matchedLang);
        localStorage.setItem('preferredLanguage', matchedLang.code);
      }
    };

    detectBrowserLanguage();
    loadTranslations(currentLanguage.code);
  }, []);

  useEffect(() => {
    // Update document direction for RTL languages
    document.documentElement.dir = currentLanguage.isRTL ? 'rtl' : 'ltr';
    
    // Load translations when language changes
    loadTranslations(currentLanguage.code);
    
    // Save preference
    localStorage.setItem('preferredLanguage', currentLanguage.code);
  }, [currentLanguage]);

  const loadTranslations = async (langCode: string) => {
    try {
      if (langCode === 'en') {
        // English is the default language (no need to load translations)
        setTranslations({});
        return;
      }
      
      // In a real app, you would fetch translations from your backend or a static file
      // For now, we'll use a mock implementation
      console.log(`Loading translations for ${langCode}`);
      
      // Simulate loading translations (would be fetched from API in production)
      const mockTranslations = await simulateTranslationFetch(langCode);
      setTranslations(prev => ({
        ...prev,
        [langCode]: mockTranslations
      }));
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  };

  // This would be replaced with a real API call in production
  const simulateTranslationFetch = async (langCode: string): Promise<Record<string, string>> => {
    // Simulated response delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Mock translations for demonstration
    if (langCode === 'ru') {
      return {
        "Send a Coffee Gift": "Отправить кофе в подарок",
        "The Easiest Way to Send Coffee Gifts": "Самый простой способ отправить кофе в подарок",
        "Find Coffee Points": "Найти точки кофе",
        "Scan QR Gift": "Сканировать QR-подарок",
        "Login": "Войти",
        "Sign Up": "Зарегистрироваться",
        // Add more translations as needed
      };
    }
    
    if (langCode === 'he') {
      return {
        "Send a Coffee Gift": "שלח מתנת קפה",
        "The Easiest Way to Send Coffee Gifts": "הדרך הקלה ביותר לשלוח מתנות קפה",
        "Find Coffee Points": "מצא נקודות קפה",
        "Scan QR Gift": "סרוק מתנת QR",
        "Login": "התחברות",
        "Sign Up": "הרשמה",
        // Add more translations as needed
      };
    }
    
    return {};
  };

  // Function to translate text (fallback to original text if no translation found)
  const translate = (key: string): string => {
    if (currentLanguage.code === 'en') return key;
    
    const langTranslations = translations[currentLanguage.code];
    return langTranslations?.[key] || key;
  };

  const setLanguageByCode = (code: string) => {
    const newLang = LANGUAGES.find(l => l.code === code);
    if (newLang) {
      setCurrentLanguage(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguageByCode, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
