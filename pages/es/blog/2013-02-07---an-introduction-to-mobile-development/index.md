---
title: Una introducción al desarrollo móvil
description: Para entender el panorama del desarrollo móvil, primero debemos saber quiénes son los actuales líderes de la industria y quiénes son los nuevos contendientes para 2013/14
cover: /blog/an-introduction-to-mobile-development/images/mob_dev_dwbkru.jpg
template: post
category: work
---

En el cuarto trimestre de 2012, los sistemas operativos móviles más utilizados fueron **Android** (con el 68,4% de la cuota de mercado) **y** **iOS** (con el 19,4% de la cuota de mercado). Ambos acapararon juntos el [92% de los envíos mundiales de smartphones](http://techcrunch.com/2013/01/28/android-ios-grabbed-92-of-global-smartphone-shipments-in-q4-2012-android-undisputed-volume-leader-says-analyst/). Estos resultados convierten a [Java](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)) (Android) y [Objective-C](http://es.wikipedia.org/wiki/Objective-C) (iOS) en [dos de los lenguajes de programación más utilizados para el desarrollo de móviles](http://www.tiobe.com/index.php/content/paperinfo/tpci/index.html), pero eso es sólo cuando hablamos de aplicaciones creadas con el [SDK de Android](http://developer.android.com/sdk/index.html) o el [SDK de iOS](https://developer.apple.com/devcenter/ios/index.action).

Los otros sistemas operativos móviles que ya están en el mercado son [Windows Phone](http://www.windowsphone.com/en-gb) y [Blackberry 10](http://global.blackberry.com/blackberry-10.html), pero su cuota de mercado es aún muy pequeña. En los próximos meses podemos esperar los siguientes lanzamientos:

- [Firefox OS](http://www.mozilla.org/es/firefoxos/) de [Mozilla](http://www.mozilla.org/es/firefoxos/)
- [Ubuntu Mobile](http://www.ubuntu.com/devices/phone) de [Ubuntu](http://www.ubuntu.com/devices/phone)
- [Tizen](https://www.tizen.org/) de [Linux Foundation](http://www.linuxfoundation.org/), [Samsung](http://www.samsung.com/), [Intel](http://www.intel.com/), [Tizen Community](https://www.tizen.org/community)

Puedes leer más sobre los sistemas operativos móviles [aquí](http://en.wikipedia.org/wiki/Comparison_of_mobile_operating_systems) y [aquí](https://es.wikipedia.org/wiki/Sistema_operativo_m%C3%B3vil)

**Los pros y los contras de la codificación nativa**

Las ventajas de crear aplicaciones nativas están relacionadas con la máxima flexibilidad y rendimiento. Todos los programadores saben que el uso de los lenguajes de programación de más bajo nivel ofrece la posibilidad de ajustar las aplicaciones, personalizarlas y optimizar el código al máximo nivel. Esto es posible porque se trabaja casi directamente con el hardware; no hay capas innecesarias de complejidad entre el código y el dispositivo.

Las aplicaciones que dependen en gran medida de los gráficos 3D y necesitan procesar muchos datos o hacer un uso intensivo de la [CPU](https://es.wikipedia.org/wiki/Unidad_central_de_procesamiento) son las mejores candidatas para el enfoque de código nativo.

Pero la flexibilidad y el rendimiento tienen un precio y es la complejidad y la duplicación de [bases de código](https://es.wikipedia.org/wiki/Base_de_c%C3%B3digo). Si quieres que tu aplicación nativa sea compatible con Android e iOS, tienes que tener dos [bases de código](https://es.wikipedia.org/wiki/Base_de_c%C3%B3digo) diferentes, lo que significa que tienes que trabajar doble. [Java](http://es.wikipedia.org/wiki/Java_(lenguaje_de_programación)) y [Objective-C](http://es.wikipedia.org/wiki/Objective-C) son dos lenguajes de programación muy diferentes, requieren entornos de programación completamente distintos y el mantenimiento del código ([refactorización](https://es.wikipedia.org/wiki/Refactorizaci%C3%B3n)) puede llegar a ser costoso para personas u organizaciones que no tengan un equipo de desarrolladores trabajando a tiempo completo en aplicaciones móviles.

**¿Cuáles son las alternativas?**

Por suerte o no, hay varias empresas con productos que prometen resolver el problema de tener dos o más bases de código diferentes para la misma aplicación. Estos productos permiten a los desarrolladores utilizar [APIs comunes](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones) para construir las apps y luego "exportarlas" a código nativo Java (Android), Objective-C (iOS) o incluso a otras plataformas como Kindle Fire, Blackberry, Windows Phone, etc:

- [Appcelerator](http://www.appcelerator.com/) y su [Titanium SDK](http://www.appcelerator.com/platform/titanium-platform/)](http://www.appcelerator.com/platform/titanium-platform/) y [Cloud services](http://www.appcelerator.com/cloud/) gratuitos basados en JavaScript. Anuncian su éxito con más de **50.000 apps desplegadas** en el mercado, **419.000 desarrolladores** y clientes como eBay, Merck, Mitsubishi Electric, NBC y PayPal. [Escaparate [de aplicaciones](http://pinterest.com/appcelerator/app-showcase/). Después de haber probado la plataforma durante varios meses, puedo decir que el producto ciertamente funciona y la curva de aprendizaje es bastante suave, lo que hace que el proceso de desarrollo sea bastante divertido. Aunque [no todo es tan maravilloso como dicen](http://usingimho.wordpress.com/2011/06/14/why-you-should-stay-away-from-appcelerators-titanium/).
- [Marmalade](http://www.madewithmarmalade.com/) es uno de los mejores frameworks de desarrollo de juegos que existen. Tanto si decides codificar de forma nativa (C++) como si adoptas un enfoque híbrido (HTML5-nativo), con Marmalade puedes desplegarlo en iOS, Android, BlackBerry, Windows y Mac, así como en determinadas plataformas de Smart TV y (próximamente) de decodificadores. Clientes: **Electronic Arts, Nokia, Apple, Konami, Google, Square Enix, nVidia, Samsung**, etc. [Escaparate de aplicaciones](http://www.madewithmarmalade.com/app-showcase).
- [Adobe PhoneGap](http://phonegap.com/) es un marco de trabajo gratuito y de código abierto que permite crear aplicaciones móviles utilizando APIs web estandarizadas como HTML5, CSS y JavaScript. Cuenta con **400.000 desarrolladores** y colaboradores de IBM, RIM y Microsoft. [App showcase](http://phonegap.com/app/).
- [Corona SDK](http://www.coronalabs.com/products/corona-sdk/) es un conocido framework para desarrolladores de juegos para móviles. A partir de una única base de código, se puede implementar en iOS, Android, Kindle Fire y NOOK. [App showcase](https://developer.coronalabs.com/showcase).
- [Xamarin](http://xamarin.com/) es otra empresa/producto para desarrollar aplicaciones para iOS, Android y Mac utilizando [C#](http://en.wikipedia.org/wiki/C_Sharp_(lenguaje_de_programación)). Tienen **230.245 desarrolladores** y clientes como 3M, Microsoft, VMWare, Accenture, Cisco, AT&T, AOL, Monster y HP. [App showcase](http://xamarin.com/apps).
- [Shiva3D](http://www.shivaengine.com/new-features.html) y [Unity3D](http://unity3d.com/unity/multiplatform/) son opciones más centradas en juegos 3D multiplataforma de alto nivel. [Shiva showcase](http://www.shivaengine.com/shiva-3d-engine-showcase.html). [Unity showcase](http://unity3d.com/gallery/made-with-unity/game-list).
- [MoSync SDK](http://www.mosync.com/sdk) es una opción menos conocida que facilita la creación y compilación de aplicaciones para hasta nueve plataformas diferentes a la vez, utilizando C/C++ o HTML5/JavaScript, o una combinación de ambos. [App showcase](http://www.mosync.com/showcase).
- [Biznessapps](http://www.biznessapps.com/) y [gamesalad](http://gamesalad.com/) son soluciones rápidas y sencillas para pequeñas empresas y juegos sencillos con pocos requisitos de programación y diseño personalizados. Estas soluciones son **no recomendables** para la gran mayoría de los proyectos debido a las limitaciones de los editores utilizados para construir las aplicaciones y su falta de flexibilidad.
- Para ver una tabla comparativa ampliada de los frameworks para móviles, visita [este enlace](http://www.markus-falk.com/mobile-frameworks-comparison-chart/), [esta página wiki](http://en.wikipedia.org/wiki/Multiple_phone_web-based_application_framework) o [esta otra](http://en.wikipedia.org/wiki/Mobile_application_development).

**¿Cuáles son los retos de las aplicaciones nativas y no nativas?**

Programar aplicaciones móviles es más difícil que crear aplicaciones de escritorio o web. La plataforma es muy nueva y está cada vez más fragmentada, lo que no ayuda a los desarrolladores.

Por ejemplo, [Android tiene cientos de dispositivos diferentes](https://en.wikipedia.org/wiki/List_of_Android_smartphones) en el mercado. Algunos tienen una pantalla de 3,4'', otros de 7'' o 10''. Algunos funcionan con Android 2.1 y otros con Android 4.3. Algunos tienen 3G, GPS y una pantalla de 300 ppp (puntos por pulgada/densidad de píxeles), HD Ready o Full HD. Las combinaciones posibles son intimidantes y lo cierto es que cada usuario espera que su aplicación funcione a la perfección en su dispositivo.

**Algunos aspectos importantes a tener en cuenta son:**

- Decidir qué herramienta/marco/enfoque utilizar es una decisión crítica que debe ser cuidadosamente pensada antes de comenzar cualquier trabajo de desarrollo
- Rendimiento en dispositivos antiguos... el listón tiene que ponerse en algún momento.
- Responder rápidamente y con éxito a las quejas/bugs/solicitudes de características en el Android Market y la App Store. Recordar lo de tener bases de código duplicadas...
- Encontrar el enfoque de marketing adecuado y el valor de una aplicación (esquema [freemium](http://es.wikipedia.org/wiki/Freemium) o basado en anuncios). Algunas estrategias de marketing requieren mucha personalización en el código. Asegúrate de planificar todo.
