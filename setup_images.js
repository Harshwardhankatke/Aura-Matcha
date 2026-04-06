const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'public', 'sequence');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

let count = 0;
// Note: original files are ezgif-frame-001.jpg up to 280. We need 280.
for (let i = 1; i <= 280; i++) {
  // Add padding: 001, 002, 010, etc.
  const paddedIndex = i.toString().padStart(3, '0');
  const srcFile = path.join(srcDir, `ezgif-frame-${paddedIndex}.jpg`);
  const destFile = path.join(destDir, `frame_${i - 1}.jpg`);

  if (fs.existsSync(srcFile)) {
    fs.renameSync(srcFile, destFile);
    count++;
  } else {
    console.warn(`File not found: ${srcFile}`);
  }
}

console.log(`Successfully moved and renamed ${count} images to public/sequence.`);
