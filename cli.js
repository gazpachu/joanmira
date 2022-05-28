#!/usr/bin/env node

const { JSDOM } = require('jsdom');
const path = require('path');
const fs = require('fs-extra');
const { marked } = require('marked');
const http = require('http');
const chokidar = require('chokidar');
const fm = require('front-matter');
const Feed = require('feed').Feed;
const xml = require('xml')

const scriptArgs = process.argv.slice(2);
const command = scriptArgs[0];
const dateRegEx = /\d{4}-\d{2}-\d{2}---/;
const host = 'https://joanmira.com';
const name = 'Joan Mira';
const description = 'Modern Software Engineering & UI/UX Design';
const dateFormatter = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', day: 'numeric' });
const sitemap = [];
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
  if (!folderOrFile) {
    console.log('Cleaning public folder...');
    await fs.emptyDir('public/');

    console.log('Copying templates...');
    await safeExecute(
      async () =>
        await fs.copy('templates/', 'public/', { filter: (f) => !f.startsWith('.') && !f.endsWith('.html') })
    );

    console.log('Copying pages...');
    await safeExecute(
      async () => await fs.copy('pages/', 'public/', { filter: (f) => !f.startsWith('.') && !f.endsWith('.md') })
    );

    console.log('Copying static files...');
    await safeExecute(async () => await fs.copy('static/', 'public/'), { filter: (f) => !f.startsWith('.') });

    console.log('Renaming blog files...');
    await renameFolders('public/blog', dateRegEx, '');
    console.log('Renaming work files...');
    await renameFolders('public/work', dateRegEx, '');
  }

  const isFile = folderOrFile && folderOrFile.includes('.md');
  if (isFile) {
    processPage(folderOrFile);
  } else {
    await processDirectory(folderOrFile || 'pages', processPage);

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
  }
}

