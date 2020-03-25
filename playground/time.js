var moment = require('moment');

// // Jan 1st 1970 00:00:00 am
// // timestamp will always be in milli seconds
// // but still it would be better if it is written 3 min ago rather than a perfect date and time
//
// var date = new Date();
// var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
// // returns 0-11 as months
// console.log(months[date.getMonth()]);

// var date = moment();
// date.add(1, 'year').subtract(12, 'months');
// // comma not part of patterns that format expects so it will print like the same
// console.log(date.format('Do MMM, YYYY'));

// padding: 04, no padding: 4
var date = moment();
console.log(date.format('h:mm:SS a'));
