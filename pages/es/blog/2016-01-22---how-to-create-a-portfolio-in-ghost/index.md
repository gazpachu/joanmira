---
title: Cómo crear un portafolio en ghost
description: "Mi experiencia trabajando con el nuevo CMS: La plataforma de publicación Ghost"
cover: images/ghost-portfolio.jpg
template: post
category: work
---

He sido un desarrollador de **WordPress** durante bastante tiempo, pero en algún momento, me cansé de la atención masiva que estaba recibiendo de **hackers**. También empecé a sentirme cansado del LAMP stack y quería tener un nuevo comienzo con tecnologías relevantes como Node.js, Nginx, Ember.js, etc. Así es como cambié todos mis sitios web a [Ghost](http://ghost.org).

He estado usando la **fantástica** plataforma [Ghost](http://ghost.org) para ejecutar este sitio web desde hace casi un año y hasta ahora, ha sido una gran experiencia. En este artículo, voy a explicar cómo construí la sección [/work](/es/work) de este sitio web. En cierto modo, es un poco un hack, teniendo en cuenta que [Ghost](http://ghost.org) no tiene todavía una forma clara de crear páginas de un tipo específico o tener campos de post personalizados que podamos leer en las plantillas (como en WordPress).

Para que esto funcione, vamos a utilizar:

* El **sistema de etiquetas**: para categorizar nuestros trabajos del portolio
* Una nueva **page-work.hbs** [plantilla](https://themes.ghost.org/docs/templates): para mostrar la rejilla del portafolio y la navegación
* El **page.hbs** [template](https://themes.ghost.org/docs/templates): para crear la estructura HTML de las páginas del portafolio
* El nuevo **{{#get}}** [helper](https://themes.ghost.org/docs/get): para buscar las entradas del portafolio entre todos nuestros posts de Ghost
* La [biblioteca Isotope](http://isotope.metafizzy.co/): para crear el diseño interactivo de mampostería responsiva

Puedes leer más sobre las características mencionadas de Ghost en la [documentación](https://themes.ghost.org/docs/about). Ten en cuenta que el [{{get}} helper](https://themes.ghost.org/docs/get) aún está en fase beta.

El funcionamiento es muy sencillo, vamos a utilizar las etiquetas normales de Ghost (como web, móvil, vídeo, diseño, etc) para categorizar los elementos de nuestr portafolio y también utilizaremos la etiqueta '**work**' para identificar las páginas que deben ser tratadas como páginas del portafolio.

Este enfoque tiene al menos **una limitación**:

Si vamos a utilizar la plantilla **page.hbs** para las entradas del portafolio, lo que significa que no podemos crear nuevas páginas sobre la marcha porque esa plantilla se utiliza por defecto para cada nueva página que creamos. Para el resto de las páginas estáticas de nuestro sitio, tendremos que utilizar nuevas plantillas específicas. Por ejemplo, la página de información requerirá una nueva plantilla llamada page-about.hbs, la página de contacto requerirá una nueva plantilla llamada page-contact.hbs, etc. Este enfoque es más apropiado para los sitios pequeños que no tienen muchas páginas estáticas y el nuevo contenido normalmente va a ser una entrada de blog o una nueva entrada de portafolio.

### Paso 1. Crear una nueva plantilla HTML para mostrar la cuadrícula del portafolio

Primero, vamos a crear una nueva plantilla. La he llamado page-work.hbs (porque mi URL es /work), pero puedes llamarla como prefieras, es decir, page-portfolio, page-projects, etc. En esta plantilla, vamos a tener:

* Un poco de texto de introducción (introducido con el editor markdown)
* La navegación principal del portafolio
* La rejilla con los elementos del portafolio

Y este es el código que usaremos:

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

La primera parte del código renderizará el contenido que introduzcamos en el editor markdown. Luego definimos los botones de navegación del portafolio, cada uno de ellos tiene un atributo de filtro con un nombre de clase. Al hacer clic, la biblioteca isotope mostrará sólo las entradas del portafolio que tengan el nombre de clase especificado en el atributo de filtro del botón.

Por último, en el bloque work-grid, vamos a utilizar el helper {{get}} para obtener una colección de entradas que tengan la etiqueta 'work' y estén marcadas como 'page'. Esto omitirá todas las entradas normales del blog y todas las páginas que no tengan la etiqueta "trabajo".

A continuación, vamos a recorrer la colección (utilizando {{#foreach}} y a mostrar una etiqueta de anclaje con los metadatos de cada entrada de la colección. Fíjate en que para mostrar las etiquetas de las entradas, utilizamos el ayudante {{tags}} dentro del atributo de clase de la etiqueta de anclaje. Este es el punto clave de este enfoque.

El contenido dentro de la etiqueta de anclaje no se impone. Puedes estilizarlo como prefieras. Yo sólo estoy renderizando la fecha del post y una cadena de país u otra dependiendo de las etiquetas del post.

### Paso 2. Establecer la configuración de isotope

Ahora que nuestro markup está listo, necesitamos descargar la [biblioteca Isotope](http://isotope.metafizzy.co/) y cargarla en nuestra página. Hay muchas maneras diferentes de hacer esto, dependiendo del tipo de gestor de tareas que estés utilizando, si estás empaquetando y minificando el código y cómo está estructurado tu tema Ghost. Así que lo dejaré a tu elección. Lo único que hay que tener en cuenta es que necesitamos que la biblioteca se cargue en la página.

Una vez que estemos seguros de que la biblioteca se carga, tenemos que configurarla. Una vez más, el lugar donde debes poner el siguiente código, depende de cómo esté estructurado tu tema, pero debes tener un archivo Javascript en algún lugar de tu tema que puedas utilizar:

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

En la primera parte del código, sólo estamos adjuntando Isotope al bloque work-grid definido en nuestra plantilla HTML. Luego le decimos a Isotope que las miniaturas de nuestro portafolio tendrán el nombre de clase 'work'. El resto de los ajustes son los indicados por la [documentación de Isotope](http://isotope.metafizzy.co/#getting-started) para que la rejilla sea responsiva.

La siguiente parte se encarga de los eventos de clic de navegación. Le dice a Isotope que reorganice los elementos de la cuadrícula en función del filtro seleccionado.

Finalmente, el último fragmento actualiza los nombres de clase 'checked' en los botones de navegación cuando se hace clic en ellos. Fíjese en que estamos apuntando a los botones dentro de los bloques 'button-group'. Esto es porque puedes decidir tener diferentes grupos de navegación, uno para filtrar y otro para ordenar. Puedes encontrar información sobre cómo ordenar elementos en la [documentación de Isotope](http://isotope.metafizzy.co/#getting-started).

### Paso 3. Crear nuevas entradas

El siguiente paso es crear unas cuantas entradas nuevas en tu panel de administración de Ghost y prepararlas para que sean entradas del portafolio. Recuerda que lo único que tienes que hacer es marcar la opción 'Convertir esta entrada en una página estática' y asignar al menos la etiqueta 'work'.

### Paso 4. Decidir qué hacer con las imágenes del post

En cuanto a las imágenes en miniatura que se utilizarán en la parrilla de Isotope, hay al menos un par de opciones.

La primera (que yo no utilicé) sería añadir una imagen de la entrada utilizando la configuración de la barra lateral de la entrada en el panel de administración. A continuación, recuperarías esa imagen durante el bucle {{foreach}} en la plantilla 'page-work.hbs' y la renderizarías como un &lt;img> o como un CSS `background-image`. Esta opción es la mejor si sólo necesita una imagen para las miniaturas, sin colores de fondo u otras cosas y no va a utilizar la imagen del puesto en la página de entrada del portafolio (page.hbs).

La otra opción llevaría más tiempo (en términos de mantenimiento) pero sería más flexible en términos de presentación. Elegí esta opción porque quería tener un CSS específico para cada una de las miniaturas de la cuadrícula de mi portafolio. Eso significa que cada vez que quiero añadir un nuevo elemento a mi portafolio, tengo que actualizar manualmente mi CSS con el logotipo del proyecto. ¿Por qué me he complicado la vida de esta manera? Sólo porque quería tener bonitas animaciones roll-over con colores cambiantes de fondo y mantener la imagen del post para la plantilla page.hbs :-)

Así que, si sólo quieres mostrar las miniaturas normales de los proyectos como imágenes, yo optaría por la primera opción. ¡De esta manera, podrías añadir nuevos elementos al portafolio directamente desde el panel de administración sin la necesidad de tocar una línea de código!

### Paso 5. Modificar la plantilla page.hbs

Vamos a utilizar esta plantilla como base para cada nueva página de portafolio:

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

Dependiendo de la ruta que hayas decidido tomar en el paso anterior y si quieres mostrar la imagen de la entrada en la parte superior de la página de la entrada del portafolio, necesitarás la primera condición o no.

El resto del código es sólo la configuración de una estructura HTML básica para mostrar el contenido de la entrada del portafolio.

### Paso 6. Establecer los estilos básicos para la cuadrícula

En tu CSS, añade los siguientes estilos. No estoy incluyendo todas las partes que se refieren sólo a mi sitio web específico, como las animaciones hover, imágenes de fondo, etc, pero si estás interesado, envíame un comentario y lo añadiré:

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

    /* Si te has decidido por la opción 2 en el paso anterior,
        tendrás que vincular manualmente la miniatura CSS de tu portafolio
        añadiendo una etiqueta con el nombre del proyecto */
    &.project-name {
      background-color: #c60c30; // esto es opcional
      .work-thumb {
        background-image: url(/assets/work/project-name/logo.png);
      }
    }
  }
}
```

### Paso 7. ¡Listo para empezar!

En este punto, deberías estar listo para empezar a añadir las entradas, el contenido y las imágenes de tu portafolio. Si encuentras algo que falta en mi código o hay algo que no tiene mucho sentido, envía un comentario y lo perfeccionaré.

Buena suerte! y sigue blogueando con [Ghost](http://ghost.org) ;-)
