---
title: "Javascript: entendiendo las partes raras [Parte 1]"
description: Mis aprendizajes repasando conceptos de JavaScript en el sitio educativo Udemy
cover: images/javascript-bg.jpg
template: post
category: work
---

Mirando hacia atrás y analizando cómo han evolucionado las tecnologías web en los últimos años, me he dado cuenta de que Javascript es ahora la habilidad más importante que todo desarrollador web debe tener. Está en todas partes (también en el back-end) y nunca va a desaparecer (como Flash...).

Así que, para este nuevo año 2016, he decidido centrarme en pulir mi Javascript y convertirme en un **JavaScript Samurai / Master of the Universe**, ¡JA, JA, JA! (risa malvada).

Compré tres cursos en [Udemy](https://www.udemy.com) y del que voy a hablar en este artículo se llama [Javascript: entendiendo las partes raras](https://www.udemy.com/understand-javascript/). Si quieres comprarlo, puedes probar con el código de cupón NEWYOU015 y ver si te da el curso por 13€, si no, te sugeriría que escribieras un email a soporte pidiendo que te den uno nuevo. El curso ha sido escrito por Anthony Alicea y actualmente tiene **más de 32.700 estudiantes**.

Creo que conozco bastante bien JavaScript, pero siempre es bueno refrescar los conceptos, el vocabulario y, por supuesto, aprender las nuevas cosas de ES6. Así que, si quieres acompañarme en este viaje, iré publicando todos mis aprendizajes en el blog, así que siéntete libre de leer y compartir tus pensamientos.

### Javascript: entendiendo las partes raras [Parte 1]

Voy a saltarme las cuatro primeras lecturas, que se centran principalmente en dar algo de contexto y establecer el entorno de programación.

### Lectura 6: Parsers de sintaxis, contextos de ejecución y entornos léxicos.

**Analizadores de sintaxis**: Un programa que lee tu código y determina lo que hace y si su gramática es válida. Tu código no es mágico. Alguien escribió un programa para traducirlo para el ordenador y puede añadir "cosas extra" durante esa traducción.

**Entorno léxico**: donde algo se encuentra físicamente en el código que escribes. "Léxico" significa "que tiene que ver con las palabras o la gramática". En los lenguajes de programación existe un entorno léxico en el que **donde** se escribe algo es *importante*.

El lugar en el que veas las cosas escritas en el código, te dará una idea de dónde estarán en la memoria.

**Contexto de ejecución**: una envoltura que ayuda a gestionar el código que se está ejecutando. Hay muchos entornos léxicos. El que se está ejecutando actualmente se gestiona a través de los contextos de ejecución. Puede contener cosas más allá de lo que has escrito en tu código.

### Lectura 7: Parejas de nombre/valor y objetos

**Parejas de nombre/valor**: un nombre que se asigna a un valor único. El nombre puede ser definido más de una vez, pero sólo puede tener un valor en cualquier **contexto**. Ese valor puede ser también una nueva pareja de nombre/valor.

**Objeto**: una colección de parejas de nombre-valor. La definición más sencilla cuando se habla de Javascript. ¡No pienses más profundamente en un objeto que esto!

### Lectura 9: El entorno global y el objeto global

El contexto de ejecución base es el global. Lo que es accesible desde cualquier parte de su código. Javascript crea también la palabra reservada '**this**' y en el contexto global, esto representa la ventana, la ventana del navegador, a la que también se puede acceder con la palabra reservada 'window'. Cada pestaña del navegador tiene su contexto de ejecución.

Cuando decimos 'global', en Javascript significa 'no dentro de una función'. No hay que pensar más allá de eso.

Nota: Si estamos ejecutando Node.js, el objeto global no será la ventana.

Cuando creamos variables y funciones que no están dentro de ninguna otra función, se adjuntan al objeto global. Así que podríamos acceder a ellas usando `window.anyVariable` o `window.anyFunction`.

### Lectura 10: El contexto de ejecución: creación y 'hoisting'

Si no eres un hablante nativo de inglés, te habrás preguntado qué significa "hoisting". Hoisting significa llevar algo a la cima, como cuando se usa un polipasto para levantar cosas.

En Javascript, hay situaciones en las que hemos declarado variables y funciones en la parte inferior de un script pero las estamos usando antes de que sean declaradas, lo que devolverá undefined (en el caso de la variable).

Hoisting significa que Javascript trae a la parte superior las variables y funciones cuando se crea el contexto de ejecución, pero vamos a verlo con más detalle:

1ª fase: la fase de creación.

- Crear el objeto global
- Crear 'this'
- Crear el entorno externo
- Reconocer las variables y la función que hemos creado y establecer un espacio de memoria para ellas -> 'hoisting'

Entonces, hoisting significa que, en esta fase, nuestras cosas existirán en la memoria y que todas las variables se establecen inicialmente como indefinidas. Eso es todo hasta ahora.

### Lectura 11: Javascript y 'undefined'

'undefined' es una palabra clave especial. Es un valor. Significa que la variable no ha sido declarada. Si no ha sido declarada, lanzaría un 'uncaught ReferenceError'. Es mejor no poner 'undefined' manualmente porque entonces, no sabríamos si fuimos nosotros o Javascript quien lo puso en undefined.

### Lectura 12: El contexto de ejecución: la ejecución del código

En la lección 10 hemos hablado de la fase de creación. Ahora, en el contexto de ejecución, vamos a ejecutar línea por línea el código preparado por la fase de creación.

### Lectura 13: Ejecución monohilo y sincrónica

**Single threaded**: un comando a la vez. Bajo el capó del navegador, quizás no. Pero desde nuestra perspectiva, JS es single-threaded.

**Sincrónico**: de uno en uno y en orden...

### Lectura 14: Invocación de funciones y pila de ejecución

**Invocación**: ejecutar una función o llamar a una función. En Javascript, mediante el uso de paréntesis ()

Cada vez que se ejecuta una función, se crea un nuevo contexto de ejecución y se coloca en la parte superior de la pila de ejecución, donde el contexto de ejecución global está siempre en la parte inferior.

Cada vez que el contexto de ejecución de una función termina, sale de la pila de ejecución.

### Lectura 15: Funciones, contexto y entornos de variables

**Entorno de las variables**: dónde viven las variables y cómo se relacionan entre sí en la memoria.

Esto es sobre el ámbito de las variables y la diferencia entre el ámbito de las vars globales y las vars locales.

### Lectura 16: La cadena de alcance

Cuando se buscan variables, cada contexto de ejecución tiene una referencia a su entorno exterior, y este entorno exterior es donde el código fue escrito físicamente. Así, el motor de Javascript seguirá moviéndose hacia abajo (buscando la variable) en la pila de ejecución hasta llegar al contexto global.

### Lectura 17: Scope, ES6 y let

**Scope**: dónde está disponible una variable en tu código y si es realmente la misma variable o una nueva copia

let es una nueva forma de declarar variables en ES6, permitiendo el ámbito de bloque (declarada dentro de {}) y sólo creándola en memoria al llegar a la línea donde está definida.

### Lectura 18: ¿Qué pasa con los callbacks asíncronos?

**Asíncrono**: más de uno a la vez.

El motor de Javascript tiene ganchos que enlazan con otros motores y módulos del navegador como el motor de renderizado o las peticiones HTTP.

Hay otra lista que se encuentra fuera de la pila de ejecución llamada "Cola de Eventos". Esta lista almacena los eventos de clic, peticiones http, etc.

El motor de Javascript mira esa lista SÓLO cuando la pila de ejecución está vacía, entonces mira periódicamente la cola de eventos para ver si hay algo que necesita ser ejecutado.

Esto significa que las funciones de larga duración pueden bloquear la ejecución de cualquier otra cosa, por lo que Javascript puede ejecutar eventos asíncronos pero de forma sincrónica :D

### Lectura 19: Tipos y Javascript

**Tipos dinámicos**: no le dices al motor de Javascript qué tipo de datos contiene una variable, lo averigua mientras tu código se está ejecutando. Las variables pueden contener diferentes tipos de valores porque todo se calcula durante la ejecución.

### Lectura 20: Tipos primitivos

**Tipo primitivo**: un tipo de datos que representa un único valor. Es decir, no es un objeto.

**indefinido**: representa una falta de existencia (no se debe establecer una variable en este sentido).

**null**: representa una falta de existencia (puedes poner una variable con este valor).

**booleano**: verdadero o falso

**número**: número en coma flotante (siempre hay algunos decimales). A diferencia de otros lenguajes de programación, sólo hay un tipo 'number'... y puede hacer que las matemáticas sean raras.

**cadena**: una secuencia de caracteres (se pueden usar tanto '' como "")

**símbolo**: utilizado en ES6 (la próxima versión de Javascript).

### Lectura 21: Operadores

**Operador**: una función especial que se escribe sintácticamente de manera diferente. Generalmente, los operadores toman dos parámetros y devuelven un resultado.

La forma en que usamos los operadores se llama notación infija, es decir, 3 + 4

### Lectura 22: Precedencia de operadores y asociatividad

**Precedencia de los operadores**: qué función del operador se llama primero cuando hay más de una. Las funciones son llamadas en orden de preferencia (la mayor preferencia gana).

**Asociatividad de los operadores**: en qué orden se llama a las funciones de los operadores: de izquierda a derecha o de derecha a izquierda. Cuando las funciones tienen la misma precedencia.

En [esta tabla](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) puedes encontrar la precedencia de los operadores.

### Lectura 24: Coerción

**Coerción**: convertir un valor de un tipo a otro. Esto ocurre muy a menudo en Javascript porque está tipado dinámicamente. Por ejemplo, cuando intentamos el siguiente 1 + '2', el resultado sería 12 en lugar de 3, sólo porque el motor de JS adivinará que ambos números son cadenas.

### Lectura 25: Operadores de comparación

A veces, cuando tenemos una cadena de comparaciones, como por ejemplo (3 < 2 < 1), el resultado, en lugar de falso, será verdadero. En este caso, (3 < 2) está devolviendo falso y luego (falso < 1) devuelve verdadero porque falso está coaccionado en 0.

Del mismo modo, al comparar valores, como ('3' == 3), (false == 0), (null < 1), ("" == 0), ("" == false) o (undefined = 0) devolvería true. En cambio, (null = 0) devolverá false.

¿Cómo lo solucionamos? Con la igualdad estricta: ===

En [esta tabla](https://developer.mozilla.org/es/docs/Web/JavaScript/Equality_comparisons_and_sameness) puedes encontrar las comparaciones de igualdad.

### Lectura 27: Existencia y booleanos

Si intentamos convertir null, undefined o "" en booleano, siempre obtenemos false. Boolean(null) devuelve false;

Podemos usar esto a nuestro favor. Cuando ponemos algo en una sentencia 'if', va a intentar convertirlo en booleano, así que podemos usarlo para comprobar si una variable tiene contenido. Un ejemplo:

```javascript
var a; // a is undefined
if (a) {
    console.log('Something is there.');
}
```

El único escenario en el que a será coaccionado a falso aunque tenga contenido es cuando a = 0, por lo que podríamos cambiar la condición a if (a || a === 0).

### Lectura 28: Valores por defecto

Cuando usamos funciones con parámetros, si no pasamos los parámetros cuando llamamos a la función, estos se inicializan a indefinidos y ya está.
Pero hay un buen truco para anular esto:

```javascript
function greet(name) {
   name = name || 'Your name here';
   console.log('Hello' + name);
}
greet('Joan');
```

Por lo tanto, devuelve el valor que puede ser coaccionado a true. Así que si llamamos a greet() sin ningún parámetro, 'Your name here' será enrojecido porque puede ser coaccionado a true.

Nota: en ES6 hay una nueva forma de hacer esto...

### Lectura 29: Valores por defecto del framework

Imaginemos que tenemos dos bibliotecas (lib1.js y lib2.js) que estamos cargando junto a nuestro app.js.
Ambas bibliotecas declaran una variable llamada libraryName y la establecen como 'Lib 1' y 'Lib 2' respectivamente. El problema aquí es que cuando sacamos esa variable desde app.js, el resultado será 'Lib 2' porque anula la anterior. Para evitar esto, lo que hacen la mayoría de las bibliotecas es asignar el objeto al objeto global de la ventana SÓLO si no hay nada allí:

`window.libraryName = window.libraryName || 'Lib 2';`

### Clase 30: Objetos y funciones

En otros lenguajes, los objetos y las funciones son diferentes, pero en Javascript, son muy parecidos.

Un objeto es una colección de valores a los que se les da un nombre. Un objeto puede tener propiedades y métodos. Las propiedades pueden ser primitivas (como booleanos, números, etc). La propiedad también puede ser otro objeto y los métodos son las funciones que tiene el objeto.

Podemos crear un objeto así (hay mejores formas de hacerlo, pero de momento vamos a hacerlo así)

`var persona = new Object();`

Para crear una primitiva (una cadena) usando un acceso de miembro computado:

`persona["nombre"] = "Joan Mira";`

Los corchetes son un operador que busca esa propiedad en el objeto persona. Esto es útil si necesitamos precomponer el nombre de la propiedad miembro.

También podemos almacenar el nombre de la primitiva en una variable y usarla para localizar esa primitiva en el objeto:

```javascript
var firstNameProperty = "firstname";
console.log(person[firstNameProperty]);
```

También podemos utilizar el operador '.' para acceder al miembro primitivo (que es la forma recomendada):

`console.log(persona.nombre);`

También podemos crear un objeto sentado dentro del objeto persona:

```javascript
person.address = new Object();
person.address.street = "111 Main St.";
person.address.city = "London";
```

### Lectura 31: Objetos y literales de objetos

Para crear literales de objeto, usamos llaves, que no es un operador. Es sólo el motor JS asumiendo que estamos creando un objeto.

`var persona = {};`

También podemos establecer e inicializar propiedades y métodos:

`var persona = { nombre: 'Juana', apellido: 'Mira' };`

También es recomendable utilizar espacios en blanco y poner cada propiedad en una línea diferente:

```javascript
var Joan = {
    firstname: 'Joan',
    lastname: 'Mira',
    address: {
        street: '111 Main St.',
        city: 'London'
    }
};
```

Y podemos pasar el objeto a una función:

```javascript
function greet(person) {
    console.log('Hi ' + person.firstname;
}
greet(Joan);
```

También podemos crear objetos sobre la marcha:

```javascript
greet({
    firstname: 'Mary',
    lastname: 'Doe'
});
```

### Lectura 32: Falsificación de espacios de nombres

**Espacio de nombres**: un contenedor para variables y funciones. Típicamente para mantener variables y funciones con el mismo nombre separadas.

```javascript
var greet = 'Hello!';
var greet = 'Hola!';

console.log(greet); // Renders Hola!
```

Podemos evitar esa colisión creando contenedores:

```javascript
var english = {};
var spanish = {};

english.greet = 'Hello!';
spanish.greet = 'Hola!';
```

### Lectura 33: JSON y literales de objeto

JSON (JavaScript Object Notation) se parece mucho a la sintaxis de objetos de JS pero no caigamos en ese error.

```javascript
var objectLiteral = {
    firstname: 'Mary',
    isAProgrammer: true
};
```

Formato JSON:

```javascript
{
    "firstname": "Mary",
    "isAProgrammer": true
}
```

En JSON, las propiedades deben ir entre comillas.

También existen utilidades para convertir objetos en JSON:

`JSON.stringify(objectLiteral);`

Y para parsearlos (convertir de JSON a objeto JS):

`var jsonValue = JSON.parse('{ "firstname": "Mary", "isAProgrammer": true }');`

### Lectura 34: Las funciones son objetos

**Funciones de primera clase**: todo lo que puedes hacer con otros tipos lo puedes hacer con funciones. Asignarlas a variables, pasarlas, y crearlas sobre la marcha.

Las funciones no necesitan un nombre, pueden ser anónimas y el código que escribimos en la función es sólo una de las propiedades que estamos añadiendo a la función. Lo especial es que esa propiedad es invocable ();

Tenemos que pensar en las funciones como objetos, cuyo código resulta ser una propiedad de ese objeto.

Se puede mover, y copiar, al igual que una cadena o un número u otro objeto.

```javascript
function greet() {
    console.log('hi');
}

greet.language = 'english';
```

Sí, podemos añadir propiedades a una función. LAS FUNCIONES SON OBJETOS.

### Lectura 35: Sentencias de función y expresiones de función

**Expresión**: una unidad de código que da como resultado un valor. No tiene que guardar en una variable.

Por ejemplo (a === 3), eso es una expresión.

Por otro lado, una declaración es algo que no devuelve un valor, como por ejemplo una declaración 'if'.

Con las funciones ocurre algo parecido. La siguiente es una declaración de función que no devuelve un valor:

```javascript
function greet() {
    console.log('hi');
}
```

Por otro lado, se trata de una expresión de función:

```javascript
var anonymousGreet = function() {
    console.log('hi');
}
```

Estamos creando un objeto sobre la marcha y asignándolo a una variable. La diferencia es que anonymousGreet tiene la DIRECCIÓN en memoria de la función anónima.

### Lectura 36: Por valor vs por referencia

Cuando se habla de asignar el valor de una variable a otra, en el caso de las primitivas, JS COPIA el valor en una nueva dirección de memoria. Esto es **por valor**.

Ahora bien, en el caso de los objetos (todos los objetos), cuando se trata de hacer que dos tengan el mismo valor, en lugar de obtener una nueva ubicación en memoria, simplemente se apunta a la misma ubicación en memoria. No hay copia. Así, dos nombres apuntan a la misma dirección. Esto se llama **por referencia**.

Cuando se modifican objetos, a menudo se escuchan estos dos conceptos, que suenan mucho más complicados de lo que son.

**Mutable**: que cambia algo
**Imutable**: que no se puede cambiar

### Lectura 37: Objetos, funciones y 'esto'

Si creamos una función (incluso una expresión de función) en el contexto global, la invocamos y console.log 'this' dentro de esa función, obtendremos como resultado la ventana global.

Por otro lado, si declaramos un método dentro de un objeto y console.log 'this' en ese método, obtendremos como resultado el objeto.

Mucha gente piensa que JS tiene un error cuando creamos un nuevo método dentro de ese método del objeto anterior y usamos 'this' para mutar el objeto. ¡En este caso, 'this' ya no apuntará al objeto, sino a la ventana global WTF!

Para arreglar este error, podemos usar este popular truco

`var self = this;`

Eso creará una referencia al ámbito del objeto correcto que podemos usar para apuntar a sus propiedades y métodos, de modo que podemos comunicarnos desde dentro del método con otras propiedades y métodos del objeto.

### Lectura 38: Arrays - colecciones de cualquier cosa

Los arrays se pueden definir con = new Array() o usando el formato literal con corchetes []. Pueden contener colecciones de cualquier cosa, ¡incluso mezclando diferentes tipos!

### Lectura 39: 'argumentos' y extensión

**Argumentos**: los parámetros que pasas a una función. Javascript te da una palabra clave con ese mismo nombre que los contiene todos. Ejemplo:

```javascript
function greet(firstname, lastname, language) {
    console.log(arguments);
}
```

La palabra reservada argumentos devolverá un pseudoarray con los parámetros que recibió la función.

### Lectura 40: Sobrecarga de funciones

La sobrecarga de funciones consiste en tener otra función con el mismo nombre pero con diferentes parámetros. En JavaScript no existe esta funcionalidad, pero podemos replicarla utilizando otros patrones, como condicionales dentro de la función para devolver uno de los otros resultados.

### Lectura 41: Analizadores de sintaxis

Javascript lee cada palabra carácter por carácter.

### Lectura 42: Peligroso! inserción automática de punto y coma

El parser de sintaxis trata de ser útil al no requerir el punto y coma al final de la línea. El Javascript los pone automáticamente donde cree que deben estar. No queremos que el motor JS tome esas decisiones por nosotros. Puede causar un GRAN problema en nuestro código porque es muy difícil de rastrear.

### Lectura 43: Espacio en blanco

**Espacio en blanco**: caracteres invisibles que crean un 'espacio' literal en tu código escrito. Retornos de carro, tabulaciones, espacios.

Javascript es bastante liberal a la hora de aceptar los espacios en blanco, así que podemos escribir comentarios entre var y el nombre de las variables o dentro de los literales de los objetos.

Haz que tu código sea legible y comprensible. ¡Escribe comentarios! No te preocupes por los espacios en blanco.

### Lectura 44: IIFEs (Expresiones de Función Inmediatamente Invocadas)

Ya sabemos que el paréntesis () se usa para invocar una función, así que eso es básicamente lo que vamos a usar para las IIFEs:

```javascript
var greeting = function(name) {
    return 'Hello ' + name;
}('John');

console.log(greeting);
```

Eso está bien para las expresiones de función, pero ¿cómo podemos hacer IIFEs con declaraciones de función normales como esta:?

```javascript
function name() {
    return 'Hello ' + name;
}
```

Hay un truco para hacer que el analizador sintáctico piense que la función es una expresión. Sólo tenemos que envolver la función entre paréntesis. Como son un operador y sólo los usamos con expresiones, el analizador sintáctico los trata como tales. Ejemplo:

```javascript
(function name() {
    var greeting = 'Hello';
    return greeting + ' ' + name;
}('John'))
```

Por cierto, podemos invocarlo antes o después del paréntesis de envoltura.

### Lectura 45: IIFEs y código seguro

Hay escenarios en los que una variable (en este caso 'greeting') puede ser definida en dos contextos diferentes. Esto significa que no estamos sobreescribiendo la variable 'saludo'. Ambas existen en contextos diferentes.

```javascript
var greeting = 'Hola';

(function(name) {
    var greeting = 'Hello';
    return greeting + ' ' + name;
}('John'))

console.log(greeting);
```

En caso de que queramos pasar el objeto global a la función envuelta, podemos hacerlo pasando el parámetro ventana. Recuerda que los objetos pasan por referencia, por lo que no estamos copiando nada, sólo estamos pasando una referencia al objeto global:

```javascript
var greeting = 'Hola';

(function(global, name) {
    var greeting = 'Hello';
    // we can access the global object here
    global.greeting = 'Hello';

    return greeting + ' ' + name;
}(window, 'John'))

console.log(greeting);
```

Sólo lo llamamos global porque podríamos querer usar el código en el servidor (donde no hay navegador).

### Lectura 46: Entendiendo los closures

Este es un tema notorio. Es vital entenderlo para avanzar en el lenguaje.

```javascript
function greet(whattosay) {
    return function(name) {
        console.log(whattosay + ' ' + name);
    }
}

greet('Hi')('Joan');
```

Aquí tenemos una función que devuelve una función. Entonces invocamos la función y volvemos a invocar la función devuelta. También podríamos llamarla así:

```javascript
var sayHi = greet('Hi');
sayHi('Joan');
```

La pregunta es, ¿cómo es posible que whattosay siga existiendo en la segunda función? Debería haber desaparecido porque el contexto de esa función ya no está en la pila de ejecución. Bueno, eso es posible gracias a los closures. El motor JS ha liberado el contexto de ejecución de la primera función, pero el valor de whattosay sigue dando vueltas...

Así, el contexto de ejecución puede haber desaparecido, pero la variable sigue en memoria porque la otra función todavía la necesita. ¡Eso es un closure!

La segunda función está recorriendo la cadena de alcance para encontrar lo que necesita.

El contexto de ejecución ha cerrado sus variables externas. Las variables que normalmente habrían sido referenciadas de todos modos, incluso en sus contextos de ejecución han desaparecido. Este fenómeno se llama closure. No es algo que creamos, escribimos o le decimos a JS que haga. Es simplemente una característica de JS. Simplemente ocurre. El motor de JS siempre se asegurará de que, sea cual sea el contexto de ejecución, las variables estarán siempre accesibles.

Es sólo una característica para asegurarse de que cuando ejecutamos una función, todo funciona como debería.

### Lectura 47: Entendiendo los closures [parte 2]

Hay un ejemplo clásico para explicar los closures:

```javascript
function buildFunctions() {
    var arr = [];

    for (var i = 0; i < 3; i++) {
        arr.push(function() {
            console.log(i);
        }
    }

    return arr;
}

var fs = buildFunctions();
fs[0]();
fs[1]();
fs[2]();
```

Así que sólo estamos creando tres funciones en un array utilizando un bucle for. Luego invocamos las funciones y obtenemos i. ¿Qué sería i?

Lo que normalmente esperaríamos es que i fuera 1, 2, 3, ¡pero entonces obtenemos todos los 3!

Entonces, lo que está sucediendo bajo el capó es que el console.log no está siendo ejecutado dentro del bucle for, así que para cuando empezamos a ejecutar el console.log de las funciones, el valor de i ha llegado a 3.

Así que, en este caso, todavía tenemos la variable i en memoria pero no está manteniendo los valores que esperábamos.

Entonces, ¿cómo lo arreglamos para que se muestren los números que queremos?
En ES 6, podríamos usar let para crear variables desescopadas, pero también podemos evitar el valor de i creando un nuevo contexto de ejecución para cada una de las funciones que estamos empujando al array. Así que podríamos hacer eso usando IIFEs:

```javascript
function buildFunctions2() {
    var arr = [];

    for (var i = 0; i < 3; i++) {
        //let j = i; //ES6 solution
        arr.push(
            (function(j) {
                return function() {
                    console.log(j);
                }
            }(i))
        )
    }

    return arr;
}

var fs2 = buildFunctions2();
fs2[0]();
fs2[1]();
fs2[2]();
```

### Lectura 48: Fábricas de funciones

Una fábrica es una función que devuelve y mezcla algo por nosotros.

```javascript
function makeGreeting(language) {

    return function(firstname, lastname) {

        if (language === 'en') {
            console.log('Hello ' + firstname + ' ' + lastname);
        }

        if (language === 'es') {
            console.log('Hola ' + firstname + ' ' + lastname);
        }
    }
}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');

greetEnglish('John', 'Doe');
greetSpanish('Laura', 'Diaz');
```

Aquí estamos aprovechando los closures para crear una fábrica que devuelva funciones para saludar en diferentes idiomas. Esto nos ayuda a evitar pasar siempre los mismos parámetros para el idioma deseado.

### Lectura 49: closures y callbacks

```javascript
function sayHiLater() {

    var greeting = 'Hi!';

    setTimeout(function() {
        console.log(greeting);
    }, 3000);
}

sayHiLater();
```

En este caso, estamos utilizando un closure (la variable saludo) y una función de primera clase dentro del tiempo de espera que actúa como una expresión de función. Gracias al closure, seguimos teniendo acceso al saludo 3 segundos después.

En jQuery, también estamos utilizando los mismos tipos de expresiones de función y funciones de primera clase.

```javascript
$("button").click(function() {
});
```

**Función de retorno**: una función que le das a otra función, para que se ejecute cuando la otra función termine. Así que la función que llamas (es decir, invocas), 'devuelve la llamada' llamando a la función que le diste cuando termina.

```javascript
function tellMeWhenDone(callback) {
    var a = 1000; // some work
    var b = 2000; // some work

    callback(); // the 'callback', it runs the function I gave it!
}

tellMeWhenDone(function() {
    console.log('I am done!');
});
```

### Lectura 50: Call(), Apply() y Bind()

Todas las funciones tienen acceso a los métodos call, apply y bind.

**Call** invoca una función con el ámbito del objeto que le pasamos y nos permite pasar parámetros separados por comas.

**Aplicar** es lo mismo que una llamada pero pasamos los parámetros como un array. Un array es más útil, especialmente en circunstancias matemáticas.

**Bind** no invoca la función, crea una copia de la función que estamos llamando y pasa el contexto de un objeto.

```javascript
var person = {
    firstname: 'John',
    lastname: 'Doe',
    getFullName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
}

var logName = function(lang1, lang2) {
    console.log('Logged: ' + this.getFullName());
}
// we can also finish it like this:
// }.bind(person);

var logPersonName = logName.bind(person);
logPersonName('en');

logName.call(person, 'en', 'es');
logName.apply(person, ['en', 'es']);
```

Con bind, estamos creando una nueva copia de logName y asignándole el contexto de ejecución de la persona. Así, el valor de 'this' será el correcto en lugar del objeto global.

También podemos utilizar call y apply para el préstamo de funciones:

```javascript
var person2 = {
    firstname: 'John',
    lastname: 'Doe'
}

console.log(person.getFullName.apply(person2));
```

También podemos hacer currying de funciones. Con bind creamos una nueva copia de la función, ¿qué pasa si le pasamos parámetros?

Al dar los parámetros se establecen los valores permanentes de estos parámetros cuando se hace la copia.

```javascript
function multiply(a, b) {
    return a*b;
}

var multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(4));
```

Así, en este ejemplo, la variable 'a' será siempre un 2, y el 4 será el segundo parámetro.
Si pasamos 2 parámetros al bind, entonces significa que esos valores serán siempre los mismos.

**Currying de funciones**: crear una copia de una función con unos parámetros preestablecidos. Muy útil en situaciones matemáticas.

### Lectura 51: Programación funcional

Podemos pensar y codificar en términos de funciones. Introduce un enfoque que no se puede hacer en otros lenguajes de programación que no tienen funciones de primera clase.

```javascript
var arr1 = [1,2,3];
console.log(arr1);

var arr2 = [];
for (var i=0; i < arr1.length; i++) {
    arr2.push(arr1[i] * 2);
}

console.log(arr2);
```

Pero podemos hacer algo mejor con las funciones, para ser más flexibles. De esta manera, estamos segmentando nuestro código de manera más limpia:

```javascript
function mapForEach(arr, fn) {
    var newArr = [];
    for (var i=0; i < arr1.length; i++) {
        newArr.push(
            fn(arr[i])
        )
    };

    return newArr;
}

var arr1 = [1,2,3];
console.log(arr1);

var arr2 = mapForEach(arr1, function(item) {
    return item * 2;
});
console.log(arr2);

var arr3 = mapForEach(arr1, function(item) {
    return item > 2;
});
console.log(arr3);

var checkPastLimit = function(limiter, item) {
    return item > limiter;
}

var arr4 = mapForEach(arr1, checkPastLimit.bond(this, 1));
console.log(arr4);

var checkPastLimitSimplified = function(limiter) {
    return function(limiter, item) {
        return item > limiter;
    }.bind(this, limiter);
}

var arr5 = mapForEach(arr5, checkPastLimitSimplified(1));
console.log(arr5);
```

La programación funcional es lo que lleva a Javascript al siguiente nivel.

### Lectura 52: Programación funcional [parte 2]

La biblioteca [Underscore.js](http://underscorejs.org/) es una de las bibliotecas más famosas y es un gran ejemplo de programación funcional.

Si abres el [código fuente anotado](http://underscorejs.org/docs/underscore.html), puedes ver los comentarios sobre cómo se implementan las funciones de undescore.js.

Hay otra biblioteca llamada [lodash](https://lodash.com/) que funciona como underscore. Algunas personas la prefieren por encima de underscore, pero la primera fue Underscore (que siempre es más difícil, ser el primero).

Algunas cosas que podemos hacer con Underscore:

```javascript
// underscore
var arr6 = _.map(arr1, function(item) { return item * 3; });
console.log(arr6);

var arr7 = _.filter([2,3,4,5,6,7], function(item) { return item % 2 === 0; });
console.log(arr7);
```

Así que, juega con Underscore, aprende cómo se hace y trata de construir esas utilidades por ti mismo.

### Fin de la primera parte

Este es el final de la primera parte del curso. Espero que lo hayas disfrutado y me disculpo si algunas de las charlas no son muy claras. Son sólo apuntes que voy tomando mientras veo los vídeos. Si hay algo que necesita una mejor explicación, no dudes en comentarlo y lo mejoraré.

Las próximas conferencias serán sobre javascript orientado a objetos y herencia prototípica. Estad atentos.