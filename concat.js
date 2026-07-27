// concat.js
const fs = require('fs');
const path = require('path');

const [, , targetDir, outputFile] = process.argv;

if (!targetDir || !outputFile) {
  console.error('Usage: node concat.js <directory> <outputFile>');
  process.exit(1);
}

const outputPath = path.join(targetDir, outputFile);
const ext = path.extname(outputFile);

const files = fs.readdirSync(targetDir)
  .filter(file => file.endsWith(ext) && file !== outputFile && !file.includes('.min.'));

const content = files
  .map(file => {
    const fileContent = fs.readFileSync(path.join(targetDir, file), 'utf8');
    // Wrap JS files in IIFEs to create private block scopes
    return ext === '.js' ? `(() => {\n${fileContent}\n})();` : fileContent;
  })
  .join('\n\n');

fs.writeFileSync(outputPath, content);