#!/usr/bin/env node

require('dotenv').config();
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
const minify = require('@node-minify/core');
const uglifyjs = require('@node-minify/uglify-js');
let ejs = require('ejs');

const scriptArgs = process.argv.slice(2);
const command = scriptArgs[0];
const dateRegEx = /\d{4}-\d{2}-\d{2}---/;
const host = 'https://joanmira.com';
const name = 'Joan Mira Studio';
const description = 'Modern Software Engineering & UI/UX Design';
const dateFormatter = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', day: 'numeric' });
let listingItems = [];
const sitemap = [];
const algoliaPages = [];
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const algoliaIndex = algoliaClient.initIndex(process.env.ALGOLIA_INDEX);
const feed = new Feed({
  title: name,
  description,
  id: host,
  link: host,
  language: "en",
  image: `${host}/image.png`,
  favicon: `${host}/favicon.ico`,
  copyright: `All rights reserved 2022, ${name}`,
  generator: "",
  feedLinks: {
    atom: `${host}/rss.xml`
  },
  author: {
    name: name,
    email: "hello@joanmira.com",
    link: host
  }
});

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
  if (process.env.NODE_ENV === 'production') {
    console.log('Cleaning public folder...');
    await fs.emptyDir('public/');
  }

  if (!fs.existsSync('public/')) {
    console.log('Copying pages...');
    await safeExecute(
      async () => await fs.copy('pages/', 'public/', { filter: (f) => !f.startsWith('.') && !f.endsWith('.md') })
    );

    console.log('Renaming blog files...');
    await renameFolders('public/blog', dateRegEx, '');
    console.log('Renaming work files...');
    await renameFolders('public/work', dateRegEx, '');
  }

  exec('cat static/css/[!main]*.css > static/css/main.css', () => {
    minify({
      compressor: uglifyjs,
      input: 'static/css/main.css',
      output: 'static/css/main.min.css'
    });
  });
  exec('cat static/js/[!main]*.js > static/js/main.js', () => {
    minify({
      compressor: uglifyjs,
      input: 'static/js/main.js',
      output: 'static/js/main.min.js'
    });
  });

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

async function processDirectory(directoryPath, processor, listingSlug, category) {
  let contents = await fs.readdir(`${directoryPath}/`);
  contents = contents.reverse();
  const processPagePromises = [];
  for (const element of contents) {
    if (!element.includes('.') || element.includes('.md')) {
      const isDirectory = (await fs.lstat(`${directoryPath}/${element}`)).isDirectory();
      if (isDirectory) {
        await processDirectory(`${directoryPath}/${element}`, processor, listingSlug, category, processPagePromises);
        continue;
      }
      processPagePromises.push(processor(`${directoryPath}/${element}`, listingSlug, category));
    }
  }
  await Promise.all(processPagePromises);
}

async function processPage(pagePath) {
  console.log(`Building ${pagePath}`);
  const fileData = await fs.readFile(pagePath, 'utf-8');
  const { attributes: frontmatter, body: markdown } = await fm(fileData);
  const content = marked(markdown);
  const datePart = pagePath.match(dateRegEx);
  const isoDate = datePart ? datePart[0].replace('---', '') : '';
  const date = isoDate ? new Date(isoDate) : null;
  const formattedDate = date ? dateFormatter.format(date) : '';
  const pagePathParts = pagePath.replace('pages/', '').split('/');
  const pageName = pagePathParts.pop().split('.md')[0];
  let targetPath = pagePathParts.join('/');
  targetPath = frontmatter.template === 'post' || frontmatter.template === 'project'
    ? targetPath.replace(dateRegEx, '')
    : targetPath;
  const url = `${host}/${targetPath}`;
  const imagePath = `/${targetPath}/${frontmatter.cover}`;
  const pageTitle = frontmatter.template !== 'homepage' ? frontmatter.title : `${name} • ${description}`;
  const pageDescription = frontmatter.description || description;
  const lang = frontmatter.lang === 'es' ? 'es_ES' : 'en_US';
  const imageUrl = `${host}/${targetPath}/${frontmatter.cover}`;
  const type = frontmatter.template === 'post' || frontmatter.template === 'project' ? 'article' : 'website';

  // Build listing items
  if (frontmatter.isListingPage) {
    listingItems = [];
    await processDirectory(`pages/${frontmatter.template}`, processListingItem, frontmatter.template, frontmatter.category);
  }

  // Parse template
  let templatePath = `templates/${frontmatter.template || 'default'}.ejs`;
  const template = await fs.readFile(templatePath, 'utf-8');
  const parsedTemplate = ejs.render(template, {
    frontmatter,
    pageTitle,
    pageDescription,
    lang,
    url,
    name,
    imageUrl,
    type,
    imagePath,
    date,
    formattedDate,
    url,
    content,
    listingItems
  }, { filename: templatePath });

  // Generate final HTML file
  await fs.writeFile(`public/${targetPath}/${pageName}.html`, parsedTemplate);

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

async function processListingItem(pagePath, listingSlug, category = null) {
  const fileData = await fs.readFile(pagePath, 'utf-8');
  const { attributes: frontmatter } = await fm(fileData);
  
  // Skip the following scenarios
  if (category && frontmatter.category !== category) return;
  if (pagePath === `pages/${listingSlug}/index.md` || pagePath.includes('/category/')) return;

  const date = new Date(pagePath.substring(11, 21));
  let slug = pagePath.replace('/index.md', '').substring(24, pagePath.length);
  slug = `/${listingSlug}/${slug}`;
  const imagePath = frontmatter.cover ? `${slug}/${frontmatter.cover.replace('.jpg', '-mobile.jpg')}` : '';

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