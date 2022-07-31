---
title: "Tutorial: cómo crear un juego multijugador tipo trivial con Sails.js"
description: Mi experiencia personal trabajando con Socket.io y este nuevo framework full-stack
cover: images/desktop-view_ytdkg3.png
template: post
category: work
---

<style>
.left .gatsby-resp-image-wrapper {
  float: right;
  margin-left: 30px !important;
  margin-bottom: 30px;
  width: 178px;
}
</style>

<a class="btn external" role="button" href="http://quizwars.herokuapp.com/" target="_blank">Lanzar QuizWars</a>
<a class="btn github" role="button" href="https://github.com/gazpachu/quizwars" target="_blank">Código fuente</a>

### 1. Introducción

Este tutorial pretende explicar cómo construir un juego como [Quiz Wars](http://quizwars.herokuapp.com) con el framework MVC [Sails.js](http://sailsjs.org). Quiz Wars es una aplicación web responsiva multijugador en tiempo real para resolver cuestionarios. El objetivo es ser el más rápido respondiendo a las preguntas del quiz y ganar a otros jugadores. Se ha desarrollado intentando seguir los estándares de Sapient Dev en la medida de lo posible, con un enfoque mobile-first en mente y una estructura de patrón de módulos para el frontend. Actualmente, está en las primeras etapas de desarrollo, pero el viaje principal del usuario para entrar y terminar un quiz con otros jugadores está funcionando en cualquier navegador/dispositivo.

### Características/reglas actuales

- Base de datos de concursos flexible y escalable basada en archivos JSON (ver /assets/data/javascript.json)
- Autenticación de usuarios (registro e inicio de sesión) con encriptación de contraseñas
- Sala de chat con mensajes de estado del sistema
- Geolocalización basada en la dirección IP del socket (de momento no funciona en Heroku)
- Un número ilimitado de jugadores puede jugar al mismo tiempo
- Se requiere un mínimo de 2 jugadores con un estado "listo" para comenzar un concurso

### Características futuras

- Soporte para diferentes salas de chat/concurso
- Invitaciones basadas en la URL para jugar a un cuestionario específico
- Soporte para múltiples cuestionarios (por el momento, si un cuestionario ya está en marcha, el inicio de un segundo cuestionario rompería el primero)
- Construir un widget para incrustar los cuestionarios en otros sitios web
- Añadir muchos más cuestionarios sobre diferentes temas: diseño, fotografía, negocios, UX y, por supuesto, codificación.
- Añadir una función de tipo Pictionary: un usuario dibuja y los demás tienen que adivinarlo
- Clasificación global de las puntuaciones de los usuarios
- Posibilidad de añadir equipos/clanes y competiciones
- Lista de concursos más populares
- Mejorar el chat (por ejemplo, "el usuario está escribiendo...")

### Tech stack

- **Backend**: Sails.js (basado en Express, Node.js, Waterline ORM y Socket.io)
- **Frontend**: HTML5, LESS, JavaScript, jQuery, EJS, Bootstrap, Parsley
- **Herramientas**: Grunt, Git, Heroku, Bitbucket

### Requisitos

Este tutorial asume que el lector se siente cómodo programando con Javascript, archivos JSON, HTML, LESS y jQuery.

### 2. Acerca de Sails.js

Sails es un framework MVC para gestionar todo el pipeline de desarrollo de una aplicación (frontend y backend). Facilita la construcción de aplicaciones Node.js personalizadas y de nivel empresarial. Está diseñado para emular el conocido patrón MVC de marcos como Ruby on Rails, pero con soporte para los requisitos de las aplicaciones modernas: APIs basadas en datos con una arquitectura escalable y orientada a servicios. Es especialmente bueno para construir chats, cuadros de mando en tiempo real o juegos multijugador; pero puedes usarlo para cualquier proyecto de aplicación web, de arriba a abajo. Estas son algunas de sus características:

- **Es 100% Javascript**
- **Puedes usar cualquier sistema de base de datos**: Sails incluye un potente ORM, Waterline, que proporciona una sencilla capa de acceso a datos que simplemente funciona, sin importar la base de datos que estés utilizando
- **Generación automática de APIs REST**: Sails viene con planos que ayudan a poner en marcha el backend de tu aplicación sin tener que escribir ningún código
- **Soporte de WebSocket**: Sails traduce los mensajes de socket entrantes por ti
- **Políticas de seguridad reutilizables**: Sails proporciona seguridad básica y control de acceso basado en roles por defecto
- **Agnóstico de frontend**: Sails está diseñado para ser compatible con cualquier estrategia de frontend; ya sea Angular, Backbone, iOS/ObjC, Android/Java, Windows Phone, o algo totalmente distinto
- **Pipeline de assets flexible**: Sails se entrega con Grunt, lo que significa que todo el flujo de trabajo de los activos del frontend es completamente personalizable

### 3. Instalación de Sails.js

Quiz Wars se basa en Sails v0.10. Simplemente [sigue el tutorial oficial de Sails.js](http://sailsjs.org/#/getStarted) para instalar Node.js en tu sistema operativo preferido.

Una vez que tengas Node.js instalado, procede a instalar Sails.js escribiendo lo siguiente en tu consola. Nota: en Windows no es necesario usar "sudo".

`sudo npm -g install sails`

Descarga o clona el [código fuente de Quiz Wars](https://github.com/gazpachu/quizwars) y extrae su contenido en la ubicación que prefieras

Nota: Si estuvieras creando una nueva aplicación Sails.js con la estructura de carpetas y plantillas por defecto, entonces podrías escribir

`sails new testProject`.

En tu consola, navega hasta la carpeta anterior y escribe lo siguiente para instalar las dependencias (módulos de Node). Estos están definidos en "package.json"

`npm install`

Una vez que tenemos todos los archivos y las dependencias descargadas, podemos proceder a iniciar el servidor Node y la app

`sails lift`

En este punto, si visitas [http://localhost:1337](http://localhost:1337) verás el Quiz Wars en funcionamiento o la página de inicio por defecto si has creado un nuevo proyecto

### 4. Estructura de la carpeta Sails.js

![](/blog/tutorial-how-to-build-a-multi-player-quiz-app-with-sails-js/images/folder-structure_fqfmgc.png "Estructura de carpetas")

- **/.tmp/public**: donde se compilan los archivos de distribución. Estos archivos son los que vemos cuando cargamos el sitio web

- **/api**: **todos los archivos del backend**. En la carpeta "policies" se almacenan las reglas de acceso de los usuarios de la aplicación. "responses" contiene archivos como los errores del servidor web (404, 403, 500, etc). Podemos incluir en esta carpeta las funciones que se encargan de tareas específicas como decidir cómo gestionar los usuarios con diferentes niveles de acceso. Se podría hacer en el controlador, pero es una buena práctica no inflar los controladores con mucha lógica de negocio.

- **/activos/datos**: Archivos JSON con las preguntas del juego

- **/assets/images**: todas las imágenes

- **/assets/styles**: archivos LESS

- **/accesorios/js**: **toda la lógica del frontend** y sus dependencias javascript

- **/config**: todos los archivos de configuración

- **/tasks**: todas las tareas de Grunt

- **/view**: todo el marcado HTML de nuestras páginas

### Otros archivos importantes

- **"/config/sockets.js "**: este archivo tiene dos métodos, "onConnect" y "onDisconnect". We use these methods to handle the socket connections
- **"/config/models.js "**: este fichero nos permite especificar qué conector de BD queremos utilizar y la forma en que queremos migrar los datos
- **"/config/routes.js "**: este archivo nos permite conectar las URLs con las vistas y los endpoints con los métodos del controlador

```javascript
module.exports.routes = {
    // HTML Views
    '/': { view: 'index' },
    '/quiz': { view: 'quiz' },

    // Endpoints
    'post /login': 'UserController.login',
    'post /signup': 'UserController.signup',
    '/logout': 'UserController.logout',
};
```

### 5. Diagrama de flujo

![](/blog/tutorial-how-to-build-a-multi-player-quiz-app-with-sails-js/images/quiz-wars-flow-diagram_bggdcc.png)

### 6. Diagrama de arquitectura

![](/blog/tutorial-how-to-build-a-multi-player-quiz-app-with-sails-js/images/quiz-wars-architecture-diagram_ipzw4b.png)

### 7. El mapa del sitio, el diseño y las vistas

Siempre que construyo un nuevo proyecto, lo primero que se me ocurre es el mapa del sitio. Este documento elemental es muy importante para crear una imagen en tu mente de cómo va a ser el recorrido del usuario y cómo están interconectadas las páginas. En Quiz Wars, el mapa del sitio es muy sencillo. Sólo hay dos vistas/páginas, "índice" y "quiz". El recorrido del usuario consiste en entrar en el sistema o registrarse como nuevo usuario. A continuación se le redirige a la página del cuestionario, donde permanecerá hasta el final de su sesión.

Por defecto, Sails está configurado para utilizar EJS (Embedded Javascript) como motor de visualización. La sintaxis de EJS es muy convencional - si has trabajado con php, asp, erb, gsp, jsp, etc., sabrás inmediatamente lo que estás haciendo.

- **"/view/index.ejs "**: esta es la página de inicio, donde tenemos dos formularios (que se activan con jQuery), el de inicio de sesión y el de registro. El primer formulario envía datos al punto final "/login", que está conectado con el método "login" en el controlador "user". El segundo envía los datos a "/signup", que está conectado al método "signup" del controlador "user".
- **"view/quiz.ejs "**: esta página contiene el resto del contenido disponible en el sitio web. Hay tres paneles: la tabla de puntuaciones, el panel del concurso y el panel del chat

Las vistas hacen uso de **"/view/layout.ejs "**, que es la plantilla que contiene los elementos comunes, como las etiquetas meta y link, la declaración del cuerpo y todas las dependencias JS:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Quiz Wars</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link rel="stylesheet" href="/styles/bootstrap.min.css">
        <link rel="stylesheet" href="/styles/importer.css">
    </head>
    <body>
        <header id="logo"></header>
        <script src="/js/dependencies/jquery.min.js"></script>
        <script src="/js/dependencies/parsley.min.js"></script>
        <script src="/js/dependencies/sails.io.js"></script>
        <script src="/js/app.js"></script>
        <script src="/js/user.js"></script>
        <script src="/js/chat.js"></script>
        <script src="/js/quiz.js"></script>
        <script src="/js/events.js"></script>
        <%- body %>
    </body>
</html>
```

El soporte de layout sólo está implementado para el motor de vistas EJS. Si prefieres usar un motor diferente (jade, handlebars, mustache underscore, etc), puedes cambiarlo en "**/config/views.js**".

### 8. La página de inicio

La página de inicio contiene sólo dos formularios HTML clásicos para iniciar la sesión del usuario o registrarlo. La única lógica habitual es la evaluación de la sesión para determinar si el usuario ya está conectado:

```javascript
<% if (req.session.me) { %>
    <a href="/quiz">Quiz</a> | <a href="/logout">Logout</a>
<% } else { %>
  <!-- show the login/signup form -->
<% } %>
```

En el ejemplo de código anterior, estamos evaluando si el objeto de sesión tiene los datos del usuario o no. Asignamos los datos del usuario a la sesión después de un inicio de sesión exitoso en **"/api/responses/login.js"** -> req.session.me = user.id;

Otro aspecto que me gustaría destacar es la validación de formularios realizada por [parsleyjs](http://parsleyjs.org). Esto se hace agregando atributos a los campos de entrada como `data-parsley-trigger="keyup"`, `data-parsley-maxlength="30"` o requerido.

Nota: actualmente no hay informes de errores cuando el usuario intenta iniciar sesión con el nombre de usuario/contraseña incorrectos.

### 9. La página del cuestionario

El marcado es bastante sencillo. Hay **tres paneles**: la tabla de puntuación `<div id="players-panel"></div>`, el panel de cuestionario `<div id="quiz-panel"></div>` y el panel de chat `<div id="chat-panel"></div>`. Nuevamente, solo mostramos los contenidos si el usuario tiene una sesión activa, de lo contrario, el usuario verá el mensaje *No ha iniciado sesión*.

El menú desplegable del cuestionario contiene los nombres de los archivos JSON como valores:

```html
<select id="quiz-dropdown" class="form-control">
  <option value="javascript.json">Javascript Quiz</option>
  <option value="html5.json">HTML5 Quiz (not yet ready)</option>
</select>
```

Y el botón para reiniciar el concurso, que tiene una simple recarga de la página: `onClick="window.location.reload()"`

### 10. El modelo de usuario

En un framework MVC, tenemos modelos, vistas y controladores. Los modelos nos permiten definir la lógica que interactuará con nuestra BD. Sails.js utiliza un ORM (aunque ellos prefieren llamarlo "un nuevo tipo de motor de almacenamiento y recuperación") llamado [Waterline](https://github.com/balderdashy/waterline). Proporciona una API uniforme para acceder a cosas de diferentes tipos de bases de datos, protocolos y APIs de terceros. Esto significa que se escribe el mismo código para obtener y almacenar cosas como los usuarios, ya sea en Redis, MySQL, LDAP, MongoDB o Postgres. Waterline se esfuerza por heredar las mejores partes de los ORM como ActiveRecord, Hibernate y Mongoose, pero con una perspectiva nueva y haciendo hincapié en la modularidad, la capacidad de prueba y la coherencia entre adaptadores.

En Quiz Wars, la BD se basa en el sistema de archivos (el método por defecto). Desde el punto de vista del desarrollo, es estupendo porque no tenemos que preocuparnos de crear tablas y conectar con la BD, además de que podemos restablecer los datos muy fácilmente seleccionando la tercera opción de migración al levantar la aplicación mediante "sails lift". Para ver las opciones de migración hay que comentar el valor "migrate" en **"/config/models.js"**.

Ahora, vamos a estudiar el modelo de usuario de Quiz Wars (el único modelo que necesitamos) en **"/api/models/User.js"**:

```javascript
module.exports = {
    autosubscribe: ['destroy'],

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'email',
            unique: true,
            required: true
        },
        password: {
            type: 'string',
            required: true,
            minLength: 6
        },
        avatar: {
            type: 'string',
            required: false
        },
        status: {
            type: 'string',
            defaultsTo: 'offline',
            required: false
        },
        score: {
            type: 'integer',
            defaultsTo: 0,
            required: false
        },
        ip: {
            type: 'string',
            required: false
        }
    }
};
```

La creación de un modelo es muy similar (conceptualmente hablando) a la creación de una nueva tabla en una BD. Cada atributo puede tener ciertas propiedades, como un tipo, ser único o requerido, tener un estado por defecto, una longitud mínima, etc. Para obtener una lista completa de las propiedades de los atributos, puede consultar la [documentación del modelo de línea de flotación](https://github.com/balderdashy/waterline-docs/blob/master/models.md). Cada modelo sirve de interfaz para comunicar nuestros controladores con nuestra BD.

En este modelo, estamos almacenando la información básica de cada usuario, siendo el **estado** el más importante. Un usuario puede tener un estado a la vez y puede ser: "**online**", cuando el usuario está conectado pero no está listo para jugar, "**ready**", cuando el usuario ha confirmado que quiere unirse al próximo quiz y "**playing**", cuando el usuario está jugando actualmente a un quiz. Si el usuario tiene un estado "offline", significa que no está conectado y por lo tanto no aparecerá en la tabla de puntuaciones/jugadores.

Además de los atributos, los modelos también contienen la lógica para consultar la BD. En Quiz Wars, tenemos dos métodos (en el mismo archivo donde tenemos los atributos), signup y attemptLogin:

```javascript
signup: function (inputs, cb) {
  var password = inputs.password;
  var hasher = require("password-hash");
  password = hasher.generate(password);

  // Create a user
  User.create({
      name: inputs.name,
      email: inputs.email,
      password: password,
      avatar: inputs.avatar
    )
    exec(cb);
},

attemptLogin: function (inputs, cb) {

    // Create a user
    User.findOne({
        email: inputs.email
    })
    .exec(cb);
}
```

El método "signup" utiliza un módulo del nodo llamado "password-hash". Este módulo crea un hash a partir de la cadena de contraseñas que podemos almacenar de forma segura en la BD. Una vez que nuestros datos están listos para ser almacenados, llamamos a la consulta "create" para almacenarlos en la BD. Para una lista completa de consultas que podemos utilizar con Waterline, por favor, consulte la [documentación de consultas](https://github.com/balderdashy/waterline-docs/blob/master/query.md). La consulta "create" fallará si la dirección de correo electrónico ya está en la BD debido a la propiedad "unique" establecida en el atributo email.

El método "attemptLogin" trata de encontrar un usuario en la base de datos con la misma dirección de correo electrónico que se ha pasado como parámetro. Observa que el manejo de errores no está incluido en el modelo. Eso es un trabajo para el controlador...

### 11. El controlador de usuario

El controlador de Usuario encapsula toda la lógica de la aplicación entre la página de inicio y la página del cuestionario y el modelo de Usuario. Todos sus métodos, o bien llaman al modelo para realizar una consulta en la BD, o bien llaman a una respuesta o emiten un evento de socket. Veámoslos un poco más en detalle:

- **login**>: este método básicamente llama a "api/responses/login.js" con los valores de entrada del formulario de login
- **logout**: asignamos null a la sesión y redirigimos al usuario a la página de inicio
- **signup**: llama al método de registro del modelo de usuario, maneja la respuesta devuelta y redirige al usuario si el registro es exitoso
- **chat**: emite un evento socket con el verbo "messaged" y los parámetros pasados a la función. Este mensaje será recibido en el frontend por todos los usuarios conectados
- **estado**: este método se encarga de actualizar el estado de un usuario determinado o de un grupo de usuarios dependiendo de si el valor del atributo ID es un número o una cadena respectivamente. El proceso para actualizar un usuario es: consultar la BD, es decir user.find(...) -> loop users, users.forEach(...) -> asignar nuevo valor, user.status = req.param('status') -> save(). Una vez actualizado el usuario en la BD, emitimos un evento socket para informar al resto de usuarios. Fíjate que aún no se ha implementado el manejo de errores
- **start**: emite un evento de socket para informar al resto de los usuarios de que el concurso ha comenzado. Al mismo tiempo, les enviamos una secuencia de números que corresponden a los índices aleatorios de las preguntas que ha generado el usuario que ha iniciado el cuestionario
- **puntuación**: un método sencillo para transmitir a todos los sockets conectados que un determinado usuario tiene una nueva puntuación. De momento no estamos guardando la puntuación en la BD, pero esto será necesario si queremos implementar un ranking persistente

```javascript
module.exports = {
    login: function (req, res) {

        // See `api/responses/login.js`
        return res.login({
            email: req.param('email'),
            password: req.param('password'),
            successRedirect: '/quiz',
            invalidRedirect: '/'
        });
    },

    logout: function (req, res) {

        req.session.me = null;

        // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
        // send a simple response letting the user agent know they were logged out
        // successfully.
        if (req.wantsJSON) {
            return res.ok('Logged out successfully!');
        }

        // Otherwise if this is an HTML-wanting browser, do a redirect.
        return res.redirect('/');
    },

    signup: function (req, res) {

        // Attempt to signup a user using the provided parameters
        User.signup({
            name: req.param('name'),
            email: req.param('email'),
            password: req.param('password'),
            avatar: req.param('avatar'),
        }, function (err, user) {
            // res.negotiate() will determine if this is a validation error
            // or some kind of unexpected server error, then call `res.badRequest()`
            // or `res.serverError()` accordingly.
            if (err) return res.negotiate(err);

            // Go ahead and log this user in as well.
            // We do this by "remembering" the user in the session.
            // Subsequent requests from this user agent will have `req.session.me` set.
            req.session.me = user.id;
            req.session.name = user.name;


            // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
            // send a 200 response letting the user agent know the signup was successful.
            if (req.wantsJSON) {
                return res.ok('Signup successful!');
            }

            // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
            return res.redirect('/quiz');
        });
    },

    chat: function (req, res) {
        sails.io.sockets.emit("chat", {verb:"messaged", data:{from: req.param('sender'), msg: req.param('msg')}})
    },

    status: function (req, res) {

        if (typeof req.param('id') === 'string') { // We want to change the status of a group of users

            User.find({status: req.param('id')}).exec(function(err, users) {
                if (err) {
                    return res.negotiate(err);
                }
                else {
                    users.forEach(function (user) {
                        user.status = req.param('status');
                        user.save();
                    });
                }
            });
        }
        else {
            User.findOne({id: req.param('id')}).exec(function(err, user) {
                if (err) {
                    return res.negotiate(err);
                }
                else {
                    req.session.me.status = req.param('status');
                    user.status = req.param('status');
                    user.save();
                }
            });
        }

        sails.io.sockets.emit("chat", {verb:"changedStatus", data:{id: req.param('id'), status: req.param('status')}})
    },

    start: function(req, res) {
        sails.io.sockets.emit("chat", {verb:"startQuiz", data:{user: req.param('user'), sequence: req.param('sequence')}})
    },

    score: function(req, res) {

        User.findOne({id: req.param('id')}).exec(function(err, user) {
            if (err) {
                return res.negotiate(err);
            }
            else {
                /*user.score += 1;
                user.save();*/
                sails.io.sockets.emit("chat", {verb:"score", data:{id: req.param('id'), name: user.name}})
            }
        });
    }
};
```

### 12. La respuesta de inicio de sesión

¿Por qué necesitamos separar esta lógica del controlador? Esta puede ser la primera pregunta que te venga a la cabeza y en muchos casos, sería preferible.  Este ejemplo utiliza una respuesta personalizada "gorda" para demostrar cómo podríamos hacerlo si, por ejemplo, necesitamos que el backend soporte múltiples roles de usuario, con diferentes comportamientos de login. Podríamos necesitar enviar de vuelta algunos tipos diferentes de códigos de éxito/fracaso, con diferentes mensajes basados en el resultado. En ese caso, lo más sensato sería crear una versión personalizada de la lógica aquí en lugar de en la acción del controlador correspondiente.

Esta función de inicio de sesión en `api/responses/login.js` intenta iniciar la sesión del usuario, verifica que la contraseña del formulario de inicio de sesión coincide con el hash de la DB, asigna el ID y el nombre del usuario a la sesión y maneja cualquier posible error/respuesta.

```javascript
module.exports = function login(inputs) {
    inputs = inputs || {};

    // Get access to `req` and `res`
    var req = this.req;
    var res = this.res;

    // Look up the user
    User.attemptLogin({
        email: inputs.email
    }, function (err, user) {

        if (err) return res.negotiate(err);
        if (!user) {

            if (req.wantsJSON || !inputs.invalidRedirect) {
                return res.badRequest('Invalid username/password combination.');
            }
            return res.redirect(inputs.invalidRedirect);
        }

        var password = inputs.password;
        var hasher = require("password-hash");
        if (hasher.verify(password, user.password)) {

            // "Remember" the user in the session
            // Subsequent requests from this user agent will have `req.session.me` set.
            req.session.me = user.id;
            req.session.name = user.name;

            // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
            // send a 200 response letting the user agent know the login was successful.
            // (also do this if no `successRedirect` was provided)
            if (req.wantsJSON || !inputs.successRedirect) {
                return res.ok();
            }

            // Otherwise if this is an HTML-wanting browser, redirect to /.
            return res.redirect(inputs.successRedirect);
        }
        else {
            if (req.wantsJSON || !inputs.invalidRedirect) {
                return res.badRequest('Invalid username/password combination.');
            }
            return res.redirect(inputs.invalidRedirect);
        }
    });
};
```

### 13. El archivo de configuración socket.js

El archivo ubicado en `/config/socket.js` se utiliza para saber si un usuario ya tiene una sesión creada. Digamos que te registras en la página y tienes un socket abierto. Luego, por la razón que sea, pierdes la conexión a Internet y tus sockets se desconectan. Cuando tu conexión está de vuelta y recargas la página, el primer método que se disparará cuando tu socket vuelva a estar vivo es "onConnect". Aquí comprobaremos si tu sesión ya está registrada en la BD y si ese es el caso reanudaremos tu actividad tal y como estaba antes de que se interrumpiera tu conexión.

OnConnect también te suscribirá para ver los cambios en el Modelo de Usuario, guardar tu dirección IP y guardar tus datos en el objeto de sesión.

OnDisconnect establecerá tu estado como "offline" y transmitirá al resto de usuarios que has abandonado la aplicación.

```javascript
onConnect: function(session, socket) {
    // Proceed only if the user is logged in
    if (session.me) {

        User.findOne({id: session.me}).exec(function(err, user) {

            var socketId = sails.sockets.id(socket);

            user.status = 'online';
            user.ip = socket.handshake.address.address;
            user.save(function(err) {
              // Publish this user creation event to every socket watching the User model via User.watch()
              User.publishCreate(user, socket);
            });

            // Create the session.users hash if it doesn't exist already
            session.users = session.users || {};

            // Save this user in the session, indexed by their socket ID.
            // This way we can look the user up by socket ID later.
            session.users[socketId] = user;

            // Persist the session
            session.save();

            // Get updates about users being created
            User.watch(socket);

            // Send a message to the client with information about the new user
            sails.sockets.emit(socketId, 'hello', user);
        });
    }
}

onDisconnect: function(session, socket) {
     try {

         if (session.users !== undefined) {

             // Look up the user ID using the connected socket
             var socketId = sails.sockets.id(socket);
             var userId = session.users[socketId].id;

             if (userId) {

                 // Get the user instance
                 User.findOne(userId).exec(function(err, user) {

                     // Set the user offline
                     user.status = 'offline';
                     user.save();

                     // Publish the destroy event to every socket subscribed to this user instance
                     User.publishDestroy(user.id, null, {previous: user});
                 });
             }
         }
     } catch (e) {
          console.log("Error in onDisconnect: ", e);
     }
}
```

### 14. Los módulos del frontend

Los módulos del frontend se encuentran en `/assets/js/`. Actualmente, tenemos `chat.js`, `events.js`, `quiz.js` y `user.js`. El punto de entrada de la aplicación se encuentra en `app.js`. Con el planteamiento básico actual del juego, sólo necesitamos una instancia de cada módulo que se ejecute al mismo tiempo porque un usuario determinado sólo puede jugar a un cuestionario a la vez. Pero si en el futuro queremos añadir más características, como múltiples salas de chat o mensajes privados, sería una buena idea refactorizar los módulos para que sean más flexibles.

### Empecemos con app.js

```javascript
io.socket.on('connect', function socketConnected() {
    QW_MODULES.chat.init();
    QW_MODULES.quiz.init();
    QW_MODULES.user.init();
    QW_MODULES.events.init();

    io.socket.on('hello', function(data) {

        if (data) {
            window.me = data;

            io.socket.get('/user', QW_MODULES.user.updateUserList);
            io.socket.post('/user/chat', {sender: 'System', msg: data.name + ' joined'});
        }
    });

    io.socket.on('user', function messageReceived(message) {

        switch (message.verb) {
            case 'created': QW_MODULES.user.addUser(message.data); break;
            case 'destroyed': QW_MODULES.user.removeUser(message.id); break;
            default: break;
        }
    });

    io.socket.on('chat', function messageReceived(message) {

        switch (message.verb) {
            case 'messaged': QW_MODULES.chat.receiveMessage(message.data); break;
            case 'changedStatus': QW_MODULES.chat.updateStatus(message.data); break;
            case 'startQuiz': QW_MODULES.quiz.loadQuiz(message.data); break;
            case 'score': QW_MODULES.chat.updateScore(message.data); break;
            default: break;
        }
    });
});

io.socket.on('disconnect', function() {
    io.socket.post('/user/chat', {sender: 'System', msg: me.name + ' left'});
});
```

Lo primero que notarás es que no estamos usando "onReady/onLoad" para iniciar la aplicación. En este caso, he decidido utilizar el evento "connect" de la librería socket.io como punto de entrada para cargar todo lo demás. La razón de esto es evitar cargar la aplicación antes de que tengamos una conexión de socket. Si no hay un socket disponible por cualquier problema de conexión, entonces no cargamos la aplicación.

Desde el principio, cargamos todos los módulos del frontend con el prefijo `QW_MODULES`. Probablemente no los necesitemos todos en la página de login/signup, pero eso es parte de una etapa de optimización que no es necesaria ahora. Las siguientes tres funciones son callbacks de socket.io. Nos suscribimos a esos mensajes: "hola", "usuario" y "chat". Cada vez que el backend emita uno de esos mensajes, el frontend lo recibirá. Esto se llama el patrón [pub/sub](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) (publicar/suscribir). En algunos de estos callbacks, podemos encontrar que el mensaje tiene un verbo adjunto. Sails.js crea automáticamente eventos para verbos como "created", "destroyed" y algunos más cuando interactuamos con los modelos. En este caso, estamos llamando a las funciones addUser y removeUser en nuestro módulo de usuario del frontend cada vez que el backend emite un evento automático cuando se crea o destruye un usuario. Esto es lo que hace que el framework sea tan potente.

El callback "hola" se dispara cuando se realiza una conexión exitosa. Si el usuario recarga la página, se disparará de nuevo. Ahora, desde el front-end también podemos emitir mensajes! eso es lo que hacemos en las líneas 13 y 14. La primera línea utiliza "get" para recuperar una lista de usuarios de la API del backend y la envía al método updateUserList del módulo de usuario del frontend. Sails.js genera vistas JSON automáticas de los controladores y sus acciones que son accesibles por la URL que coincide con el nombre del controlador &amp; action:

- Controlador "User", acción "index" -> /user
- Controlador "Usuario", acción "chat" -> /usuario/chat

Puedes probarlo tú mismo. Entra en Quiz Wars y visita [http://localhost:1337/user](http://localhost:1337/user)

El siguiente callback, "chat", se utiliza para actualizar el juego y los mensajes del chat. Sinceramente, en lugar de "chat" podríamos haberlo llamado "quiz" o "juego"... Su propósito principal es actuar como un router virtual que redirige los mensajes a la función correcta del frontend.

Lamentablemente, el callback de "desconexión" no funciona :-( No estoy seguro de por qué. He intentado ponerlo dentro de la función "connect" pero no ha funcionado. Por favor, hazme saber si consigues que funcione. Lo estamos usando para mostrar un mensaje en la sala de chat cuando el usuario sale de la aplicación.

### El módulo de usuario

Este módulo es bastante auto-explicativo. "addUser" y "removeUser" se encargan de actualizar la `<table>` de los usuarios añadiendo/quitando una `<tr>` y actualizando la UI (habilitando/deshabilitando el botón de preguntas). La función "updateUserList" restablece la tabla cuando un nuevo usuario se conecta a la aplicación o cuando alguien se va.

```javascript
var QW_MODULES = (function (modules, $) {
    "use strict";

    var self;

    var user = {

        init: function() {

            self = this;
        },

        // Add a user to the list of available users to play with
        addUser: function(user) {

            var found = false;

            // Check if the user is already in the table
            $('#status-table tr').each(function() {
                var hasUser = $(this).attr('id');

                if (hasUser !== undefined &amp;&amp; ('user-' + user.id == hasUser)) {
                    found = true;
                }
            });

            if (!found) {
                var $table = $('#status-table');
                var ready = (user.id == me.id) ? '<button type="button" id="changeStatus" class="btn btn-default btn-xs">change</button>' : '';
                var row = '<tr id="user-'+user.id+'"><td class="name" data-avatar="'+user.avatar+'">'+user.name+'</td>
                          <td><img class="flag" src="http://api.hostip.info/flag.php?ip='+user.ip+'" width="20" height="14" alt="">
                          <span class="status" data-status="'+user.status+'">'+user.status+'</span>'+ready+'</td><td class="score">'+user.score+'</td></tr>';
                $table.append(row);

                QW_MODULES.chat.updateUI();
            }
        },

        // Remove a user from the table of available users to play with, by sending
        // either a user object or a user ID.
        removeUser: function(user) {

            // Get the user's ID.
            var id = user.id || user;
            var userName = $('#user-'+id).text();

            // Remove the corresponding element from the users table
            var userEl = $('#user-'+id).remove();


            QW_MODULES.chat.updateUI();
        },

        // Add multiple users to the users list.
        updateUserList: function(users) {

            $('#status-table tbody tr').remove();

            users.forEach(function(user) {

                if ((typeof user.id === 'undefined') || (user.status === 'offline') || (typeof me === 'undefined')) {
                    return;
                }

                self.addUser(user);
            });
        }
    };

    // return as QuizWars Module
    modules.user = user;
    return  modules;

})(QW_MODULES || {}, jQuery);
```

### El módulo de eventos

Este módulo crea todos los eventos de la interfaz de usuario de la aplicación. Están organizados por módulo: inicio de sesión/registro, usuario, chat y cuestionario.

```javascript
var QW_MODULES = (function (modules, $) {
    "use strict";

    var self;

    var events = {

        init: function() {

              // Login / Signup events
              $('#login-cta').on('click', function() {
                  $('#login').show();
                  $('#signup').hide();
              });

              $('#signup-cta').on('click', function() {
                  $('#login').hide();
                  $('#signup').show();
              });

              // Chat and User events
              $('#message').keyup(function (event) {
                  if (event.keyCode == 13) {
                        QW_MODULES.chat.triggerSendButton();
                  }
              });

              $('#status-table').on('click', '#changeStatus', function() {
                  var status = 'ready';

                  if ($(this).parent().children('.status').attr('data-status') === 'ready') {
                        status = 'online';
                  }

                  io.socket.post('/user/status', {id: me.id, status: status});
              });

              // Quiz events
              $('#rules-cta').on('click', function() {
                  $('#rules').toggle();
              });

              $('#startQuiz').on('click', function() {

                  QW_MODULES.chat.writeMessage('System', me.name + " started a quiz!");

                  $('#quiz-settings').hide();
                  $('#questions tr').remove();

                  io.socket.post('/user/status', {id: 'ready', status: 'playing'});

                  QW_MODULES.quiz.generateSequence();
              });

              $('#questions').on('click', 'input[name="answer"]', function() {
                  if ($(this).attr('disabled') !== 'disabled') {
                        QW_MODULES.quiz.checkAnswer();
                  }
              });
        }
    };

    // return as QuizWars Module
    modules.events = events;
    return  modules;

})(QW_MODULES || {}, jQuery);
```

### El módulo de chat

Este módulo se encarga de todas las interacciones que el usuario realiza con el sistema de chat. Fíjate que estamos enviando el mensaje a "/usuario/chat" que corresponde a la acción de Chat en el Controlador de Usuario. Me acabo de dar cuenta de que la función "updateScore" podría estar un poco fuera de lugar en este módulo; probablemente se encuentre mejor en el módulo Quiz. No obstante, esta función actualiza la puntuación en la tabla de jugadores y muestra la respuesta correcta a la pregunta actual.

```javascript
var QW_MODULES = (function (modules, $) {
    "use strict";

    var self;

    var chat = {

        systemMsg: ['I don\'t mean to be rude, but you are talking to yourself...',
                    'Are you sure you want to continue doing this?',
                    'I have all the time in the world...',
                    'OK, this is getting weird.',
                    'Stop it now',
                    'Please, go and tell somebody to join',
                    'http://www.itsgoodtotalk.org.uk/therapists'],
        currentMsg: 0,

        init: function() {

              self = this;
        },

        triggerSendButton: function() {

              if ($('#message').val() !== '') {
                  self.sendMessage(me.name, $('#message').val());

                  $('#message').val('');
              }
        },

        writeMessage: function(senderName, message) {

              var textarea = $('#messages');
              var currentdate = new Date();
              var message = currentdate.getHours() + ":" + ('0' + currentdate.getMinutes()).slice(-2) + " " + senderName+': '+message+'n';
              textarea.append(message);

              // Scroll to the bottom
              if(textarea.length) {
                  textarea.scrollTop(textarea[0].scrollHeight - textarea.height());
              }
        },

        sendMessage: function(senderName, message) {

              if( $('#status-table tr').length > 2 ) {
                  io.socket.post('/user/chat', {sender: senderName, msg: message});
              }
              else {
                  self.writeMessage('System', systemMsg[currentMsg]);

                  if (currentMsg < systemMsg.length -1) currentMsg++;                   else currentMsg = 0;               }         },         receiveMessage: function(data) {               self.writeMessage(data.from, data.msg);         },         updateStatus: function(data) {               var $el = null;               if (typeof data.id === 'string') {                   $el = $('#status-table').find('[data-status="'+data.id+'"]');               }               else {                   $el = $('#status-table').find('#user-'+data.id+' .status');               }               $el.attr('data-status', data.status).html(data.status);               me.status = data.status;               self.updateUI();         },         updateUI: function() {               var readyPlayers = 0;               $('#status-table tr').each(function() {                   if ($(this).find('.status').attr('data-status') === 'ready') {                         readyPlayers++;                   }               });               if( readyPlayers > 1 ) {
                  $('#startQuiz').removeAttr('disabled');
              }
              else {
                  $('#startQuiz').attr('disabled', 'disabled');
              }
        },

        updateScore: function(data) {

              $('#question-winner').html(data.name + ' was the quickest to answer correctly');
              QW_MODULES.quiz.resolveQuestion();

              $('#status-table tr').each(function() {
                  var hasUser = $(this).attr('id');

                  if (hasUser !== undefined &amp;&amp; ('user-' + data.id == hasUser)) {
                        var newScore = parseInt($(this).find('.score').html()) + 1;
                        $(this).find('.score').html(newScore);
                  }
              });
        }
    };

    // return as QuizWars Module
    modules.chat = chat;
    return  modules;

})(QW_MODULES || {}, jQuery);
```

### El módulo del concurso

Este módulo gestiona toda la lógica cuando se inicia el quiz. El primer paso es generar un array de índices aleatorios a partir del archivo JSON seleccionado con las preguntas del quiz. Esto se hace con la función "generateSequence", que carga el JSON vía Ajax. Una vez que sabemos el número de preguntas en el archivo JSON, creamos un array ficticio lleno de números, desde 0 hasta la cantidad total de preguntas. Luego aplicamos la función personalizada "shuffle" para mezclar todos los números en un nuevo array. Finalmente, tomamos el número de preguntas que el usuario eligió y las enviamos a todos los jugadores junto con la señal de inicio del concurso.

Cuando todos los usuarios reciban la señal para comenzar el concurso, se activará la función "loadQuiz", que cargará la primera pregunta de la secuencia desde el archivo JSON y llamará a "setupQuiz" para comenzar la cuenta atrás inicial.

Una vez finalizada la cuenta atrás inicial, la primera pregunta aparecerá en la pantalla (ver el caso "startQuiz" en la función "countdownCallback"). Cuando aparezca una nueva pregunta en la pantalla, también se iniciará una nueva cuenta atrás. Esta cuenta atrás sólo se detendrá si alguno de los jugadores hace clic en la respuesta correcta (véase la función "checkAnswer") o si la cuenta atrás llega a su fin. En ambos casos, se revelará la respuesta correcta, se actualizará la puntuación y se cargará la siguiente pregunta.

La función "resolveQuestion" añade las clases a las respuestas para mostrar las correctas e incorrectas, luego comprueba si estamos al final del cuestionario y si es así llama a la función "winner". Esta última función mostrará el avatar del usuario al resto de los usuarios y mostrará un botón para recargar la página y comenzar un nuevo quiz.

```javascript
var QW_MODULES = (function (modules, $) {
    "use strict";

    var self;

    var quiz = {

        jsonData: null,
        questions: [],
        current: 0,
        interval: 0,
        secondsToStart: 5,
        secondsToAnswer: 20,
        secondsToWait: 5,

        init: function() {

              self = this;
        },

        generateSequence: function() {

              // Get the quiz questions from the selected JSON file
              $.getJSON('/data/' + $('#quiz-dropdown :selected').val(), function (obj) {

                  self.jsonData = obj;
                  var size = obj.questions.length;
                  var requestedSize = parseInt($('#amount').val());
                  var sequence, dummyArray = [];

                  // Limit the quiz size to the amount of available questions
                  if (requestedSize > size) requestedSize = size;

                  // Get an array with numbers as big as the json file
                  for (var i = 0; i < size; i++) {
                    dummyArray[i] = i;
                    }
                    // Shuffle the array and get a slice of it                   dummyArray = self.shuffle(dummyArray);                   sequence = dummyArray.slice(0, requestedSize);                   io.socket.post('/user/start', {user: me.name, sequence: sequence});               });         },         loadQuiz: function(data) {               $('#quiz').show();               $('#changeStatus').hide();               // Check if we still don't have the generated sequence of questions               if (self.questions.length === 0) {                   self.questions = data.sequence;               }               if (self.jsonData === null) {                   $.getJSON('/data/' + $('#quiz-dropdown :selected').val(), function (obj) {                         self.jsonData = obj;                         self.setupQuiz(self.jsonData.title);                   });               }               else {                   self.setupQuiz(self.jsonData.title);               }         },         setupQuiz: function(title) {               $('#quiz-settings').hide();               $('#questions tr').remove();               $('#title').html(title);               $('#progress').attr('max', parseInt($('#amount').val()));               self.countDown($('#countdown'), self.secondsToStart, 'startQuiz');         },         countDown: function($el, secs, stage) {               clearInterval(self.interval);               self.interval = setInterval(function () {                   if (secs > 0) {
                        $el.html(secs);
                        secs--;
                  }
                  else {
                        $el.html('');
                        clearInterval(self.interval);
                        self.countDownCallback(stage);
                  }
              }, 1000);
        },

        countDownCallback: function(stage) {

              switch(stage) {

                  case 'startQuiz': $('#countdown').removeClass('start');
                                    self.loadQuestion();
                                    break;

                  case 'waitTime': $('#question-winner').html('Nobody answered correctly');
                                    self.resolveQuestion();
                                    break;

                  case 'nextQuestion': self.loadQuestion();
                                        break;

                  case 'winner': self.winner();
                                  break;
              }
        },

        loadQuestion: function() {

              $('#question').html('<strong>Question: </strong>' + self.jsonData.questions[self.questions[self.current]].question);
              $('#questions tr').remove();

              $.each(self.jsonData.questions[self.questions[self.current]].answers, function (key, value) {
                  $('#questions').append('<tr><td class="button"><input type="radio" name="answer" value="' + key + '"></td><td>' + value + '</td></tr>');
              });

              // Update status and countdown
              $('#quiz-message').html('Seconds remaining to answer: ');
              $('#question-winner').html('');
              self.countDown($('#countdown'), self.secondsToAnswer, 'waitTime');
        },

        checkAnswer: function() {

              //This user cannot answer this question anymore
              $('#questions .button input').attr('disabled', 'disabled');

              var radioButtons = $("#questions input:radio[name='answer']");
              var selectedAnswer = radioButtons.index(radioButtons.filter(':checked'));

              var correctAnswer = self.jsonData.questions[self.questions[self.current]].correct_answer;

              if (selectedAnswer >= 0 &amp;&amp; selectedAnswer === parseInt(correctAnswer)) {
                  //We've got a winner. Broadcast it!
                  io.socket.post('/user/score', {id: me.id});
              }
        },

        resolveQuestion: function() {

              $('#quiz-message').html('Next question in... ');
              $('#questions .button input').attr('disabled', 'disabled');

              var radioButtons = $("#questions input:radio[name='answer']");
              var selectedAnswer = radioButtons.index(radioButtons.filter(':checked'));

              var correctAnswer = self.jsonData.questions[self.questions[self.current]].correct_answer;
              $('#questions tr').eq(correctAnswer).addClass('success');

              if (selectedAnswer >= 0 &amp;&amp; selectedAnswer !== parseInt(correctAnswer)) {
                  $('#questions tr').eq(selectedAnswer).addClass('danger');
              }

              // Update questions index and gameplay
              var quizQuestions = parseInt($('#amount').val());

              if (self.current < quizQuestions) {                   self.current++;                   $('#progress').val(self.current);                   if (self.current === quizQuestions) { //We reached the end of the quiz                         self.countDown($('#countdown'), self.secondsToWait, 'winner');                   }                   else {                         self.countDown($('#countdown'), self.secondsToWait, 'nextQuestion');                   }               }         },         winner: function() {               $('#quiz').hide();               $('#winner').show();               var scores = [];               var players = [];               $('#status-table tbody tr').each(function() {                   scores.push(parseInt($(this).find('.score').html()));                   players.push($(this).find('.name').html());               });               var highScore = Math.max.apply(Math, scores);               var scoreIndex = scores.indexOf(highScore);               var isDraw = false;               $('#status-table tbody tr').each(function(index) {                   if (parseInt($(this).find('.score').html()) === highScore &amp;&amp; scoreIndex !== index) isDraw = true;               });               $('#winner-image').removeClass('no-one-wins');               $('#winner-image').css('background-image', '');               if (highScore > 0) {
                  if (isDraw) {
                        $('#winner-message').html('We have a draw. Well done!');
                        $('#winner-image').addClass('no-one-wins');
                  }
                  else {
                        $('#winner-message').html('And the winner is... <strong>' + players[scoreIndex] + '</strong>!');
                        $('#winner-image').css('background-image', 'url("' + $('#status-table tbody tr').eq(scoreIndex).find('.name').attr('data-avatar') + '")');
                  }
              }
              else {
                  $('#winner-message').html('And the winner is... <strong>no one</strong> :-(');
                  $('#winner-image').addClass('no-one-wins');
              }
        },

        shuffle: function(o) {
              //+ Jonas Raoni Soares Silva
              //@ http://jsfromhell.com/array/shuffle [v1.0]
              for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
              return o;
        }
    };

    // return as QuizWars Module
    modules.quiz = quiz;
    return  modules;

})(QW_MODULES || {}, jQuery);
```

### 15. Conclusiones

Mi experiencia con Sails.js ha sido muy positiva y recomiendo a todos los interesados en aplicaciones multiusuario en tiempo real que empiecen un proyecto y descubran todas sus virtudes. La curva de aprendizaje es muy suave y todo el código base está muy bien comentado, con referencias a otros archivos cuando es necesario. Todo en el framework es claro, sin archivos redundantes que de otro modo acabarían hinchándolo y dificultando su comprensión. El único aspecto que no es tan bueno como uno quisiera es la documentación y la comunidad. Hay una sección [stack overflow para Sails.js](http://stackoverflow.com/tags/sails.js/hot) con algunos temas interesantes. Es un framework muy nuevo y esperamos que en un futuro próximo haya más recursos disponibles. No obstante, es una consideración menor, al menos para proyectos pequeños.

Estaré encantado de responder a cualquier pregunta o tratar de ayudar a resolver cualquier problema que pueda surgir durante el proceso de instalación, así que no dude en hacérmelo saber. Al mismo tiempo, estoy muy abierto a escuchar mejoras o errores en el código, pero por favor, ten en cuenta que este ejemplo no pretende ser un producto completo/final. Todavía hay muchas características que necesitan ser refinadas o incluidas.

¡Muchas gracias por tu tiempo y espero que te diviertas en el apasionante mundo de Node.js! ^_^

### 16. Créditos

Mi investigación se ha basado en los ejemplos oficiales de Sails.js, que pueden encontrarse en [Sails 101](https://github.com/sails101) y en estos dos proyectos de Github: [node-sails-chat](https://github.com/Ajeey/node-sails-chat/), [sailsChat](https://github.com/sgress454/sailsChat).

### 17. Actualizaciones y errores

He intentado ejecutar Sails.js en un servidor con Node.js y Apache, pero mi experiencia no ha sido muy buena. El proxy en el vhost de apache añadía un gran retraso en la conexión del socket. Así que no recomiendo ejecutar una aplicación Node en un servidor que ya está ejecutando Apache. [Más información aquí](http://https//www.digitalocean.com/community/tutorials/how-to-create-an-node-js-app-using-sails-js-on-an-ubuntu-vps).

Hay un error cuando se selecciona un cuestionario diferente al primero y se inicia. El cuestionario seleccionado y la cantidad de preguntas no se transmiten a los usuarios conectados.
