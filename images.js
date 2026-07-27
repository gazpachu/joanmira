const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

let files = [];
let filesToRemove = [];

const scriptArgs = process.argv.slice(2);
const command = scriptArgs[0];

switch (command) {
  case 'clean':
    clean();
    break;
  case 'generate':
    generate();
    break;
  default:
    console.log(`Command is missing.`);
    process.exit(1);
}

async function clean() {
  filesToRemove = [];
  await findGeneratedImages('pages');
  filesToRemove.forEach((file) => {
    try {
      if (fs.existsSync(file)) fs.unlinkSync(file);
    } catch (err) {
      console.error(`Failed to delete ${file}:`, err);
    }
  });
}

async function generate() {
  files = [];
  await findImages('public');
  // Use a sequential loop so sharp processes images one at a time, avoiding file lock issues on Windows
  for (const file of files) {
    await resizeImages(file);
  }
}

async function findGeneratedImages(directory) {
  if (!fs.existsSync(directory)) return;

  const entries = fs.readdirSync(directory);
  for (const file of entries) {
    const absolutePath = path.join(directory, file);
    if (fs.statSync(absolutePath).isDirectory()) {
      await findGeneratedImages(absolutePath);
    } else if (absolutePath.endsWith('.webp') || absolutePath.includes('-mobile.')) {
      filesToRemove.push(absolutePath);
    }
  }
}

async function findImages(directory) {
  if (!fs.existsSync(directory)) return;

  const entries = fs.readdirSync(directory);
  for (const file of entries) {
    const absolutePath = path.join(directory, file);
    if (fs.statSync(absolutePath).isDirectory()) {
      await findImages(absolutePath);
    } else {
      const ext = path.extname(absolutePath).toLowerCase();
      if ((ext === '.jpg' || ext === '.jpeg' || ext === '.png') && !absolutePath.includes('-mobile.')) {
        files.push(absolutePath);
      }
    }
  }
}

async function resizeImages(file) {
  const ext = path.extname(file);
  const basePath = file.slice(0, -ext.length);

  const webpPath = `${basePath}.webp`;
  const mobileImgPath = `${basePath}-mobile${ext}`;
  const mobileWebpPath = `${basePath}-mobile.webp`;

  // Skip if all 3 variants already exist
  if (fs.existsSync(webpPath) && fs.existsSync(mobileImgPath) && fs.existsSync(mobileWebpPath)) {
    return;
  }

  console.log(`Resizing ${file}`);

  try {
    if (!fs.existsSync(webpPath)) {
      await sharp(file).toFile(webpPath);
    }
    if (!fs.existsSync(mobileImgPath)) {
      await sharp(file).resize(768).toFile(mobileImgPath);
    }
    if (!fs.existsSync(mobileWebpPath)) {
      await sharp(file).resize(768).toFile(mobileWebpPath);
    }
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
}