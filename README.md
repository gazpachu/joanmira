[![Netlify Status](https://api.netlify.com/api/v1/badges/206f3494-1d75-4366-9e5f-1f80fa6c2b6f/deploy-status)](https://app.netlify.com/sites/joanmira/deploys)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/P5P8D81J9)

## Joan Mira Studio Website

- Built using a custom static site generator with NodeJs. < 500 lines of code
- Algolia integration for uploading and searching content
- All content using markdown files
- Blog comments based on Github issues provided by [Utterances](https://utteranc.es/)
- Blog category pages generation
- Sitemap generation
- RSS feed generation
- Styles based on pico.css and CSS variables
- Dark mode support
- All icons are SVG
- Dynamic image resizing and convertion to WebP with Sharp
- Includes 301 redirects
- Hosting and DNS in Netlify
- Custom 404 error page
- Google Analytics integration
- OG meta tags and favicons
- Set the html lang attribute based on the content language

### Current limitations

- No hot reloading implemented
- Dynamic content for the templates has to be set in the JavaScript side
- Each blog post can only belong to a single category
- Images in markdown files are still not using WebP