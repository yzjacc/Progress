/*jshint laxcomma: true, smarttabs: true*/
/*globals module,process,require,exports,__dirname,__filename */
'use strict';
/**
 * Number utilities for the standard lib
 * @module gaz/number
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires mout/number
 * @requires mout/math
 */

var mnumber = require('mout/number')
   ,mmath   = require('mout/math')
  ;

/**
 * Ensures a number is with in an allowable range
 * @param {Number} num The number to check
 * @param {Number} min The lower bounds of the limit
 * @param {Number} max The upper bounds of the limit
 * @returns {Number} will return num if it is with the the range, other wise it will return either the min or max
 * @example number = require('gaz/number')
number.limit( 100, 0, 10 ) // 10
number.limit( 8, 0, 10 ) // 8
})
 */
exports.limit = function(num, min, max ){
	return Math.min( max, Math.max( min, num ));
};


/**
 * Rounds a number to a give precision
 * @param {Number} num The number to round
 * @param {Number} precision The number of decimal places to round the number to
 * @returns {Number} The resultant number
 * @example number = require('gaz/number')
number.round( 3.14588930520, 2 ) // 3.15
 */
exports.round = function( num, precision ){
	num = parseFloat( num );
	precision = Math.pow( 10, precision || 0).toFixed( precision < 0 ? -precision:0 );

	return Math.round( num * precision )/precision;
};

/**
 * executes a fucntion X many times passing the number in as a param
 * @param {Number} num The number of times to execute the functoin
 * @param {Function} fn The function to execute will be passed: </br>
 * * count- the count of how many time the function has been executed
 * * num - the original number passed in
 * @param {Object} bind The object in whose context to execute the function
 *
 */
exports.times = function( num, fn, bind ){
	for( var i =0; i< num; i++){
		fn.call( bind, i, num );
	}
};


/**
 * Generates a random number within a given range
 * @param {Number} The lower bounds of the random number
 * @param {Number} The upper bounds of the random number
 * @return {Number} A random Number
 * @example number = require('gaz/number')
number.random( 0, 1000 ) // 845
 */
exports.random = function( min, max ){
	min = min || 0;
	max = max || 1000000;
	return Math.floor( Math.random() * ( max - min + 1 ) + min );
};

/**
 * Attempts to generate a number from a passed in string
 * @param {String} The string to pase
 * @returns {Number} A number if one was created, otherwise it will return null
 * @example number = require('gaz/number')
number.from( "12.43" ) // 12.43
 */
exports.from = function( item ){
	var n = parseFloat( item );

	return isFinite( n ) ? n : null;
};

/**
 * Formats a number
 * @param {Number} num The Number to format
 * @options {Object} options Config object used to format the number</br>
 <ul>
	<li>decimal - decimal separator</li>
	<li>group - thousands separator</li>
	<li>decimals - number of decimals</li>
	<li>precision - number of significant numbers </li>
	<li>scientific - set to false if 1.4e+4 notation should be replaces by 14000</li>
	<li>suffix - string to be prepended</li>
	<li>prefix - string to be appended</li>
 </ul>
 * @returns {String} A string formated as specified
 * @example number = require('gaz/number')
console.log( number.format( 100, {  decimals:2, group:",", decimal:"."} ) ) // 100.00
 */
