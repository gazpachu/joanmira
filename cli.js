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
        build()
        break
    case 'develop':
        develop(scriptArgs[1] ? Number(scriptArgs[1]) : 8000)
        break
    default:
        console.log(`Command is missing.`)
        process.exit(1)
}

async function build() {
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
    await processDirectory('pages', processPage);
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

async function processDirectory(directoryPath, processor, container) {
  let contents = await fs.readdir(`${directoryPath}/`);
  contents = contents.reverse();
  const processPagePromises = [];
  for (const element of contents) {
    if (!element.includes('.') || element.includes('.md')) {
      const isDirectory = (await fs.lstat(`${directoryPath}/${element}`)).isDirectory();
      if (isDirectory) {
        await processDirectory(`${directoryPath}/${element}`, processor, container, processPagePromises);
        continue;
      }
      processPagePromises.push(processor(`${directoryPath}/${element}`, container));
    }
  }
  await Promise.all(processPagePromises);
}

async function develop(port) {
    await build()
    const server = startServer(port)
    const watcher = chokidar.watch(['pages/', 'static/', 'templates/']).on('change', async (path, _) => {
        console.log(`Detected change in file ${path}. Restarting development server.`)
        server.close()
        await watcher.close()
        await develop(port)
    })
}

async function processPage(pagePath) {
    let templatePath = 'templates/default.html'
    const fileData = await fs.readFile(pagePath, 'utf-8');
    const { attributes: frontmatter, body: markdown } = await fm(fileData);
    if (frontmatter.template) {
        templatePath = `templates/${frontmatter.template}.html`;
    }
    const dom = await JSDOM.fromFile(templatePath);
    const parsedHtml = marked(markdown);
    const document = dom.window.document;

    const headContentElement = document.getElementById('head-content');
    const pageContentElement = document.getElementById('page-content');
    const blogContentElement = document.getElementById('blog-content');

    if (pageContentElement) {
        pageContentElement.innerHTML = `
        ${frontmatter.subtitle
          ? `<hgroup><h1>${frontmatter.title}</h1><h2>${frontmatter.subtitle}</h2></hgroup>`
          : `<h1>${frontmatter.title}</h1>`}
        ${parsedHtml}`;
    } else {
        console.log(
            `Could not find element with id 'page-content' in template ${templatePath}. Generating page without markdown content.`
        );
    }

    const wrapperHtmlElement = document.getElementsByTagName('html');
    if (!wrapperHtmlElement.length) {
        console.log(`Templates should contain the 'html' tag.`);
        process.exit(1);
    }

    headContentElement.innerHTML = `<meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${frontmatter.title}</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
    />
    ${headContentElement.innerHTML}`;

    if (frontmatter.template === 'blog' && blogContentElement) {
        await processDirectory('pages/blog', processBlogListingItem, blogContentElement);
    }

    const finalHtml = document.getElementsByTagName('html')[0].outerHTML;
    const pagePathParts = pagePath.replace('pages/', '').split('/');
    const pageName = pagePathParts.pop().split('.md')[0];
    let targetPath = pagePathParts.join('/');
    targetPath = frontmatter.template === 'post' ? targetPath.replace(dateRegEx, '') : targetPath;
    await fs.writeFile(`public/${targetPath}/${pageName}.html`, finalHtml);
}

async function processBlogListingItem(pagePath, blogContentElement) {
    if (pagePath === 'pages/blog/index.md') return;
    const fileData = await fs.readFile(pagePath, 'utf-8');
    let slug = pagePath.replace('/index.md', '').substring(24, pagePath.length);
    slug = `blog/${slug}`;
    const { attributes: frontmatter, body: markdown } = await fm(fileData);
    blogContentElement.innerHTML = `${blogContentElement.innerHTML}
    <li>
        <a href="${slug}">
            <img src="${slug}/${frontmatter.cover}" alt="${frontmatter.title}" />
            <span>${frontmatter.title}</span>
        </a>
        <p>${frontmatter.date.toLocaleDateString()}</p>
    </li>`;
}

function startServer(port) {
    console.log(`Development server starting on http://localhost:${port}`)
    return http
        .createServer(function (req, res) {
            const url = req.url
            let filePath = url
            if (url === '/') {
                filePath = '/index.html'
            } else if (!url.includes('.')) {
                filePath += '/index.html'
            }
            fs.readFile('public' + filePath, function (err, data) {
                if (err) {
                    res.writeHead(404)
                    res.end('<h1>404: Page not found</h1>')
                    return
                }
                res.writeHead(200)
                res.end(data)
            })
        })
        .listen(port)
}

async function safeExecute(func) {
    try {
        await func()
    } catch {}
}