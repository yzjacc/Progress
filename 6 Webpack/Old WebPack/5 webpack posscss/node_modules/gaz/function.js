/*jshint laxcomma: true, smarttabs: true*/
/*globals module,process,require,exports,__dirname,__filename */
'use strict';
/**
 * Standard utilities for dealing with functions
 * @module gaz/function
 * @author Eric satterwhite
 * @since 0.1.0
 * @requires gaz/lang
 * @requires gaz/array
 */

var mfn = require( './function' )
var toArray = require('./lang').toArray
var append  = require('./array').append
var debug = require('debug')('hive:stdlib:function')
var _wrapDumbFunction
	,enumerables
	,i
	,_extend;

_wrapDumbFunction = function( func ){
	var args, i;
	// covers common cases so we don't
	// have to loop every time
	switch( arguments.length){
		case 0:
			return func();
		case 1:
			return func( arguments[0]);
		case 2:
			return func( arguments[0], arguments[1], arguments[2]);
	}

	args = [];
	for( i=0; i < arguments.length; i++ ){
		args.push( 'arguments[' + i +']');
	}

	return eval('(func(' +args.join(',') + '))');
};

_extend = function( fn, key, value){
	if( typeof key === 'string' ){

		fn[key] = value;
	}
};


/**
 * An empty function
 **/
exports.noop =  function(){ };

/**
 * Returns a function that calls the passed in function under the given context
 * @param {Function} func the function to rebind
 * @param {Object} self the object to bind to
 * @return {Function}  The resulting function
 */
exports.bind =  function(func, self ){
	var args
		,newfn
		,F;

	if( typeof func === 'string'){
		func = self[func];
	}
	args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 2) : null
	,F = function(){};

	if( typeof func === 'function' && typeof func.apply == null){
		func = _wrapDumbFunction( func );
	}

	newfn = function(){
			var length = arguments.length
			,context = self
			,result;

		if( func instanceof newfn ){
			F.prototype = self.prototype;
			context = new F;
		}

		result = ( !args && !length ) ?
						func.call( context ) : // if there are no arguments, jut call it
						func.apply( context , args && length ? args.concat( Array.prototype.slice.apply(arguments)) : args || arguments );
		return context == self ? result : context;
	};


	return newfn;

};

exports.run =  function( fn, scope, args, appendArgs ){
	if( arguments.length === 2 ){
		return fn.apply( scope, arguments );
	}

	var method = fn
		,slice = Array.prototype.slice;

		return function(){
			var callArgs = args || arguments;

			if(appendArgs === true ){
				callArgs = slice.call( arguments, 0 );
				callArgs = callArgs.concat( args );
			}
			return method.apply( scope || window, callArgs );
		};
};

/**
 * Returns a function that allow for afunction to accept either a (key, value )signature or a ({key1:value1, key2:value2}) signature
 * @paran {Function} fn the function to overload
 * @return {Function} a function wrapper around the original function
 */
exports.overloadSetter =  function( fn ){

	return function overloadedSetter( keyOrObj, value ){

		if( typeof keyOrObj !== 'string' ){
			for( var key in keyOrObj ){
				fn.call( this, key, keyOrObj[key ]);
			}
		}else{
			fn.call(this, keyOrObj, value );
		}
		return this;
	};
};

/**
 * similar to overloadSetter, but used for retrieving values. The new function will accept a ( v1, v2,v3 ) signature or a ([v1,v2,v3]) signature
 * @param {Function} fn The function to overload
 * @param {Boolean} plural
 * @returns {Function}
 */
exports.overloadGetter =  function( fn, plural ){
	return function ( a ){
		var ret = {}
			,args
			,_fn = fn;
		if( typeof a != 'string'){
			args = a;
		} else if ( arguments.length > 1 ){
			args = arguments;
		} else if ( plural ){
			args = [a];
		}
		if( args && args.length ){
			for( var x = 0; x< args.length; x ++ ){
				ret[ args[x] ] = _fn.call(_fn,  args[x]);
			}
		} else{
			return _fn.call(_fn, a);
		}

		return ret;
	};
};

exports.simpleGetter =  function( fn ){
	return function overloadedGetter(key) {
	        var me = this;
	        if (arguments.length > 1) {
	            return Array.map.call(arguments, function(name) {
	                return fn.call(me, name);
	            });
	        } else {
	            return fn.call(this, key);
	        }
	    };
};
/**
 * Allows for a setup function to be called before the original function. Setup function must return a function
 * @param {Object} obj The object modify
 * @param {String} key The key in the object to lazify
 */
