/*jshint laxcomma: true, smarttabs: true*/
/*globals module,process,require,exports,__dirname,__filename */
'use strict';
/**
 * Module for consistent and smart logical operations and comparisons
 * @module gaz/operator
 * @author Eric Satterwhite
 * @since 0.2.0
 * requires gaz/compare
 */
var compare = require('./compare')
/**
 * returns true if the value is truthy
 * @param  {Object} value  object to inspect
 * @return {Boolean}
 */
exports.truth = function( a ){
	return !!a;
};

/**
 * Returns the logical opposite of the value passed in
 * @param {Object} value a value that has a truthy value
 * @return {Boolean}
 */
exports.logicalnot = function( a ){
	return !a;
};

/**
 * A noop function that passes the value straight through
 * @param  {Object} value the item to inspect
 * @return {Object}
 */
exports.identity = function( a ){
	return a;
};

/**
 * returns the not operator on each bit of the passed in value
 * @param  {Object} value the object to manipulate
 * @return {Number}
 */
exports.bitnot = function( a ){
	return ~a;
};

/**
 * Returns the negetive of the passed in value
 * @param num {Number}
 * @return {Number} the negetive value of the passed in value
 */
exports.neg = function( a ){
	return -(a);
};

/**
 * Performs an add operation on the passed in values
 * @param  {Number} value1
 * @param {Number} value2
 * @return {Number} the sum of the passed in values
 */
exports.add = function( a,b ){
	return a + b;
};

/**
 * Performs a subtraction operation on the passed in values
 * @param  {Number} value1
 * @param {Number} value2
 * @return {Number} the difference of the two values
 */
exports.sub = function( a,b ){
	return a - b;
};

/**
 * performs a division operation on the passed in values
 * @param  {Number} value1
 * @param {Number} value2
 * @return {Number} the quotient of the passed in values
 */
exports.div = function( a, b ){
	return a / b;
};

/**
 * performs a modulo operion on the passed in values
 * @param  {number} value1
 * @param {Number} value2
 * @return {Number} the remainder of the problem
 */
exports.mod = function( a, b ){
	return a % b;
};

/**
 * returns the product of two values
 * @param  {Number} value1
 * @param {Number} value2
 * @return {Number} the product of value1 and value 2
 */
exports.multi = function( a, b ){
	return a * b;
};

/**
 * returns the & bitwise operation on the two numbers
 * @param {Object} value1
 * @param {Object} value2
 * @return {Number} the result of the bitwise operation
 */
exports.and = function( a, b ){
	return a & b;
};

/**
 * performs a bitwise or operation on the passed in values
 * @param {Object} value1
 * @param {Object} value2
 * @return {Number} the result of the operation
 */
exports.or = function( a, b ){
	return a | b;
};

/**
 * returns a one in each bit position for which the corresponding bits of either but not both operands are ones
 * @param {Number} value1
 * @param {Number} value2
 * @return {Number} the result of the ^ operation
 */
exports.xor = function( a, b ){
	return a ^ b;
};

/**
 * shifts value1 in a binary representation value2 to the left, shifting in zeros from the left
 * @param {Number} value1
 * @param {Number} value2
 * @return {Number}
 */
exports.bitlshift = function( a, b ){
	return a << b;
};

/**
 * shifts value1 in binary representation to the right discarding bits shifted off
 * @param {Number} value1
 * @param {Number} value2
 * @return {Number} the result of the operation
 */
exports.bitrshift = function( a, b ){
	return a >> b;
};

/**
 * performs a zero-fill right shift >>>
 * Shifts value1 in binary representation bits the the right, discarding bits shifted off and shifting in zeros from the left
 * @param {Number} value1
 * @param {Number} value2
 * @return {number} th result of the operation
 */
exports.bitzrshift = function( a, b ){
	return a >>> b;
};

/**
 * Performs a fuzzy equality check on the passed in values
 * @param {Object} value1
 * @param {Object} value2
 * @return {Boolean} true of the two values are equal
 */
exports.eq = function( a, b ){
	return a == b;
};

/**
 * performs an inverse fuzzy check on the passed in values
 * @param {Object} value1
 * @param {Object} value2
 * @return {Boolean} true if the 2 values are not equal
 */
exports.neq = function( a, b ){
	return a != b;
};

/**
 * Checks to see if value1 is greater than value2
 * @param {Number} value1
 * @param {Number} value2
 * @return {Boolean} true if value1 is greater than value 2
 */
exports.gt = function( a, b){
	return a > b;
};

/**
 * Checks to see if value1 is greater than value2
 * @param {Number} value1
 * @param {Number} value2
 * @return {Boolean} true if value1 is greater than value 2
 */
exports.gte = function( a, b){
	return a >= b;
};


/**
 * Checks to see if value1 is less than value2
 * @param {Number} value1
 * @param {Number} value2
 * @return {Boolean} true if value1 is less than value 2
 */
exports.lt = function( a, b ){
	return a < b;
};

/**
 * Checks to see if value1 is less than or equal to value2
 * @param {Number} value1
 * @param {Number} value2
 * @return {Boolean} true if value1 is less to value 2
 */
exports.lte = function( a, b ){
	return a <= b;
};

