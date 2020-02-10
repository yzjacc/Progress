/*jshint node:true, laxcomma:true, smarttabs: true, node: true */
'use strict';
/**
 * Converts a string in the format of 12px and converts it into an integer
 * @author Eric Satterwhite
 * @module gaz/string/pxToInt
 * @since 0.1.0
 */
        
/**
 * @param {String} str the string to convert
 * @return {Number}
 */
module.exports = function  pxToInt( str ){
    return toInt( str.split('px')[0], 10);
};
