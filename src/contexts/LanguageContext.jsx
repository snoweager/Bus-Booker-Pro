import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [currentLanguage, setCurrentLanguageState] = useState(defaultLanguage);

  // Define supported languages
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'zh', 'ar', 'pt', 'ru'];
  const rtlLanguages = ['ar', 'he', 'fa'];

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && supportedLanguages?.includes(savedLanguage)) {
      setCurrentLanguageState(savedLanguage);
    }
  }, []);

  // Listen for custom language change events
  useEffect(() => {
    const handleLanguageChange = (event) => {
      const newLanguage = event?.detail?.language;
      if (newLanguage && supportedLanguages?.includes(newLanguage)) {
        setCurrentLanguageState(newLanguage);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Update document attributes when language changes
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = rtlLanguages?.includes(currentLanguage) ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  // Set current language and persist preference
  const setCurrentLanguage = (language) => {
    if (supportedLanguages?.includes(language)) {
      setCurrentLanguageState(language);
      localStorage.setItem('preferredLanguage', language);
      
      // Dispatch custom event for components listening
      const event = new CustomEvent('languageChange', { 
        detail: { language } 
      });
      window.dispatchEvent(event);
    }
  };

  // Translation function - uses translation files
  const t = (key, defaultText, interpolations = {}) => {
    try {
      // Import translations dynamically
      const translations = require(`../translations/${currentLanguage}.json`);
      
      // Support nested keys like "navigation.home"
      const keys = key?.split('.');
      let value = translations;
      
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
      
      // Return translated text or fallback
      let result = value || defaultText || key;
      
      // Handle interpolations like "Hello {name}"
      if (interpolations && typeof result === 'string') {
        Object.keys(interpolations)?.forEach(interpKey => {
          result = result?.replace(`{${interpKey}}`, interpolations?.[interpKey]);
        });
      }
      
      return result;
    } catch (error) {
      console.warn(`Translation not found for language: ${currentLanguage}`, error);
      return defaultText || key;
    }
  };

  const isRTL = rtlLanguages?.includes(currentLanguage);

  const contextValue = {
    currentLanguage,
    setCurrentLanguage,
    t,
    isRTL,
    supportedLanguages
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;