/*jshint node:true, laxcomma:true, smarttabs: true */
'use strict';
/**
 * Splits a string on a specified separator and returns a limited subset of pieces
 * @author Eric Satterwhite
 * @module gaz/string/split
 * @since 0.1.0
 */
        
/**
 * @param {String} str The string to split
 * @param {String} separatar The separator to split the string on. Defaults to newline
 * @param {Number} max The maximum number of string peices to return. If not specified, all peices are returned
 **/     
module.exports =  function split(str, separator, max) {
    if (!str) {
        return str;
    }
    var s = String( str );
    separator = separator || "\n";

    var bits = s.split(separator);
    if (max == null || max >= bits.length - 1) {
        return bits;
    }

    bits.splice(max, bits.length, bits.slice(max, bits.length).join(separator));
    return bits;
};
