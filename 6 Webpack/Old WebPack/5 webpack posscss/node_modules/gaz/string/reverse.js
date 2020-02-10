/*jshint node:true, laxcomma:true, smarttabs: true */
'use strict';

/**
 * Attempts to reverse the characters of a string
 * @author Eric Satterwhite
 * @module gaz/string/reverse
 * @since 0.1.0
 */

/**
 * @param {String} str the string to reverse
 * @return {String}
 */            
module.exports = function reverse( str ){
    var s = String( str || "");
    return s.split('').reverse().join('');
};

