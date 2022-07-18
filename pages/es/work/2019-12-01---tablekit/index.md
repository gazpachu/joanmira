---
title: "TableKit: Sistema de diseño de TableCheck"
cover: "images/logo.png"
location: Japón
color: "#ff9848"
categories: react emotion typescript styleguidist storybook open-source web inverted
template: project
---

<p class="align-center">
<a class="btn external" role="button" href="https://tablekit.tablecheck.com" target="_blank">Página web de TableKit</a>
<a class="btn github" role="button" href="https://github.com/tablecheck/tablekit" target="_blank">Código fuente</a>
</p>

![](/work/tablekit/images/1.png)

Antes de unirme a TableCheck, ya era un gran aficionado a los sistemas de diseño. Construí [SugUI](/sugui) junto con una compañera de trabajo (diseñadora de UI/UX) en Vodafone. Por lo tanto, tenía una idea clara que quería hacer algo similar en TableCheck. Cuando me incorporé, tuve la suerte de encontrarme con que otros ingenieros del equipo también compartían la misma filosofía sobre la necesidad de un conjunto de herramientas de interfaz de usuario personalizado y unas directrices de diseño adecuadas para mantener la coherencia en todos los productos de la empresa.

Al principio, la empresa utilizaba un fork de [AtlastKit](https://atlaskit.atlassian.com/), (el kit de herramientas de interfaz de usuario de Atlassian). Su nombre era TS Styling (TS de TableSolution, que era el nombre anterior de la empresa). Así que, al principio, utilicé este kit de herramientas para construir [Insight](/insight).

Unos meses más tarde, contratamos a un gran diseñador de UI/UX (que también era un apasionado de los sistemas de diseño) y entonces empezamos a construir TableKit v1 con algunas de las lecciones aprendidas de TS Styling. Utilizamos la aplicación Insight como referencia para construir los componentes de la interfaz de usuario y definir las directrices de diseño para la iconografía, las ilustraciones, la tipografía, etc.

## Tech Stack en v1 y v2

Cuando se construye un sistema de diseño, hay que tener en cuenta muchas cosas. Uno de los aspectos más importantes es la documentación. Dado que va a ser un proyecto vivo con actualizaciones continuas, la forma en que se redacta la documentación y los ejemplos tiene que ser muy fácil de actualizar y entender por cualquier persona de la organización. No sólo por los ingenieros y diseñadores, sino también por los jefes de producto, marketing, contenidos, relaciones públicas, control de calidad, etc.

Inicialmente, utilizamos [React Styleguidist](https://react-styleguidist.js.org/), y funcionó bien durante algún tiempo. Hasta que empezamos a enfrentarnos a sus limitaciones. Los principales problemas eran el diseño del layout (con la barra lateral izquierda) y el hecho de que todos los componentes de la interfaz de usuario se renderizaban al mismo tiempo, lo que hacía que la página estuviera bastante cargada y fuera un poco lento interactuar con ella. No obstante, la página de documentación tenía un aspecto bastante bueno. Aunque actualizar el contenido no era especialmente fácil, ya que teníamos que editar manualmente los archivos .md en el código base. No había ningún CMS que los diseñadores pudieran utilizar para actualizar el contenido.

Alrededor de un año después, decidimos migrar de Flow a TypeScript y al mismo tiempo, pasar de Styleguidist a [Storybook](https://storybook.js.org/). En este punto, estábamos pensando en separar los componentes de la interfaz de usuario del resto del contenido. Así que podríamos terminar con dos sitios web diferentes, uno para el UI Toolkit y otro para la documentación del sistema de diseño.

Una vez que terminamos la migración, acabamos con un sitio web que funcionaba bien para los componentes de la interfaz de usuario, pero no tuvimos tiempo suficiente para añadir el resto de la documentación. El equipo de diseño también estaba pasando por algunos cambios, incluyendo un nuevo Director Creativo que establecería una dirección ligeramente nueva.

## Directrices de diseño en la v1 y la v2

Exploramos muchos sistemas de diseño de grandes empresas tecnológicas, como [Material Design de Google](https://material.io/design), [Carbon Design System de IBM](https://carbondesignsystem.com/), [Base de Uber](https://baseweb.design/), etc. Al final nos decidimos por utilizar la fuente [IBM Plex](https://www.ibm.com/plex/), ya que admite muchos idiomas, incluido el japonés y ahora también los caracteres chinos.

En cuanto a los iconos, acabamos utilizando una combinación de [FontAwesome Icons](https://fontawesome.com/) y [TableCheck's Icon Library](https://github.com/tablecheck/tablecheck-icons). Un par de años más tarde, iniciamos la migración para utilizar [IBM Carbon Icons](https://carbondesignsystem.com/guidelines/icons/library/), ya que la colección es mayor y puede ser ampliada por los colaboradores.

En cuanto a los colores, decidimos tener un par de colores primarios y un par de colores secundarios. También definimos algunos colores de acento, aviso, éxito, borde, sombras de elevación, una escala de grises, etc. Pero al mismo tiempo, también necesitábamos unas cuantas escalas para cubrir las abundantes combinaciones de colores de las tarjetas de la aplicación Insight. Así llegamos a la siguiente tabla:

<p class="align-center">
<img src="/work/tablekit/images/2.gif" alt="Colores de Tablekit" />
</p>

El esquema de color se construyó tomando como referencia el color morado de la marca de TableCheck. A continuación, creamos 7 colores "básicos" adicionales con el mismo brillo y saturación visual. Una vez que tuvimos nuestros 8 colores básicos, añadimos 4 tonos más oscuros y 4 más claros de cada uno para nuestras escalas. Esto nos dio un total de 72 colores únicos con los que trabajar.

![](/work/tablekit/images/3.png)

Paleta completa (izquierda) - Subconjunto de colores del tema y de la interfaz de usuario [(derecha)](/work/tablekit/images/4.png)

Otro aspecto importante que había que definir era el espaciado. Terminamos adoptando una [cuadrícula de 8 puntos](https://spec.fm/specifics/8-pt-grid), que nos permitiría tener un valor base de 8px y varios pasos utilizando una base de 8:

![](/work/tablekit/images/5.png)

Para la tipografía, también utilizamos los planteamientos de base 8. Así, cada paso de altura de línea utilizaría incrementos completos o medios de 8:

![](/work/tablekit/images/6.png)

Ejemplo del componente de los botones (tamaño normal):

![](/work/tablekit/images/7.png)