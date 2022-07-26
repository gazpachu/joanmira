---
title: Algunos ajustes más de VueJS 2 para los principiantes
description: Mi experiencia con este nuevo framework de JavaScript para el front-end
cover: images/vuejs.jpg
template: post
category: work
---

Esta es mi segunda entrada en el blog sobre VueJS 2. En la primera, cubrí [mis impresiones iniciales y cómo trabajar con SVGs](/es/blog/primeras-impresiones-con-vuejs-y-como-trabajar-con-svgs). En este segundo post, voy a hablar de algunas cosillas que he descubierto y que no fueron tan sencillas de entender.

Antes de que sigas leyendo, recuerda que estoy usando el [Vue webpack boilerplate](vuejs-templates.github.io/webpack/), por lo que todos mis ajustes están adaptados a él. Sin embargo, si no estás usando este boilerplate, podrías captar las ideas y aplicarlas al tuyo.

### Cómo configurar SASS con archivos globales

Una de las primeras cosas que debes hacer es estructurar tu aplicación Vue con los mixins globales de SASS, variables, elementos, etc. Para ello, necesitas crear un archivo central `scss` con todas las declaraciones `@import` a otros archivos globales o comunes como `variables.scss`, `mixins.scss`. Hay varias formas de hacerlo (como siempre), pero he encontrado la siguiente, la más fácil:

1. Abre `build/utils.js` y ve a la línea 43. Ahí es donde está el cargador de SASS. Luego reemplaza la línea con esto: `scss: generateLoaders(['css', 'sass?data=@import "~assets/styles/app";'])`.

2. El cambio anterior cargará el archivo `assets/styles/app` y ahí es donde tienes que poner todos tus `@imports`.

3. Puedes poner otra ruta, pero yo estoy guardando todos mis archivos genéricos de SASS dentro de `src/assets/styles`.

### Cómo enviar datos de un componente hijo a su padre u otros componentes

De [los documentos oficiales de Vue](https://vuejs.org/v2/guide/components.html#One-Way-Data-Flow):

> Todos los props forman una **vinculación unidireccional** entre la propiedad child y la parent: cuando la propiedad parent se actualiza, fluye hacia el child, pero no al revés. Esto evita que los componentes hijos muten accidentalmente el estado del padre, lo que puede hacer que el flujo de datos de tu aplicación sea más difícil de razonar.

Parece ser que en versiones anteriores de Vue había dos métodos, llamados `dispatch` y `broadcast`, que nos permitían comunicarnos entre componentes, pero como puedes ver en los documentos de Vue, [han sido obviados](https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced) porque no escalan bien.

Así que lo que proponen es, utilizar una implementación de Flux como [Vuex](https://github.com/vuejs/vuex), que está [explicado aquí](https://vuejs.org/v2/guide/state-management.html), o si tu aplicación no va a ser muy compleja, puedes utilizar un `event hub` o `bus`. El ejemplo del `event hub` es [explicado aquí](https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced) y el ejemplo del `bus` es [explicado aquí](https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication). Creo que ambos son iguales, pero el ejemplo del `event hub` es más completo.

Si te decides por el `event hub`, entonces, un aspecto que los documentos no cubren es cómo inyectar el objeto `eventHub`` en todos los componentes hijos desde el componente raíz.

En el siguiente ejemplo, puedes ver cómo implementar el `eventHub` para que cada componente hijo pueda cambiar el encabezado de una página:

1. En `main.js`, crea el `eventHub` y asígnalo a Vue:

```javascript
const eventHub = new Vue();
Vue.prototype.$eventHub = eventHub;
```

2. Luego, pasa la variable a Vue:

```javascript
new Vue({
  router,
  eventHub,
  ...
```

3. Ahora puedes empezar a usar `emit` y `on` en tus componentes hijos. Cada vez que `emit` lance un valor, será enviado a todos los componentes y sólo aquellos que tengan un listener (`on`) para ese evento, obtendrán el valor.

```javascript
this.$eventHub.$emit('whateverChanged', this.passThisValue);
this.$eventHub.$on('whateverChanged', this.callThisFunction);
```

### Vídeos y bibliotecas útiles de VUE 2

* [Aprende VUE 2 paso a paso](https://laracasts.com/series/learn-vue-2-step-by-step)
* [Muchos videos de VUE 2](http://www.codechannels.com/channel/mindspace/)
* [Vue.js 2.0 en 60 minutos](https://www.youtube.com/watch?v=z6hQqgvGI4Y)
- Si necesitas una librería CSS y estás cansado de Bootstrap, te recomiendo [Vue Material](https://vuematerial.github.io). Es súper fácil y funciona muy bien
- Si necesitas cargar JSON, usa [Axios](https://github.com/mzabriskie/axios). Vue-resource ya no se mantiene.
