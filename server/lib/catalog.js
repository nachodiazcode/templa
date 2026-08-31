import fs from 'node:fs';
import path from 'node:path';
import { moduleDir } from './resolve.js';
import { reviewSummary } from './vault.js';
import catalogRaw from '../catalog.json' with { type: 'json' };

const __dirname = moduleDir();
const RAW = catalogRaw;

/* Campos ricos (marketing/social) que catalog.json no incluye.
   Mantenidos aquí como fuente única para servir un catálogo completo. */
const RICH = {
  aurora: {
    description:
      'Aurora es una landing hecha solo con HTML5 y CSS moderno: sin build, sin dependencias y con Lighthouse perfecto. Incluye tema dual persistente, bento grid responsive y animaciones de scroll accesibles.',
    category: 'landing', accent: '#c084fc', oldPrice: null, sales: 1870,
    isFeatured: true, isNew: true, releasedAt: '2026-08-24',
  },
  'nova-saas': {
    description:
      'Nova SaaS es la plantilla definitiva para lanzar tu producto digital. Incluye landing de alta conversión, pricing dinámico, blog integrado y panel de cliente, con un sistema de diseño completo.',
    category: 'saas', accent: '#8b5cf6', oldPrice: 129, sales: 1830,
    isFeatured: true, isNew: true, releasedAt: '2026-07-02',
  },
  'atlas-store': {
    description:
      'Tienda online completa con fichas de producto inmersivas, checkout optimizado, filtros instantáneos y wishlist. Pensada para marcas que quieren una experiencia de compra premium.',
    category: 'ecommerce', accent: '#f97316', oldPrice: null, sales: 1420,
    isFeatured: true, isNew: false, releasedAt: '2026-05-18',
  },
  'lumen-landing': {
    description:
      'Una landing limpia y directa: hero cinematográfico, secciones que cuentan tu historia y CTAs que convierten. Perfecta para apps móviles, cursos o campañas.',
    category: 'landing', accent: '#38bdf8', oldPrice: null, sales: 5210,
    isFeatured: false, isNew: false, releasedAt: '2026-04-10',
  },
  monogram: {
    description:
      'Portfolio editorial con transiciones de página suaves, casos de estudio a pantalla completa y una galería que hace que tu trabajo hable por ti.',
    category: 'portfolio', accent: '#e11d48', oldPrice: 69, sales: 980,
    isFeatured: true, isNew: false, releasedAt: '2026-03-22',
  },
  'pulse-dashboard': {
    description:
      'Panel de administración con más de 30 componentes: gráficas animadas, tablas inteligentes, calendario y sistema de roles. Todo con datos reactivos desde el primer segundo.',
    category: 'dashboard', accent: '#14b8a6', oldPrice: null, sales: 1240,
    isFeatured: false, isNew: true, releasedAt: '2026-07-28',
  },
  'ink-blog': {
    description:
      'Tipografía cuidada, modo lectura y newsletter integrada. Ink convierte visitantes en lectores fieles con una experiencia de blog impecable.',
    category: 'blog', accent: '#fb7185', oldPrice: null, sales: 3980,
    isFeatured: false, isNew: false, releasedAt: '2026-02-14',
  },
  'orbit-startup': {
    description:
      'Web completa para startups: producto, equipo, careers y blog. Con animaciones profesionales y un sistema de contenido fácil de mantener.',
    category: 'saas', accent: '#818cf8', oldPrice: null, sales: 860,
    isFeatured: false, isNew: false, releasedAt: '2026-01-30',
  },
  'crate-shop': {
    description:
      'Vende ebooks, cursos o assets digitales con una tienda ligera y elegante. Página de producto con previews, reseñas y entrega automática.',
    category: 'ecommerce', accent: '#a3e635', oldPrice: null, sales: 2760,
    isFeatured: false, isNew: true, releasedAt: '2026-08-05',
  },
  'frame-folio': {
    description:
      'Galerías inmersivas con navegación por gestos, lightbox cinematográfico y modo exposición. Para fotógrafos y artistas visuales.',
    category: 'portfolio', accent: '#60a5fa', oldPrice: null, sales: 430,
    isFeatured: false, isNew: false, releasedAt: '2025-12-12',
  },
  'launch-one': {
    description:
      'La plantilla perfecta antes del lanzamiento: cuenta atrás, waitlist viral con posición en cola y actualizaciones por email.',
    category: 'landing', accent: '#e879f9', oldPrice: null, sales: 620,
    isFeatured: false, isNew: false, releasedAt: '2025-11-08',
  },
  'ledger-finance': {
    description:
      'Visualiza KPIs financieros, flujos de caja y proyecciones con un dashboard serio y elegante. Exportación a PDF incluida.',
    category: 'dashboard', accent: '#0284c7', oldPrice: 119, sales: 540,
    isFeatured: false, isNew: false, releasedAt: '2026-06-15',
  },
  'journal-minimal': {
    description:
      'Menos es más: un blog ultra rápido, sin distracciones, con tipografía serif moderna y RSS. Ideal para escritores.',
    category: 'blog', accent: '#d6d3d1', oldPrice: null, sales: 310,
    isFeatured: false, isNew: false, releasedAt: '2026-03-03',
  },
  'solaris-portfolio': {
    description:
      'Portfolio fotográfico inmersivo con lightbox y filtros: galería masonry, sección about y tema dual. Para fotógrafos y artistas visuales.',
    category: 'portfolio', accent: '#e879f9', oldPrice: null, sales: 2840,
    isFeatured: true, isNew: false, releasedAt: '2026-01-12',
  },
  'nexa-saas': {
    description:
      'SaaS landing con pricing, mockup y automatizaciones IA: hero interactivo, bento grid de features, FAQ nativo y testimonios.',
    category: 'saas', accent: '#22d3ee', oldPrice: 69, sales: 1560,
    isFeatured: true, isNew: true, releasedAt: '2026-08-10',
  },
};

let catalogCache = null;

export function getCatalog() {
  if (catalogCache) return catalogCache;
  catalogCache = RAW.map((t) => {
    const rich = RICH[t.id] || {};
    const summary = reviewSummary(t.id);
    return {
      ...t,
      description: rich.description || t.tagline || '',
      category: rich.category || 'landing',
      accent: rich.accent || t.colors?.[0] || '#7c3aed',
      oldPrice: rich.oldPrice ?? null,
      rating: summary.reviews ? summary.rating : rich.rating ?? 0,
      reviews: summary.reviews,
      sales: rich.sales ?? 0,
      isFeatured: rich.isFeatured ?? false,
      isNew: rich.isNew ?? false,
      releasedAt: rich.releasedAt || null,
    };
  });
  return catalogCache;
}

/** Invalida el catálogo enriquecido (p. ej. cuando cambian las reviews). */
export function invalidateCatalog() {
  catalogCache = null;
}

export function getCatalogItem(id) {
  return getCatalog().find((t) => t.id === id) || null;
}