exports.lazy =  function( obj, key, setup ){
	obj[key] = function(){
		obj[key] = setup.apply( this, arguments );
		obj[key].apply( this, arguments );
	};
};

/**
 * Given a function and some know params, will rturn a function that will be executed with additional arguments appended. Useful when not all parameters are known
 * @param {Function} fn the function to use
 * @param {Mixed} args Arbitrary known arguments
 * @returns {Function} a function bound to a specific scope
 */
exports.partial =  function( fn ){
	var args = toArray( arguments );
	args.shift();
	return exports.bind.apply( this, append([fn, undefined], args));
};

exports.pass = function( fn, args, bind ){
	if( args != null ){
		args = Array.prototype.slice.call( args );
	}
	return function(){
		return fn.apply( bind, args || arguments );
	};
};

exports.periodical =  function( fn, period, bind, args ){
	var id = setInterval( this.pass(fn, args ,bind), period );

	return id;
};

/**
 * return the value of the first successfull function call of the passed in functions
 * @param {...Function} an arbitrarty number of functions to test
 * @return {?Object} the value of the firs function to execute without error, If there is not a successfull attempt, null will be returned
 */
exports.attempt =  function(){
	for (var i = 0, l = arguments.length; i < l; i++){
		try {
			return arguments[i]();
		} catch (e){
			debug("function attempt fail ", e, e.stack)
		}
	}
	return null;
};

exports.intercept = function( orig, fn, bind ){
	if(typeof fn != 'function'){
		return orig;
	}else{
		return function( ){
			var that = this
				,args = arguments;

			fn.target = that;
			fn.method = orig;

			return ( fn.apply( bind, args ) !== false  ? orig.apply( that, args )  : null);
		};
	}
};

/**
 * Ensures a minimum delay before a callback is executed after being called
 * @function
 * @param {Function} callback
 * @param {Number} [delay=4] time in miliseconds to delay function execution
 * @return {Function} a wrapper around the callback which ensures a delay
 **/
exports.awaitDelay    = mfn.awaitDelay

/**
 * Returns a function that composes multiple functions, passing results to the next
 * @function
 * @param {...Function} fn one or more function to compase
 * @return {Function} a function that when executed returns the result all the functions
 **/
exports.compose       = mfn.compose

/**
 * Creates a function that will always return the passed in value
 * @function
 * @param {Mixed} value The value to be returned
 * @return {Mixed} The original value 
 **/
exports.constant      = mfn.constant

/**
 * Creates a function that will delay the execution of fn until after delay milliseconds have elapsed since the last time it was invoked.
 * @function
 * @param {TYPE} fn the function to execut
 * @param {TYPE} delay the amount of time in miliseconds  to delay execution
 * @return {Function} the debounced function wrapper
 **/
exports.debounce      = mfn.debounce

/**
 * A function that returns a callback to call a method on an object
 * @function
 * @param {String} name The name of the method to call
 * @return {Function}
 * @example
var caller = function.func(test);
caller({test:function(){console.log("TEST!")}}) // TEST!` 
 **/
exports.func          = mfn.func


exports.identity      = mfn.identity
exports.makeIterator_ = mfn.makeIterator_
exports.prop          = mfn.prop
exports.timeout       = mfn.timeout

/**
 * creates a function that executes a list of function passing the same aguments to each 
 * @function
 * @param {...Function} fn A function to execute
 * @return {Function} function that will execute all passed in functions
 **/
exports.series        = mfn.series

/**
 * Creates a function that, when executed, will only call the fn function at most once per every interval milliseconds.
 * If the throttled function is invoked more than once during the wait timeout, fn will also be called on the trailing edge of the timeout.
 * Subsequent calls to the throttled function will return the result of the last fn call.
 * @function
 * @param {Function} function to throttle
 * @param {Number} interval The maximum time interval in miliseconds
 * @return {Function} A wrapper function to apply the throttled function
 **/
exports.throttle      = mfn.throttle


/**
 * Executes a function a specified number of times
 * @function
 * @param {!Number} times number of times to call the function
 * @param {Function} function the function to execute
 **/
exports.times         = mfn.times

/**
 * Returns the first function passed as an argument to the second,
 * allowing you to adjust arguments, run code before and after, and
 * conditionally execute the original function
 * @function
 * @see module:gaz/function.partial
 * @param {Function} fn function to execute 
 * @param {Function} wrapper the function to be passed into `fn`
 * @return {Function}
 **/
exports.wrap          = mfn.wrap



