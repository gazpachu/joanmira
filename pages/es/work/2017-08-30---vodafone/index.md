---
title: Vodafone
cover: /work/vodafone/images/logo.png
location: Reino Unido
color: "#ED1C24"
categories: vodafone web-app inverted leaflet mapbox blackhole d3
template: project
---

![](/work/vodafone/images/1.png)

Mientras trabajaba en Vodafone, me encargaron una pieza de visualización de datos interactiva para uno de sus clientes (una multinacional farmacéutica).

La idea era mostrar un mapa del mundo con una línea de tiempo para representar las llamadas de móvil de un determinado abonado del cliente. Las llamadas se representaban mediante partículas que saltaban desde el origen de la llamada hasta el destino.

Para ampliar el atractivo visual de la animación, utilicé algunas bibliotecas y APIs de Javascript para representar las partículas y sus recorridos en el mapa:

- [leaflet full-screen](https://github.com/Leaflet/Leaflet.fullscreen)
- [leaflet markercluster](https://github.com/Leaflet/Leaflet.markercluster)
- [leaflet locatecontrol](https://github.com/domoritz/leaflet-locatecontrol)
- [mapbox](https://docs.mapbox.com/mapbox.js/api/v3.1.1/)
- [blackhole.js](https://github.com/artzub/blackhole.js)
- [d3.js](https://d3js.org/)
