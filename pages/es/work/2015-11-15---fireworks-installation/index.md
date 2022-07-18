---
title: Instalación de fuegos artificiales en SapientNitro
cover: "images/logo.png"
location: Reino Unido
color: "#58B85F"
categories: sapientnitro prototype design kinect openni openframeworks creative-tech inverted open-source
template: project
---

<p class="align-center">
<a class="btn github" role="button" href="https://github.com/gazpachu/fireworks" target="_blank">Código fuente</a>
</p>

<iframe width="100%" height="550" src="https://www.youtube.com/embed/pgPIYp36Miw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Un experimento de seguimiento de manos con Kinect

Este experimento pretende mostrar las capacidades de seguimiento de la mano de una cámara Kinect de Xbox conectada a un ordenador.  Utilizando un simple reconocimiento de gestos verticales de la mano, la aplicación puede crear múltiples fuegos artificiales a lo largo del eje horizontal que se disparan desde la parte inferior de la pantalla.

Para aumentar el dinamismo del experimento, la app utiliza valores aleatorios para los colores de los fuegos artificiales, el tamaño de la estela, la gravedad, la cantidad de partículas, el desvanecimiento, la amortiguación, etc.

Para maximizar el atractivo audiovisual, la aplicación también cuenta con estas técnicas:

- Skybox 2D con una textura de fondo sin fisuras
- Efecto tipo parallax (algunas nubes se mueven más rápido que el cielo)
- Banda sonora de base que se reproduce en bucle y 7 efectos de sonido diferentes, incluida una multitud de personas que aplauden tras una buena ronda de fuegos artificiales continuos
- Efecto de desenfoque dinámico utilizando shaders para la superposición de la calibración de la mano

![](/work/fireworks-installation/images/fireworks-experiment.jpg)

## Tecnología utilizada

Esta aplicación ha sido programada en un MacBook de Apple, utilizando el IDE Xcode. El lenguaje de programación utilizado es C++ y la biblioteca principal es OpenFrameworks, un conjunto de herramientas de código abierto ampliamente utilizado en todo el mundo para instalaciones de arte y aplicaciones creativas.

También hay algunos plugins de OF que vale la pena mencionar:

- **ofxKinect**: una API/interfaz para interactuar con Kinect desde OF
- **ofxOpenNI**: una envoltura para OpenNI (para la lógica de seguimiento de la mano)
- **ofxBlur**: para la funcionalidad de desenfoque

Todas las imágenes y sonidos se han obtenidos de repositorios de stock gratuitos.

Esta aplicación se puede adaptar a cualquier tamaño de pantalla y funciona tanto en modo horizontal como vertical. También puede funcionar en Windows y Linux, aunque es preferible un Mac (con una CPU decente) debido al mayor apoyo de la comunidad.

Nota: las cámaras Kinect no pueden conectarse a dispositivos móviles o tabletas, aunque su pantalla táctil puede utilizarse como controladores para aplicaciones similares.

La demo se instaló en la zona de exposiciones de Eden House (la oficina de SapientNitro) para que los visitantes y empleados pudieran utilizarla.

![](/work/fireworks-installation/images/1.jpg "Lugar de la instalación")