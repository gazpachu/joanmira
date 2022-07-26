---
title: "Javascript: entendiendo las partes raras [Parte 2]"
description: Mis aprendizajes repasando conceptos de JavaScript en el sitio educativo Udemy
cover: images/coding.jpg
template: post
category: work
---

En la [parte anterior de este artículo](/blog/javascript-understanding-the-weird-parts/), aprendimos sobre contextos de ejecución, tipos y operadores, funciones, etc. En esta parte, vamos a aprender más sobre la programación orientada a objetos con Javascript.

### Lectura 53: Herencia clásica vs prototípica

**Herencia**: un objeto tiene acceso a las propiedades y métodos de otro objeto.

Herencia clásica: (la más popular) está en C++, Java, etc. Es muy verbosa. Podemos acabar con un enorme árbol de objetos y relaciones. Muchas palabras clave: friend, protected, private, interface,...

Herencia prototípica: simple. Extensible. Fácil de entender.

### Lectura 54: Entendiendo el prototipo

Todos los objetos tienen una "propiedad especial" llamada propiedad proto {}. Es el prototipo del objeto. También puede tener sus propiedades. Cuando solicitamos la propiedad de un objeto, JS primero busca en el propio objeto para encontrar esa propiedad, si no la encuentra, entonces busca la propiedad dentro del prototipo.

Ese prototipo también puede contener otro objeto prototipo y JS siempre irá hacia abajo en la cadena. Eso se llama la **cadena de prototipos**.

Si tenemos el objeto2, también puede apuntar al mismo prototipo del objeto1. Los objetos pueden compartir el mismo prototipo.

![](/blog/javascript-understanding-the-weird-parts-part-2/images/JS-prototype-chain.jpg)

Ejemplo:

```javascript
var person = {
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function() {
        return this.firstname + ' ' + this.lastname;
    }
}

var john = {
    firstname = 'John'.
    lastname: 'Doe'
}

// ¡¡¡No hagas esto NUNCA!!! ¡¡¡Sólo para fines de demostración!!!
// Esta es una forma del navegador de acceder al prototipo pero con muy mal rendimiento
john.__proto__ = person;
console.log(john.getFullName());
console.log(john.firstname); // Devuelve el nombre de John, no el de person debido a la prioridad de la cadena de prototipos.
```

### Lectura 55: Todo es un objeto (o una primitiva)

```javascript
var a = {};
var b = function() {};
c = [];

console.log(a.__proto__); // devuelve el objeto base y podemos acceder toString, etc

console.log(b.__proto__); // devuelve la función Empty() {} y podemos acceder a apply, call, bind,...

console.log(c.__proto__); // devuelve push, pop, indexOf, length, etc

console.log(c.__proto__.__proto__); // devuelve el objeto base
```

Todo conduce al objeto base. Es la parte inferior de la cadena de prototipos.

### Lectura 56: Reflexión y extensión

Reflexión: un objeto puede mirarse a sí mismo, listando y cambiando sus propiedades y métodos. Podemos usar eso para implementar el patrón extendido. Veamos cómo funciona la reflexión:

```javascript
var person = {
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function() {
        return this.firstname + ' ' + this.lastname;
    }
}

var john = {
    firstname = 'John'.
    lastname: 'Doe'
}

// bucle a través de cada miembro en el objeto john
for (var prop in john) {
    console.log(prop + ': ' + john[prop]);
}

// El código anterior también mostrará getFullName y la función. Para evitarlo hacemos:

for (var prop in john) {
    // it will only list it if it's on john's object
    if (john.hasOwnProperty(prop)) {
        console.log(prop + ': ' + john[prop]);
    }
}
```

Apartado conceptual: mira el método "_extend" de la biblioteca Underscore. Analiza el método "createAssigner" para entender cómo se utiliza la reflexión. Utiliza dos bucles para asignar las propiedades y métodos de los objetos pasados como parámetros al primer objeto pasado como parámetro.

Extend se utiliza en muchas bibliotecas y frameworks. Podríamos sacar ese método de Underscore y utilizarlo en nuestra propia biblioteca/proyecto.

En ES6, también tenemos 'extends', pero eso se usa para una funcionalidad diferente.

### Lectura 57: Construyendo objetos

Constructores de funciones, 'new' y la historia de Javascript.

Se llamó Javascript para atraer a los desarrolladores de Java. De la misma manera, Microsoft creó VBScript para atraer a sus desarrolladores.

Así, los desarrolladores de Java estaban acostumbrados a crear objetos como este

