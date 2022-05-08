---
title: "Lessons learned writing our own static site generator"
subtitle: "The journey from Gatsby to custom React SSR SSG"
template: post
date: 2022-01-19
cover: images/custom-static-site-generator.jpg
category: work
---

Article originally published on TableCheck's Tech Blog.

Nowadays, websites and web apps can be built and served in many different ways. Using pure HTML, Javascript, and CSS, with frameworks such as [React](https://reactjs.org/ ), [Vue](https://vuejs.org/ ), or [Angular](https://angularjs.org/ ), following a [CSR or SSR approach](https://developers.google.com/web/updates/2019/02/rendering-on-the-web ), [MPA](https://applandeo.com/blog/single-page-applications-versus-multi-page-applications-what-to-choose/#:~:text=What%20is%20an%20MPA%3F,have%20different%20levels%20of%20UI. ), using back-end frameworks like [Phoenix](https://www.phoenixframework.org/ ), with a CMS like [Wordpress](https://wordpress.org/ ) or [Drupal](https://www.drupal.org/ ), implementing static site generators like [Gatsby](https://jamstack.org/generators/gatsby/ ), [Next js](https://nextjs.org/ ), [Hugo](https://gohugo.io/ ), [Jekyll](https://jekyllrb.com/ ), and etc. The options are overwhelming.

If that wasn't enough, you can still dive into [0kb of JS frameworks](https://dev.to/this-is-learning/is-0kb-of-javascript-in-your-future-48og ), [AlpineJS](https://alpinejs.dev/ ), [Stimulus](https://stimulus.hotwired.dev/ ), [Petite Vue](https://github.com/vuejs/petite-vue ), [Astro](https://astro.build/ ), [Iles](https://iles-docs.netlify.app/ ), [MarjoJS](https://markojs.com/ ), [Qwik](https://github.com/BuilderIO/qwik ), [Turbo](https://github.com/hotwired/turbo-rails ), or [Remix](https://remix.run/ ), the new kid on the block.

But when websites have mostly static content (except for dynamic news/blog pages), that’s when [SSGs](https://jamstack.org/generators/ ) (Static Site Generators) become a great option. One of the most popular frameworks out there is [Gatsby](https://jamstack.org/generators/gatsby/ ). In fact, that is the one we used to build our previous website and for a time, it served us well.

One of the issues we discovered a couple of years after, was that the build times were taking longer and longer. This was due to the huge amount of pages that the site was accumulating–specifically because of the multiple languages–and the difficulty of building just one page. Instead, we had to build the whole website whenever a single page was updated.

We also realized that static sites don’t really need to have a lot of JavaScript and NPM dependencies. They should feel really light and easy to maintain. The main requirements are just HTML, CSS, and some JavaScript for a side or top navigation, a contact form, and some other bits and bobs.

Arriving at this point, we learned that Gatsby was releasing [incremental builds](https://www.gatsbyjs.com/blog/2020-04-22-announcing-incremental-builds/ ), but even with that potentially helpful feature, our minds were already set: we were going to build our own static site generator.

### The selected tech stack

At TableCheck we are highly invested in AWS, Typescript, React, Emotion, and our own UI Toolkit called [Tablekit](http://tablekit.tablecheck.com/ ). It became quite clear from the beginning that using these technologies could accelerate development and simplify maintenance. As a comparison exercise, Wahid Farid (project lead) also did a POC with [Hugo](https://gohugo.io/ ) and Joan Mira (front-end manager) with the EJS templating system, but eventually, we preferred to continue with the React SSR approach.

At the same time, our previous Gatsby website was building its pages by gathering the content from the [Storyblok](https://www.storyblok.com/home ) API. This was something that we were quite happy about, specifically because of the flexibility that provides this headless CMS for building pages using blocks with custom schemas. This allows us and content editors to build pages for different regions in the world by reusing common layouts and blocks defined in the CMS.

We also considered the possibility of using [Wordpress](https://wordpress.org/ ) and [Elementor](https://elementor.com/ ) (mostly because of the UX for content editors). But the fact that it’s based on PHP, requires other technologies and it’s often the target of hackers was something that we were not very keen on. Hence, we decided to continue with [Storyblok](https://www.storyblok.com/home ) as our CMS.

Regarding the infrastructure, Alexander Nicholson (SRE lead) suggested that we use a serverless approach ([Seed.run](https://seed.run/ )) with a lambda function to build the HTML static pages.

And finally, for the search functionality, Joan Mira suggested using [Algolia](https://www.algolia.com/ ) and for the product demo scheduling, Eri Koyano (product manager) suggested using [Calendly](https://calendly.com/ ).

This is the approved tech stack for our custom statically generated website:

*   AWS, serverless, and Seed.run
    
*   Typescript
    
*   React SSR
    
*   Emotion, Tablekit & CSS variables
    
*   Storyblok
    
*   Algolia and Calendly
    

### Website architecture

Once we decided on the technologies to use, TableCheck’s principal front-end engineer, Simeon Cheeseman, suggested using React SSR to build the pages. We brainstormed about how to make it work and ended up with the following:

1.  Content gets added/updated in Storyblok and the user clicks the save button
    
2.  A webhook gets triggered in Storyblok
    
3.  A NodeJS Express server running on a lambda function receives the webhook call
    
4.  A server-side script reads the story ID from the URL passed to the server
    
5.  The script calls the Storyblok API with that ID and gets all the data needed to build that specific page
    
6.  Then it generates the HTML using React components
    
7.  And finally, it uploads the file to an S3 bucket from where it’d be served to the Internet
    
We all agreed with this approach and Alexandr Shostyr (project technical lead) built a POC.

![](/blog/lessons-learned-writing-our-own-static-site-generator/images/static-site-generator-diagram.jpg "Architecture diagram")

### From the POC to the finish line

Once the POC was approved and the architecture validated, we continued the development with the help of Irina Soupel (front-end engineer). We soon realized that we'd have to do certain things slightly different from other TableCheck projects, especially because we were not using React in the front-end:

*   Use [emotion for SSR](https://emotion.sh/docs/ssr ) to support `nth-child` selectors
    
*   Figure out how to use CSS variables with Tablekit's theme provider
    
*   Create a simple Button and Input styled component to bypass an issue with hexToRgba
    

Another considerable hiccup we encountered was regarding building individual pages vs all pages. There are some Storyblok blocks that are common to all pages, like the top navigation or the footer. Therefore, whenever a content editor changes one of these blocks, we have to regenerate all the pages on the website. This represented a challenge since we would need to have a way to tell the build script if all pages need to be built or not. We are currently still investigating this point and will update the article once we find the appropriate solution.

At the same time, the blog listing pages were also tricky. First, we implemented them dynamically using Algolia. That worked fine but it required many API requests, which would make the navigation slow and costly. Finally, we found a way to build all these pages statically, even for the category and paginated listing pages.

We also had other challenges regarding the sitemap, legacy redirects, build complications due to having to share the same S3 bucket with another website, etc. Nonetheless, these issues are not representative of the migration process from Gatsby to our custom SSG.

### Next steps

Going forward, we still want to continue doing improvements. We will update the article in the future with more details. Here are some of the things we are considering doing:

*   The build speed: especially with supporting individual page builds
    
*   Preload critical assets and pages (like Gatsby does) to make the website load even faster than it already does, probably because we have very little JS code on it
    

Overall, it was a great experience building something new from scratch that we have full control over. More cool things will come. Stay tuned and follow us!