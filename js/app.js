
var now = "";
var year = "";
var month = "";
var monthName = "";
var date = "";
var firstDayInstance = "";
var firstDay = "";
var days = "";
var daysDisplayed = 0;
var numberDays = 0;
var lastDay = 0;

var key = '080a3c2b-f00b-419e-b528-93ab3b386e02';
var countryCode = 'US';
var httpReq = "";

function leapYear(year) {
  if (year % 4 == 0) 
    return true   
  return false
}

function getDays(month, year) {
  
  var ar = new Array(12)
  ar[0] = 31 // January
  ar[1] = (leapYear(year)) ? 29 : 28 // February
  ar[2] = 31 // March
  ar[3] = 30 // April
  ar[4] = 31 // May
  ar[5] = 30 // June
  ar[6] = 31 // July
  ar[7] = 31 // August
  ar[8] = 30 // September
  ar[9] = 31 // October
  ar[10] = 30 // November
  ar[11] = 31 // December  
  return ar[month]
}
function getMonthName(month) {
  // create array to hold name of each month
  var ar = new Array(12)
  ar[0] = "January"
  ar[1] = "February"
  ar[2] = "March"
  ar[3] = "April"
  ar[4] = "May"
  ar[5] = "June"
  ar[6] = "July"
  ar[7] = "August"
  ar[8] = "September"
  ar[9] = "October"
  ar[10] = "November"
  ar[11] = "December"
  // return name of specified month (parameter)
  return ar[month]
}

function getWeek(day, lastDate, firstDay) {
  /** */
  var week = 0;
  digit = 1;
  for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row) {
    for (var col = 1; col <= 7; ++col) {
      digit++;
      if (digit == day) {
        return week;
      }
    }
    week++;
  }
}

