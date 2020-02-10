/*jshint node:true laxcomma:true, smarttabs: true */
'use strict';
/**
 * Provides a simple and standard way to include class configuration options
 * @module gaz/class/options
 * @author Eric Satterwhite
 * @requires gaz/class
 * @requires gaz/object/merge
 * @requires gaz/array/append
 * @since 0.1.0
 **/
var Class  = require('./index')
  , merge  = require( '../object' ).merge
  , append = require( '../array' ).append
  , Options
  ;

function removeOn( name ){
    return name.replace(/^on([A-Z])/, function(full, first ){
        return first.toLowerCase();
    })
}

/**
 * Object class mixing which provides a standard way of defining configuration options on a class instance
 * @constructor
 * @alias module:gaz/class/options
 * @param {Object} options and object containing configutation overrides to set on the class instance
 * @example var X = Class({
  mixin: [ Options ]
  ,options:{
    "value1": 1
    ,"value2":2
  } 
  , constructor: function( options ){
      this.setOptions( options )
  }
});

var x = new X({
    "value1":2
    ,"value2"1
})
 */
Options = new Class(/** @lends module:gaz/class/options.prototype */{
    /**
     * merges an object into existing instance options and stores them in an options property
     * @param {Objecdt} Options conifguration options to be merged into defaults
     * @returns {Object} 
     */ 
    setOptions: function( options ){
        if( !!this.addListener ){
            for( var opt in options ){

                if( typeof( options[ opt ] ) !== 'function' || !(/^on[A-z]/).test(opt)){
                    continue;
                }
                this.addListener( removeOn( opt ), options[ opt ]);
                delete options[opt];
            }
        }
        this.options = merge.apply(null, append([{}, this.options || {} ], arguments ) );
        options = this.options;
        return this;
    }
})

module.exports = Options;
