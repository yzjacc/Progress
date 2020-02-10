/*jshint laxcomma:true, smarttabs: true, node:true */
'use strict';
/**
 * Generates a base 36 time based ID
 * @author Eric Satterwhite
 * @module gaz/string/id
 * @since 0.1.0
 */
 
/**
 * Generates a unique ID
 * @returns {String}     
 */
module.exports = function id( base ){
    return (+ new Date()).toString( base || 36 );
};

