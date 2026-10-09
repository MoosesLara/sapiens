const fs = require('fs');
const path = require('path');

const pageContent = fs.readFileSync('app/page.tsx', 'utf8');

const sections = [
  { name: 'Header', startStr: '<header', endStr: '</header>' },
  { name: 'UrgencyRibbon', startStr: '{/*  TOP URGENCY / SOLD OUT NOTICE RIBBON  */}', endStr: '</aside>' },
  { name: 'Hero', startStr: '{/*  SECTION 1: HERO', endStr: '</section>' },
  { name: 'ManifestoTicker', startStr: '{/*  SECTION 2: GOLD MANIFESTO', endStr: '</section>' },
  { name: 'MindsetQuote', startStr: '{/*  SECTION 3: MANIFESTO & MINDSET', endStr: '</section>' },
  { name: 'Pillars', startStr: '{/*  SECTION 4: THE 3 PILLARS', endStr: '</section>' },
  { name: 'Mentor', startStr: '{/*  SECTION 5: EL MENTOR', endStr: '</section>' },
  { name: 'Testimonials', startStr: '{/*  SECTION 6: SOCIAL PROOF', endStr: '</section>' },
  { name: 'Qualification', startStr: '{/*  SECTION 7: QUALIFICATION MATRIX', endStr: '</section>' },
  { name: 'Pricing', startStr: '{/*  SECTION 8: PRICING & REGISTRATION', endStr: '</section>' },
  { name: 'FAQ', startStr: '{/*  SECTION 9: FREQUENTLY ASKED QUESTIONS', endStr: '</section>' },
  { name: 'Footer', startStr: '<footer', endStr: '</footer>' }
];

const featuresDir = path.join(process.cwd(), 'features', 'landing', 'components');
fs.mkdirSync(featuresDir, { recursive: true });

let remainingPage = pageContent;
let imports = [`import Image from 'next/image';`];
let componentCalls = [];

sections.forEach(sec => {
  const startIndex = remainingPage.indexOf(sec.startStr);
  if (startIndex === -1) {
    console.log(`Could not find ${sec.name}`);
    return;
  }
  
  const endIndexOffset = remainingPage.indexOf(sec.endStr, startIndex);
  if (endIndexOffset === -1) {
    console.log(`Could not find end of ${sec.name}`);
    return;
  }
  
  const endIndex = endIndexOffset + sec.endStr.length;
  
  let sectionContent = remainingPage.substring(startIndex, endIndex);
  
  // Fix the Logo URLs manually during extraction
  sectionContent = sectionContent.replace(/src="[^"]+website-files[^"]+logos%20sapients[^"]+"/g, 'src="/logo.avif"');
  
  // Convert <img> to <Image>
  sectionContent = sectionContent.replace(/<img([^>]+)src="([^"]+)"([^>]*)>/g, (match, p1, src, p2) => {
    let alt = 'Image';
    const altMatch = match.match(/alt="([^"]+)"/);
    if(altMatch) alt = altMatch[1];
    
    let extra = ' width={500} height={300}';
    if (src.includes('logo')) {
      extra = ' width={160} height={32}';
    } else if (match.includes('w-14 h-14') || src.includes('Portrait')) {
      extra = ' width={56} height={56}';
    } else if (match.includes('w-full h-full')) {
      extra = ' width={1200} height={800}';
    }
    
    let cleanAttrs = (p1 + p2).replace(/alt="[^"]*"/, '').replace(/data-alt="[^"]*"/, '');
    return `<Image src="${src}" alt="${alt}"${extra}${cleanAttrs}/>`;
  });
  
  // Extract custom script block at the bottom of FAQ
  if (sec.name === 'FAQ') {
    sectionContent = sectionContent.replace(/<script[\s\S]*?<\/script>/, '');
  }

  const componentCode = `import Image from 'next/image';\n\nexport default function ${sec.name}() {\n  return (\n    <>\n      ${sectionContent}\n    </>\n  );\n}\n`;
  fs.writeFileSync(path.join(featuresDir, `${sec.name}.tsx`), componentCode);
  
  remainingPage = remainingPage.replace(remainingPage.substring(startIndex, endIndex), `<${sec.name} />`);
});

const newPageCode = `
import React from 'react';
${sections.map(s => `import ${s.name} from '../../features/landing/components/${s.name}';`).join('\n')}

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-carbon-void relative min-h-screen">
        <div className="flex flex-col w-full text-on-surface">
          <UrgencyRibbon />
          <Hero />
          <ManifestoTicker />
          <MindsetQuote />
          <Pillars />
          <Mentor />
          <Testimonials />
          <Qualification />
          <Pricing />
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
`;

fs.writeFileSync('app/page.tsx', newPageCode);
console.log('Refactoring complete!');
