/*jshint node:true, laxcomma:true, smarttabs: true */
'use strict';
/**
 * @author Eric Satterwhite
 * @module gaz/string/clean
 */
 var trim = require('mout/string/trim')
/**
 * Removes extraneous white space from a string
 * @param {String} str The string clean
 * @returns {String}
 * @example
string.clean( " this     is a lame      sentance") // this is a lame sentance
 */
module.exports = function clean(str) {
    var s = String( str );
    return trim((s).replace(/\s+/g, ' '));
};

