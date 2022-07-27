---
title: Migrar desde GhostJS a GatsbyJS
description: Mi experiencia trabajando con este nuevo generador de sitios estáticos que todo el mundo parece adorar
cover: images/1.jpg
template: post
category: work
---

<a class="btn github" href="https://github.com/gazpachu/joanmira" target="_blank">Código fuente</a>

Llevo usando la versión comunitaria (autoalojada) de [GhostJS](http://ghost.org) desde 2016 en mis sitios web. Al principio, todo era bueno, me encantaba. Decidí migrar de WordPress a Ghost porque WP estaba siendo siempre objetivo de los hackers y el código se estaba volviendo desordenado con todo tipo de plugins, bugs, etc.

Pero luego, después de un par de años, empecé a desenamorarme. No culpo a Ghost, probablemente fui yo. Me dio pereza actualizar a la última versión de Ghost, lo que requería muchos cambios en el código fuente y también en la configuración del VPS que tenía en [OVH](http://ovh.es). Debido a esta situación, no actualicé mucho mis sitios web.

El tiempo pasó y entonces me di cuenta de que necesitaba actualizar mi sitio web con nuevos proyectos. También quería cambiar mi proveedor de alojamiento por otro más moderno y gratuito que pudiera utilizar e integrar en un pipeline de CI/CD. Fue entonces cuando empecé a investigar sobre generadores de sitios estáticos modernos y cómo encontré [GatsbyJS](http://gatsbyjs.org).

Hay otros generadores de sitios estáticos por ahí como [NextJS](https://nextjs.org/) o [estos otros](https://www.netlify.com/blog/2017/05/25/top-ten-static-site-generators-of-2017/). Me interesó Gatsby porque utiliza GraphQL, una tecnología que quería aprender y además está basado en ReactJS.

### Preparando la migración

Después de instalar GatsbyJS y explorar un poco su funcionamiento, empecé a investigar cómo podía transferir todos los posts y páginas estáticas de mi blog a la estructura de carpetas de Gatsby, con los posts como archivos markdown y las imágenes almacenadas en subcarpetas. Por suerte, hubo un alma bondadosa que [construyó un módulo](https://github.com/InsidersByte/ghost-to-gatsby) para hacer exactamente eso.

El módulo toma el archivo de exportación de Ghost y crea automáticamente las carpetas para las entradas renombradas con la fecha de la entrada y el slug de la misma. A continuación, coloca dentro del post en formato markdown y descarga las imágenes en una carpeta `images`. Desafortunadamente, el módulo no descargó completamente todas las imágenes ni produjo todos los archivos markdown, pero aún así, ¡obtuve gran parte del trabajo hecho de forma gratuita!

### Encontrar una plantilla inicial

En la comunidad Gatsby, hay muchos boilerplates/plantillas, o como ellos lo llaman, [starter packages](https://www.gatsbyjs.org/starters/?v=2). Hay diferentes enfoques para construir un nuevo sitio web. Puedes empezar completamente desde cero, sólo usando la herramienta `gatsby-cli` o puedes instalar un starter y luego construir desde ahí. En mi caso, elegí el [starter-hero-blog](https://github.com/greglobinski/gatsby-starter-hero-blog), ya que tenía algunas características que me interesaban aprender.

### Empezar a formatear los posts

Un nuevo concepto que aprendí con Gatsby es el `front matter`. El front matter es la primera sección de un libro y generalmente es la más corta; a veces también se le llama prelims, o materia preliminar. En Gatsby y también en el mundo de los generadores de sitios estáticos, el front matter son los datos en la parte superior de los archivos markdown que van a ser como sus metadatos. Así que contendrá el nombre de la imagen destacada, la categoría a la que pertenece el post, el slug, la fecha, etc. La estructura es abierta, así que puedes decidir qué datos quieres usar.

En mi caso, como las carpetas de entradas ya contienen la fecha de la entrada y el slug, decidí no incluirlos de nuevo en el asunto principal. Para las entradas del blog, decidí almacenar sólo la categoría, el título y la imagen de portada.

Esta parte de elegir qué metadatos usar en todas las entradas del blog es bastante importante, ya que cada archivo markdown tendrá que contener estos valores, así que piensa bien lo que necesitas. Siempre puedes usar la función `buscar en todos los archivos` de tu editor de texto para renombrar las cosas, pero no es ideal seguir haciendo eso...

Después de importar las entradas del blog de Ghost a Gatsby, me he dado cuenta de que tenía que formatear un poco el `front matter`, así que esto, junto con la corrección de las URLs de las imágenes, la limpieza del marcado y la mejora de algunos artículos, llevará una cantidad de tiempo considerable, dependiendo de cuántas entradas tengas en tu sitio web.

### Añadir nuevas funciones

En mi caso, necesitaba añadir algunas cosas nuevas:

- **Paginación del blog**: esto permitiría a los usuarios dividir la página del listado en varias páginas, de lo contrario, se mostrarían todas las entradas del blog, lo que no es ideal
- Mover el blog desde la raíz del dominio a `/blog`**: Quería tener la página de inicio para otra cosa, así que tuve que hacer algunos cambios en el archivo `gatsby-config.js` para acomodar el blog en una URL diferente
- **Crear nodos para proyectos y páginas estáticas**: estos cambios requerirían nuevos archivos de diseño y cambios en la configuración

Revisa el [código fuente](https://github.com/gazpachu/joanmira/tree/gatsby) si quieres explorar cómo hice estos cambios.

### Configuración de CI/CD y despliegue en páginas de GitHub

Uno de los beneficios de pasar a un generador de sitios estáticos es que ya no necesito mantener un servidor por mí mismo. Puedo simplemente generar los archivos HTML, CSS y JavaScript y subirlos a las páginas de Github. Y ya está.

Para desplegar en GitHub, no hay necesidad de tener una integración continua y un pipeline de entrega continua. Puedes simplemente instalar el paquete `gh-pages` y añadir el script de despliegue (`"deploy": "gh-pages -d public"`) a tu archivo `package.json`.

Pero, si quieres una forma automática de desplegar tu sitio web cada vez que hagas un push de algo nuevo a `master`, te recomiendo usar Netlify.
