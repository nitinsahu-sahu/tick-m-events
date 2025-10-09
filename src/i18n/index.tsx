import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define the type for our translations
interface TranslationKeys {
  home: string;
  events: string;
  blog: string;
  b2bMarketplace: string;
  about: string;
  contact: string;
  signIn: string;
  aboutUs: string;
  sellYourEvent: string;
  advertiseYourEvent: string;
  contactUs: string;
  languages: {
    EN: string;
    FR: string;
  };
}

// Translation resources with proper i18next structure
const resources = {
  en: {
    translation: {
      home: "Home",
      events: "Events",
      blog: "Blog",
      b2bMarketplace: "B2B Marketplace",
      about: "About",
      contact: "Contact",
      signIn: "Sign in",
      aboutUs: "About Us",
      sellYourEvent: "Sell Your Event",
      advertiseYourEvent: "Advertise Your Event",
      contactUs: "Contact Us",
      languages: {
        EN: "English",
        FR: "French"
      },
      oa: 'Office Address',
      pn: "Phone number",
      cu: "Contact Us",
      submit: "Submit",
      submitting: "Submitting",
      contact_txt: "Great vision without great people is irrelevant. Let’s work together.",
      address_1: "Douala - Nyalla Cobblestone Street,",
      address_2: "before the ZZ Hotel.",
      homeBanner_t1: "Organize. Book. Save time. TICK-M EVENTS is revolutionizing events in Africa",
      homeBanner_t2: "A single platform to manage your events, sell your tickets, find quality service providers and live unforgettable experiences."
    }
  },
  fr: {
    translation: {
      home: "Accueil",
      events: "Événements",
      blog: "Blog",
      b2bMarketplace: "Place de marché B2B",
      about: "À propos",
      contact: "Contact",
      signIn: "Se connecter",
      aboutUs: "À propos de nous",
      sellYourEvent: "Vendez votre événement",
      advertiseYourEvent: "Annoncez votre événement",
      contactUs: "Contactez-nous",
      languages: {
        EN: "Anglais",
        FR: "Français"
      },
      submit: "Soumettre",
      submitting: "Soumission",
      contact_txt: "Une grande vision sans des personnes exceptionnelles est inutile. Travaillons ensemble.",
      cu: "Contactez-nous",
      oa: "Adresse du bureau",
      pn: "Numéro de téléphone",
      address_1: "Douala - Rue des pavés Nyalla,",
      address_2: "avant l'hôtel ZZ.",
      homeBanner_t1: "Organisez. Réservez. Gagnez du temps. TICK-M EVENTS révolutionne l'événementiel en Afrique.",
      homeBanner_t2: "Une plateforme unique pour gérer vos événements, vendre vos billets, trouver des prestataires de qualité et vivre des expériences inoubliables."

    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;