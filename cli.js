#!/usr/bin/env node

require('dotenv').config();
const enTranslations = require('./i18n/en.json');
const esTranslations = require('./i18n/es.json');
const path = require('path');
const fs = require('fs-extra');
const { marked } = require('marked');
const http = require('http');
const chokidar = require('chokidar');
const fm = require('front-matter');
const Feed = require('feed').Feed;
const xml = require('xml');
const algoliasearch = require('algoliasearch');
const Cutter = require('utf8-binary-cutter');
let ejs = require('ejs');

const scriptArgs = process.argv.slice(2);
const command = scriptArgs[0];
const dateAndSeparatorRegEx = /\d{4}-\d{2}-\d{2}---/;
const dateRegEx = /\d{4}-\d{2}-\d{2}/;
const host = 'https://www.joanmira.com';
const sitemap = [];
const algoliaPages = [];
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const algoliaIndex = algoliaClient.initIndex(process.env.ALGOLIA_INDEX);
const feed = new Feed({
  title: enTranslations.site_name,
  description: enTranslations.site_description,
  id: host,
  link: host,
  language: "en",
  image: `${host}/img/apple-touch-icon.png`,
  favicon: `${host}/img/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}, ${enTranslations.site_name}`,
  generator: "",
  feedLinks: {
    atom: `${host}/rss.xml`
  },
  author: {
    name: enTranslations.site_name,
    email: "hello@joanmira.com",
    link: host
  }
});
const feedEs = new Feed({
  title: esTranslations.site_name,
  description: esTranslations.site_description,
  id: `${host}-es`,
  link: `${host}/es`,
  language: "es",
  image: `${host}/img/apple-touch-icon.png`,
  favicon: `${host}/img/favicon.ico`,
  copyright: `Todos los derechos reservados ${new Date().getFullYear()}, ${esTranslations.site_name}`,
  generator: "",
  feedLinks: {
    atom: `${host}/es/rss.xml`
  },
  author: {
    name: esTranslations.site_name,
    email: "hello@joanmira.com",
    link: `${host}/es`,
  }
});

const renderer = {
  image(href, title, text) {
    if (!href.endsWith(`.svg`)) {
      return `
      <figure>
        <picture>
          <source media="(min-width: 769px)" type="image/webp" srcset="${href.replace('.jpg', '.webp')}" />
          <source media="(min-width: 769px)" type="image/jpeg" srcset="${href}" />
          <source media="(min-width: 320px)" type="image/webp" srcset="${href.replace('.jpg', '-mobile.webp')}" />
          <source media="(min-width: 320px)" type="image/jpeg" srcset="${href.replace('.jpg', '-mobile.jpg')}" />
          <img class="image" src="${href}" alt="${title || text}" loading="lazy">
        </picture>
        <figcaption>${title || text}</figcaption>
      </figure>`;
    }
    return false;
  }
};

marked.use({ renderer });

// Cross-platform concatenation helper inside cli.js
function concatFiles(targetDir, outputFile, ext) {
  if (!fs.existsSync(targetDir)) return;
  const outputPath = path.join(targetDir, outputFile);
  const files = fs.readdirSync(targetDir)
    .filter(file => file.endsWith(ext) && file !== outputFile && !file.includes('.min.'));
  const content = files
    .map(file => {
      const fileContent = fs.readFileSync(path.join(targetDir, file), 'utf8');
      return ext === '.js' ? `(() => {\n${fileContent}\n})();` : fileContent;
    })
    .join('\n\n');
  fs.writeFileSync(outputPath, content);
}

const CONCAT_OUTPUTS = [
  'static/css/main.css',
  'static/css/main.min.css',
  'static/js/main.js',
  'static/js/main.min.js'
];

function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

function isConcatOutput(filePath) {
  const normalized = normalizePath(filePath);
  return CONCAT_OUTPUTS.some((output) => normalized.endsWith(output));
}

