const fs = require('fs');

const map = {
  'Hero.tsx': 'inicio',
  'Pillars.tsx': 'los-3-pilares',
  'Mentor.tsx': 'el-mentor',
  'Testimonials.tsx': 'testimonios',
  'Pricing.tsx': 'inscribirse-ahora',
  'FAQ.tsx': 'preguntas-frecuentes'
};

for (const [file, id] of Object.entries(map)) {
  const path = 'features/landing/components/' + file;
  let content = fs.readFileSync(path, 'utf8');
  if (file === 'FAQ.tsx') {
    content = content.replace('id="faq"', 'id="' + id + '"');
  } else if (!content.includes('id="' + id + '"')) {
    content = content.replace('<section className="', '<section id="' + id + '" className="');
  }
  fs.writeFileSync(path, content);
  console.log('Added id', id, 'to', file);
}

// Update Header links
let header = fs.readFileSync('features/landing/components/Header.tsx', 'utf8');
header = header.replace(/data-path="([^"]+)" href="#"/g, 'href="#$1"');
fs.writeFileSync('features/landing/components/Header.tsx', header);
console.log('Updated Header links');

// Update Footer links
let footer = fs.readFileSync('features/landing/components/Footer.tsx', 'utf8');
footer = footer.replace(/data-path="([^"]+)" href="#"/g, 'href="#$1"');
fs.writeFileSync('features/landing/components/Footer.tsx', footer);
console.log('Updated Footer links');
