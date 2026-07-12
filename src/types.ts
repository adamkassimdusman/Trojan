export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  benefits: string[];
  methodologies: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  shortDesc: string;
  details: string;
  duration: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  assetLost: string;
  assetRecovered: string;
  challenge: string;
  forensics: string[];
  outcome: string;
  timeline: string;
  badge: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Bitcoin' | 'Ethereum' | 'Altcoins' | 'Blockchain Technology' | 'Cybersecurity' | 'Regulations' | 'Investigations';
  source: string;
  date: string;
  readTime: string;
  imageUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Cryptocurrency Recovery' | 'Blockchain Investigations' | 'Cybersecurity' | 'Scam Prevention' | 'Digital Forensics' | 'Asset Tracing' | 'Regulatory Compliance' | string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  imageUrl?: string;
  status?: 'draft' | 'awaiting_approval' | 'published';
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Guides' | 'Whitepapers' | 'Industry Reports' | 'Investigation Checklists' | 'Educational Content';
  description: string;
  fileSize: string;
  downloadCount: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  targetKeyword?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  isVerified: boolean;
}


