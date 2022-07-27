---
title: Instalación Regalo de Navidad
cover: /work/xmas-gift/images/logo.png
location: Reino Unido
color: "#F7E68E"
categories: wcrs prototype design kinect openni openframeworks creative-tech inverted open-source
template: project
---

<p class="align-center">
<a class="btn github" role="button" href="https://github.com/gazpachu/xmas-gift" target="_blank">Código fuente</a>
</p>

<iframe width="100%" height="550" src="https://www.youtube.com/embed/4uDsONxNdDg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## La idea

El objetivo de este proyecto fué crear un pequeño juego para la Navidad de 2012. La idea era mostrar la ilusión de una ventana congelada (con el efecto de desenfoque) que necesita ser limpiada moviendo la mano en círculos. Para hacerlo más divertido, había muchos copos de nieve que reaccionaban al movimiento de la mano.

Para hacer desaparecer la nieve de la pantalla, el usuario tenía que mover las manos sólo en círculos. Al cabo de unos segundos, el desenfoque desaparecía y se mostraba la imagen de fondo. La imagen podía cambiarse fácilmente e incluso se podía reproducir un vídeo en lugar de una imagen.

Para compensar al usuario por jugar, aparecian varios códigos QR (con un enlace a un regalo) y el usuario podía escanearlos con su Smartphone/tableta. El juego también podía ser ampliado diciéndole al usuario que vaya a la URL para completar otra tarea...

Todo fué construído con OpenFrameworks, Kinect y OpenNI.

## Requisitos y mejoras

- Tiene que ser instalado en la planta baja (con accesso para los transeuntes) al lado de una ventana.
- Puede utilizar un potente proyector o una gran pantalla plana. El proyector puede maximizar la experiencia visual y utilizar el cristal de la ventana como superficie donde se mostrará la aplicación (projection mapping)
- Es necesario investigar más sobre el umbral de seguimiento de Kinect, y la calibración de Kinect, y limitar el número máximo de esqueletos/manos a uno.
- Necesita ser probado en la ubicación final en una etapa temprana, no sólo un par de días antes del inicio

## Instrucciones

- Pulsa la "barra espaciadora" para empezar de nuevo o recalibrar el seguimiento de la mano

![](/work/xmas-gift/images/1.jpg "Initial screen. Snowflakes are moving a little bit randomly")

![](/work/xmas-gift/images/2.jpg "Halfway through. The yellow dot represents the movement of the hand")

![](/work/xmas-gift/images/3.jpg "Development setup. Example of usage with the hand")

![](/work/xmas-gift/images/4.jpg "Final stage. The user scanning the QR code")
