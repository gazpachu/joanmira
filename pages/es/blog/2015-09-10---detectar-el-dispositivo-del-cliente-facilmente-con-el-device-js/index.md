---
title: Detectar el dispositivo del cliente fácilmente con device.js
description: Nota rápida sobre la detección de dispositivos en JavaScript
cover: /blog/detecting-the-client-device-easily-with-device-js/images/device-js.jpg
template: post
category: work
---

¿Te encuentras creando variables "isMobile" en Javascript muy a menudo? ¿Y añadir manualmente una clase "mobile" o "tablet" al cuerpo o a la etiqueta HTML? Si estás en ese grupo, ¡presta atención a esto! No pierdas más tu tiempo. Sólo tienes que utilizar esta biblioteca súper útil y fácil llamada device.js.

Device.js facilita la escritura de CSS y/o JavaScript condicional basado en el sistema operativo del dispositivo (iOS, Android, Blackberry, Windows, Firefox OS, MeeGo, AppleTV, etc), la orientación (Vertical vs. Horizontal) y el tipo (Tableta vs. Móvil).

Device.js actualizará automáticamente las clases en la etiqueta HTML en función del dispositivo y la orientación. Ejemplo:

`<html lang="es" class=" desktop portrait">`

Cuando cambio mi agente de usuario a iPad iOS 6, se muestra:

`<html lang="es" class="ios ipad tablet portrait">`

A continuación, puede utilizar esas clases para dar estilo a su sitio web en consecuencia.

Al mismo tiempo, en JavaScript, puedes acceder a la misma información así:

```javascript
device.portrait() === true
device.landscape() === false
device.mobile() === false
device.tablet() === false
device.ipad() === false
device.ipod() === false
device.iphone() === false
device.android() === false
device.androidTablet() === false
device.blackberryTablet() === false
```
