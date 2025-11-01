// components/TranslateWidget.tsx
import { useEffect, useRef } from 'react';

// Extend Window interface to include Google Translate properties
declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: {
          new (options: TranslateOptions, element: string): void;
          InlineLayout: {
            SIMPLE: number;
            HORIZONTAL: number;
            VERTICAL: number;
          };
        };
      };
    };
    googleTranslateInit?: () => void;
  }
}

interface TranslateOptions {
  pageLanguage: string;
  includedLanguages: string;
  layout: number;
  autoDisplay: boolean;
  multilanguagePage: boolean;
}

export function TranslateWidget() {
  const translateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const loadGoogleTranslate = () => {
      // Check if already initialized
      if (window.google && window.google.translate) {
        initializeWidget();
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit';
      script.async = true;

      // Global callback
      window.googleTranslateInit = () => {
        if (isMounted) {
          initializeWidget();
        }
      };

      script.onerror = () => {
        console.error('Failed to load Google Translate');
        if (isMounted && translateRef.current) {
          translateRef.current.innerHTML = 'Translation unavailable';
        }
      };

      document.head.appendChild(script);
    };

    const initializeWidget = () => {
      if (!isMounted || !window.google?.translate) return;

      try {
        // Clear previous instance
        if (translateRef.current) {
          translateRef.current.innerHTML = '';
        }

        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,fr',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element');

        console.log('Translate widget ready');
      } catch (error) {
        console.error('Error initializing translate widget:', error);
      }
    };

    // Delay loading to ensure DOM is ready
    const timer = setTimeout(loadGoogleTranslate, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (window.googleTranslateInit) {
        delete window.googleTranslateInit;
      }
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 1000,
      background: 'white',
      padding: '5px',
      borderRadius: '4px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div ref={translateRef} id="google_translate_element"></div>
    </div>
  );
}