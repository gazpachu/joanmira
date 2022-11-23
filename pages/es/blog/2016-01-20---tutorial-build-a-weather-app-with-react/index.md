---
title: "Tutorial: construir app del tiempo con react"
description: Este es un ejercicio o prueba clásica cuando se solicita un empleo
cover: images/react-clouds.jpg
category: work
template: post
---

<a class="btn github" role="button" href="https://github.com/gazpachu/react-weather" target="_blank">Código fuente</a>

En este tutorial de [React](https://facebook.github.io/react/) para principiantes, vamos a aprender a construir una pequeña y sencilla aplicación de [React](https://facebook.github.io/react/) para mostrar el tiempo de las ciudades del mundo. Si estás interesado en aprender React, este tutorial es un buen punto de partida, ya que no cubre temas muy complejos. Al mismo tiempo, una vez que aprendas a conectarte a una API externa y a mostrar los resultados, puede ser bastante útil para construir otro tipo de apps de una sola página cuyo único requisito sea obtener datos de una fuente externa y mostrar los resultados de cualquier manera.

Es una aplicación muy sencilla que se puede programar en unas pocas horas, así que deberías intentar hacerlo por ti mismo. ¡Así aprenderás más! Para los impacientes... [aquí está el código fuente](https://github.com/gazpachu/react-weather).

### Requisitos funcionales

* Mostrar el nombre de la ciudad, el icono del tiempo actual, la temperatura, la humedad y la velocidad del viento
* El color de fondo cambia en función de la temperatura
* Carga un nombre de ciudad usando la cadena de consulta '?city=Madrid'
* Carga ciudades separadas por comas y las rota después de 5s
* Almacena los datos de la API y los actualiza después de 5 m.
* Diseño responsivo. Debería funcionar bien en todos los dispositivos

### Tech stack

* Compatible con todos los navegadores hasta Internet Explorer 9
* No usar jQuery
* Usar la fuente [League Gothic](https://fonts.adobe.com/fonts/league-gothic)
* Utiliza los iconos del tiempo de [Erik Flowers](erikflowers.github.io/weather-icons/)
* Utiliza los datos de [Open Weather Map](http://openweathermap.org/apihttp://openweathermap.org/api)
* Utiliza [Node.js](https://nodejs.org/en/) y [Bower](http://bower.io/)
* Utilizar el [Gulp Task Runner](http://gulpjs.com/) y el [SASS CSS pre-processor](http://sass-lang.com/)
* Usar [Browserify](http://browserify.org/) para requerir módulos

Nota: debido a la simplicidad y al pequeño tamaño de la arquitectura, omitiremos el uso de [BEM](http://getbem.com/introduction/) y [ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss).

Este es el aspecto que debería tener la aplicación al final del tutorial:

![](/blog/tutorial-build-a-weather-app-with-react/images/react-weather.png)

Puede haber algunas diferencias en los iconos o la fuente (dependencias de terceros), pero el aspecto general será muy similar a cualquiera de estas dos capturas de pantalla.

### Paso 1. Configurar el entorno de desarrollo

Lo primero que vamos a hacer es **instalar** [Node.js](https://nodejs.org/en/). Yo voy a utilizar el terminal de Mac Os, [Brackets](http://brackets.io/) y Chrome. Puedes utilizar cualquier herramienta o sistema operativo que prefieras, lo único que necesitas es una consola, un editor de texto y un navegador.

Si decides usar [Brackets](http://brackets.io/), te recomiendo instalar también estas extensiones:

* [Brackets icons](https://github.com/ivogabe) (para mostrar bonitos iconos junto a los archivos)
* [HTMLHint](https://github.com/cfjedimaster/brackets-htmlhint) (añade sugerencias a las etiquetas HTML)
* [Monokai theme](https://github.com/Brackets-Themes/Monokai) (basado en el esquema de colores monokai de Sublime Text)
* [React JSX language mode](https://github.com/apla/brackets-jsx) (añade el modo de lenguaje JSX)
* [Tabs custom](https://github.com/DH3ALEJANDRO/custom-work-for-brackets) (añade pestañas a Brackets)

Así es como se ve mi Brackets con todas estas extensiones instaladas:

![](/blog/tutorial-build-a-weather-app-with-react/images/brackets-extensions.png)

### Paso 2. Apartado conceptual: sobre los módulos de Node.js

Como probablemente ya sepas, el bloque de construcción fundamental de Node se llama módulo, que mapea directamente a un archivo y todo lo que hay dentro de ese módulo es privado (las vars sólo funcionan en ese archivo).

Ahora, antes de ver cómo exponer cosas fuera de un módulo, veamos cómo cargar un módulo. Aquí es donde entra '**require**'. 'require' se utiliza para cargar un módulo, por lo que su valor devuelto se asigna típicamente a una variable:

`var móduloA = require('./nombredelmóduloA');`

Mientras nuestro módulo no exponga nada, lo anterior no es muy útil. Para exponer cosas usamos '**module.exports**' y exportamos todo lo que queramos. Podemos exportar objetos o primitivas de diferentes maneras:

```javascript
var User = function(name, email) { ... }
module.exports = User;
```

```javascript
module.exports = function(name, email) { ... }
```

```javascript
var x = 5;
module.exports.x = x;
```

En esta aplicación, sólo vamos a crear un módulo, el módulo **API** (api.jsx), que se encargará de obtener los datos de la [API meteorológica](http://openweathermap.org/apihttp://openweathermap.org/api). Hablaremos de ello con más detalle más adelante.

### Paso 3. Instalación de los módulos NPM y Bower

NPM es un gestor de paquetes que viene con Node.js. Es muy útil para instalar módulos de Node.js de terceros que podemos utilizar para acelerar nuestro desarrollo.

NPM utiliza un archivo llamado package.json como referencia de todas las dependencias que va a tener el proyecto. Podemos crear este archivo manualmente o escribiendo '**npm init**'.

Empecemos creando una carpeta llamada '**react-weather**' como prefieras en tu ordenador.

Luego abre la consola/terminal, cd a esa carpeta y escribe `npm init`. Te aparecerán unas cuantas preguntas que no es necesario responder. Simplemente mantén presionado enter hasta que salgas del proceso.

Ahora deberías tener un archivo package.json en tu carpeta.

A continuación, vamos a descargar algunos paquetes (que se guardarán automáticamente en la carpeta '**node_modules**') y guardar la referencia en el archivo package.json:

Usa `npm install <pkg> --save` después para instalar un paquete y guardarlo como dependencia en el archivo package.json.

También podemos descargar varios paquetes al mismo tiempo. Así que escribe lo siguiente:

`npm install --save browserify classnames gulp gulp-concat gulp-react gulp-sass gulp-server-livereload gulp-util gulp-watch node-notifier react-dom reactify vinyl-source-stream watchify whatwg-fetch`.

También vamos a instalar el cliente gulp de forma global (no sólo para este proyecto). Usamos la opción '-g'. Es posible que tengamos que dar derechos de administrador usando 'sudo':

`sudo npm install -g gulp-cli`

Puede llevar un rato..., pero deberías terminar con un package.json que se parezca a esto:

```javascript
{
  "name": "react-weather",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "browserify": "^9.0.3",
    "classnames": "^2.2.3",
    "gulp": "^3.8.11",
    "gulp-concat": "^2.5.2",
    "gulp-react": "^3.0.1",
    "gulp-sass": "^2.0.1",
    "gulp-server-livereload": "1.3.0",
    "gulp-util": "^3.0.4",
    "gulp-watch": "^4.2.4",
    "node-notifier": "^4.2.1",
    "react": "^0.14.3",
    "react-dom": "^0.14.3",
    "reactify": "^1.1.0",
    "vinyl-source-stream": "^1.1.0",
    "watchify": "^2.4.0",
    "whatwg-fetch": "^0.11.0"
  },
  "devDependencies": {}
}
```

A continuación, vamos a instalar Bower (otro gestor de paquetes para la web) y descargar los iconos del tiempo. Creará una carpeta llamada '**bower_components**' y un archivo de registro llamado '**bower.json**':

`npm install -g bower`

`bower install weather-icons`

Si tuviéramos que subir este proyecto a un repositorio de código Git, tendríamos que crear un archivo '**.gitignore**' y añadirle 'node_modules/' y 'bower_components/', ya que no queremos subir todas estas dependencias al repositorio. Los nuevos usuarios pueden escribir '**npm install**' y 'bower install' para descargar todas las dependencias.

### Paso 4. Estructura de carpetas y marcadores de posición

Vamos a crear unas cuantas carpetas y archivos. Deberíamos terminar con la siguiente estructura de carpetas:

```javascript
/react-weather
    bower.json
    package.json
    gulpfile.js
    index.html
    /bower_components
    /node_modules
    /sass
        main.scss
        /partials
            base.scss
            reset.scss
    /src
        app.jsx
        /utils
            api.jsx
```

Los nuevos archivos son:

* **gulpfile.js**: aquí es donde definiremos las tareas a ejecutar, como compilar SASS y JSX, empaquetar el código, vigilar los cambios, recargar el navegador, etc.
* **index.html**: un marcado muy mínimo para nuestra aplicación
* **main.scss**: lo usaremos para establecer el orden en el que queremos cargar los archivos SASS
* **base.scss**: todos nuestros estilos CSS
* **reset.scss**: reglas CSS de restablecimiento básico
* **app.jsx**: el núcleo de nuestra aplicación
* **api.jsx**: el módulo para contactar con la API meteorológica

### Paso 5. Configurar las tareas Gulp

Al hablar de React, no sólo estamos viendo el framework en sí. También estamos conociendo las herramientas que nos ayudarán a tener una experiencia de desarrollo ágil y sin problemas. Es entonces cuando un ejecutor de tareas se convierte en tu mejor amigo :-)
[Gulp](http://gulpjs.com/) es un ejecutor de tareas, al igual que [Grunt](http://gruntjs.com/). No tengo ninguna preferencia particular por Gulp, de hecho, estoy más acostumbrado a trabajar con Grunt, pero por el bien de aprender y probar cosas nuevas, vamos a utilizar Gulp en este tutorial.

Primero, vamos a empezar abriendo el **gulpfile.js** en el editor y requiriendo las dependencias:

```javascript
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
```

Como hemos mencionado antes, necesitamos compilar los archivos SASS y JSX, agrupar el código y vigilar los cambios. También queremos mostrar errores con formato y recargar el navegador automáticamente cuando haya un cambio en los archivos JS o SASS.

Empecemos con los mensajes de error:

```javascript
// Format error messages
var notify = function (error) {
    var message = 'In: ';
    var title = 'Error: ';

    if (error.description) {
        title += error.description;
    }
    else if (error.message) {
        title += error.message;
    }

    if (error.filename) {
        var file = error.filename.split('/');
        message += file[file.length-1];
    }

    if (error.lineNumber) {
        message += '\nOn Line: ' + error.lineNumber;
    }

    notifier.notify({title: title, message: message});
};
```

El módulo 'node-notifier' crea bonitas alertas (al menos en Mac Os) con los mensajes de error que se producen durante el proceso de construcción. Con el fragmento de arriba, sólo estamos formateando el mensaje de error de una manera que podría ser más legible.

El siguiente paso es **crear el bundle**. Para esta parte, vamos a necesitar tres módulos: watchify, browserify y reactify. El primero es un módulo para hacer el bundle automático de los scripts basados en browserify.

Browserify nos permite hacer require('modules') en el navegador agrupando todas nuestras dependencias. Mira un único archivo JavaScript (en este caso app.jsx), y sigue el árbol de dependencias de require, y las agrupa en un nuevo archivo.

ReactJS utiliza una sintaxis especial llamada JSX, no la normal de JS. Normalmente, cuando quieres trabajar con archivos JSX de ReactJS, necesitas transformarlos en archivos JS normales. Así que vamos a utilizar 'reactify' para transformar esos JSX en archivos JS.

En conclusión, crearemos un bundler de Browserify y añadiremos un transformador para transformar los JSX en Javascript y luego lo agruparemos todo en un archivo llamado **main.js** que estará en la raíz.

```javascript
// Bundle settings
var bundler = watchify(browserify({
    entries: ['./src/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}));

// Bundle tasks
function bundle() {
    return bundler
        .bundle()
        .on('error', notify)
        .pipe(source('main.js'))
        .pipe(gulp.dest('./'))
}
bundler.on('update', bundle);

// Create bundle
gulp.task('build', function() {
    bundle()
});
```

Ahora vamos a procesar los archivos SASS y ponerlos todos juntos (en el orden especificado en main.scss) en un único archivo CSS (style.css) que se ubicará en la carpeta raíz:

```javascript
// Compile the SASS files from main.scss
gulp.task('sass', function () {
    gulp.src('./sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./'));
});
```

La siguiente etapa es configurar el servidor de recarga en vivo. Este módulo recargará el navegador automáticamente cada vez que haya un cambio en nuestro código. ¡Esta es una característica muy buena! En este caso, vamos a pasar un filtro de prueba al módulo livereload, para que compruebe nuestros archivos CSS y JS compilados antes de recargar el navegador. Puedes leer más sobre la documentación del módulo [aquí](https://github.com/hiddentao/gulp-server-livereload).

```javascript
// Live reload server settings
gulp.task('serve', function(done) {
    gulp.src('')
        .pipe(server({
            livereload: {
                enable: true,
                filter: function(filePath, cb) {
                if (/main.js/.test(filePath)) {
                    cb(true)
                }
                else if (/style.css/.test(filePath)) {
                    cb(true)
                }
            }
        },
        open: true
    }));
});
```

Por último, vamos a crear la tarea de vigilancia para nuestros archivos SASS y establecer el orden en que todas las tareas creadas deben ser ejecutadas:

```javascript
// Watch for changes in the SASS files
gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// Run tasks in a specific order
gulp.task('default', ['build', 'serve', 'sass', 'watch']);
```

En este punto, si estás usando Git, deberías añadir **main.js** y **style.css** a tu archivo .gitignore, ya que estos archivos serán generados por Gulp y no los necesitamos en el repositorio.

### Paso 6. Crear un marcado básico

Vamos a crear un archivo HTML básico con:

* Un DIV contenedor donde adjuntaremos el componente React.
* La fuente cargada desde Adobe Edge Fonts
* El archivo CSS compilado
* El archivo CSS de los iconos del tiempo
* El archivo JS compilado

Yo prefiero cargar las fuentes usando `<link>` en lugar de una etiqueta `<script>`, pero en aras de la simplicidad, vamos a ir con este método esta vez.

```html
<html>
    <head>
        <script src="//use.edgefonts.net/league-gothic:n4:all.js"></script>
        <link rel="stylesheet" href="/style.css">
        <link rel="stylesheet" href="/bower_components/weather-icons/css/weather-icons.min.css">
    </head>
    <body>
        <div class="container"></div>
    </body>
    <script src="main.js"></script>
</html>
```

### Paso 7. Añadir el CSS de reinicio

Sólo tienes que copiar/pegar el siguiente código en /sass/partials/reset.scss

```css
html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline; }

/* HTML5 display-role reset for older browsers */

article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display: block; }

body {
  line-height: 1; }

ol, ul {
  list-style: none; }

blockquote, q {
  quotes: none; }

blockquote {
  &:before, &:after {
    content: '';
    content: none; } }

q {
  &:before, &:after {
    content: '';
    content: none; } }

table {
  border-collapse: collapse;
  border-spacing: 0; }
```

### Paso 8. Empezar a construir el componente React

¡Por fin llegamos al momento en el que realmente puedes empezar a aprender React! Siento haber tardado tanto, pero ya tenemos todo listo y a partir de ahora será pura programación con react :P

Primero vamos a abrir `/src/app.jsx`. Aquí es donde crearemos nuestro componente React. Necesitamos requerir algunos módulos:

```javascript
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Api = require('./utils/api');
```

Los dos primeros módulos corresponden al framework React. Classname es un módulo de terceros (recomendado por React) para construir nombres de clases que contengan datos dinámicos. En JSX no podemos usar '+' como en JS para concatenar cadenas en el atributo class. El objeto API está requiriendo el módulo que utilizaremos para obtener los datos de la API meteorológica. Fíjate que para cargar este módulo, tenemos que construir la ruta relativa, ya que no es un módulo que tengamos instalado con NPM.

Ahora vamos a definir unas cuantas variables para manejar las ciudades de la cadena de consulta:

```javascript
var query = ''; // Espera algo así: ?city=London,Paris,Berlin,Madrid
var cities = []; // Transforma el query string cities en un array
var citiesWeather = []; // API cache
var currentCity = 0; // Index de la ciudad actual mostrada
```

No vamos a profundizar demasiado en tratar de explicar lo que vamos a hacer con estas variables. Su propósito se revelará a medida que vayamos construyendo el componente.

Ahora podemos definir el nuevo componente React así:

```javascript
var Weather = React.createClass({
    render: function() {

    }
});

// Asignar el componente React a un elemento DOM
var element = React.createElement(Weather, {});
ReactDOM.render(element, document.querySelector('.container'));
```

Básicamente creamos un componente React llamado 'Weather' y lo renderizamos dentro del DIV 'container'.

A partir de ahora, vamos a trabajar en los métodos del objeto definido dentro de React.createClass().

El primer método es getInitialState():

```javascript
// Init data for UI
getInitialState: function() {
    return {
        weather: '',
        temp: 0,
        humidity: 0,
        wind: 0
    }
},
```

Aquí, sólo estamos inicializando los props que vamos a utilizar más tarde para mantener los valores de nuestros indicadores meteorológicos en la UI.

Ahora tenemos que crear la estructura HTML para nuestro componente meteorológico Usemos este sencillo wireframe para asignar cada caja a un elemento HTML:

![](/blog/tutorial-build-a-weather-app-with-react/images/react-weather-wire.jpg)

Dentro del método render(), añade lo siguiente:

```javascript
// Build class names with dynamic data
var weatherClass = classNames('wi wi-owm-' + this.state.weather);
var bgColorClass = 'weather-widget '; // very-warm, warm, normal, cold, very-cold

// Set the background colour based on the temperature
if (this.state.temp >= 30) {
    bgColorClass += 'very-warm';
}
else if (this.state.temp > 20 && this.state.temp < 30) {
    bgColorClass += 'warm';
}
else if (this.state.temp > 10 && this.state.temp < 20) {
    bgColorClass += 'normal';
}
else if (this.state.temp > 0 && this.state.temp < 10) {
    bgColorClass += 'cold';
}
else if (this.state.temp <= 0) {
    bgColorClass += 'very-cold';
}

// Render the DOM elements
return &lt;div className={bgColorClass}>
    &lt;h1 className="city">{cities[currentCity]}&lt;/h1>
    &lt;div className="weather">
        &lt;i className={weatherClass}>&lt;/i>
    &lt;/div>
    &lt;section className="weather-details">
        &lt;div className="temp">&lt;span className="temp-number">{this.state.temp}&lt;/span>&lt;span className="wi wi-degrees">&lt;/span>&lt;/div>
        &lt;div className="humidity">&lt;i className="wi wi-raindrop">&lt;/i>{this.state.humidity} %&lt;/div>
        &lt;div className="wind">&lt;i className="wi wi-small-craft-advisory"></i>{this.state.wind} &lt;span className="vel">Km/h&lt;/span>&lt;/div>
    &lt;/section>
&lt;/div>
```

Analicemos el código paso a paso.

Para representar el icono meteorológico grande (el sol, las nubes, etc.), necesitamos obtener el [ID del icono de la API meteorológica](http://api.openweathermap.org/data/2.5/weather?q=London&appid=2de143494c0b295cca9337e1e96b00e0). Una vez que lo tengamos, podemos utilizar el prefijo '**wi wi-owm-**' (lo hemos obtenido de la [lista de compatibilidad de la API de iconos meteorológicos](https://erikflowers.github.io/weather-icons/api-list.html)) para componer el nombre de la clase que necesitamos. Eso es lo que estamos haciendo con la variable weatherClass.

La siguiente variable, 'bgColorClass', compone el nombre de la clase que utilizaremos para el color de fondo de la aplicación. El objetivo es tener la clase 'warm' para las temperaturas entre 20 y 30 grados y así sucesivamente. Luego asignaremos un color a cada clase más adelante en el archivo SASS.

En la declaración de retorno, lo primero que destaca es el uso de 'className' en lugar de 'class'. Así es como se añaden las clases CSS en las plantillas JSX. Los nombres de las clases también necesitan ser compuestos usando el módulo classNames que requerimos al principio del archivo.

Luego tenemos variables envueltas en {}, como en Handlebars. Así es como renderizamos el contenido de las variables, estados o propiedades de React (llamadas *props*). En esta aplicación, vamos a utilizar estados. Si quieres saber más sobre la diferencia entre props y states, dirígete a [este artículo](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md).

### Paso 9. Obtener los datos de la API

Resumamos. Hasta ahora, tenemos un componente React que inicializa y renderiza sus datos vacíos. Eso es todo. Así que el siguiente paso es obtener los datos de la API y pasárselos al componente React.

Abramos el archivo `/src/utils/api.jsx` y escribamos el siguiente código:

```javascript
var Fetch = require('whatwg-fetch');
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
var apiUrl = '&appid=2de143494c0b295cca9337e1e96b00e0';

module.exports = {
    get: function(place) {
        return fetch(rootUrl + place + apiUrl, {
            headers: {
                // No need for special headers
            }
        })
        .then(function(response) {
            return response.json();
        });
    }
};
```

En este módulo, vamos a requerir 'whatwg-fetch', que es un [polyfill para window.fetch ](https://github.com/github/fetch). También vamos a utilizar una clave de API y la URL de la API. Creo que no es necesario registrarse para generar una nueva clave, ya que esta la obtuve de los documentos de la API y parece funcionar bien.

El código de obtención es súper sencillo. Componemos la URL final concatenando las variables más el nombre de la ciudad que recibimos como parámetro y lo pasamos al método fetch. Luego tenemos una 'promesa' que recibirá la respuesta de la API y simplemente la devolvemos en formato JSON.

### Paso 10. Conectar el módulo de la API con el componente React

De vuelta en `/src/app.jsx`, vamos a crear un nuevo método llamado 'fetchData' que intentará cargar los datos de nuestra caché y si no los encuentra, entonces llamará al módulo que hemos creado en el paso anterior para obtener nuevos datos:

```javascript
fetchData: function() {

    // Get the data from the cache if possible
    if (citiesWeather[currentCity]) {
        this.updateData();
    }
    else {
        // Request new data to the API
        Api.get(cities[currentCity])
            .then(function(data) {
                citiesWeather[currentCity] = data;
                this.updateData();
        }.bind(this));
    }
},
```

El array **citiesWeather** es nuestro objeto caché. Aquí vamos a almacenar las respuestas JSON que obtenemos de la API. ¿Por qué hacemos esto? Porque cuando tenemos una lista de ciudades rotando, no queremos seguir contactando con la API cada vez que cambiamos de ciudad.

Cuando queremos solicitar nuevos datos, simplemente llamamos al método get del módulo de la API y le pasamos el nombre de la ciudad actual. En la 'promesa', nos aseguramos de actualizar el objeto caché con los datos recibidos y llamamos al método updateData para establecer el nuevo valor en los estados.

### Paso 11. Actualizar los estados

En este punto, el componente React acaba de recibir [nuevos datos de la API](http://api.openweathermap.org/data/2.5/weather?q=London&appid=2de143494c0b295cca9337e1e96b00e0) y está listo para actualizar la UI con estos nuevos datos. Vamos a crear un nuevo método llamado updateData:

```javascript
updateData: function() {
    // Update the data for the UI
    this.setState({
        weather: citiesWeather[currentCity].weather[0].id,
        temp: Math.round(citiesWeather[currentCity].main.temp - 273.15), // Kelvin to Celcius
        humidity: Math.round(citiesWeather[currentCity].main.humidity),
        wind: Math.round(citiesWeather[currentCity].wind.speed)
    });
}
```

Modificar this.props o this.state directamente no es una buena idea, porque React no podrá captar los cambios. Eso es porque React hace una comparación superficial de tu post prop para determinar si ha cambiado. Así que usa siempre 'setState'.

### Paso 12. Leer la cadena de consulta y crear los temporizadores

Antes de empezar con el estilo de la aplicación, hay un paso más que tenemos que abordar. Vamos a crear un nuevo método llamado `componentWillMount()`, que se llama antes de que se ejecute el método render:

```javascript
// Called before the render method is executed
componentWillMount: function() {

    // Get the query string data
    query = location.search.split('=')[1];

    // Figure out if we need to display more than one city's weather
    if (query !== undefined) {
        cities = query.split(','); // Get an array of city names

        // Set the interval to load new cities
        if (cities.length > 1) {
            setInterval((function() {
                currentCity++;
                if (currentCity === cities.length) {
                    currentCity = 0;
                }
                this.fetchData(); // Reload the city every 5 seconds
            }).bind(this), 5000);
        }
    }
    else {
        cities[0] = 'London'; // Set London as the default city
    }

    // Create a timer to clear the cache after 5 minutes, so we can get updated data from the API
    setInterval(function() {
        citiesWeather = []; // Empty the cache
    }, (1000*60*5));

    this.fetchData();
},
```

Hay un módulo llamado React Router que puede ser muy útil para construir aplicaciones de una sola página, pero en aras de la simplicidad, he decidido no incluirlo. Así que vamos a utilizar un enfoque muy simple para leer la lista de ciudades: una cadena de consulta.

En las primeras líneas del fragmento de arriba, sólo estamos dividiendo la cadena en un array y comprobando si el usuario introdujo una sola ciudad o varias separadas por comas. Si tenemos varias, entonces creamos un temporizador que llamará al método `fetchData()` cada 5 segundos, que actualizará los datos de la ciudad actual. Fíjate que también estamos pasando el contexto de ejecución del componente React al temporizador, de lo contrario `this` no encontraría el método `fetchData`.

En la segunda parte del snippet, estamos creando otro timer que se encargará de limpiar la caché cada 5 minutos, de lo contrario, sólo obtendríamos los datos de LIVE una vez (al lanzar la app).

¡Enhorabuena, has llegado al final de la parte de Javascript! Ahora vamos a añadir rápidamente el CSS y a intentar ejecutar la app.

### Paso 13. Añadir los estilos SASS

Copia/pega el siguiente código en `/sass/partials/base.scss`:

```scss
// Colours
$very-warm: #FF8500;
$warm: #ffc600;
$normal: #94AF10;
$cold: #06799F;
$very-cold: #233884;

// Breakpoints
$mobile-width: 500px;
@mixin mobile {
    @media (max-width: $mobile-width) {
        @content;
    }
}

// DOM Elements
.weather-widget {
    width: 100%;
    color: white;
    font-family: league-gothic, sans-serif;
    font-weight: 100;
    font-style: normal;
    padding: 5% 10%;

    @include mobile {
        padding: 2%;
    }

    &.very-warm { background-color: $very-warm; }
    &.warm { background-color: $warm; }
    &.normal { background-color: $normal; }
    &.cold { background-color: $cold; }
    &.very-cold { background-color: $very-cold; }
}

.city {
    font-size: 4em;
    text-transform: uppercase;
    letter-spacing: 2px;
    width: 100%;
    text-align: center;
}

.weather{
    display: table;
    height: 415px;
    width: 100%;
    text-align: center;
    border-bottom: 2px solid white;

    @include mobile {
        height: 350px;
    }

     .wi {
        display: table-cell;
        vertical-align: middle;
        font-size: 20em;

         @include mobile {
            font-size: 15em;
         }
    }
}

.weather-details {
    overflow: hidden;
    margin-top: 35px;
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;

    .temp {
        font-size: 13.5em;
        float: left;
        width: 55%;
        max-height: 200px;

        @include mobile {
            font-size: 9em;
        }

        .temp-number, .wi {
            vertical-align: top;
            line-height: 0.85em;
        }

        .wi {
            font-size: 1.5em;
            line-height: 0.8em;
        }
    }

    .humidity, .wind {
        font-size: 5em;

        @include mobile {
            font-size: 3em;
        }

        .wi {
            vertical-align: top;
            width: 70px;

            @include mobile {
                width: 40px;
            }
        }
    }

    .humidity {
        margin-bottom: 20px;
    }

    .wind {
        .wi {
            font-size: 0.82em;
        }
        .vel {
            font-size: 0.6em;
        }
    }
}
```

El código SASS es bastante autoexplicativo. Se puede mejorar, pero para este tutorial, que es para aprender React, creo que cumple su cometido.

### Paso 14. El momento de la verdad

Escribe 'gulp' en la consola/terminal y cruza los dedos.

Si funciona, ¡felicidades! si no lo hace, intenta depurar los mensajes de error y encontrar una solución. Si te quedas atascado, entonces publica un comentario aquí y trataré de ayudarte.

Esta fue mi primera aplicación de React y estoy emocionado de seguir aprendiendo sobre Flux, Reflux, el router, etc. Así que, por favor, enviadme vuestras sugerencias o hacedme saber si la aplicación puede ser mejorada de alguna manera. ¡Gracias y espero que os haya gustado!

**ACTUALIZACIÓN**: Tienes que crear tu propia clave de API y establecerla en la variable apiUrl en `/src/utils/api.jsx`, de lo contrario tus peticiones serán bloqueadas en algún momento.
