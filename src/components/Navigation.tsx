import React from 'react';
import { Shield, MessageCircle } from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  setTab: (tab: string) => void;
  // Included to keep prop-interface compatibility with parent App.tsx
  onOpenPortal?: (caseId: string, passcode: string) => void;
  isPortalActive?: boolean;
  onLogout?: () => void;
}

export default function Navigation({ currentTab, setTab }: NavigationProps) {
  const menuItems = [
    { id: 'home', label: 'Overview' },
    { id: 'services', label: 'Services' },
    { id: 'cases', label: 'Case Studies' },
    { id: 'news', label: 'News Center' },
    { id: 'blog', label: 'Forensic Blog' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <>
      <nav id="nav-header" className="sticky top-0 z-40 w-full border-b border-gold/20 bg-navy/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setTab('home')} 
            className="flex cursor-pointer items-center space-x-2.5 transition hover:opacity-90"
            id="nav-logo"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-sm border border-gold/40 bg-[#0A192F] shadow-[0_0_10px_rgba(212,175,55,0.15)]">
              <Shield className="h-5 w-5 text-gold" />
              <div className="absolute inset-0 rounded-sm bg-gold/5 animate-pulse-slow"></div>
            </div>
            <div>
              <span className="font-display text-base font-extrabold tracking-widest text-[#FFFFFF] uppercase">
                TROJAN<span className="text-gold font-normal">RECOVERY</span>
              </span>
              <p className="hidden text-[8.5px] font-mono tracking-widest text-[#D4AF37]/75 sm:block uppercase">Digital Forensic Intelligence</p>
            </div>
          </div>

          {/* Desktop Sitemap Menu - Simple & Workable (Not crowded) */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => setTab(item.id)}
                className={`px-3.5 py-1.5 rounded-sm font-display text-[11px] font-bold tracking-widest transition uppercase ${
                  currentTab === item.id 
                    ? 'text-gold bg-white/5 border border-gold/30' 
                    : 'text-navy-slate/90 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* No secondary live chat buttons here - consolidated into news-view */}
          
        </div>

        {/* Mobile Navigation - Compact Workable Subnav */}
        <div className="flex lg:hidden overflow-x-auto border-t border-gold/5 bg-navy-light/40 px-4 py-2.5 scrollbar-none">
          <div className="flex space-x-2 pr-4">
            {menuItems.map((item) => (
              <button
                key={item.id + '_mobile'}
                id={`nav-link-mobile-${item.id}`}
                onClick={() => setTab(item.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded font-display text-[10px] font-bold tracking-widest transition uppercase ${
                  currentTab === item.id 
                    ? 'text-gold bg-gold/10' 
                    : 'text-navy-slate hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
