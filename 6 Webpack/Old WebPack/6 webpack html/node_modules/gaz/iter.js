/*jshint laxcomma: true, smarttabs: true*/
/*globals module,process,require,exports,__dirname,__filename */
'use strict';
/**
 * Tools for dealing with complex iteration patters.
 * @module gaz/iter
 * @author Eric satterwhite
 * @since 0.1.0
 * @requires events
 * @requires gaz/class
 * @requires gaz/lang
 * @requires gaz/class/options
 */

var Class   = require('./class')
  , events  = require('events')
  , Options = require('./class/options')
  , _kindOf = require('./lang').kindOf
  ;

function kindOf( i ){
	return _kindOf( i ).toLowerCase();
};
function defaultSort( a, b ){
  return a > b
}
var StopIteration
  ,Iterable;

function IterationError( name, message ){
	this.name = name;
	this.message = message
}

IterationError.prototype = new Error();

StopIteration = new IterationError("StopIteration", "End of iteration reached");


function counter( n ){
  n = arguments.length === 0 ? 1 : n;
  return function(){
      return ++n;
  };
}


function isIterable( obj ){
  return ( typeof( obj.next ) === 'function' || typeof( obj.iter ) === 'function' );
}

function _next( iterator ){
  return iterator.next();
}

function _map( fn, itr ){
  var rval = []
      ,length
      ,x      // loop variable
      ,i      // loop variable
      ,j      // loop variable
      ,a      // loop variable
      ,l      // loop variable
      ,args;
  if( arguments.length <= 2) {
      if( !Array.isArray(itr) ){


          itr = exports.toArray( itr );
          if( fn == null){
              return itr;
          }

      }

      if( fn == null ){
          return itr;
      }
      for( a = 0; a< itr.length; a++ ){
          rval.push( fn( itr[a] ) );
      }
  }else{
      if( fn == null ) {
          fn = Array;
      }

      length = null;

      for( x = 1; x < arguments.length; x++ ){
      //  if( is.ArrayLike( arguments[ x ] ) ){
      //      return exports.toArray( exports.imap.apply( null, arguments ) )
      //  } else {
      //      throw new TypeError("arguments not array like")
      //  }

          l = arguments[x].length;
          if( length === null || length  > l ){
              length =Math.max(l, length );
          }
      }

      for( i = 1; i < length; i++){
          args = [];

          for( j = 0; j < arguments.length; j++){
              args.push( arguments[i][j]);
          }
          rval.push( fn.apply( this,args ) );
      }

  }
  return rval;
}
exports.map = _map;
/**
* Iterable Class
* @class
* @author Eric Satterwhite
* @param {Object} options Defines the <strong>next</strong>, <strong>toString</strong>, and <strong>repr</strong> methods
* @borrows module:class.Events.prototype#addEvent as #addEvent
*/
exports.Iterable = Iterable = Class( /** @lends module:iter.Iterable.prototype */{
  inherits:events.EventEmitter,
  mixin:Options,
  options:{
      next:function(){
          throw StopIteration;
      }
      ,repr: function(){
          return "<Iterable: >";
      }
      ,toString: function(){
          return this.repr();
      }
  },

  constructor: function( options ){
      options = options || {};
      this.setOptions( options );

  },
  /**
   * Returns the next object in the iterable. This Method should be overridden to change how the iterable behaves
   * @throws {StopIteration} Thrown when the iterable can not proceed any further
   * @returns {Mixed} obj The next object
   */
  next: function(){
      var n = this.options.next();
      this.emit( 'next', n);
      return n;
  },
  /**
   * Returns the next object in the iterable
   * @returns {String} String Returns a String alternative for this iterable. Used by the log module
   */
  toString:function(){
      return this.options.toString();
  },
  /**
   * Returns the next object in the iterable
   * @returns {String} repr the string representation of this iterable
   */
  repr: function(){
      return this.options.repr();
  }
});

/**
* NamedError used by the Iterable class to signify the iterable has been exhausted
* @typedef {Exception}
*/
exports.StopIteration = StopIteration;

/**
* Returns an iterable that will indefinatly increment starting at the number passed in
* @param {Number} num the starting point for the counter
* @return {Iterable} An iterable counter object
*/
exports.count = function( num ){
  if( num &&  isNaN( parseInt( num, 10 ) )  ){ throw "iter.count only accepts numbers"; }
  num = num ? parseInt( num, 10 ) : 1;

  var it;
  var c = counter( num );
  it = new Iterable( {
      toString: function(){
          return "<Iterable: count >";
      }
      ,next:c
      ,repr: function( ){
          return "iter.count( " + num +" )";
      }
  });

  return it;

};

