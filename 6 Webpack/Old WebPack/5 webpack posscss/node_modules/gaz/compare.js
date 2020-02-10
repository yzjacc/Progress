/*jshint laxcomma: true, smarttabs: true*/
/*globals module,process,require,exports,__dirname,__filename */
'use strict';
/**
 * Module for performing comparisons of complex objects
 * @module gaz/compare
 * @author Eric Satterwhite
 * @since 0.2.0
 * @requires gaz/class
 * @requires gaze/typeOf
 */

var Class = require( './class' )
  , typeOf = require( './typeOf' )
  , Exception = require("./exception")
  ;

var typeOf
	,Registry
	,ComparatorRegistry
	,compareDateLike
	,compareArrayLike
	,NotFound
	;


/**
 * Place to hold comapitor function pairs
 * @inner
 * @class module:gaz/compare.Registry
 */
Registry = new Class({
	constructor:function( ){
		this.pairs = [];
	},

	/**
	 * registers a check / wrap pair under a name
	 * @param {Object} config {name:str, check:fn, wrap:fn, override:bool }
	 */
	register: function register( config ){
		if( !!config.override ){
			this.pairs.unshift(config);
		} else {
			this.pairs.push( config );
		}
	},

	/**
	 * attempts if the check function passes will return the result of the wrap function
	 * @param {Object} config a config object
	 * @param {String} config.name name of the comaparing pair
	 * @param {Function} config.check a function which, givent two objects, will return true if they are comparable
	 * @param {Function} config.wrap function to perform the comparison. should return 0 if object are equal, -1 if a < b, and 1 if a > b.
	 */
	match: function match( ){
		var x
		,pair
		;

		for( x = 0; x < this.pairs.length; x++ ){
			pair = this.pairs[ x ];
			if( pair.check.apply( this, arguments) ){
				return pair.wrap.apply( this, arguments);
			}
		}
		throw new Exceptions({name:'NotFound',message:"No comparision match found", code:900})
	},

	/**
	 * Un registers a check / wrap paif for a given name
	 * @param {String} name removes the regisered pair for the given name
	 */
	unregister: function unregister( name ){
		var pair
			,x;

		for( x = 0; x < this.paris.length; x++){
			pair = this.pairs[ x ];
			if( pair.name == name){
				this.pairs.splice( x, 1);
				return true;
			}
		}
		return false;
	}
})


function dateLike( ){
	var args = Array.prototype.slice.call ( arguments )
		,x;
	for( x = 0; x < args.length; x ++ ){
		if( typeOf( args[ x ]) !== 'date'){
			return false;
		}
	}
	return true;
}

function arrayLike(  ){

	var args
		,x;
	args = Array.prototype.slice.call ( arguments );


	for( x = 0; x < args.length; x ++ ){
		if( typeOf( args[ x ]) == 'date'){
			return false;
		}
	}
	return true;
}

compareDateLike = function( a,b ){
	return module.exports(a.getTime(), b.getTime());
};

compareArrayLike = function( a, b ){
	var len
		,rvalue
		,cmp
		,point;

	len = a.length;
	rvalue = 0;

	if( len > b.length ){
		rvalue = 1;
		len = b.length;
	} else if ( len < b.length ){
		rvalue = -1;
	} else {

		for( point = 0; point < len; point++ ){
			cmp =exports.compare( a[ point ], b[ point ]);
			if( cmp ) {
				return cmp;
			}
		}
	}
	return rvalue;

};

/**
 * Holds currently registerd ( arrayLike & dateLike )
 */
ComparatorRegistry = new Registry();

ComparatorRegistry.register({name:"dateLike", check:dateLike, wrap:compareDateLike});
ComparatorRegistry.register({name:"arrayLike", check:arrayLike, wrap:compareArrayLike});

/**
 * Compares object that are difficult to compare, ( arrays, and Dates by default )
 * @param {Object} itemA An item to compare
 * @param {Object} itemB An item that is of the same type as itemA
 * @returns 1 if itemA is greater that itemB, 0 if the are equal, and -1 if itemA is less than itemB
 * @throws {TypeError} If it can not figure out a way to compare the objects
 */
module.exports = function compare( a, b ){
	if( a == b ){
		return 0;
	}

	var aIsNull
		,bIsNull
		,primitives;

	primitives = {'boolean':true, 'number':true, 'string':true};
	aIsNull = typeof a == null;
	bIsNull = typeof b == null;

	if( !(typeof( a ) in primitives && typeof( b ) in primitives )){
		try{
			return ComparatorRegistry.match(a, b);
		} catch( e ){
			if( e.code != 900 ){
				throw e;
			}
		}
	}

	if( a < b ){
		return -1;
	}if ( a > b){
		return 1;
	}
	// Oh Shit! I don't know how to compare that shit!
	throw new TypeError("Object Not Comparable");
};
