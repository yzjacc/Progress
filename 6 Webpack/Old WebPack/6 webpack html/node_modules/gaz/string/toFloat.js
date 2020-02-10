/*jshint laxcomma:true, node:true, smarttabs: true */
'use strict';

/**
 * Attempts to convert a string to a floating point number
 * @author Eric Satterwhite
 * @module gaz/string/toFloat
 * @since 0.1.0
 */
 
/**
 * @param {String} str The string to convert
 * @return {Number}
 */     
module.exports = function toFloat( str ){
    var num = parseFloat( str );

    return isNaN( num ) ? 0.0 : num;
};