/**
* endlessly loops over an iterable. when it reaches the end it starts from the start again
* @param {Iterable} item an iterable or an object that can be converted to an iterable
* @return {Iterable}
*/
exports.cycle = function( item ){
  var iter = exports
      ,list = []
      ,iterator = iter.from( item );

  return new Iterable({

      repr: function(){
          return "cycle( x1, x2, x1 ... )";
      }
      ,toString: function(){
          return "<Iterable: cycle " + list.join(', ') + ">";
      }
      ,next: function(){
          var rvalue,x;

          try{
              rvalue = iterator.next();
              list.push( rvalue );
              return rvalue;

          } catch( e ){
              if( e != StopIteration ){
                  throw e;
              }
              // if we hit a StopIteration we want the last item on the list
              if( !list.length ){
                  this.next = function(){
                      throw StopIteration;
                  };
              } else {
                  x = -1;

                  /*
                   * crazy!
                   * dynamically replace the next function to iterate over the cached values.
                   */
                  this.next = function(){
                      // x is defined outside the closure so it will be
                      // whatever we leave it at.
                      x = ( x + 1 ) % list.length;
                      return list[ x ];
                  };
              }
          }

          return this.next();
      } // end next
  });
};
exports.takewhile = function( test, obj ){
  var iter = exports
      ,iterable = iter.from( obj );

  return new Iterable({
      toString: function(){
          return "takewhile( test, object )";
      }
      ,repr: function(){
          return "<Iterable takewhile >";
      }
      ,next: function(){
          var rvalue;
          while( true ){
              rvalue = iterable.next();
              if( !test(rvalue) ){
                  break;
              }
          }
          this.next = (function(){
              return function(){
                  return iterable.next.apply( iterable );
              };
          }());
      }

  });
};

/**
* returns a section of a sequence as an iterable. If only a start value is given, it will be used as the stop value
* @param  {Sequence} seq Object to use as an interable: Array, object, etc
* @param  {Number} [start] position to start iterating from default is 0
* @param  {Number} [stop] the number to stop iterating at
* @param  {Number} [step] the amount by which to move the pointer in the iteratable default is 1
*/
exports.islice= function( seq /*, [start], [stop], [step]*/){
  var  iter = exports
      ,start = 0
      ,stop = 0
      ,step = 1
      ,i = -1
      ,args = Array.prototype.slice.call( arguments );

  seq = iter.from( seq );
  switch( args.length ){
      case 1:

          break;
      case 2:
          stop = args[1];
          break;
      case 3:
          start = args[1];
          stop  = args[2];
          break;
      default:
          start = args[1];
          stop  = args[2];
          step = args[3];
          break;
  }

  return new Iterable({
       repr: function(){
          return "<Iterable: islice >";
       }
      ,toString: function(){
          return "islice( " + [".. ", start, stop, step].join(', ') + ") ";
      }
      ,next: function(){
          if( start >= stop ){
              throw StopIteration;
          }
          var rvalue;

          while( i < start ){
              rvalue = seq.next();
              i++;
          }
          start += step;
          return rvalue;
      }
  });
};

/**
* Executes the passed in function as fn( a , b) where a is the current item in the iterable and b is the next. the function should return something
* @param  {Iterable} iterable An iterable or something that can be converted to an iterable
* @param  {Function} fn the function to execute. it will be passed the current item in the iter and the next
* @return {Object} the result of the reduce function
*/
exports.reduce = function( itr, fn ){
  var x
      ,initial
      ,iter = exports
      ,iterable = iter.from( itr );

  x = 0;
  if( arguments.length < 3 ){
      try {
          initial = iterable.next();
      } catch( e ){
          if( e == StopIteration ){
              throw new TypeError("reduce() of an empty sequence");
          }
          throw e;
      }
      x++;
  }
  try{
      while( true ){
          x = fn( x, iterable.next() );
      }
  } catch( e ){
      if( e != StopIteration ){
          throw e;
      }
  }
  return x;

};

/**
* Returns an iterable than works in a specified range of numbers
* @param  {Number} stop the position to stop at
* @param  {Number} start The starting position. Defaults to 0
* @param  {Number} step the number to increment the the position point by on each iteration
* @return returns the value
**/
exports.range = function( /* [start,] stop[,step]*/){
  var   start = 0
      , stop = 0
      , step =1;


  if( arguments.length == 1 ){
      stop = arguments[0];
  } else if( arguments.length == 2){
      start = arguments[0];
      stop  = arguments[1];
  }else if( arguments.length === 3){
      stop = arguments[0];
      stop = arguments[1];
      step = arguments[2];
  } else{
      throw new TypeError( "range() takes 1, 2, or 3 arguments");
  }

  if( step === 0){
      throw new TypeError('range() step must not b 0');
  }


  return new Iterable({

      // FIXME: This is an infinite loop?
      next:function(){
          if( step > 0 && start >= stop || step <0 && start <= stop ){
              throw StopIteration;
          }

          var rvalue;
          rvalue = start;
          start += stop;

          return start;
      }
      ,repr: function(){
          return "<Iterable: range >";
      }
      ,toString: function(){
          return "range( " + [start, stop, step ].join(" ") + " ... )";
      }
  });
};

