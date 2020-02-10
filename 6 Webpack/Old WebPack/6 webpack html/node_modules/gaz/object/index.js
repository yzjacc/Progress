/*jshint laxcomma: true, smarttabs: true*/
/*globals module,process,require,exports,__dirname,__filename */
'use strict';
/**
 * Object based utilities. Mostly a pass through for mout/object
 * This is hear for consistency
 * @module gaz/object
 * @author Eric Satterwhite
 * @since 0.0.1
 * @requires mout/object
 */

var mobject = require('mout/object')
  ;

exports.invert = function( obj ){
	var index = -1,
		props = Object.keys(obj),
		length = props.length,
		result = {};

	while (++index < length) {
	  var key = props[index];
	  result[obj[key]] = key;
	}
	return result;
}
exports.bindAll     = mobject.bindAll
exports.contains    = mobject.contains
exports.deepFillIn  = mobject.deepFillIn
exports.deepMatches = mobject.deepMatches
exports.deepMixIn   = mobject.deepMixIn
exports.equals      = mobject.equals
exports.every       = mobject.every
exports.fillIn      = mobject.fillIn
exports.filter      = mobject.filter
exports.find        = mobject.find
exports.forIn       = mobject.forIn
exports.forOwn      = mobject.forOwn
exports.functions   = mobject.functions
exports.get         = mobject.get
exports.has         = mobject.has
exports.hasOwn      = mobject.hasOwn
exports.keys        = mobject.keys
exports.map         = mobject.map
exports.matches     = mobject.matches
exports.max         = mobject.max
exports.merge       = mobject.merge
exports.min         = mobject.min
exports.mixIn       = mobject.mixIn
exports.namespace   = mobject.namespace
exports.omit        = mobject.omit
exports.pick        = mobject.pick
exports.pluck       = mobject.pluck
exports.reduce      = mobject.reduce
exports.reject      = mobject.reject
exports.result      = mobject.result
exports.set         = mobject.set
exports.size        = mobject.size
exports.some        = mobject.some
exports.unset       = mobject.unset
exports.values      = mobject.values
