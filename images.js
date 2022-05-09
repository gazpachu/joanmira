const sharp = require('sharp');

sharp("pages/blog/2018-02-05---migrate-from-ghostjs-to-gatsbyjs/images/1.jpg")
  .resize(768)
  .toFile('1.webp', (err, info) => {
    console.log(err, info);
  });