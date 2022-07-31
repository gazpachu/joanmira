---
title: Construir un agregador de webs con Meteor
description: Mi experiencia trabajando con este popular framework full-stack
cover: images/meteor-header.jpg
template: post
category: work
---

<a class="btn github" role="button" href="https://github.com/gazpachu/siteace" target="_blank">Código fuente</a>

Este tutorial es el resultado de mi trabajo final para el curso [Introduction to Meteor.js Development](https://www.coursera.org/learn/meteor-development/) del Dr. Matthew Yee-King ([University of London & Goldsmiths](http://www.gold.ac.uk/)) en Coursera. Este curso forma parte de una especialización en [Responsive Website Development and Design](https://www.coursera.org/specializations/website-development) que cubre los fundamentos del desarrollo web moderno full-stack, desde el diseño UX hasta la codificación front-end, pasando por las bases de datos personalizadas.

En ese curso, aprendí a crear un sitio web completo y multiusuario utilizando el framework Meteor.js y MongoDB. Está dividido en cuatro semanas y tiene un par de tareas y varios cuestionarios. En general, fue una muy buena introducción al framework y espero que este tutorial muestre todo lo que aprendí.

### Requisitos

El propósito de la aplicación es permitir a los usuarios **compartir**, **discutir** y **calificar** las páginas que encuentran en Internet. La aplicación también necesita tener las siguientes características:

* Utilizar [Bootstrap](http://getbootstrap.com/)
* Los usuarios pueden registrarse e iniciar sesión
* Los usuarios pueden publicar nuevos sitios web si están conectados. Los sitios web publicados por los usuarios deben tener una URL y una descripción
* Los usuarios pueden votar las páginas web hacia arriba y hacia abajo haciendo clic en un botón de más o de menos
* Los sitios web deben ser listados con el sitio más votado primero
* La página del listado muestra cuándo se añadió el sitio web y cuántos votos positivos y negativos tiene
* Los usuarios pueden pasar a la página de detalles de un sitio web (utilizando el enrutamiento)
* En la página de detalles, los usuarios pueden publicar comentarios sobre una página web, y se muestran debajo de la descripción de la página web
* Utilizar el paquete HTTP de Meteor para obtener información sobre los enlaces web publicados de forma automática, de modo que el usuario no tenga que introducir nada más que la URL
* Implementar una función de búsqueda que permita al usuario buscar dentro de los sitios listados por palabras clave
* Recomendar sitios web a los usuarios en función de lo que hayan votado y comentado. Por ejemplo, si yo voto un sitio titulado "Recetas de tofu", se recomendarán otros sitios con "tofu" y "receta" en sus títulos o descripciones
* Despliegue de la aplicación utilizando el comando de despliegue de Meteor

### Parte 1. Instalación de Meteor y creación de la aplicación

Ve a [meteor.com](https://www.meteor.com/) y sigue [las instrucciones](https://www.meteor.com/install) para instalar Meteor en tu sistema operativo.

Para crear la app, abre tu terminal, ve a la carpeta donde quieres guardar la app y escribe

`meteor create siteace`.

Esto creará una nueva carpeta llamada `siteace` (el nombre de la app que estamos construyendo) con todos los archivos que necesita una app de Meteor:

**siteace.js**: un archivo JavaScript que se carga tanto en el cliente como en el servidor
**siteace.html**: un archivo HTML que define las plantillas de las vistas
**siteace.css**: un archivo CSS para definir los estilos de tu aplicación
**.meteor**: archivos internos de Meteor (carpeta oculta)

Para ejecutar la app recién creada:

`cd siteace`

`meteor`

Abre tu navegador web y ve a http://localhost:3000 para ver la app en funcionamiento. Si funciona, puedes detenerla pulsando Ctrl+C.

### Parte 2. Organizando la estructura de carpetas

Meteor es un framework de cliente y servidor, lo que significa que tenemos código para el front-end y código para el back-end. Ambos utilizan Javascript. Los registros de la consola del código del back-end se muestran en la terminal/consola del sistema operativo y los registros de la consola del front-end se muestran en la consola del navegador.

Una forma de decidir qué código se va a ejecutar en el front-end o en el back-end es utilizar las siguientes sentencias condicionales:

```javascript
if (Meteor.isClient) {
}
if (Meteor.isServer) {
}
```

Eso está bien para aplicaciones muy pequeñas, pero hay una mejor manera de dividir el código usando carpetas:

* **/server**: poner todos los archivos Javascript con código que necesitan ser ejecutados en el servidor aquí
* **/client**: pon todos los archivos Javascript con código que necesitan ser ejecutados en el cliente aquí
* **/lib**: todos los archivos Javascript que tienen código compartido y necesitan ser ejecutados antes que cualquier otra cosa
**/public**: todos los activos públicos, como imágenes, sonidos, JSON, etc.

Así que, vamos a seguir adelante y crear esas carpetas en nuestra aplicación.

Ahora renombra siteace.js a main.js, siteace.css a style.css, siteace.html a index.html y colócalos dentro de la carpeta cliente.

Luego vamos a crear un archivo llamado `collections.js` y colocarlo en la carpeta lib. Ese archivo contendrá la definición de las colecciones de Mongo para nuestra BD.

Por último, crearemos un archivo llamado `startup.js` y lo colocaremos en la carpeta del servidor. Utilizaremos este archivo para inicializar la BD con algunos datos ficticios cuando se inicie la aplicación.

Una vez que ejecutemos meteor en la consola, se encargará de la minificación de los archivos.

### Parte 3. Enrutamiento y definición de las marcas y plantillas

Meteor utiliza [Blaze](https://www.meteor.com/blaze) y [Spacebars](https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md) (una versión modificada de Handlebars) para producir plantillas reactivas de Meteor cuando se compila. Un momento... **¿Reactivo**? Sí, Meteor actualiza la interfaz automáticamente cada vez que hay un cambio en los datos vinculados a esa UI. Llegados a este punto, puedes estar pensando: ¿es eso como [React de Facebook](https://facebook.github.io/react/)? En cierto modo sí. ¿Debería usar React en su lugar? Probablemente sí, pero ese es un tema sobre el que quizás quieras leer más [aquí](https://www.discovermeteor.com/blog/blaze-react-meteor/).

En aras de la simplicidad, vamos a seguir con las herramientas de front-end por defecto de Meteor: Blaze y Spacebars.

Primero, vamos a empezar por instalar el router. Escribe lo siguiente en la terminal:

`meteor add iron:router`.

Ahora vamos a definir el diseño de la aplicación (los marcadores de posición principales) y la plantilla de la barra de navegación. Usamos `yield` para definir el marcador de posición donde luego renderizaremos las plantillas elegidas en las rutas. Abre index.html y añade lo siguiente:

```html
<head>
  <title>Site Ace by Joan Mira</title>
</head>

<body>
</body>

<template name="ApplicationLayout">
    {{> yield "navbar"}}
    <div class="container">
        {{> yield "form"}}
        {{> yield "main"}}
    </div>
</template>

<!-- template that displays the header with the nav bar -->
<template name="navbar">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">Site Ace, a social website aggregator by Joan Mira</a>
        </div>
          {{> loginButtons align="right"}}
      </div>
    </nav>
</template>
```

Ahora también estamos añadiendo tres plantillas más, website_form, website_list y website_item. La primera mostrará un formulario para que el usuario pueda enviar nuevas URLs a la aplicación. La segunda mostrará una lista de sitios web que ya están en la base de datos y la tercera es una plantilla parcial para mostrar un elemento individual de la lista de sitios web:

```html
<template name="website_form">
	<a class="btn btn-default toggle-website-form js-toggle-website-form" href="#">
  		<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
	</a>
	<div id="website_form" class="hidden_div">
		<form class="js-save-website-form">
		  <div class="form-group">
		    <label for="url">Site address</label>
		    <input type="text" class="form-control" id="url" placeholder="http://www.mysite.com">
		  </div>
		  <button type="submit" class="btn btn-default">Submit</button>
		</form>
	</div>
</template>

<!-- template that displays several website items -->
<template name="website_list">
	<ol>
	{{#each websites}}
	{{>website_item}}
	{{/each}}
	</ol>
</template>

<!-- template that displays individual website entries -->
<template name="website_item">
<li>
	<a href="{{_id}}">{{title}}</a>
	<p>
		{{description}}
	</p>
	<a href="#" class="btn btn-default js-upvote">
		<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
	</a>
	<a href="#" class="btn btn-default js-downvote">
		<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
	</a>
	<!-- you will be putting your up and down vote buttons in here! -->
</li>
</template>
```

Observa que en lugar de la URL, hemos utilizado _id para componer la URL del enlace de la página web. Esto será útil más tarde cuando creemos la página de detalles...

Ahora vamos a definir la configuración del router y la ruta homepage/default. Abre main.js y añade lo siguiente en la parte superior:

```javascript
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
    this.render('navbar', {
        to: 'navbar' // The name of the main placeholder in applicationLayout
    });
    this.render('website_form', {
        to: 'form'
    });
    this.render('website_list', {
        to: 'main'
    });
});
```

### Parte 4. Definir la colección y los datos iniciales

Abre collections.js y crea una nueva escribiendo

`Websites = new Mongo.Collection("websites");`

Ahora abre startup.js y establece algunos datos ficticios:

```javascript
// start up function that creates entries in the Websites databases.
Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
        console.log("No websites yet. Creating starter data.");
          Websites.insert({
            title:"Goldsmiths Computing Department",
            url:"http://www.gold.ac.uk/computing/",
            description:"This is where this course was developed.",
            createdOn:new Date()
        });
         Websites.insert({
            title:"University of London",
            url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
            description:"University of London International Programme.",
            createdOn:new Date()
        });
         Websites.insert({
            title:"Coursera",
            url:"http://www.coursera.org",
            description:"Universal access to the world’s best education.",
            createdOn:new Date()
        });
        Websites.insert({
            title:"Google",
            url:"http://www.google.com",
            description:"Popular search engine.",
            createdOn:new Date()
        });
    }
});
```

### Parte 5. Añadir algo de CSS

El formulario para enviar nuevas URLs que especificamos en el marcado está oculto por defecto. Sólo se abre cuando el usuario hace clic en el botón '+'. Para hacer que este formulario esté oculto, sólo tenemos que añadir el siguiente CSS:

```css
.hidden_div {
	display: none;
}

ol {
    padding: 0;
    list-style-type: none;
    counter-reset: section;
}

ol li,
.info {
    counter-increment: section;
    border: 1px solid #CCC;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #F8F8F8;
}

ol li::before {
    content: counter(section);
    margin-right: 5px;
    font-size: 80%;
    background-color: #3388BB;
    color: white;
    font-weight: bold;
    padding: 3px 8px;
    border-radius: 3px;
}

.info {
    background-color: #3388BB;
    color: white;
    text-align: center;
}
.info a {
    color: white;
    text-decoration: underline;
}

.website-meta {
    float: right;
    line-height: 35px;
}

.website-meta span {
    font-weight: bold;
}

.comment-meta {
    text-align: right;
    margin: 5px 0 0 0;
}

.toggle-website-form,
#website_form,
.info {
    margin-bottom: 10px;
}

#login-buttons {
    float: right;
    margin-top: 15px;
}

#url {
    float: left;
    width: 50%;
    margin-right: 5px;
}

#search {
    float: right;
    max-width: 150px;
}
```

### Parte 6. Añadir eventos básicos

Para mostrar/ocultar el formulario, vamos a necesitar capturar el evento click. Abre el archivo main.js y añade lo siguiente:

```javascript
Template.website_form.events({
    "click .js-toggle-website-form":function(event){
        $("#website_form").toggle('slow');
    }
)};
```

Aquí sólo estamos apuntando al evento click del elemento `.js-toggle-website-form` y cambiando su estado visible.

En este punto, la aplicación debería tener un aspecto similar al siguiente (probablemente un poco mejor ;-)

![](/blog/build-a-social-website-aggregator-using-meteor/images/meteor-tutorial-1.jpg)

### Parte 7. Añadir nuevas URLs a la BD

Antes de empezar a programar, vamos a necesitar un paquete de Meteor llamado HTTP para recuperar el título y la descripción del sitio web que estamos añadiendo. Puedes leer más sobre el paquete [aquí](https://themeteorchef.com/snippets/using-the-http-package/). Escribe lo siguiente en la terminal para instalarlo:

`meteor add http`.

Debido a las restricciones de CORS, necesitamos contactar con el sitio web desde el servidor. Así que abre el archivo startup.js y crea un nuevo método (dentro del método startup) para obtener el título y la descripción de la URL:

```javascript
Meteor.methods({
    getWebsiteData: function (url) {
        this.unblock();
        return Meteor.http.call("GET", url, {"npmRequestOptions" : {"gzip" : true}});
    }
});
```

La opción GZIP es para descomprimir los datos en caso de que el servidor los devuelva comprimidos.

Ahora tenemos que llamar a ese método desde el front-end cuando el usuario envíe el formulario. Abre main.js y en la misma función en la que estábamos trabajando en la parte anterior, añade el siguiente evento para capturar el envío del formulario:

```javascript
    "submit .js-save-website-form":function(event){

        // here is an example of how to get the url out of the form:
        var url = event.target.url.value;
        console.log("The url they entered is: "+url);

        //  put your website saving code in here!
        Meteor.call("getWebsiteData", url, function(error, results) {

            // Dump the markup into a dummy element for jQuery manipulation
            var el = $('<div></div>');
            el.html(results.content);

            // Get the meta data
            var title = $('title', el).text();
            var description = $('meta[name="description"]', el).attr('content');

            // Add the new website in the Websites collection
            Websites.insert({
                title: title,
                url: url,
                description: description,
                createdOn:new Date()
            })
        });

        return false; // stop the form submit from reloading the page
    }
```

Puedes intentar añadir algunas URLs y luego recargar la página. Las nuevas deberían permanecer allí. Si quieres restablecer la BD, simplemente escribe en la terminal meteor reset.

### Parte 8. Autenticación de usuarios

Dos paquetes de Meteor se encargan del registro y la autenticación de los usuarios. Para instalarlos escribe esto en la terminal:

`meteor add accounts-ui accounts-password`.

Y luego añade el siguiente parcial a la barra de navegación (además del título de Site Ace):

`{{> loginButtons }}`

Por defecto, los únicos campos habilitados para el registro de usuarios son el email y la contraseña. Si queremos tener también un campo de nombre de usuario, tenemos que especificarlo en la configuración del paquete. Abre main.js y añade lo siguiente en la parte superior:

```javascript
Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});
```

Además, a partir de ahora, si necesitamos comprobar si el usuario está conectado o queremos acceder a sus datos, podemos hacerlo así:

```javascript
if (Meteor.user()) {
    Meteor.user().username;
}
```

### Parte 9. Permitir que sólo los usuarios logueados publiquen nuevos sitios web

Podríamos hacerlo ocultando el formulario para los usuarios no logueados, pero entonces esto podría ser fácilmente hackeado manipulando el DOM desde la consola. Así que vamos a utilizar una tarea de validación de formularios en su lugar. Abre el archivo main.js y envuélvelo todo dentro del evento del formulario de envío con el enfoque que especificamos en la parte anterior. Además, añade una condición else y muestra una ventana de alerta con un mensaje de error si el usuario no está conectado:

```javascript
"submit .js-save-website-form":function(event){

    if (Meteor.user()) {
        (...)
    }
    else {
        alert('You need to be logged in to submit websites!');
    }

    return false;
}
```

### Parte 10. Mostrar la fecha y añadir votos

En la página del listado, vamos a mostrar la fecha en que se agregó el sitio web. Necesitamos instalar un nuevo paquete llamado Moments.js, una popular librería para trabajar con fechas en Javascript:

`meteor add momentjs:moment`.

También necesitamos crear una nueva función de plantilla para analizar la fecha. En este caso, vamos a hacerla global, para que otras plantillas puedan usarla también. Abre main.js y añade esto:

```javascript
// format the date
Template.registerHelper('formattedDate', function() {
     return moment(this.createdOn).format("MM/DD/YYYY");  // or whatever format you prefer
});
```

Luego, en index.html añade un marcador de posición para la fecha y los votos justo después de los botones de votación:

```html
<p class="website-meta">{{formattedDate}} | <span class="js-votes-up">{{up}}</span>↑, <span class="js-votes-down">{{down}}</span>↓</p>
```

También tenemos que inicializar los campos de subida y bajada para cada entrada de la web en la BD. Abre startup.js y refactoriza los elementos iniciales así. Hazlo también en el evento de envío del formulario en main.js:

```javascript
Websites.insert({
    title:"Coursera",
    url:"http://www.coursera.org",
    description:"Universal access to the world’s best education.",
    createdOn:new Date(),
    user: "Anonymous", // Use Meteor.user()._id in main.js
    up: 0,
    down: 0
});
```

Por último, tenemos que guardar los votos en la BD. Para ello, tenemos que utilizar el método 'update' de la colección Websites. En este caso, vamos a definir los eventos para la plantilla padre 'ApplicationLayout'. Lo hacemos así para poder utilizar estos eventos posteriormente en la página de detalle. Abre main.js y añade lo siguiente:

```javascript
Template.ApplicationLayout.events({
    "click .js-upvote":function(event){
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        console.log("Up voting website with id "+website_id);

        // put the code in here to add a vote to a website!
        Websites.update({_id: website_id},
                        {$set: {up: this.up + 1}});

        return false;// prevent the button from reloading the page
    },
    "click .js-downvote":function(event){

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        console.log("Down voting website with id "+website_id);

        // put the code in here to remove a vote from a website!
        Websites.update({_id: website_id},
                        {$set: {down: this.down + 1}});

        return false;// prevent the button from reloading the page
    }
})
```

### Parte 11. Ordenar los artículos por votos arriba

Esto es fácil. Sabemos que las plantillas de Meteor son reactivas, lo que significa que la interfaz de usuario se actualiza automáticamente cada vez que algo cambia. Vamos a aprovechar eso definiendo una ordenación en la plantilla de la lista del sitio web en main.js:

```javascript
Template.website_list.helpers({
    websites:function(){
        return Websites.find({}, {sort: {up:-1}});
    }
});
```

### Parte 12. Implementar una página de detalle utilizando el enrutamiento

Ahora necesitamos crear una nueva ruta en main.js que tomará el id del sitio web como parámetro en la ruta de la URL y consultará a la BD para obtener los datos de ese id. También vamos a renderizar una nueva plantilla en el marcador de posición principal:

```javascript
Router.route('/:_id', function () {
    this.render('navbar', {
        to: 'navbar'
    });
    this.render('website_detail', {
        to: 'main',
        data: function() {
            return Websites.findOne({_id: this.params._id});
        }
    });
});
```

Ahora vamos a crear la nueva plantilla en index.html:

```html
<!-- template that displays a website detail -->
<template name="website_detail">

    <h1><a href="{{url}}">{{title}}</a></h1>
    <p>
        {{description}}
    </p>
    <a href="#" class="btn btn-default js-upvote">
        <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
    </a>
    <a href="#" class="btn btn-default js-downvote">
        <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
    </a>
    <p class="website-meta">Votes: <span class="js-votes-up">{{up}}</span>↑, <span class="js-votes-down">{{down}}</span>↓</p>

</template>
```

### Parte 13. Añadir comentarios a la página de detalles

Primero vamos a crear una nueva colección Mongo en collections.js:

`Comments = new Mongo.Collection("comments");`

A continuación, dos nuevos marcadores de posición principales en la plantilla ApplicationLayout y tres nuevas plantillas (muy similares a las que ya tenemos) en index.html:

```html
{{> yield "comments"}}
{{> yield "comment"}}

(...)

<!-- template that displays several comments -->
<template name="comments_list">
    <h3>Comments</h3>
    <ol>
        {{#each comments}}
        {{>comment_item}}
        {{/each}}
    </ol>
</template>

<!-- template that displays individual comment entries -->
<template name="comment_item">
    <li>
        {{comment}}
        <p class="comment-meta">{{formattedDate}} by {{getUser user}}</p>
    </li>
</template>

<!-- template that displays the form to submit a new comment -->
<template name="comment_form">
    <div id="comment_form">
        <form class="js-save-comment-form">
          <div class="form-group">
            <input type="text" class="form-control" id="comment" placeholder="Type your comment here...">
          </div>

          <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>
</template>
```

Ahora, antes de continuar. Fíjate que estamos usando un nuevo helper llamado getUser. Lo necesitamos para obtener el nombre de usuario real de un determinado ID de usuario (que es el que tenemos en la DB). Así que añade este nuevo helper en main.js:

```javascript
// helper function that returns the username for a given user ID
Template.registerHelper('getUser', function(userId) {
     var user = Meteor.users.findOne({_id: userId});
    if (user) {
        return user.username;
    }
    else {
        return "anonymous";
    }
});
```

A continuación, vamos a actualizar la ruta de la página de detalles (en main.js) y renderizar las nuevas plantillas:

```javascript
this.render('comments_list', {
    to: 'comments'
});
this.render('comment_form', {
    to: 'comment'
});
```

Ahora tenemos que insertar los nuevos comentarios en la colección de comentarios cada vez que un usuario conectado envíe el formulario de comentarios. El esquema de esta colección va a almacenar el ID del sitio web al que pertenece el comentario, el comentario en sí, la fecha y el usuario que lo escribió. Fíjate que para obtener el ID del sitio web, vamos a utilizar el parámetro Router...

```javascript
Template.comment_form.events({
    "submit .js-save-comment-form":function(event){

        if (Meteor.user()) {

            // here is an example of how to get the comment out of the form:
            var comment = event.target.comment.value;
            console.log("The comment they entered is: "+comment);

            Comments.insert({
                website: Router.current().params._id,
                comment: comment,
                createdOn: new Date(),
                user: Meteor.user().username
            });
        }
        else {
            alert('You need to be logged in to submit comments!');
        }

        return false; // stop the form submit from reloading the page

    }
});
```

Ahora que tenemos los comentarios almacenados en la base de datos, necesitamos un ayudante de plantilla para mostrar la lista de comentarios. Filtraremos la consulta encontrando sólo los comentarios que tengan un ID de sitio web igual al de la página actual:

```javascript
Template.comments_list.helpers({
    comments:function(){
        return Comments.find({website: Router.current().params._id});
    }
});
```

### Parte 14. Asegurar y desplegar

Por último, vamos a eliminar el paquete inseguro (de lo contrario nuestra BD podría verse fácilmente comprometida):

`meteor remove insecure`

Y ahora tenemos que permitir el acceso a las diferentes operaciones de la BD en collections.js:

```javascript
// set up security on collections
Websites.allow({
    insert: function(userId, doc) {

        if (Meteor.user()) {
            if (userId != doc.user) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
});

Comments.allow({
    insert: function(userId, doc) {

        if (Meteor.user()) {
            if (userId != doc.user) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
});
```

Ahora que tenemos una seguridad básica, estamos listos para desplegar en los servidores de Meteor GRATIS:

`meteor deploy siteace-joanmira.meteor.com`.

Eso es todo. Espero que hayas disfrutado del tutorial y, por favor, añade un comentario si encuentras algún problema. Gracias.

En los próximos días, podría añadir las funcionalidades restantes: búsqueda y sitios web recomendados.
