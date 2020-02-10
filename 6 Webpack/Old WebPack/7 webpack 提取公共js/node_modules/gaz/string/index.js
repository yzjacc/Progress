/*jshint laxcomma: true, smarttabs: true*/
/*globals module,process,require,exports,__dirname,__filename */
'use strict';
/**
 * String utilities
 * @module gaz/string
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires mout/string
 * @requires gaz/string/clean
 * @requires gaz/string/capitalize
 * @requires gaz/string/from
 * @requires gaz/string/id
 * @requires gaz/string/pluralize
 * @requires gaz/string/pxToInt
 * @requires gaz/string/randomKey
 * @requires gaz/string/reverse
 * @requires gaz/string/smartPlural
 * @requires gaz/string/split
 * @requires gaz/string/toFloat
 * @requires gaz/string/toInt
 */

var mstring = require('mout/string')
  ;


/**
 * http://en.wikipedia.org/wiki/Whitespace_character.
 * @property {Array} WHIT_SPACES List of all unicode white-space tokens ( http://en.wikipedia.org/wiki/Whitespace_character )
 **/
exports.WHITE_SPACES        = mstring.WHITE_SPACES

/**
 * converts a hyphenated string into camel case
 * @function
 * @param {String} input A hyphenated string
 * @return {String} A camelcased version of the original input
 * @example
string.camelCase('lorem-ipsum-dolor'); // "loremIpsumDolor"
string.camelCase('lorem ipsum dolor'); // "loremIpsumDolor"
 **/
exports.camelCase           = mstring.camelCase

/**
 * removes an extraneous white space between words
 * @function 
 * @param {String} input A string to be cleaned
 * @return {String} a clean version of the input string
 * @example
string.clean( " this     is a lame      sentance") // this is a lame sentance 
 **/
exports.clean               = require('./clean')

/**
 * Capitalized Every word of a string
 * @function
 * @param {String} input the string to be capitalized
 * @return {String} A capitalized string
 * @example
string.capitalize( "this is it" ) // This Is It
 **/
exports.capitalize          = require('./capitalize')

/**
 * Determines if a specific word is found with in a string
 * @function
 * @param {String} input A string to search through
 * @param {String} substr A string fragement to search for
 * @param {Number} idx The starting index to searh from the input string
 * @return {Boolean} true of the sbstring was found withing the input string 
 * @example
string.contains('lorem', 'or');  // true
string.contains('lorem', 'bar'); // false
 **/
exports.contains            = mstring.contains

/**
 * Truncate string at full words.
 * @function
 * @param {String} input The input string to crop
 * @param {Number} max The maximum number of character to allow before truncating 
 * @param {String} [fill=...] The filler string to append to the string if it gets cropped
 * @return {String} A cropped version of the input string 
 * @example
string.crop('lorem ipsum dolor', 10);      // "lorem..."
string.crop('lorem ipsum dolor', 10, '+'); // "lorem+"
 **/
exports.crop                = mstring.crop

/**
 * @function 
 * @see module:gaz/string/from
 **/
exports.from                = require('./from')
/**
 * Determines if a string ends with a specified bit of text
 * @function
 * @param {String} str the string to inspect
 * @param {String} suffix The bit of text you want to check for
 * @returns {Boolean} true if the specified string ends with the suffix
 * @example 
string.startsWith("Helloworld", "hello") // true
string.startsWith("Helloworld", "world") // false
 */
exports.endsWith            = mstring.endsWith

/**
 * Escapes an html string safe for injecting into dom
 * escapes the following special characters
 * **&** becomes **&amp;**
 * **<** becomes **&lt;**
 * **>** becomes **&gt;**
 * **'** becomes **&#39;**
 * **"** becomes **&quot;**
 * @function
 * @param {String} html An html String
 * @return {String} An escaped version of the input sring
 * @example
escapeHtml('lorem & "ipsum"'); // "lorem &amp;amp; &amp;quot;ipsum&amp;quot;"
 **/
exports.escapeHtml          = mstring.escapeHtml

