const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf8');
let newContent = content.replace(/\n\s*fabric:\s*".*",/g, '');
newContent = newContent.replace(/\n\s*modelInfo:\s*".*",/g, '');
newContent = newContent.replace(/image:\s*([a-zA-Z]+),/g, 'images: [$1],');
fs.writeFileSync('src/data/products.ts', newContent);
