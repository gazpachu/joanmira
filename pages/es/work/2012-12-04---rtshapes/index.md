---
title: "Demo de rtShapes"
cover: "images/logo.jpg"
location: Reino Unido
color: white
categories: wcrs open-source web installation prototype ux design cover webcam
template: project
---

<p class="align-center">
<a class="btn external" role="button" href="http://open.joanmira.com/rtshapes" target="_blank">Lanzar página web</a>
<a class="btn github" role="button" href="https://github.com/gazpachu/rtshapes" target="_blank">Código fuente</a>
</p>

![](/work/rtshapes/images/1.png)

Esta es la primera demostración de mi serie de experimentos con el reconocimiento de formas en tiempo real utilizando HTML5 [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia), [OpenCV](http://docs.opencv.org/3.1.0/d9/d6d/tutorial_table_of_content_aruco.html#gsc.tab=0) y [Box2D](https://github.com/hecht-software/box2dweb).

Mientras trabajaba como tecnólogo creativo en [WCRS](http://www.wcrs.com/), empecé a investigar mucho Box2d. También estuve experimentando con Kinect y [OpenFrameworks](http://openframeworks.cc/) para reconocer formas/bloques en tiempo real, lo que me llevó a construir algunas demos mezclando ambas tecnologías.

En esta demo de HTML5, estoy usando una cámara web para obtener un video en directo de algunas formas dibujadas en una hoja de papel. Este vídeo se analiza con JavaScript (usando OpenCV) para identificar las formas. Una vez que tenemos las coordenadas 2D de esas formas, uso Box2d para crear su representación en el mundo de Box2d.

En las siguientes imágenes, se puede ver cómo las líneas dibujadas en el papel se convierten en plataformas estáticas que contienen las otras cajas que caen desde la parte superior de la pantalla.

![](/work/rtshapes/images/2.jpg)

![](/work/rtshapes/images/3.jpg)