exports.format = function( num, options ){
	var getOption
		,value
		,negetive
		,prefix
		,suffix
		,index
		,decimal
		,decimals
		,group
		,precision
		,modifyers
		,x
		,key
		,match
		,zeros
		,neg
		,newOutput
		,i;

	getOption = function( key ){
		if( options[key] != null ){
			return options[key];
		}
		return "";
	};



	value     = num;
	negetive  = value < 0;
	decimal   = getOption('decimal');
	precision = getOption('precision');
	group     = getOption( 'group' );
	decimals  = getOption( 'decimals' );
	modifyers = ['prefix', 'suffix'];
	if( negetive ){
		neg = getOption( 'negetive' );
		neg.prefix = '-';
		for( x = 0; x < modifyers.length; x++ ){
			key = modifyers[x];
			if( neg[key] ){
				options[key] = getOption[key] + neg[key];
			}
		}
		value = -value;
	}

	prefix = getOption( 'prefix' );
	suffix = getOption( 'suffix' );

	if( decimals !== '' && decimals >= 0 && decimals <= 20){
		value = value.toFixed( decimals );
	}
	if( precision >= 1 && precision <= 2 ){
		value = (+value).toPrecision(precision);
	}

	value +="";

	if( getOption('scientific')  === false && value.indexOf('e') > -1 ){
		match = value.split('e');
		zeros = +match[1];

		value = match[0].replace('.', '');

		if( zeros < 0 ){
			zeros = -zeros -1;
			index = match[0].indexOf('.');
			if( index > -1 ){
				zeros -= index -1;
				while( zeros--){
					value = '0' + value;
				}

				value ='0.' + value;
			} else {
				index = match[0].lastIndexOf('.');
				if( index > -1 ){
					zeros -= match[0].length - index -1;
					while( zeros--){
						value += '0';
					}
				}
			}
		}
	}

	if( decimal != '.'){
		value = value.replace('.', decimal);
	}

	if (group){
		index = value.lastIndexOf(decimal);
		index = (index > -1) ? index : value.length;
		newOutput = value.substring(index);
		i = index;

		while (i--){
			if ((index - i - 1) % 3 == 0 && i != (index - 1)){
				newOutput = group + newOutput;
			}
			newOutput = value.charAt(i) + newOutput;
		}

		value = newOutput;
	}

	if (prefix) {
		value = prefix + value;
	}

	if (suffix){
		value += suffix;
	}

	return value;
};

/**
 * Short cut to the format function which attempts to format a number as a US Currency
 * @param {Number} num The number to format
 * @param {Number} decimals The number of decimal palces to honor
 * @return {String}
 * @example number = require('gaz/number')
number.formatCurrency( 50.115318568 ) // $50.10
 */
exports.formatCurrency = function( num, decimals ){
	return exports.format( num, {decimal:'.', decimals:decimals || 2, prefix:'$', group:','});
};

/**
 * Short cut to the format function which attempts to format a number as a percentage
 * @param {Number} num The number to format
 * @param {Number} decimals The number of decimal palces to honor
 * @return {String}
 * @example number = require('gaz/number')
number.formatPercentage( 50.115318568, 1 ) // 50.1%
 */
exports.formatPercentage = function( num, decimals ){
	return exports.format( num, {decimal:'.', decimals:decimals || 0, suffix:'%', group:','});
};

exports.getDollars = function(num)
{
    return (num / 100).toFixed(2);
};

exports.setCents = function(num)
{
    return  Math.floor( num * 100 );
};


// General number things
exports.MAX_INT          = mnumber.MAX_INT
exports.MAX_SAFE_INTEGER = mnumber.MAX_SAFE_INTEGER
exports.MAX_UINT         = mnumber.MAX_UINT
exports.MIN_INT          = mnumber.MIN_INT
exports.abbreviate       = mnumber.abbreviate
exports.currencyFormat   = mnumber.currencyFormat
exports.enforcePrecision = mnumber.enforcePrecision
exports.isNaN            = mnumber.isNaN
exports.nth              = mnumber.nth
exports.ordinal          = mnumber.ordinal
exports.pad              = mnumber.pad
exports.rol              = mnumber.rol
exports.ror              = mnumber.ror
exports.sign             = mnumber.sign
exports.toInt            = mnumber.toInt
exports.toUInt           = mnumber.toUInt
exports.toUInt31         = mnumber.toUInt31

// Math specifics
exports.ceil             = mmath.ceil
exports.clamp            = mmath.clamp
exports.countSteps       = mmath.countSteps
exports.floor            = mmath.floor
exports.between          = mmath.inRange
exports.isNear           = mmath.isNear
exports.lerp             = mmath.lerp
exports.loop             = mmath.loop
exports.map              = mmath.map
exports.norm             = mmath.norm
exports.round            = mmath.round
