---
title: Prototipo para Vitality
cover: "images/logo.jpg"
location: Reino Unido
color: "#fb0068"
categories: sapientnitro web prototype animation box2d canvas creative-tech inverted
template: project
---

<p class="align-center">
<a class="btn external" role="button" href="http://work.joanmira.com/demos/vitality/v1" target="_blank" rel="noopener noreferrer">v1</a>
<a class="btn external" role="button" href="http://work.joanmira.com/demos/vitality/v2" target="_blank" rel="noopener noreferrer">v2</a>
<a class="btn external" role="button" href="http://work.joanmira.com/demos/vitality/v3" target="_blank" rel="noopener noreferrer">v3</a>
<a class="btn external" role="button" href="http://work.joanmira.com/demos/vitality/v4" target="_blank" rel="noopener noreferrer">v4</a>
<a class="btn external" role="button" href="http://work.joanmira.com/demos/vitality/v5" target="_blank" rel="noopener noreferrer">v5</a>
<a class="btn external" role="button" href="http://work.joanmira.com/demos/vitality/v6" target="_blank" rel="noopener noreferrer">v6</a>
<a class="btn external" role="button" href="http://work.joanmira.com/demos/vitality/v7" target="_blank" rel="noopener noreferrer">v7</a>
<a class="btn external" role="button" href="http://work.joanmira.com/demos/vitality/v8" target="_blank" rel="noopener noreferrer">v8</a>
<a class="btn external" role="button" href="http://work.joanmira.com/demos/vitality/itunes-reward-architecture.pdf" target="_blank" rel="noopener noreferrer">Arquitectura de las recompensas en Itunes</a>
</p>

El encargo del proyecto consistía en crear una experiencia interactiva con animaciones para un concurso de iTunes en la aplicación móvil de Vitality. La idea era revelar poco a poco el premio ganado por el usuario y el diseño implicaba el uso de partículas y la retirada de premios aleatorios dinámicos.

![](/work/vitality/images/0.png)

Después de explorar diferentes opciones con la física de Box2d y los elementos DOM animados de CSS3, decidí utilizar una mezcla de ilustraciones de Box2d y SVGs hechas de pequeños puntos (partículas). Estas partículas se cargan en una matriz de javascript utilizando un cargador SVG Ajax y luego se renderizan y animan en un lienzo HTML5.

Todo el recorrido de la animación tiene dos etapas diferentes. En la primera, utilizo Box2d para crear las fuerzas de atracción que tiran y empujan las partículas hacia el gran círculo blanco. Cuando el usuario pulsa sobre él, cargamos la segunda etapa, como se ve en la siguiente imagen.

![](/work/vitalidad/images/1.png)

Una vez que el usuario ha tocado el círculo blanco, éste se redimensiona para llenar toda la pantalla y entonces miles de partículas explotan desde el centro de la pantalla y comienzan a moverse aleatoriamente.

A continuación, las partículas empiezan a reducir su velocidad y, en algún momento, se juntan para empezar a formar la forma del premio ganado. La ilustración final puede ser cualquier cosa, desde un vale en libras hasta un auricular o cualquier cosa que el diseñador haya creado con Illustrator.

Una vez que la ilustración está formada por las partículas, éstas siguen moviéndose lentamente sin perder la forma de la ilustración.
