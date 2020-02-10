Class
=====

The `class` module provides a familiar way implement build object orientated design patterns with out any additional modules, add-ons, or language extensions. It is nothing more than a top level function that returns a new function constructor function. The `class` function accepts a single object which is used to build out a prototype as well as implement internal inheritance features.

```js
var Class = require('gaz/class')
var Shape = new Class({
	constructor: function( h, w ){
		this.height = h;
		this.width = w;
	}

})

var square = new Shape( 5,5 );
square.area() // 25
``` 

## Inheritance
There are a numbe of simple inheritance pathways which allow developers to build and compose rich, complex data structures with minimal effort. This promotes modular, object orientated design and code re-use 


### Direct Inheritance

The most traditional, `child-of` or `is-a` type of inheritance is achieved through the `inherits` keyword. The value of the inherits key will serve and your class constructor

```js
var Square = new Class({
	inherits: Shape
	,constructor: function( size ){
		this.height = size;
		this.width = size;
	}
})

var square = new Square( 5 );
square.area() // 25 
```

### Mixin Inheritance

Mixins allow for inheritance through composition where methods and properties are copied from one or many classes to the parent. Typically, Mixin classes do not have a constructor function, have a small, focused set of functionality and can stand on their own. The class libraries provide two common mixin classes, `Options` for providing a simple means of defining overridable configuration with defaults, and `Parent` which enables for a much more straight forward way of calling functions from the parent class.

```js
var Class = require('gaz/class')
  , Options = require('gaz/class/options')
  , Parent = require('gaz/class/parent');

var Shape = new Class({
	mixin:[ Options, Parent ]
	, options:{
		height: 5
		, width: 5
	}
	, constructor: function( options ){
			this.setOptions( options )
	}	
	, area: function area( ){
		return this.options.height * this.options.width
	}
})

var Qube = new Class({
	inherits: Shape
	,options:{
	    size:2
	}
	, constructor: function( options ){
		this.parent('constructor', options );
		this.setOptions({
			height: this.options.size
		    ,width: this.options.size
		    ,depth: this.options.size
		})
	}
	, volume: function(){
		return this.area() * this.options.depth;
	}
});

var q = new Qube({
	size: 10
});

console.log( q.volume()) // 1000
```

### Mutation

Mutation is a way to modify the structure of a class at the time of definition. Mutators manifest as keys on a class. If the value of the key is a function, it is executed as the class is being defined, rather than at instanciation time. The return value of that function replaces the original value of the key. This can be useful for encaplulating complex behavior in a modular way. And because functions are executed an definition time, perforance is not penalized for creating a large number of objects.
 

```js
var Class = require('gaz/class')
Class.defineMutator('double', function( value ){
	console.log('doubling')
	return typeof value == 'number' ? value * 2 : null
});

var Mutated = new Class({
	double:10
});
// doubling

var m = new Mutated();
m.double // 20 
```