/**
 * Escapes Regular expression chars from a string
 * @function
 * @param {String} str The string to escape
 * @returns {String} An escaped string
 * @example
str = escapeRegExp('[lorem.ipsum]'); // "\\[lorem\\.ipsum\\]"
reg = new RegExp(str);               // /\[lorem\.ipsum\]/
 */       
exports.escapeRegExp        = mstring.escapeRegExp

/**
 * Unicode escape characters
 * It will only escape non-printable ASCII chars unless `shouldEscapePrintable` is set to `true`.
 * @function
 * @see module:gaz/string#unescapeUnicode
 * @param {String} input The input string to escape
 * @param {Boolean} [escapeprintable=true] if false will not be escaped
 * @return {String} sequence of escaped unicode chars
 * @example
 escapeUnicode('føo bår'); // "f\u00f8o b\u00e5r"
 escapeUnicode('føo bår', true); // "\u0066\u00f8\u006f\u0020\u0062\u00e5\u0072"
 **/
exports.escapeUnicode       = mstring.escapeUnicode

/**
 * Hyphenate a string
 * Replaces spaces with hyphens, split camelCase text, remove non-word chars,
 * remove accents and convert to lower case.
 * @function
 * @see module:gaz/string#slugify
 * @see module:gaz/string#underscore
 * @see module:gaz/string#unhyphenate
 * @param {String} str The string to camelCase
 * @return {String}
 * @example
hyphenate(' %# lorem ipsum  ? $  dolor'); // "lorem-ipsum-dolor"
hyphenate('spéçïãl çhârs');               // "special-chars"
hyphenate('loremIpsum');                  // "lorem-ipsum"
 */      
exports.hyphenate           = mstring.hyphenate

/**
 * Generates a unique ID
 * @function
 * @param {Number} [base=36] The base to encode the string as. A Base must be in multiples of 2
 * @returns {String}     
 * @example
string.id() // 'i3xe5epo'
string.id(2) // '10100101001101001001110110001011101001010'
string.id(10) // '1419104697861'
string.id(10) // '14a693d4c8b'
 */
exports.id                  = require('./id')

/**
 * Inserts a string at the specified index.
 * @function
 * @param {String} string The string to insert into
 * @param {Number} index The index at which to insert the new string
 * @param {String} string The string to insert
 */      
exports.insert              = mstring.insert

/**
 * Replaces place placeholders( {{holder}} ) in a string with the values of matching keys in an object
 * @function
 * @param {String} str The string to manipulate
 * @param {Object} obj The object to pull values from
 * @param {RegEx} [regex=/\{\{([^\}]+)\}\}/g] A regular expression to use instead of the default
 * @example 
 var tmpl = 'Hello {{name}}!';
 string.interpolate(tmpl, {name: 'World'});       // "Hello World!"
 string.interpolate(tmpl, {name: 'Lorem Ipsum'}); // "Hello Lorem Ipsum!"

 tmpl = 'Hello {{name.first}}!';
 string.interpolate(tmpl, {name: {first: 'Lorem'}}); // "Hello Lorem!"
 */
exports.interpolate         = mstring.interpolate

/**
 * Safe version of String.toLowerCase(). 
 * Where calling to lower Case on non string object will throw and error.
 * calling string.lowerCase on non string objects will not.
 * @function
 * @param {String} input The input string to lower case
 * @return {String} the lower cased version of the input String.
 * @example
(null).toLowerCase();      // Error!
(undefined).toLowerCase(); // Error!
string.lowerCase(null);           // ""
string.lowerCase(undefined);      // ""
 **/
exports.lowerCase           = mstring.lowerCase

/**
 * Pad string with `char` if its' length is smaller than `minLen`
 * @function
 * @param {String} input The input string to bad
 * @param {Number} length The maximum length to fill to
 * @param {String} [fill=' '] 
 * @return {String} The resulting string
 * @example
string.lpad('llo', 5, 'x') // xxllo
 * @example
string.lpad('hello', 5) // hello
 **/
exports.lpad                = mstring.lpad

