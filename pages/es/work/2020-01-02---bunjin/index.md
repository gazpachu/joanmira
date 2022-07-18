---
title: "Bunjin Lector de RSS"
cover: "images/logo.png"
location: Japón
color: "#F9D9EB"
categories: react firebase rss open-source web-app
template: project
---

<p class="align-center">
<a class="btn external" role="button" href="https://bunjinapp.web.app/" target="_blank">App</a>
<a class="btn github" role="button" href="https://github.com/gazpachu/bunjin" target="_blank">Código fuente</a>
</p>

![](/work/bunjin/images/1.png)

El término "Bunjin" se refiere a un tipo de personas de la sociedad tradicional china y a una 'persona educada que es buena en literatura'. [Más información](https://www.bssf.org/articles-and-stories/john-naka-on-bunjin-gi-bunjin-style/#:~:text=Bunjin%20means%20literary%20man%2C%20man,and%20soujin%20which%20means%20priest).

Creé Bunjin porque quería tener un tema oscuro adecuado y una experiencia muy personalizada para mi propia experiencia de lectura de noticias por RSS. Se puede decir que soy muy exigente con las interfaces de usuario, especialmente si tengo que usarlas todos los días...

Hace mucho tiempo, me gustaba mucho [iGoogle](https://en.wikipedia.org/wiki/IGoogle), pero cuando decidieron cerrarlo, me pasé a [Netvibes](https://www.netvibes.com/en). Durante algún tiempo, estuve contento, pero no me gustaba el aspecto de la aplicación. Así que un día decidí crear mi propio lector de RSS, y así es como nació Bunjin.

La aplicación es de código abierto y cualquiera puede usarla, así que no dudes en registrar tu cuenta y probarla. La interfaz de usuario no está muy pulida todavía (sólo tiene lo básico para que me sienta bien usándola) y no hay muchas características. Puedes crear infinitos tableros, y las pestañas añaden feeds (widgets), que se pueden organizar en el orden que prefieras y seleccionar el número de historias que se mostrarán en cada widget.

La aplicación utiliza un proxy para evitar los problemas de CORS con algunos feeds y almacena en caché el contenido en una base de datos de Firebase para minimizar las solicitudes externas (algunos sitios web tienen un límite de accesos por RSS).
