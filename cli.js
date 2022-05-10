#!/usr/bin/env node

const { JSDOM } = require('jsdom');
const path = require('path');
const fs = require('fs-extra');
const { marked } = require('marked');
const http = require('http');
const chokidar = require('chokidar');
const fm = require('front-matter');

const scriptArgs = process.argv.slice(2);
const command = scriptArgs[0];
const dateRegEx = /\d{4}-\d{2}-\d{2}---/;

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

async function build(folder) {
    await fs.emptyDir('public/');

    await safeExecute(
      async () =>
        await fs.copy('templates/', 'public/', { filter: (f) => !f.startsWith('.') && !f.endsWith('.html') })
    );

    await safeExecute(
      async () => await fs.copy('pages/', 'public/', { filter: (f) => !f.startsWith('.') && !f.endsWith('.md') })
    );

    await safeExecute(async () => await fs.copy('static/', 'public/'), { filter: (f) => !f.startsWith('.') });

    await renameFolders('public/blog', dateRegEx, '');
    await processDirectory(folder || 'pages', processPage);
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

async function processDirectory(directoryPath, processor, container, category) {
  let contents = await fs.readdir(`${directoryPath}/`);
  contents = contents.reverse();
  const processPagePromises = [];
  for (const element of contents) {
    if (!element.includes('.') || element.includes('.md')) {
      const isDirectory = (await fs.lstat(`${directoryPath}/${element}`)).isDirectory();
      if (isDirectory) {
        await processDirectory(`${directoryPath}/${element}`, processor, container, category, processPagePromises);
        continue;
      }
      processPagePromises.push(processor(`${directoryPath}/${element}`, container, category));
    }
  }
  await Promise.all(processPagePromises);
}

async function develop(folder, port) {
  await build(folder);
  const server = startServer(port);
  const watcher = chokidar.watch(['pages/', 'static/', 'templates/']).on('change', async (path, _) => {
    console.log(`Detected change in file ${path}. Restarting development server.`);
    server.close();
    await watcher.close();
    await develop(folder, port);
  });
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
  const headerDom = await JSDOM.fromFile('templates/header.html');
  const headerDocument = headerDom.window.document;
  const pageContentElement = document.getElementById('page-content');
  const blogContentElement = document.getElementById('blog-content');
  const headerElement = headerDocument.getElementById('header');
  const mainWrapper = document.getElementById('main-wrapper');
  const htmlElement = document.getElementsByTagName('html');
  const bodyElement = document.querySelector('body');
  const headElement = document.querySelector('head');
  const scriptsElement = document.getElementById('scripts');
  const pagePathParts = pagePath.replace('pages/', '').split('/');
  const pageName = pagePathParts.pop().split('.md')[0];
  let targetPath = pagePathParts.join('/');
  targetPath = frontmatter.template === 'post' ? targetPath.replace(dateRegEx, '') : targetPath;

  if (!htmlElement.length) {
      console.log(`Templates should contain the 'html' tag.`);
      process.exit(1);
  }

  if (mainWrapper) {
    mainWrapper.prepend(headerElement);
  } else {
    bodyElement.prepend(headerElement);
  }

  if (pageContentElement) {
    const image = `/${targetPath}/${frontmatter.cover}`;
    pageContentElement.innerHTML = `
    ${frontmatter.cover
      ? `<picture>
          <source srcset="${image.replace('.jpg', '.webp')}" type="image/webp">
          <source srcset="${image}" type="image/jpeg">
          <img class="image" src="${image}" alt="${frontmatter.title}" width="1024" height="500" loading="lazy">
        </picture>`
      : ''}
    <div class="post-content">
      ${frontmatter.subtitle
        ? `<hgroup><h1>${frontmatter.title}</h1><h2>${frontmatter.subtitle}</h2></hgroup>`
        : `<h1>${frontmatter.title}</h1>`}
      ${parsedHtml}
    </div>`;
  } else {
    console.log(
      `Could not find element with id 'page-content' in template ${templatePath}. Generating page without markdown content.`
    );
  }

  headElement.innerHTML = `
  <!DOCTYPE html>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${frontmatter.title} • Joan Mira</title>
  <link
    rel="stylesheet"
    href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
  />
  <link rel="stylesheet" href="/css/main.css" />
  <link rel="stylesheet" href="/css/header.css" />
  ${headElement.innerHTML}`;

  if (scriptsElement) {
    scriptsElement.innerHTML = `
      ${scriptsElement.innerHTML}
      <script src="/js/main.js" type="application/javascript" />
    `;
  }

  if (frontmatter.template === 'blog' && blogContentElement) {
    await processDirectory('pages/blog', processBlogListingItem, blogContentElement, frontmatter.category);
  }

  const finalHtml = document.getElementsByTagName('html')[0].outerHTML;
  await fs.writeFile(`public/${targetPath}/${pageName}.html`, finalHtml);
}

async function processBlogListingItem(pagePath, blogContentElement, category = null) {
  if (pagePath === 'pages/blog/index.md' || pagePath.includes('/category/')) return;
  const fileData = await fs.readFile(pagePath, 'utf-8');
  const { attributes: frontmatter } = await fm(fileData);

  if (category && frontmatter.category !== category) return;
  const date = new Date(pagePath.substring(11, 21));
  let slug = pagePath.replace('/index.md', '').substring(24, pagePath.length);
  slug = `/blog/${slug}`;
  const image = `${slug}/${frontmatter.cover.replace('.jpg', '-mobile.jpg')}`;
  blogContentElement.innerHTML = `${blogContentElement.innerHTML}
  <li>
    <article class="blog-list-item">
      <a href="${slug}">
        <picture>
          <source srcset="${image.replace('.jpg', '.webp')}" type="image/webp">
          <source srcset="${image}" type="image/jpeg">
          <img class="image" src="${image}" alt="${frontmatter.title}" width="250" height="170" loading="lazy">
        </picture>
      </a>
      <div class="blog-list-item-content">
        <a href="/blog/category/${frontmatter.category}" class="category">${frontmatter.category.replace('-', ' ')}</a>
        <a class="blog-list-item-title" href="${slug}">${frontmatter.title}</a>
        <div>${date.toLocaleDateString()}</div>
      </div>
    </article>
  </li>`;
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