// components/TranslateWidget.tsx
import { useEffect, useRef } from 'react';

// Extend Window interface to include Google Translate properties
declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: {
          new(options: TranslateOptions, element: string): void;
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

        // Add styles to hide unwanted elements
        addHideStyles();

      } catch (error) {
        console.error('Error initializing translate widget:', error);
      }
    };

    const addHideStyles = () => {
      // Create style element to hide Google Translate elements
      const style = document.createElement('style');
      style.textContent = `
        /* Hide the Google Translate toolbar at the top */
        .goog-te-banner-frame {
          display: none !important;
        }
        
        .VIpgJd-ZVi9od-ORHb-OEVmcd{
         display: none !important;
        }

        /* Hide the text selection popup (goog-gt-vt) */
        #goog-gt-vt {
          display: none !important;
        }
        
        /* Hide the translation hover popup */
        .goog-tooltip {
          display: none !important;
        }
        
        /* Hide the translation suggestion popup */
        .goog-te-balloon-frame {
          display: none !important;
        }
        
        /* Hide the Google attribution */
        .goog-logo-link {
          display: none !important;
        }
        
        .goog-te-gadget {
          color: transparent !important;
          font-size: 0 !important;
        }
        
        .goog-te-gadget .goog-te-combo {
          margin: 0 !important;
          padding: 4px 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: white;
          color: #333;
          font-size: 14px;
        }
        
        /* Remove any extra spacing or borders */
        .goog-te-gadget span {
          display: none !important;
        }
        
        /* Ensure body doesn't get pushed down by hidden banner */
        body {
          top: 0 !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Delay loading to ensure DOM is ready
    const timer = setTimeout(loadGoogleTranslate, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (window.googleTranslateInit) {
        delete window.googleTranslateInit;
      }
      // Remove any added styles
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.textContent?.includes('goog-te-banner-frame') ||
          style.textContent?.includes('goog-gt-vt')) {
          style.remove();
        }
      });
    };
  }, []);

  return (
    <div ref={translateRef} id="google_translate_element"></div>
  );
}
