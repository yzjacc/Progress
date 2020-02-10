/*jshint node:true, laxcomma: true, smarttabs: true*/
'use strict';
/**
 * Utilities for working with and parsing querystrings
 * @module gaz/querysting
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires mout/querystring
 */
var mqs = require('mout/queryString');

exports.contains = mqs.contains;
exports.decode   = mqs.decode;
exports.encode   = mqs.encode;
exports.getParam = mqs.getParam;
exports.getQuery = mqs.getQuery;
exports.parse    = mqs.parse;
exports.setParam = mqs.setParam;
