---
title: "Javascript: understanding the weird parts [Part 1]"
description: My learnings reviewing JavaScript concepts in the Udemy educational site
cover: images/javascript-bg.jpg
template: post
category: work
---

Looking back and analysing how web technologies have evolved in the latest years, I've realised that Javascript is now the single most important skill every web developer must have. It's everywhere (also in the back-end!) and it's never going away (like Flash...).

So, for this new year 2016, I decided to focus in polishing my Javascript and become a **JavaScript Samurai / Master of the Universe**, HA, HA, HA! (evil laugh).

I purchased three courses in [Udemy](https://www.udemy.com) and the one I'm going to be talking about in this article is called "[Javascript: understanding the weird parts](https://www.udemy.com/understand-javascript/)". If you want to take it, you can try with the voucher code NEWYOU015 and see if it gives you the course for £13, otherwise I would suggest to write an email to support asking them to give you a new one ;-) The course has been written by Anthony Alicea and currently has **more than 32.700 students**.

I think I know JavaScript quite well, but it's always good to refresh the concepts, the vocabulary and of course, learn the new ES 6 stuff! So, if you want to join me in this journey,  I will be posting all my learnings in the blog, so feel free to read along and share your thoughts.

### Javascript: understanding the weird parts [Part 1]

I'm going to skip the first four lectures, which are mainly focussed in giving some context and setting up the coding environment.

### Lecture 6: Syntax parsers, execution contexts and lexical environments.

**Syntax parsers**: A program that reads your code and determines what it does and if its grammar is valid. Your code isn't magic. Someone else wrote a program to translate it for the computer and they might add "extra stuff" in during that translation.

**Lexical environment**: where something sits physically in the code your write. 'Lexical' means 'having to do with words or grammar'. A lexical environment exists in programming languages in which **where** you write something is *important*.

Where you see things written in the code, it will give you an idea of where they will be sitting in the memory.

**Execution context**: a wrapper to help manage the code that is running. There are lots of lexical environments. The one which is currently running is managed via execution contexts. It can contain things beyond what you've written in your code.

### Lecture 7: Name/Value pairs and objects

**Name/Value pair**: a name which maps to a unique value. The name may be defined more than once, but only can have one value in any given **context**. That value can be also a new name/value pairs.

**Object**: a collection of name value pairs. The simplest definition when talking about Javascript. Don't think any more deeply of an object than this!

### Lecture 9: The global environment and the global object

The base execution context is the global one. The thing that is accesible from anywhere in your code. Javascript creates also the reserved word '**this**' and in the global context, this represents the window, the browser window, which also can be accessed with the reserved word 'window'. Each tab in the browser has its own execution context.

When we say 'global', in Javascript means 'not inside a function'. Don't think any deeper than that.

Note: If we are running Node.js, the global object will not be the window.

When we create variables and functions that are not sitting inside any other function, they get attached to the global object. So we could access them using window.anyVariable or window.anyFunction.

### Lecture 10: The execution context: creation and 'hoisting'

If you are not a native english speaker, you might have found yourself wondering what hoisting means. Hoisting means to bring something to the top, like when using a hoist to lift stuff.

In Javascript, there are situations were we have declared variables and functions at the bottom of a script but we are actually using them before they are declared, which will return undefined (in the case of the variable).

Hoisting means that Javascript brings to the top the variables and functions when the execution context is created, but let's look at it in more detail:

1st phase: the creation phase.

- Create the global object
- Create 'this'
- Create the outer environment
- Recognise the variables and function that we created and setup memory space for them -> 'hoisting'

So, hoisting means that, in this phase, our stuff will exist in memory and that all variables are set initially to undefined. That's it so far.

### Lecture 11: Javascript and 'undefined'

'undefined' is a special keyword. It's a value. It means that the variable hasn't been set. If it wasn't declared, it would throw an 'uncaught ReferenceError'. It's better not to set 'undefined' manually because then, we wouldn't know if it was us or Javascript who set it to undefined.

### Lecture 12: The execution context: code execution

In Lecture 10 we talked about the creation phase. Now, in the execution context, we are just going to run line by line the code prepared by the creation phase.

### Lecture 13: Single threaded, synchronous execution

**Single threaded**: one command at a time. Under the hood of the browser, maybe not. But from our perspective, JS is single threaded.

**Synchronous**: one at a time and ir order...

### Lecture 14: Function invocation and execution stack

**Invocation**: running a function or calling a function. In Javascript, by using parenthesis ()

Every time you execute a function, a new execution context is created and placed on top of the execution stack, where the global execution context is always at the bottom.

Each time the execution context of a function ends, it pops off the execution stack.

### Lecture 15: Functions, context and variable environments

**Variable environment**: where the variables live and how they related to each other in memory.

This is about variable scope and the difference between global vars and local vars scope.

### Lecture 16: The scope chain

When looking for variables, each execution context has a reference to its outer environment, and this outer environment is where the code was written physically. So, the Javascript engine will keep moving down (looking for the variable) in the execution stack until it hits the global context.

### Lecture 17: Scope, ES6 and let

**Scope**: where a variable is available in your code and if it's truly the same variable or a new copy

let is a new ES6 way to declare variables, allowing block scoping (declared inside {}) and only creating it in memory when reaching the line where it's defined.

### Lecture 18: What about asynchronous callbacks?

**Asynchronous**: more than one at a time.

The Javascript engine has hooks that link with other browser engines and modules like the rendering engine or HTTP requests.

There's another list that sits outside the execution stack called the 'Event Queue'. This lists stores click events, http requests, etc.

The Javascript Engine looks at that list ONLY when the execution stack is EMPTY! then it looks periodically at the event queue to see if there's anything that needs to be run.

So that means long running functions can block anything else from running, so Javascript can run asynchronous events but in a synchronous way :D

### Lecture 19: Types and Javascript

**Dynamic typing**: you don't tell the Javascript engine what type of data a variable holds, it figures it out while your code is running. Variables can hold different types of values because it's all figured out during execution.

### Lecture 20: Primitive types

**Primitive type**: a type of data that represents a single value. That is, not an object.

**undefined**: represents a lack of existence (you shouldn't set a variable to this).

**null**: represents a lack of existence (you can set a variable to this).

**boolean**: true or false

**number**: floating point number (there's always some decimals). Unlike other programming languages, there's only one 'number' type... and it can make math weird.

**string**: a sequence of characters (both '' and "" can be used)

**symbol**: used in ES6 (the next version of Javascript).

### Lecture 21: Operators

**Operator**: a special function that is syntactically (written) differently. Generally, operators take two parameters and return one result.

The way we use operators is called infix notation, ie. 3 + 4

### Lecture 22: Operator precedence and associativity

**Operator precedence**: which operator function gets call first when there's more than one. Functions are called in order of preference (Higher preference wins).

**Operator associativity**: what order operator functions get called in: left-to-right or right-to-left. When functions have the same precedence.

In [this table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) you can find the precedence of the operators.

### Lecture 24: Coercion

**Coercion**: converting a value from one type to another. This happens quite often in Javascript because it's dynamically typed. In example, when we try the following 1 + '2', the result would be 12 rather than 3, just because the JS engine will guess that both numbers are strings.

### Lecture 25: Comparison operators

Sometimes, when we have a chain of comparisons, like for example (3 < 2 < 1), the result, rather than false, will be true. In this case, (3 < 2) is returning false and then (false < 1) returns true because false is coerced into 0.

In the same way, when comparing values, like ('3' == 3), (false == 0), (null < 1), ("" == 0), ("" == false) or (undefined = 0) it would return true. On the other hand, (null = 0) will return false.

How do we fix it? With the strict equality: ===

In [this table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) you can find the sameness comparisons.

### Lecture 27: Existence and boolean

If we try to convert null, undefined or "" to boolean, we always get false. Boolean(null) returns false;

We can use this for our advantage. When we put something in a 'if' statement, it's going to try to convert it to a Boolean, so we can use it to check if a variable has content. In example:

```javascript
var a; // a is undefined
if (a) {
    console.log('Something is there.');
}
```

The only scenario where a will be coerced into false even if it has content is when a = 0, so we could change the condition to if (a || a === 0).

### Lecture 28: Default values

When we use functions with parameters, if we don't pass the parameters when we call the function, these get initialised to undefined and that's it.
But there's a neat trick to override this:

```javascript
function greet(name) {
   name = name || 'Your name here';
   console.log('Hello' + name);
}
greet('Joan');
```

So, basically it returns the value that can be coerced into true. So if we call greet() without any parameters, 'Your name here' will be reddened because it can be coerced to true.

Note: in ES6 there's a new way to do this...

### Lecture 29: Framework default values

Let's image we have two libraries (lib1.js and lib2.js) that we are loading beside our app.js.
Both libraries are declaring a variable called libraryName and setting it to 'Lib 1' and 'Lib 2' respectively. The problem here is that when we output that variable from app.js, the result will be 'Lib 2' because it overrides the previous one. To avoid this, what most libraries do is to assign the object to the global window object ONLY if there's nothing there:

`window.libraryName = window.libraryName || 'Lib 2';`

### Lecture 30: Objects and functions

In other languages, objects and functions are different, but in Javascript, they are very much the same.

An object is a collection of values that are given names. An object can have properties and methods. Properties can be primitives (like booleans, numbers, etc). The property can also be another object and the methods are the functions that the object have.

We can create an object like this (there are better ways of doing it, but for the moment let's do it like this):

`var person = new Object();`

To create a primitive (a string) using a computed member access:

`person["firstname"] = "Joan Mira";`

The brackets are an operator that looks for that property in the person object. This is useful if we need to precompose the name of the member property.

We can also store the primitive name in a variable and use it to locate that primitive in the object:

```javascript
var firstNameProperty = "firstname";
console.log(person[firstNameProperty]);
```

We can also use the '.' operator to access the member primitive (which is the recommended way):

`console.log(person.firstname);`

We can also create an object sitting inside the person object:

```javascript
person.address = new Object();
person.address.street = "111 Main St.";
person.address.city = "London";
```

### Lecture 31: Objects and object literals

To create object literals, we use the curly braces, which is not an operator. It's just the JS engine assuming that we are creating an object.

`var person = {};`

We can also set and initialised properties and methods:

`var person = { firstname: 'Joan', lastname: 'Mira' };`

It's also recommended to use white space and put each property on a different line:

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

And we can pass the object to a function:

```javascript
function greet(person) {
    console.log('Hi ' + person.firstname;
}
greet(Joan);
```

We can also create objects on-the-fly:

```javascript
greet({
    firstname: 'Mary',
    lastname: 'Doe'
});
```

### Lecture 32: Faking namespaces

**Namespace**: a container for variables and functions. Typically to keep variables and functions with the same name separate.

```javascript
var greet = 'Hello!';
var greet = 'Hola!';

console.log(greet); // Renders Hola!
```

We can prevent that collision by creating containers:

```javascript
var english = {};
var spanish = {};

english.greet = 'Hello!';
spanish.greet = 'Hola!';
```

### Lecture 33: JSON and object literals

JSON (JavaScript Object Notation) looks a lot to the JS object syntax but let's not fall into that mistake.

```javascript
var objectLiteral = {
    firstname: 'Mary',
    isAProgrammer: true
};
```

JSON format:
```javascript
{
    "firstname": "Mary",
    "isAProgrammer": true
}
```

In JSON, properties need to be wrapped in quotes.

There are also utilities to convert objects into JSON:

`JSON.stringify(objectLiteral);`

And to parse them (convert from JSON into JS object):

`var jsonValue = JSON.parse('{ "firstname": "Mary", "isAProgrammer": true }');`

### Lecture 34: Functions are objects

**First class functions**: everything you can do with other types you can do with functions. Assign them to variables, pass them around, create them on the fly.

Functions don't need a name, they can be anonymous and the code that we write in the function is just one of the properties that we are adding to the function. The special thing is that that property is invocable ();

We have to think of functions as objects, whose code happens to be a property of that object.

It can be moved around, copied, just like a string or a number or another object.

```javascript
function greet() {
    console.log('hi');
}

greet.language = 'english';
```

Yes! we can add properties to a function. FUNCTIONS ARE OBJECTS.

### Lecture 35: Function statements and function expressions

**Expression**: a unit of code that results in a value. It doesn't have to save to a variable.

For example (a === 3), that's an expression.

On the other hand, a statement is something that doesn't return a value, like for example an 'if' statement.

With functions there's a similar scenario. The following is a function statement that doesn't return a value:

```javascript
function greet() {
    console.log('hi');
}
```

On the other hand, this a function expression:

```javascript
var anonymousGreet = function() {
    console.log('hi');
}
```

We are creating an object on the fly and assigning it to a variable. The difference is that anonymousGreet has the ADDRESS in memory of the anonymous function.

### Lecture 36: By value vs by reference

When talking about assigning the value of a variable to another one, in the case of primitives, JS COPIES the value into a new memory address. This is **by value**.

Now, for objects (all objects), when we are trying to make two the same value, instead of getting a new location in memory, simply points to the same location in memory. There's no copy. So, two names point to the same address. This is called **by reference**.

When modifying objects, we often hear these two concepts, which sound much more complicated than what they actually are.

**Mutable**: to change something
**Immutable**: that cannot be changed

### Lecture 37: Objects, functions and 'this'

If you create a function (even a function expression) in the global context, invoke it and console.log 'this' inside that function, you will get the global window as a result.

On the other hand, if we declare a method inside an object and we console.log 'this' in that method, we will get as a result the object.

A lot of people think that JS has a bug when we create a new method inside that method from the previous object and use 'this' to mutate the object. In this case, 'this' will no longer point to the object, but to the global window WTF!

To fix this Bug, we can use this popular trick:

`var self = this;`

That will create a reference to the right object scope that we can use to target its properties and methods, so we can communicate from inside the method with other properties and methods of the object.

### Lecture 38: Arrays - collections of anything

Arrays can be defined with = new Array() or using the literal format with brackets []. They can hold collections of anything, even mixing different types!

### Lecture 39: 'arguments' and spread

**Arguments**: the parameters you pass to a function. Javascript gives you a keyword of that same name that contains them all. Example:

```javascript
function greet(firstname, lastname, language) {
    console.log(arguments);
}
```

The reserved word arguments will return an pseudo-array with the parameters that the function received.

### Lecture 40: Function overloading

Function overloading is to have another function with the same name but different parameters. In Javascript there's no such functionality, but we can replicate it using other patterns, like conditionals inside the function to return one of the other result.

### Lecture 41: Syntax parsers

Javascript reads each word character by character.

### Lecture 42: Dangerous! automatic semicolon insertion

The syntax parser tries to be helpful by not requiring the semicolon at the end of the line. The Javascript is putting them automatically where he thinks it should be. We don't want the JS engine to be taking those decisions for us. It can cause a BIG problem in our code because it's very difficult to track.

### Lecture 43: Whitespace

**Whitespace**: invisible characters that create literal 'space' in your written code. Carriage returns, tabs, spaces.

Javascript is quite liberal at accepting whitespace, so we can actually write comments between var and the name of the variables or inside the object literals.

Make your code readable, understandable. Write comments! Don't be too bothered with the whitespace.

### Lecture 44: IIFEs (Immediately Invoked Function Expressions)

We already know that the parenthesis () are used to invoke a function, so that's basically what we are going to use for IIFEs:

```javascript
var greeting = function(name) {
    return 'Hello ' + name;
}('John');

console.log(greeting);
```

That's fine for function expressions, but how can we do IIFEs with normal functions statements like this one:?

```javascript
function name() {
    return 'Hello ' + name;
}
```

There's a trick to make the syntax parser think that the function is a expression. We just need to wrap the function in parenthesis. Because they are an operator and we only use them with expressions, the parser treats it as such. Example:

```javascript
(function name() {
    var greeting = 'Hello';
    return greeting + ' ' + name;
}('John'))
```

By the way, we can invoke it before or after the wrapping parenthesis.

### Lecture 45: IIFEs and safe code

There are scenarios where a variable (in this case 'greeting') can be defined in two different contexts. So that means, we are not overwriting the greeting variable. They both exist in different context.

```javascript
var greeting = 'Hola';

(function(name) {
    var greeting = 'Hello';
    return greeting + ' ' + name;
}('John'))

console.log(greeting);
```

In case we want to pass the global object into the wrapped function, we can do it by passing the window parameter. Remember that objects pass by reference, so we are not copying anything, we are just passing a reference to the global object:

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

We are just calling it global because we might want to use the code in the server (where there's no browser).

### Lecture 46: Understanding closures

This a notorious topic. It's absolutely vital to understand it to advance in the language.

```javascript
function greet(whattosay) {
    return function(name) {
        console.log(whattosay + ' ' + name);
    }
}

greet('Hi')('Joan');
```

Here we have a function that returns a function. Then we invoke the function and invoke again the returned function. We could also call it like this:

```javascript
var sayHi = greet('Hi');
sayHi('Joan');
```

The question is, how is it possible that whattosay still exists in the second function? It should be gone, because the context of that function is no longer in the execution stack. Well, that's possible thanks to closures. The JS engine released the execution context of the first function, but the whattosay value is still hanging around...

So, the execution context might be gone, but the variable is still in memory because the other function still needs it. That's a closure!

The second function is traversing down the scope chain to find the stuff it needs.

The execution context has closed in its outer variables. Variables that would normally have referenced anyway, even it their execution contexts are gone. This phenomenon is called a closure. It's not something we create, type or tell JS to do. It's just a feature of JS. They just happen. The JS engine will always make sure that whatever execution context is running, the variables will be always accesible.

It's just a feature to make sure that when we run a function, everything works as it should be.

### Lecture 47: Understanding closures [part 2]

There is a classic example to explain closures:

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

So we are just creating three functions in an array using a for loop. Then we invoked the functions and render i. What would i be?

What we would normally expect is that i would be 1, 2, 3, but then we get all 3s!

So, what's happening under the hood is that the console.log is not actually being executed inside the for loop, so by the time we start running the console.log of the functions, the value of i has reached 3.

So, in this case, we still have the i variable in memory but it's not holding the values that we were expecting.

So how do we fix it to render the numbers we want?
In ES 6, we could use let to create de-scoped variables, but we can also prevent the value of i by creating a new execution context for each of the functions that we are pushing to the array. So we could do that by using IIFEs:

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

### Lecture 48: Function factories

A factory means a function that returns and mix something for us.

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

Here we are taking advantage of closures to create a factory that returns functions to greet in different languages. This helps us to avoid passing the same parameters all the time for the desired language.

### Lecture 49: Closures and callbacks

```javascript
function sayHiLater() {

    var greeting = 'Hi!';

    setTimeout(function() {
        console.log(greeting);
    }, 3000);
}

sayHiLater();
```

In this case, we are using a closure (the greeting variable) and a first class function inside the timeout that acts like a function expression. Thanks to the closure, we still have access to the greeting 3 seconds later!

In jQuery, we are also using the same things type of function expressions and first-class functions

```javascript
$("button").click(function() {
});
```

**Callback function**: a function you give to another function, to be run when the other function is finished. So the function you call (i.e. invoke), 'calls back' by calling the function you gave it when it finishes.

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

### Lecture 50: Call(), Apply() and Bind()

All functions hace access to a call, apply and bind method.

**Call** invokes a function with the scope of the object that we pass and let's us pass comma separated parameters.

**Apply** is the same thing as call but we pass the parameters as an array. An array is more useful specially under mathematical circumstances.

**Bind** doesn't invoke the function, it actually creates a copy of the function we are calling and passes the context of an object.

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

With bind, we are creating a new copy of logName and assigning it the execution context of person. So, the value of 'this' will be the correct one rather than the global object.

We can also use call and apply for function borrowing:

```javascript
var person2 = {
    firstname: 'John',
    lastname: 'Doe'
}

console.log(person.getFullName.apply(person2));
```

We can also do function currying. With bind we create a new copy of the function, so what happens if we pass parameters to it?

Giving the parameters sets the permanent values of these parameters when the copy is made.

```javascript
function multiply(a, b) {
    return a*b;
}

var multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(4));
```

So, in this example, the variable 'a' will always be a 2, and the 4 will be the second parameter.
If we passed 2 parameters to the bind, then it means those values would always be the same.

**Function currying**: creating a copy of a function with some preset parameters. Very useful in mathematical situations.

### Lecture 51: Functional programming

We can think and code in terms of functions. It introduces an approach that you can't do in other programming languages that don't have first-class functions.

```javascript
var arr1 = [1,2,3];
console.log(arr1);

var arr2 = [];
for (var i=0; i < arr1.length; i++) {
    arr2.push(arr1[i] * 2);
}

console.log(arr2);
```

But we can do something better with functions, to be more flexible. In this way, we are segmenting our code in a more clean way:

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

Functional programming is what takes Javascript to the next level.

### Lecture 52: Functional programming [part 2]

[Underscore.js](http://underscorejs.org/) library is one of the most famous libraries and it's a great example of functional programming.

If you open the [annotated source code](http://underscorejs.org/docs/underscore.html), you can see the comments on how the functions of undescore.js are implemented.

There's another library called [lodash](https://lodash.com/) which works like underscore. Some people prefer it over underscore, but the first one was underscore (which is always more difficult, to be the first one).

Some things we can do with underscore:

```javascript
// underscore
var arr6 = _.map(arr1, function(item) { return item * 3; });
console.log(arr6);

var arr7 = _.filter([2,3,4,5,6,7], function(item) { return item % 2 === 0; });
console.log(arr7);
```

So, play with underscore, learn how is done and try to build those utilities by yourself.

###End of the first part

This is the end of the first part of the course. I hope you enjoyed and apologies if some of the lectures are not very clear. These are just notes I'm taking while watching the videos. If there's anything that needs a better explanation, feel free to comment and I will improve it.

The next lectures will be about object-oriented javascript and prototypal inheritance. Stay tuned! ;-)
