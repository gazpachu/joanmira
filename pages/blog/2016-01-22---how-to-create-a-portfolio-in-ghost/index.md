---
title: How to create a portfolio in ghost
description: "My experience working with the new kid on the block: The Ghost publishing platform"
cover: images/ghost-portfolio.jpg
template: post
category: work
---

I've been a **Wordpress** developer for quite some time, but at some point, I got tired of the massive attention that it was getting from **hackers**. I also started to feel tired of the old LAMP stack and wanted to have a fresh start with relevant technologies like Node.js, Nginx, Ember.js, etc. That's how I switched all my personal websites to [Ghost](http://ghost.org).

I've been using the **fantastic** [Ghost](http://ghost.org) platform to run this website since almost a year ago and so far, it has been a great experience. In this article, I'm going to explain how I built the [/work](http://joanmira.com/work) section of this website. In a way, it's a bit of a hack, considering that [Ghost](http://ghost.org) doesn't have yet a clear way to create pages of a specific type or have custom post fields that we can read in the templates (like in Wordpress).

To make this work, we are going to use:

* The **tag system**: to categorise our portolio works
* A new **page-work.hbs** [template](https://themes.ghost.org/docs/templates): to display the portfolio grid and navigation
* The **page.hbs** [template](https://themes.ghost.org/docs/templates): to create the HTML structure of the portfolio pages
* The new **{{#get}}** [helper](https://themes.ghost.org/docs/get): to search for portfolio entries among all our Ghost posts
* The [Isotope library](http://isotope.metafizzy.co/): to create the interactive animated responsive masonry layout

You can read more about the mentioned Ghost features in the [documentation](https://themes.ghost.org/docs/about). Notice that the [{{get}} helper](https://themes.ghost.org/docs/get) is still in beta.

The way it works is very simple, we are going to use normal Ghost tags (like web, mobile, video, design, etc) to categorise our portfolio items and we will also use the '**work**' tag to identify the pages that need to be treated as portfolio pages.

This approach has at least **one limitation**:

If we are going to use the **page.hbs** template for the portfolio entries, that means we cannot create new pages on the fly because that template is used by default for every new page we create. For the rest of static pages of our site, we will have to use specific new templates. For example, the about page will require a new template called page-about.hbs, the contact page will require a new template called page-contact.hbs, etc. Which means, **this approach is more appropriated for small sites** that don't have many static pages and the new content is usually going to be either a blog post or a new portfolio entry.

### Step 1. Create a new HTML template to display the portfolio grid

First we are going to create a new template. I called it page-work.hbs (because my URL is /work), but you can call it whatever you prefer, ie. page-portfolio, page-projects, etc. In this template, we are going to have:

* Some intro copy (entered with the markdown editor)
* The portfolio main navigation
* The grid with the portfolio items

And this is the code we will use:

```html
<section>
  {{#post}}
    {{content}}
  {{/post}}
</section>

<main>
  <div class="work-navigation">
    <div id="filters" class="button-group">
      <button class="btn is-checked" data-filter="*">ALL</button>
      <button class="btn" data-filter=".web">WEB</button>
      <button class="btn" data-filter=".desktop">DESKTOP</button>
      <button class="btn" data-filter=".mobile">MOBILE</button>
      <button class="btn" data-filter=".prototype">PROTOTYPE</button>
      <button class="btn" data-filter=".installation">INSTALLATION</button>
      <button class="btn" data-filter=".open-source">OPEN SOURCE</button>
      <button class="btn" data-filter=".consultancy">CONSULTANCY</button>
      <button class="btn" data-filter=".design">DESIGN</button>
      <button class="btn" data-filter=".ux">UX</button>
      <button class="btn" data-filter=".video">VIDEO</button>
      <button class="btn" data-filter=".photo">PHOTO</button>
    </div>
  </div>

  <div class="work-grid clearfix">
    <div class="grid-sizer"></div>
    {{#get "posts" limit="all" include="tags" filter="tag:work+page:true"}}
      {{#foreach posts}}
        <a href="/{{slug}}" class="{{tags separator=" " autolink="false"}}">
          <div class="work-thumb"></div>
          <h2 class="name">{{title}}</h2>
          <p class="meta"><span class="date">{{date published_at format="YYYY"}}</span><span class="country">{{#has tag="uk"}}UK{{/has}}{{#has tag="spain"}}Spain{{/has}}{{#has tag="multiple-regions"}}Multiple regions{{/has}}</span></p>
        </a>
      {{/foreach}}
    {{/get}}
  </div>
</main>
```

The first part of the code will render the content that we enter in the markdown editor. Then we define the portfolio navigation buttons, each one of them has a filter attribute with a class name. When clicked, the isotope library will display only the portfolio entries that have the class name specified in the filter attribute of the button.

Finally, in the work-grid block, we are going to use the {{get}} helper to get a collection of posts that have the tag 'work' and are marked as 'page'. That will skip all the normal blog posts and all the pages that don't have the 'work' tag.

Then we are going to loop through the collection (using {{#foreach}} and render an anchor tag with the metadata of each post in the collection. Notice that to render the post tags, we use the helper {{tags}} inside the class attribute of the anchor tag. That is the key point of this approach.

The content inside the anchor tag is not enforced. You can style it however you prefer. I'm just rendering the post date and a country string or another depending on the post tags.

### Step 2. Setup the isotope configuration

Now that our markup is ready, we need to download the [Isotope library](http://isotope.metafizzy.co/) and load it on our page. There are many different ways to do this, depending on what type of task manager you are using, if you are bundling and minifying the code and how your Ghost theme is structured. So I will leave that for you. The only thing to bear in mind is that we need the library to be loaded on the page!

Once we are sure that the library is loading, we need to set it up. Once again, the place where you should put the following code, depends on how your theme is structured, but you should have a Javascript file somewhere in your theme that you can use:

```javascript
// init Isotope
var $grid = $('.work-grid').isotope({
  itemSelector: '.work',
  percentPosition: true,
  masonry: {
    columnWidth: '.grid-sizer'
  }
});

// bind filter button click
$('#filters').on('click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

// change is-checked class on buttons
$('.button-group').each( function(i, buttonGroup) {
  var $buttonGroup = $(buttonGroup);
  $buttonGroup.on('click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $(this).addClass('is-checked');
  });
});
```

In the first part of the code, we are just attaching Isotope to the work-grid block defined in our HTML template. Then we are telling Isotope that our portfolio thumbnails will have the class name 'work'. The rest of the settings are the ones indicated by the [Isotope documentation](http://isotope.metafizzy.co/#getting-started) to make the grid responsive.

The next bit takes care of the navigation click events. It basically tells Isotope to rearrange the items in the grid based on the selected filter.

Finally, the last snippet updates the 'checked' class names in the navigation buttons when they are clicked. Notice that we are targeting the buttons inside the 'button-group' blocks. That's because you might decide to have different sets of navigations, one for filtering and another one for sorting. You can find out about how to sort items in the [Isotope documentation](http://isotope.metafizzy.co/#getting-started).

### Step 3. Create new entries

The next step is to create a few new entries in your Ghost admin panel and prepare them to be portfolio entries. Remember that all you have to do is to check the option 'Turn this post into a static page' and assign at least the 'work' tag.

### Step 4. Decide what to do with the post images

Regarding the thumbnail images that will be used in the Isotope grid, there are at least a couple of options.

The first one (which I didn't use) would be to add a post image using the post sidebar settings in the admin panel. Then you would retrieve that image during the {{foreach}} loop in the 'page-work.hbs' template and render it as an &lt;img> or as a CSS `background-image`. This option is the best if you only need one image for the thumbnails, no background colors or other stuff and you are not going to use the post image on the portfolio entry page (page.hbs).

The other option would be more time-consuming (in terms of maintenance) but more flexible in terms of presentation. I chose this option because I wanted to have specific CSS for every single thumbnail in my portfolio grid. That means, that every time I want to add a new item to my portfolio, I have to manually update my CSS with the project logo. Why did I complicate my life in such a way? Just because I wanted to have nice roll-over animations with background changing colors and keep the post image for the page.hbs template :-)

So, if you just want to display normal project thumbnails as images, I would go with the first option. This way you could add new portfolio items directly from the admin panel without the need to touch a line of code!

### Step 5. Modify the page.hbs template

We are going to use this template as the base for every new portfolio page:

```html
{{#post}}
  {{#if image}}
    <section class="hero" style="background-image: url({{image}})"></section>
  {{/if}}

  <main class="content {{#if image}}{{else}}no-hero{{/if}}>
    <article class="{{post_class}}">
      <h1 class="post-title">{{{title}}}{{#if tags}}<time datetime="{{date format="YYYY-MM-DD"}}">{{date format='YYYY'}}</time>{{/if}}</h1>
      <section class="post-content">
        {{content}}
      </section>
    </article>
  </main>
{{/post}}
```

Depending on which route you decided to take in the previous step and if you want to display the post image at the top of the portfolio entry page, you would need the first condition or not.

The rest of the code is just setting a basic HTML structure to render the content of the portfolio entry.

### Step 6. Set the basic styles for the grid

In your CSS, add the following styles. I'm not including all the parts that relate only to my specific website, like the hover animations, background images, etc, but if you are interested, let me know in a comment and I will add them:

```css
.work-grid {
  .grid-sizer,
  .work {
    width: 16.67%;

    @media screen and (max-width: 1500px) {
      width: 20%;
    }

    @media screen and (max-width: 1200px) {
      width: 25%;
    }

    @media screen and (max-width: 900px) {
      width: 33.34%;
    }

    @media screen and (max-width: 700px) {
      width: 50%;
    }

    @media screen and (max-width: 380px) {
      width: 100%;
    }
  }

  .work {
    position: relative;
    box-sizing: border-box;
    float: left;
    height: 200px;
    overflow: hidden;

    .work-thumb {
      position: absolute;
      height: 100%;
      width: 100%;
      background-repeat: no-repeat;
      background-position: center;
    }

    .name, .meta {
      opacity: 0;
      position: relative;
      color: white;
    }

    .name {
      padding-left: 40px;
      padding-right: 40px;
      font-size: 1.5em;
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 60px;

      @media screen and (max-width: 700px) {
        font-size: 1.2em;
        max-height: 70px;
      }
    }

    .meta {
      .date {
        margin-right: 5px;
      }
    }

    /* If you decided to go with option 2 in the previous step,
        you will need to manually link your portfolio thumbnail CSS
        by adding a tag with the name of the project */
    &.project-name {
      background-color: #c60c30; // this is optional
      .work-thumb {
        background-image: url(/assets/work/project-name/logo.png);
      }
    }
  }
}
```

### Step 7. Ready to go!

At this point, you should be ready to start adding your portfolio entries, content and images. If you find something missing in my code or there's anything that doesn't make much sense, let me know in a comment and I will refine it.

Good luck! and keep blogging with [Ghost](http://ghost.org) ;-)