/**
* Sums up every numeric object in an iterable
* @param  {Iterable} iter and iterable conaining numbers
* @param  {Number} start the value to start the sum at, Default is 0
*/
exports.sum = function( itr, start ){
  if( start == null ){
      start = 0;
  }
  var x = start
      ,iter = exports
      ,iterable = iter.from( itr );
  try{
      while( true ){
          x += iterable.next();
      }
  } catch( e ){
      if( e != StopIteration ){
          throw e;
      }
  }

  return x;
};
/**
* returns true if func( item ) returns true for every item in the iterable
* @param  {Iterable} iterable an iterable object
* @param  {Function} func the function to test each item. will default the the truth method from the operator module
* @return {Boolean}
*/
exports.every = function( iterable, func ){
  var iter = exports;

  try{
      iter.ifilterfalse( func, iterable).next();
      return false;
  } catch( e ){
      if( e != StopIteration ){
          throw e;
      }
      return true;
  }
};

/**
* Attempts to sort all of the values in an iterable object.
* @param  {Iterable} iterable something that is or can be an iterable that will be sorted
* @param  {Function} cmp function use to compare  two values in the object. Must return 1, 0, or -1. Will use util.compare by default.
* @return {Array} an array sorted according the the compare function
*/
exports.sorted = function( iterable, cmp ){
  var rval = exports.toArray( iterable );
  rval.sort( cmp||defaultSort );
  return rval;
};

/**
* Executes the next function disregaurding the output until it encounters a StopIteration.
* @param  {Iterable} iter the iterable object to exhaust
*/
exports.exhaust = function( itr ){
  var iter = exports
      ,iterable;
  iterable = iter.from( itr );

  while( true ){
      try{
          iterable.next();
      } catch( e ){
          if( e != StopIteration ){
              throw( e );
          }else{
              break;
          }
      }
  }

};

/**
* Repeats the passed in item for a specified number of time. Will repeat indefinatly if not given a limit
* @param  {Object}item the item to repeat
* @param {Number} limit<optional> the number of times to repeat the item. if no limit is given the iterator will never stop
* @return {Iterable} An iterable that simply echos out what ever was passed to it.
*/
exports.repeat = function( item, n ){
  if( n == null ){
      return {
          repr: function(){
              return "<Iterable: repeat >";
          }
          ,toString: function(){
              return "repeat( "+ ( n || "infinite") +" )";
          }
          ,next: function(){
              return item;
          }
      };
  }

  return {
      repr: function(){
          return "<Iterable: repeat >";
      }
      ,toString: function(){
          return "repeat( "+ ( n || "infinite") +" )";
      }
      , next: function(){
          if( n <=0 ){
              throw StopIteration;
          }
          n -= 1;
          return item;
      }
  };
};


/**
* Turns the result of a series of iterators in a single iterator that collects values at the same position
* @param {Mixed} iterables any number of iterable objects
* @returns {Iterator} an {@link module:iter.Iterable} of resultant output
* @example 
var iterable = iter.izip( ["a", "b", "c"], [ 1, 2, 3])
try{
  while( true ){
      iterable.next()
  }
}catch( e ){
  if( e != iter.StopIteration){
      throw e
  }
}

//["a", 1]
//["b", 2]
//["c", 3]
*/
exports.izip =  function( ){
  var iter = exports
      ,iterables = _map( iter.from, arguments );

  return new Iterable({
      repr: function(){
          return "<Iterable: izip ( ... ) >";
      }
      ,toString: function(){
          return this.repr();
      }
      ,next: function(){
          return _map( _next, iterables );
      }
  });

};
exports.ifilter = function( seq, pred ){

  seq = exports.from ( seq );


  if( pred == null ){
      pred = function( a ){
          return !!a;
      };
  }

  return new Iterable({
      repr: function( ){
          return "<Iterable: ifilter( " + exports.toArray( seq ).join(', ') + " )";
      }
      ,toString: function( ){
          return "<Iterable: ifilter( " + exports.toArray( seq ).join(', ') + " )";
      }
      ,next: function(){
          while( true ){
              var rval = seq.next();
              if( pred( rval ) ){
                  return rval;
              }
          }

          return undefined;
      }
  });
};

