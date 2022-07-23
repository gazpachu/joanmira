---
title: Por qué migré de Gatsby a un pequeño generador de sitios estáticos personalizado
description: El placer de saber lo que ocurre bajo el capó y poder centrarse en la simplicidad y el minimalismo
template: post
cover: /blog/why-i-left-gatsby-and-built-my-own-tiny-static-site-generator/images/1.jpg
category: work
---

> La ingeniería de software es como la ingeniería aeronáutica. Cuanto menos peso, mejor.

A veces, los ingenieros de software olvidan esta simple premisa sobre el peso del código. Nos sumergimos en agujeros de conejo (o debería decir agujeros de JavaScript) que terminan hinchando nuestras aplicaciones con docenas y docenas de paquetes NPM, polyfills, helpers, arquitecturas exageradas, abstracciones y más abstracciones,...

¡El principal problema de tener mucho código es que tenemos que mantenerlo! Alguien podría argumentar, ohh, pero yo siempre me apoyo en OSS y en paquetes externos. Y esa es una estrategia perfectamente válida. El problema es que esos paquetes también se actualizan y a veces introducen cambios que rompen el código. Esto significa que alguien tiene que encargarse de actualizar esos paquetes, seguir los documentos de migración, arreglar los conflictos con otros paquetes, etc.

Por lo tanto, el tiempo que pensamos que ahorramos al depender de paquetes OSS externos comienza a desvanecerse. No me malinterpretes, apoyo el uso de OSS. Lo que quiero decir es que, en lugar de consumir OSS como si viviéramos en un buffet de comida permanente, deberíamos ser conscientes y elegir cuidadosamente las dependencias a importar. Porque cuantas más decidamos incluir en nuestro proyecto, más tiempo tendremos que invertir en el mantenimiento del código y más hinchados estarán nuestros paquetes de JS.

### El caso de uso del blogger ocupado

Desde que llegué a Japón, hace unos 3 años y medio, he estado muy ocupado. Mi trabajo es bastante exigente desde el punto de vista intelectual -como el de muchas otras personas en el ámbito de la informática- y después de al menos 8 horas resolviendo problemas complejos, no queda mucho espacio en el cerebro para exprimir nuevas ideas creativas. Si sumamos el hecho de que voy a la escuela de japonés tres veces a la semana y tengo que memorizar los trazos de los kanji en el orden adecuado, entonces las neuronas que quedan para el resto del día sólo pueden soportar un programa de Netflix muy superficial.

Creo que entiendes a dónde quiero llegar. Sí, no he estado actualizando este blog muy a menudo. Lo siento. Me hubiera gustado compartir algunas historias y experiencias de mi vida aquí en Japón. Pero, no tenía mucho tiempo ni energía para hacerlo. Por otro lado, también está el tema de Gatsby y lo que mencioné antes.

Después de 3 años de no actualizar el código base de este sitio web, te puedes imaginar lo obsoletas que estaban todas las dependencias y plugins de Gatsby. He intentado actualizar. Lo prometo. Pero en algún momento, sentí que sería mejor empezar de nuevo desde cero. Y eso es lo que hice.

### Un nuevo comienzo con un enfoque minimalista

