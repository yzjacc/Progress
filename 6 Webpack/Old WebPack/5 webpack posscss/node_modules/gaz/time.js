/*jshint laxcomma: true, smarttabs: true*/
/*globals module,process,require,exports,__dirname,__filename */
'use strict';
/**
 * methods for dealing specifically with time
 * @module gaz/time
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires mout/time
 */

var mtime = require( 'mout/time' )
  ;

/**
 * An object describing a point in time broken into logical units
 * @typedef {Object} module:gaz/time~TimeObject
 * @property {Number} miliseconds number of miliseconds 
 * @property {Number} seconds number of seconds
 * @property {Number} minutes number of minutes
 * @property {Number} hours number of hours
 * @property {Number} days number of days
 */

/**
 * convert on time into a different unit of measure
 * @function convert
 * @memberof module:gaz/time
 * @param {Number} time The amount of time to convert
 * @param {String} source The unit of measure the time is in ( ms, s, m, h, d, w)
 * @param {String} [destination=ms] The unit of measure to return
 * @return {Number} The resulting time after conversion
 * @throws {Error} Error is thrwon when an unrecognized unit of measure is encountered
 * @example time.convert( time.now, 'ms', 'h') // 393170.10331055557
**/  
exports.convert      = mtime.convert

/**
 * return the current time in miliseconds
 * @function now
 * @memberof module:gaz/time
 * @returns {Number} current time
 * @example time.now() // 1415412304203
 **/
exports.now          = mtime.now

/**
 * Parse a current time stamp into an object
 * @function parseMs
 * @memberof module:gaz/time
 * @param {Number} time time in miliseconds
 * @return {module:gaz/time~TimeObject} TimeObject
 * @example time.parseMs( time.now )  // { milliseconds: 277, seconds: 38, minutes: 2, hours: 2, days: 16382 }
 **/
exports.parseMs      = mtime.parseMs

/**
 * converts a timestamp into time string H:MM:SS
 * @function toTimeString
 * @memberof module:gaz/time
 * @param {Number} time a duration of time in miliseconds
 * @example time.toTimeString( 36000 ) // '00:36'
 **/
exports.toTimeString = mtime.toTimeString

