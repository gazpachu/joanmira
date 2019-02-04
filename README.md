[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Build Status](https://travis-ci.org/gazpachu/joanmira.svg?branch=master)](https://travis-ci.org/gazpachu/joanmira)

# Joan Mira's personal website

[Live website](https://joanmira.com)

Powered by [GatsbyJS](https://gatsbyjs.org/), [ReactJS](https://reactjs.org) and [Github](https://github.com).

## Features

- Easy editable content in **Markdown** files (posts, pages and parts)
- **CSS** with `styled-jsx` and `PostCSS`
- **SEO** (sitemap generation, robot.txt, meta and OpenGraph Tags)
- **Social** sharing (Twitter, Facebook, Google, LinkedIn)
- **Images** lazy loading and `webp` support (gatsby-image)
- Post **categories** (category based post list)
- Full text **searching** (Algolia)
- **Contact** form (Netlify form handling)
- **RSS** feed
- 100% **PWA** (manifest.webmanifest, offline support, favicons)
- Google **Analytics**
- App **favicons** generator (node script)
- Easy customizable base **styles** via `theme` object generated from `yaml` file (fonts, colors, sizes)
- React **v.16.3** (gatsby-plugin-react-next)
- **Components** lazy loading (social sharing)
- **ESLint** (google config)
- **Prettier** code styling
- Webpack `BundleAnalyzerPlugin`

## Prerequisites

If you do not have Gatsby Cli installed yet, do it first.

```text
npm install --global gatsby-cli
```

More information on [GatsbyJS.org](https://www.gatsbyjs.org/tutorial/part-one)

## Getting started

Clone the repository.

Go into the newly created directory and run

```text
gatsby develop
```

to hot-serve your website on http://localhost:8000 or

```text
gatsby build
```

to create static site ready to host (/public).

To deploy to Github pages, just Instructions

```text
npm run deploy
```

##### External services

The starter uses external services for some functions: comments, searching, analytics. To use them you have to secure some access data. All services are free to use or have generous free tiers big enough for a personal blog.

Create an `.env` file like below in the root folder. Change `...` placeholders with real data.
<br />By default, your `.env` file will be ignored by git. Remove `.env` from `.gitignore` in order to be able to push the file to your repository.

```text
GOOGLE_ANALYTICS_ID=...
ALGOLIA_APP_ID=...
ALGOLIA_SEARCH_ONLY_API_KEY=...
ALGOLIA_ADMIN_API_KEY=...
ALGOLIA_INDEX_NAME=...
```

## Windows users

You should take a look at this: [Gatsby on Windows](https://www.gatsbyjs.org/docs/gatsby-on-windows/)

## Authors

- [Joan Mira](http://joanmira.com)
- [gatsby-starter-hero-blog](dev.greglobinski.com/gatsby-starter-hero-blog)

## Contributing

- Fork the repo
- Create your feature branch (git checkout -b feature/fooBar)
- Commit your changes (git commit -am 'Add some fooBar')
- Push to the branch (git push origin feature/fooBar)
- Create a new Pull Request
