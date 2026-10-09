const fs = require('fs');
['features/landing/components/Header.tsx', 'features/landing/components/Footer.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/src="https:\/\/lh3\.googleusercontent\.com\/aida\/AEtjO[^"]+"/g, 'src="/logo.avif"');
  content = content.replace(/alt="Image from https:\/\/cdn\.prod\.website[^"]+"/g, 'alt="The Sapients Logo"');
  fs.writeFileSync(file, content);
  console.log('Updated', file);
});
