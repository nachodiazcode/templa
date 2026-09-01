#!/usr/bin/env node
// Script to generate preview HTMLs for all 15 templates

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Use Angular's TS compilation
const outDir = path.join(__dirname, 'preview-outputs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// Run ts-node to generate all previews
const script = `
import { TEMPLATES } from './src/app/core/data/templates.data';
import { buildPreviewHtml } from './src/app/core/services/preview.builder';
import * as fs from 'fs';
import * as path from 'path';

const outDir = path.join(process.cwd(), 'preview-outputs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

for (const t of TEMPLATES) {
  const html = buildPreviewHtml(t as any);
  fs.writeFileSync(path.join(outDir, t.id + '.html'), html, 'utf8');
  console.log('Generated:', t.id);
}
`;

fs.writeFileSync(path.join(__dirname, 'gen-previews.ts'), script);
console.log('Script written');
