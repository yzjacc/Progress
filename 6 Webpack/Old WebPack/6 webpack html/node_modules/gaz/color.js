 /*jshint laxcomma: true, smarttabs: true*/
 /*globals module,process,require,exports,__dirname,__filename */
 'use strict';
 /**
  * ### Provides color functionality
  * @module gaz/color
  * @author Eric Satterwhite
  * @since 0.1.0
  * @requires gaz/class
  * @requires gaz/typeOf
  * @requires gaz/number
  * @requires gaz/function
  * @example var c = new Color('723F61', 'hex');
c.cmyk() // 'cmyk(0.0, 0.4, 0.1, 0.6)'
c.cmyk(true) // {c:0.0, m:0.4, y:0.1, k:0.6}
c.cmyk(true, true) // [ 0.1, 0.4, 0.1, 0.6] 
  */
 
 var Class          = require( './class' )
   , typeOf         = require('./typeOf')
   , number         = require('./number')
   , overloadSetter = require('./function').overloadSetter
   , listMatch      = /([\-.\d]+)\s*,\s*([\-.\d]+)\s*,\s*([\-.\d]+)\s*,?\s*([\-.\d]*)/
   , hexMatch       = /^#?([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{0,2})$/i
   , Color
   , colors
   , limit
   , parsers
   , stringify
   ;


colors = {
	hiveblue: "#f0f8ff", antiquewhite: "#faebd7", aqua: "#00ffff", aquamarine: "#7fffd4",
	 azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", black: "#000000", blanchedalmond: "#ffebcd",
	 blue: "#0000ff", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0",
	 chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed",
	 cornsilk: "#fff8dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b",  darkcyan: "#008b8b",
	 darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9",
	 darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00",
	 darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f",
	 darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", darkturquoise: "#00ced1",
	 darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969",
	 dimgrey: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222", floralwhite: "#fffaf0",
	 forestgreen: "#228b22", fuchsia: "#ff00ff", gainsboro: "#dcdcdc",ghostwhite: "#f8f8ff",
	 gold: "#ffd700", goldenrod: "#daa520", gray: "#808080", green: "#008000", greenyellow: "#adff2f",
	 grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082",
	 ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5",
	 lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080",
	 lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgray: "#d3d3d3", lightgreen: "#90ee90",
	 lightgrey: "#d3d3d3", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa",
	 lightskyblue: "#87cefa", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#b0c4de",
	 lightyellow: "#ffffe0", lime: "#00ff00", limegreen: "#32cd32",  linen: "#faf0e6",
	 magenta: "#ff00ff", maroon: "#800000", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd",
	 mediumorchid: "#ba55d3", mediumpurple: "#9370db", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee",
	 mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585",
	 midnightblue: "#191970", mintcream: "#f5fffa",  mistyrose: "#ffe4e1", moccasin: "#ffe4b5",
	 navajowhite: "#ffdead", navy: "#000080", oldlace: "#fdf5e6", olive: "#808000", olivedrab: "#6b8e23",
	 orange: "#ffa500", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa",
	 palegreen: "#98fb98", paleturquoise: "#afeeee",  palevioletred: "#db7093", papayawhip: "#ffefd5",
	 peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6",
	 purple: "#800080", red: "#ff0000", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513",
	 salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d",
	 silver: "#c0c0c0", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090",
	 slategrey: "#708090",  snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4",
	 tan: "#d2b48c", teal: "#008080", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#40e0d0",
	 violet: "#ee82ee", wheat: "#f5deb3",  white: "#ffffff",  whitesmoke: "#f5f5f5", yellow: "#ffff00",
	 yellowgreen: "#9acd32"

};

limit = function( num, min, max){
	return Math.min( max, Math.max( min, num ) );
};

