/*jshint node:true, laxcomma:true, smarttabs: true, node: test */
'use strict';
/**
 * Based on a count, will return either a specified singluar or plural version of a word. 
 * Will return the singular version if the count is 1.
 * @author Eric Satterwhite
 * @module gaz/string/pluralize
 * @since 0.1.0
 */
        
/**
 * @param {Number} count The count to use as a qualifier
 * @param {String} singular The singular form of the word
 * @param {String} plural The plural form of the word
 * @return {String} either the singular or plural word based on the count
 */
module.exports = function pluralize( count, singular, plural ){
    return ( Math.abs( count ) === 1 ) ? singular : plural;
};
