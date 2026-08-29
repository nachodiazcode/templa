export type OfficeKind = 'pptx' | 'docx';
export type OfficeFormat = 'powerpoint' | 'word';

export interface OfficeItem {
  id: string;
  kind: OfficeKind;
  format: OfficeFormat;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  colors: [string, string];
  slides: number; // diapositivas o páginas
  downloads: number;
  releasedAt: string; // ISO
  features: string[];
}