#!/usr/bin/env node

require('dotenv').config();
const enTranslations = require('./i18n/en.json');
const esTranslations = require('./i18n/es.json');
const { exec } = require('child_process');
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

async function build(folderOrFile) {
  if (!fs.existsSync('public/')) {
    console.log('Copying pages...');
    await safeExecute(
      async () => await fs.copy('pages/', 'public/', { filter: (f) => !f.startsWith('.') && !f.endsWith('.md') })
    );

    console.log('Renaming blog files...');
    await renameFolders('public/blog', dateAndSeparatorRegEx, '');
    await renameFolders('public/es/blog', dateAndSeparatorRegEx, '');
    console.log('Renaming work files...');
    await renameFolders('public/work', dateAndSeparatorRegEx, '');
    await renameFolders('public/es/work', dateAndSeparatorRegEx, '');
  }

  console.log('Copying static files...');
  await safeExecute(async () => await fs.copy('static/', 'public/'), { filter: (f) => !f.startsWith('.') });

  const isFile = folderOrFile && folderOrFile.includes('.md');
  if (isFile) {
    processPage(folderOrFile);
  } else {
    await processDirectory(folderOrFile || 'pages', processPage);
  }

  if (process.env.NODE_ENV === 'production') {
    console.log('Generating RSS feed');
    await fs.writeFile('public/rss.xml', feed.rss2());

    console.log('Generating sitemap');
    const xmlObject = {
      urlset: [
        // <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
    const xmlString = xml(xmlObject)
    await fs.writeFile(
      'public/sitemap.xml',
      '<?xml version="1.0" encoding="UTF-8"?>' + xmlString
    );

    console.log('Updating algolia indexes');
    await safeExecute(async () => await algoliaIndex.saveObjects(algoliaPages));
  }
}

async function develop(folderOrFile, port) {
  await build(folderOrFile);
  const server = startServer(port);
  const watcher = chokidar.watch(['pages/', 'static/', 'templates/']).on('change', async (path, _) => {
    console.log(`Detected change in file ${path}. Restarting development server.`);
    await safeExecute(async () => {
      exec('cat static/css/[!main]*.css > static/css/main.css');
      exec('cat static/js/[!main]*.js > static/js/main.js');
    });
    server.close();
    await watcher.close();
    await develop(path.includes('.md') ? path : folderOrFile, port);
  });
}

async function renameFolders(dir, from, to) {
  fs.readdirSync(dir).forEach(it => {
    const itsPath = path.resolve(dir, it);
    const itsStat = fs.statSync(itsPath);

    if (itsStat.isDirectory()) {
      fs.renameSync(itsPath, itsPath.replace(from, to));
    } 
  });
 }

async function processDirectory(directoryPath, processor, listingSlug, category, listingItems) {
  let contents = await fs.readdir(`${directoryPath}/`);
  contents = contents.reverse();
  const processPagePromises = [];
  for (const element of contents) {
    if (!element.includes('.') || element.includes('.md')) {
      const isDirectory = (await fs.lstat(`${directoryPath}/${element}`)).isDirectory();
      if (isDirectory) {
        await processDirectory(`${directoryPath}/${element}`, processor, listingSlug, category, listingItems, processPagePromises, );
        continue;
      }
      processPagePromises.push(processor(`${directoryPath}/${element}`, listingSlug, category, listingItems));
    }
  }
  await Promise.all(processPagePromises);
}

async function processPage(pagePath) {
  console.log(`Building ${pagePath}`);
  const fileData = await fs.readFile(pagePath, 'utf-8');
  const { attributes: frontmatter, body: markdown } = await fm(fileData);
  const content = marked(markdown);
  const datePart = pagePath.match(dateAndSeparatorRegEx);
  const isoDate = datePart ? datePart[0].replace('---', '') : '';
  const date = isoDate ? new Date(isoDate) : null;
  const pagePathParts = pagePath.replace('pages/', '').split('/');
  pagePathParts.pop().split('.md');
  let targetPath = pagePathParts.join('/');
  targetPath = frontmatter.template === 'post' || frontmatter.template === 'project'
    ? targetPath.replace(dateAndSeparatorRegEx, '')
    : targetPath;
  const url = `${host}/${targetPath}`;
  const imagePath = `/${targetPath}/${frontmatter.cover}`;
  const lang = targetPath.startsWith('es') ? 'es' : 'en';
  const localePath = lang === 'es' ? '/es' : '';
  const translations = lang === 'es' ? esTranslations : enTranslations;
  const dateFormatter = new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', { month: 'long', year: 'numeric', day: 'numeric' });
  const formattedDate = date ? dateFormatter.format(date) : '';
  const pageTitle = frontmatter.template !== 'homepage' ? frontmatter.title : `${translations.site_name} • ${translations.site_description}`;
  const pageDescription = frontmatter.description || translations.site_description;
  const imageUrl = frontmatter.cover ? `${host}/${targetPath}/${frontmatter.cover}` : null;
  const type = frontmatter.template === 'post' || frontmatter.template === 'project' ? 'article' : 'website';
  const listingItems = [];

  let alternateUrl = targetPath.startsWith('es/') ? targetPath.replace('es/', '/') : `es/${targetPath}`;
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
    date,
    formattedDate,
    url,
    host,
    content,
    listingItems,
    isProduction: process.env.NODE_ENV === 'production'
  }, { filename: templatePath });

  // Generate final HTML file
  await fs.writeFile(`public/${targetPath}/index.html`, parsedTemplate);

  if (frontmatter.template === 'post') {
    feed.addItem({
      title: frontmatter.title,
      id: url,
      link: url,
      description: frontmatter.description || '',
      content: content,
      date,
      image: imageUrl
    });
  }

  sitemap.push({
    url: [
      { loc: url },
      // { lastmod: isoDate },
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
  const fileData = await fs.readFile(pagePath, 'utf-8');
  const { attributes: frontmatter } = await fm(fileData);
  
  // Skip the following scenarios
  if (category && frontmatter.category !== category) return;
  if (pagePath === `pages/${listingSlug}/index.md` || pagePath.includes('/category/')) return;
  const pagePathDateMatch = pagePath.match(dateRegEx);
  const date = pagePathDateMatch ? new Date(pagePathDateMatch[0]) : null;
  const pagePathCleaned = pagePath.replace('/index.md', '');
  let slug = pagePathCleaned.substring(pagePathCleaned.search('---') + 3, pagePath.length);
  slug = `/${listingSlug}/${slug}`;
  const imagePath = frontmatter.cover ? `${slug}/${frontmatter.cover.replace('.jpg', '-mobile.jpg')}` : '';
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
  console.log(`Development server starting on http://localhost:${port}`)
  return http
    .createServer(function (req, res) {
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
    })
    .listen(port)
}

async function safeExecute(func) {
  try {
    await func()
  } catch (err) {
    console.log(err);
  }
}