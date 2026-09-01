const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = execSync('find src -name "*.scss"').toString().split('\n').filter(Boolean);

const replacements = [
  { from: /#8b5cf6/g, to: '#f43f5e' },
  { from: /139,\s*92,\s*246/g, to: '244, 63, 94' },
  { from: /#22d3ee/g, to: '#f59e0b' },
  { from: /34,\s*211,\s*238/g, to: '245, 158, 11' },
  { from: /#c084fc/g, to: '#fb7185' },
  { from: /#a78bfa/g, to: '#fda4af' },
  { from: /#06b6d4/g, to: '#d97706' },
  { from: /#6d28d9/g, to: '#be123c' }
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  for (const rep of replacements) {
    content = content.replace(rep.from, rep.to);
  }
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
