[![Netlify Status](https://api.netlify.com/api/v1/badges/206f3494-1d75-4366-9e5f-1f80fa6c2b6f/deploy-status)](https://app.netlify.com/sites/joanmira/deploys)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/P5P8D81J9)

## Joan Mira Studio Website

- Built using a custom static site generator with NodeJs. Just around 300 lines of code
- Algolia integration for uploading and searching content
- All content using markdown files
- Blog comments based on Github issues provided by [Utterances](https://utteranc.es/)
- Blog category pages generation
- Handle dynamic content directly in the templates with EJS templating system
- Sitemap generation
- RSS feed generation
- Styles based on pico.css with CSS variables
- Minified CSS and JS code
- Dark mode support
- All icons are SVG
- Dynamic image resizing and conversion to WebP with Sharp
- Includes 301 redirects
- Hosting and DNS in Netlify
- Custom 404 error page
- Posthog integration and data capture modal consent
- OG meta tags and favicons
- Set the HTML lang attribute based on the content language
- Hot reloading in development mode

### Nice to have in the future

- A minimal admin area (CMS) to edit/publish stories
- Preloaded URLs (like Gatsby)
- Convert images in the markdown files to WebP
- Blog posts belonging to several categories (low priority)