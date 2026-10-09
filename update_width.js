const fs = require('fs');
const path = require('path');
const dir = 'features/landing/components/';

const files = [
  'UrgencyRibbon.tsx',
  'Testimonials.tsx',
  'Qualification.tsx',
  'Pillars.tsx',
  'Mentor.tsx',
  'ManifestoTicker.tsx',
  'Footer.tsx',
  'Hero.tsx',
  'Pricing.tsx',
  'FAQ.tsx',
  'MindsetQuote.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  content = content.replace(/max-w-(7xl|6xl|5xl|4xl|3xl)/, 'w-[90%] max-w-[1600px]');
  fs.writeFileSync(path.join(dir, file), content);
  console.log('Updated', file);
});
