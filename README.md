# function-signatures

> Flexible argument passing for functions.

> ![DOOM](http://cdn-www.cracked.com/articleimages/dan/weapons2/PHASR2.jpg)

You're a mathematical genius assigned to build devastating high density plasma
rifles to help protect the human race against the alien invasion. You're writing
the software for the gun and need to create a function called
`euclideanDistance` so that the rifle can employ a highly accurate
auto-targeting system. This function will calculate the distance between 2
points in a three-dimensional space and will be called from many places in the
code. For convenience's sake, you'd like to be able to pass arguments in a
few different formats. You decide to use @razic's `function-signatures`
component because you know it's well tested and means you don't have to write
stupid error checking tests for the many different ways you may accidentally
call your function with an incorrect function signature.

## Installation

`component install razic/function-signatures`

## API

```javascript
// Require the function
var functionSignatures = require('function-signatures');

// Initialize a `functionSignatures` object
var signatures = new functionSignatures({
  "six numbers": function(x1, y1, z1, x2, y2, z2) {
    return typeof x1 === 'number' &&
    typeof y1 === 'number' &&
    typeof z1 === 'number' &&
    typeof x2 === 'number' &&
    typeof y2 === 'number' &&
    typeof z2 === 'number';
  },
  "two objects, each with x, y and z properties": function(a, b) {
    return typeof a.x === 'number' &&
    typeof a.y === 'number' &&
    typeof a.z === 'number' &&
    typeof b.x === 'number' &&
    typeof b.y === 'number' &&
    typeof b.z === 'number';
  },
  "two arrays, each having three numbers": function(a, b) {
    return a instanceof Array &&
    b instanceof Array &&
    a.length === 3 &&
    b.length === 3 &&
    typeof a[0] === 'number' &&
    typeof a[1] === 'number' &&
    typeof a[2] === 'number' &&
    typeof b[0] === 'number' &&
    typeof b[1] === 'number' &&
    typeof b[2] === 'number';
    
  },
  "one array with six numbers": function(ab) {
    return ab instanceof Array &&
    ab.length === 6 &&
    typeof ab[0] === 'number' &&
    typeof ab[1] === 'number' &&
    typeof ab[2] === 'number' &&
    typeof ab[3] === 'number' &&
    typeof ab[4] === 'number' &&
    typeof ab[5] === 'number';
  }
});

// Add event handlers to normalize the arguments
signatures.on("six numbers", function(x1, y1, z1, x2, y2, z2) {
  this.x1 = x1;
  this.y1 = y1;
  this.z1 = z1;
  this.x2 = x2;
  this.y2 = y2;
  this.z2 = z2;
});

signatures.on("two objects, each with x, y and z properties", function(a, b) {
  this.x1 = a.x;
  this.y1 = a.y;
  this.z1 = a.z;
  this.x2 = b.x;
  this.y2 = b.y;
  this.z2 = b.z;
});

signatures.on("two arrays, each having three numbers", function(a, b) {
  this.x1 = a[0];
  this.y1 = a[1];
  this.z1 = a[2];
  this.x2 = b[0];
  this.y2 = b[1];
  this.z2 = b[2];
});

signatures.on("one array with six numbers", function(ab) {
  this.x1 = ab[0];
  this.y1 = ab[1];
  this.z1 = ab[2];
  this.x2 = ab[3];
  this.y2 = ab[4];
  this.z2 = ab[5];
});

// Write your method
function euclideanDistance() {
  // Normalize the arguments
  signatures.normalize(arguments);

  // Use the normalized arguments
  var dx = signatures.x2 - signatures.x1;
  var dy = signatures.y2 - signatures.y1;
  var dz = signatures.z2 - signatures.z1;

  // Profit
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy ,2) + Math.pow(dz, 2));
}
```

## License

MIT
