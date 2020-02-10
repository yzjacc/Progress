/*jshint eqnull: true, laxcomma: true, smarttabs: true*/
/*global define */
/**
 * Module working with dates and complex date math
 * @author Eric Satterwhite
 * @module gaz/date
 * @requires gaz/lang
 * @requires mout/date
 */
var DateMethods
	,DateFormats
	,DateUnits
	,pad
	,dateSetter
	,dateGetter
	,rfcDayAbbr
	,rfcDay
	,rfcMonth
	,rfcMonthAbbr
	,daysInMonth
	,InvalidDateError
	,_methods
	,timezone
	,kindOf
	,timezoneclip;

var _kindOf = require('../lang').kindOf;
var mdate = require('mout/date')
var moment = require('moment')

timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
timezoneclip = /[^-+\dA-Z]/g;

kindOf = function( item ){
	return _kindOf(item).toLowerCase();
}
DateMethods = {
	ms:'Milliseconds'
	,year:'FullYear'
	,min:'Minutes'
	,mo: "Month"
	,sec: "Seconds"
	,hr :"Hours"
};

rfcDayAbbr = ['Sun','Mon','Tue' ,'Wed','Thu','Fri','Sat'];
rfcDay = [ "Sunday", "Monday", "Tuesday", "Wendesday", "Thursday", "Friday", "Saturday"];
rfcMonthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
rfcMonth = [ "January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

DateUnits = {
	ms: function(){ return 1; },
	second: function(){ return 1000; },
	minute: function(){ return 60000; },
	hour: function() { return 3600000; },
	day: function(){ return 86400000;},
	week: function(){ return 608400000;},
	month: function(month, year){
		var d = new Date();
		return daysInMonth(month != null ? month : d.get('mo'), year != null ? year : d.get('year')) * 86400000;
	},
	year: function(year){
		year = year || new Date().get('year');
		return exports.isLeapYear(year) ? 31622400000 : 31536000000;
	}
};
DateFormats = {
	db: '%Y-%m-%d %H:%M:%S',
	compact: '%Y%m%dT%H%M%S',
	'short': '%d %b %H:%M',
	'long': '%B %d, %Y %H:%M',
	rfc822: function(date){
		var rvalue;
		rvalue = (
					rfcDayAbbr[dateGetter(date, 'day')] +
					exports.format(', %d ') +
					rfcMonthAbbr[dateGetter(date, 'month')] +
					exports.format(' %Y %H:%M:%S %Z')
		);
	},
	rfc2822: function(date){
		return rfcDayAbbr[date.get('day')] + date.format(', %d ') + rfcMonthAbbr[date.get('month')] + date.format(' %Y %H:%M:%S %z');
	},
	iso8601: function(date){
		return (
			date.getUTCFullYear() + '-' +
			pad(date.getUTCMonth() + 1, 2) + '-' +
			pad(date.getUTCDate(), 2) + 'T' +
			pad(date.getUTCHours(), 2) + ':' +
			pad(date.getUTCMinutes(), 2) + ':' +
			pad(date.getUTCSeconds(), 2) + '.' +
			pad(date.getUTCMilliseconds(), 3) + 'Z'
		);
	}
};


_methods = [
			'Date', 'Day', 'FullYear', 'Hours', 'Milliseconds', 'Minutes'
			,'Month', 'Seconds', 'Time', 'TimezoneOffset','Week', 'TimeZone'
			,'GMTOffset', 'DayOfYear', 'LastMonth', 'LastDayOfMonth', 'UTCDate'
			,'UTCDay', 'UTCFullYear','AMPM', 'Ordinal', 'UTCHours', 'UTCMilliseconds'
			,'UTCMinutes', 'UTCMonth', 'UTCSeconds', 'UTCMilliseconds', "IndyTimeZone"
];


for( var x = 0; x< _methods.length; x++){

	DateMethods[_methods[ x ].toLowerCase()] = _methods[ x ];
}

pad = function( n, digits, string ){
	if( digits == 1 ){
		return n;
	}

	return n < Math.pow( 10, digits -1) ? ( string || '0' ) + pad( n, digits -1, string ) : n;
};
dateSetter = function( date, prop, value ){
	prop = prop.toLowerCase();

	var method = DateMethods[ prop ] && "set" + DateMethods[prop];

	if( method && date[ method ] ){
		return date[method]( value );
	}

	return date;
};

dateGetter = function( date, prop ){
	prop = prop.toLowerCase();

	var method = DateMethods[prop] && "get" + DateMethods[ prop ];
	if( method && date[method] ){
		return date[ method ]();
	} else if( method && exports[method]){
		return exports[method]( date );
	}

	return null;
};

daysInMonth = function(month, year ){
	return [ 31, exports.isLeapYear( year ) ? 29: 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month];
};

/**
 * Clones a date object
 * @param {Date} date The date to clone
 * @return {Date}  A new Date object identical to the pased in dated
 */
exports.clone = function clone( date ){
	return new Date( dateGetter( date, 'time' ) );
};

/**
 * Determins if a date is a leap year
 * @param {Date} date The date to examine
 * @return {Boolean} True if the date is a leap year
 */
exports.isLeapYear = function isLeapYear( date ){
	var year;
	if( date.isLeapYear ){
		return date.isLeapYear();
	}else{
		year = dateGetter( date, 'year' );

		return !!(( year & 3 ) === 0 && ( year % 100  || ( year % 400 === 0 && year)));
	}
};

/**
 * returds the the ordinal modifier for the date of the year, th, st, nd, rd, etc
 * @param {Date} date The date to examine.
 * @returns {String} The ordinal value of the date.
 */
exports.getOrdinal = function getOrdinal( date ){
	var dayOfMonth;

	dayOfMonth = exports.format( date, "%e");

	return (dayOfMonth > 3 && dayOfMonth  < 21 ) ? "th" : ["th", "st","nd", "rd", "th"][Math.min( dayOfMonth % 10, 4)];
};
/**
 * Resets the hours, minutes, seconds and milliseconds to 0
 * @param  {Date} date date The date to reset
 * @return {Date} a New date with the time reset to zero at the same day.
 */
exports.clearTime = function clearTime( date ){
	return new Date(date.setHours(0, 0, 0, 0));
};

/**
 * Returns an Integer representation of the the current date.
 * @return {Number} the current data as a integer, milisections from EPOC
 */
exports.now = function now(){
	return +( new Date());
};

/**
 * Returns the difference between two dats in the units specified
 * @param {Date} dateA The earlier date to inspect
 * @param {Date} dateB The later date to inspect
 * @param {String} resolution The measurement the value should be returned in ( day, minute, ms, second, month, year). Default is day	 * @return {Number}
 */
exports.diff = function diff(dateA, dateB, resolution ){
	if( kindOf( dateB ) === 'string' ){
		dateB= Date.parse( dateB );
	}
	if( kindOf( dateA ) === 'string' ){
		dateA = Date.parse( dateA);
	}
	return Math.round(( dateB - dateA) / DateUnits[resolution || 'day'](3,3));
};

/**
 * Dtermines if a date is between two dates
 * @param {Date} date The date to check
 * @param {Date} leftBound The earliest bounding date
 * @param {Date} rightBound The latest bounding date
 * @return {Boolean} True if the date is with in the specified dates.
 **/
exports.within = function within( date, leftBound, rightBound ){
	 leftBound = +(kindOf( leftBound ) === "string" ? Date.parse( leftBound ): leftBound);
	 rightBound = +(kindOf( rightBound ) === "string" ? Date.parse( rightBound ): rightBound);
	 date = +(kindOf( date ) === "string" ? Date.parse( date ): date);


	 return ( date > leftBound && date < rightBound );
};

/**
 * Returns the last day of the month for a given date ( 30, 31, 28, etc )
 * @param {Date} date The date To inspect
 * @return {Number} day The numeric representation of the day in the month.
 */
exports.getLastDayOfMonth = function getLastDayOfMonth( date ){
	date = typeof date === 'string' ? new Date( Date.parse( date ) ) : date;


	return daysInMonth( dateGetter( date, 'mo'), dateGetter( date, 'year') );

};

/**
 * Returns the current day in the calendar year ( 1 - 366 )
 * @param {Date} date The date to inspect
 * @returns {Number} The number of the day.
 */
exports.getDayOfYear = function getDayOfYear( date ){
	return  ( Date.UTC(
				dateGetter(date, 'year' ),
				dateGetter( date, 'mo'),
				dateGetter( date, 'date') + 1
			) - Date.UTC(
				dateGetter( date, 'year'),
				0,
				1
			) ) / DateUnits.day();

};

/**
 * Returns the timezone of the specified date
 * @param {Date | String} date The Date to inspect
 * @return {String} The current Time zone as a three character string. ( CST )
 */
exports.getTimeZone = function getTimeZone( date ){
	var str;

	date = typeof date === 'string' ? new Date( Date.parse( date ) ) : date;

	str = date.toString();

	str = str.replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");

	return str;
};

/**
 * Returns the timezone offset
 * @param {Date} date The date to inspect
 * @return {String} The current Time zone offset ( -0600 )
 */
exports.getGMTOffset = function getGMTOffset( date ){
	var off = dateGetter( date, 'TimezoneOffset');

	return ( (off > 0) ? "-" : "+") + pad( Math.floor( Math.abs(off) / 60), 2) + pad( off % 60, 2);
};

/**
 * Returns the Meridian of the current Date
 * @param {Date | String} date the date to inspect
 * @return {String} Returns AM or PM
 */
exports.getAMPM = function getAMPM( date ){
	date = typeof date === 'string' ? new Date( Date.parse( date ) ) : date;
	return dateGetter( date, 'hr' ) < 12 ? 'AM':'PM';
};

/**
 * Tried to determine if a date is a valide date object
 * @param {Date} date the date to validate
 * @return {Boolean} true if the date validates
 */
exports.isValid = function isValid( date ){
	return kindOf( date ) === 'date' && !isNaN( date.valueOf() );
};

/**
 * Increments a date by a given unit N number of times
 * @param {Date} date the Date to increment
 * @param {String} interval The interval by which to increment ( day, month, week, year). Defaults to day
 * @param {Number} The number of times to increment the date by. Defaults to 1
 * @return {Date} a new date adjusted by the given parameters.
 */
exports.increment = function increment(date, interval, times ){
	interval = interval || 'day';
	times = times != null ? times : 1;

	switch( interval ){
		case 'year':
			return exports.increment(date, 'month', times * 12 );

		case 'month':
			var d = dateGetter(date, 'date');
			dateSetter(date, 'date', 1);
			dateSetter(date, 'mo', dateGetter(date, 'mo') + times );
			return new Date( dateSetter(date, 'date', Math.min(d, dateGetter(date, 'lastdayofmonth'))) ) ;

		case 'week':
			return exports.increment('day', times * 7);
		case 'day':
			return new Date( dateSetter(date, 'date', dateGetter(date, 'date') + times ) );
	}
};

/**
 * Works simliar to increment but in the opposing direction
 * @param {Date} date the Date to increment
 * @param {String} interval The interval by which to increment ( day, month, week, year). Defaults to day
 * @param {Number} The number of times to increment the date by. Defaults to 1
 * @return {Date} a new date adjusted by the given parameters.
 */
exports.decrement = function decrement(date, interval, times ){
	return exports.increment(date,  interval, -1 * (times != null ? times : 1 ) );
};

exports.getIndyTimeZone = function getIndyTimeZone( date ){
	return ( String( date ).match(timezone) || [""]).pop().replace(timezoneclip, "")
}

/**
 * Formats a date object to a string the following are valid formatters
 * * **a** - short day ("Mon", "Tue")
 * * **A** - full day ("Monday")
 * * **b** - short month ("Jan", "Feb")
 * * **B** - full month ("January")
 * * **c** - the full date to string ("Mon Dec 10 14:35:42 2007"; %a %b %d %H:%m:%S %Y)
 * * **d** - the date to two digits (01, 05, etc)
 * * **e** - the date as one digit (1, 5, 12, etc)
 * * **H** - the hour to two digits in military time (24 hr mode) (00, 11, 14, etc)
 * * **I** - the hour as a decimal number using a 12-hour clock (range 01 to 12).
 * * **j** - the day of the year to three digits (001 to 366, is Jan 1st)
 * * **k** - the hour (24-hour clock) as a digit (range 0 to 23). Single digits are preceded by a blank space.
 * * **l** - the hour (12-hour clock) as a digit (range 1 to 12). Single digits are preceded by a blank space.
 * * **L** - the time in milliseconds (three digits; "081")
 * * **m** - the numerical month to two digits (01 is Jan, 12 is Dec)
 * * **M** - the minutes to two digits (01, 40, 59)
 * * **o** - the ordinal of the day of the month in the current language ("st" for the 1st, "nd" for the 2nd, etc.)
 * * **p** - the current language equivalent of either AM or PM
 * * **s** - the Unix Epoch Time timestamp
 * * **S** - the seconds to two digits (01, 40, 59)
 * * **T** - the time as %H:%M:%S
 * * **U** - the week to two digits (01 is the week of Jan 1, 52 is the week of Dec 31)
 * * **w** - the numerical day of the week, one digit (0 is Sunday, 1 is Monday)
 * * **x** - the date in the current language preferred format. en-US: %m/%d/%Y (12/10/2007)
 * * **X** - the time in the current language preferred format. en-US: %I:%M%p (02:45PM)
 * * **y** - the short year (two digits; "07")
 * * **Y** - the full year (four digits; "2007")
 * * **z** - the GMT offset ("-0800")
 * * **Z** - the time zone ("GMT")
 * @param {Date} date A date object to format
 * @param {String} format A format string using the `%` as a format identifier for the above values
 * @example
 date.format(new Date(), '%A %d%o') // Monday 17th
 */
exports.format = function format( date, format ){
	date = typeof date === 'string' ? new Date( Date.parse( date ) ) : date;

	if( !exports.isValid( date ) ){
		return null;
	}

	format = !!format ? format: "%x %X";

	if( typeof format === 'string'){
		format = DateFormats[ format.toLowerCase() ]|| format;
	}
	if( typeof format === 'function' ){
		return format( date );
	}



	return format.replace(/%([a-z%])/gi, function( $0, $1 ){
		switch( $1 ){
				case 'a': return rfcDayAbbr[dateGetter(date,'day')];
				case 'A': return rfcDay[dateGetter(date,'day')];
				case 'b': return rfcMonthAbbr[dateGetter(date,'month')];
				case 'B': return rfcMonth[dateGetter(date,'month')];

				case 'c': return exports.format( date, '%a %b %d %H:%M:%S %Y');
				case 'd': return pad(dateGetter(date,'date'), 2);
				case 'e': return pad(dateGetter(date,'date'), 2, ' ');
				case 'H': return pad(dateGetter(date,'hr'), 2);
				case 'i': return dateGetter( date, "IndyTimeZone");
				case 'I': return pad((dateGetter(date,'hr') % 12) || 12, 2);
				case 'j': return pad(dateGetter(date,'dayofyear'), 3);
				case 'k': return pad(dateGetter(date,'hr'), 2, ' ');
				case 'l': return pad((dateGetter(date,'hr') % 12) || 12, 2, ' ');
				case 'L': return pad(dateGetter(date,'ms'), 3);
				case 'm': return pad((dateGetter(date,'mo') + 1), 2);
				case 'M': return pad(dateGetter(date,'min'), 2);
				case 'p': return exports.getAMPM( date );
				case 'o': return dateGetter( date, 'ordinal');
				case 's': return Math.round(date / 1000);
				case 'S': return pad(dateGetter(date, 'seconds'), 2);
				case 'T': return exports.format(date, '%H:%M:%S');
				case 'U': return pad(dateGetter(date, 'week'), 2);
				case 'w': return dateGetter(date,'day');
				case 'x': return exports.format(date, '%m/%d/%Y');
				case 'X': return exports.format(date, '%H:%M');
				case 'y': return dateGetter(date, 'year').toString().substr(2);
				case 'Y': return dateGetter(date, 'year');
				case 'z': return dateGetter(date, 'GMTOffset');
				case 'Z': return dateGetter(date, 'Timezone');
			}
		return $1;
	});

};

exports.formats = DateFormats;
exports.totalDaysInMonth = mdate.totalDaysInMonth;
exports.totalDaysInYear = mdate.totalDaysInYear;
exports.dayOfTheYear = mdate.dayOfTheYear;
exports.weekOfTheYear = mdate.weekOfTheYear;
exports.parseIso = mdate.parseIso;
exports.isSame = mdate.isSame;
exports.quarter = mdate.quarter;
exports.startOf = mdate.startOf;
exports.utc = moment.utc;
