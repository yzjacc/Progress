/*jshint laxcomma:true, smarttabs: true, node: true */
'use strict';
/**
 * @author Eric Satterwhite
 * @module gaz/string/toInt
 * @since 0.1.0
 */

/**
 * Attempts to convert a string to a number
 * @param {String} str The string to convert
 * @param {Number} base The numeric base to use as a conversion radix. The default is 10
 * @return {Number} The string as an integer
 */
module.exports = function toInt( str, base ){
    var num = parseInt( str, base || 10 );

    return isNaN( num ) ? 0 : num;
};
