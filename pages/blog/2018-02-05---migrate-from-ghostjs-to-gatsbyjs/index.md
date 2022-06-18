---
title: Migrate from GhostJS to GatsbyJS
description: My experience working with this new static site generator that everyone seems to love
cover: images/1.jpg
template: post
category: work
---

<a class="btn github" href="https://github.com/gazpachu/joanmira" target="_blank">Source code</a>

I've been using the community version (self-hosted) of [GhostJS](http://ghost.org) since 2016 in my personal websites. At the beginning it was all good, I loved it. I decided to migrate from Wordpress to Ghost because WP was getting always targeted by hackers and the code was becoming messy with all sorts of plugins, bugs, etc.

But then, after a couple of years, I started falling out of love. I don't blame Ghost, it was probably me. I became lazy to upgrade to the latest version of Ghost, which required a lot of changes in the codebase and also in the VPS config I had in [OVH](http://ovh.es). Due to this situation, I didn't really update my websites much.

Time passed and then I realised I really needed to update my website with new projects. I also wanted to leave my hosting provider and hopefully find a modern and free web hosting service I could use and integrate in a CI/CD pipeline. That's when I started researching about modern static site generators and how I found [GatsbyJS](http://gatsbyjs.org).

There are other static site generators out there like [NextJS](https://nextjs.org/), or [these other](https://www.netlify.com/blog/2017/05/25/top-ten-static-site-generators-of-2017/). I was interested in Gatsby because it uses GraphQL, a technology I want to learn and it's also based on ReactJS.

### Preparing the migration

After installing GatsbyJS and exploring a bit how it works, I started researching how could I transfer all my blog posts and static pages into Gatsby's folder structure, with the posts as markdown files and the images stored in subfolders. Luckily enough, there was a kind soul that [built a module](https://github.com/InsidersByte/ghost-to-gatsby) to do exactly that.

The module takes the export file from Ghost and automatically creates the folders for the posts renamed with the post date and the post slug. It then places inside the post in markdown format and downloads the images into an `images` folder. Unfortunately, the module didn't fully download all the images nor produced all the markdown files, but still, I got a lot of the work done for free!

### Finding a starter package

In the Gatsby community, there are many boilerplates/templates, or how they call it, [starter packages](https://www.gatsbyjs.org/starters/?v=2). There are different approaches for building a new website. You could start it completely from scratch, just using the `gatsby-cli` tool or you could install a starter and then build from there. In my case, I chose the [starter-hero-blog](https://github.com/greglobinski/gatsby-starter-hero-blog), as it already had some features I was interested to learn.

### Start formatting the posts

A new concept I learned with Gatsby is the `frontmatter`. The frontmatter is the first section of a book and is generally the shortest; it is also sometimes called the prelims, or preliminary matter. In Gatsby and also in the static site generators world, the frontmatter is the data at the top of the markdown files that is going to be like its `meta data`. So it will contain the name of the featured image, the category the post belongs to, the slug, date, etc. The structure is open, so you can decide what data you want to use.

In my case, because the posts folders already contain the post date and the slug, I decided not to include them again in the frontmatter. For blog posts, I decided to store only the category, title and cover image.

This part of choosing which meta data to use in all blog posts is quite important, as every markdown file will have to contain these values, so think well what you need. You can always use the `search in all files` feature of your text editor to rename stuff, but it's not ideal to keep doing that...

After the blog posts from Ghost were imported into Gatsby, I've realised that I had to format a bit the `frontmatter`, so this, together with fixing image URLs, cleaning up markup and improving some articles, will take a considerable amount of time, depending of how many posts you have in your website.

### Adding new features

In my case, I needed to add a few new things:

- **Blog pagination**: this would allow users to divide the listing page into several pages, otherwise all the blog posts would show up, which is not ideal
- **Moving the blog from the index to `/blog`**: I wanted to have the homepage for something else, so I had to do a few changes in the `gatsby-config.js` file to accomodate the blog in a different URL
- **Create nodes for projects and static pages**: these changes would require new layout files and changes in the config

Check the [source code](https://github.com/gazpachu/joanmira) if you want to explore how I did these changes.

### Setting up CI/CD and deploying to github pages

One of the benefits of moving to a static site generator is that I no longer need to maintain a server by myself. I can just generate the html, css and javascript files and upload them into github pages. That's it!

To deploy to github, there's no need to have a continuous integration and continuous delivery pipeline. You can just install the `gh-pages` package and add the deploy script (`"deploy": "gh-pages -d public"`) to your `package.json` file.

But, if you want an automatic way to deploy your website everytime you push something new to the `master` branch, have a look at my [.travis.yml](https://github.com/gazpachu/joanmira/blob/master/.travis.yml) file and setup your own pipeline in [TravisCI](http://travis-ci.org)
