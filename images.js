const sharp = require('sharp');
const path = require("path");
const fs = require("fs");
let files = [];

function findImages(directory) {
  fs.readdirSync(directory).forEach(file => {
    const absolutePath = path.join(directory, file);
    if (fs.statSync(absolutePath).isDirectory()) return findImages(absolutePath);
    else if ((absolutePath.includes('.jpg') || absolutePath.includes('.png')) && !absolutePath.includes('-mobile.')) return files.push(absolutePath);
    else return;
  });
}

async function resizeImages(file) {
  const image = await sharp(file);
  const metadata = await image.metadata();

  if (metadata.width > 800) {
    console.log(`Resizing ${file}`)
    const resizedImage = image.resize(768);
    resizedImage.toFile(file.replace('.jpg', '-mobile.jpg'), (err) => {
      if (err) console.log(err);
    });
    resizedImage.toFile(file.replace('.jpg', '-mobile.webp'), (err) => {
      if (err) console.log(err);
    });
    image.toFile(file.replace('.jpg', '.webp'), (err) => {
      if (err) console.log(err);
    });
  }
}

findImages('pages');
files.forEach(file => {
  resizeImages(file);
});
