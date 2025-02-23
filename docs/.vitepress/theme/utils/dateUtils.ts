


/**
 * Second	
 * s	0 1 ... 58 59
 * ss	00 01 ... 58 59
 */

/**
 * Minute	
 * m	0 1 ... 58 59
 * mm	00 01 ... 58 59
 */

/**
 * 
 * Day of Month	
 * D	1 2 ... 30 31
 * Do	1st 2nd ... 30th 31st (with ordinal suffix )
 * DD	01 02 ... 30 31
 */


/**
 * Day of Week	
 * d	0 1 ... 5 6
 * do	0th 1st ... 5th 6th
 * dd	Su Mo ... Fr Sa
 * ddd	Sun Mon ... Fri Sat
 * dddd	Sunday Monday ... Friday Saturday
 * e	Mon, Tue, Wed, ..., Sun	
 * ee Monday, Tuesday, ..., Sunday
 */



/**
 * Month (formatting)	
 * M	1, 2, ..., 12	
 * MM	01, 02, ..., 12	
 * MMM	Jan, Feb, ..., Dec	
 * MMMM	January, February, ..., December
 * 
 */

/**
 * Quarter	
 * Q	1 2 3 4 
 * Qo	1st 2nd 3rd 4th
 */


/**
 * Year	
 * YY	70 71 ... 29 30
 * YYYY	1970 1971 ... 2029 2030
 */

type DateInput = string | number | Date;

interface TokenMap {
  [key: string]: number | string;
}

const ORDINAL_SUFFIXES = ['th', 'st', 'nd', 'rd'];

const WEEKDAYS = {
  short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

const MONTHS = {
  short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};





export const DateUtils = {
  startOfDay: (date: Date) => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  },
  endOfDay: (date: Date) => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  },
  startOfMonth: (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setDate(1);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  },
  endOfMonth: (date: Date): boolean => {
    date.setMonth(date.getMonth() + 1, 0);
    date.setHours(23, 59, 59, 999);
    return true;
  },

  getOrdinalSuffix: (number: number): string => {
    const suffix = ORDINAL_SUFFIXES[number % 10] ?? ORDINAL_SUFFIXES[0];
    return number + suffix;
  },

}


const getOrdinalSuffix = (number: number): string => {
  const suffix = ORDINAL_SUFFIXES[number % 10] ?? ORDINAL_SUFFIXES[0];
  return number + suffix;
}

const padNumber = (value: number, length: number = 2): string => {
  return String(value).padStart(length, '0');
}



const getTokenValue = (date: Date, token: string): string => {
  switch (token) {
    // Year
    case 'YYYY': return String(date.getFullYear());
    case 'YY': return String(date.getFullYear() % 100).padStart(2, '0');

    // Month
    case 'MMMM': return MONTHS.long[date.getMonth()];
    case 'MMM': return MONTHS.short[date.getMonth()];
    case 'MM': return padNumber(date.getMonth() + 1);
    case 'M': return String(date.getMonth() + 1);

    // Day
    case 'DD': return padNumber(date.getDate());
    case 'D': return String(date.getDate());
    case 'Do': return getOrdinalSuffix(date.getDate());

    // Day of Week
    case 'dddd': return WEEKDAYS.long[date.getDay()];
    case 'ddd': return WEEKDAYS.short[date.getDay()];
    case 'd': return String(date.getDay());

    // Hours
    case 'HH': return padNumber(date.getHours());
    case 'H': return String(date.getHours());
    case 'hh': return padNumber(date.getHours() % 12 || 12);
    case 'h': return String(date.getHours() % 12 || 12);

    // Minutes
    case 'mm': return padNumber(date.getMinutes());
    case 'm': return String(date.getMinutes());

    // Seconds
    case 'ss': return padNumber(date.getSeconds());
    case 's': return String(date.getSeconds());

    // Meridiem
    case 'A': return date.getHours() < 12 ? 'AM' : 'PM';
    case 'a': return date.getHours() < 12 ? 'am' : 'pm';

    // Quarter
    case 'Q': return String(Math.ceil((date.getMonth() + 1) / 3));
    case 'Qo': return getOrdinalSuffix(Math.ceil((date.getMonth() + 1) / 3));

    default: return token;
  }
};



const TOKEN_PATTERNS = Object.keys({
  // Year tokens
  YYYY: true, YY: true,

  // Month tokens
  MMMM: true, MMM: true, MM: true, M: true,

  // Day tokens
  DD: true, D: true, Do: true,

  // Weekday tokens
  dddd: true, ddd: true, dd: true, d: true,

  // Hour tokens
  HH: true, H: true, hh: true, h: true,

  // Minute tokens
  mm: true, m: true,

  // Second tokens
  ss: true, s: true,

  // Quarter tokens
  Q: true, Qo: true,

  // Meridiem tokens
  A: true, a: true
}).sort((a, b) => b.length - a.length);


/**
 * @param {string} formatStr
 * @param  { string | number | Date } DateInput - 
 * should be one of the types: Unix Timestamp	 | dateStr | Date
 * @param {Date} referenceDate - defines values missing from the parsed dateString
 * @param options.timeZone? - 
 * @param options?.locale - 
 * 
 *DD/MM/YYYY or DD-MM-YYYY: This format is widely used in Europe,
  MM/DD/YYYY or MM-DD-YYYY or MM DD YYYY: Predominantly used in the United States, Canada
  YYYY/MM/DD or YYYY-MM-DD: Most seen in Asian  such as Japan and China, as well as in the ISO 8601 international date format
  Month Day, Year  (February 02, 2024)
  Day Month Year  (02 February 2024)
  meridiem seconds `a`:AM,PM
*/

export const formatDate = (input: DateInput, formatStr: string): string => {

  const date = new Date(input)

  return TOKEN_PATTERNS.reduce((result, token) => {
    const tokenRe = new RegExp(token, 'g')
    if (tokenRe.test(result)) {
      return result.replace(tokenRe, getTokenValue(date, token));
    }
    return result;
  }, formatStr);
}




