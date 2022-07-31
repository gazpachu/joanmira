---
title: Página web de la Royal Opera House
cover: /work/roh/images/logo.png
location: Reino Unido
color: "#c60c30"
categories: web wordpress zend php inverted featured
template: project
---

La Royal Opera House fue mi primera experiencia profesional en el Reino Unido. Fui contratado como Desarrollador Digital por el Director de Diseño y Desarrollo (antiguo diseñador principal de programas de la BBC) con un objetivo muy importante: reconstruir completamente la página web de la ROH desde cero. Un proyecto crítico para el negocio que requería una importante revisión del sistema de venta de entradas online, la infraestructura del servidor, la arquitectura de la información, la experiencia del usuario, la gestión de contenidos y una experiencia de compra online que estuviera a la altura de los altos estándares de la organización.

Una vez que entendimos los problemas del antiguo sitio web, decidimos empezar a construir [la sección de noticias](http://www.roh.org.uk/news), que es una pieza bastante aislada que podía ser manejada por una instalación de WordPress con un tema y plugins personalizados.

![](/work/roh/images/1.jpg "Captura de pantalla de la sección de noticias de ROH")

### Los requisitos y el plan

Mientras trabajábamos en la sección de noticias, seguimos explorando y aprendiendo sobre la organización. Seguimos un enfoque de [diseño guiado por el dominio](https://es.wikipedia.org/wiki/Dise%C3%B1o_guiado_por_el_dominio), que es una forma muy eficaz de entender las necesidades y los requisitos de los distintos departamentos y unidades que trabajan en la institución. Cosas como la navegación o la jerarquía de las páginas son temas muy políticos y construir la arquitectura de la información correcta puede llevar algún tiempo...

Por otra parte, uno de los principales problemas de la antigua web era **la sala de espera**. La ROH vende sus entradas muy rápidamente. En cuanto están disponibles para su compra, miles de clientes acuden a la web para adquirirlas. Esta situación creaba un cuello de botella en la infraestructura y los usuarios tenían que esperar online durante largos periodos hasta poder comprar sus entradas.

El nuevo sitio web tenía que resolver este problema como prioridad principal. Para ello, nos asociamos con [Pop](http://www.popagency.com/), una agencia digital con sede en Estados Unidos. Tenían mucha experiencia con [Tessitura](http://www.tessituranetwork.com/), el software que utilizan muchos teatros de todo el mundo para gestionar la taquilla y su red, así que eran el socio perfecto para nuestro proyecto.

El acuerdo con Pop consistía en que ellos se encargarían de la API de Tessitura y del proceso de compra (incluida la selección de asientos y la pasarela de pago) y nosotros nos encargaríamos del resto. El verdadero cuello de botella estaba en la base de datos de Tessitura. Era enorme y lenta. Necesitábamos desvincular el sitio web de esa base de datos si queríamos tener una experiencia fluida.

En este punto, otro desarrollador se unió al equipo. Ahora éramos tres, un número todavía pequeño para un proyecto de esta envergadura, pero teníamos un 100% de dedicación y contacto directo con las partes interesadas, los clientes y otros miembros del departamento de medios digitales.

### Framework e infraestructura

![](/work/roh/images/3.jpg "Evaluación de la web actual y desarrollo de la nueva © ROH 2011")

Una vez que entendimos el problema, estudiamos los diferentes frameworks PHP de código abierto que existen para construir el resto del sitio web. Aunque las páginas estáticas decidimos construirlas con WordPress. ¿Por qué código abierto y por qué PHP? Bueno, la ROH se financia en parte con dinero público y creíamos en los datos abiertos, los estándares web y en hacer las cosas lo más abiertas y accesibles posible. Recuerdo que Zend, CodeIgniter o Symfony eran los más populares en ese momento, así que nos decidimos por Zend debido a su robustez y a su enorme comunidad. También decidimos utilizar Doctrine (el ORM de Symfony), Apache, Linux y MySQL. Un stack LAMP clásico.

Para la infraestructura, empezamos con Rackspace pero pronto nos pasamos a la nube elástica de Amazon AWS. Esto nos permitiría escalar la web durante los días de venta de entradas para permitir más tráfico y hacer más agradable la experiencia de compra.
En este punto, sabíamos que íbamos a tener una API para acceder a los datos de los precios de las entradas, las fechas de los eventos, etc., pero no a todos los datos que necesitábamos. La API iba a dar acceso sólo a un subconjunto de datos relacionados con las entradas y los eventos. Todavía necesitábamos acceder a los datos relacionados con las producciones, los artistas, los calendarios de temporada, etc. Para conseguir estos datos, ideamos un plan: implementar triggers MS SQL en la BD de Tessitura que actualizaran los datos en nuestra BD MySQL. Esto significa que diseñamos nuestra propia base de datos MySQL, con tablas como 'producciones', 'eventos', 'personas', etc, y los datos de esas tablas se actualizarían automáticamente desde la BD principal de Tessitura. Espectacular. La teoría era genial, pero la práctica resultó ser un poco compleja debido a las restricciones del firewall, los conectores ODBC y la escritura de algunas consultas SQL complejas. Sin embargo, pudimos configurarlo y nos sentimos muy bien al verlo funcionar.

### Internet como CMS

Otro tema interesante fue la gestión de imágenes y vídeos. La ROH es una organización artística y los documentos audiovisuales son muy importantes. Necesitábamos un sistema barato, escalable, que fuera amigable con las redes sociales y fácil de trabajar. Decidimos utilizar Flickr para las imágenes, Youtube para los vídeos, SoundCloud para el audio y Delicious para el contenido relacionado.

Aquí es donde aprendí una lección muy importante de mi jefe de equipo... "**Tenemos que usar Internet como un CMS**". Esta frase resonó en mí durante años y la utilicé varias veces después en otros proyectos. Es muy poderosa y significativa. Al principio, no estaba seguro de ello. Quería tener el control y alojar los archivos en nuestro servidor. Pero luego me di cuenta de las ventajas de delegar esta tarea en alguien que es el mejor en ello, como Flickr. Tenían una API sólida y bien documentada, un sistema de recorte automático y un público enorme. Estos sitios no desaparecen en un día, ¿por qué deberíamos preocuparnos por ello?

Así que personalizamos un plugin de Flickr para WordPress (para la sección de noticias) y creamos una pequeña zona de administración para que el equipo de contenidos pudiera actualizar las imágenes de la página de inicio. El resto de las páginas con datos dinámicos (eventos, producciones, temporadas, etc.) utilizaban imágenes y vídeos procedentes directamente de la base de datos de Tessitura.

### Menos es más

![](/work/roh/images/0.jpg "The Royal Opera House home page")

Otra lección que aprendí en este proyecto es sobre el minimalismo y el diseño simple, o como se conoce comúnmente "menos es más". El mejor ejemplo es cuando hablamos de añadir iconos de redes sociales para compartir artículos de noticias. Al tener un blog personal y conocer los beneficios de tener esos botones, estaba convencido de que el mismo principio se aplicaría al sitio web de ROH, pero estaba equivocado.

Al observar la interfaz de iOS, me di cuenta de que las interfaces sencillas y claras mejoran la experiencia del usuario. Al principio, pensé que podría parecer una especie de "elitismo institucional". Por ejemplo, "no pongo enlaces sociales porque no los necesito y eso es algo que hacen los blogs pequeños". Pero luego me di cuenta de que esta decisión tiene más que ver con los hábitos del público objetivo y con favorecer una UX fácil. Este enfoque también tiene un beneficio de SEO debido a que los usuarios tienen que volver al sitio web para continuar su conversación sobre una historia.

### Datos abiertos

También me gustaría hablar de la API que construimos para abrir los datos de ROH. En su momento nos pareció una gran idea. Lo que hicimos fue implementar muchos formatos diferentes (XML, JSON, RDF, RSS, ATOM, ICS) y [URLs semánticas/hackeables](https://es.wikipedia.org/wiki/URL_sem%C3%A1ntica) para el contenido del sitio web.

Como usuario, podía obtener las noticias en muchos formatos diferentes. No sólo el artículo, sino las categorías, el archivo, lo más leído, lo más comentado, etc. También se podía descargar el calendario de eventos (un día concreto, un mes, una semana,...) en el microformato ICS. Los eventos y los datos de producción también estaban disponibles para ser consumidos en JSON o XML. Se trataba principalmente de un sistema que permitía a la gente consumir los datos de ROH de una manera legible por la máquina. Todo lo que había que hacer era añadir ".xml" o ".rss" o ".json" al final de la URL.
Esta idea se inspiró en los [programas de la BBC](http://www.bbc.co.uk/blogs/radiolabs/2008/05/helping_machines_play_with_pro.shtml).

### Conclusión

Hay muchos temas interesantes de los que podría seguir hablando, como la búsqueda global, el etiquetado consistente, el proscenio (cabecera y pie de página globales), o **cómo fotografiamos cada asiento del teatro** y la vista desde ese asiento para mostrárselos a los usuarios en la página de selección de asientos durante el proceso de compra de entradas.

Fue una gran experiencia profesional y aprendí mucho. También fue mi primer trabajo en el Reino Unido, por lo que desconocía muchas diferencias culturales, lo que lo hizo aún más interesante. A día de hoy, **sigo considerando este proyecto como uno de los mejores logros de mi carrera**, sobre todo porque se trataba de un equipo muy pequeño con una gran responsabilidad y estaba rodeado de profesionales con mucho talento que me sirvieron de mentores y me hicieron un desarrollador más reflexivo y capaz.

### Artículos relacionados

21/02/2012: [Our new website: An update on progress](/es/blog/our-new-website-an-update-on-progress)

12/01/2012: [Our website: A look forward](/es/blog/our-website-a-look-forward)

### Algunas capturas de pantalla

![](/work/roh/images/15.jpg "Página de inicio")

![](/work/roh/images/14.jpg "Página de producción")

![](/obra/roh/images/4.jpg "Página de información")

![](/work/roh/images/5.jpg "Página de artículos")

![](/work/roh/images/6.jpg "Página de la cuenta de usuario")

![](/work/roh/images/7.jpg "Reserva del restaurante")

![](/work/roh/images/8.jpg "Selección de entradas")

![](/work/roh/images/9.jpg "Selección de asiento")

![](/work/roh/images/9.jpg "Pedido realizado")

![](/work/roh/images/11.jpg "Reserva de la hora de la comida")

![](/work/roh/images/12.jpg "Próximos eventos")

![](/work/roh/images/13.jpg "Calendario por semanas")

![](/work/roh/images/16.jpg "Artículo conmigo y con Jamie")

### Pantallas de ballet

Otro proyecto paralelo en el que tuve el placer de trabajar fue el de las pantallas de ballet. Una aplicación que se ejecuta en las pantallas de televisión de los estudios de baile de la ROH. Es una página HTML con algo de CSS con datos provenientes de un documento XSLT.

![](/work/roh/images/ballet.jpg)

### Equipo y oficina

![](/work/roh/images/roh-office.jpg "¡El equipo de desarrollo era pequeño pero con talento! Sólo dos desarrolladores y un diseñador/manager)")

![](/work/roh/images/roh-workspace.jpg "Mi espacio de trabajo")

![](/work/roh/images/roh-team-2.jpg "El equipo de medios digitales")

![](/work/roh/images/party.jpg "Fiesta ROH")

## Diseño antiguo

![](/work/roh/images/old-home.jpg "Antigua página de inicio")

![](/work/roh/images/old-whats-on.jpg "Página antigua")

![](/work/roh/images/old-discover.jpg "Página antigua")