/**
 * Remove Characters from the beginning of a string
 * @function
 * @param {String} the input string to trim
 * @return {String} The resulting string
 * @example
string.ltrim('   lorem ipsum   ');      // "lorem ipsum   "
 * @example
string.ltrim('--lorem ipsum--', ['-']); // "lorem ipsum--"
 **/
exports.ltrim               = mstring.ltrim

/**
 * Group arguments as path segments, if any of the args is `null` or an
 * empty string it will be ignored from resulting path.
 * @function
 * @param {...String} fragment peices of a path to create
 * @return {String} A valid uri or unix path
 * @example
string.makePath('lorem', 'ipsum', null, 'dolor'); // "lorem/ipsum/dolor"
 * @example
string.makePath('foo///bar/');                    // "foo/bar/"
 **/
exports.makePath            = mstring.makePath

/**
 * Attempts to normalize line breaks in a string
 * @function
 * @param {String} str the string to normalize
 * @param {String} lineEnd The character to use as the break character. Defaults to "\n"
 * @return {String} str a new string with normalized line breaks
 * @example
string.normalizeLineBreaks('foo\nbar\r\nlorem\ripsum');       // "foo\nbar\nlorem\nipsum"
 * @example
string.normalizeLineBreaks('foo\nbar\r\nlorem\ripsum', '\r'); // "foo\rbar\rlorem\ripsum"
 * @example
string.normalizeLineBreaks('foo\nbar\r\nlorem\ripsum', ' ');  // "foo bar lorem ipsum"
 */
exports.normalizeLineBreaks = mstring.normalizeLineBreaks

/**
 * camelCase + UPPERCASE first char
 * @function
 * @see module:gaz/string#camelCase
 * @param {String} input an input string to pascal case
 * @return {String} a pascal cased version of the input string
 * @example
string.pascalCase('lorem-ipsum-dolor'); // "LoremIpsumDolor"
 * @example
string.pascalCase('lorem ipsum dolor'); // "LoremIpsumDolor"
 **/
exports.pascalCase          = mstring.pascalCase
/**
 * @function 
 * @see module:gaz/string/pluralize
 **/
exports.pluralize           = require('./pluralize')

/**
 * UPPERCASE first char of each word.
 * @function
 * @param {String} input An input string to conver
 * @returns {String} The proper cased version of the input string
 * @example
string.properCase('loRem iPSum'); // "Lorem Ipsum"
 */
exports.properCase          = mstring.properCase

/**
 * @function 
 * @see module:gaz/string/pxToInt
 **/
exports.pxToInt             = require('./pxToInt')
/**
 * @function 
 * @see module:gaz/string/randomKey
 **/
exports.randomKey           = require('./randomKey')
/**
 * @function 
 * @see module:gaz/string/reverse
 **/
exports.reverse             = require('./reverse')

/**
 * Remove non-printable ASCII chars
 * @function
 * @param {String} input String to strip characters from
 * @return {String} The input string stripped of all non printable characters
 * @example
 string.removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ'); // "lorem-ipsum"
 **/
exports.removeNonASCII      = mstring.removeNonASCII

/**
 * Attempts to remove any non word strings of text from a string
 * @function
 * @param {String} str The string to parse
 * @return {String} A new string with any non words removed
 * @example
var str = 'lorem ~!@#$%^&*()_+`-={}[]|\\:";\'/?><., ipsum';
string.removeNonWord(str); // "lorem - ipsum"
 */
exports.removeNonWord       = mstring.removeNonWord

/**
 * Repeat a string *N* times
 * @function
 * @param {String} input The input string to repeat
 * @return {String} The input string concated with it self *N* times
 * @example
string.repeat('a', 3);  // "aaa"
 * @example
string.repeat('bc', 2); // "bcbc"
 * @example
string.repeat('a', 0);  // ""
 **/
exports.repeat              = mstring.repeat

