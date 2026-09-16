import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationKey } from "../data/translations";

export type Language = "id" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKey | string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "alzanaditya_lang";

/**
 * Sensor to detect if the user is from Indonesia
 * Checks:
 * 1. Timezone (Asia/Jakarta, Asia/Makassar, Asia/Jayapura, Asia/Pontianak)
 * 2. Navigator languages / user locale (id, id-ID)
 */
function detectIsIndonesian(): boolean {
  try {
    // Check timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (
      timeZone &&
      (timeZone.includes("Jakarta") ||
        timeZone.includes("Makassar") ||
        timeZone.includes("Jayapura") ||
        timeZone.includes("Pontianak") ||
        timeZone.includes("Indonesia"))
    ) {
      return true;
    }

    // Check browser language
    if (typeof navigator !== "undefined") {
      const browserLangs = navigator.languages || [navigator.language];
      for (const l of browserLangs) {
        if (l.toLowerCase().startsWith("id")) {
          return true;
        }
      }
    }
  } catch (err) {
    console.error("Language detection error:", err);
  }
  return false;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Language>(() => {
    // 1. Check localStorage first
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "id" || saved === "en") {
        return saved;
      }
      // 2. Auto-detect Indonesian user
      if (detectIsIndonesian()) {
        return "id";
      }
    }
    // 3. Fallback to English for international users
    return "en";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch (e) {
      console.error(e);
    }
  };

  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (key: TranslationKey | string, fallback?: string): string => {
    const dict = translations[lang] as Record<string, string>;
    if (dict && dict[key]) {
      return dict[key];
    }
    const enDict = translations.en as Record<string, string>;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
