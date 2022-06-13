#!/usr/bin/env node

require('dotenv').config();
const { JSDOM } = require('jsdom');
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

const scriptArgs = process.argv.slice(2);
const command = scriptArgs[0];
const dateRegEx = /\d{4}-\d{2}-\d{2}---/;
const host = 'https://joanmira.com';
const name = 'Joan Mira Studio';
const description = 'Modern Software Engineering & UI/UX Design';
const dateFormatter = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', day: 'numeric' });
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

    if (process.env.UPDATE_ALGOLIA) {
      console.log('Updating algolia indexes');
      await safeExecute(async () => await algoliaIndex.saveObjects(algoliaPages));
    }
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

  htmlElement[0].setAttribute('lang', frontmatter.lang || 'en' );

  if (pageContentElement) {
    let shareLinks = '';
    if (frontmatter.template === 'post') {
      const shareLinksDom = await JSDOM.fromFile('templates/share.html');
      shareLinks = shareLinksDom.window.document;
    }
    const image = `/${targetPath}/${frontmatter.cover}`;
    const year = `<time class="year tag">${date.getFullYear()}</time>`;
    let pageTitle = `<h1>${frontmatter.title}${frontmatter.template === 'project' ? year : ''}</h1>`;
    if (frontmatter.title && frontmatter.description) {
      pageTitle = `<hgroup><h1>${frontmatter.title}</h1><h2>${frontmatter.description}</h2></hgroup>`;
    }
    if (frontmatter.shouldHideTitle) {
      pageTitle = '';
    }
    pageContentElement.innerHTML = `
      ${frontmatter.template === 'post'
        ? `<a class="category" href="/blog/category/${frontmatter.category}">${frontmatter.category.replace('-', ' ')}</a>`
        : ''}
      <div class="post-header">
        ${pageTitle}
      </div>
      ${frontmatter.template === 'project' ?
      `<div class="tags">Tags: ${frontmatter.categories.replace('inverted', '')}</div>
      ` : ''}
      ${frontmatter.cover && frontmatter.template !== 'project'
      ? `<picture>
          <source srcset="${image.replace('.jpg', '.webp')}" type="image/webp">
          <source srcset="${image}" type="image/jpeg">
          <img class="image" src="${image}" alt="${frontmatter.title}" width="100%" height="500" loading="lazy">
        </picture>`
      : ''}
      ${frontmatter.template === 'post' ?
      `<div class="post-details">
        <div class="meta secondary">
          <span>${dateFormatter.format(date)}</span>
        </div>
        ${shareLinks.documentElement.innerHTML}
      </div>` : ''}
      <div class="post-body">
        <div class="post-content">
          ${parsedHtml}
        </div>
        ${frontmatter.template === 'post' ?
        `<div class="post-sidebar">
          <div class="subscribe-card">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><linearGradient xmlns="http://www.w3.org/2000/svg" id="email-svg" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="0" y2="512"><stop offset="0" stop-color="#01f1fe"></stop><stop offset="1" stop-color="#4fadfe"></stop></linearGradient><path xmlns="http://www.w3.org/2000/svg" d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm0 488c-127.925 0-232-104.075-232-232s104.075-232 232-232 232 104.075 232 232-104.075 232-232 232zm120.312-337.5h-240.625c-16.094 0-29.188 13.094-29.188 29.188v152.625c0 16.094 13.093 29.188 29.188 29.188h240.625c16.094 0 29.188-13.094 29.188-29.188v-152.625c0-16.094-13.094-29.188-29.188-29.188zm-18.089 24-102.223 81.177-102.224-81.177zm18.089 163h-240.625c-2.86 0-5.188-2.327-5.188-5.188v-145.65l118.038 93.735c2.185 1.735 4.824 2.603 7.462 2.603s5.278-.867 7.462-2.603l118.039-93.735v145.65c0 2.861-2.328 5.188-5.188 5.188z" fill="url(#email-svg)" data-original="url(#email-svg)"></path></g></svg>
            <div>Receive the stories by email.<br />No spam or ads. Promise! &#128077;<br />You can unsubscribe anytime</div>
            <a href="http://eepurl.com/bgk17b" role="button" target="_blank">Subscribe to the blog</a>
          </div>
          <div class="subscribe-card">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><linearGradient xmlns="http://www.w3.org/2000/svg" id="coffee" gradientUnits="userSpaceOnUse" x1="93.279" x2="3.93" y1="115.752" y2="26.403"><stop offset="0" stop-color="#fd5c70"></stop><stop offset="1" stop-color="#ffce64"></stop></linearGradient><path xmlns="http://www.w3.org/2000/svg" d="m29.92 49.96a2 2 0 0 1 0 4h-4.97a2 2 0 1 1 0-4zm40.253-3.668a2 2 0 0 0 2.387.154c4.492-2.918 7.056-6.162 7.838-9.918a2 2 0 1 0 -3.916-.816 8.8 8.8 0 0 1 -1.95 3.851c-.08-4.535-2.272-8.7-4.276-12.511-2.937-5.582-5.088-9.671-1.719-13.892.429 3.347 2.269 6.729 4.071 10.04.828 1.522 1.684 3.1 2.381 4.628a2 2 0 0 0 3.641-1.656c-.756-1.663-1.647-3.3-2.508-4.883-2.606-4.789-4.856-8.925-2.963-12.262a2 2 0 0 0 -2.843-2.655c-11.468 7.585-7.289 15.531-3.6 22.542 2.676 5.087 5.2 9.891 2.925 15.047a2 2 0 0 0 .532 2.331zm-23.338-2.326c2.277-5.159-.25-9.964-2.927-15.051-3.687-7.011-7.868-14.956 3.6-22.539a2 2 0 0 1 2.843 2.656c-1.9 3.336.351 7.467 2.953 12.25 3.881 7.132 9.2 16.9-3.551 25.169a2 2 0 0 1 -2.918-2.485zm4.892-4.366c4.007-4.74 1.76-9.617-1.937-16.412-1.8-3.306-3.636-6.683-4.064-10.026-3.364 4.218-1.213 8.306 1.722 13.886 2.011 3.826 4.21 8.007 4.279 12.552zm-24.784 6.851a2 2 0 0 1 -2.918-2.485c2.275-5.159-.25-9.966-2.925-15.051-3.689-7.015-7.87-14.956 3.6-22.539a2 2 0 0 1 2.843 2.656c-1.9 3.336.352 7.467 2.953 12.25 3.879 7.132 9.193 16.9-3.553 25.169zm.037-23.258c-1.8-3.306-3.635-6.683-4.064-10.026-3.363 4.218-1.213 8.306 1.723 13.886 2.01 3.821 4.21 8 4.278 12.552 4.008-4.74 1.761-9.617-1.937-16.412zm95.265 52.749c-2.59 9.109-11.708 18.52-26.241 19.013-5.478.186-11.3 3-15.37 5.44a105.944 105.944 0 0 1 -5.885 9.565h16.191a2 2 0 0 1 2 2 10.018 10.018 0 0 1 -10 10h-6.64a2 2 0 0 1 0-4h6.64a6.035 6.035 0 0 0 5.657-4h-79.314a6.01 6.01 0 0 0 5.657 4h52.25a2 2 0 0 1 0 4h-52.25a10.012 10.012 0 0 1 -10-10 2 2 0 0 1 2-2h16.191l-.237-.344a101.124 101.124 0 0 1 -17.954-57.656 2 2 0 0 1 2-2h8.89a2 2 0 0 1 0 4h-6.869a97.117 97.117 0 0 0 17.226 53.385l1.8 2.615h41.9c4.06-6.111 10.213-14.755 14.639-28.994a98.542 98.542 0 0 0 4.393-27.006h-49.879a2 2 0 0 1 0-4h51.9a2 2 0 0 1 2 2c0 1.845-.052 3.711-.156 5.585 5.334-4.449 13.674-7.979 22.262-2.253 6.778 4.519 9.537 12.432 7.199 20.65zm-35.626 11.284a29.255 29.255 0 0 1 8.2-2.2c8.741-.784 14.462-6.542 15.6-11.823a6.99 6.99 0 0 0 -3.451-8.048c-6.965-3.924-14.98 6.519-16.354 8.413a99.458 99.458 0 0 1 -3.995 13.658zm26.208-28.606c-9.969-6.643-18.766 2.945-20.579 5.134 0 .028-.007.056-.011.083q-.126 1.078-.275 2.155c4.189-3.951 10.543-7.931 16.962-4.32a10.928 10.928 0 0 1 5.4 12.374c-1.4 6.507-7.987 13.965-19.15 14.968a31.864 31.864 0 0 0 -10.73 3.591c-.044.1-.564 1.278-.721 1.619a32.351 32.351 0 0 1 12.146-3.267c12.521-.425 20.337-8.4 22.529-16.108 1.873-6.588-.21-12.655-5.571-16.229z" fill="url(#coffee)" data-original="url(#coffee)" class=""></path></g></svg>
            <div>Did you enjoy this article?<br />You can buy me a coffee ;-) &#128521;<br />Much appreciated!</div>
            <a href="https://ko-fi.com/P5P8D81J9" role="button" target="_blank">Buy a coffee to Joan</a>
          </div>
        </div>` : ''}
      </div>
      ${pageContentElement.innerHTML}
    `;
  } else {
    console.log(
      `Could not find element with id 'page-content' in template ${templatePath}. Generating page without markdown content.`
    );
  }

  const pageTitle = frontmatter.template !== 'homepage' ? frontmatter.title : `${name} • ${description}`;
  const pageDescription = frontmatter.description || description;
  headElement.innerHTML = `
  ${headDocument.documentElement.innerHTML}
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDescription}"></meta>
  <meta property="og:title" content="${pageTitle}" />
  <meta property="og:locale" content="${frontmatter.lang === 'es' ? 'es_ES' : 'en_US'}">
  <meta property="og:url" content="${`${host}/${targetPath}`}" />
  <meta property="og:site_name" content=${name}>
  <meta property="og:image" content="${`${host}/${targetPath}/${pageName}/${frontmatter.cover}`}" />
  <meta property="og:type" content="${frontmatter.template === 'post' || frontmatter.template === 'project' ? 'article' : 'website'}" />
  <meta property="og:description" content="${pageDescription}" />
  <meta property="article:published_time" content="${date}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:description" content="${pageDescription}">
  <meta name="twitter:creator" content="@gazpachu">
  <meta name="twitter:site" content="@gazpachu">
  <meta name="twitter:label1" content="Written by">
  <meta name="twitter:data1" content="${name}">
  ${headElement.innerHTML}`;

  if (frontmatter.template === 'blog' && listingContentElement) {
    await processDirectory('pages/blog', processListingItem, listingContentElement, 'blog', frontmatter.category);
  } else if (frontmatter.template === 'work' && listingContentElement) {
    await processDirectory('pages/work', processListingItem, listingContentElement, 'work', null);
  }

  if (heroElement) {
    heroElement.innerHTML = `
      ${headerDocument.documentElement.innerHTML}
      ${heroElement.innerHTML}
    `;
  } else {
    bodyElement.innerHTML = `
      ${headerDocument.documentElement.innerHTML}
      ${bodyElement.innerHTML}
    `;
  }

  bodyElement.innerHTML = `
    ${bodyElement.innerHTML}
    ${footerDocument.documentElement.innerHTML}
  `;

  const finalHtml = htmlElement[0].outerHTML;
  await fs.writeFile(`public/${targetPath}/${pageName}.html`, finalHtml);

  if (frontmatter.template === 'post') {
    feed.addItem({
      title: frontmatter.title,
      id: `${host}/${targetPath}`,
      link: `${host}/${targetPath}`,
      // description: post.description,
      content: parsedHtml,
      date,
      image: `${host}/${targetPath}/${frontmatter.cover}`
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
        <a class="list-item-title" href="${slug}"><h2>${frontmatter.title}</h2></a>
        ${frontmatter.description ? `<p>${frontmatter.description}</p>` : ''}
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
  } catch (err) {
    console.log(err);
  }
}