exports.ifilterfalse = function( seq, pred ){
  var iter = exports;
  seq = iter.from ( seq );


  if( pred == null ){
      pred = function( a ){
          return !!a;
      };
  }

  return new Iterable({
      repr: function( ){
          return "<Iterable: ifilter( " + iter.toArray( seq ).join(', ') + " )";
      }
      ,toString: function( ){
          return "<Iterable: ifilter( " + iter.toArray( seq ).join(', ') + " )";
      }
      ,next: function(){
          while( true ){
              var rval = seq.next();
              if( !pred( rval ) ){
                  return rval;
              }
          }

          return undefined;
      }
  });
};

/**
* Chains any number of iterables together
* @param {Mixed} iterables Any of object that can be used as an iterable
* @return {Itreable} An iterable whos next function calls the next function of each iterable, in the order they were passed
* @example 
var chain = iter.chain( [1,2], [3,4], {key1:5, key2:6} )
try{
  while( true ){
      log.log( chain.next() )
  }

}catch( e ){
  if( e != iter.StopIteration ){
      throw e
  }
}
// outputs:1, 2, 4, 5, 6
*/
exports.chain = function( ){
  if( arguments.length == 1){
      return exports.from( arguments[0] );
  }

  var argiter = _map( exports.from, arguments );

  return new Iterable({
      repr: function(){}
      ,toString: function(){}
      ,next: function(){

          while( argiter.length ){
              try{
                  return argiter[0].next();
              } catch( e ){
                  if( e != StopIteration ){
                      throw e;
                  }
                  argiter.shift();
              }
          }

          throw StopIteration;
      }
  });
};
/**
* Attempts to execute a function against each item in the iterable
* @param  {Iterable} iter the iterable to step through
* @param  {Function} fn the function to execute at each step in the iterable
* @param  {Object} [scope] the  object context to run the function in.
*/
exports.forEach = function( itr, fn, scope ){
  var iter;

  iter = exports;
  if(Array.isArray( itr ) && !isIterable( itr )){
      try{
          for(var x = 0; x < itr.length; x++){
              fn.call(scope, itr[x], x, itr );
          }
      } catch( e ){
          if( e != StopIteration ){
              throw e;
          }
      }
  }else {
      iter.exhaust( iter.imap(fn, itr ) );
  }
};

exports.imap = function( fn ){
  var args = Array.prototype.slice.call( arguments );
  args.shift();
  args.unshift( function(){
      return exports.from( Array.prototype.slice.call( arguments ) );
  });
  var iterables = _map.apply( this,  args  );


  return new Iterable({
      repr: function( ){
          return "<Iterable: imap( ... ) >";
      }
      ,toString: function( ){
          return "<iterable: imap( ... ) >";
      }
      ,next: function( ){

          return fn.apply( this, _map(_next, iterables ) );
      }
  });
};

/**
* Converts an iterable into an Array
* @param {Iterable} iterable An instance of Iterable
* @return {Array}
*/
exports.toArray = function( iterable ){
  var rvalue
      ,x
      ,iter = exports
      ,tmp;

  rvalue = [];
  if( iterable instanceof Array ){
      return iterable.slice();
  }

  if( typeof iterable == 'function'
      && !( iterable instanceof Function )
      && typeof  iterable.length == 'number' ){

      for( x = 0; x < iterable.length; x++ ){
          rvalue.push( iterable[ x ] );
      }
      return rvalue;
  } // end if

  iterable = iter.from( iterable );
  try {
      while( true ){

          tmp = iterable.next();
          rvalue.push( tmp );
      }
  } catch( e ){
          if( e != StopIteration ){
              throw e;
          }
          return rvalue;
  }

  return [];
};

/**
* Normalizes an array or object into an iterable
* @param {Array | Object} item the item to generate an iterable from
* @return {Iterable} If passed an array, it will iterate over each item. If passed an object it will iterate over the keys.
*/
exports.from = function( obj ){
  if( isIterable( obj ) ){
      return obj;
  }

  switch( kindOf( obj ) ){
      case "arguments":
          return exports.from( arguments );

      case "array":
          return (function(){
              var arr = obj
                  ,position = 0;

                  return new Iterable({
                      next: function(){


                          if( position < arr.length ){
                              return arr[ position++ ];
                          } else{
                              throw StopIteration;
                          }
                      }
                      ,repr: function(){
                          return "<Iterable: " + arr.join(", ") + ">";
                      }
                  });

          }());

      case "object":
          return(function(){
              var o = obj
                  ,position = 0
                  ,keys = Object.keys( o );

              return new Iterable({
                  next: function(){

                      if( position < keys.length ){
                          return o[ keys[position++]  ];
                      } else{
                          throw StopIteration;
                      }
                  }
                  ,repr: function( ){
                      return "<Iterable: " + keys.join(', ') + ">";
                  }
              });
          }());
      default:
          return new Iterable({});
  }
};
