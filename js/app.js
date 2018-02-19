
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

function setCalendar() {
  drawCalendar(firstDay + 1, days, date, monthName, year)
}

function drawCalendar(firstDay, lastDate, date, monthName, year) {
 
  var headerHeight = 30 
  var border = 0 
  var cellspacing = 4 
  var headerColor = "midnightblue" 
  var headerSize = "+1" 
  var colWidth = 25 
  var dayCellHeight = 25 
  var dayColor = "darkblue" 
  var cellHeight = 20 
  var todayColor = "red" 
    //Table structure 

  var text = "" // initialize accumulative variable to empty string
  text += '<CENTER>'
  text += '<TABLE BORDER=' + border + ' CELLSPACING=' + cellspacing + '>' // table settings
  // variables to hold constant settings
  var openCol = '<TD WIDTH=' + colWidth + ' HEIGHT=' + dayCellHeight + '>'
  openCol += '<FONT COLOR="' + dayColor + '">'
  var closeCol = '</FONT></TD>'
  // create array of abbreviated day names
  var weekDay = new Array(7)
  weekDay[0] = "S"
  weekDay[1] = "M"
  weekDay[2] = "T"
  weekDay[3] = "W"
  weekDay[4] = "T"
  weekDay[5] = "F"
  weekDay[6] = "S"
// create first row of table to set column width and specify week day
  text += '<TR ALIGN="center" VALIGN="center">'
  for (var dayNum = 0; dayNum < 7; ++dayNum) {
    text += openCol + weekDay[dayNum] + closeCol
  }
  text += '</TR>'
  text += '<TH id="Header" COLSPAN=7 HEIGHT=' + headerHeight + '>' // create table header cell
  text += '<FONT COLOR="' + headerColor + '" SIZE=' + headerSize + '>' // set font for table header
  text += monthName + ' ' + year
  text += '</FONT>' // close table header's font settings
  text += '</TH>' // close header cell

  // declaration and initialization of two variables to help with tables
  var digit = date
  var curCell = 1
  daysDisplayed = 0;

  for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row) {
    if (digit > lastDate) {
      break;
    }
    text += '<TR ALIGN="right" VALIGN="top">'
    for (var col = 1; col <= 7; ++col) {
      if (digit > lastDate) {
        var rows = Math.ceil((lastDate + firstDay - 1) / 7);
        if (col < 7) {

          for (var index = col; index <= 7; ++index) {
            text += '<TD class="invalidDay"></TD>';
          }
          break;
        }
        break;
      }
      if (curCell < firstDay) {
        text += '<TD class="invalidDay"></TD>';
        curCell++
      } else {
        if (digit == date) { // current cell represent today's date
          if (col == 1 || col == 7) {
            text += '<TD class="Weekends" HEIGHT=' + cellHeight + '>'
            //text += '<TD HEIGHT=' + cellHeight + '>'
          }
          else {
            text += '<TD class="Weekdays" HEIGHT=' + cellHeight + '>'
          }
          text += '<FONT COLOR="' + todayColor + '">'
          text += digit
          text += '</FONT>'
          text += '</TD>'
        } else {
          if (col == 1 || col == 7) {
            text += '<TD class="Weekends" HEIGHT=' + cellHeight + '>' + digit + '</TD>'
          }
          else {
            text += '<TD class="Weekdays" HEIGHT=' + cellHeight + '>' + digit + '</TD>'
          }
        }

        digit++
        daysDisplayed++;
      }
    }
    text += '</TR>'
  }
  
  text += '</TABLE>'
  text += '</CENTER>'
  // print accumulative HTML string
  document.getElementById("calendar").innerHTML = document.getElementById("calendar").innerHTML + text;
}
$(document).ready(function () {  
  document.getElementById("btnCalendar").addEventListener("click", function () {
    document.getElementById("calendar").innerHTML = "";
    now = new Date($('#startDate').val())
    year = now.getYear()
    if (year < 1000)
      year += 1900
    month = now.getMonth()
    monthName = getMonthName(month)
    date = now.getDate()
    firstDayInstance = new Date(year, month, date)
    firstDay = firstDayInstance.getDay()
    firstDayInstance = null
    days = date + parseInt($('#numberDays').val() - 1);
    numberDays = parseInt($('#numberDays').val());
    var country = $('#countryCode').val();

    while (numberDays > 0) {
      var totalDays = getDays(month, year); 

      var tempDays = date + numberDays;
      if (tempDays > totalDays) {
        lastDay = totalDays;
      }
      else {
        lastDay = date + numberDays;
      }
      days = lastDay;
      setCalendar();
      numberDays = numberDays - daysDisplayed;
      now = now.addMonths(1);
      year = now.getYear();
      if (year < 1000)
        year += 1900;
      month = now.getMonth();
      monthName = getMonthName(month);
      date = 1;
      firstDayInstance = new Date(year, month, date);
      firstDay = firstDayInstance.getDay();
      firstDayInstance = null;
    }
  });
});

function Ajax() {
  $.ajax({
    type: "GET",
    crossDomain: true,   
    url: "https://holidayapi.com/v1/holidays",    
    data: {
      key: '080a3c2b-f00b-419e-b528-93ab3b386e02',
      country: 'US',
      year: '2008',
      month: '12',
      day: '25'
    },
    contentType: 'application/json; charset=uft-8',
    dataType: "json",
    beforeSend: function (httpReq) {
      debugger;
      var httpReq = new XMLHttpRequest();
      var url = 'https://holidayapi.com/v1/holidays';
      httpReq.open('GET', url);
      httpReq.setRequestHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
      httpReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      httpReq.setRequestHeader('Access-Control-Allow-Origin', '*');
      httpReq.setRequestHeader('Access-Control-Allow-Credentials', 'true');
      httpReq.setRequestHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
      httpReq.setRequestHeader('Access-Control-Allow-Origin', '*');
      httpReq.withCredentials = true;
    },
    success: function (response) {
      alert('The holidays have been returned succesfuly');
    },
    error: function (response) {
      alert('The holidays have been returned with an errors');
    }
  });
}



