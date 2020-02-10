/*jshint laxcomma: true, smarttabs: true, node:true */
'use strict';
/**
 * Collection of url utilities for parseing and creating valid urls
 * @module gaz/url
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires url
 * @requires urljoin
 * @requires qs
 * @requires querystring
 */

var url         = require( 'url' )        // url
  , urljoin     = require( 'url-join' )    // urljoin
  , qs          = require( 'qs' )         // qs
  , querystring = require( 'querystring' ) // querystring
  ;


/**
 * Joins fragements of a uri into a single, valid url
 * @static
 * @method join
 * @param {...String} fragment individual parts of a uri to join togenter
 * @example
 url.join('\\static', '\\css', 'index.css');
 // /static/css/index.css
 
 url.join("http://yanni4night.com", 'static/css', '../index', 'main.css');
 // http://yanni4night.com/static/index/main.css
 
 url.join("http://yanni4night.com/", '/static/css/', '/main.css');
 // http://yanni4night.com/static/css/main.css
 
 url.join("http://yanni4night.com?aa=60", 'static/css', '', 'main.css');
 // http://yanni4night.com/static/css/main.css?aa=60
 
 url.join("http://yanni4night.com", 'static/css', '', 'main.css?aa=60');
 // http://yanni4night.com/static/css/main.css?aa=60
 
 url.join("/?aa=60", 'static?bb=70', 'css?cc=80', 'main.css?dd=90'));
 // /static/css/search/main.css?aa=60&bb=70&cc=80&dd=90
 
 url.join('static/css','main.css','?aa=60');
 // static/css/main.css?aa=60
 
 url.join('http://yanni4night.com/static','http://google.com/build')
 // http://yanni4night.com/static/build
 **/
exports.join = urljoin

/**
 * converts a url into a single object
 * @static
 * @method parse
 * @param {String} url
 * @param {Boolean} [parseqs=false] if true, will also parse the query string using the node querystring module.
 * @param {boolean} [slashashost=false] if true, will treat //foo/bar as { host: 'foo', pathname: '/bar' } rather than { pathname: '//foo/bar' }
 * @returns {urlObject}
 **/
exports.parse = url.parse;
/**
 * converts an object into a valid url
 * @static
 * @method format
 * @param {urlObj} obj An object to generate a url from
 * @returns {String}
 **/
exports.format = url.format
/**
 * Take a base URL, and a href URL, and resolve them as a browser would for an anchor tag
 * @static
 * @method resolve
 * @param {...String} path a path or series of path or url fragments
 * @return {String}
 @example
url.resolve('/one/two/three', 'four')         // '/one/two/four'
url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
 **/
exports.resolve = url.resolve

/**
 * collection of utilies for dealing with query strings
 * @name qs
 * @namespace module:gaz/url.qs
 * @memberof module:gaz/url
 * @property {Object} qs.stringify collection of functions for dealing with query strings
 **/
exports.qs = {
	/**
	 * converts an object into a url friendly querystring. Objects can be nested and contain arrays
	 * @method stringify
	 * @memberof module:gaz/url.qs
	 * @example
	qs.stringify({ a: 'b' });
	// 'a=b'

	qs.stringify({ a: { b: 'c' } });
	// 'a%5Bb%5D=c'	 

	qs.stringify({ a: ['b', 'c', 'd'] });
	// 'a[0]=b&a[1]=c&a[2]=d'

	qs.stringify({ a: ['b', 'c', 'd'] }, { indices: false });
	// 'a=b&a=c&a=d'
	 **/
	stringify: qs.stringify
	/**
	 * converts an object into a url friendly querystring. Objects can be nested and contain arrays
	 * @method parse
	 * @memberof module:gaz/url.qs
	 * @param {Object} obj An object to generate a querystring fragement suitable for API usage
	 * @return {String}
	 **/
	,parse: qs.parse

	/**
	 * converts invalid url characters into url friendly escape codes
	 * @method escape
	 * @memberof module:gaz/url.qs
	 * @param {String} url a raw uri string to encode
	 * @return {String}
	 **/
	,escape: encodeURIComponent
	/**
	 * Decodes a string previously encoded by {@link module:gaz/url.qs#escape|escape}
	 * @method unescape
	 * @memberof module:gaz/url.qs
	 * @param {String} url a url encoded string
	 * @return {String}
	 **/
	,unescape: decodeURIComponent
}

/**
 * @memberof module:gaz/url.qs
 * @property {Object} legacy Contains original querstring methods from *node core*
 **/
Object.defineProperty( exports.qs,'legacy',{
	get:function( ){
		return querystring
	}
})

/**
 * An Object suitable for generating URLs from
 * @typedef {Object} urlObj The object to parse to a string
 * @property {String} href
 * @property String protocol is treated the same with or without the trailing : (colon).
 	The protocols http, https, ftp, gopher, file will be postfixed with :// (colon-slash-slash).
 	All other protocols mailto, xmpp, aim, sftp, foo, etc will be postfixed with : (colon)
 * @property String slashes set to true if the protocol requires :// (colon-slash-slash)
 	Only needs to be set for protocols not previously listed as requiring slashes, such as mongodb://localhost:8000/
 * @property {String} auth will be used if present.
 * @property {String} hostname will only be used if host is absent.
 * @property {String} port will only be used if host is absent.
 * @property {String} host will be used in place of hostname and port
 * @property {String} pathname is treated the same with or without the leading / (slash)
 * @property {String} search will be used in place of query
 * @property {Object} query  will only be used if search is absent. see {@link module:gaz/url.qs|qs}
 * @property {Object} search is treated the same with or without the leading ? (question mark)
 * @property {String} hash is treated the same with or without the leading # (pound sign, anchor)
 **/
