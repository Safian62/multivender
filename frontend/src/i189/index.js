import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./en.json";
import translationUR from "./ur.json";
import translationAr from './ar.json'

const resources = {
  en: {
    translation: translationEN
  },
  ur: {
    translation: translationUR
  },
  ar:{
    translation: translationAr
  }
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false
    }
  });
try {
  if (typeof window !== "undefined") {
    const pathSeg = window.location.pathname.split("/").filter(Boolean)[0];
    if (pathSeg && Object.keys(resources).includes(pathSeg)) {
      i18n.changeLanguage(pathSeg);
    }
  }
} catch (e) {
  // ignore in non-browser environments
}

export default i18n;
