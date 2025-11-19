import { useLanguage } from '../contexts/LanguageContext';

/**
 * Custom hook for translations with additional utilities
 * Provides enhanced translation functionality beyond basic context
 */
export const useTranslation = () => {
  const { currentLanguage, t: contextT, isRTL, setCurrentLanguage, supportedLanguages } = useLanguage();

  // Enhanced translation function with fallbacks and interpolation
  const t = (key, options = {}) => {
    const { 
      defaultText, 
      interpolations = {}, 
      count,
      fallbackLanguage = 'en' 
    } = options;

    // Handle pluralization for count-based translations
    if (count !== undefined) {
      const pluralKey = count === 1 ? `${key}.singular` : `${key}.plural`;
      const pluralText = contextT(pluralKey, defaultText);
      
      if (pluralText !== pluralKey) {
        return formatWithInterpolations(pluralText, { ...interpolations, count });
      }
    }

    // Get base translation
    let translation = contextT(key, defaultText);
    
    // If translation not found and we're not on fallback language, try fallback
    if (translation === key && currentLanguage !== fallbackLanguage) {
      try {
        const fallbackTranslations = require(`../translations/${fallbackLanguage}.json`);
        const keys = key?.split('.');
        let value = fallbackTranslations;
        
        for (const k of keys) {
          value = value?.[k];
          if (value === undefined) break;
        }
        
        if (value) {
          translation = value;
        }
      } catch (error) {
        console.warn(`Fallback translation not found for key: ${key}`);
      }
    }

    return formatWithInterpolations(translation, interpolations);
  };

  // Format string with interpolations
  const formatWithInterpolations = (text, interpolations) => {
    if (!interpolations || typeof text !== 'string') return text;
    
    return Object.keys(interpolations)?.reduce((result, key) => {
      const regex = new RegExp(`{${key}}`, 'g');
      return result?.replace(regex, interpolations?.[key]);
    }, text);
  };

  // Get translation for current language with namespace support
  const tNS = (namespace, key, options = {}) => {
    return t(`${namespace}.${key}`, options);
  };

  // Get formatted date based on current language
  const formatDate = (date, options = {}) => {
    try {
      const locale = getLocaleFromLanguage(currentLanguage);
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
      })?.format(new Date(date));
    } catch (error) {
      return new Date(date)?.toLocaleDateString();
    }
  };

  // Get formatted number based on current language
  const formatNumber = (number, options = {}) => {
    try {
      const locale = getLocaleFromLanguage(currentLanguage);
      return new Intl.NumberFormat(locale, options)?.format(number);
    } catch (error) {
      return number?.toString();
    }
  };

  // Get formatted currency based on current language
  const formatCurrency = (amount, currency = 'USD', options = {}) => {
    try {
      const locale = getLocaleFromLanguage(currentLanguage);
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        ...options
      })?.format(amount);
    } catch (error) {
      return `${currency} ${amount}`;
    }
  };

  // Helper function to get locale from language code
  const getLocaleFromLanguage = (lang) => {
    const localeMap = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'zh': 'zh-CN',
      'ar': 'ar-SA',
      'pt': 'pt-PT',
      'ru': 'ru-RU'
    };
    return localeMap?.[lang] || 'en-US';
  };

  // Check if a translation exists
  const hasTranslation = (key) => {
    let translation = contextT(key, key);
    return translation !== key;
  };

  // Get language direction class helper
  const getDirectionClass = (baseClass = '') => {
    return isRTL ? `${baseClass} rtl` : `${baseClass} ltr`;
  };

  return {
    t,
    tNS,
    currentLanguage,
    setCurrentLanguage,
    supportedLanguages,
    isRTL,
    formatDate,
    formatNumber,
    formatCurrency,
    hasTranslation,
    getDirectionClass,
    getLocaleFromLanguage
  };
};

export default useTranslation;