`var john = new Person();`

Aunque ES6 introducirá la palabra clave class, Javascript no tiene clases.

Así que los desarrolladores de Java pensaron que Javascript era como Java y lo recomendaron.

```javascript
function Person(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
}

var john = new Person('John', 'Doe;);
console.log(john);

var jane = new Person('Jane', 'Doe;);
console.log(jane);
```

'new' crea inmediatamente un objeto vacío. Luego llama a la función. Entonces 'this' apuntará a ese objeto vacío. Así, la función se convierte en el constructor de ese objeto.

### Lectura 58: Constructores de funciones y '.prototype'

Las funciones tienen propiedades especiales, además del nombre, el código, etc, también tienen una propiedad prototipo, que comienza su vida como un objeto vacío y SOLO es utilizado por el operador new.

```javascript
function Person(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
}

Person.prototype.getFullName = function() {
    return this.firstname + ' ' + this.lastname;
}

var john = new Person('John', 'Doe;);
console.log(john);

var jane = new Person('Jane', 'Doe;);
console.log(jane);</pre>

Person.prototype.getFormalFullName = function() {
    return this.lastname + ', ' + this.firstname;
}

console.log(john.getFormalFullName());
```

Así, podemos añadir características a todos aquellos objetos que creamos utilizando el prototipo.

En un buen código, los métodos de un objeto se establecen con el prototipo. ¿Por qué? Porque si añadimos `getFullName` a cada objeto, significa que están usando mucha memoria. Si lo añadimos al prototipo, sólo lo tenemos una vez. Sólo usamos una copia para todas las instancias del objeto. Estamos ahorrando espacio de memoria porque sólo hay un prototipo para todos los objetos.

### Lectura 59: Apartado peligroso, uso de 'new' y funciones

Si nos olvidamos de usar 'new', el constructor de la función devolverá undefined. Es una buena práctica usar mayúsculas para los constructores. De esta manera, si vemos que falta la palabra clave new, nos daremos cuenta de que está mal.

En ES6, es probable que los constructores de funciones desaparezcan.

### Lectura 60: Constructores de función incorporados

`var a = new Number(3);`

Eso crea un objeto del tipo Number con algunos métodos especiales. Podemos usar a.toFixed();

`var a = new String('John');`

Lo mismo y podemos usar a.indexOf('o');

También podemos hacer "John".length

Ambos almacenan el valor en una propiedad llamada `PrimitiveValue`. Así que no son primitivas, son objetos con métodos especiales.

De la misma manera, podemos hacer lo mismo con las fechas:

`var a = new Date('10/12/2010');`

También podemos hacer cosas como

```javascript
String.prototype.isLengthGreaterThan = function(limit) {
   return this.legth > limit;
}
console.log('John'.isLengthGreaterThan(3));
```

`String` es un objeto y estamos añadiendo un método al prototipo. ¡Acabamos de mejorar el lenguaje JS sin más! Tenemos que tener cuidado de no sobrescribir un método existente.

```javascript
Number.prototype.isPositive = function() {
    return this > 0;
}

console.log(3.isPositive()); // Devuelve un error
```

Javascript no devuelve un número en un objeto, así que tenemos que hacer lo siguiente:

```javascript
var a = new Number(3);
a.isPositive();
```

Por lo tanto, es una buena característica, pero se vuelve un poco confusa porque no todo funciona de la misma manera.

### Lectura 62: Peligrosidad aparte. Constructores de funciones incorporadas

```javascript
var a = 3;
var b = new Number(3);

a == b // devuelve verdadero debido a la coerción
a === b // devuelve false
```

Así que, como puedes ver, no es una situación muy recomendable. Es mejor no usar new para crear primitivas.