// converts an array of numbers to a color declaration - > rgba( 0, 0, 0, 0 )
stringify = function( type, arr, excludeAlpha ){
	if( arr.length == 3 && arr[3] !== 1  ){
		type = !excludeAlpha ? type + 'a' :type;
	} else {
		arr.pop();
	}
	return type + ( '(' + arr.join(', ') + ")");
};
// The parsers get passed the string representation of a color in the respective color format
// and return an array of [ red, green, blue, alpha ]
parsers = {

	parseRGB: function(color){
		var matches;

		matches = color.match( listMatch ).slice(1);

		return matches.map(function( bit, idx ){
			return ( idx < 3 ) ? Math.round( ( ( bit %= 256 ) < 0 ) ? bit + 256 : bit ) : limit( ( bit === '' ) ? 1 : Number( bit ), 0, 1 );
		});
	}

	, parseCMYK: function( color ){
		var matches;

		matches = color.match( listMatch ).slice(1);

		return [
			(255 * (1 - matches[0] ) * (1 - matches[3] )) >>> 0
		  , (255 * (1 - matches[1] ) * (1 - matches[3] )) >>> 0
		  , (244 * (1 - matches[2] ) * (1 - matches[3] )) >>> 0
		];

	}
	,parseHEX: function( color ){
		//FF -> FFFFFF
		if( color.length === 1 ){
			color = color + color + color;
		}

		var matches = color.match( hexMatch ).slice( 1 );

		return matches.map(function( bit, idx ){
			if( idx === 3 ){
				return ( bit ) ? parseInt( bit, 16 ) / 255 : 1;
			}
			return parseInt(   (bit.length === 1 ) ? bit + bit : bit, 16 );
		});
	}

	, parseHSL: function( color ){
		var r, g, b
		  , h, s, l;

		function hue2rgb(p, q, t){
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}

		var hsl = color.match( listMatch ).splice(1);
		h = parseFloat(hsl[0]);
		// if h is over 1 it is probably a radial value
		h = h > 1 ? h / 360 : h;
		s = parseFloat(hsl[1]);
		l = parseFloat(hsl[2]);

		if(s == 0){
			r = g = b = l; // achromatic
		}else{
			

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;

			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		return [r * 255, g * 255, b * 255];

	}

	,parseHSB: function( color ){
		var hsb = color.match(listMatch).slice(1).map(function(bit, i) {
			if (i === 0) {
				return Math.round(((bit %= 360) < 0) ? (bit + 360) : bit);
			} else if (i < 3) {
				return limit(Math.round(bit), 0, 100);
			} else {
				return limit((bit === '') ? 1 : Number(bit), 0, 1);
			}
		});

		var alpha = hsb[3];
		var br = Math.round(hsb[2] / 100 * 255);
		if (hsb[1] === 0) {
			return [br, br, br, alpha ];
		}

		var hue = hsb[0];
		var f = hue % 60;
		var p = Math.round((hsb[2] * (100 - hsb[1])) / 10000 * 255);
		var q = Math.round((hsb[2] * (6000 - hsb[1] * f)) / 600000 * 255);
		var t = Math.round((hsb[2] * (6000 - hsb[1] * (60 - f))) / 600000 * 255);

		switch (Math.floor(hue / 60)) {
			case 0: return [br, t, p, alpha ];
			case 1: return [q, br, p, alpha ];
			case 2: return [p, br, t, alpha ];
			case 3: return [p, q, br, alpha ];
			case 4: return [t, p, br, alpha ];
			default: return [br, p, q, alpha ];
		}
	}
};
 
// ### The Color Class

// It's interface is small enough that it doesn't need to be a full Class.
// Which keeps the module overhead down

/**
 * ## The main Color Class
 * @constructor
 * @class module:gaz/color.Color
 * @param {String|Color|Array|Number} Color A color representation
 * @param {String} type The type of format of the color space ( rgb, hex, hsb )
 * @example var x = new color.Color([66,66,66],'rgb') 
})
 */
exports.Color = Color = new Class(/* @lends gaz/color.Color.prototype */{
	 inherits: Array
	 ,constructor: function( color, type ){
		switch( typeOf( color ) ){
			case "string":
				var name = Color.lookupColor( color );
				if( name ){
					color = name;
					type = "hex";
				}else if( !type ){
					type = ( type = color.match(/^rgb|^hsb|^cmyk|^hsl/)) ? type[0] : 'hex';
				}
				break;

			case "color" :
				color = [color.red, color.green, color.blue, color.alpha ];
				type = null;
				break;
			case 'array':
				type = type || "rgb";
				color = color.toString();
				break;
			case "number":
				type = "hex";
				color = color.toString(16);
				break;
		}
		if( type ){
			type =  type.trim();
			color = parsers['parse' + type.toUpperCase()](color);
		}

		this[0] = this.red = color[0];
		this[1] = this.green = color[1];
		this[2] = this.blue = color[2];


		this.alpha = color[3] == null ? 1 : color[3];
		this.length = 3;
		return this;
	 }

	/**
	 * returns the current color representation in the RGB color space as an array
	 * @method rgb
	 * @instance
	 * @memberof gaze/color.Color
	 * @param {Boolean} [full=false] return values as an object {r:r, g:g, b:b} rather than string
	 * @param {Boolean} [flat=false] return values in an array [r, g, b]
	 * @return {ObjectString|Array} An array containg the color valuse [r, g, b]
	 */
	,rgb: function( full, flat ){
		var rgb;
		rgb = [this.red, this.green, this.blue, this.alpha];
		return ( full ) ? flat ? rgb : {r:this.red, g:this.green, b:this.blue} : stringify( "rgb", rgb );
	}

	/**
	 * returns the current color representation in the HSB color space as an array
	 * @param {Boolean} asArray if true, will be returned as an array
	 * @method module:gaz/color.Color#hsb
	 * @param {Boolean} [full=false] return values as an object {h:h, s:s, b:b} rather than string
	 * @param {Boolean} [flat=false] return values in an array [h, s, b]
	 * @return {Object|String|Array} The HSB values of the current color
	 */
	,hsb: function( full, flat ){
		var red         = this.red                      // cache for red value
			,green      = this.green                    // cache for green value
			,blue       = this.blue                     // cache for blue value
			,alpha      = this.alpha                    // cache for alpha value
			,hue        = 0                             // colors hue value
			,max        = Math.max(red, green, blue)    // Maximun color value
			,min        = Math.min(red, green, blue)    // minimum color value
			,delta      = max - min                     // diff of min / mzx
			,saturation = (max !== 0) ? delta / max : 0 // saturation value
			,brightness = max / 255                     // brightness value
			,hsb
			,rr
			,gr
			,br;

		if (saturation) {
			rr = (max - red) / delta;
			gr = (max - green) / delta;
			br = (max - blue) / delta;
			hue = (red === max) ? br - gr : (green === max) ? 2 + rr - br : 4 + gr - rr;

			if ((hue /= 6) < 0) {
				hue++;
			}
		}

		hsb = [Math.round(hue * 360), Math.round(saturation * 100), Math.round(brightness * 100), alpha];

		return (full) ? flat ? hsb : {h:hsb[0], s:hsb[1], b:hsb[2]} : stringify('hsb', hsb);
	}

	/**
	 * returns the current color representation in the HEX color space as an array
	 * @method module:gaz/color.Color#hex
	 * @param {Boolean} [full=false] return values as an object {r:r, g:g, b:b} rather than string
	 * @param {Boolean} [flat=false] return values in an array [r, g, b]
	 * @return {Object|String|Array} An array containg the color valuse [RR, GG, BB, AA]
	 */
	,hex: function( full, flat ){
		var a = this.alpha
			,alpha = ((a = Math.round((a * 255)).toString(16)).length === 1) ? a + a : a
			,hex = [this.red, this.green, this.blue];

		hex = hex.map(function(bit) {
			bit = bit.toString(16);
			return (bit.length === 1) ? '0' + bit : bit;
		});


		return full ? flat ? hex.concat(alpha) : {r: hex[0], g:hex[1], b:hex[2], a: alpha } : '#' + hex.join('') + ((alpha === 'ff') ? '' : alpha);
	}

	/**
	 * Returns the HSL values of the current Color
	 * @method module:gaz/color.Color#hsl
	 * @param {Boolean} [full=false] return values as an object {h:h, s:s, l:l} rather than string
	 * @param {Boolean} [flat=false] return values in an array [h, s, l]
	 * @return {Object|Array|String} hsl values of the color 
	 **/
	,hsl: function hsl(full, flat){
		var h // hue int value
		  , s // saturation float value
		  , l // float value
		  , min // minimum value in the rgb values
		  , max // maximum value in the rgb values 
		  , _hsl // array of hsl values
		  ;

		this.red /= 255;
		this.green /= 255;
		this.blue /= 255;

		min = Math.min(this.red, this.green, this.blue);
		max = Math.max(this.red, this.green, this.blue);

		l = (max + min) / 2;

		if (max == min){
			s = 0;
			h = Number.NaN;
		}else{
			s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
		}

		if (this.red == max){
			h = (this.green - this.blue) / (max - min);
		} else if (this.green == max){
			h = 2 + (this.blue - this.red) / (max - min);
		} else if (this.blue == max){
			h = 4 + (this.red - this.green) / (max - min);
		} 

		h *= 60;
		if ( h < 0 ){
			h += 360;
		}
		_hsl = [h,s,l];
		return full ? flat ? _hsl : {h:h,s:s,l:l} : stringify('hsl',_hsl.map(function(i){return i.toFixed(1); }), true );
	}

	/**
	 * returns CMYK values of the current color
	 * @method module:gaz/color.Color#cmyc
	 * @param {Boolean} [full=false] return values as an object {c:c, m:m, y:y, k:k} rather than string
	 * @param {Boolean} [flat=false] return values in an array [c, m, y, k]
	 * @return {Object|Array|String} cmyk values of the color 
	 **/
	,cmyk: function( full, flat ){
		var c = this.red / 255
		  , m = this.green / 255
		  , y = this.blue / 255
		  , k = Math.min( 1 - c, 1 - m, 1 - y )
		  ;
		  
		c = ( 1- c - k ) / (1 - k);
		m = (1-  m - k ) / (1 - k);
		y = (1- y - k ) / (1 - k);

		var cmyk = [
			Math.round( c * 10 ) / 10
		  , Math.round( m * 10 ) / 10
		  , Math.round( y * 10 ) / 10
		  , Math.round( k * 10 ) / 10
		];

		return full ? flat ? cmyk : {c:cmyk[0],m:cmyk[1], y:cmyk[2],k:cmyk[3] } : stringify('cmyk', cmyk.map(function(n){return n.toFixed(1);}) );
	}

	/**
	 * Determines if the color is considered a bright color
	 * @method module:gaz/color.Color#isLight
	 * @return {Boolean} returns true if the colors brightness value is greater than 50
	 */
	,isLight: function( thrsh ){
		return this.hsb( true )[2] > ( !!thrsh ? thrsh : 50 );
	}

	/**
	 * Determines if the color is considered a dark color
	 * @method module:gaz/color.Color#isDark
	 * @return {Boolean} returns true if the colors brightness value is leass than 50
	 */
	,isDark: function(){
		return !this.isLight();
	}

	/**
	 * Determines if the color is considered a bright color
	 * @method module:gaz/color.Color#contrast
	 * @param {Color|String} light the color to be used if the original color is dark
	 * @param {Color|String} dark the color to be used if the original color is light
	 * @return   {Color} dark if the passed in color is light, will return the dark color and vice versa
	 */
	,contrast: function( lgt, drk, thrsh ){

		return  this.isLight( thrsh ) ? new Color( drk ) : new Color( lgt );
	}

	,toString: function( ){

		return this.rgb();
	}


	/**
	 * Takes any number of color instances and mixes there values
	 * @param {Color} colors any number of colors
	 * @param {Number} amount The percentage of the colors to mix together. Defaults to 50
	 * @return {Color} color A new color as the result of mixing.
	 * @example 
	var white, black;

	white = new color.Color([255,255,255]) // white
	black = color.hex("#000000") // black
	red = color.hex("#ff0000") // red

	white.mix( black ).rgb() // rgb(127, 127, 127)
	white.mix( black, 0 ).rgb() // rgb(255, 255, 255)
	white.mix( black, 100 ).rgb() // rgb(0, 0, 0)
	white.mix( black, 35 ).rgb() // rgb(166, 166, 166) - deep grey
	white.mix( black, red,  45 ).rgb() // rgb(192, 77, 77) - dark red
	 */
	,mix: function(){
		var colors = Array.prototype.slice.call( arguments )
			,alpha = typeof  colors[colors.length-1]  == 'number' ? colors.pop() : 50
			,rgb =  this.slice();

			colors.forEach(function( color ){
				color = new Color ( color );
				for( var x = 0; x < 3; x ++ ){
					rgb[x] = Math.round( (rgb[x ] / 100 * (100 - alpha ) ) + ( color[x] / 100 * alpha));
				}
			});

			return new Color( rgb, 'rgb');
	}
	/**
	 * Creates a new color which is an inverse color of the current instance
	 * @return {Color} color A new color as the result of inverting
	 */
	,invert: function(){
		return new Color( this.map(function( value ){
				return 255 - value;
			})
		);
	}
	// Secret ID methods for use with the typeOf method and log module
	// because javascript typeof
	,$family: function(){
		return "color";
	}

	,repr: function(){
		return "<Color: " + this.hex()  + " >";
	}
 });

/**
 * returns hex code of a predefined color
 * @method module:color.Color.lookupColor
 * @param {String} color The name of the Color you want.
 * @returns {String} The colors HEX Code
 * @example var color = require('gaz/color'
var Color = color.Color
Color.lookupColor("fuchsia") // #ff00ff
 */
Color.lookupColor = function lookupColor( color ){
	return colors[ color ] || null;
};

// Define The color Acessor.
// Not only does this give a quick lookup for the color class, but
// it adds a common API for users to define custom colors not listed
// without having to dig through the lib or monkey patch the color class or methods
// It also allows user to create colors by HTML names, like `new Color( "mediumaquamarine" )`
// Who doesn't love that?!
Color.defineColors = overloadSetter(function( name, hex ){
	if( !colors[ name ] ){
		colors[name] = hex;
	} 
	return this;
});

/**
 * returns hex code of a predefined color
 * @param {array} rgb An RBG String to convert into a Color
 * @returns {Color} A new Color Instance
 * @example var color = require('gaz/color')
console.log( color.rgb("rgb(122,122,122)" ).repr() ) // <Color: #7a7a7a>
})
 */
// #### Static module methods
// `rgb` is a short cut to new Color( "rgb(x, x, x)", "rgb")
exports.rgb = function( rgb ){
	return new Color( rgb, 'rgb');
};
/**
 * returns hex code of a predefined color
 * @param {array} rgb An RBG String to convert into a Color
 * @returns {Color} A new Color Instance
 * @example var color = require( 'color')
log.print( color.hex("#444444" ) ) // <Color: #444444 >
 */
// `hex` is a short cut to new Color( "#FFFFFF", "hex")
exports.hex = function( hex ){
	return new Color( hex, 'hex ');
};

/**
 * returns hex code of a predefined color
 * @param {array} rgb An RBG String to convert into a Color
 * @returns {Color} A new Color Instance
 * @example var color = require( 'color')
console.log( color.hsb("hsb(10,10,10)").repr() ) // <Color: #1a1717 >
 */
 // `hsb` is a short cut to new Color( "hsb(x, x, x) ", "hsb")
exports.hsb = function( hsb ){
	return new Color( hsb, 'hsb');

};

/**
 * returns hex code of a predefined color
 * @param {array} rgb An RBG String to convert into a Color
 * @returns {Color} A new Color Instance
 * @example var color = require( 'color')
console.log( color.hsb("hsb(10,10,10)").repr() ) // <Color: #1a1717 >
 */
 // `hsb` is a short cut to new Color( "hsb(x, x, x) ", "hsb")
exports.hsb = function( hsb ){
	return new Color( hsb, 'hsl');

};

/**
 * returns new Color instance parsed from cmyk values
 * @param {array} cmyk An cmyk String to convert into a Color
 * @returns {Color} A new Color Instance
 * @example var color = require( 'color')
console.log( color.hsb("cmyk(100, 40, 20, 40)").repr() ) // <Color: #1a1717 >
 */
exports.cmyk = function( cmyk ){
	return new Color( cmyk, 'cmyk');

};


/**
 * Looks up a color by name
 * @param {String} clr Human readible color ( red, purple, etc )
 * @param {Boolean} [fallback=false] A fallback color hexcode to return if none is found
 * @return {String} The hexcode for the matched color
 * @example var color = require( 'color'), 'log']
console.log( color.lookup( "lightgoldenrodyellow" ) // #fafad2;
console.log( color.lookup( "madeupcolor", "#FFFFFF" ) // #FFFFFF;
 **/
exports.lookup = function( clr, fallback ){
	return Color.lookupColor( clr ) || !!fallback ? fallback : null;
};

exports.parsers = parsers;
