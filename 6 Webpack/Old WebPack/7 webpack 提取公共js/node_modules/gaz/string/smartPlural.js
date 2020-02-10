/*jshint node:true, laxcomma:true, smarttabs: true */
/**
 * Attempts to infer the plural form of any word
 * @author Eric Satterwhite
 * @module gaz/string/smartPlural
 * @since 0.1,0
 */
/**
 * @param {String} word The word to pluralize
 * @return {String} The pluraized word
 */
module.exports =  function smartPlural( str ){
	var s = str.split( "" )
		,lastLetter
		,lastTwo;

	lastLetter = s[ s.length - 1 ];
	lastTwo = str.substr( s.length-2 );

	if( lastTwo == "ch" || lastTwo == "sh"){
		return s.join("") + "es";
	}else if( lastTwo == "ex" || lastTwo == "ix" ){
		return s.join("").substr( 0, s.length-2) + "cies";
	}else if( lastTwo == "us"){
		return s.join("").substr(0, s.length -2 ) + "i";
	}else if( lastTwo == "fe" ){
		return s.join("").substr(0, s.length-2 ) + "ves";
	}else if( lastTwo == "on"){
		return s.join("").substr(0, s.length-2 ) + "a";
	}


	switch( lastLetter ){
		case "s":
		case "z":
		case "x":
		case "o":
			return s.join( "" ) + "es";
		case "f":
			return s.join("").substr(0,s.length-1) + "ves";
		case "y":
			return ( s.join("").substr(0, s.length -1 ) + "ies"  );

		default:
			return s.join("") + "s";
	}
};
