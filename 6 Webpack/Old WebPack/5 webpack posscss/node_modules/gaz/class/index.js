/*jshint node:true, laxcomma:true, smarttabs: true */
'use strict';
/**
 * Prototypal inheritance made easy - A slight modification on the prime libs
 Class
=====

The `class` module provides a familiar way implement build object orientated design patterns with out any additional modules, add-ons, or language extensions. It is nothing more than a top level function that returns a new function constructor function. The `class` function accepts a single object which is used to build out a prototype as well as implement internal inheritance features.

```js
var Class = require('.//class')
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
var Class = require('.//class')
  , Options = require('.//class/options')
  , Parent = require('.//class/parent');

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
var Class = require('.//class')
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


 * @module gaz/class
 * @author Eric Satterwhite
 * @requires gaz/object
 * @requires gaz/lang
 * @requires gaz/typeOf
 * @tutorial class
 **/
var hasOwn   = require('../object').hasOwn
  , mixIn    = require('../object').mixIn
  , merge    = require('../object').merge
  , create   = require('../lang').createObject
  , clone    = require('../lang').clone
  , isObject = require('../lang').isObject
  , kindOf   = require('../lang').kindOf
  , type     = require('../typeOf')
  , mutators = {

    };

var hasDescriptors = true

try {
    Object.defineProperty({}, "~", {})
    Object.getOwnPropertyDescriptor({}, "~")
} catch (e){
    hasDescriptors = false
}

// we only need to be able to implement "toString" and "valueOf" in IE < 9
var hasEnumBug = !({valueOf: 0}).propertyIsEnumerable("valueOf"),
    buggy      = ["toString", "valueOf"]

var verbs = /^constructor|inherits|mixin$/
// reset function to reset objects and arrays in the prototype
var reset = function(object){
    for (var key in object){
        var value = object[key];
        switch (type(value)){
            case 'object': 
                object[key] = reset( create(value) ); 
                break;
            case 'array': 
                object[key] = clone(value);
                break;
        }
    }
    return object;
};

var implement = function(proto){
    var prototype = this.prototype;

    for (var key in proto){
        if (key.match(verbs)){
            continue
        }

        if( mutators.hasOwnProperty( key ) ){
            var mutator = mutators[ key ]
            var value = proto[ key ];

            value = mutator.call( this, value );
            
            if( !value ){
               continue;
            }

            switch( kindOf( value ) ){
                case 'function':
                    proto[ key ] = value;
                    break
                case 'object':
                    merge( proto, object );
                    break;
                default:
                    proto[key] = clone( value );
            }
        }

        if (hasDescriptors){
            var descriptor = Object.getOwnPropertyDescriptor(proto, key);
            if (descriptor){
                Object.defineProperty(prototype, key, descriptor);
                continue;
            }
        }
        prototype[key] = proto[key];
    }

    if (hasEnumBug) for (var i = 0; (key = buggy[i]); i++){
        var value = proto[key];
        if (value !== Object.prototype[key]){
            prototype[key] = value;
        }
    }

    return this
}
/**
 * Object class mixing which provides a standard way of defining configuration options on a class instance
 * @constructor
 * @alias module:gaz/class
 * @param {Object} prototype an Object representing the prototype of the Class
 */
var prime = function(proto){

    if (kindOf(proto) === "Function") proto = {constructor: proto}

    var superprime = proto.inherits

    // if our nice proto object has no own constructor property
    // then we proceed using a ghosting constructor that all it does is
    // call the parent's constructor if it has a superprime, else an empty constructor
    // proto.constructor becomes the effective constructor
    var constructor = (hasOwn(proto, "constructor")) ? proto.constructor : (superprime) ? function(){
        return superprime.apply(this, arguments)
    } : function(){}

    if (superprime){

        mixIn(constructor, superprime)

        var superproto = superprime.prototype
        // inherit from superprime
        var cproto = constructor.prototype = create(superproto)

        // setting constructor.parent to superprime.prototype
        // because it's the shortest possible absolute reference
        constructor.parent = superproto
        cproto.constructor = constructor
        cproto.$class = constructor
        isObject(proto.options) && isObject(superproto.options) && (proto.options = merge(clone(superproto.options), proto.options));
    }

    if (!constructor.implement) constructor.implement = implement

    var mixins = proto.mixin
    if (mixins){
        if (kindOf(mixins) !== "Array") mixins = [mixins]
        for (var i = 0; i < mixins.length; i++) constructor.implement(create(mixins[i].prototype))
    }

    // implement proto and return constructor
    return constructor.implement(proto)
}


var Class = prime({
    constructor: function(){
        reset(this)
    }
});

/**
 * Registers a Custom Class mutator
 * @static
 * @function defineMutator
 * @memberof module:gaz/class
 * @param {String} name The name of the mutator
 * @param {Function} fn The function to use as the class mutator
 **/
prime.defineMutator = function(name ,fn ){
    mutators[ name ] = fn;
};

module.exports = prime;
