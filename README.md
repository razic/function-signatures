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
var signatures = new functionSignatures({
  "six numbers": function() {
    return arguments.length === 6 &&
    typeof arguments[0] === 'number' &&
    typeof arguments[1] === 'number' &&
    typeof arguments[2] === 'number' &&
    typeof arguments[3] === 'number' &&
    typeof arguments[4] === 'number' &&
    typeof arguments[5] === 'number';
  },
  "two objects, each with x, y and z properties": function() {
    return arguments.length === 2 &&
    typeof arguments[0].x === 'number' &&
    typeof arguments[0].y === 'number' &&
    typeof arguments[0].z === 'number' &&
    typeof arguments[1].x === 'number' &&
    typeof arguments[1].y === 'number' &&
    typeof arguments[1].z === 'number';
  },
  "two arrays, each having three numbers": function() {
    return arguments.length === 2 &&
    arguments[0] instanceof Array &&
    arguments[1] instanceof Array &&
    arguments[0].length === 3 &&
    arguments[1].length === 3 &&
    typeof arguments[0][0] === 'number' &&
    typeof arguments[0][1] === 'number' &&
    typeof arguments[0][2] === 'number' &&
    typeof arguments[1][0] === 'number' &&
    typeof arguments[1][1] === 'number' &&
    typeof arguments[1][2] === 'number';
    
  },
  "one array with six numbers": function() {
    return arguments.length === 1 &&
    arguments[0] instanceof Array &&
    arguments[0].length === 6 &&
    typeof arguments[0][0] === 'number' &&
    typeof arguments[0][1] === 'number' &&
    typeof arguments[0][2] === 'number' &&
    typeof arguments[0][3] === 'number' &&
    typeof arguments[0][4] === 'number' &&
    typeof arguments[0][5] === 'number';
  }
});

signatures.on("six numbers", function() {;
  this.points.a.x = arguments[0];
  this.points.a.y = arguments[1];
  this.points.a.z = arguments[2];
  this.points.b.x = arguments[3];
  this.points.b.y = arguments[4];
  this.points.b.z = arguments[5];
});

signatures.on("two objects, each with x, y and z properties", function() {
  this.points.a = args[0];
  this.points.b = args[1];
});

signatures.on("two arrays, each having three numbers", function() {
  this.points.a.x = args[0][0];
  this.points.a.y = args[0][1];
  this.points.a.z = args[0][2];
  this.points.b.x = args[1][0];
  this.points.b.y = args[1][1];
  this.points.b.z = args[1][2];
});

signatures.on("one array with six numbers", function() {
  this.points.a.x = args[0][0];
  this.points.a.y = args[0][1];
  this.points.a.z = args[0][2];
  this.points.b.x = args[0][3];
  this.points.b.y = args[0][4];
  this.points.b.z = args[0][5];
});

function euclideanDistance() {
  this.points = { a: {}, b:{} };

  signatures.normalize(arguments);

  var x1 = this.points.a.x;
  var y1 = this.points.a.y;
  var z1 = this.points.a.z;
  var x2 = this.points.b.x;
  var y2 = this.points.b.y;
  var z2 = this.points.b.z;
  var dx = x2 - x1;
  var dy = y2 - y1;
  var dz = z2 - z1;

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy ,2) + Math.pow(dz, 2));
}
```

## License

MIT