Así es como un día, buscando pequeños generadores de sitios estáticos, me topé con [Teeny](https://github.com/yakkomajuri/teeny) y [PicoCSS](http://picocss.com/). Después de probarlos un poco, me decidí. Esto es todo lo que necesito. Voy a hacer un fork y empezar a construir mi propio generador de sitios estáticos. La idea de teeny era muy similar a lo que tenía en mente. Simplemente usar NodeJS para construir páginas HTML a partir de archivos markdown. ¿A quién le importa graphQL para un sitio web como este? Al mismo tiempo, también quería usar variables CSS y olvidarme de cualquier framework JS como React. La idea principal era mantener las dependencias lo más bajas posible para que en el futuro no tuviera que seguir migrando o actualizando el código base con funcionalidades que no necesito.

Llegados a este punto, me gustaría resaltar el hecho de que, cuando estamos construyendo aplicaciones, **debemos centrarnos siempre en lo que el usuario necesita y quiere**. En este caso particular, yo también soy un usuario, ya que soy el que escribe las historias en el blog y actualiza el contenido de las otras páginas. Si no tengo una buena UX y DX, entonces me va a dar pereza actualizar el contenido y la aplicación o sitio web va a morir. Por lo tanto, la enseñanza aquí es que **la tecnología no debe estar por encima de las necesidades del usuario o del objetivo principal del proyecto**. De la misma manera que una guitarra o una batería muy sofisticadas no deberían ser más importantes que la creación de la propia música.

### ¿Qué he aprendido de esta experiencia?

- Llevo utilizando markdown para el contenido desde que me mudé hace años de WordPress a Ghost. Este enfoque sigue siendo el adecuado. Es muy flexible. Puedes añadir código HTML cuando lo necesites y mantener el contenido limpio cuando no lo necesitas.

- Sigo estando muy contento de no tener que mantener otra base de datos o un servidor. Esa es la belleza de las SSG y del [Jamstack](https://jamstack.org/)

- Es agradable cambiar de marcha de vez en cuando y hacer algo de programación con NodeJs. Aunque la depuración no es tan agradable como en el front-end. Sigo prefiriendo lidiar con los problemas en un navegador en lugar de en la consola

- Es posible construir un generador de sitios estáticos con [menos de 15 dependencias npm](https://github.com/gazpachu/joanmira/blob/main/package.json)

- Ser capaz de construir todo el sitio web desde cero es impresionante. El conocimiento es poder. Puedes ajustar todo y sólo programar exactamente lo que necesitas, lo que hace que el código fuente se sienta mucho más ligero

- He añadido un nuevo modo oscuro que sigue el enfoque de PicoCSS para cuidar nuestros ojos

- Para las imágenes del portafolio, si vas a usar maquetas (como hice con las pantallas de Apple, iPads y portátiles), ¡asegúrate de exportarlas en PNG con transparencia! He pasado largos días teniendo que rehacer todas las imágenes de los 140 proyectos de mi portafolio porque estaban exportadas como JPG con fondo blanco y no se veían bien con el nuevo modo oscuro... &#129318;

- Como [Github Pages](https://pages.github.com/) no soporta redireccionamientos 301, tuve que migrar a [Netlify](https://netlify.com/). Me encantan ambas empresas. Hacen un gran trabajo en UX. Muchas gracias.

- Cosas como la conversión de JPG a WebP y la generación de sitemap XML o de feeds RSS son mucho más fáciles de lo que crees con los paquetes NPM adecuados

- Aproveché la refactorización del código para hacer algunas mejoras de diseño. Empezando por el logo. Me inspiré en [Rafael Nadal ganando su 14º campeonato en Roland Garros](https://en.wikipedia.org/wiki/Rafael_Nadal#Legacy). Así que, si encuentras algunas similitudes entre mi logo y el de Roland Garros, ahora ya sabes por qué

- He migrado de [Disqus](https://disqus.com/) a [Utterances](https://utteranc.es/). Principalmente por las dificultades con su modo oscuro. ¡Gracias, Disqus por tu servicio! ¡Me alegro mucho de haberlo hecho! Nunca se me había ocurrido que pudiéramos utilizar los Issues de Github para alojar los comentarios de la página web. Muy interesante

- He facilitado a los usuarios de esta web la suscripción al blog y también he añadido un widget [Ko-Fi](https://ko-fi.com) para empezar a experimentar con este tipo de patrocinios

- También he mejorado los resultados de búsqueda de Algolia, el contenido de la página de inicio, la página 404 y los estilos del pie de página

### ¿Cómo funciona el SSG?

Toda la lógica de generación del sitio web se concentra en un único archivo llamado `cli.js`. Tiene menos de 350 líneas de código. Esperemos que se pueda reducir aún más con algunas mejoras. Sólo hay otro script extra llamado `images.js` para generar las imágenes optimizadas para móviles y WebP.

La estructura de carpetas es muy simple:

- `pages`: contiene todos los archivos de contenido markdown organizados en subcarpetas. No es necesario seguir ningún patrón específico. El script de construcción replicará la misma estructura pero en su lugar con archivos HTML

- `public`: (inicialmente vacío) contiene todos los archivos generados que deben ser publicados

- `static`: imágenes globales, CSS y JS. Se copia en `public` cada vez que hacemos un build desde cero 

- `design`: copia de seguridad de los recursos de diseño originales utilizados para el proyecto

- `templates`: todos los diseños y parciales HTML utilizados para construir las páginas HTML finales

Hay dos scripts principales: `build` y `develop`. La única diferencia entre ellos es que el último inicia un servidor web local después de terminar el proceso de construcción.

Cuando activamos el proceso de construcción con `npm run build`, primero el script comienza a limpiar la carpeta `public` y a copiar/renombrar archivos. Luego comienza a procesar toda la carpeta `pages`, una carpeta específica dentro de `pages` o un archivo `.md` específico dependiendo de si pasamos un parámetro o no al script (es decir, `npm run build pages/blog/index.md`). Una vez que termina de procesar los archivos markdown, genera un mapa del sitio XML, un feed RSS y actualiza el índice en Algolia (sólo en el entorno de producción).

La función más importante es `processPage`. Es la que se encarga de cargar la plantilla correcta (especificada en el frontmatter de markdown) y de añadir las diferentes partes al HTML de salida. Además, si la página a procesar es un listado de páginas, como el índice del blog o una página de categorías del blog, entonces hace algo de lógica recursiva para obtener todos los elementos del listado.

### Un trabajo en progreso e ideas para el futuro

Algo que estoy considerando hacer es implementar un modo de administración muy básico (CMS) para poder publicar/editar historias desde una página web, en lugar de desde el editor de código. Puede ser útil cuando quiero escribir una historia en mi teléfono móvil. Este modo de administración tendría que conectarse con la API de Github para permitir que el sitio web escriba/edite archivos en el repositorio, así que es algo en lo que hay que pensar en el futuro.

Además, sería bueno encontrar una manera de implementar hot reloading y eventualmente refactorizar el código para que sea más fácil para otros ingenieros a utilizar en sus proyectos.

Seguiré actualizando el código nuevo en las próximas semanas o cuando tenga algo de tiempo. En la actualidad hay bastante código hard coded. Pero si alguien está interesado en echar un vistazo al código, aquí está:

<a class="btn github" role="button" href="https://github.com/gazpachu/joanmira" target="_blank">Código fuente</a>

### Actualización del 16 de Junio de 2022

He añadido [EJS](https://ejs.co/) para poder manejar datos dinámicos en las plantillas y ahora el código está mucho mejor organizado y reducido a unas 300 líneas. Hot reloading está casi funcionando pero aún lo tengo en otro branch.

### Actualización del 23 de Julio de 2022

He incluido soporte para dos idiomas y he traducido toda la web al español. Ha sido un trabajo considerable pero creo que ha merecido la pena. Aún falta poder traducir el widget de utterances para los comentarios del blog.

Foto del ala del avión por [Ross Parmly](https://unsplash.com/es/fotos/rf6ywHVkrlY)