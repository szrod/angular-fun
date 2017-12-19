/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module core
 */

import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

/* tslint:disable:no-magic-numbers */

/* tslint:disable:variable-name */

/**
 * Core Utilities Class
 */
export class CoreUtils {

  public static IS_CHROME: boolean = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  public static IS_SAFARI: boolean = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

  /**
   * Generate a random number that includes both min and max
   * @param {number} min
   * @param {number} max
   * @return {number}
   * @constructor
   */
  public static RANDOM(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random boolean true or false
   * @constructor
   */
  public static RANDBOOL(): boolean {
    const a: Uint8Array = new Uint8Array(1);
    crypto.getRandomValues(a);
    return a[0] > 127;
  }

  /**
   * Generate a random ID
   * @param {string} len
   * @return {string}
   * @constructor
   */
  public static RANDID(len: number): string {
    const arr: Uint8Array = new Uint8Array((len || 40) / 2);
    crypto.getRandomValues(arr);
    return Array.from(arr, CoreUtils.DEC_2_HEX).join('');
  }

  public static TIMESTAMP(additionalMins: number): string {
    const preDate: Date = new Date();
    const miliseconds: number = 60000;
    const date: Date = new Date(preDate.getTime() + additionalMins * miliseconds);

    // request a weekday along with a long date
    let options: DateTimeFormatOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    console.log(new Intl.DateTimeFormat('de-DE', options).format(date));
    // → "Donnerstag, 20. Dezember 2012"

    // an application may want to use UTC and make that visible
    options.timeZone = 'UTC';
    options.timeZoneName = 'short';
    console.log(new Intl.DateTimeFormat('en-US', options).format(date));
    // → "Thursday, December 20, 2012, GMT"

    // sometimes you want to be more precise
    options = {
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      timeZoneName: 'short'
    };
    console.log(new Intl.DateTimeFormat('en-AU', options).format(date));
    // → "2:00:00 pm AEDT"

    // sometimes even the US needs 24-hour time
    options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false
    };
    console.log(date.toLocaleString('en-US', options));
    // → "12/19/2012, 19:00:00"
    return date.toLocaleString('en-US', options);
  }

  public static DATESTAMP(dayOffset: number): Date {
    const current: Date = new Date();
    current.setDate(current.getDate() + dayOffset);
    return current;
  }

  private static DEG_2_RAD(deg: number): number {
    return deg * (Math.PI / 180);
  }

  private static DEC_2_HEX(dec: number): string {
    return ('0' + dec.toString(16)).substr(-2);
  }

}
