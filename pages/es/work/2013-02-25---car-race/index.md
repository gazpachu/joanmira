---
title: "Dibujar carreras de coches"
cover: "images/logo.png"
location: Reino Unido
color: "#2BCFFA"
categories: wcrs prototype kinect opencv box2d openframeworks animation design creative-tech inverted open-source
template: project
---

<p class="align-center">
<a class="btn github" role="button" href="https://github.com/gazpachu/opencv-box2d-race" target="_blank">Código fuente</a>
<a class="btn github" role="button" href="https://github.com/gazpachu/opencv-box2d-platformer" target="_blank">Código fuente del Platformer</a>
</p>

Este proyecto era muy chulo. ¡Se trataba de cargar una pista y los obstáculos de un dibujo real y luego jugar una carrera de coches en esa pista en el ordenador!

Para capturar las formas del papel, utilicé una cámara web y la biblioteca OpenCV. Estas formas se transformaron en cuerpos de Box2d y se añadieron al mundo de la física en la aplicación.

Los coches y el resto de la lógica eran todo C++ y OpenFrameworks. Todas las formas capturadas eran cuerpos estáticos con los que los coches podían colisionar. También había un marcador para definir el punto de inicio/fin.

![](/work/car-race/images/1.jpg)

![](/work/car-race/images/3.jpg)

Más tarde, también empecé a jugar con la idea de utilizar personajes en lugar de coches y plataformas en lugar de una pista. La idea era que el usuario dibujara las plataformas y los personajes en el papel y la aplicación cargara toda esta información en el juego.

![](/work/car-race/images/2.jpg)
