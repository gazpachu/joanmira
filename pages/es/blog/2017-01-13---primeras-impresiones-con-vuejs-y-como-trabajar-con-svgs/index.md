---
title: Primeras impresiones con Vue.js y como trabajar con SVGs
description: Mi experiencia con este nuevo framework de JavaScript para el front-end
cover: /blog/vuejs-first-impression-and-how-to-work-with-svgs/images/vuejs.jpg
template: post
category: work
---

Después de un año genial trabajando con [React](https://facebook.github.io/react/), decidí explorar un nuevo framework. Estuve mirando [Ember](http://emberjs.com/) (no es tan popular en este momento), [Elm](http://elm-lang.org) (aunque no es un framework, todavía le faltan muchas cosas), [Angular2](https://angular.io/) (no me interesa aprender TypeScript todavía) y [Vue](https://vuejs.org) (está ganando mucho impulso). Al final, ¡elegí [Vue](https://vuejs.org)!

La **primera impresión fue muy buena**. Los documentos de Vue son realmente buenos y su sitio web es muy claro y útil. Luego descrubrí los [recursos impresionantes](https://github.com/vuejs/awesome-vue), donde encontré [un par](https://github.com/SimulatedGREG/electron-vue) [de boilerplates](https://github.com/quasarframework/quasar) que funcionan con [Electron](https://github.com/electron/electron), que es una biblioteca de Git utilizada para construir aplicaciones de escritorio. ¿Utilizas el [editor Git Atom](https://atom.io/) o la [aplicación de escritorio Slack](https://slack.com/downloads)? ¡Entonces deberías saber que están construidas con **Electron**!

De todos modos, Electron no tiene nada que ver con Vue, pero ha sido un bonito descubrimiento y quería compartirlo.

El objetivo de este artículo es mostrarte cómo he conseguido montar SVGs con el [Vue Webpack boilerplate](https://github.com/vuejs-templates/webpack). Por cierto, si no conoces ese boilerplate, te animo a que lo consultes. Me impresionó mucho su calidad y su simplicidad a la hora de crear un nuevo proyecto. ¡Sólo se necesitan 5 líneas para hacerlo!

Mi intención era replicar la configuración que tenía con mi anterior boilerplate de React, donde tenía una carpeta con todos los archivos SVG y podía importarlos a mis componentes de React cada vez que los necesitaba.

Para ello, en tu proyecto Vue recién creado, necesitas instalar este cargador de Webpack llamado [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader). Luego, en `build/webpack.base.conf.js` sólo tenemos que declarar el nuevo cargador (línea 88 a 92 aprox.)

```javascript
loader: 'svg-sprite?' + JSON.stringify({
  name: '[name]_[hash]',
  prefixize: true
})
```

También, en el mismo archivo, tienes que borrar el formato `svg` de la línea 72: `test: /\.(png|jpe?g|gif)(\?.*)?$/,`. Si no lo hacemos, este cargador intentaría cargar el SVG y el cargador svg-sprite no haría nada.

Eso es todo lo que necesitamos en cuanto a la configuración de Webpack. El siguiente paso es crear un nuevo componente llamado `Icon`. Este componente será útil para representar archivos SVG inline en nuestras páginas. Recuerde que esta es la única forma en que podemos cambiar los colores de los SVG usando `fill` o `stroke`. Si los cargamos como fondos CSS o con etiquetas `<img>`, no se podrá modificar sus colores.

Crea un nuevo archivo llamado `Icon.vue` dentro de la carpeta `src/components` y pega el siguiente código:

```javascript
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

Esta es una implementación básica. Puedes ampliarla con más código CSS o props.

Finalmente, para cargar los SVGs, voy a mostrarte un ejemplo sencillo de cómo cargar un icono con un logo y un icono de cierre para el componente principal de la App, donde tenemos el diseño de la misma. Si aún no has modificado el boilerplate (lo cual es poco probable), tendrás un componente `App`. Si no es el caso, no te preocupes, este ejemplo se aplica a cualquier componente.

Veamos primero el código y luego podemos revisarlo:

```javascript
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

Siempre que quieras añadir un nuevo SVG a su plantilla, tienes que añadir código en 4 lugares diferentes:

1. Importa el archivo desde la carpeta `assets`: `import Logo from './assets/logo.svg';`

2. Añade el componente `Icon` al objeto `components`.

3. Devuelve el SVG importado en la función `data`.

4. Llama al componente `Icon` y pásale los props adecuados: `<icon width="100" height="100" :glyph="Logo"></icon>`.

Eso es todo.

Si encuentras una mejor manera de hacer esto. Por favor, compártela en los comentarios. Gracias.