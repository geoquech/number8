
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