import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import i18n from 'src/i18n';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lng: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

  // Stable changeLanguage function
  const changeLanguage = useCallback(async (lng: string): Promise<void> => {
    await i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem('preferred-language', lng);
  }, []); // Empty dependencies since we don't depend on any props or state

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      setCurrentLanguage(savedLanguage);
    }

    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []); // Empty dependencies for initial setup only

  // Memoized context value - only changes when currentLanguage changes
  const contextValue = useMemo((): LanguageContextType => ({
    currentLanguage,
    changeLanguage,
  }), [currentLanguage, changeLanguage]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};