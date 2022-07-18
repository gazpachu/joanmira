---
title: Lighthouse
cover: "images/logo.png"
location: Reino Unido
color: "#122d59"
categories: vodafone react redux webpack web-app highcharts ux inverted
template: project
---

<style>
.loader {
  border-radius: 100px;
}
</style>

![](/work/lighthouse/images/1.png)

Lighthouse es una aplicación de visualización de información que ayuda a los usuarios a navegar por un complejo mar de datos, guiándoles hacia una visión fácil de entender.

Su funcionamiento es muy sencillo. Hay un menú de navegación con categorías (las llamamos temas) y cada una de ellas tiene subcategorías con perspectivas. Cada insight consiste en una pregunta y una respuesta, representada por un gráfico y una tabla con datos. Los insights pueden guardarse como favoritos, enviarse a un amigo o incluso descargarse como archivo CSV. Los usuarios también pueden buscar insights, comprobar el registro de cambios de cada insight y, lo que es más importante, aplicar filtros a los insights.

La funcionalidad de filtrado es lo que hace que Lighthouse sea tan potente, ya que permite a los usuarios encontrar realmente los datos que necesitan en cada insight. Hay filtros por defecto en cada información y también los usuarios pueden bloquear o desbloquear los filtros.

Esta fue mi segunda gran aplicación mientras trabajaba en Vodafone. Para construirla, creé un nuevo boilerplate de react desde cero y también utilicé redux para gestionar el estado global de la aplicación. También he implementado un sistema para enviar las respuestas de la API JSON desde los endpoints de la API directamente a redux. La aplicación es totalmente responsiva y compatible con todos los navegadores excepto Internet Explorer.

En este proyecto, estuve a cargo de una gran parte de la construcción del front-end. Los únicos componentes de los que no fui responsable fueron las tablas y los gráficos.

La aplicación se hizo muy popular dentro del departamento de ventas de Vodafone y hasta ahora, es la aplicación más exitosa que hemos desarrollado en mi equipo.

![](/work/lighthouse/images/2.jpg "Página de inicio")

![](/work/lighthouse/images/3.jpg "Página de inicio con datos ficticios")

![](/work/lighthouse/images/4.jpg "Navegación")

![](/work/lighthouse/images/5.jpg "Filtros")

![](/work/lighthouse/images/6.jpg "Búsqueda y registros")

<p style="text-align: center">
  <img class="loader" src="/work/lighthouse/images/loader.gif" alt="laoder" />
</p>
