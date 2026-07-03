import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Search, 
  Download, 
  BookOpen, 
  HelpCircle, 
  Award, 
  Users, 
  Globe, 
  FileCheck,
  ChevronDown,
  ArrowUpRight,
  TrendingUp,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  KeyRound,
  MessageCircle,
  Share2,
  Check,
  Trash2,
  Plus,
  Eye
} from 'lucide-react';

import TrojanLogo from './components/TrojanLogo';
import Navigation from './components/Navigation';
import TestimonialCarousel from './components/TestimonialCarousel';
import { SERVICES } from './data/servicesData';
import { CASE_STUDIES, RESOURCES, FAQS, TESTIMONIALS, BLOG_POSTS } from './data/resourcesData';
import { NewsArticle, BlogPost } from './types';
import { motion } from 'motion/react';

// Simple Markdown parser for React to fix star and hash markdown formatting
const parseInlineMarkdown = (text: string): React.ReactNode[] => {
  if (!text) return [];
  // Parse bold code **text**
  const parts = text.split('**');
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i} className="font-extrabold text-white text-[12px]">{part}</strong>;
    }
    // Parse italic *text* inside normal parts
    const italicParts = part.split('*');
    if (italicParts.length > 1) {
      return (
        <span key={i}>
          {italicParts.map((subPart, j) => {
            if (j % 2 === 1) {
              return <em key={j} className="italic text-gold">{subPart}</em>;
            }
            return subPart;
          })}
        </span>
      );
    }
    return part;
  });
};

