/*jshint node:true, laxcomma: true, smarttabs: true*/
'use strict';
/**
 * Standard set of javascript tools, helpers and utilities
 * @module gaz
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires gaz/exception
 * @requires gaz/class
 * @requires gaz/number
 * @requires gaz/iter
 * @requires gaz/function
 * @requires gaz/time
 * @requires gaz/date
 * @requires gaz/string
 * @requires gaz/typeOf
 * @requires gaz/lang
 * @requires gaz/object
 * @requires gaz/array
 * @requires gaz/querystring
 * @requires gaz/collection
 * @requires mout/math
 */

module.exports = {
	exception   : require('./exception')
  , Class       : require('./class')
  , number      : require('./number')
  , iter        : require('./iter')
  , 'function'  : require('./function')
  , time        : require('./time')
  , date        : require('./date')
  , string      : require('./string')
  , tyoeOf      : require('./typeOf')
  , lang        : require("./lang")
  , object      : require('./object')
  , array       : require('./array')
  , querystring : require('./querystring')
  , collection  : require('./collection')
  , math        : require('mout/math')
}
