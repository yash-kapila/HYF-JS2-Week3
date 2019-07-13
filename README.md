# HackYourFuture

HYF JavaScript 2 / Week 3 classwork

## Topics

• Hoisting

• Scope

• Callbacks

• Closures

### Hoisting

Hoisting is JavaScript's default behaviour of moving variable and function declarations to the top. The declarations aren't physically moved to the top of a file but are put in memory during the compile phase.

#### Variable Hoisting

_var_

All variable declarations using `var` keyword are hoisted/lifted to the top of their functional/local scope (if declared inside a function) or to the top of their global scope (if declared outside of a function) regardless of where the actual declaration has been made. Important thing to note is that JavaScript only hoists declarations and not initializations. If a variable is declared and initialized after using it, the value will be undefined.

```JavaScript
console.log(num); // undefined
var num = 6;
```

_let_

Hoisting works in a similar way for variables created using `let` keywords i.e the variables are lifted to the top of the block scope in which they are created. However, unlike `var` variables which start with their initial value as `undefined`, `let` variables are not initialized until their definition is evaluated. Accessing the variable before the initialization results in a *ReferenceError*.

```JavaScript
function doSomething() {
  console.log(bar); // undefined
  console.log(foo); // ReferenceError
  var bar = 1;
  let foo = 2;
}
```

#### Function Hoisting

_Function declaration_

Quick recap on how we create functions using function declaration:

```JavaScript
function helloWorld() {
  // statements
  // return;
}
```

In JavaScript, function declarations are hoisted during the compile time. That means we can use these functions even before they are declared. For example,

```JavaScript
hoisted(); // logs "foo" on console

function hoisted() {
  console.log('foo');
}
```

_Function expression_

Quick recap on how we create functions using function declaration:

```JavaScript
const helloWorld = function() {
  // statements
  // return
}
```

In JavaScript, function expressions are **not** hoisted. For example,

```JavaScript
notHoisted(); // notHoisted is not a function

const notHoisted = function() {
  console.log('foo');
}
```

Note: In a case of multiple declarations(variable and function in the same scope) with the same identifier, the hoisting of variables is simply IGNORED.

```JavaScript
console.log(sameIdentifier);  // logs the function and ignores the variable
var sameIdentifier = 10;
function sameIdentifier() {
  console.log('Hello world');
}
```

### Scope

In JavaScript, scope refers to the visibility of variables or functions created in a program. Variables defined in global scope can be accessed and altered anywhere inside the application. Whereas, variables defined in local scope can only be accessed and altered inside the scope they were created.

Global scope:

- Can be a real useful tool or a nightmare.
- Useful in scenarios where we want to export JS modules, use third party libraries like jQuery etc.
- Big risk of causing namespace clashes with multiple variables with same name being created in different places.

Local Scope:

- Think of local scope as any new scope that is created within the global scope.
- Each function written in JavaScript creates a new local scope.
- Variables defined within a function aren't available outside it. They are created when a function starts and are _in a way_ destroyed/hidden when a function ends.

Variables created using the `var` keyword have function scope by default. However, variables created using the `let` or `const` keywords have block scope by default. A block can be seen as a set of statements enclosed in curly brackets({}). For example,

```JavaScript
function testingScope() {
  var x = 10;
  if (x === 10) {
    var y = 20;
    let z = 30;
    console.log('INSIDE IF', x, y, z);
  }
  console.log('OUTSIDE IF', x, y, z);
}

testingScope();
```

### Callbacks

Pardon my imagination but consider a situation where person A wishes to go out for a movie with a friend person B one evening. Person A finds out the time and place and now needs to share it with B. A picks up the phone and tries to call B. Let's say that B is currently busy with some work and can't answer the phone. Person A has now got two options. One option is to stay on the line until B picks up the phone and then share the movie details. Or A could drop a voicemail and ask B to __callback__ once free. Which option do you think makes most sense?

A callback in JavaScript is basically a function(callback) being passed as a parameter to another function which after some point of time would execute the function passed or invoke the callback.

Callbacks were primarily introduced in JavaScript to achieve asynchronous behaviour similar to A waiting for a callback from B rather than waiting on the line forever.

We have already seen/used callbacks in previous weeks when we learnt about DOM manipulation using `addEventListeners` or using array manipulation methods like `map`, `filter`, `forEach` and `reduce`.

Since JavaScript is a single-threaded language, that means our browser can only do one thing at a time. With callbacks, we let browser do other things while we wait for some asynchronous operations to finish afterwards we can let browser comeback/callback and perform the required action.

### Closures

As we saw during Exercise #2 in scoping, an inner function has got access to outer function's variables.

A closure is when inner function remembers the environment in which it was created even after the outer function has returned.

One powerful use of closures is to use the outer function as a factory for creating functions that are somehow related.

```JavaScript
function manufactureCar() {
  const wheels = 4;
  const seats = 5;
  const brand = 'Some Brand';

  return function carColor(color) {
    return {
      wheels,
      seats,
      brand,
      color,
    }
  };
}

const basicCar = manufactureCar();

const redCar = basicCar('red');
const blueCar = basicCar('blue');
const greenCar = basicCar('green');
```

In the above code snippet, we can see that the `carColor` function has still got access to the outer function's properties like `wheels`, `seats` and `brand` even after the function `manufactureCar` has returned. We can then use the `carColor` as a factory to create multiple cards of the same type but with a different color.

Some JavaScript quizzes:

- https://medium.freecodecamp.org/function-hoisting-hoisting-interview-questions-b6f91dbc2be8
- http://perfectionkills.com/javascript-quiz/
- http://dmitry.baranovskiy.com/post/91403200
- http://davidshariff.com/js-quiz/
