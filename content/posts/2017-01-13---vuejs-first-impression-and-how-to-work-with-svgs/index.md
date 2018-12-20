---
title: "VueJS: first impression and how to work with SVGs"
cover: images/vuejs.jpg
category: work
---

After a delightful year working with [React](https://facebook.github.io/react/), I decided to explore a new framework. I was looking at [Ember](http://emberjs.com/) (not so popular at the moment), [Elm](http://elm-lang.org) (although is not a framework, it still lacks a lot of stuff), [Angular2](https://angular.io/) (not interested to learn TypeScript yet) and [Vue](https://vuejs.org) (gaining a lot of momentum). At the end, I choose [Vue](https://vuejs.org)!

The **first impression was very good**. The Vue docs are really good and their website is so clear and helpful. Then I learned about the [awesome resources](https://github.com/vuejs/awesome-vue), where I found [a couple](https://github.com/SimulatedGREG/electron-vue) [of boilerplates](https://github.com/quasarframework/quasar) that work with [Electron](https://github.com/electron/electron), which is a library from Git used to build desktop apps. Do you use the [Git Atom editor](https://atom.io/) or the [Slack desktop app](https://slack.com/downloads)? Then you should know that those are built with **Electron**!

Anyway, Electron has nothing to do with Vue, but it was just a nice discovery and I wanted to share it.

The target of this article is to show you how I managed to setup SVGs with the [Vue webpack boilerplate](https://github.com/vuejs-templates/webpack). By the way, if you don't know that boilerplate, I encourage you to really check it out. I was very impressed by its quality and the ridiculous simplicity when it comes to creating a new project. It takes just 5 lines to do it!

My intention was to replicate the setup that I had with my previous React boilerplate, where I had a folder with all the SVG files and I could import them into my React components whenever I require them.

To do so, in your newly created Vue project, you need to install this webpack loader called [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader). Then, in `build/webpack.base.conf.js` we just have to declare the new loader (line 88 to 92 aprox.):

```
loader: 'svg-sprite?' + JSON.stringify({
    name: '[name]_[hash]',
    prefixize: true
})
```

Also, in the same file, you have to remove the `svg` format from line 72: `test: /\.(png|jpe?g|gif)(\?.*)?$/,`. If we don't do it, this loader would try to load the SVG and the svg-sprite loader wouldn't do anything.

That's all we need as far as webpack configuration. The next step is to create a new component called `Icon`. This component will be useful to render inline SVGs in our pages. Remember that, this is the only way we can change the colors of the SVGs using `fill` or `stroke`. If you load them as CSS backgrounds or `<img>` tags, then you will not be able to alter their colors.

Create a new file called `Icon.vue` inside your `src/components` folder and paste the following code:

```
<template>
  <svg :class="className" :width="width" :height="height">
    <use :xlink:href="glyph" />
  </svg>
</template>

<script>
export default {
  name: 'icon',
  props: ['className', 'glyph', 'width', 'height'],
};
</script>

<style scoped>
.icon {
  display: inline-block;
}
</style>
```

This is a basic implementation. You can can expand it with more CSS code or props.

Finally, to load the SVGs, I'm going to show you a simple example of how to load a logo icon and a close icon for the main App component, where we have the app layout. If you haven't modified the boilerplate yet (which is unlikely), you will have an `App` component. If that's not the case, don't worry, this example applies to any component.

Let's see first the code and then we can review it:

```
<template>
  <div id="app">
    <icon width="100" height="100" :glyph="Logo"></icon>
    <icon width="100" height="100" :glyph="Close"></icon>
  </div>
</template>

<script>
import Icon from './components/Icon';
import Logo from './assets/logo.svg';
import Close from './assets/close.svg';

export default {
  name: 'app',
  components: {
    Icon,
  },
  data() {
    return { Logo, Close };
  },
};
</script>
```

Whenever you want to add a new SVG to your template, you have to add code in 4 different places:

1. Import the file from the `assets` folder: `import Logo from './assets/logo.svg';`

2. Add the `Icon` component to the `components` object

3. Return the imported SVG in the `data` function

4. Call the `Icon` component and pass the appropriate props: `<icon width="100" height="100" :glyph="Logo"></icon>`

That's all!

If you find a better way to do this. Please let me know. Thanks.
