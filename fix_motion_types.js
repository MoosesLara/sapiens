const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/Simatec/Desktop/proyectos/sapiens/sapiens/features/landing/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('type: "spring"')) {
    content = content.replace(/type: "spring"/g, 'type: "spring" as any');
    fs.writeFileSync(filePath, content);
  }
}
console.log('Fixed types');