/**
 * Checks to see if the values and types of the two values ar the same
 * @param {Number} value1
 * @param {Number} value2
 * @return {Boolean} true if value1 and value2 are equal
 */
exports.steq = function( a, b ){
	return a === b;
};

/**
 * Check if the two values and types are not the same
 * @param {Number} value1
 * @param {Number} value2
 * @return {Boolean} true if  types of the values are not the same
 */
exports.stneq = function( a, b ){
	return a !== b;
};

/**
 * performs a logical or operation on the two values
 * @param {Object} value1
 * @param {Object} value2
 * @return will return value1 if it is truthy, else will return value2
 */
exports.logor = function( a, b ){
	return  a || b ;
};

/**
 * Performs a logical and on the two values
 * @param {Object} value1
 * @param {Object} value2
 * @return {Mixed} returns the first non truthy value or the last truthy value
 */
exports.logand = function( a, b ){
	return  a && b ;
};

/**
* Checks to see if value2 is in value1
* @param {Object} value1
* @param {Object} value2
* @return {Boolean} returns true if value2 is found in value1
*/
exports.contains = function( a, b ){
	return b in a;
};

/**
 * compares the two values using smart comparisons
 * @param {Object} value1
 * @param {Object} value2
 * @return {Boolean} returns true if the values are equal
 * @example braveheart([ 'operator' ], function( operator ){
operator.compeq( [], [] ) // true
operator.compeq( [], [ 1 ] ) // false
})
 */
exports.compeq = function( a, b ){
	return compare( a, b ) === 0;
};

/**
 * compares the two values using smart compare
 * @param {Object} value1
 * @param {Object} value2
 * @return {Boolean} returns true if the two values are not equal to eachother
 * @example braveheart([ 'operator' ], function( operator ){
operator.compneq( [], [] ) // false
operator.compneq( [], [ 1 ] ) // true
})
 */
exports.compneq = function( a, b ){
	return compare( a, b ) !== 0;
};

/**
 * compares the two values using smart compare
 * @param {Object} value1
 * @param {Object} value2
 * @return {Boolean} returns true if value1 is greater than value2 to eachother
 */
exports.compgt = function( a, b ){
	return compare( a, b ) === 1;
};

/**
 * compares the two values using smart compare
 * @param {Object} value1
 * @param {Object} value2
 * @return {Boolean} returns true value1 is greater or equal to value2
 * @example braveheart([ 'operator' ], function( operator ){
operator.compgte( [], [] ) // true
operator.compgte( [ 1 ], [] ) // true
operator.compgte( 12, 33 ) // false
operator.compgte( "", "h" ) // false
})
 */
exports.compgte = function( a, b ){
	return compare( a, b ) != -1;
};

/**
 * compares the two values using smart compare
 * @param {Object} value1
 * @param {Object} value2
 * @return {Boolean} returns true if value1 is less than value2
 * @example braveheart([ 'operator' ], function( operator ){
operator.complt( [], [] ) // false
operator.complt( [ 1 ], [] ) // false
operator.complt( 12, 33 ) // true
operator.complt( "", "h" ) // true
})
 */
exports.complt = function( a, b ){
	return compare( a, b ) == -1;
};
/**
 * compares the two values using smart compare
 * @param {Object} value1
 * @param {Object} value2
 * @return {Boolean} returns true if value1 is less than or equal to value2
 */
exports.complte = function( a, b){
	return compare( a, b ) != 1;
};

/**
 * Allows you to define a specialized way to extract properties of objects
 * @param {mixed} any number of arguments that represent the item to extract. If more than one is specifiecd the getter will return arrays.
 * @returns {Function} getter A function, which when passed the object to inspect, returns the item from those objects as specified.
 * @example braveheart(['operator'], function( operator ){
var getter = operator.itemgetter( "help", "data");

console.log( getter({"help":12}, {help:55, data:"stuff"} ) )
}); // [12, "stuff"]
* @example braveheart(['operator'], function( operator ){
var getter = operator.itemgetter( 0,3, 6 );

console.log( getter("hello world " ) )
}); // ["h", "l", "w"]
* @example braveheart(['operator', 'iter'], function( operator, iter ){
var getter = operator.itemgetter( 1, 3);
data = [ [1,2,5,7],[2,3,4,5],[5,4,3,2]  ]
console.log( iter.map( getter, data ) )
}); // [ [2,7], [3,5], [4,2] ]
*/
exports.itemgetter = function( /*[,args]*/){
	var item
		,fn
		,outterargs;

	outterargs = Array.prototype.slice.call( arguments, 0 );

	if( arguments.length == 1){
		item = outterargs[0];
		fn = function( obj ){
			if( typeof item === 'function' ){
				return item ( obj );
			}
			return obj[item];
		};
	} else {
		fn = function( obj ){
			 var rvalue = [];
			 var innerargs = Array.prototype.slice.call( arguments , 0);
			 var arg = innerargs.shift();
			 var current;
			 for( var x = 0; x < outterargs.length; x++ ){
				current = arg[ outterargs.length === 1 ? outterargs[0] : outterargs[x] ];
				if( typeof current === 'function' ){
					rvalue.push( current( arg) );
				}
				rvalue.push( current );
				arg = innerargs.length ? innerargs.shift() : arg;
			}
			return rvalue;
		};
	}

	return fn;
};