function pagesPathToPublicPath(pagesPath) {
  return normalizePath(pagesPath)
    .replace(/^pages\//, 'public/')
    .replace(dateAndSeparatorRegEx, '');
}

switch (command) {
  case 'build':
    build(scriptArgs[1]);
    break;
  case 'develop':
    develop(scriptArgs[1], scriptArgs[2] ? Number(scriptArgs[2]) : 8000);
    break;
  default:
    console.log(`Command is missing.`);
    process.exit(1);
}

async function copyPagesAndStatic() {
  console.log('Copying pages...');
  await safeExecute(
    async () => await fs.copy('pages/', 'public/', { filter: (f) => !path.basename(f).startsWith('.') && !f.endsWith('.md') })
  );

  console.log('Renaming blog files...');
  await renameFolders('public/blog', dateAndSeparatorRegEx, '');
  await renameFolders('public/es/blog', dateAndSeparatorRegEx, '');
  console.log('Renaming work files...');
  await renameFolders('public/work', dateAndSeparatorRegEx, '');
  await renameFolders('public/es/work', dateAndSeparatorRegEx, '');

  console.log('Copying static files...');
  await safeExecute(async () => await fs.copy('static/', 'public/', { filter: (f) => !path.basename(f).startsWith('.') }));
}

async function build(folderOrFile) {
  const isSingleMarkdownFile = folderOrFile && folderOrFile.includes('.md');

  if (!isSingleMarkdownFile) {
    await copyPagesAndStatic();
  }

  if (isSingleMarkdownFile) {
    await processPage(folderOrFile);
  } else {
    await processDirectory(folderOrFile || 'pages', processPage);
  }

  if (process.env.NODE_ENV === 'production') {
    console.log('Generating RSS feed');
    await fs.outputFile('public/rss.xml', feed.rss2());
    await fs.outputFile('public/es/rss.xml', feedEs.rss2());

    console.log('Generating sitemap');
    const xmlObject = {
      urlset: [
        {
          _attr: {
            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
            'xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
            'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
            'xmlns:mobile': 'http://www.google.com/schemas/sitemap-mobile/1.0',
            'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
            'xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1'
          }
        },
        ...sitemap.map((page) => page),
      ]
    };
    const xmlString = xml(xmlObject);
    await fs.outputFile(
      'public/sitemap.xml',
      '<?xml version="1.0" encoding="UTF-8"?>' + xmlString
    );

    console.log('Updating algolia indexes');
    await safeExecute(async () => await algoliaIndex.saveObjects(algoliaPages));
  }
}

async function rebuildStaticCss() {
  concatFiles('static/css', 'main.css', '.css');
  await fs.copy('static/css/main.css', 'public/css/main.css');
}

async function rebuildStaticJs() {
  concatFiles('static/js', 'main.js', '.js');
  await fs.copy('static/js/main.js', 'public/js/main.js');
}

async function rebuildChangedFile(changedPath) {
  const cleanPath = normalizePath(changedPath);

  if (cleanPath.endsWith('.md')) {
    await processPage(cleanPath);
    return;
  }

  if (cleanPath.startsWith('static/css/') && cleanPath.endsWith('.css')) {
    await rebuildStaticCss();
    return;
  }

  if (cleanPath.startsWith('static/js/') && cleanPath.endsWith('.js')) {
    await rebuildStaticJs();
    return;
  }

  if (cleanPath.startsWith('static/')) {
    const relativePath = cleanPath.replace(/^static\//, '');
    await fs.copy(cleanPath, path.join('public', relativePath));
    return;
  }

  if (cleanPath.startsWith('pages/')) {
    const publicPath = pagesPathToPublicPath(cleanPath);
    await fs.copy(cleanPath, publicPath);
    return;
  }

  if (cleanPath.startsWith('templates/')) {
    await processDirectory('pages', processPage);
  }
}

let devServer = null;
let devWatcher = null;

async function develop(folderOrFile, port) {
  await build(folderOrFile);

  try {
    await startServer(port);
  } catch (err) {
    process.exit(1);
  }

  if (devWatcher) return;

  let rebuildQueue = Promise.resolve();

  devWatcher = chokidar.watch(['pages/', 'static/', 'templates/'], {
    ignored: (filePath) => isConcatOutput(filePath),
    ignoreInitial: true
  }).on('all', (event, changedPath) => {
    if (event !== 'add' && event !== 'change') return;
    if (isConcatOutput(changedPath)) return;

    const cleanPath = normalizePath(changedPath);
    rebuildQueue = rebuildQueue.then(async () => {
      console.log(`Detected change in ${cleanPath}. Rebuilding...`);
      try {
        await rebuildChangedFile(cleanPath);
        console.log(`Finished rebuilding ${cleanPath}.`);
      } catch (err) {
        console.log(err);
      }
    });
  });
}

async function renameFolders(dir, from, to) {
  if (!fs.existsSync(dir)) return;

  const items = fs.readdirSync(dir);
  for (const it of items) {
    const itsPath = path.resolve(dir, it);
    if (!fs.existsSync(itsPath)) continue;

    const itsStat = fs.statSync(itsPath);

    if (itsStat.isDirectory() && from.test(it)) {
      const targetPath = path.resolve(dir, it.replace(from, to));
      if (itsPath !== targetPath) {
        // Copy files into target without wiping existing generated images in targetPath
        fs.copySync(itsPath, targetPath, { overwrite: true });
        fs.removeSync(itsPath);
      }
    }
  }
}

async function processDirectory(directoryPath, processor, listingSlug, category, listingItems) {
  const cleanDirPath = directoryPath.replace(/\\/g, '/');
  let contents = await fs.readdir(`${cleanDirPath}/`);
  contents = contents.reverse();
  const processPagePromises = [];
  for (const element of contents) {
    if (!element.includes('.') || element.includes('.md')) {
      const isDirectory = (await fs.lstat(`${cleanDirPath}/${element}`)).isDirectory();
      if (isDirectory) {
        await processDirectory(`${cleanDirPath}/${element}`, processor, listingSlug, category, listingItems);
        continue;
      }
      processPagePromises.push(processor(`${cleanDirPath}/${element}`, listingSlug, category, listingItems));
    }
  }
  await Promise.all(processPagePromises);
}

async function processPage(pagePath) {
  console.log(`Building ${pagePath}`);
  const cleanPagePath = pagePath.replace(/\\/g, '/');
  const fileData = await fs.readFile(cleanPagePath, 'utf-8');
  const { attributes: frontmatter, body: markdown } = await fm(fileData);
  const content = marked(markdown);
  const datePart = cleanPagePath.match(dateAndSeparatorRegEx);
  const isoDate = datePart ? datePart[0].replace('---', '') : '';
  const date = isoDate ? new Date(isoDate) : null;
  const pagePathParts = cleanPagePath.replace('pages/', '').split('/');
  pagePathParts.pop();
  let targetPath = pagePathParts.join('/');
  targetPath = frontmatter.template === 'post' || frontmatter.template === 'project'
    ? targetPath.replace(dateAndSeparatorRegEx, '')
    : targetPath;
  const url = `${host}/${targetPath}`;
  const imagePath = `/${targetPath.replace('es/', '')}/${frontmatter.cover}`;
  const lang = targetPath.startsWith('es') ? 'es' : 'en';
  const localePath = lang === 'es' ? '/es' : '';
  const translations = lang === 'es' ? esTranslations : enTranslations;
  const dateFormatter = new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', { month: 'long', year: 'numeric', day: 'numeric' });
  const formattedDate = date ? dateFormatter.format(date) : '';
  const pageTitle = frontmatter.template !== 'homepage' ? `${frontmatter.title} • ${translations.site_name}` : `${translations.site_name} • ${translations.site_description}`;
  const pageDescription = frontmatter.description || translations.site_description;
  const imageUrl = frontmatter.cover ? `${host}${imagePath}` : null;
  const type = frontmatter.template === 'post' || frontmatter.template === 'project' ? 'article' : 'website';
  const listingItems = [];

  let alternateUrl = targetPath.startsWith('es/') ? targetPath.replace('es/', '/') : `/es/${targetPath}`;
  const canonicalPath = targetPath.startsWith('es/') ? targetPath.replace('es/', '') : targetPath;
  if (targetPath === 'es') { alternateUrl = '/'; }
  if (targetPath === '') { alternateUrl = '/es'; }

  // Build listing items
  if (frontmatter.isListingPage) {
    await processDirectory(`pages${localePath}/${frontmatter.template}`, processListingItem, targetPath.startsWith('es') ? `es/${frontmatter.template}` : frontmatter.template, frontmatter.category, listingItems);
  }

  // Parse template
  let templatePath = `templates/${frontmatter.template || 'default'}.ejs`;
  const template = await fs.readFile(templatePath, 'utf-8');
  const parsedTemplate = ejs.render(template, {
    frontmatter,
    translations,
    localePath,
    pageTitle,
    pageDescription,
    lang,
    url,
    alternateUrl,
    name: translations.site_name,
    imageUrl,
    type,
    imagePath,
    canonicalPath,
    date,
    formattedDate,
    host,
    content,
    listingItems,
    isProduction: process.env.NODE_ENV === 'production'
  }, { filename: templatePath });

  // fs.outputFile creates parent directories automatically if they don't exist
  await fs.outputFile(`public/${targetPath}/index.html`, parsedTemplate);

  if (frontmatter.template === 'post') {
    const item = {
      title: frontmatter.title,
      id: url,
      link: url,
      description: frontmatter.description || '',
      content: content,
      date,
      image: imageUrl
    };
    lang === 'es' ? feedEs.addItem(item) : feed.addItem(item);
  }

  sitemap.push({
    url: [
      { loc: url },
      { changefreq: 'daily' },
      { priority: 0.7 }
    ]
  });

  if (targetPath) {
    const maxBinarySizes = {
      content: 9000
    };
    const record = Cutter.truncateFieldsToBinarySize({
      objectID: targetPath,
      slug: `/${targetPath}`,
      title: frontmatter.title,
      content: markdown
    }, maxBinarySizes);
    algoliaPages.push(record);
  }
}

async function processListingItem(pagePath, listingSlug, category = null, listingItems) {
  const cleanPagePath = pagePath.replace(/\\/g, '/');
  const fileData = await fs.readFile(cleanPagePath, 'utf-8');
  const { attributes: frontmatter } = await fm(fileData);

  if (category && frontmatter.category !== category) return;
  if (cleanPagePath === `pages/${listingSlug}/index.md` || cleanPagePath.includes('/category/')) return;
  const pagePathDateMatch = cleanPagePath.match(dateRegEx);
  const date = pagePathDateMatch ? new Date(pagePathDateMatch[0]) : null;
  const pagePathCleaned = cleanPagePath.replace('/index.md', '');
  let slug = pagePathCleaned.substring(pagePathCleaned.search('---') + 3, cleanPagePath.length);
  slug = `/${listingSlug}/${slug}`;
  const imagePath = frontmatter.cover ? `${slug.replace('es/', '')}/${frontmatter.cover.replace('.jpg', '-mobile.jpg')}` : '';
  const dateFormatter = new Intl.DateTimeFormat(listingSlug.startsWith('es/') ? 'es-ES' : 'en-GB', { month: 'long', year: 'numeric', day: 'numeric' });

  listingItems.push({
    frontmatter,
    date,
    formattedDate: date ? dateFormatter.format(date) : '',
    slug,
    imagePath,
    listingSlug
  });
}

function startServer(port) {
  if (devServer) {
    return Promise.resolve(devServer);
  }

  return new Promise((resolve, reject) => {
    const server = http.createServer(function (req, res) {
      const url = req.url;
      let filePath = url;
      if (url === '/') {
        filePath = '/index.html';
      } else if (!url.includes('.')) {
        filePath += '/index.html';
      }
      fs.readFile('public' + filePath, function (err, data) {
        if (err) {
          res.writeHead(404);
          res.end('<h1>404: Page not found</h1>');
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Stop the other dev server or run: node cli.js develop "" ${port + 1}`);
      }
      reject(err);
    });

    server.listen(port, () => {
      devServer = server;
      console.log(`Development server running at http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function safeExecute(func) {
  try {
    await func();
  } catch (err) {
    console.log(err);
  }
}