/*jshint laxcomma:true, smarttabs: true */
/*globals module,process,require,exports,__dirname,__filename */
/**
 * @author Eric Satterwhite
 * @module gaz/string/capitalize
 * @since 0.1.0
 */
      
/**
 * Capitalizes every word in a string
 * @param {String} str The string to capitalize
 * @returns {String}
 * @example 
string.capitalize( "this is it" ) // This Is It
 */
module.exports = function capitalize( str ){
    var s = String( str );
    return s.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