async function develop(folderOrFile, port) {
  await build(folderOrFile);
  const server = startServer(port);
  // const watcher = chokidar.watch(['pages/', 'static/', 'templates/']).on('change', async (path, _) => {
  //   console.log(`Detected change in file ${path}. Restarting development server.`);
  //   server.close();
  //   await watcher.close();
  //   await develop(folderOrFile, port);
  // });
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

async function processDirectory(directoryPath, processor, container, listingSlug, category) {
  let contents = await fs.readdir(`${directoryPath}/`);
  contents = contents.reverse();
  const processPagePromises = [];
  for (const element of contents) {
    if (!element.includes('.') || element.includes('.md')) {
      const isDirectory = (await fs.lstat(`${directoryPath}/${element}`)).isDirectory();
      if (isDirectory) {
        await processDirectory(`${directoryPath}/${element}`, processor, container, listingSlug, category, processPagePromises);
        continue;
      }
      processPagePromises.push(processor(`${directoryPath}/${element}`, container, listingSlug, category));
    }
  }
  await Promise.all(processPagePromises);
}

async function processPage(pagePath) {
  console.log(`Building ${pagePath}`);
  let templatePath = 'templates/default.html'
  const fileData = await fs.readFile(pagePath, 'utf-8');
  const { attributes: frontmatter, body: markdown } = await fm(fileData);
  if (frontmatter.template) {
    templatePath = `templates/${frontmatter.template}.html`;
  }
  const dom = await JSDOM.fromFile(templatePath);
  const parsedHtml = marked(markdown);
  const document = dom.window.document;
  const headDom = await JSDOM.fromFile('templates/head.html');
  const headDocument = headDom.window.document;
  const headerDom = await JSDOM.fromFile('templates/header.html');
  const headerDocument = headerDom.window.document;
  const footerDom = await JSDOM.fromFile('templates/footer.html');
  const footerDocument = footerDom.window.document;
  const pageContentElement = document.getElementById('page-content');
  const listingContentElement = document.getElementById('listing-content');
  const headerElement = headerDocument.getElementById('header');
  const footerElement = footerDocument.getElementById('footer');
  const htmlElement = document.getElementsByTagName('html');
  const bodyElement = document.querySelector('body');
  const headElement = document.querySelector('head');
  const heroElement = document.querySelector('.hero');
  const pagePathParts = pagePath.replace('pages/', '').split('/');
  const pageName = pagePathParts.pop().split('.md')[0];
  const datePart = pagePath.match(dateRegEx);
  const isoDate = datePart ? datePart[0].replace('---', '') : '';
  const date = new Date(isoDate);
  let targetPath = pagePathParts.join('/');
  targetPath = frontmatter.template === 'post' || frontmatter.template === 'project'
    ? targetPath.replace(dateRegEx, '')
    : targetPath;

  if (!htmlElement.length) {
      console.log(`Templates should contain the 'html' tag.`);
      process.exit(1);
  }

  if (heroElement) {
    heroElement.prepend(headerElement);
  } else {
    bodyElement.prepend(headerElement);
  }

  bodyElement.append(footerElement);

  if (pageContentElement) {
    const image = `/${targetPath}/${frontmatter.cover}`;
    const year = `<time class="year tag">${date.getFullYear()}</time>`;
    let pageTitle = `<h1>${frontmatter.title}${frontmatter.template === 'project' ? year : ''}</h1>`;
    if (frontmatter.title && frontmatter.subtitle) {
      pageTitle = `<hgroup><h1>${frontmatter.title}</h1><h2>${frontmatter.subtitle}</h2></hgroup>`;
    }
    if (frontmatter.shouldHideTitle) {
      pageTitle = '';
    }
    pageContentElement.innerHTML = `
    ${frontmatter.cover && frontmatter.template !== 'project'
      ? `<picture>
          <source srcset="${image.replace('.jpg', '.webp')}" type="image/webp">
          <source srcset="${image}" type="image/jpeg">
          <img class="image" src="${image}" alt="${frontmatter.title}" width="1024" height="500" loading="lazy">
        </picture>`
      : ''}
    <div class="post-content">
      ${pageTitle}
      ${frontmatter.template === 'project' ?
      `<div class="tags">Tags: ${frontmatter.categories.replace('inverted', '')}</div>
      ` : ''}
      ${frontmatter.template === 'post' ?
      `<div class="meta secondary">
        <a href="/blog/category/${frontmatter.category}">${frontmatter.category.replace('-', ' ')}</a> • ${dateFormatter.format(date)}
      </div>` : ''}
      ${parsedHtml}
    </div>`;
  } else {
    console.log(
      `Could not find element with id 'page-content' in template ${templatePath}. Generating page without markdown content.`
    );
  }

  headElement.innerHTML = `
  <!DOCTYPE html>
  ${headDocument.documentElement.innerHTML}
  <title>${frontmatter.template !== 'homepage' ? `${frontmatter.title} • ` : ''}${name} • ${description}</title>
  
  ${headElement.innerHTML}`;

  if (frontmatter.template === 'blog' && listingContentElement) {
    await processDirectory('pages/blog', processListingItem, listingContentElement, 'blog', frontmatter.category);
  } else if (frontmatter.template === 'work' && listingContentElement) {
    await processDirectory('pages/work', processListingItem, listingContentElement, 'work', null);
  }

  const finalHtml = document.getElementsByTagName('html')[0].outerHTML;
  await fs.writeFile(`public/${targetPath}/${pageName}.html`, finalHtml);

  if (frontmatter.template === 'post') {
    feed.addItem({
      title: frontmatter.title,
      id: `${host}/${targetPath}`,
      link: `${host}/${targetPath}`,
      // description: post.description,
      content: parsedHtml,
      date,
      image: `${host}/${targetPath}/${pageName}/${frontmatter.cover}`
    });
  }

  sitemap.push({
    // <url>
    url: [
      // <loc>http://www.example.com/</loc>
      { loc: `${host}/${targetPath}` },
      // <lastmod>2005-01-01</lastmod>
      // { lastmod: isoDate },
      // <changefreq>monthly</changefreq>
      { changefreq: 'daily' },
      // <priority>0.8</priority>
      { priority: 0.7 }
    ]
  });
}

async function processListingItem(pagePath, contentElement, listingSlug, category = null) {
  if (pagePath === `pages/${listingSlug}/index.md` || pagePath.includes('/category/')) return;
  const fileData = await fs.readFile(pagePath, 'utf-8');
  const { attributes: frontmatter } = await fm(fileData);

  if (category && frontmatter.category !== category) return;
  const date = new Date(pagePath.substring(11, 21));
  let slug = pagePath.replace('/index.md', '').substring(24, pagePath.length);
  slug = `/${listingSlug}/${slug}`;
  const image = `${slug}/${frontmatter.cover.replace('.jpg', '-mobile.jpg')}`;
  contentElement.innerHTML = `${contentElement.innerHTML}
  ${listingSlug === 'blog'
  ? `<li class="${frontmatter.category}">
    <article class="list-item">
      <a href="${slug}">
        <picture>
          <source srcset="${image.replace('.jpg', '.webp')}" type="image/webp">
          <source srcset="${image}" type="image/jpeg">
          <img class="image" src="${image}" alt="${frontmatter.title}" width="250" height="170" loading="lazy">
        </picture>
      </a>
      <div class="list-item-content">
        <a class="list-item-title" href="${slug}">${frontmatter.title}</a>
        <div class="meta secondary">
          ${frontmatter.category ? `<a href="/${listingSlug}/category/${frontmatter.category}">${frontmatter.category.replace('-', ' ')}</a>` : ''} • ${dateFormatter.format(date)}
        </div>
      </div>
    </article>
  </li>`
  : `<li class="${frontmatter.categories}" style="background-color: ${frontmatter.color};">
    <a href="${slug}" class="link">
      <picture>
        <source srcset="${slug}/${frontmatter.cover.replace('.jpg', '.webp')}" type="image/webp">
        <source srcset="${slug}/${frontmatter.cover}" type="image/jpeg">
        <img class="logo" src="${slug}/${frontmatter.cover}" alt="${frontmatter.title}" width="250" height="170" loading="lazy">
      </picture>
      <div class="project-content">
        <h2 class="name">${frontmatter.title}</h2>
        <p class="meta">
          <span class="date">${new Date(date).getFullYear()}</span>
          <span class="country">${frontmatter.location}</span>
        </p>
      </div>
    </a>
  </li>
  `}`;
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
  } catch {}
}