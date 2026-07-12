import React, { useEffect, useRef } from 'react';

export default function TrustBox() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Access the Trustpilot script object from window
    const tp = (window as any).Trustpilot;
    if (tp && widgetRef.current) {
      try {
        tp.loadFromElement(widgetRef.current);
      } catch (err) {
        console.warn('Trustpilot widget initialization failed:', err);
      }
    }
  }, []);

  return (
    <div className="trustpilot-widget-wrapper w-full max-w-md mx-auto py-2">
      {/* TrustBox widget - Review Collector */}
      <div 
        ref={widgetRef}
        className="trustpilot-widget mx-auto" 
        data-locale="en-US" 
        data-template-id="56278e9abfbbba0bdcd568bc" 
        data-businessunit-id="6a53dacc655ecf2ffd159020" 
        data-style-height="52px" 
        data-style-width="100%" 
        data-token="364d48fb-fd04-45e7-9d73-9b4bb5d4a4d8"
      >
        <a 
          href="https://www.trustpilot.com/review/trojanrecovery.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gold hover:underline font-mono text-[10px] uppercase tracking-wider block text-center"
        >
          Trustpilot
        </a>
      </div>
      {/* End TrustBox widget */}
    </div>
  );
}
