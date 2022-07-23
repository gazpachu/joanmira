---
title: Lecciones aprendidas al escribir nuestro propio generador de sitios estáticos
description: "Migrando desde Gatsby a un SSG personalizado con React SSR. Artículo publicado originalmente en el blog tecnológico de TableCheck."
template: post
cover: /blog/lessons-learned-writing-our-own-static-site-generator/images/custom-static-site-generator.jpg
category: work
---

Hoy en día, los sitios web y las aplicaciones web se pueden construir y servir de muchas maneras diferentes. Utilizando HTML, Javascript y CSS puros, con frameworks como [React](https://reactjs.org/), [Vue](https://vuejs.org/) o [Angular](https://angularjs.org/), siguiendo un [enfoque CSR o SSR](https://developers.google.com/web/updates/2019/02/rendering-on-the-web), [MPA](https://applandeo.com/blog/single-page-applications-versus-multi-page-applications-what-to-choose/#:~:text=Qué%20es%20un%20MPA%3F,tienen%20diferentes%20niveles%20de%20UI.), utilizando frameworks de back-end como [Phoenix](https://www.phoenixframework.org/), con un CMS como [WordPress](https://wordpress.org/) o [Drupal](https://www.drupal.org/), implementando generadores de sitios estáticos como [Gatsby](https://jamstack.org/generators/gatsby/), [Next js](https://nextjs.org/), [Hugo](https://gohugo.io/), [Jekyll](https://jekyllrb.com/), etc. Las opciones son abrumadoras.

Por si fuera poco, aún puedes sumergirte en [0kb of JS frameworks](https://dev.to/this-is-learning/is-0kb-of-javascript-in-your-future-48og), [AlpineJS](https://alpinejs.dev/), [Stimulus](https://stimulus.hotwired.dev/), [Petite Vue](https://github.com/vuejs/petite-vue), [Astro](https://astro.build/), [Iles](https://iles-docs.netlify.app/), [MarjoJS](https://markojs.com/), [Qwik](https://github.com/BuilderIO/qwik), [Turbo](https://github.com/hotwired/turbo-rails), o [Remix](https://remix.run/).

Pero cuando los sitios web tienen un contenido mayoritariamente estático (excepto las páginas de noticias/blogs dinámicos), es cuando los [SSGs](https://jamstack.org/generators/) (Static Site Generators) se convierten en una gran opción. Uno de los frameworks más populares es [Gatsby](https://jamstack.org/generators/gatsby/). Ese es el que usamos para construir nuestro anterior sitio web y durante un tiempo, nos sirvió bien.

Uno de los problemas que descubrimos un par de años después, fue que los tiempos de construcción eran cada vez más largos. Esto se debía a la enorme cantidad de páginas que acumulaba el sitio -especialmente por los múltiples idiomas- y a la dificultad de construir una sola página. En cambio, teníamos que construir todo el sitio web cada vez que se actualizaba una sola página.

También nos dimos cuenta de que los sitios estáticos no necesitan tener un montón de dependencias de JavaScript y NPM. Deben ser ligeros y fáciles de mantener. Los requisitos principales son sólo HTML, CSS y algo de JavaScript para una navegación lateral o superior, un formulario de contacto y algunas otras cosas.

Al llegar a este punto, nos enteramos de que Gatsby estaba lanzando [builds incrementales](https://www.gatsbyjs.com/blog/2020-04-22-announcing-incremental-builds/), pero incluso con esa característica potencialmente útil, nuestras mentes ya estaban establecidas: íbamos a construir nuestro generador de sitios estáticos.

### La tecnología seleccionada

En TableCheck estamos muy comprometidos con AWS, Typescript, React, Emotion y nuestro propio kit de herramientas de interfaz de usuario llamado [TableKit](http://tablekit.tablecheck.com/). Desde el principio quedó claro que el uso de estas tecnologías podría acelerar el desarrollo y simplificar el mantenimiento. Como ejercicio de comparación, Wahid Farid (líder del proyecto) también hizo un POC con [Hugo](https://gohugo.io/) y Joan Mira (manager del front-end team) con el sistema de plantillas EJS, pero finalmente, preferimos continuar con el enfoque basado en React SSR.

Al mismo tiempo, nuestro anterior sitio web de Gatsby construía sus páginas recogiendo el contenido de la API de [Storyblok](https://www.storyblok.com/home). Esto era algo de lo que estábamos bastante contentos, específicamente por la flexibilidad que proporciona este headless CMS para construir páginas usando bloques con esquemas personalizados. Esto nos permite a nosotros y a los editores de contenidos construir páginas para diferentes regiones del mundo reutilizando diseños y bloques comunes definidos en el CMS.

También consideramos la posibilidad de usar [WordPress](https://wordpress.org/) y [Elementor](https://elementor.com/) (sobre todo por la UX para los editores de contenido). Pero el hecho de que esté basado en PHP, requiere otras tecnologías distintas a las que usamos habitualmente y suele ser el objetivo de los hackers era algo que no nos entusiasmaba. Por ello, decidimos seguir con [Storyblok](https://www.storyblok.com/home) como nuestro CMS.

En cuanto a la infraestructura, Alexander Nicholson (líder de SRE) sugirió que utilizáramos un enfoque sin servidor ([Seed.run](https://seed.run/)) con una función lambda para construir las páginas estáticas HTML.

Y, por último, para la funcionalidad de búsqueda, Joan Mira sugirió utilizar [Algolia](https://www.algolia.com/) y para la programación de la demostración del producto, Eri Koyano (manager de producto) sugirió utilizar [Calendly](https://calendly.com/).

Esta es la tecnología aprobada para nuestro sitio web personalizado generado estáticamente:

* AWS, serverless y Seed.run
* Typescript
* React SSR
* Emotion, TableKit y variables CSS
* Storyblok
* Algolia y Calendly

### Arquitectura del sitio web

Una vez que decidimos las tecnologías que íbamos a utilizar, el principal ingeniero de front-end de TableCheck, Simeon Cheeseman, sugirió utilizar React SSR para construir las páginas. Hicimos una lluvia de ideas sobre cómo hacerlo funcionar y terminamos con lo siguiente:

1. El contenido se añade/actualiza en Storyblok y el usuario hace clic en el botón de guardar
2. Un webhook se activa en Storyblok
3. Un servidor NodeJS Express que se ejecuta en una función lambda recibe la llamada del webhook
4. Un script del lado del servidor lee el ID de la historia desde la URL pasada al servidor
5. El script llama a la API de Storyblok con ese ID y obtiene todos los datos necesarios para construir esa página específica
6. A continuación, genera el HTML utilizando componentes de React
7. Y por último, sube el archivo a un bucket de S3 desde donde se servirá a Internet
    
Todos estuvimos de acuerdo con este enfoque y Alexandr Shostyr (líder técnico del proyecto) construyó un POC.

![](/blog/lessons-learned-writing-our-static-site-generator/images/static-site-generator-diagram.jpg "Diagrama de arquitectura")

### Del POC a la línea de meta

Una vez aprobado el POC y validada la arquitectura, continuamos el desarrollo con la ayuda de Irina Soupel (ingeniera de front-end). Pronto nos dimos cuenta de que tendríamos que hacer ciertas cosas ligeramente diferentes a otros proyectos de TableCheck, especialmente porque no estábamos usando React en el front-end:

* Usar [emotion for SSR](https://emotion.sh/docs/ssr) para soportar selectores `nth-child`.
* Averiguar cómo utilizar las variables CSS con el ThemeProvider de Tablekit
* Crear componentes nuevos para un botón y campo de entrada para evitar un problema con hexToRgba
    
Otro problema considerable que encontramos fue el de hacer builds de páginas individuales en lugar de todas las páginas a la vez. Algunos bloques de Storyblok son comunes a todas las páginas, como la navegación superior o el pie de página. Por lo tanto, cada vez que un editor de contenido cambia uno de estos bloques, tenemos que regenerar todas las páginas del sitio web. Esto representó un desafío, ya que tendríamos que tener una manera de decirle al script encargado del build si todas las páginas necesitan ser construidas o no. Actualmente seguimos investigando este punto y actualizaremos el artículo cuando encontremos la solución adecuada.

Al mismo tiempo, las páginas del listado del blog también fueron complicadas. Primero, las implementamos dinámicamente usando Algolia. Funcionaba bien, pero requería muchas peticiones a la API, lo que hacía que la navegación fuera lenta y costosa económicamente. Finalmente, encontramos la manera de construir todas estas páginas de forma estática, incluso para las páginas de categorías y listados paginados.

También tuvimos otros problemas relacionados con el mapa del sitio, las redirecciones heredadas, las complicaciones de los builds debido a que teníamos que compartir el mismo bucket de S3 con otro sitio web, etc. No obstante, estos problemas no son representativos del proceso de migración de Gatsby a nuestro SSG personalizado.

### Próximos pasos

En el futuro, todavía queremos seguir haciendo mejoras. Actualizaremos el artículo en el futuro con más detalles. Estas son algunas de las cosas que estamos considerando hacer:

* La velocidad de los builds: especialmente con el apoyo a la construcción de páginas individuales 
* Precargar assets y páginas críticas (como hace Gatsby) para que el sitio web cargue aún más rápido de lo que ya lo hace, probablemente porque tenemos muy poco código JS en él
    
En general, fue una gran experiencia la construcción de algo nuevo desde cero donde tenemos el control total. Vendrán más cosas interesantes. Stay tuned!

### Actualización de marzo de 2022

Buenas noticias! Después de un poco de trabajo, hemos sido capaces de implementar construcciones de páginas individuales con StoryBlok.

La forma en que terminamos haciéndolo es copiando/pegando el ID de la página en una entrada dentro de un diálogo modal que aparece al hacer clic en una tarea personalizada. Esto nos permite pasar el ID de la página que queremos construir a la función Lambda.