/*jshint laxcomma:true, smarttabs: true, node: true */
"use strict";
/**
 * Provides a stable mechanisome for creating and clearing time outs
 * @module module:gaz/class/timers
 * @since 0.1.0
 * @author Eric Satterwhite
 * @requires module:gaz/class
 * @requires debug
**/
var  Class       = require( './index' )  
   , debug       = require("debug")("plugins:timers")
   , EMPTY_ARRAY = []
   , file_info   
   , Timers                          // The primary class exported from the module

file_info = {
	file: __filename
	,dir:__dirname
};

/**
 * @constructor
 * @alias module:gaz/class/timers
 * @param {TYPE} NAME DESCRIPTION
 * @example var x = new NAME.Timers({});
 */
Timers = new Class({
	$timers: {}
	/**
	 * This does someTimers
	 * @method module:gaz/class/timers#setTimer
	 * @param {TYPE} name DESCRPTION
	 * @param {TYPE} name DESCRIPTION
	 * @returns {TYPE} DESCRIPTION
	 */
	,getTimer: function( id ){
		return this.$timers[ id ];
	}

	/**
	 * sets a time for a unique ID
	 * @method module:gaz/class/timers#setTimer
	 * @param {String} id The store the time under
	 * @param {Number} time the lengthtime in milliseconds delay callback execution 
	 * @callback {Timers~setCallback} callback The callback method to execute
	 * @return {Timer} The timer reference returned from node
	 **/
	, setTimer: function( id, time, callback ){
		time     = time || 0;
		callback = callback || function(){ };

		this.clearTimer( id );
		debug("setting timeout for %s in, %s ms ", id, time );
		return this.$timers[ id ] = setTimeout( callback, time );
	}

	/**
	 * Removes a timer reference by ID
	 * @chainable
	 * @method module:gaz/class/timers#clearTimer
	 * @param {String} id The id of the timer to clean
	 * @return {Timer} The current Timer instance
	 **/
	, clearTimer: function( id ){
		var timers = this.$timers;

		if( arguments.length === 1){
			debug("Clearing old timers for %s" , id);
			debug("Clearing old timers for %s" , id);
			return clearTimeout( this.$timers[ id ] );
		}

		debug("No timer id given");
		debug("Clearing all pending timers" );
		for( var key in timers ){
			clearTimeout( timers[ key ] );
			debug("cleared %s", key );
		}
	}
});

module.exports = Timers;
