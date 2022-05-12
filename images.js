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

findImages('pages');

files.forEach(file => {
  sharp(file).resize(768).toFile(file.replace('.jpg', '-mobile.jpg'), (err) => {
    if (err) console.log(err);
  });
  sharp(file).resize(768).toFile(file.replace('.jpg', '-mobile.webp'), (err) => {
    if (err) console.log(err);
  });
  sharp(file).toFile(file.replace('.jpg', '.webp'), (err) => {
    if (err) console.log(err);
  });
});