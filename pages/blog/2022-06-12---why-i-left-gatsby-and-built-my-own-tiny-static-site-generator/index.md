---
title: Why I migrated from Gatsby to a tiny custom static site generator
description: The pleasures of knowing what is going on under the hood and being able to focus on simplicity and minimalism
template: post
cover: images/1.jpg
category: work
---

> Software engineering is like aeronautical engineering. The less weight, the better.

Sometimes, software engineers forget this simple premise about the weight of the code. We immerse ourselves in rabbit holes (or I should say JavaScript holes) that end up making our apps very bloated. With dozens and dozens of NPM packages, polyfills, helpers, overkill architectures, abstractions and more abstractions,...

The main problem with having lots of code is that we have to maintain it! Someone could argue, ohh, but I always rely on OSS and external packages. And that's a perfectly fine strategy. The problem is that those packages also get updated and sometimes they introduce breaking changes. This means, that someone has to take care of updating those packages, follow the migration docs, fix the conflicts with other packages, etc.

Therefore, the time we think we save by relying on external OSS packages starts to fade away. Don't get me wrong, I support the use of OSS. What I mean is that, instead of consuming OSS as if we are living on a permanent food buffet, we should be mindful and choose carefully the dependencies to import. Because the more we decide to include in our project, the more time we will need to invest in the code maintenance and the more bloated our JS bundles will be.

## The busy blogger use case

Since I arrived in Japan, around 3.5 years ago, I've been very busy. My job is quite intellectually demanding - as with many other people in IT - and after at least 8 hours of solving complex problems, there's not a lot of room left in the brain for squeezing new creative ideas. If we add up the fact that I'm going to Japanese school three times a week and have to memorize kanji strokes in the proper order, then the neurons left for the day can only handle a very shallow Netflix show.

I think you get where I'm going. Yes, I haven't been updating this blog very often. I'm sorry about that! I would have loved to share some stories and experiences of my life here in Japan. But, I didn't have much time or energy left to do it. The other issue I had is related to Gatsby and what I mentioned before.

After 3 years of not updating the codebase of this website, you can imagine how outdated all the Gatsby dependencies and plugins were. I tried to upgrade. I promise. But at some point, I just felt like it'd be better to start again from scratch. And that's what I did.

## A new beginning with a tiny approach