/**
 * replace strings with with replacements in the input string 
 * `search` and `replacements` can be an array, or a single item. For every item
 * in `search`, it will call `str.replace` with the search item and the matching
 * replacement in `replacements`. If `replacements` only contains one replacement,
 * it will be used for all the searches, otherwise it will use the replacement at
 * the same index as the search.
 * @function
 * @param {String} input The source string to be modified
 * @param {String|String[]} search The string to search for
 * @param {String|String[]} [replacements] The string to replace each of the string denoted in search
 * @return {String} the resulting string
 * @example
string.replace('foo bar', 'foo', 'test');                // "test bar"
 * @example
string.replace('test 1 2', ['1', '2'], 'n');             // "test n n"
 * @example
string.replace('test 1 2', ['1', '2'], ['one', 'two']);  // "test one two"
 * @example
string.replace('123abc', [/\d/g, /[a-z]/g], ['0', '.']); // "000..."
 **/
exports.replace             = mstring.replace

/**
 * Replaces any accented words with their regular ASCII counterparts
 * **Important:** Only covers **Basic Latin** and **Latin-1** unicode chars.
 * @function
 * @param {String} str the string to parse
 * @return {String} str a new string with no accented characters
 * @example
string.replaceAccents('spéçïãl çhârs'); // "special chars"
 **/
exports.replaceAccents      = mstring.replaceAccents

/**
 * Pad string with `char` if its' length is smaller than `minLen`
 * @function
 * @see module:gaz/string#lpad
 * @param {String} input The input string to pad
 * @param {Number} min The minimum length to pad a string up to
 * @param {String} [char=' '] The character to use a fill
 * @return {String} The resulting paded string
 * @example
string.rpad('a', 5);        // "a    "
 * @example
string.rpad('a', 5, '-');   // "a----"
 * @example
string.rpad('abc', 3, '-'); // "abc"
 * @example
string.rpad('abc', 4, '-'); // "abc-"
 **/
exports.rpad                = mstring.rpad

/**
 * Remove Characters from the end of a string
 * `chars` is an array of chars to remove from the end of the string. If
 * `chars` is not specified, Unicode whitespace chars will be used instead.
 * @see module:gaz/string#trim
 * @see module:gaz/string#ltrim
 * @function
 * @param {String} input  the input string to trim
 * @param {String[]} [chars] Arrat of characters to remove from the end of the input string
 * @return {String} The resulting string
 * @example
string.rtrim('   lorem ipsum   ');      // "   lorem ipsum"
 * @example
string.rtrim('--lorem ipsum--', ['-']); // "--lorem ipsum"
 **/
exports.rtrim               = mstring.rtrim

/**
 * UPPERCASE first char of each sentence and lowercase other chars.
 * @function
 * @param {String} A string to correct
 * @return {TYPE} A string with the fist letter in each sentance capitalize
 * @example
var str = 'Lorem IpSum DoLOr. maeCeNnas Ullamcor.';
string.sentenceCase(str); // "Lorem ipsum dolor. Maecennas ullamcor."
 **/
exports.sentenceCase        = mstring.sentenceCase

/**
 * Converts a string into a url safe slug
 *  - lower case, remove accents, remove non-word chars and replace spaces
 * with the delimeter. The default delimeter is a hyphen.
 * **Note** that this does not split camelCase text.
 * @function
 * @see module:gaz/string#hphenate
 * @see module:gaz/string#underscore
 * @param {String} str the string to convert
 * @param {String} [delimeter=-] The character used to replace spaces with
 * @return {String} slug a new slug
 * @example
var str = 'loremIpsum dolor spéçïãl chârs';
string.slugify(str); // "loremipsum-dolor-special-chars"
string.slugify(str, '_'); // "loremipsum_dolor_special_chars"
 */
exports.slugify             = mstring.slugify

/**
 * @function 
 * @see module:gaz/string/smartPlural
 **/
exports.smartPlural         = require('./smartPlural')
/**
 * @function 
 * @see module:gaz/string/split
 **/
exports.split               = require('./split')

/**
 * Determines if a string starts with a specified bit of text
 * @function
 * @param {String} str the string to inspect
 * @param {String} prefix The bit of text you want to check for
 * @returns {Boolean} true if the specified string ends with the prefix
 * @example
string.endsWith("Helloworld", "world") // true
string.endsWith("Helloworld", "hello") // false
 */   
exports.startsWith          = mstring.startsWith

