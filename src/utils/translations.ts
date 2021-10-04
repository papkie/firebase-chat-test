import { config } from "../config/app";

const isLanguageSupported = (
  language: string | null
): language is keyof typeof config.languages =>
  language ? Object.keys(config.languages).includes(language) : false;

export const getCurrentLocale = () => {
  return navigator.language;
};

export const getTranslationsForCurrentLanguage = () => {
  const currentLanguage =
    localStorage.getItem("currentLanguage") || navigator.language;
  if (isLanguageSupported(currentLanguage)) {
    return config.languages[currentLanguage];
  }
  return config.languages.fallback;
};
