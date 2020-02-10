/*jshint laxcomma: true, smarttabs: true*/
/*globals module,process,require,exports,__dirname,__filename */
'use strict';
/**
 * a better kind of typeof
 * @module gaz/typeOf
 * @author Eric Satterwhite
 * @since 0.1.0
 */
var kindOf = require( 'mout/lang/kindOf' )
module.exports = function( item ){
    if(item === null) {
        return 'null';
    } else if(item === undefined) {
        return 'undefined';
    }

    if( typeof item.$family == 'function' ){
        return item.$family();
    }
    
    if( !!item.$class ){
        return 'class';
    }

    return ( kindOf( item ) ).toLowerCase()
}
