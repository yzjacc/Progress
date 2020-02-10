/*jshint node:true, laxcomma: true, smarttabs: true*/
'use strict';
/**
 * Utilities for generating random peices of data
 * @module gaz/random
 * @author Eric Satterwhite
 * @since 0.1.0
 */
module.exports = require('mout/random');
/**
  * returns a random item from the passed in arguments
  * @function choice
  * @param {...Mixed} any kind of value to make available for selection
  * @memberof module:gaz/random
  * @returns {Mixed}
  * @example
time.choice(1,'a', 3, {} ) // {}
time.choice(1,'a', 3, {} ) // 1
time.choice(1,'a', 3, {} ) // 1
time.choice(1,'a', 3, {} ) // 'a'
time.choice(1,'a', 3, {} ) // {}
  */

/**
 *
 */
  
/**
 * Returns pseudo-random guid (UUID v4)
 * IMPORTANT: it's not totally "safe" since randHex/choice uses Math.random
 * @function guid
 * @memberof module:gaz/random
 * @returns {String} uuid It looks like a uuid v4
 */

/**
 * Returns a number inside of a range
 * @function rand
 * @param {Number} [min=MAXINT] the lower bounds of the range
 * @param {Number} [max=MAXINT] the upper bounds of the range
 * @memberof module:gaz/random
 * @returns {Number} A random Number
 */

/**
 * randomly returns either 0 or 1
 * @function randBit
 * @memberof module:gaz/random
 * @returns {Number}
 */

/**
 * randomly returns true or false
 * @function randBool
 * @memberof module:gaz/random
 * @returns {Boolean}
 */

/**
 * returns a randomly generated hex string of a specifed size
 * @function randHex
 * @param {Number} [size=6] the length of the hex string
 * @memberof module:gaz/random
 * @returns {String}
 */

/**
 * returns a random integer inside a specified range
 * @function randInt
 * @param {Number} [min=MAXINT] the lower bounds of the range
 * @param {Number} [max=MAXINT] the upper bounds of the range
 * @memberof module:gaz/random
 * @returns {Number}
 */

/**
 * returns either 1 or -1
 * @function randSign
 * @memberof module:gaz/random
 * @returns {Number} sign
 */

/**
 * Generates a random string of a specified length
 * @function randString
 * @memberof module:gaz/random
 * @param {Number} [length=8]
 * @param {String} [chars=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ] A string of chars to select from
 * @return {String} a random string
 */

/**
 * Wrapper around Math.random
 * @depricated
 * @function random
 * @memberof module:gaz/random
 * @returns {Number}
 */
