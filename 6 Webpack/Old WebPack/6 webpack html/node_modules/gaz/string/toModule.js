/*jshint laxcomma: true, smarttabs: true, node: true*/
'use strict';
/**
 * Given a string, returns the module or item from a module
 * @module gaz/string/toModule
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires path
 * @requires gaz/object/get
 * @requires gaz/string/startsWith
 */

var path = require( 'path' )
  , get  = require('../object').get
  , startsWith = require('mout/string/startsWith')
  , moduleExp = /(^[\.\/]+)?(([\w\\\/\-\_]+)?([\w]+))/g
  ;

/**
 * @param {String} string to a module or module member to resolve
 * @param {Boolean} [resolve] True to force path resoluation. by default, if the string starts with a dot, the path will be resolved
 * @example toModule('express/router.Router') // returns Router class from express router module
 * @example toModule('./packages/gaz/string.startWith') // returns startsWith function from string module with auth path resolution
 * @example toModule('test/module', true) // attempts to require module called test/module relative to the process's CWD
 */
module.exports = function( str, resolve ){
	var matches;

	matches = str.match( moduleExp );

	var mod = matches.shift();
	resolve = resolve == null ?  startsWith( mod, '.' ) ? true : false : !!resolve
	mod = require( resolve ? path.resolve( mod ) : mod );
	return matches.length ? get( mod, matches.join('.') ) : mod

} 
