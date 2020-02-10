/*jshint node:true, laxcomma:true, smarttabs: true */
/**
 * Generates a random string of a specified length
 * @author Eric Satterwhite
 * @module gaz/string/randomKey
 * @since 0.1.0
 **/
		
/**
 * @param {Number} [length=32] The length of the resulting key string
 * @param {Boolean} [numeric=false] If true, the resulting string will include numeric ( 0 - 9 ) values
 * @param {Boolean} [special=flase] If true, the resulting string will include special characters ( !, @, #, $, %, ^, &, *, (, ), +, =, | )
 * @return {String} The generated string
 **/      
module.exports = function randomKey( len, numeric, special, caps ){
	var string_tpl
		, output = ""
		, number_str
		, special_str
		, caps_str;

	len         = len || 32;
	number_str  = "1234567890";
	special_str = "!@#$%^&*()=+|";
	caps_str    = "QWERTYUIOPASDFGHJKLZXCVBNM";
	string_tpl  = "qwertyuiopasdfghjklzxcvbnm";

	string_tpl = !!numeric ? ( string_tpl + number_str ) : string_tpl;
	string_tpl = !!special ? (string_tpl + special_str) : string_tpl;
	string_tpl = !!caps ? (string_tpl + caps_str) : string_tpl;

	for ( var x=0; x< len; x++ ){
		output += getRandom( string_tpl, 0, string_tpl.length );
	}

	return output;
};
