---
title: App para comensales de TableCheck
cover: "images/logo.png"
location: Japón
color: "#96A1FF"
categories: react emotion mapbox maps web-app prototype
template: project
---

<p class="align-center">
<a class="btn external" role="button" href="https://diner-app-spa-staging.tablecheck.com/" target="_blank">Demostración</a>
</p>

![](/work/diner-app/images/1.png)

La nueva aplicación para comensales es una versión renovada de la aplicación publicada actualmente en [tablecheck.com](https://tablecheck.com). Es un buscador de restaurantes con múltiples opciones de filtrado y visualización. También incluye una sección de cuenta de usuario donde los comensales pueden administrar sus reservas de TableCheck.

Construí alrededor del 90% de la parte del front end y el 50% del diseño. La API ya se construyó hace años.

La applicación se basa en <a href="/wekohi">Wekohi</a> pero con muchas actualizaciones nuevas con respecto a la anterior version, algunas de ellas incluyen:

- Un nuevo diseño de página de inicio con banners más fáciles de actualizar
- La búsqueda de lugares está disponible desde cualquier página con una paleta de comandos
- Vista de mapa (usando MapBox) con seguimiento GPS del usuario en tiempo real
- Nueva interfaz de usuario para los filtros de búsqueda con espacio para incluir más filtros en el futuro
- Tecnologías actualizadas a los últimas versiones de React, Typescript y TableKit
- Código fuente y tamaño del bundle JS reducidos
- CI e infraestructura simplificadas. Se migró de SSR a SPA + prerender.io (para SEO)
- Soporte completo para modo claro y oscuro

Algunas otras características planificadas incluyen:

- Capacidad para crear y compartir listas personalizadas, clasificaciones y selecciones de lugares
- Integración con CMS para gestionar el contenido de la página de inicio
- Implementación de un sistema de revisión de restaurantes basado en datos agregadas, o usar algo como [Kuchikomi.com](http://kuchikomi.com) o [partoo.com](https://partoo.com)
- Añadir nuevos filtros más específicos, como por ejemplo: trabajo remoto, mascotas, apto para niños, etc

### Capturas de pantalla

![](/work/diner-app/images/2.jpg)

![](/work/diner-app/images/3.jpg)

![](/work/diner-app/images/4.jpg)

![](/work/diner-app/images/5.jpg)

![](/work/diner-app/images/6.jpg)

![](/work/diner-app/images/7.jpg)

![](/work/diner-app/images/8.jpg)

![](/work/diner-app/images/9.jpg)

![](/work/diner-app/images/10.jpg)