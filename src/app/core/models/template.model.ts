export type TemplateCategory =
  | 'saas'
  | 'ecommerce'
  | 'landing'
  | 'portfolio'
  | 'blog'
  | 'dashboard'
  | 'agency'
  | 'education'
  | 'documentation'
  | 'admin-panel';

export interface TemplateItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: TemplateCategory;
  price: number; // 0 = gratis
  oldPrice?: number;
  rating: number;
  reviews: number;
  sales: number;
  tech: string[];
  features: string[];
  pages: number;
  colors: [string, string];
  accent: string;
  isNew?: boolean;
  isFeatured?: boolean;
  releasedAt: string; // ISO
}

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  saas: 'SaaS',
  ecommerce: 'E-commerce',
  landing: 'Landing',
  portfolio: 'Portfolio',
  blog: 'Blog',
  dashboard: 'Dashboard',
  agency: 'Agency',
  education: 'Education',
  documentation: 'Documentation',
  'admin-panel': 'Admin Panel',
};