This is how one day, looking around for small static site generators, I stumbled upon [Teeny](https://github.com/yakkomajuri/teeny) and [PicoCSS](http://picocss.com/). After testing them a bit, I made up my mind. This is it. I'm gonna fork them and start building my static site generator. The idea of teeny was very similar to what I had in mind. Just use NodeJS to build HTML pages from markdown files. Who cares about graphQL for a website like this? At the same time, I also wanted to use CSS variables and forget about any JS framework like React. The main idea was to keep the dependencies as low as possible so that in the future I wouldn't need to keep migrating or updating the codebase for features that I don't need.

Arriving at this point, I would like to highlight the fact that, when we are building apps, **we should always focus on what the user needs and wants**. In this particular case, I am also a user, since I'm the one writing the stories on the blog and updating the content of the other pages. If I don't have a good UX and DX, then nothing is going to happen and the app or website is going to die. Therefore, the teaching here is that **technology shouldn't be above the user's needs or the primary goal of the project**. In the same way that a guitar or a drumset shouldn't be more important than creating the music itself!

## What have I learned from this experience?

- I've been using markdown for content since I moved years ago from WordPress to Ghost. This approach still feels right. It's very flexible. You can add HTML code when you need it and keep the content clean when you don't

- I'm still very glad not to have to maintain yet another database or a server. That is the beauty of SSGs and the [Jamstack](https://jamstack.org/)

- It's nice to switch gears once in a while and do some NodeJs coding. Although the debugging is not as enjoyable as in the front-end. I still prefer dealing with issues in a browser rather than in the terminal

- You can build a static site generator with [just 12 npm dependencies](https://github.com/gazpachu/joanmira/blob/main/package.json)

- Being able to build the whole website from scratch is awesome. Knowledge is power. You can tweak everything and just code exactly what you need, which makes the codebase feel much lighter

- Added a new dark mode that follows the PicoCSS approach to take care of our eyes. You are welcome

- For portfolio images, if you are going to use mockups (like I did with the Apple screens, iPads and laptops), make sure to export them in PNG with transparency! I've spent long days having to redo all the images of the 140 projects on my portfolio because they were exported as JPGs with a white background and they didn't look good with the new dark mode... &#129318;

- Since [Github Pages](https://pages.github.com/) doesn't support 301 redirects, I had to migrate to [Netlify](https://netlify.com/). I also moved my DNS to Netlify and started using the free [Zoho Mail](https://www.zoho.com/mail) plan for the `@joanmira.com` accounts. I love both companies. They do a great job in UX. Thank you so much!

- Things like JPG to WebP conversion and XML sitemap or RSS feed generation are much easier than you think with the right NPM packages

- I took advantage of the refactoring to do some design improvements along the way. Starting from the logo. I got inspired by [Rafael Nadal winning his 14th championship at Roland Garros](https://en.wikipedia.org/wiki/Rafael_Nadal#Legacy). So, if you find some similarities between my logo and the Roland Garros logo, now you know why

- I migrated from [Disqus](https://disqus.com/) to [Utterances](https://utteranc.es/). Mainly because of difficulties with their dark mode. Thank you, Disqus for your service! I'm so glad I did! It never occurred to me that we could use Github's Issues for hosting website comments. Very interesting

- I've made it easier for users of this website to subscribe to the blog and also added a [Ko-Fi](https://ko-fi.com) widget to start experimenting with this type of sponsor economy

- I've also improved the Algolia search results, the homepage content, the 404 page and the footer styles

## How does the SSG work?

The whole website generation logic is concentrated in a single file called `cli.js`. It is less than 500 lines of code. Hopefully, it can be even further reduced with some improvements. There is just another extra script called `images.js` for generating the mobile-optimized and WebP images.

The folder structure is very simple:

- `pages`: it contains all the markdown content files organized in subfolders. No need to follow any specific pattern. The build script will replicate the same structure but instead with HTML files

- `public`: (initially empty) it contains all the generated files that need to be published

- `static`: global images, CSS and js. It gets copied to `public` every time we build

- `design`: backup of the original design resources used for the project

- `templates`: all the HTML layouts and partials used for building the final HTML pages

There are two main scripts: `build` and `develop`. The only difference between them is that the latter starts a local web server after finishing the build process.

When we trigger the build process with `npm run build`, first the script starts cleaning up the public folder and copying/renaming files. Then it starts processing the whole `pages` folder, a specific folder within `pages` or a specific .md file depending if we pass a parameter or not to the script (i.e. `npm run build pages/blog/index.md`). Once it finishes processing the markdown files, it generates an XML sitemap, an RSS feed and updates the index in Algolia (only for prod).

The most important function is `processPage`. This is the one in charge of loading the correct template (specified in the markdown front matter) and adding the different bits and bobs to the output HTML. Also, if the page to process is a listing page, like the blog index or a blog category page, then it does some recursive logic to get all the list items.

## A work in progress and ideas for the future

Something that I'm considering doing is implementing a very basic admin mode (CMS) to be able to publish/edit stories from a website, rather than from the code editor. It can be useful when I want to write a story on my mobile phone. This admin mode would have to connect with the Github API to allow the website to write/edit files in the repository, so that's something to think about in the future.

Also, it'd be nice to find a way to have hot reloading and eventually refactor the code to make it easier for other engineers to use on their projects.

I will keep pushing new code in the next weeks or when I get some time. At the moment there are quite a lot of hardcoded things. But if you are interested to have a look at the WIP code, here it is:

<a class="btn github" role="button" href="https://github.com/gazpachu/joanmira" target="_blank">Source Code</a>

[Teeny](https://github.com/yakkomajuri/teeny) SSG by [Jakko Majuri](https://github.com/yakkomajuri). Thanks for your work!

Wing photo by [Ross Parmly](https://unsplash.com/es/fotos/rf6ywHVkrlY)