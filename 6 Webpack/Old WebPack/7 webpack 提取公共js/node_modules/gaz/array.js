/*jshint node:true, laxcomma: true, smarttabs: true, node:true */
'use strict';
/**
 * Utilities for dealing with and processing arrays
 * @module gaz/array
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires mout/array
 */

function getRandom( arr ){
	var rand = Math.floor( Math.random() * ( arr.length - 1 )  );
	return ( arr.length ) ? arr[ rand ] : null;
}

function quickmap(array, mapFunction) {
  var arrayLen = array.length;
  var newArray = new Array(arrayLen);
  for(var i = 0; i < arrayLen; i++) {
    newArray[i] = mapFunction(array[i], i, array);
  }

  return newArray;
}


module.exports = {
    'append'        : require('mout/array/append'),
    'collect'       : require('mout/array/collect'),
    'combine'       : require('mout/array/combine'),
    'compact'       : require('mout/array/compact'),
    'contains'      : require('mout/array/contains'),
    'difference'    : require('mout/array/difference'),
    'equals'        : require('mout/array/equals'),
    'every'         : require('mout/array/every'),
    'filter'        : require('mout/array/filter'),
    'find'          : require('mout/array/find'),
    'findIndex'     : require('mout/array/findIndex'),
    'findLast'      : require('mout/array/findLast'),
    'findLastIndex' : require('mout/array/findLastIndex'),
    'flatten'       : require('mout/array/flatten'),
    'forEach'       : require('mout/array/forEach'),
    'getRandom'     : getRandom,
    'groupBy'       : require('mout/array/groupBy'),
    'indexOf'       : require('mout/array/indexOf'),
    'insert'        : require('mout/array/insert'),
    'intersection'  : require('mout/array/intersection'),
    'invoke'        : require('mout/array/invoke'),
    'join'          : require('mout/array/join'),
    'last'          : require('mout/array/last'),
    'lastIndexOf'   : require('mout/array/lastIndexOf'),
    'map'           : require('mout/array/map'),
    'max'           : require('mout/array/max'),
    'min'           : require('mout/array/min'),
    'pick'          : require('mout/array/pick'),
    'pluck'         : require('mout/array/pluck'),
    'range'         : require('mout/array/range'),
    'quickmap'      : quickmap,
    'reduce'        : require('mout/array/reduce'),
    'reduceRight'   : require('mout/array/reduceRight'),
    'reject'        : require('mout/array/reject'),
    'remove'        : require('mout/array/remove'),
    'removeAll'     : require('mout/array/removeAll'),
    'shuffle'       : require('mout/array/shuffle'),
    'slice'         : require('mout/array/slice'),
    'some'          : require('mout/array/some'),
    'sort'          : require('mout/array/sort'),
    'sortBy'        : require('mout/array/sortBy'),
    'split'         : require('mout/array/split'),
    'toLookup'      : require('mout/array/toLookup'),
    'union'         : require('mout/array/union'),
    'unique'        : require('mout/array/unique'),
    'xor'           : require('mout/array/xor'),
    'zip'           : require('mout/array/zip')
};