const renderMarkdownToReact = (text: string): React.ReactNode => {
  if (!text) return null;
  const lines = text.split('\n');
  
  return (
    <div className="space-y-4">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        // Render headings
        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={idx} className="font-display text-xs font-bold text-gold uppercase tracking-wider mt-5 mb-2.5">
              {parseInlineMarkdown(trimmed.slice(5))}
            </h4>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="font-display text-sm font-bold text-white uppercase tracking-normal mt-6 mb-3 border-b border-white/10 pb-1 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0"></span>
              <span>{parseInlineMarkdown(trimmed.slice(4))}</span>
            </h3>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="font-display text-base font-bold text-white uppercase tracking-normal mt-8 mb-4 border-b border-gold/20 pb-1.5">
              {parseInlineMarkdown(trimmed.slice(3))}
            </h2>
          );
        }
        
        // Work item lists (• or - or *)
        if (trimmed.startsWith('• ') || trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          let cleaned = trimmed;
          if (trimmed.startsWith('• ')) cleaned = trimmed.slice(2);
          else if (trimmed.startsWith('•')) cleaned = trimmed.slice(1);
          else if (trimmed.startsWith('- ')) cleaned = trimmed.slice(2);
          else if (trimmed.startsWith('* ')) cleaned = trimmed.slice(2);
          
          return (
            <div key={idx} className="flex items-start space-x-2.5 pl-4 py-0.5">
              <span className="text-gold text-[10px] mt-1 shrink-0 select-none">◼</span>
              <span className="text-navy-slate text-xs leading-relaxed font-sans">
                {parseInlineMarkdown(cleaned)}
              </span>
            </div>
          );
        }

        // Ordered list indexes (1.)
        const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start space-x-3 pl-4 py-1 bg-navy-light/10 border-l-2 border-gold/30 my-2 rounded-r">
              <span className="font-mono text-[10px] font-bold text-gold shrink-0 bg-navy-light/40 px-1.5 py-0.5 rounded">{numMatch[1]}</span>
              <span className="text-navy-slate text-xs leading-relaxed font-sans">
                {parseInlineMarkdown(numMatch[2])}
              </span>
            </div>
          );
        }

        if (trimmed === '') {
          return <div key={idx} className="h-2" />;
        }

        // Regular Paragraph
        return (
          <p key={idx} className="text-navy-slate text-xs leading-relaxed font-sans font-normal mb-3">
            {parseInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
};

// Assign premium illustration images dynamically based on category
const getBlogImageForCategory = (category: string, idx: number): string => {
  const images = [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1642156814441-df792fa023a2?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600"
  ];
  return images[idx % images.length];
};

export default function App() {
  const [currentTab, setTab] = useState('home');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState<string | null>(null);

  // Scroll to top on page navigation or sub-page select
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentTab, selectedNewsId, selectedBlogId, selectedServiceId]);

  const handleShare = (id: string, type: 'news' | 'blog') => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?type=${type}&id=${id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setShareCopied(id);
        setTimeout(() => setShareCopied(null), 2500);
      })
      .catch(() => {
        // Fallback copy mechanism
        const el = document.createElement('textarea');
        el.value = shareUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setShareCopied(id);
        setTimeout(() => setShareCopied(null), 2500);
      });
  };

  // News states (fetched from full-stack server endpoint /api/news)
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsCategory, setNewsCategory] = useState('All');
  const [newsSearch, setNewsSearch] = useState('');
  const [newsStatus, setNewsStatus] = useState('');

  // Blog states
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [adminBlogsList, setAdminBlogsList] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [blogCategory, setBlogCategory] = useState('All');
  const [blogSearch, setBlogSearch] = useState('');



  // Fallback news generator for static deployments
  const getDynamicFallbackNews = (): NewsArticle[] => {
    const daysAgo = (num: number) => {
      const d = new Date(Date.now() - num * 24 * 3600 * 1000);
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    };
    return [
      {
        id: "news-fb-1",
        title: "Swiss Blockchain Intelligence Accord Establishes Sovereign Interoperability Standard",
        summary: "Regulatory frameworks finalized in Bern streamline coordinate international subpoena tracing protocols with immediate effect.",
        content: "In a landmark development for digital asset security, the Swiss Federal Department of Finance has ratified standard coordination channels under the new GML compliance framework. Trojan Recovery's team of investigators has successfully locked asset tracking channels across 14 European jurisdiction points utilizing secure cold custody audits. This standard mandates rapid response windows from centralized exchanges under on-chain suspicion tags.",
        category: "Regulations",
        source: "Zürich Crypto Legal Review",
        date: daysAgo(1),
        readTime: "4 min read",
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "news-fb-2",
        title: "UTXO Multi-Hop Obfuscation Tactics Penetrated by Clust-V4 Forensics Toolkit",
        summary: "New cluster analytics decode privacy coins & mix hopping nodes on major layer-2 networks with 93% accuracy.",
        content: "On-chain attackers deploying automated micro-transfers to obfuscate theft lines are losing their edge. Utilizing decentralized ledger clustering model Clust-V4, forensic intelligence teams isolated 4,800 linked wallets associated with recent Web3 smart exploit operations, resulting in cold asset blockages. By tracing input combinations back to original fee-funding coordinates, our senior investigators obtained verified physical identities for sovereign legal enforcement.",
        category: "Investigations",
        source: "Digital Forensic Quarterly",
        date: daysAgo(2),
        readTime: "5 min read",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "news-fb-3",
        title: "US Cyber Security Division Warns of Liquidity Mimic Mining Smart Swindles",
        summary: "Deceptive browser integrations prompting wallet approval configurations are target of coordinated municipal trace taskforces.",
        content: "Malicious operations masquerading as stable mining pools have stolen an estimated $140M this quarter. Our central investigations division has mapped these smart approvals back to core custodian addresses. Trojan Recovery advisory warnings detail that victims should immediately revoke infinite allowance parameters from their smart tokens using standard revocation registries such as revoke.cash to secure existing assets.",
        category: "Cybersecurity",
        source: "Trojan Threat Intelligence Center",
        date: daysAgo(3),
        readTime: "3 min read",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "news-fb-4",
        title: "Federal District Courts Approve Blockchain Records as Subpoena Proof Vectors",
        summary: "Miami and Southern District judicial divisions formalize standardized rules of chain-of-custody verification standard.",
        content: "Federal litigation is adapting rapidly to virtual proof. Case registries confirm that judges are now accepting verifiable on-chain UTXO graphs as binding proof of ownership, bypass traditional legacy bank tracking delays. This speeds up retrieval orders from centralized exchanges by allowing emergency injunction coordinates to trigger in hours instead of months.",
        category: "Regulations",
        source: "United States Federal Ledger Gazette",
        date: daysAgo(5),
        readTime: "6 min read",
        imageUrl: "https://images.unsplash.com/photo-1453728213787-a2269533a02d?auto=format&fit=crop&q=80&w=400"
      }
    ];
  };

  // Helper to generate static blogs in-memory if backend or localStorage is not available
  const getStaticBlogsFallback = (): BlogPost[] => {
    // 1. Map existing case studies to static blog articles
    const caseBlogs = CASE_STUDIES.map((c, idx) => ({
      id: `blog-rec-${idx + 1}`,
      title: `Advanced Forensic Case Study: Recovery of ${c.assetRecovered} from ${c.category}`,
      summary: `Decisive tracing analysis targeting dynamic UTXO hop nodes on behalf of our client. Lost: ${c.assetLost}, successfully retrieved: ${c.assetRecovered}.`,
      content: `### Executive Tracing Summary\n\nUnder regulatory compliance protocols of Trojan Recovery's cyber division, we executed a deep-drive blockchain forensic mapping operation focusing on a compromised wallet system relating to **${c.title}**. Our specialized analysts isolated cluster targets using UTXO-level analytical software.\n\n### The Forensic Challenge & Tracing Vectors\n\n${c.challenge}\n\n1. **Lead Analysis Vector**: Core transaction audit paths identified the exact block heights.\n2. **Clustering Analysis**: Cross-referencing inputs map isolated wallets linked directly to major custodian nodes.\n\n### Interactive Chronological Timeline\n\n* **Phase 1 (Ingestion)**: Verification of coordinates and cryptographic receipts: \`SHA-256 seal verified\`\n* **Phase 2 (Tracking)**: ${c.timeline}\n* **Phase 3 (Outcome)**: ${c.outcome}\n\n### Active Legal Recoveries & Custodian Subpoenas\n\nFollowing standard law enforcement protocols, coordinate subpoena notices were dispatched immediately to centralized exchange platforms. We successfully negotiated the release of the frozen balances.\n\n### Case Checklist Highlights\n\n${c.forensics.map(item => `* **Forensic Protocol**: ${item}`).join('\n')}\n\n*For advice or assistance concerning on-chain assets, contact our forensics team at support@trojanrecovery.com.*`,
      category: "Blockchain Investigations",
      author: {
        name: "Marcus Vance",
        role: "Senior Forensics Lead",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150"
      },
      date: new Date(Date.now() - (idx + 10) * 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: "6 min read",
      tags: ["DeFi Recovery", "Asset Tracing", c.category],
      status: "published" as const,
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600"
    }));

    // 2. Map standard BLOG_POSTS list with fallback imagery and published flags
    const standardBlogs = BLOG_POSTS.map((p, idx) => ({
      ...p,
      imageUrl: p.imageUrl || getBlogImageForCategory(p.category, idx),
      status: "published" as const
    }));

    // Combine both sources
    return [...standardBlogs, ...caseBlogs];
  };

  // Synchronize localStorage fallback database to keep the app 100% interactive offline / on GitHub Pages
  const initializeLocalStorage = () => {
    try {
      const stored = localStorage.getItem('sc_blogs');
      let needsSeed = !stored;
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (!Array.isArray(parsed) || parsed.length < 10) {
            needsSeed = true; // Force seed if list is older/shorter than the full 20 articles
          }
        } catch (_) {
          needsSeed = true;
        }
      }
      
      if (needsSeed) {
        localStorage.setItem('sc_blogs', JSON.stringify(getStaticBlogsFallback()));
      }
    } catch (e) {
      console.warn("localStorage init failed, running purely in memory", e);
    }
  };

  // Publisher panel admin states
  const [aiTopicPrompt, setAiTopicPrompt] = useState('');
  const [aiSelectedCategory, setAiSelectedCategory] = useState('Cryptocurrency Recovery');
  const [isGeneratingAiDoc, setIsGeneratingAiDoc] = useState(false);
  const [aiTempPost, setAiTempPost] = useState<any | null>(null);

  // Publisher Admin login states
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isPublisherLoggedIn, setIsPublisherLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dynamic Open Graph and Twitter Card SEO Meta Tags Synchronizer
  useEffect(() => {
    let title = "Trojan Recovery - Premier US Blockchain Intel & Asset Recovery";
    let desc = "Deploying deep-dive blockchain intelligence, digital forensics, and professional asset recovery tracing protocols.";
    let img = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600";
    let url = window.location.href;

    if (selectedNewsId) {
      const article = newsList.find(n => n.id === selectedNewsId);
      if (article) {
        title = `${article.title} | Trojan Recovery News Center`;
        desc = article.summary || article.content.substring(0, 160) + "...";
        img = article.imageUrl || img;
      }
    } else if (selectedBlogId) {
      const blog = blogsList.find(b => b.id === selectedBlogId);
      if (blog) {
        title = `${blog.title} | Trojan Forensic Blog`;
        desc = blog.summary || blog.content.substring(0, 160) + "...";
        img = blog.imageUrl || img;
      }
    }

    document.title = title;

    // Direct DOM manipulation to sync crawler metrics
    const setMetaTag = (propertyOrName: string, value: string, isProperty: boolean = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${propertyOrName}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, propertyOrName);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    setMetaTag('og:title', title, true);
    setMetaTag('og:description', desc, true);
    setMetaTag('og:image', img, true);
    setMetaTag('og:url', url, true);
    setMetaTag('twitter:card', 'summary_large_image', false);
    setMetaTag('twitter:title', title, false);
    setMetaTag('twitter:description', desc, false);
    setMetaTag('twitter:image', img, false);
  }, [selectedNewsId, selectedBlogId, newsList, blogsList]);

  // Dynamic JSON-LD Breadcrumb structured data for every page view
  useEffect(() => {
    const existingScript = document.getElementById('breadcrumb-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    const host = window.location.origin;
    const items = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": host
      }
    ];

    let currentPosition = 2;

    const addBreadcrumb = (name: string, path: string) => {
      items.push({
        "@type": "ListItem",
        "position": currentPosition++,
        "name": name,
        "item": `${host}${path}`
      });
    };

    if (currentTab === 'services') {
      addBreadcrumb("Services", "/?tab=services");
      if (selectedServiceId) {
        const srv = SERVICES.find(s => s.id === selectedServiceId);
        if (srv) {
          addBreadcrumb(srv.title, `/?tab=services&id=${selectedServiceId}`);
        }
      }
    } else if (currentTab === 'cases') {
      addBreadcrumb("Case Studies", "/?tab=cases");
    } else if (currentTab === 'news') {
      addBreadcrumb("News Center", "/?tab=news");
      if (selectedNewsId) {
        const newsArt = newsList.find(n => n.id === selectedNewsId) || getDynamicFallbackNews().find(n => n.id === selectedNewsId);
        if (newsArt) {
          addBreadcrumb(newsArt.title, `/?type=news&id=${selectedNewsId}`);
        }
      }
    } else if (currentTab === 'blog') {
      addBreadcrumb("Forensic Blog", "/?tab=blog");
      if (selectedBlogId) {
        const blogPost = blogsList.find(b => b.id === selectedBlogId) || getStaticBlogsFallback().find(b => b.id === selectedBlogId);
        if (blogPost) {
          addBreadcrumb(blogPost.title, `/?type=blog&id=${selectedBlogId}`);
        }
      }
    } else if (currentTab === 'faq') {
      addBreadcrumb("FAQ", "/?tab=faq");
    } else if (currentTab === 'contact') {
      addBreadcrumb("Contact Us", "/?tab=contact");
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    };

    const script = document.createElement('script');
    script.id = 'breadcrumb-jsonld';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(jsonLd, null, 2);
    document.head.appendChild(script);

    return () => {
      const cleanupScript = document.getElementById('breadcrumb-jsonld');
      if (cleanupScript) {
        cleanupScript.remove();
      }
    };
  }, [currentTab, selectedNewsId, selectedBlogId, selectedServiceId, newsList, blogsList]);

  // Manual draft creation states
  const [manualTitle, setManualTitle] = useState('');
  const [manualCategory, setManualCategory] = useState('Scam Prevention');
  const [manualSummary, setManualSummary] = useState('');
  const [manualContent, setManualContent] = useState('');
  const [manualTags, setManualTags] = useState('');
  const [isPublishingManual, setIsPublishingManual] = useState(false);

  // Contact/Intake form states
  const [contactName, setContactName] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactCountry, setContactCountry] = useState('United States');
  const [contactScamType, setContactScamType] = useState('Investment Scam / Pig Butchering');
  const [contactMsg, setContactMsg] = useState('');
  const [submittingIntake, setSubmittingIntake] = useState(false);
  const [deployedCredentials, setDeployedCredentials] = useState<{ caseId: string; passcode: string } | null>(null);

  // FAQ states
  const [openFaqId, setOpenFaqId] = useState<string | null>('fq1');
  const [faqSearch, setFaqSearch] = useState('');

  // Resource Center state
  const [resourcesSearch, setResourcesSearch] = useState('');
  
  // Ref for canvas background
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fetch News from server API (powered by Gemini Search or fallback)
  const loadNews = async () => {
    setNewsLoading(true);
    try {
      const res = await fetch('/api/news');
      if (!res.ok) throw new Error("Server error " + res.status);
      const data = await res.json();
      if (data.news) {
        setNewsList(data.news);
        setNewsStatus(data.status);
      } else {
        throw new Error("No news field");
      }
    } catch (err) {
      console.warn('Reverting to dynamic Swiss browser news fallback (offline/static host):', err);
      const localNews = getDynamicFallbackNews();
      setNewsList(localNews);
      setNewsStatus("local_static_fallback");
    } finally {
      setNewsLoading(false);
    }
  };

  // Fetch public blog list
  const loadBlogs = async () => {
    setBlogsLoading(true);
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) throw new Error("Server error " + res.status);
      const data = await res.json();
      if (data.blogs) {
        setBlogsList(data.blogs);
      } else {
        throw new Error("No blogs field");
      }
    } catch (err) {
      console.warn('Reverting to static publication list fallback:', err);
      try {
        const stored = localStorage.getItem('sc_blogs');
        if (stored) {
          const list: BlogPost[] = JSON.parse(stored);
          setBlogsList(list.filter(b => b.status === "published" || !b.status));
        } else {
          setBlogsList(getStaticBlogsFallback());
        }
      } catch (e) {
        console.warn("Could not parse client-side blogs", e);
        setBlogsList(getStaticBlogsFallback());
      }
    } finally {
      setBlogsLoading(false);
    }
  };

  // Fetch admin (draft + published) blogs for the Publisher Desk
  const loadAdminBlogs = async () => {
    try {
      const res = await fetch('/api/blogs?admin=true');
      if (!res.ok) throw new Error("Server error " + res.status);
      const data = await res.json();
      if (data.blogs) {
        setAdminBlogsList(data.blogs);
      } else {
        throw new Error("No blogs field");
      }
    } catch (err) {
      console.warn('Reverting to static admin publications list:', err);
      try {
        const stored = localStorage.getItem('sc_blogs');
        if (stored) {
          setAdminBlogsList(JSON.parse(stored));
        } else {
          setAdminBlogsList(getStaticBlogsFallback());
        }
      } catch (e) {
        console.warn("Could not parse client-side admin blogs", e);
        setAdminBlogsList(getStaticBlogsFallback());
      }
    }
  };

  useEffect(() => {
    initializeLocalStorage();
    loadNews();
    loadBlogs();
    loadAdminBlogs();
  }, []);

  // HTML5 Canvas Network Node visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 420);

    // Node objects represent blockchain entities
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number }> = [];
    const numNodes = Math.min(Math.floor(width / 24), 45);

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    // Transaction packet payloads flow between nodes
    const packets: Array<{ fromNodeIdx: number; toNodeIdx: number; pct: number; speed: number }> = [];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw node links representing transaction blocks
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Spawn transaction packets over connections periodically
            if (Math.random() < 0.0003 && packets.length < 15) {
              packets.push({
                fromNodeIdx: i,
                toNodeIdx: j,
                pct: 0,
                speed: 0.01 + Math.random() * 0.015
              });
            }
          }
        }
      }

      // Draw individual nodes
      nodes.forEach((n) => {
        ctx.fillStyle = `rgba(212, 175, 55, ${n.alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update vectors
        n.x += n.vx;
        n.y += n.vy;

        // Boundaries checks
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });

      // Update and draw flowing packets of transactions
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.pct += p.speed;
        if (p.pct >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const fn = nodes[p.fromNodeIdx];
        const tn = nodes[p.toNodeIdx];
        if (fn && tn) {
          const px = fn.x + (tn.x - fn.x) * p.pct;
          const py = fn.y + (tn.y - fn.y) * p.pct;

          ctx.fillStyle = '#D4AF37';
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 8;
          ctx.shadowColor = '#D4AF37';
          ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTab]);


  // Submit contact incident / start an active investigation
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      alert('Name, Email, and Brief Message are mandatory to launch cryptographic triage.');
      return;
    }

    setSubmittingIntake(true);
    try {
      const res = await fetch('/api/investigations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          company: contactCompany,
          email: contactEmail,
          phone: contactPhone,
          country: contactCountry,
          scamType: contactScamType,
          message: contactMsg
        }),
      });

      const data = await res.json();
      if (data.success) {
        setDeployedCredentials({
          caseId: data.caseId,
          passcode: data.passcode
        });
        // Clear inputs
        setContactName('');
        setContactCompany('');
        setContactEmail('');
        setContactPhone('');
        setContactMsg('');
      } else {
        alert(data.error || 'Server rejected incident parameters.');
      }
    } catch (err) {
      console.warn('Reverting to browser/static case initiation fallback:', err);
      // Generate a random Case ID and Passcode
      const randomId = Math.floor(10000 + Math.random() * 90000);
      const mockCaseId = `TR-${randomId}`;
      const mockPasscode = `SECURE-${Math.floor(100 + Math.random() * 899) + 100}`;

      setDeployedCredentials({
        caseId: mockCaseId,
        passcode: mockPasscode
      });

      // Clear inputs
      setContactName('');
      setContactCompany('');
      setContactEmail('');
      setContactPhone('');
      setContactMsg('');
    } finally {
      setSubmittingIntake(false);
    }
  };



  const handlePublishManual = async (instantPublish: boolean) => {
    if (!manualTitle || !manualContent) {
      alert("Please complete the required title and content fields.");
      return;
    }
    setIsPublishingManual(true);
    try {
      const payload = {
        title: manualTitle,
        category: manualCategory,
        summary: manualSummary || manualContent.substring(0, 150) + "...",
        content: manualContent,
        tags: manualTags ? manualTags.split(",").map(t => t.trim()) : [manualCategory],
        status: instantPublish ? 'published' : 'awaiting_approval'
      };
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setManualTitle('');
        setManualSummary('');
        setManualContent('');
        setManualTags('');
        alert(instantPublish ? "Article published directly to Forensic Blog!" : "Article saved to Editorial Pool for review.");
        await loadBlogs();
        await loadAdminBlogs();
      } else {
        alert(data.error || "Failed to post blog.");
      }
    } catch (_) {
      alert("Error contacting publisher database.");
    } finally {
      setIsPublishingManual(false);
    }
  };

  const handleGenerateAiBlog = async () => {
    if (!aiTopicPrompt) {
      alert("Please input a key concept or thread details.");
      return;
    }
    setIsGeneratingAiDoc(true);
    setAiTempPost(null);
    try {
      const res = await fetch('/api/blogs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiTopicPrompt,
          category: aiSelectedCategory
        })
      });
      const data = await res.json();
      if (data.success && data.post) {
        setAiTempPost(data.post);
      } else {
        alert(data.error || "Failed to generate AI article.");
      }
    } catch (_) {
      alert("Failed connecting to Trojan intelligence engines.");
    } finally {
      setIsGeneratingAiDoc(false);
    }
  };

  const handleSaveAiBlog = async (publishDirectly: boolean) => {
    if (!aiTempPost) return;
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: aiTempPost.title,
          summary: aiTempPost.summary,
          content: aiTempPost.content,
          category: aiTempPost.category,
          authorName: aiTempPost.authorName,
          authorRole: aiTempPost.authorRole,
          tags: aiTempPost.tags,
          imageUrl: aiTempPost.imageUrl,
          status: publishDirectly ? 'published' : 'awaiting_approval'
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiTempPost(null);
        setAiTopicPrompt('');
        alert(publishDirectly ? "AI-Generated article approved and published directly to Forensic Blog!" : "AI-Generated draft saved to Editorial Pool.");
        await loadBlogs();
        await loadAdminBlogs();
      } else {
        alert(data.error || "Failed to publish AI blog.");
      }
    } catch (_) {
      alert("Connection exception during article storage.");
    }
  };

  const handleApproveBlog = async (id: string) => {
    try {
      const res = await fetch('/api/blogs/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        alert("Article approved and propagated successfully to the Forensic Blog active list!");
        await loadBlogs();
        await loadAdminBlogs();
      } else {
        alert(data.error || "Approval rejected by server workflow.");
      }
    } catch (_) {
      alert("Fault on network line during approval state transition.");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this digital report?")) return;
    try {
      const res = await fetch('/api/blogs/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        await loadBlogs();
        await loadAdminBlogs();
      } else {
        alert(data.error || "Delete action rejected.");
      }
    } catch (_) {
      alert("Failed connecting to administrative delete registry.");
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const loginInput = adminUsername.trim().toLowerCase();
    const isEmailValid = loginInput === 'support@trojanrecovery.com';
    const isUsernameValid = loginInput === 'admin' || loginInput.length >= 3;
    
    if ((isEmailValid || isUsernameValid) && adminPassword === '@Wekesa100') {
      setIsPublisherLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator credentials or signature lock.');
    }
  };

  const handleCategoryChange = async (category: string) => {
    setAiSelectedCategory(category);
    
    // Auto-generate high-quality prompt for that category focus
    let targetPrompt = "";
    switch(category) {
      case "Cryptocurrency Recovery":
        targetPrompt = "Reverse tracking analysis of stolen multi-sig liquidity pool smart contracts under USA exchange guidelines.";
        break;
      case "Blockchain Investigations":
        targetPrompt = "UTXO clustering on coinjoin traces with forensic transit matching across peer-to-peer mixing networks.";
        break;
      case "Cybersecurity":
        targetPrompt = "Threat analysis of compromised validation keys and remote code injection signatures within hyperledger setups.";
        break;
      case "Scam Prevention":
        targetPrompt = "Pig-butchering romance schemes intercept and phishing domain infrastructure containment procedures.";
        break;
      case "Digital Forensics":
        targetPrompt = "NIST-compliant state-preservation on high-security encrypted hardware wallets following credential attacks.";
        break;
      case "Asset Tracing":
        targetPrompt = "Automated gas route tracking for high-frequency bridge hops between EVM and non-EVM blockchains.";
        break;
      case "Regulatory Compliance":
        targetPrompt = "Legal reporting requirements for frozen assets under federal guidelines and international subpoena templates.";
        break;
      default:
        targetPrompt = `Forensic tracing and asset recovery protocols for compromised ${category} assets.`;
    }
    
    setAiTopicPrompt(targetPrompt);
    
    setIsGeneratingAiDoc(true);
    setAiTempPost(null);
    try {
      const res = await fetch('/api/blogs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: targetPrompt,
          category: category
        })
      });
      const data = await res.json();
      if (data.success && data.post) {
        setAiTempPost(data.post);
      } else {
        alert(data.error || "Failed to generate AI article.");
      }
    } catch (_) {
      alert("Failed connecting to Trojan intelligence engines.");
    } finally {
      setIsGeneratingAiDoc(false);
    }
  };

  const handleActivateLiveChat = () => {
    let opened = false;
    if ((window as any).jivo_api) {
      try {
        (window as any).jivo_api.show?.();
        (window as any).jivo_api.open?.();
        opened = true;
      } catch (e) {
        console.warn("JivoChat API error:", e);
      }
    }
    
    if (!opened && (window as any).jivo_init) {
      try {
        (window as any).jivo_init();
        opened = true;
      } catch (e) {}
    }

    if (!opened) {
      try {
        (window as any).postMessage('{"name":"jivo_api.open"}', '*');
        opened = true;
      } catch (e) {}
    }

    if (!opened && !(window as any).jivo_api) {
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-6 right-6 z-50 bg-[#D4AF37] border border-[#D4AF37]/40 text-[#050b14] px-6 py-4 rounded shadow-2xl font-mono text-xs uppercase font-extrabold max-w-sm transition-all animate-bounce';
      toast.innerHTML = 'Connecting to Secure Miami Chat Desk... Please click the Jivo chat bubble in the bottom right corner of your screen to establish instant connection.';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 7000);
    }
  };

  // Filter lists based on categories and search parameters
  const filteredNews = newsList.filter((item) => {
    const matchesCategory = newsCategory === 'All' || item.category === newsCategory;
    const matchesSearch = item.title.toLowerCase().includes(newsSearch.toLowerCase()) || 
                          item.summary.toLowerCase().includes(newsSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredBlogs = blogsList.filter((item) => {
    const matchesCategory = blogCategory === 'All' || item.category === blogCategory;
    const matchesSearch = item.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
                          item.summary.toLowerCase().includes(blogSearch.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(blogSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredResources = RESOURCES.filter(r => 
    r.title.toLowerCase().includes(resourcesSearch.toLowerCase()) ||
    r.description.toLowerCase().includes(resourcesSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-navy-dark text-white select-text">
      
      {/* 1. Global Navigation */}
      <Navigation 
        currentTab={currentTab} 
        setTab={(tab) => {
          setSelectedNewsId(null);
          setTab(tab);
        }} 
      />

      {/* 2. Main Tab Views Router */}
      <main className="pb-16 animate-in fade-in duration-500">
        
        {/* TAB: HOME OVERVIEW */}
        {currentTab === 'home' && (
          <div id="home-view" className="space-y-16">
            
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-navy border-b border-gold/15 py-16 lg:py-28">
              <div className="absolute inset-0 z-0 h-full w-full opacity-65">
                <canvas ref={canvasRef} className="h-full w-full" />
              </div>
              
              <div className="relative z-10 mx-auto max-w-7xl px-6 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 rounded-sm border border-gold/25 bg-gold/5 px-3.5 py-1.5 text-[10px] text-gold font-mono uppercase tracking-widest">
                    <Award className="h-4 w-4" />
                    <span>Certified Blockchain Intelligence Agency</span>
                  </div>
                  
                  <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white lg:text-5xl">
                    <span className="editorial-gradient-text">Recover What is Yours.</span> <br />
                    <span className="text-gold font-medium">Deliver Financial Justice.</span>
                  </h1>
                  
                  <p className="font-sans text-xs leading-relaxed text-navy-slate/95 sm:text-sm max-w-lg">
                    We are the global leader in complex blockchain forensics and crypto asset recovery for legal professionals, enterprises, and high-net-worth investors. We map complex data networks, trace capital flows, and deliver court-grade intelligence.
                  </p>

                  <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <button 
                      onClick={() => setTab('contact')}
                      className="rounded-sm bg-gold px-5 py-3.5 text-xs font-bold tracking-widest text-[#050b14] hover:bg-gold-hover hover:-translate-y-0.5 transition duration-300 uppercase shadow-[0_4px_15px_rgba(212,175,55,0.25)] flex items-center justify-center space-x-1.5 shrink-0"
                    >
                      <span>Request Investigation</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={handleActivateLiveChat}
                      className="rounded-sm border border-gold/40 hover:bg-gold/10 px-5 py-3.5 text-xs font-bold tracking-widest text-gold hover:text-white transition duration-300 uppercase flex items-center justify-center space-x-1.5 shadow-[0_4px_15px_rgba(212,175,55,0.15)] shrink-0"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-gold" />
                      <span>Live Chat</span>
                    </button>
                    <a 
                      href="https://wa.me/16464256160"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm bg-emerald-700 hover:bg-emerald-600 px-5 py-3.5 text-xs font-bold tracking-widest text-white transition duration-300 uppercase flex items-center justify-center space-x-1.5 shadow-[0_4px_15px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 shrink-0"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-white" />
                      <span>WhatsApp Liaison</span>
                    </a>
                  </div>

                  <div className="pt-2 text-[10px] font-mono tracking-wider text-gold-light/80 flex items-center space-x-1.5 uppercase">
                    <Globe className="h-3 w-3 text-gold" />
                    <span>Headquarters: Miami, Florida • Serving US Investors & Capital Markets</span>
                  </div>

                  {/* Quick Trust Badges */}
                  <div className="pt-6 grid grid-cols-2 gap-4 border-t border-white/5 sm:grid-cols-4">
                    <div>
                      <span className="block font-display text-xs font-bold text-white uppercase">Confidential</span>
                      <span className="text-[10px] text-navy-slate">End-to-End Vault Seals</span>
                    </div>
                    <div>
                      <span className="block font-display text-xs font-bold text-white uppercase">International</span>
                      <span className="text-[10px] text-navy-slate">Expert Global Liaison</span>
                    </div>
                    <div>
                      <span className="block font-display text-xs font-bold text-white uppercase">Certified</span>
                      <span className="text-[10px] text-navy-slate">NIST Chain of Custody</span>
                    </div>
                    <div>
                      <span className="block font-display text-xs font-bold text-white uppercase">Fast-Response</span>
                      <span className="text-[10px] text-navy-slate">Under 4-Hour Response</span>
                    </div>
                  </div>
                </div>

                {/* Aesthetic Visual Side Illustration - Interactive Dashboard mock */}
                <div className="relative flex items-center justify-center">
                  <div className="w-full max-w-md overflow-hidden rounded-xl border border-gold/30 bg-navy-dark/95 p-6 shadow-2xl rgb-glow">
                    <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center space-x-2 text-gold">
                        <span className="inline-block h-2 w-2 rounded-full bg-gold animate-pulse"></span>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider">LIVE NODE COMPILER v4.81</span>
                      </div>
                      <span className="font-mono text-[9px] text-[#8892B0]">SCAN RATE: 141.2 KH/S</span>
                    </div>

                    {/* MOCK TRANSACTION ROWS */}
                    <div className="space-y-3 font-mono text-[10px] text-slate-300">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-gold">TX: 0x8a92f0...</span>
                        <span className="text-red-400 font-bold">-248,500 USDT</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-navy-slate">
                          <span>Splitter Level-1 Router:</span>
                          <span className="text-white hover:underline cursor-pointer">0xf2189d...</span>
                        </div>
                        <div className="flex justify-between text-navy-slate">
                          <span>Risk Entropy Coefficient:</span>
                          <span className="text-gold">0.985 (HIGH RISK ACCUMULATE)</span>
                        </div>
                        <div className="flex justify-between text-navy-slate">
                          <span>Target Exchange Exit Gateway:</span>
                          <span className="text-emerald-400">Locked Ledger - Cayman Core</span>
                        </div>
                      </div>

                      {/* Call-to-action to tracking progress */}
                      <div className="mt-4 rounded bg-gold/5 border border-gold/20 p-3 text-center">
                        <p className="font-sans text-[11px] text-gold font-medium leading-relaxed">
                          Do you have suspect wallet addresses or transaction hashes?
                        </p>
                        <button 
                          onClick={() => setTab('contact')}
                          className="mt-2 text-[10.5px] font-bold text-white underline hover:text-gold transition uppercase tracking-wide block mx-auto"
                        >
                          Trace Address Ledger now →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TRUSTED STATISTICS SECTION */}
            <section className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-2 gap-1 rounded-sm border border-gold/25 bg-navy-dark/45 p-6 md:grid-cols-4 md:p-8">
                <div className="space-y-2 text-center p-4 border-r border-b border-gold/10 md:border-b-0">
                  <span className="block font-display text-3xl font-extrabold text-gold lg:text-4xl">$2.4B+</span>
                  <span className="block font-sans text-[10px] font-bold tracking-widest text-navy-slate uppercase">Assets Traced</span>
                </div>
                <div className="space-y-2 text-center p-4 border-b border-gold/10 md:border-r md:border-b-0">
                  <span className="block font-display text-3xl font-extrabold text-white lg:text-4xl">14,200</span>
                  <span className="block font-sans text-[10px] font-bold tracking-widest text-navy-slate uppercase">Wallets Analysed</span>
                </div>
                <div className="space-y-2 text-center p-4 border-r border-gold/10">
                  <span className="block font-display text-3xl font-extrabold text-gold lg:text-4xl">48+</span>
                  <span className="block font-sans text-[10px] font-bold tracking-widest text-navy-slate uppercase">Countries Served</span>
                </div>
                <div className="space-y-2 text-center p-4">
                  <span className="block font-display text-3xl font-extrabold text-white lg:text-4xl">98%</span>
                  <span className="block font-sans text-[10px] font-bold tracking-widest text-[#8892B0] uppercase">Identification Rate</span>
                </div>
              </div>
            </section>

            {/* ABOUT US SECTION */}
            <section className="mx-auto max-w-7xl px-6 space-y-8">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center font-sans">
                <div className="space-y-4">
                  <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest block">ABOUT US</span>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">Pioneering Cryptocurrency & Blockchain Intelligence</h2>
                  <p className="text-xs text-navy-slate leading-relaxed">
                    Trojan Recovery specializes in elite blockchain analytics, systemic cyber threat intelligence, and cryptocurrency asset tracing. Our organization was founded to map complex data networks, trace capital flows, and support law firms, corporations, and individuals in recovering stolen assets.
                  </p>
                  <p className="text-xs text-navy-slate leading-relaxed">
                    Our team brings together certified digital forensic examiners, smart-contract auditors, OSINT specialists, and veteran cryptocurrency investigators operating globally. We bridge advanced on-chain forensic methodologies with standard judicial litigation workflows.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                    <div className="space-y-1.5 border-l-2 border-gold/40 pl-4">
                      <strong className="block text-xs font-display text-white uppercase font-bold">Our Mission</strong>
                      <span className="block text-[11px] text-navy-slate leading-relaxed">Providing absolute transparency across public block networks and delivering forensic proof that empowers recovery.</span>
                    </div>
                    <div className="space-y-1.5 border-l-2 border-gold/40 pl-4">
                      <strong className="block text-xs font-display text-white uppercase font-bold">Our Vision</strong>
                      <span className="block text-[11px] text-navy-slate leading-relaxed">To become the gold-standard tracing advisor for modern cyber intelligence and secure legal dispute coordinates.</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="glow-card rounded-xl p-5 border border-gold/15 bg-navy-light/10 space-y-1.5">
                    <span className="font-display text-[10px] font-bold text-gold tracking-widest uppercase">Forensic Precision</span>
                    <p className="text-[11.5px] text-navy-slate leading-normal">We execute deep-dive UTXO splits and risk attribution weighting to de-anonymize suspect changes.</p>
                  </div>
                  <div className="glow-card rounded-xl p-5 border border-gold/15 bg-navy-light/10 space-y-1.5">
                    <span className="font-display text-[10px] font-bold text-gold tracking-widest uppercase">Certified Custody</span>
                    <p className="text-[11.5px] text-navy-slate leading-normal">All logging directories and evidence files follow rigorous NIST guidelines for court filings.</p>
                  </div>
                  <div className="glow-card rounded-xl p-5 border border-gold/15 bg-navy-light/10 space-y-1.5">
                    <span className="font-display text-[10px] font-bold text-gold tracking-widest uppercase">Secure Sandbox</span>
                    <p className="text-[11.5px] text-navy-slate leading-normal">Customer communications sit inside airlocked off-grid systems fully compliant with GDPR.</p>
                  </div>
                  <div className="glow-card rounded-xl p-5 border border-gold/15 bg-navy-light/10 space-y-1.5">
                    <span className="font-display text-[10px] font-bold text-gold tracking-widest uppercase">Strategic Partners</span>
                    <p className="text-[11.5px] text-navy-slate leading-normal">Our liaisons include compliance departments at major exchanges and global cyber regulators.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* KEY SERVICES OVERVIEW PANEL TEASER */}
            <section className="mx-auto max-w-7xl px-6 space-y-8">
              <div className="text-center md:text-left">
                <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest">TECHNICAL CAPABILITIES</span>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">Professional Intelligence Suites</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES.slice(0, 3).map((svc) => (
                  <div key={svc.id} className="glow-card rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <span className="font-display font-bold text-gold text-sm tracking-wide uppercase">{svc.title}</span>
                      <p className="mt-2 text-xs text-navy-slate leading-relaxed">{svc.shortDesc}</p>
                    </div>
                    <button 
                      onClick={() => setTab('services')}
                      className="mt-4 flex items-center space-x-1 text-[10.5px] font-bold text-gold hover:text-white transition uppercase tracking-widest"
                    >
                      <span>Explore Suite</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* CURATED CLIENT TESTIMONIALS SECTION */}
            <section className="mx-auto max-w-7xl px-6 py-12 border-t border-gold/15 space-y-8">
              <TestimonialCarousel testimonials={TESTIMONIALS} />
            </section>

          </div>
        )}

        {/* TAB: SERVICES PAGE */}
        {currentTab === 'services' && (
          <div id="services-view" className="mx-auto max-w-7xl px-6 py-8 space-y-12 animate-in fade-in duration-300">
            {selectedServiceId ? (
              // RENDER SINGLE DETAILED SECURE DIRECT RECOVERY SERVICE INFO WORKFLOW
              (() => {
                const svc = SERVICES.find(s => s.id === selectedServiceId);
                if (!svc) return <p className="text-center font-mono text-xs text-gold">Operational dossier not found.</p>;
                return (
                  <div className="space-y-8 max-w-4xl mx-auto font-sans animate-in md:scale-[0.99] duration-300">
                    <button 
                      onClick={() => setSelectedServiceId(null)}
                      className="flex items-center space-x-2 text-xs font-bold text-gold hover:text-white uppercase tracking-widest transition"
                    >
                      <span>← Back to Certified Solutions</span>
                    </button>

                    {/* Service Header Block */}
                    <div className="space-y-4 border-b border-gold/15 pb-6">
                      <div className="flex items-center space-x-3 text-xs font-mono text-gold uppercase font-bold">
                        <span>CERTIFIED OPERATION</span>
                        <span>•</span>
                        <span className="text-white/80">ID: {svc.id.toUpperCase()}</span>
                        <span>•</span>
                        <span className="text-[#8892B0]">EST. TIMELINE: 48-72H LOCK</span>
                      </div>
                      <h1 className="font-display text-2xl md:text-4xl font-extrabold tracking-normal text-white uppercase leading-tight">
                        {svc.title}
                      </h1>
                      <p className="text-sm text-[#CCD6F6] leading-relaxed max-w-3xl">
                        {svc.longDesc}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left Block - Detailed Tactical Methodology */}
                      <div className="lg:col-span-2 space-y-8 text-xs text-navy-slate leading-relaxed">
                        
                        {/* Section I */}
                        <div className="space-y-3">
                          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">I. Tactical Forensic Methodology</h4>
                          <p className="text-navy-slate leading-relaxed text-[11.5px]">
                            Trojan Forensic Intelligence incorporates state-of-the-art cryptographic clustering models. Our forensic teams compile transaction graphs starting from initial exploitation addresses and trace multi-hop splits downstream.
                          </p>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                            {svc.methodologies.map((m, idx) => (
                              <li key={idx} className="rounded-sm border border-gold/10 bg-navy-light/10 p-3 flex flex-col justify-between">
                                <span className="font-mono text-[9px] text-gold uppercase font-bold mb-1">PROTOCOL 0{idx+1}</span>
                                <span className="text-[11px] font-sans font-bold text-white">{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Section II */}
                        <div className="space-y-3">
                          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">II. Target Outcomes & Benefits</h4>
                          <p className="text-navy-slate leading-relaxed text-[11.5px]">
                            During an active asset investigation, our primary goals center around freezing capital at centralized exchanges, establishing identity clusters, and delivering certified evidence dossiers.
                          </p>
                          <ul className="space-y-1.5 pl-1">
                            {svc.benefits.map((b, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-[11px] text-[#CCD6F6]">
                                <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0"></span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Section III */}
                        <div className="space-y-3">
                          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">III. Evidentiary Dossier Checklist</h4>
                          <p className="text-navy-slate leading-relaxed text-[11.5px]">
                            To initiate an emergency mapping protocol under our Miami Cyber Desk parameters, victims and legal representatives are highly recommended to prepare the following logs:
                          </p>
                          <div className="rounded-sm border border-white/5 bg-navy-dark/75 p-4 space-y-2 mt-2">
                            <div className="flex items-start space-x-2">
                              <span className="text-gold font-mono font-bold text-[10px] mt-0.5">[ ]</span>
                              <span className="text-[11px] text-white">All corresponding TXIDs (Transaction Hashes) of withdrawals</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-gold font-mono font-bold text-[10px] mt-0.5">[ ]</span>
                              <span className="text-[11px] text-white">Known target address parameters of suspected scammers</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-gold font-mono font-bold text-[10px] mt-0.5">[ ]</span>
                              <span className="text-[11px] text-white">Full communication screenshots (Telegram, WhatsApp, email)</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-gold font-mono font-bold text-[10px] mt-0.5">[ ]</span>
                              <span className="text-[11px] text-white">Platform login URLs and deposit log records</span>
                            </div>
                          </div>
                        </div>

                        {/* Section IV - CTA WhatsApp Group */}
                        <div className="rounded-xl border border-[#D4AF37]/25 bg-gold/5 p-6 space-y-4 mt-8">
                          <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gold">Need Urgent Freeze Cooperation on US Exchanges?</h4>
                          <p className="text-[11.5px] text-[#8892B0] leading-relaxed">
                            Federal and Municipal cybercrimes agencies prioritize actions backed by physical, cryptographically sound audits. Direct secure liaison with compliance desks can freeze assets before they are blended or split.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={handleActivateLiveChat}
                              className="inline-flex items-center justify-center space-x-2 rounded bg-gold hover:opacity-90 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#050b14] transition font-mono cursor-pointer"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span>Secure Live Chat Desk</span>
                            </button>
                            <a
                              href="https://wa.me/16464256160"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center space-x-2 rounded bg-emerald-700 hover:bg-emerald-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition font-mono cursor-pointer"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span>Join WhatsApp Liaison</span>
                            </a>
                            <button
                              onClick={() => {
                                setContactScamType(svc.title);
                                setTab('contact');
                              }}
                              className="inline-flex items-center justify-center rounded border border-gold/30 hover:bg-gold/15 px-5 py-3 text-xs font-bold uppercase tracking-wider text-gold transition cursor-pointer"
                            >
                              <span>Submit Intake Dossier</span>
                            </button>
                          </div>
                        </div>

                      </div>

                      {/* Right Block - Regulatory Jurisdictional Info */}
                      <div className="space-y-6">
                        <div className="rounded-sm border border-gold/15 bg-navy-dark/45 p-5 space-y-4 shadow-md">
                          <span className="block font-display text-[9.5px] font-bold tracking-widest text-gold uppercase border-b border-white/5 pb-2">
                            OPERATIONAL STATS
                          </span>
                          
                          <div className="space-y-3.5 text-[10px] font-mono text-navy-slate leading-normal">
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">Forensic Lead</span>
                              <span className="text-white font-bold">Trojan Cyber Intelligence</span>
                            </div>
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">Average Tracing Time</span>
                              <span className="text-white font-bold">24 - 48 Hours</span>
                            </div>
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">Primary Locality Focus</span>
                              <span className="text-white font-bold">USA, Singapore, EU</span>
                            </div>
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">Court Readiness</span>
                              <span className="text-emerald-400 font-bold">✔ Admissible Affidavit</span>
                            </div>
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">Zero-Custody Storage</span>
                              <span className="text-white font-bold">ACTIVE (Local Airlink Nodes)</span>
                            </div>
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">Legal Team Reference</span>
                              <span className="text-gold font-bold">Direct Liaison Active</span>
                            </div>
                          </div>

                          <div className="pt-2.5 border-t border-white/5">
                            <span className="text-[9.5px] leading-relaxed text-navy-slate block">
                              Operating in compliance with US federal cyber investigation guidelines. Transaction traces are mapped onto certified visual charts matching NIST standards.
                            </span>
                          </div>
                        </div>

                        <div className="p-4 rounded border border-white/5 bg-navy-light/5 space-y-2 text-xs">
                          <h5 className="font-display text-[9.5px] font-bold text-white uppercase tracking-wider">USA Subpoena Advisory</h5>
                          <p className="text-[9.5px] text-navy-slate leading-relaxed">
                            Freezing directives onto suspects residing outside common extradition bounds can be coordinated directly with exchange asset pools located under Florida state and US federal court domains.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <>
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest block font-bold">OPERATIONAL SPECIFICATIONS</span>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase">Our Certified Forensics Solutions</h2>
                  <p className="text-sm text-navy-slate">Trojan Recovery delivers rigorous forensic investigations following institutional compliance frameworks worldwide.</p>
                </div>

                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="grid grid-cols-1 gap-8 md:grid-cols-2"
                >
                  {SERVICES.map((svc) => (
                    <motion.div 
                      key={svc.id}
                      variants={{
                        hidden: { y: 15, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 110, damping: 15 } }
                      }}
                      className="glow-card rounded-2xl border border-gold/15 bg-navy-light/10 p-6 md:p-8 space-y-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase border-b border-gold/10 pb-1.5">{svc.title}</h3>
                          <span className="rounded bg-gold/15 px-2.5 py-1 text-[9.5px] font-mono text-gold-light uppercase border border-gold/10">Active Protocol</span>
                        </div>
                        
                        <p className="text-xs text-navy-slate leading-relaxed mt-4">{svc.shortDesc || svc.longDesc}</p>
                        
                        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                          <div>
                            <span className="font-display text-[10px] font-bold text-gold tracking-widest uppercase">Target Outcomes</span>
                            <ul className="mt-1.5 space-y-1 text-[11px] text-navy-slate">
                              {svc.benefits.slice(0, 2).map((b, i) => (
                                <li key={i} className="flex items-center space-x-1.5">
                                  <span className="h-1 w-1 rounded-full bg-gold shrink-0"></span>
                                  <span className="truncate">{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-display text-[10px] font-bold text-gold tracking-widest uppercase">Methodologies</span>
                            <ul className="mt-1.5 space-y-1 text-[11px] text-navy-slate">
                              {svc.methodologies.slice(0, 2).map((m, i) => (
                                <li key={i} className="flex items-center space-x-1.5">
                                  <span className="h-1 w-1 rounded-full bg-navy-slate shrink-0"></span>
                                  <span className="truncate">{m}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 flex justify-between space-x-2 items-center border-t border-white/5 mt-4">
                        <button 
                          onClick={() => {
                            setSelectedServiceId(svc.id);
                          }}
                          className="font-mono text-[10px] text-gold hover:underline uppercase tracking-wider font-bold"
                        >
                          View Forensic Protocol &amp; Details →
                        </button>
                        <button 
                          onClick={() => {
                            setContactScamType(svc.title);
                            setTab('contact');
                          }}
                          className="rounded bg-gold px-4 py-2 text-[10px] font-bold tracking-widest text-[#050b14] hover:bg-gold-hover transition duration-200 uppercase"
                        >
                          Request Audit
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        )}

        {/* TAB: WORKFLOW PROCESS PAGE */}
        {currentTab === 'process' && (
          <div id="process-view" className="mx-auto max-w-7xl px-6 py-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest block">TRIAGE & MAPPING FRAMEWORK</span>
              <h2 className="font-display text-3xl font-bold tracking-normal text-white uppercase">The Forensic Investigation Process</h2>
              <p className="text-sm text-navy-slate">We enforce a standardized, 6-stage evidence compilation workflow to secure fast lock approvals.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { step: 1, title: "Case Submission", shortDesc: "Intake of transaction hashes, ledger logs, and client background briefs.", duration: "Within 4 Hours" },
                { step: 2, title: "Evidence Collection", shortDesc: "Rigorous physical / digital credential verification to compile auditable records.", duration: "24-48 Hours" },
                { step: 3, title: "Blockchain Analysis", shortDesc: "Algorithmic mapping of coin splitting, nested contract calls, and changes.", duration: "2-3 Days" },
                { step: 4, title: "Asset Tracing", shortDesc: "Identifying the final exchange custody accounts and linking them to KYC IDs.", duration: "1-2 Days" },
                { step: 5, title: "Intelligence Report", shortDesc: "Structuring a court-grade technical affidavit suitable for subpoenas worldwide.", duration: "24 Hours" },
                { step: 6, title: "Recovery Strategy Coordination", shortDesc: "Providing verified legal packages to exchanges and local enforcement to freeze assets.", duration: "Ongoing" }
              ].map((p) => (
                <div key={p.step} className="glow-card rounded-xl p-6 border border-gold/15 bg-navy-light/10 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="font-mono text-xs font-bold text-gold tracking-widest uppercase">STAGE 0{p.step}</span>
                    <span className="font-mono text-[9.5px] text-navy-slate">{p.duration}</span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-white uppercase">{p.title}</h4>
                  <p className="text-xs text-navy-slate leading-relaxed">{p.shortDesc}</p>
                </div>
              ))}
            </div>
            
            <div className="rounded-xl border border-gold/10 bg-navy-light/5 p-6 text-center max-w-lg mx-auto">
              <p className="font-sans text-xs text-navy-slate leading-relaxed">
                Our workflow is recognized by compliance departments at major cryptocurrency exchanges globally, minimizing the latency required to execute account freezing orders.
              </p>
              <button 
                onClick={() => setTab('contact')}
                className="mt-3.5 inline-flex bg-gold text-[#050b14] rounded px-4 py-2 font-display text-[10.5px] font-bold uppercase tracking-wider hover:bg-gold-hover transition"
              >
                Submit Incident for Triage
              </button>
            </div>
          </div>
        )}

        {/* TAB: CASE STUDIES */}
        {currentTab === 'cases' && (
          <div id="cases-view" className="mx-auto max-w-7xl px-6 py-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest block">HISTORIC CASE REGISTRY</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white uppercase">Trace Audits & Repatriations</h2>
              <p className="text-sm text-navy-slate font-sans">Review realistic, non-confidential case studies detailing how Trojan isolates and locks stolen capital.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {CASE_STUDIES.map((cs) => (
                <div key={cs.id} className="glow-card rounded-2xl border border-gold/15 bg-navy-light/10 p-6 md:p-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="font-mono text-[9px] bg-gold/15 border border-gold/30 text-gold px-2.5 py-0.5 rounded font-bold uppercase">{cs.category}</span>
                    <span className="font-mono text-[9px] text-navy-slate">Operational Duration: {cs.timeline}</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white tracking-wide uppercase">{cs.title}</h3>
                  <p className="text-xs text-navy-slate leading-relaxed mb-2"><strong className="text-white">The Challenge:</strong> {cs.challenge}</p>

                  <div className="rounded bg-navy-dark/60 p-4 border border-white/5">
                    <span className="font-display text-[10px] font-bold text-gold tracking-widest uppercase block mb-1.5">Forensic Chain Log</span>
                    <ul className="space-y-1.5 text-xs text-navy-slate">
                      {cs.forensics.map((f, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-orange-400 mt-0.5 shrink-0">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <span className="block font-mono text-[9px] text-navy-slate uppercase">Assets Compromised</span>
                      <span className="block font-display text-sm font-bold text-red-400">{cs.assetLost}</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-mono text-[9px] text-emerald-400 uppercase font-bold">Assets Repatriated</span>
                      <span className="block font-display text-sm font-bold text-emerald-400">{cs.assetRecovered}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: NEWS CENTER */}
        {currentTab === 'news' && (
          <div id="news-view" className="mx-auto max-w-7xl px-6 py-8 space-y-8 animate-in fade-in duration-300">
            {selectedNewsId ? (
              // RENDER SINGLE DETAILED READABLE SEO-COMPLIANT ARTICLE VIEW BLOCK
              (() => {
                const article = newsList.find(n => n.id === selectedNewsId);
                if (!article) return <p className="text-center font-mono text-xs text-gold">Brief details not found.</p>;
                return (
                  <div className="space-y-8 max-w-4xl mx-auto font-sans animate-in md:scale-[0.99] duration-300">
                    <button 
                      onClick={() => setSelectedNewsId(null)}
                      className="flex items-center space-x-2 text-xs font-bold text-gold hover:text-white uppercase tracking-widest transition"
                    >
                      <span>← Back to Intelligence Registry</span>
                    </button>

                    {/* Article Header block */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-xs font-mono text-gold uppercase font-bold">
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.date}</span>
                          <span>•</span>
                          <span className="text-navy-slate">{article.readTime}</span>
                        </div>
                        <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-normal text-white uppercase leading-tight">
                          {article.title}
                        </h1>
                        <div className="flex items-center space-x-3 text-xs text-navy-slate">
                          <span className="font-mono">BY {article.source.toUpperCase()}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleShare(article.id, 'news')}
                        className="flex items-center space-x-2 rounded border border-gold/40 bg-gold/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold hover:text-navy-dark transition duration-200 shadow-sm shrink-0 mt-2 md:mt-0"
                      >
                        {shareCopied === article.id ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Dossier Link Copied!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="h-3.5 w-3.5" />
                            <span>Share Forensic Dossier</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Dynamic Cover image if exists */}
                    {article.imageUrl && (
                      <div className="relative rounded-xl overflow-hidden border border-gold/10">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title} 
                          referrerPolicy="no-referrer"
                          className="w-full max-h-[380px] object-cover opacity-85" 
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left Block - Detailed Article Text Body */}
                      <div className="lg:col-span-2 space-y-6 text-sm text-navy-slate leading-relaxed">
                        <div className="bg-navy-light/10 border-l-4 border-gold p-4 italic text-white/95 text-xs leading-relaxed">
                          {article.summary}
                        </div>
                        <div className="space-y-5 text-white/90 text-xs">
                          {renderMarkdownToReact(article.content)}
                          <p className="leading-relaxed pt-2 border-t border-white/5 text-[11.5px] italic text-navy-slate">
                            USA-based cryptocurrency traders, institutional fund managers, and legal professionals can consult Trojan Recovery's expert panel in Miami, Florida, to perform transaction tracing, identify wallet clusters, and deploy freeze directives on suspect assets.
                          </p>
                        </div>

                        {/* CTA JivoChat box */}
                        <div className="rounded-xl border border-gold/25 bg-gold/5 p-6 space-y-3 mt-8">
                          <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gold">Suspect Similar Cyber Fraud / Fund Loss?</h4>
                          <p className="text-xs text-navy-slate leading-relaxed">
                            If your digital funds have been compromised, do not delay. Tracing leads directly to actionable court filings and asset freezes inside USA exchanges.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                              onClick={handleActivateLiveChat}
                              className="inline-flex items-center space-x-2 rounded bg-gold hover:bg-gold-hover px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050b14] transition leading-none shadow-[0_4px_10px_rgba(212,175,55,0.2)] cursor-pointer"
                            >
                              <MessageCircle className="h-4 w-4 text-[#050b14]" />
                              <span>Consult Live on Chat Desk</span>
                            </button>
                            <a
                              href="https://wa.me/16464256160"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 rounded bg-emerald-700 hover:bg-emerald-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition leading-none shadow-[0_4px_10px_rgba(16,185,129,0.2)] cursor-pointer"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span>Liaison on WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Right Block - SEO Rank compliance metadata panel */}
                      <div className="space-y-6">
                        <div className="rounded-sm border border-gold/15 bg-navy-dark/45 p-5 space-y-4 shadow-md">
                          <span className="block font-display text-[9.5px] font-bold tracking-widest text-gold uppercase border-b border-white/5 pb-2">
                            SEO INTELLIGENCE REGISTRY
                          </span>
                          
                          <div className="space-y-3.5 text-[10px] font-mono text-navy-slate leading-normal">
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">Primary Keyword Target</span>
                              <span className="text-white font-bold">{article.category} Asset Recovery</span>
                            </div>
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">Jurisdiction Locality</span>
                              <span className="text-white font-bold">United States Markets</span>
                            </div>
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">SEO Verification State</span>
                              <span className="text-emerald-400 font-bold">✔ Structured Schema Active</span>
                            </div>
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">Update Frequency Trigger</span>
                              <span className="text-white font-bold">Daily Index Sync Active</span>
                            </div>
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">Crawler Robots Policy</span>
                              <span className="text-white font-bold">INDEX, FOLLOW, SEARCH-OPTIMIZED</span>
                            </div>
                            <div>
                              <span className="block text-[8.5px] uppercase text-gold/60">Forensically Assessed By</span>
                              <span className="text-gold font-bold">Trojan Cyber Intelligence Unit</span>
                            </div>
                          </div>

                          <div className="pt-2.5 border-t border-white/5">
                            <span className="text-[9.5px] leading-relaxed text-navy-slate block">
                              These technical articles are fully crawlable by US search engines to boost online visibility and help victims isolate active exploitation schemes.
                            </span>
                          </div>
                        </div>

                        <div className="p-4 rounded border border-white/5 bg-navy-light/5 space-y-2">
                          <h5 className="font-display text-[9.5px] font-bold text-white uppercase tracking-wider">Disclaimer Guidance</h5>
                          <p className="text-[9.5px] text-navy-slate leading-relaxed">
                            These educational security briefs represent modern on-chain intelligence standards. Submissions must occur under official corporate engagement letters.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recommended Forensic Briefs (Suggestions based on Current Category) */}
                    {(() => {
                      const sameCategory = newsList.filter(n => n.id !== article.id && n.category === article.category);
                      const otherCategory = newsList.filter(n => n.id !== article.id && n.category !== article.category);
                      const relatedArticles = [...sameCategory, ...otherCategory].slice(0, 3);
                      if (relatedArticles.length === 0) return null;
                      return (
                        <div className="pt-10 border-t border-gold/15 space-y-5">
                          <div>
                            <span className="font-mono text-[10px] font-bold text-gold uppercase tracking-widest block">INCREASED DWELL TIME & SEO METRICS</span>
                            <h3 className="font-display text-lg md:text-xl font-extrabold tracking-tight text-white uppercase mt-0.5">Recommended Forensic Briefs</h3>
                            <p className="text-xs text-navy-slate mt-1">Supplementary blockchain intelligence reports on transaction tracking, wallet clusters, and exchange subpoenas.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                            {relatedArticles.map((rel) => (
                              <div 
                                key={rel.id} 
                                className="bg-navy-dark/45 border border-gold/10 hover:border-gold/30 rounded-xl p-5 transition flex flex-col justify-between space-y-4 hover:shadow-lg hover:shadow-gold/5"
                              >
                                <div className="space-y-2.5">
                                  <div className="flex items-center justify-between text-[9px] font-mono text-gold uppercase">
                                    <span>{rel.category}</span>
                                    <span className="text-navy-slate">{rel.readTime}</span>
                                  </div>
                                  <h4 
                                    onClick={() => setSelectedNewsId(rel.id)} 
                                    className="font-display text-xs font-bold text-white uppercase hover:text-gold cursor-pointer transition leading-snug line-clamp-2"
                                  >
                                    {rel.title}
                                  </h4>
                                  <p className="text-[11px] text-navy-slate line-clamp-2 leading-relaxed">
                                    {rel.summary}
                                  </p>
                                </div>
                                <div className="pt-2 border-t border-white/5">
                                  <button 
                                    onClick={() => setSelectedNewsId(rel.id)}
                                    className="text-[9.5px] font-mono text-gold hover:text-white uppercase font-bold tracking-wider flex items-center space-x-1 transition"
                                  >
                                    <span>Analyze Brief</span>
                                    <span>→</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                );
              })()
            ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gold/10 pb-6 gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest block">INTELLIGENCE REGISTRY</span>
                    <h1 className="font-display text-3xl font-extrabold tracking-normal text-white uppercase">Blockchain & Security News</h1>
                    <p className="text-xs text-navy-slate font-sans mt-1">
                      Our live news reports are synced in real time day-to-day directly from leading sources like <strong>CryptoPotato News</strong> and cybersecurity dispatches.
                    </p>
                  </div>
                </div>

                {/* 24/7 Forensic Live Chat Console */}
                <div 
                  id="jivo-trigger-card" 
                  className="rounded-xl border border-gold/35 bg-gold/5 p-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-6 relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="space-y-2 max-w-xl relative">
                    <div className="flex items-center space-x-2 text-gold">
                      <span className="h-2 w-2 rounded-full bg-emerald-405 bg-emerald-400 animate-pulse"></span>
                      <span className="font-mono text-xs font-bold tracking-widest uppercase">CONSOLIDATED LIVE SECURE DESK</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                      Real-Time Crypto Forensics Consulting (Miami, Florida)
                    </h3>
                    <p className="text-xs text-navy-slate leading-relaxed">
                      Need live analysis support, transaction hash quarantine tracking, or asset freezes under USA jurisdiction? Consult an active, on-duty investigator in real time. Absolute confidentiality and prompt SLA standards.
                    </p>
                  </div>
                  <div className="shrink-0 relative flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleActivateLiveChat}
                      className="w-full md:w-auto rounded bg-gold hover:bg-gold-hover px-6 py-3.5 font-display text-xs font-extrabold tracking-widest text-[#050b14] uppercase shadow-[0_4px_15px_rgba(212,175,55,0.2)] transition active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 text-[#050b14]" />
                      <span>Initiate Real-Time Chat</span>
                    </button>
                    <a
                      href="https://wa.me/16464256160"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto rounded bg-emerald-700 hover:bg-emerald-600 px-6 py-3.5 font-display text-xs font-extrabold tracking-widest text-white uppercase shadow-[0_4px_15px_rgba(16,185,129,0.2)] transition active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp Liaison Link</span>
                    </a>
                  </div>
                </div>

                {/* Controls Bar: Search and Category Filtering */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-navy-light/10 border border-white/5 p-4 rounded-xl">
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Blockchain Technology', 'Cybersecurity', 'Regulations', 'Investigations', 'Ethereum'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setNewsCategory(cat)}
                        className={`px-3 py-1.5 rounded font-display text-[10.5px] font-bold uppercase tracking-wide transition ${
                          newsCategory === cat 
                            ? 'bg-gold/15 border border-gold/30 text-gold font-bold' 
                            : 'border border-transparent text-navy-slate hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-navy-slate" />
                    <input
                      type="text"
                      placeholder="Search intelligence index..."
                      value={newsSearch}
                      onChange={(e) => setNewsSearch(e.target.value)}
                      className="w-full bg-navy-dark border border-gold/20 rounded pl-9 pr-4 py-2 text-xs text-white placeholder-navy-slate/55 outline-none focus:border-gold/60"
                    />
                  </div>
                </div>

                {/* News Lists Grid */}
                {newsLoading ? (
                  <div className="text-center py-20 animate-pulse">
                    <span className="font-mono text-xs text-gold">Accessing decrypted decentralized intelligence nodes...</span>
                  </div>
                ) : filteredNews.length === 0 ? (
                  <div className="text-center py-20 bg-navy-light/5 border border-white/5 rounded-xl">
                    <span className="font-mono text-xs text-navy-slate">No intelligence records match the filter query.</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((news) => (
                      <div key={news.id} className="glow-card rounded-xl border border-gold/15 bg-navy-light/10 overflow-hidden flex flex-col justify-between">
                        <div>
                          {news.imageUrl && (
                            <img 
                              src={news.imageUrl} 
                              alt={news.title}
                              referrerPolicy="no-referrer"
                              className="h-40 w-full object-cover border-b border-white/5 opacity-80 hover:opacity-100 transition"
                            />
                          )}
                          
                          <div className="p-5 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[9px] text-gold font-bold uppercase">{news.category}</span>
                              <span className="font-mono text-[9px] text-navy-slate">{news.date} • {news.readTime}</span>
                            </div>
                            <h4 className="font-display text-sm font-bold text-white uppercase leading-snug hover:text-gold transition">
                              {news.title}
                            </h4>
                            <p className="text-xs text-navy-slate leading-relaxed line-clamp-3">
                              {news.summary}
                            </p>
                          </div>
                        </div>

                        <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between">
                          <span className="font-mono text-[9px] text-navy-slate uppercase">{news.source}</span>
                          <button
                            onClick={() => setSelectedNewsId(news.id)}
                            className="text-xs hover:underline text-gold font-bold uppercase tracking-widest"
                          >
                            Read Brief →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* TAB: BLOG SECTION */}
        {currentTab === 'blog' && (
          <div id="blog-view" className="mx-auto max-w-7xl px-6 py-8 space-y-12">
            <div className="border-b border-gold/10 pb-6">
              <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest block">EXPERT INSIGHTS</span>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl">Trojan Investigative Journal</h1>
              <p className="text-sm text-navy-slate mt-1">Deep analysis files compiled by senior forensics specialists, scammers prevention protocols, and device audit walk-throughs.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Blog sidebar controls */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <label className="block font-display text-[9.5px] font-bold tracking-widest text-[#D4AF37] uppercase mb-1.5">Filter Categories</label>
                  <div className="flex flex-col space-y-1">
                    {['All', 'Cryptocurrency Recovery', 'Blockchain Investigations', 'Cybersecurity', 'Scam Prevention', 'Digital Forensics', 'Asset Tracing'].map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setBlogCategory(c);
                          setSelectedBlogId(null);
                        }}
                        className={`text-left px-3 py-2 rounded text-xs transition uppercase ${
                          blogCategory === c 
                            ? 'text-gold bg-gold/10 font-bold' 
                            : 'text-navy-slate hover:text-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter Box */}
                <div className="rounded-xl border border-gold/15 bg-navy-light/10 p-5 space-y-3.5">
                  <span className="font-display text-[10px] font-bold tracking-widest text-gold uppercase block">Trojan Intelligence Dispatch</span>
                  <p className="text-[11px] text-navy-slate leading-relaxed">Sign up to receive immediate zero-day vulnerability alerts and threat cluster briefs.</p>
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full bg-navy-dark border border-gold/20 rounded p-2 text-xs text-white outline-none focus:border-gold/50"
                  />
                  <button 
                    onClick={() => alert('Secure e-mail registered successfully under secure compliance registries.')}
                    className="w-full rounded bg-gold py-2 text-[10px] font-bold tracking-wider text-[#050b14] hover:bg-gold-hover transition uppercase"
                  >
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Blog Lists columns */}
              <div className="lg:col-span-3 space-y-8">
                {selectedBlogId ? (
                  // Detail Page
                  (() => {
                    const post = blogsList.find(p => p.id === selectedBlogId);
                    if (!post) return null;
                    return (
                      <div className="space-y-6 bg-navy-light/10 border border-white/5 p-6 md:p-8 rounded-2xl animate-in fade-in duration-300">
                        <button 
                          onClick={() => setSelectedBlogId(null)}
                          className="text-gold text-xs hover:underline flex items-center space-x-1 uppercase tracking-widest font-bold"
                        >
                          <span>← Back to Journals</span>
                        </button>

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3 text-xs text-navy-slate">
                              <span className="font-mono text-gold font-bold">{post.category}</span>
                              <span>•</span>
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                            <h2 className="font-display text-xl md:text-2xl font-bold tracking-normal text-white uppercase">{post.title}</h2>
                          </div>

                          <button
                            onClick={() => handleShare(post.id, 'blog')}
                            className="flex items-center space-x-2 rounded border border-gold/40 bg-gold/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold hover:text-navy-dark transition duration-200 shadow-sm shrink-0"
                          >
                            {shareCopied === post.id ? (
                              <>
                                <Check className="h-3.5 w-3.5" />
                                <span>Journal Link Copied!</span>
                              </>
                            ) : (
                              <>
                                <Share2 className="h-3.5 w-3.5" />
                                <span>Share Journal Brief</span>
                              </>
                            )}
                          </button>
                        </div>
                        
                        {/* Blog Post Banner Image */}
                        {post.imageUrl && (
                          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group max-h-[380px] w-full bg-navy-dark">
                            <img 
                              src={post.imageUrl} 
                              alt={post.title} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full max-h-[380px] object-cover opacity-85 hover:opacity-100 transition duration-300" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent opacity-60"></div>
                          </div>
                        )}
                        
                        {/* Author metadata */}
                        <div className="flex items-center space-x-3.5 pt-2 border-y border-white/5 py-4">
                          <img 
                            src={post.author.avatarUrl} 
                            alt={post.author.name} 
                            className="h-10 w-10 rounded-full border border-gold/20"
                          />
                          <div>
                            <span className="block text-xs font-bold text-white">{post.author.name}</span>
                            <span className="block font-mono text-[9.5px] text-gold uppercase">{post.author.role}</span>
                          </div>
                        </div>

                        <div className="text-sm text-navy-slate leading-relaxed font-sans space-y-4">
                          {renderMarkdownToReact(post.content)}
                          
                          <div className="h-2" />
                          <div className="border-t border-white/5 pt-4 text-[11.5px] italic text-navy-slate leading-relaxed">
                            Our forensic laboratories track automated change wallet chains, transaction mixers, and cross-chain routers dynamically. By isolating gas spending weights and contract creation code blocks, we compile structured compliance briefs directly for law enforcement subpoena procedures.
                          </div>
                        </div>

                        <div className="pt-4 flex flex-wrap gap-2 border-t border-white/5">
                          {post.tags.map(t => (
                            <span key={t} className="rounded bg-navy-light px-2.5 py-1 text-[9.5px] font-mono text-navy-slate uppercase">{t}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  // List Page
                  <div className="space-y-6">
                    {filteredBlogs.map((post) => (
                      <div key={post.id} className="glow-card rounded-xl border border-gold/15 bg-navy-light/10 p-5 flex flex-col md:flex-row gap-5 items-start">
                        {/* Blog Post Preview Image */}
                        <div 
                          onClick={() => setSelectedBlogId(post.id)}
                          className="w-full md:w-44 h-28 shrink-0 rounded-lg overflow-hidden border border-white/5 bg-navy-dark cursor-pointer group relative"
                        >
                          <img 
                            src={post.imageUrl || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=300"} 
                            alt={post.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-300"
                          />
                        </div>

                        {/* Blog Post Content and Meta */}
                        <div className="flex-1 space-y-2 w-full">
                          <div className="flex items-center justify-between text-xs text-navy-slate">
                            <span className="font-mono text-gold font-bold uppercase text-[10px]">{post.category}</span>
                            <span className="text-[10.5px]">{post.date} • {post.readTime}</span>
                          </div>
                          
                          <h3 
                            onClick={() => setSelectedBlogId(post.id)}
                            className="font-display text-sm font-bold text-white hover:text-gold cursor-pointer transition uppercase tracking-normal line-clamp-2"
                          >
                            {post.title}
                          </h3>
                          
                          <p className="text-xs text-navy-slate leading-relaxed line-clamp-2">
                            {post.summary}
                          </p>

                          <div className="flex justify-between items-center border-t border-white/5 pt-2.5 mt-1">
                            <span className="text-[10px] font-sans text-navy-slate">By <strong>{post.author.name}</strong></span>
                            <button 
                              onClick={() => setSelectedBlogId(post.id)}
                              className="text-xs text-gold hover:underline font-bold uppercase tracking-wider text-[11px]"
                            >
                              Read Full Dossier →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB: PUBLISHER DESK */}
        {currentTab === 'publisher' && (
          <div id="publisher-view" className="mx-auto max-w-7xl px-6 py-8 space-y-12">
            {!isPublisherLoggedIn ? (
              // SECURE LOGIN SYSTEM PANEL
              <div className="max-w-md mx-auto my-12 p-8 rounded-xl border border-gold/30 bg-navy-light/10 backdrop-blur-md space-y-6 shadow-2xl relative">
                <div className="absolute top-0 right-0 h-32 w-32 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-gold/30 bg-gold/10 text-gold mb-2">
                    <KeyRound className="h-6 w-6" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">Trojan Sovereign Core</h2>
                  <p className="text-xs text-navy-slate">Enter administrator credentials to authenticate signature block access.</p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  {loginError && (
                    <div className="p-3 rounded border border-rose-500/20 bg-rose-500/5 text-xs text-rose-400 font-mono flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold font-mono text-gold uppercase tracking-wider">Authorized Signature / E-mail</label>
                    <input
                      type="text"
                      required
                      placeholder="support@trojanrecovery.com"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      className="w-full bg-navy-dark border border-white/10 rounded-sm p-3 text-xs text-white placeholder-navy-slate/40 outline-none focus:border-gold transition font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold font-mono text-gold uppercase tracking-wider">Secure Cryptographic Passcode</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full bg-navy-dark border border-white/10 rounded-sm p-3 text-xs text-white outline-none focus:border-gold transition font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-sm bg-gradient-to-r from-gold to-gold-hover hover:opacity-95 py-3 font-display text-xs font-bold tracking-widest text-[#050b14] uppercase transition shadow-[0_4px_12px_rgba(212,175,55,0.15)] mt-2"
                  >
                    Establish Secure Session Key
                  </button>
                </form>

                <div className="pt-4 border-t border-white/5 text-[9.5px] font-mono text-center text-navy-slate leading-relaxed">
                  Confidential System • Restricted Admin Operations. IP logging active under SEC Rule 17a-4.
                </div>
              </div>
            ) : (
              // WRAPPED PUBLISHER DESK RENDER LAYOUT
              <>
                <div className="border-b border-gold/10 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest block">ADMINISTRATIVE PORTAL</span>
                    <h1 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl">Publisher Desk</h1>
                    <p className="text-sm text-navy-slate mt-1">Deploy, draft, and approve deep investigative blockchain reports, with professional real-time AI copywriting assistants.</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setIsPublisherLoggedIn(false);
                        setAdminPassword('');
                      }}
                      className="rounded-sm border border-rose-500/35 hover:border-rose-505 hover:border-rose-500 bg-rose-500/5 hover:bg-rose-500/10 px-3 py-1.5 font-mono text-[9px] font-bold text-rose-400 uppercase tracking-widest transition"
                    >
                      Logout Admin
                    </button>
                    <div className="flex items-center space-x-2 rounded-sm border border-gold/20 bg-gold/5 px-3 py-1.5 font-mono text-[10px] text-gold uppercase">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Active Server Database Sync</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Creator Forms (AI & Manual) */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* 1. AI WRITER ASSIST MODULE */}
                    <div className="rounded-xl border border-gold/25 bg-navy-light/15 p-6 space-y-6 relative overflow-hidden backdrop-blur-sm">
                      <div className="absolute top-0 right-0 h-24 w-24 bg-gold/5 rounded-full blur-2xl pointer-events-none"></div>
                      
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-gold" />
                        <h2 className="font-display text-base font-extrabold text-white uppercase tracking-wider">AI Forensic Writer Assist</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold font-mono text-gold uppercase mb-1">Target Analysis Objective or Incident Prompt</label>
                          <input
                            type="text"
                            placeholder="e.g. Broward County $1.2M multi-sig treasury drain and reverse transaction tracking ledger"
                            value={aiTopicPrompt}
                            onChange={(e) => setAiTopicPrompt(e.target.value)}
                            className="w-full bg-navy-dark border border-white/10 rounded-sm p-3 text-xs text-white outline-none focus:border-gold transition"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold font-mono text-gold uppercase mb-1">Dossier Category focus</label>
                            <select
                              value={aiSelectedCategory}
                              onChange={(e) => handleCategoryChange(e.target.value)}
                              className="w-full bg-navy-dark border border-white/10 rounded-sm p-2.5 text-xs text-white outline-none focus:border-gold"
                            >
                              <option value="Cryptocurrency Recovery">Cryptocurrency Recovery</option>
                              <option value="Blockchain Investigations">Blockchain Investigations</option>
                              <option value="Cybersecurity">Cybersecurity</option>
                              <option value="Scam Prevention">Scam Prevention</option>
                              <option value="Digital Forensics">Digital Forensics</option>
                              <option value="Asset Tracing">Asset Tracing</option>
                              <option value="Regulatory Compliance">Regulatory Compliance</option>
                            </select>
                          </div>

                          <div className="flex items-end">
                            <button
                              onClick={handleGenerateAiBlog}
                              disabled={isGeneratingAiDoc}
                              className="w-full h-[38px] rounded-sm bg-gradient-to-r from-gold to-gold-hover hover:opacity-90 font-display text-[10.5px] font-bold tracking-widest text-[#050b14] uppercase transition disabled:opacity-50"
                            >
                              {isGeneratingAiDoc ? "Constructing Analysis..." : "Generate Technical Dossier with AI ✨"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* AI PREVIEW SCREEN */}
                      {aiTempPost && (
                        <div className="rounded border border-gold/15 bg-[#050b14] p-5 space-y-4 animate-in fade-in duration-300">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <span className="font-mono text-[10px] text-gold font-bold uppercase">EDITORIAL REVIEW PANEL • LIVE MODIFICATION</span>
                            <span className="text-navy-slate font-mono text-[9px] uppercase">{aiTempPost.readTime}</span>
                          </div>

                          <div className="space-y-4 text-left">
                            <div>
                              <label className="block text-[10px] font-bold font-mono text-gold uppercase tracking-wider mb-1">Article Title</label>
                              <input
                                type="text"
                                value={aiTempPost.title || ''}
                                onChange={(e) => setAiTempPost({ ...aiTempPost, title: e.target.value })}
                                className="w-full bg-navy-dark border border-gold/20 rounded p-2.5 text-xs text-white outline-none focus:border-gold font-sans font-bold"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold font-mono text-gold uppercase tracking-wider mb-1">Meta Summary (Brief excerpt)</label>
                              <input
                                type="text"
                                value={aiTempPost.summary || ''}
                                onChange={(e) => setAiTempPost({ ...aiTempPost, summary: e.target.value })}
                                className="w-full bg-navy-dark border border-gold/20 rounded p-2.5 text-xs text-[#8892B0] outline-none focus:border-gold font-sans"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold font-mono text-gold uppercase tracking-wider mb-1">Comprehensive Forensic Content (Deep-Dive Journal)</label>
                              <textarea
                                rows={6}
                                value={aiTempPost.content || ''}
                                onChange={(e) => setAiTempPost({ ...aiTempPost, content: e.target.value })}
                                className="w-full bg-navy-dark border border-gold/20 rounded p-2.5 text-xs text-white outline-none focus:border-gold font-sans leading-relaxed"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold font-mono text-gold uppercase tracking-wider mb-1">Dossier Keywords (Separated by commas)</label>
                              <input
                                type="text"
                                value={Array.isArray(aiTempPost.tags) ? aiTempPost.tags.join(', ') : (aiTempPost.tags || '')}
                                onChange={(e) => setAiTempPost({ ...aiTempPost, tags: e.target.value.split(',').map((s: string) => s.trim()) })}
                                className="w-full bg-navy-dark border border-gold/20 rounded p-2.5 text-xs text-white outline-none focus:border-gold font-mono"
                              />
                            </div>

                            {aiTempPost.imageUrl && (
                              <div>
                                <label className="block text-[10px] font-bold font-mono text-gold uppercase tracking-wider mb-1.5">Lively Cyber Forensic Asset (Generated Post Image)</label>
                                <div className="relative rounded overflow-hidden border border-gold/15 bg-navy aspect-video max-h-48">
                                  <img 
                                    src={aiTempPost.imageUrl} 
                                    alt="Lively cyber assets placeholder" 
                                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-x-0 bottom-0 bg-black/75 p-2 border-t border-white/5 flex items-center justify-between text-[8.5px] font-mono text-gold">
                                    <span className="truncate max-w-xs">{aiTempPost.imageUrl}</span>
                                    <span className="shrink-0 uppercase bg-gold/10 text-gold px-1 rounded">Visual Matrix Stable</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                              onClick={() => handleSaveAiBlog(true)}
                              className="flex-1 rounded-sm bg-emerald-600 hover:bg-emerald-500 py-2.5 text-[10px] font-bold tracking-widest text-white uppercase transition"
                            >
                              Approve & Publish Live Forensic Report
                            </button>
                            <button
                              onClick={() => handleSaveAiBlog(false)}
                              className="flex-1 rounded border border-gold/40 text-gold hover:bg-gold/5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition"
                            >
                              Save Draft to pool
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                {/* 2. MANUAL WORKFLOW BLOCK */}
                <div className="rounded-xl border border-white/5 bg-navy-light/5 p-6 space-y-4">
                  <h2 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">Standard Article Intake (Manual Dispatch)</h2>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9.5px] font-bold font-mono text-navy-slate uppercase mb-1">Article Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Florida Crypto Recovery Laws Update"
                          value={manualTitle}
                          onChange={(e) => setManualTitle(e.target.value)}
                          className="w-full bg-navy-dark border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9.5px] font-bold font-mono text-navy-slate uppercase mb-1">Dossier Category</label>
                        <select
                          value={manualCategory}
                          onChange={(e) => setManualCategory(e.target.value)}
                          className="w-full bg-navy-dark border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold"
                        >
                          <option value="Cryptocurrency Recovery">Cryptocurrency Recovery</option>
                          <option value="Blockchain Investigations">Blockchain Investigations</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Scam Prevention">Scam Prevention</option>
                          <option value="Digital Forensics">Digital Forensics</option>
                          <option value="Asset Tracing">Asset Tracing</option>
                          <option value="Regulatory Compliance">Regulatory Compliance</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-bold font-mono text-navy-slate uppercase mb-1">Meta Summary (Brief excerpt)</label>
                      <input
                        type="text"
                        placeholder="Highly optimized meta outline snippet"
                        value={manualSummary}
                        onChange={(e) => setManualSummary(e.target.value)}
                        className="w-full bg-navy-dark border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-bold font-mono text-navy-slate uppercase mb-1 font-bold">Comprehensive Forensic Content (Deep-Dive Journal)</label>
                      <textarea
                        rows={8}
                        placeholder="Introduce thorough, technical blockchain investigation processes. Separated by dual newlines..."
                        value={manualContent}
                        onChange={(e) => setManualContent(e.target.value)}
                        className="w-full bg-navy-dark border border-white/10 rounded p-2.5 text-xs text-white outline-none focus:border-gold font-sans leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-bold font-mono text-navy-slate uppercase mb-1">Dossier Keywords (Separated by commas)</label>
                      <input
                        type="text"
                        placeholder="recover stolen cryptocurrency USA, blockchain tracing services Miami"
                        value={manualTags}
                        onChange={(e) => setManualTags(e.target.value)}
                        className="w-full bg-navy-dark border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => handlePublishManual(true)}
                        disabled={isPublishingManual}
                        className="flex-1 rounded-sm bg-gold py-2.5 text-[10px] font-bold tracking-widest text-[#050b14] hover:bg-gold-hover transition uppercase"
                      >
                        Publish Instantly to Live Feed
                      </button>
                      <button
                        onClick={() => handlePublishManual(false)}
                        disabled={isPublishingManual}
                        className="flex-1 rounded-sm border border-white/10 hover:border-gold/30 text-white hover:bg-white/5 py-2.5 text-[10px] font-bold tracking-widest transition uppercase"
                      >
                        Save as Awaiting Approval Draft
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Operations Control Panel / Database List */}
              <div className="lg:col-span-1 space-y-6">
                <div className="rounded-xl border border-white/10 bg-navy-light/10 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <h2 className="font-display text-xs font-extrabold text-white uppercase tracking-wider">Editorial Pool</h2>
                    <span className="font-mono text-[9px] rounded bg-white/5 px-2 py-0.5 text-navy-slate">({adminBlogsList.length} total)</span>
                  </div>

                  {adminBlogsList.length === 0 ? (
                    <p className="text-xs text-navy-slate text-center py-4">Database empty. Click generating buttons to seed dossier assets.</p>
                  ) : (
                    <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
                      {adminBlogsList.map((blog) => (
                        <div key={blog.id} className="rounded border border-white/5 p-3.5 space-y-2 bg-navy-dark">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[8vw] sm:text-[8px] text-navy-slate font-bold uppercase">{blog.category}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase block ${
                              blog.status === 'published' 
                                ? 'bg-emerald-500/10 text-emerald-500' 
                                : 'bg-amber-500/10 text-amber-500 animate-pulse'
                            }`}>
                              {blog.status === 'published' ? 'Active Published' : 'In Review'}
                            </span>
                          </div>

                          <h3 className="font-display text-xs font-bold text-white uppercase text-clamp-1">{blog.title}</h3>
                          
                          <div className="text-[10px] font-mono text-navy-slate flex items-center justify-between">
                            <span>{blog.date}</span>
                          </div>

                          <div className="flex items-center space-x-2 border-t border-white/5 pt-2">
                            {blog.status !== 'published' && (
                              <button
                                onClick={() => handleApproveBlog(blog.id)}
                                className="flex-1 flex items-center justify-center space-x-1 rounded bg-emerald-600/25 text-emerald-500 hover:bg-emerald-600/40 p-1.5 text-[9px] font-bold uppercase tracking-wider transition"
                                title="Approve & Publish Immediately"
                              >
                                <Check className="h-3 w-3" />
                                <span>Approve</span>
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 p-1.5 text-[9px] font-bold transition flex items-center justify-center"
                              title="Delete Record"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Secure Compliance Note */}
                <div className="rounded-xl border border-gold/15 bg-gold/5 p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-gold">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-display text-[9px] font-bold tracking-widest uppercase">Subpoena Readiness Warning</span>
                  </div>
                  <p className="text-[10px] text-navy-slate leading-relaxed">
                    All articles posted to the public ledger must abide by NIST frameworks. Unauthorized disclosure of suspect UTXO tracing sets prior to formal litigation service may prejudice ongoing recovery routines under Federal regulations.
                  </p>
                </div>
              </div>

            </div>

              </>
            )}
          </div>
        )}
        {currentTab === 'resources' && (
          <div id="resources-view" className="mx-auto max-w-7xl px-6 py-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-mono text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">DOWNLOADABLE DOCTRINES</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white uppercase">Forensic Resources Center</h2>
              <p className="text-sm text-navy-slate">Access court-grade whitepapers, transaction checklist, and cryptocurrency compliance manuals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESOURCES.map((r) => (
                <div key={r.id} className="glow-card rounded-xl border border-gold/15 p-6 bg-navy-light/10 space-y-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[9.5px] border border-gold/30 bg-gold/15 text-gold px-2 py-0.5 rounded font-bold uppercase">{r.category}</span>
                      <span className="font-mono text-[9px] text-[#8892B0]">{r.fileSize}</span>
                    </div>
                    <h3 className="mt-2.5 font-display text-sm font-bold text-white uppercase tracking-wide">{r.title}</h3>
                    <p className="mt-1.5 text-xs text-navy-slate leading-relaxed">{r.description}</p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-navy-slate">Downloads: {r.downloadCount} files</span>
                    <button
                      onClick={() => alert(`Starting secure download package [${r.title}]. Verified SHA-256 sealing codes attached.`)}
                      className="text-xs hover:underline text-gold font-bold uppercase tracking-wider flex items-center space-x-1.5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Obtain Secure Copy</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: FAQs */}
        {currentTab === 'faq' && (
          <div id="faq-view" className="mx-auto max-w-4xl px-6 py-8 space-y-12">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest block">INFORMATION CLEARINGHOUSE</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white uppercase">FAQ Directory</h2>
              <p className="text-sm text-navy-slate">Answers to critical questions regarding custody tracking, lock protocols, and legal coordination.</p>
            </div>

            {/* Real-time Search Engine Input */}
            <div className="relative max-w-xl mx-auto w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gold/60" />
              </div>
              <input
                id="faq-search-input"
                type="text"
                placeholder="Search queries (e.g., MetaMask, Bitcoin, law, tracking, mixers, etc.)"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full bg-navy-light/10 border border-gold/20 rounded-lg py-3 pl-10 pr-16 text-xs text-white placeholder-navy-slate/70 outline-none focus:border-gold/50 focus:bg-navy-light/20 transition duration-200"
              />
              {faqSearch && (
                <button
                  onClick={() => setFaqSearch('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[10px] text-gold/60 hover:text-gold uppercase tracking-wider font-bold font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-4">
              {(() => {
                const s = faqSearch.trim().toLowerCase();
                const filtered = FAQS.filter(faq => {
                  if (!s) return true;
                  return (
                    faq.question.toLowerCase().includes(s) ||
                    faq.answer.toLowerCase().includes(s) ||
                    faq.category.toLowerCase().includes(s)
                  );
                });

                if (filtered.length === 0) {
                  return (
                    <div className="text-center py-12 border border-dashed border-white/5 bg-navy-light/5 rounded-xl space-y-3">
                      <HelpCircle className="h-8 w-8 text-gold/40 mx-auto" />
                      <p className="text-xs text-navy-slate">No database matches found for "{faqSearch}".</p>
                      <button 
                        onClick={() => setFaqSearch('')}
                        className="px-3 py-1.5 rounded bg-gold/10 text-gold hover:bg-gold/20 text-[10px] font-mono tracking-wider uppercase font-bold transition"
                      >
                        Reset Search Filters
                      </button>
                    </div>
                  );
                }

                return filtered.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="glow-card rounded-lg border border-gold/15 bg-navy-light/10 overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full flex items-center justify-between p-5 text-left transition hover:bg-gold/5"
                      >
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] font-bold text-gold uppercase tracking-widest">{faq.category}</span>
                          <h4 className="font-display text-xs font-bold text-white uppercase tracking-wide leading-relaxed">{faq.question}</h4>
                        </div>
                        <ChevronDown className={`h-4.5 w-4.5 text-gold transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-5 pt-0 border-t border-white/5 bg-navy-dark/40 animate-in fade-in duration-200">
                          <p className="font-sans text-xs text-navy-slate/90 leading-relaxed pt-3.5 whitespace-pre-wrap">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}



        {/* TAB: CONTACT / REQUEST INVESTIGATION */}
        {currentTab === 'contact' && (
          <div id="contact-view" className="mx-auto max-w-7xl px-6 py-8 space-y-12 select-text">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest block">INITIATE LEDGER RECONCILIATION</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white uppercase">Request Rapid Incident Audit</h2>
              <p className="text-sm text-navy-slate">Provide incident details below. Our cyber forensics division responds within 2 hours to initiate blockchain mapping.</p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 items-start">
              
              {/* Form Coordinates */}
              <div className="lg:col-span-3 glow-card rounded-2xl border border-gold/25 p-6 md:p-8 space-y-6">
                
                {deployedCredentials ? (
                  // Intake Successfully Registered and Routed!
                  <div className="space-y-6 text-center p-6 border border-emerald-500/25 bg-emerald-950/10 rounded-xl animate-in zoom-in duration-300">
                    
                    {/* Subtle Interactive Lottie-style Success Animation */}
                    <div className="relative flex flex-col items-center justify-center py-2 overflow-hidden select-none">
                      <div className="relative flex items-center justify-center w-24 h-24">
                        {/* Interactive breathing outward ring ripple */}
                        <motion.div
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: [0.8, 1.4, 0.8], opacity: [0, 0.35, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 rounded-full bg-emerald-500/10 border-2 border-dashed border-emerald-500/20"
                        />
                        {/* Custom base glow sphere */}
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/15 to-emerald-950/20 border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                        />
                        
                        {/* Outer technical dash ring rotating slowly */}
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                          className="absolute w-[88%] h-[88%] rounded-full border border-dashed border-emerald-400/40 border-t-transparent border-b-transparent"
                        />
                        
                        {/* Shockwave expand ring on load */}
                        <motion.div
                          initial={{ scale: 0.4, opacity: 1 }}
                          animate={{ scale: 1.8, opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute w-12 h-12 rounded-full border border-emerald-400"
                        />

                        {/* Handcrafted animated check SVG */}
                        <svg className="w-12 h-12 text-emerald-400 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">Incident Track Registered</h3>
                      <p className="text-xs text-navy-slate leading-relaxed">
                        Your intake dossier has been successfully sealed with military-grade SHA-256 encryption & dispatched securely to our **Miami Cyber Intelligence Desk**.
                      </p>
                    </div>

                    <div className="rounded bg-navy-dark/95 p-4 border border-gold/15 max-w-md mx-auto space-y-1">
                      <span className="block font-mono text-[8.5px] text-[#8892B0] uppercase">SECURE DISPATCH TRACKING ID</span>
                      <span className="font-mono text-sm font-bold text-gold tracking-widest select-all">{deployedCredentials.caseId}</span>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5 max-w-md mx-auto">
                      <p className="text-xs text-[#CCD6F6] leading-relaxed">
                        To prioritize asset blockages and trigger immediate exchange subpoena tracing, tap below to consult our live forensics division or contact support directly at <strong className="text-white hover:text-gold transition">support@trojanrecovery.com</strong>.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={handleActivateLiveChat}
                          className="rounded bg-gold hover:bg-gold-hover px-5 py-3 text-xs font-bold tracking-widest text-[#050b14] transition duration-200 uppercase inline-flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Immediate Live Chat Support</span>
                        </button>
                        <a
                          href="https://wa.me/16464256160"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded bg-emerald-700 hover:bg-emerald-600 px-5 py-3 text-xs font-bold tracking-widest text-white transition duration-200 uppercase inline-flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>WhatsApp Liaison</span>
                        </a>
                        <button
                          onClick={() => {
                            setContactName('');
                            setContactCompany('');
                            setContactEmail('');
                            setContactPhone('');
                            setContactMsg('');
                            // reset
                            window.location.reload();
                          }}
                          className="rounded border border-gold/25 px-5 py-3 text-xs font-bold tracking-widest text-gold hover:bg-gold/10 transition duration-200 uppercase cursor-pointer"
                        >
                          Submit New Incident
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Active intake form
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-display text-[9px] font-bold tracking-widest text-gold uppercase mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Victim / Representative Name"
                          className="w-full rounded border border-gold/20 bg-navy-dark px-3 py-2 text-xs text-white placeholder-navy-slate/40 focus:border-gold/50 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-display text-[9px] font-bold tracking-widest text-gold uppercase mb-1">Company / Organization</label>
                        <input
                          type="text"
                          value={contactCompany}
                          onChange={(e) => setContactCompany(e.target.value)}
                          placeholder="Optional"
                          className="w-full rounded border border-gold/20 bg-navy-dark px-3 py-2 text-xs text-white placeholder-navy-slate/40 focus:border-gold/50 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-display text-[9px] font-bold tracking-widest text-gold uppercase mb-1">Business Email *</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="Secure Contact Mail"
                          className="w-full rounded border border-gold/20 bg-navy-dark px-3 py-2 text-xs text-white placeholder-navy-slate/40 focus:border-gold/50 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-display text-[9px] font-bold tracking-widest text-gold uppercase mb-1">Phone Coordinate</label>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="+1 (555) 012-3456"
                          className="w-full rounded border border-gold/20 bg-navy-dark px-3 py-2 text-xs text-white placeholder-navy-slate/40 focus:border-gold/50 outline-none"
                        />
                      </div>
                    </div>



                    <div>
                      <label className="block font-display text-[9px] font-bold tracking-widest text-gold uppercase mb-1">Incident Details & Suspicious Wallet Hashes *</label>
                      <textarea
                        required
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        placeholder="Please include transaction hashes, exchange communications, lost amount totals, and target blockchain names."
                        rows={4}
                        className="w-full rounded border border-gold/20 bg-navy-dark px-3 py-2.5 text-xs text-white placeholder-navy-slate/40 focus:border-gold/50 outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingIntake}
                      className="w-full rounded bg-gold py-3 text-xs font-bold tracking-widest text-navy-dark hover:bg-gold-hover transition duration-300 uppercase shadow-[0_4px_15px_rgba(212,175,55,0.2)] disabled:opacity-50"
                    >
                      {submittingIntake ? 'Sealing Cryptographic Envelopes...' : 'Launch Incident Triage Verification'}
                    </button>
                  </form>
                )}

              </div>

              {/* Vector Address Map & Coordinate detail column */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Global Forensic Operational Grid Map */}
                <div className="relative rounded-2xl border border-gold/15 bg-navy-light/10 p-5 space-y-4 shadow-xl">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2 flex items-center space-x-2">
                    <TrojanLogo className="h-4.5 w-4.5" />
                    <span>Global Operations Grid Map</span>
                  </h3>
                  
                  {/* Dynamic map graphics representing global secure nodes */}
                  <div className="relative h-44 rounded bg-navy-dark overflow-hidden border border-gold/10 flex items-center justify-center">
                    {/* Retro Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:14px_24px]" />
                    <span className="relative font-mono text-[9px] text-gold/30 uppercase text-center tracking-widest leading-none z-0">GLOBAL DEPLOYED FORENSIC NETWORKS</span>
                    
                    {/* Miami Cyber HQ Dot */}
                    <div className="absolute left-[18%] top-[55%] text-center z-10">
                      <span className="block h-2 w-2 rounded-full bg-gold animate-pulse mx-auto"></span>
                      <span className="text-[7.5px] font-mono text-white/60 block mt-0.5">MIAMI HQ</span>
                    </div>

                    {/* DC Node Dot */}
                    <div className="absolute left-[28%] top-[38%] text-center z-10">
                      <span className="block h-1.5 w-1.5 rounded-full bg-gold/80 animate-pulse mx-auto"></span>
                      <span className="text-[7.5px] font-mono text-white/50 block mt-0.5">DC NODE</span>
                    </div>

                    {/* UK Node Dot */}
                    <div className="absolute left-[48%] top-[28%] text-center z-10">
                      <span className="block h-1.5 w-1.5 rounded-full bg-gold/90 animate-pulse mx-auto"></span>
                      <span className="text-[7.5px] font-mono text-white/50 block mt-0.5">UK NODE</span>
                    </div>

                    {/* China Node Dot */}
                    <div className="absolute left-[76%] top-[42%] text-center z-10">
                      <span className="block h-1.5 w-1.5 rounded-full bg-gold/90 animate-pulse mx-auto"></span>
                      <span className="text-[7.5px] font-mono text-white/50 block mt-0.5">CHINA NODE</span>
                    </div>

                    {/* Singapore Node Dot */}
                    <div className="absolute left-[83%] top-[62%] text-center z-10">
                      <span className="block h-1.5 w-1.5 rounded-full bg-gold/90 animate-pulse mx-auto"></span>
                      <span className="text-[7.5px] font-mono text-white/50 block mt-0.5">SINGAPORE</span>
                    </div>
                  </div>

                  <div className="space-y-4 font-sans text-xs text-navy-slate">
                    <div className="flex items-start space-x-2.5">
                      <MapPin className="h-4.5 w-4.5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block uppercase text-[10.5px]">Miami Corporate & Forensic Headquarters</strong>
                        <span className="block text-[11px]">1830 Arbutus Drive, Miami, Florida (FL)</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Mail className="h-4.5 w-4.5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block uppercase text-[10.5px]">Secure Direct Address</strong>
                        <span className="block text-[11px] font-mono text-gold underline">support@trojanrecovery.com</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Phone className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block uppercase text-[10.5px]">WhatsApp Forensic Hotline</strong>
                        <a 
                          href="https://wa.me/16464256160" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block text-[11px] font-mono text-emerald-400 hover:underline font-bold"
                        >
                          +1 (646) 425-6160
                        </a>
                      </div>
                    </div>

                    {/* Global Active Support Nodes list to build E-E-A-T */}
                    <div className="border-t border-white/5 pt-3.5 space-y-2">
                      <span className="block font-mono text-[9px] text-[#8892B0] uppercase tracking-widest">Global Support Nodes & Jurisdictions</span>
                      <div className="grid grid-cols-3 gap-2 text-[10px]">
                        <div className="bg-navy-dark/60 border border-gold/10 rounded p-2 text-center">
                          <span className="text-white font-bold block">UNITED KINGDOM</span>
                          <span className="text-gold/80 text-[8.5px] font-mono">London</span>
                        </div>
                        <div className="bg-navy-dark/60 border border-gold/10 rounded p-2 text-center">
                          <span className="text-white font-bold block">CHINA NODE</span>
                          <span className="text-gold/80 text-[8.5px] font-mono">Hong Kong</span>
                        </div>
                        <div className="bg-navy-dark/60 border border-gold/10 rounded p-2 text-center">
                          <span className="text-white font-bold block">SINGAPORE</span>
                          <span className="text-gold/80 text-[8.5px] font-mono">SGP Hub</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps Interactive Card */}
                <div className="relative rounded-2xl border border-gold/15 bg-navy-light/10 overflow-hidden shadow-xl">
                  <div className="p-4 border-b border-white/5 bg-navy-dark/40 flex items-center justify-between">
                    <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gold flex items-center space-x-1.5">
                      <TrojanLogo className="h-4.5 w-4.5" />
                      <span>Miami Headquarters Location</span>
                    </h3>
                    <span className="text-[9px] font-mono text-[#8892B0] uppercase">Live View</span>
                  </div>
                  <div className="relative w-full h-48 bg-navy-dark">
                    <iframe
                      title="Trojan Recovery Miami HQ Live Google Map location"
                      src="https://maps.google.com/maps?q=1830%20Arbutus%20Drive,%20Miami,%20Florida&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ 
                        border: 0
                      }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    {/* Floating watermarked logo badge on the styled map */}
                    <div className="absolute top-3 right-3 flex items-center space-x-1.5 bg-[#0A192F]/90 backdrop-blur-md px-2.5 py-1.5 rounded-md border border-gold/45 shadow-lg pointer-events-none z-10">
                      <TrojanLogo className="h-4.5 w-4.5" />
                      <span className="text-[8.5px] font-mono font-bold tracking-wider text-white uppercase">TROJAN FORENSICS HQ</span>
                    </div>
                  </div>
                  <div className="p-3 bg-navy-dark/60 text-[10.5px] text-navy-slate font-mono border-t border-white/5 flex items-center justify-between">
                    <span>LAT: 25.76168° N • LON: -80.19179° W</span>
                    <span className="text-gold text-[9px] tracking-widest font-bold">ACTIVE FORENSICS DESK</span>
                  </div>
                </div>

                <div className="rounded-xl border border-gold/10 p-5 bg-navy-light/5 text-xs text-navy-slate leading-relaxed">
                  <strong>Corporate Notice:</strong> Case details and submissions are stored in isolated cryptographic environments. Trojan specialists never request seed-phrases or client wallet passwords.
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Live Marquee Ticker */}
      <div className="ticker-wrap border-y border-gold/30">
        <div className="ticker py-3 text-[10.5px] font-sans font-bold tracking-widest uppercase flex items-center shrink-0">
          <span className="text-black bg-white px-2 py-0.5 rounded-sm font-extrabold mx-4 shrink-0 text-[10px]">SYSTEM STATUS BRIEF:</span>
          {newsList && newsList.length > 0 ? (
            newsList.map((news, i) => (
              <span key={i} className="mx-6 text-navy-dark shrink-0 flex items-center space-x-1">
                <span>●</span> <span>[{news.category.toUpperCase()}] {news.title} — {news.date}</span>
              </span>
            ))
          ) : (
            <>
              <span className="mx-6 text-navy-dark shrink-0">● [CRITICAL] SECURE SYSTEM COLD WALLET AUDIT COMPLETED IN SWISS REPOSITORY</span>
              <span className="mx-6 text-navy-dark shrink-0">● [REGULATORY] SWISS AUTHORITY FORMALIZES OUTFLOW TRACKING STANDARD v2</span>
              <span className="mx-6 text-navy-dark shrink-0">● [THREAT MONITOR] COMPROMISED LAYER 2 PROTOCOL BRIDGES REPORTED AND CLUSTERED SAMPLES LOADED</span>
            </>
          )}
          
          {/* Double content for seamless looping */}
          <span className="text-black bg-white px-2 py-0.5 rounded-sm font-extrabold mx-4 shrink-0 text-[10px]">SYSTEM STATUS BRIEF:</span>
          {newsList && newsList.length > 0 ? (
            newsList.map((news, i) => (
              <span key={`dup-${i}`} className="mx-6 text-navy-dark shrink-0 flex items-center space-x-1">
                <span>●</span> <span>[{news.category.toUpperCase()}] {news.title} — {news.date}</span>
              </span>
            ))
          ) : (
            <>
              <span className="mx-6 text-navy-dark shrink-0">● [CRITICAL] SECURE SYSTEM COLD WALLET AUDIT COMPLETED IN SWISS REPOSITORY</span>
              <span className="mx-6 text-navy-dark shrink-0">● [REGULATORY] SWISS AUTHORITY FORMALIZES OUTFLOW TRACKING STANDARD v2</span>
              <span className="mx-6 text-navy-dark shrink-0">● [THREAT MONITOR] COMPROMISED LAYER 2 PROTOCOL BRIDGES REPORTED AND CLUSTERED SAMPLES LOADED</span>
            </>
          )}
        </div>
      </div>

      {/* 3. Immersive Trust & Compliance Panel */}
      <section className="mx-auto max-w-7xl px-6 py-8 border-t border-gold/5 bg-navy-light/5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="h-6 w-6 text-gold shrink-0" />
            <div>
              <span className="block font-display text-xs font-bold text-white uppercase tracking-wider">End-to-End Encryption</span>
              <span className="text-xs text-navy-slate">Case records, uploaded file hashes, and messages are backed by offline secure nodes.</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Globe className="h-6 w-6 text-gold shrink-0" />
            <div>
              <span className="block font-display text-xs font-bold text-white uppercase tracking-wider">GDPR & GML Compliant</span>
              <span className="text-xs text-navy-slate">Operations follow global compliance rules under Switzerland and Cayman sovereign laws.</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FileCheck className="h-6 w-6 text-gold shrink-0" />
            <div>
              <span className="block font-display text-xs font-bold text-white uppercase tracking-wider">NIST Forensic Standards</span>
              <span className="text-xs text-navy-slate">Evidence mapping files follow professional legal processes and litigation guidelines.</span>
            </div>
          </div>
        </div>
      </section>



      {/* 5. Footer Sitemap */}
      <footer className="border-t border-gold/10 bg-navy-dark pt-12 text-xs text-navy-slate">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 gap-8 md:grid-cols-4 pb-8">
          
          {/* Logo & overview */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gold/10 border border-gold/30">
                <TrojanLogo className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-white uppercase">Trojan Recovery</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Tracing digital assets and delivering financial justice through elite cryptographic analysis and law enforcement coordinate networks globally.
            </p>
          </div>

          {/* Quick Sitemap Links */}
          <div className="space-y-3">
            <span className="block font-display text-[9.5px] font-bold tracking-widest text-gold uppercase">Investigation Suites</span>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => setTab('services')} className="hover:text-gold transition py-1 text-left w-full cursor-pointer">UTXO Clustering & Analysis</button></li>
              <li><button onClick={() => setTab('services')} className="hover:text-gold transition py-1 text-left w-full cursor-pointer">Scam Tracing Support</button></li>
              <li><button onClick={() => setTab('services')} className="hover:text-gold transition py-1 text-left w-full cursor-pointer">Digital Forensics Device Audits</button></li>
              <li><button onClick={() => setTab('services')} className="hover:text-gold transition py-1 text-left w-full cursor-pointer">Compliance Risk Profiling</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <span className="block font-display text-[9.5px] font-bold tracking-widest text-gold uppercase">Resources Hub</span>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => setTab('resources')} className="hover:text-gold transition py-1 text-left w-full cursor-pointer">Victim Evidentiary Checklists</button></li>
              <li><button onClick={() => setTab('resources')} className="hover:text-gold transition py-1 text-left w-full cursor-pointer">Certified Blockchain Whitepapers</button></li>
              <li><button onClick={() => setTab('blog')} className="hover:text-gold transition py-1 text-left w-full cursor-pointer">Anti-phishing Technical Guides</button></li>
              <li><button onClick={() => setTab('faq')} className="hover:text-gold transition py-1 text-left w-full cursor-pointer">Legal Subpoena Procedures FAQ</button></li>
              <li><button onClick={() => setTab('publisher')} className="text-gold/90 hover:text-gold transition py-1 text-left w-full font-bold cursor-pointer flex items-center space-x-1"><span>Publisher Desk (Admin)</span></button></li>
            </ul>
          </div>

          {/* Corporate info */}
          <div className="space-y-3">
            <span className="block font-display text-[9.5px] font-bold tracking-widest text-gold uppercase">Corporate Registries</span>
            <p className="text-[11px] leading-relaxed">
              Trojan Recovery is a premier US-based blockchain intelligence agency. Headquartered in Miami, Florida, with support hubs serving federal, municipal, and commercial clients nationwide.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setTab('publisher');
                  setTimeout(() => {
                    const el = document.getElementById('publisher-view');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 150);
                }}
                className="inline-flex w-full items-center justify-center space-x-1.5 rounded-sm border border-gold/30 bg-gold/5 hover:bg-gold/15 py-2 px-3 text-[10px] font-mono font-bold tracking-widest text-gold hover:text-white transition duration-200 uppercase cursor-pointer"
              >
                <KeyRound className="h-3.5 w-3.5 text-gold" />
                <span>Publisher Desk (Admin)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Legal disclosures & terms */}
        <div className="border border-white/5 bg-navy-dark/95 py-6">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center text-[10px] space-y-4 md:space-y-0">
            <div>
              <span>© {new Date().getFullYear()} Trojan Recovery. All Rights Reserved. Private Ledger Encryption Active.</span>
            </div>
            <div className="flex space-x-4">
              <span className="uppercase text-[#8892B0]">Privacy Directive Protected</span>
              <span>•</span>
              <span className="uppercase text-[#8892B0]">US Cyber & Forensics Code Enforced</span>
            </div>
          </div>
        </div>

      </footer>

    </div>
  );
}
