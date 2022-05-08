---
title: "A few more VueJS 2 tweaks for the beginners"
cover: images/vuejs.jpg
date: 2017-01-31
template: post
category: work
---

This is my second blog post about VueJS 2. In the first one, I covered [my initial impressions and how to work with SVGs](http://joanmira.com/vuejs-first-impression-and-how-to-work-with-svgs/). In this second post, I'm going to talk about some bits and bobs that I've discovered and that it wasn't that straight forward to figure them out.

Before you continue reading, remember that I'm using the [Vue webpack boilerplate](vuejs-templates.github.io/webpack/), so all my tweaks are customised for it. Nonetheless, if you are not using this boilerplate, you might be able to grasp the ideas and apply them to yours.

### How to setup SASS with global files

One of the first things you might want to do is to structure your Vue app with proper SASS global mixins, variables, elements, etc. To do so, you need to create a central `scss` file with all the `@import` statements to other global or common files  like `variables.scss`, `mixins.scss`. There are several ways of doing that (as usual), but I've found the following one, the easiest:

1. Open `build/utils.js` and go to line 43. That's where the SASS loader is. Then replace the line with this: `scss: generateLoaders(['css', 'sass?data=@import "~assets/styles/app";'])`

2. The previous change will load the `assets/styles/app` file and that's where you have to put all your `@imports`.

3. You can put other path, but I'm saving all my generic SASS files inside `src/assets/styles`

### How to send data from a child component to its parent or other components

From [the official Vue docs](https://vuejs.org/v2/guide/components.html#One-Way-Data-Flow):

> All props form a **one-way-down binding** between the child property and the parent one: when the parent property updates, it will flow down to the child, but not the other way around. This prevents child components from accidentally mutating the parent’s state, which can make your app’s data flow harder to reason about.

So, it seems, in previous versions of Vue, there were two methods, called `dispatch` and `broadcast`, that would allowed us to communicate between components, but as you can see in the Vue docs, [they have been deprecated](https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced) because they don't scale well.

So, what they proposse is to, use a Flux implementation like [Vuex](https://github.com/vuejs/vuex), which is [explained here](https://vuejs.org/v2/guide/state-management.html), or if your app is not going to be very complex, you can use an `event hub` or `bus`. The `event hub` example is [explained here](https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced) and the `bus` example is [explained here](https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication). I believe they are both the same, but the `event hub` example is more thorough.

If you decide to go with the `event hub`, then, one aspect that the docs don't cover, is how to inject and the `eventHub` object into all the child components from the root component.

In the following example, you can see how to implement the `eventHub` so that every child component can change a page heading:

1. In `main.js`, create the `eventHub` and assign it to Vue:

```javascript
const eventHub = new Vue();
Vue.prototype.$eventHub = eventHub;
```

2. Then, pass the variable to Vue:

```javascript
new Vue({
  router,
  eventHub,
  ...
```

3. Now you can start using `emit` and `on` in your child components. Every time you `emit` a value, it will be sent to all components and only those who have a listener (`on`) for that event, will get the value.

```javascript
this.$eventHub.$emit('whateverChanged', this.passThisValue);
this.$eventHub.$on('whateverChanged', this.callThisFunction);
```

### Useful VUE 2 videos and libraries

* [Learn VUE 2 step by step](https://laracasts.com/series/learn-vue-2-step-by-step)
* [Lot's of VUE 2 videos](http://www.codechannels.com/channel/mindspace/)
* [Vue.js 2.0 In 60 Minutes](https://www.youtube.com/watch?v=z6hQqgvGI4Y)
- If you need a CSS library and you are tired of Bootstrap, I recommend [Vue Material](https://vuematerial.github.io). It's super easy and works very well
- If you need to load JSON, use [Axios](https://github.com/mzabriskie/axios). Vue-resource is no longer maintained.