/**
 * Strips tags from html strings
 * @function
 * @param {String} str The string to strip tags from
 * @returns {String}
 * @example
var str = '<p><em>lorem</em> <strong>ipsum</strong></p>';
string.stripHtmlTags(str); // "lorem ipsum"
 */    
exports.stripHtmlTags       = mstring.stripHtmlTags

/**
 * @function 
 * @see module:gaz/string/toFloat
 **/
exports.toFloat             = require('./toFloat')

/**
 * @function 
 * @see module:gaz/string/toInt
 **/
exports.toInt               = require('./toInt')
exports.trim                = mstring.trim
exports.truncate            = mstring.truncate

/**
 * Attempts to convert a string to an analogous data type ( ex "true" -> true )
 * Works on null, booleans, undefineds, number and floats
 * @function
 * @param {String} str the string to type cast
 * @return {Mixed} a data type that matched the passed in item
 * example
string.typecast('lorem ipsum'); // "lorem ipsum"
 * example
string.typecast('123');         // 123
 * example
string.typecast('123.45');      // 123.45
 * example
string.typecast('false');       // false
 * example
string.typecast('true');        // true
 * example
string.typecast('null');        // null
 * example
string.typecast('undefined');   // undefined
 */
exports.typecast            = mstring.typecast

/**
 * Add space between camelCase text.
 * @function
 * @see module:gaz/string@camelCase
 * @param {String} input input string to un camelcase
 * @param {String} [delimiter=' '] A string to inject between words
 * @example
string.unCamelCase('loremIpsumDolor'); // "lorem ipsum dolor"
 * @example
string.unCamelCase('loremIpsumDolor', '-'); // "lorem-ipsum-color"
 */
exports.unCamelCase         = mstring.unCamelCase

/**
 * Replaces spaces with underscores, split camelCase text, remove non-word chars, remove accents and convert to lower case.
 * @function
 * @see module:gaz/string#slugify
 * @see module:gaz/string#hyphenate
 * @param {String} input The input string to modify
 * @returns {String}
 * @example
string.underscore(' %# lorem ipsum  ? $  dolor'); // "lorem_ipsum_dolor"
 * @example
string.underscore('spéçïãl çhârs');               // "special_chars"
 * @example
string.underscore('loremIpsum');                  // "lorem_ipsum"
 */
exports.underscore          = mstring.underscore

/**
 * Unescapes HTML special chars
 * - `&amp;` becomes `&`
 * - `&lt;` becomes `<`
 * - `&gt;` becomes `>`
 * - `&#39;` becomes `'`
 * - `&quot;` becomes `"`
 * @function
 * @param {String} input An escaped html string
 * @returns {String} A funn html string
 * @example
string.unescapeHtml('lorem &amp;amp; &amp;quot;ipsum&amp;quot;'); // 'lorem & "ipsum"'
 */
exports.unescapeHtml        = mstring.unescapeHtml

/**
 * Unescapes unicode character sequences
 * @function
 * @see module:gaz/string#escapeHtml
 * @param {String} An escaped unicode string to decode
 * @returns {String} a full unicode string
 * @example
string.unescapeUnicode('\\u0066\\u00f8\\u006f\\u0020\\u0062\\u00e5\\u0072');
//'føo bår'
 */
exports.unescapeUnicode     = mstring.unescapeUnicode

/**
 * Replaces hyphens with spaces. (only hyphens between word chars)
 * @function
 * @param {String} input an input string to modify
 * @returns {String}
 * @example
string.unhyphenate('lorem-ipsum-dolor'); // "lorem ipsum dolor"
 */
exports.unhyphenate         = mstring.unhyphenate
/**
 * Safe version of String.toUpperCase(). Where calling toUpperCase on non string object will throw and error.
 * calling string.upperCase on non string objects will not.
 * @function
 * @param {String} input The input string to upper case
 * @return {String} the upper cased version of the input String.
 * @example
(null).toUpperCase();      // Error!
(undefined).toUpperCase(); // Error!
string.upperCase(null);           // ""
string.upperCase(undefined);      // ""
 **/
exports.upperCase           = mstring.upperCase