Del mismo modo, si vamos a trabajar mucho con fechas, es recomendable utilizar la librería [Moment.js](http://momentjs.com).

### Lectura 62: Apartado peligroso. Arrays y for..in

```javascript
Array.prototype.myCustomFeature = 'cool!';

var arr = ['John', 'Jane', 'Bob'];
for (item in arr) {
    console.log(item + ': ' + arr[item]);
}
// Eso mostrará también myCustomFeature
```

Así que, en el caso de los arrays, no uses `for..in`. Usa el bucle clásico `for..i`.

### Lectura 63: Object.create y la herencia prototípica pura

Esta es una nueva característica para los nuevos navegadores. Si necesitamos dar soporte a un navegador antiguo, usamos un **polyfill**, que es código que añade una característica de la que el motor puede carecer.

```javascript
var person = {
    firstname = 'Default',
    lastname = 'Default',
    greet = function() {
        return 'Hi' + this.firstname;
    }
}

var john = Object.create(person);
console.log(john);
```

Eso crea un objeto vacío con un prototipo con todos los métodos indicados anteriormente. Así, si queremos anular esos valores por defecto, podemos hacerlo:

```javascript
john.firstname = 'John';
john.lastname = 'Doe';
```

Por lo tanto, la gran ventaja del prototipo frente a la herencia clásica, es que podemos añadir nuevos métodos sobre la marcha y mutar las cosas fácilmente, sin capas e interacciones complejas.

### Lectura 64: ES6 y las clases

```javascript
class Person {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    greet() {
        return 'Hi ' + firstname;
    }
}

var john = new Person('John', 'Doe');
```

Eso es un OBJECTO.

Para establecer el prototipo, lo hacemos así:

```javascript
class InformalPerson extends Person {
    constructor(firstname, lastname) {
        super(firstname, lastname);
    }

    greet() {
        return 'Yo ' + firstname;
    }
}
```

Bonus: una forma diferente de escribir algo que no cambia cómo funciona por dentro.

### Lectura 65: Peculiaridades. Inicialización

Sólo hablamos de errores sintácticos comunes al crear objetos literales grandes con arrays y funciones. Nada que destacar aquí.

### Lectura 66: Curiosidades. Typeof, intanceof y cómo averiguar qué es algo

Podemos usar typeof para averiguar el tipo de primitiva u objeto con el que estamos tratando, pero en el caso de los arrays, tenemos que usar algo así:

```javascript
var d = [];
console.log(Object.prototype.toString.call(d));</pre>

That would output [Object Array]

In the case of objects:

<pre>function Person(name) {
    this.name = name;
}
var e = new Person('Jane');
```

Con instanceof Person, estamos buscando un objeto del tipo Persona en la cadena de prototipos.

Hay un error muy conocido. Si escribes typeof null, devuelve un objeto.

Y typeof functionName devuelve una función.

### Lectura 67: Peculiaridades. Modo estricto

Esto le dice al motor JS que procese el código de forma más estricta. Por ejemplo, en el siguiente caso, escribimos mal la variable pero sin el modo estricto, no lanzará un error.

```javascript
var person;

persom = {};
console.log(persom);
```

Si ponemos "use strict"; al principio, arrojará un error porque estamos obligados a declarar una variable para poder usarla.

Para más información, consulta [la referencia del modo estricto](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Strict_mode).

### Lectura 69: Aprendiendo del buen código de otros

Una educación de código abierto. Github.com contiene una gran colección de código fuente donde podemos aprender. Así, es una buena práctica echar de vez en cuando un vistazo a algunos de los métodos de las bibliotecas que utilizamos.

### Lecturas 70-72: Inmersión profunda en el famoso código fuente de jQuery

Estas conferencias son bastante densas en términos de revisión de código, por lo que omitiré comentarlas. Eres más que bienvenido a descargar la versión sin minificar de jQuery y sumergirte en el código para intentar entender cómo se inicializa la librería (sin necesidad de usar 'new') y cómo se almacenan todos los métodos en el prototipo de fn.

Sólo me gustaría mencionar el **encadenamiento de métodos**, que es una forma muy útil de encadenar llamadas a métodos. Si usas jQuery, entonces muy probablemente ya conoces esto. Como cuando añades una clase y eliminas otra en la misma línea:

```javascript
$('.selector').addClass('a').removeClass('b');
```

Para conseguirlo, sólo tenemos que 'return this;' en los métodos que estamos llamando.

### Lectura 73: Construyamos un framework/biblioteca. Requisitos

* Vamos a llamarlo 'Greetr', una aplicación para saludar a los usuarios
* Cuando se le da un nombre, un apellido y los idiomas opcionales, genera saludos formales e informales
* Soporta los idiomas inglés y español
* Biblioteca/marco reutilizable
* Estructura 'G$()' fácil de escribir
* Soporta jQuery

### Lectura 74: Construyamos un framework/biblioteca. Estructurando código seguro

Primero, crea un archivo llamado Greetr.js. Vamos a crear un nuevo contexto de ejecución con una función auto-invocada.

```javascript
(function(global, $) {

}(window, jQuery))
```

### Lectura 75: Construyamos un framework/biblioteca. Nuestro objeto y su prototipo

Crea un archivo llamado app.js. Vamos a imitar la estructura de jQuery. Así que no queremos usar 'new', queremos usar G$() como en jQuery y obtener un objeto como resultado:

```javascript
var g = G$('John', 'Doe');
```

Y en Greetr.js:

```javascript
(function(global, $) {

    var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);

    Greetr.prototype = {};

    Greetr.init = function(firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    }

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G$ = Greetr;
}

}(window, jQuery))
```

### Lectura 76: Construyamos un framework/biblioteca. Propiedades y métodos encadenables

Ahora sólo vamos a crear métodos en el prototipo y devolver esto en algunos de ellos para hacerlos encadenables.

```javascript
(function(global, $) {

    var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);

    var supportedLangs = ['en', 'es'];

    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    var logMessages = {
        en: 'Logged in',
        es: 'Inició sesión'
    }

    Greetr.prototype = {

        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },

        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },

        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        greet: function(formal) {
            var msg;

            if (formal) msg this.formalGreeting();
            else msg = this.greeting();

            if (console) console.log(msg);
            return this;
        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName();
            }
            return this;
        },

        setLang: function(lang) {
            this.language = lang;
            this.validate();
            return this;
        }
    };

    Greetr.init = function(firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        self.validate();
    }

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G$ = Greetr;
}

}(window, jQuery))
```

así que ahora podemos llamarlo así:

```javascript
var g = G$('John', 'Doe');
g.greet().setLang('es').greet(true);
```

### Lectura 77: Construyamos un framework/biblioteca. Añadiendo soporte para jQuery

Imagina que tenemos un formulario HTML para los usuarios que se registran. Sólo necesitamos un desplegable con los dos idiomas soportados y un botón de login. También necesitamos un H1 con el id de saludo.

Ahora vamos a añadir un método que acepte un selector jQuery y actualice lo que sea el selector.

Para ello, sólo tenemos que añadir el siguiente método al prototipo:

```javascript
    HTMLGreeting: function(selector) {
        if (!$) throw 'jQuery not loaded';

        if (!selector) throw 'Missing jQuery selector';

        var msg;
        if (formal) msg this.formalGreeting();
        else msg = this.greeting();

        $(selector).html(msg);
        return this;
    }
```

### Lectura 78: Construyamos un framework/biblioteca. Buenos comentarios

Esto es especialmente importante en JS porque no es muy verboso y podríamos hacer las cosas muy lisas pero no fáciles de leer.

También es bueno para que otros desarrolladores revisen tu código y vean si es legible.

### Lectura 79: Construyamos un framework/biblioteca. Usemos nuestro framework

A veces las bibliotecas también utilizan un punto y coma antes de la función auto-invocada como una comprobación de cordura (por si acaso otra biblioteca no se cerró correctamente).

El resto de la conferencia es sólo acerca de la conexión de la forma HTML con la biblioteca, que no es particularmente agregar mucho valor, así que voy a saltármelo.

### Lectura 81: Typescript, ES6 y lenguajes transpilados

**Transpilar**: convertir la sintaxis de un lenguaje de programación a otro. En este caso, los lenguajes no se ejecutan en ningún sitio, sino que son procesados por "transpiladores" que generan Javascript.

[Typescript](http://www.typescriptlang.org/) de Microsoft es bastante popular. Proporciona tipos para las variables, por ejemplo, message: string. También utiliza clases y constructores.

[Traceur](https://github.com/google/traceur-compiler) de Google es también otra biblioteca ES6 muy popular.

Muchos equipos con proyectos Javascript a largo plazo están utilizando estas herramientas para poder escribir código ES6 (a prueba de futuro) y al mismo tiempo ser compatible con los navegadores actuales.

Como opinión personal, he oído hablar de [BabelJs](https://babeljs.io/) más que de cualquiera de las bibliotecas anteriores. [Algunas personas](http://ilikekillnerds.com/2015/01/transpiling-wars-6to5-vs-traceur/) recomiendan Babel sobre Traceur si la compatibilidad con JSX es un requisito o si la calidad del código resultante también es importante para ti por encima de la función.

### Lectura 83: EcmaScript 6.0. Características actuales y futuras

Este es probablemente el mejor recurso que existe para aprender sobre las características de ES6: https://github.com/lukehoban/es6features

Y eso es todo. Aquí está el certificado que obtendrás si haces el curso en Udemy:

![](/blog/javascript-understanding-the-weird-parts-part-2/images/UC-E8UQOM40.jpg)
