// Live UTC Digital Clock
function startTimeUTC() {
    var today = new Date();
    var utc_date = today.toUTCString();
    // UTC Date
    const arr = utc_date.split(" ")
    const [, day, mon, yr, ,] = arr;
    const date = day + " " + mon + " " + yr;
    document.getElementById('UTC-date').innerHTML = date;
    // UTC Timestamp
    ts = Math.floor((new Date()).getTime() / 1000);
    document.getElementById('UTC-ts').innerHTML = ts;
    // UTC Live Clock
    var h = today.getUTCHours();
    var m = today.getUTCMinutes();
    var s = today.getUTCSeconds();
    m = checkTimeUTC(m);
    s = checkTimeUTC(s);
    document.getElementById('UTC-live-clock').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTimeUTC, 500);
}
function checkTimeUTC(i) {
    if (i < 10) { i = "0" + i };  // Add zero in front of numbers < 10
    return i;
}

// Live Local Digital Clock
function startTime() {
    var today = new Date();
    const local_date = today.toDateString();
    // Local Date
    const arr = local_date.split(" ")
    const [, mon, day, yr] = arr;
    const date = day + " " + mon + " " + yr
    document.getElementById('local-date').innerHTML = date;
    // local Timezone
    const local_time = today.toTimeString();
    const str_arr = local_time.split(new RegExp("\\(|\\)"));
    const tz = str_arr[1];
    document.getElementById('local-tz').innerHTML = tz;
    // Local Live Clock
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('local-live-clock').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // Add zero in front of numbers < 10
    return i;
}

// Timestamp to date & time converter
function getTS(t) {
    var ts = t.value;

    // convert unix timestamp to milliseconds
    var ts_ms = ts * 1000;

    // initialize new Date object
    var date_ob = new Date(ts_ms);

    // Spliting the whole string
    splt_str = date_ob.toString();
    local_time = splt_str.split(" G")[0]
    document.getElementById("local_time").innerHTML = local_time;

    // UTC Time
    const datetime = date_ob.toDateString() + " " + date_ob.toLocaleTimeString() + " GMT+1100"

    const dt = new Date(datetime).toString()

    const utc_time = dt.split(" G")[0]
    document.getElementById("utc_time").innerHTML = utc_time;
}


// Datetime Picker
$(function () {
    // Date Picker
    $('#datepicker').datetimepicker({
        format: 'DD-MM-YYYY'
    })

    $('#datepicker').on('dp.change', function (e) {
        dt = e.date.format('YYYY-MM-DD');
        getTimeValue();
    })
});


// Time Calculation

function getTimeValue() {
    let hh, mm, ss;
    [hh, mm, ss] = [0, 0, 0];

    if (document.getElementById("hh").value) {
        hh = document.getElementById("hh").value;
    }
    if (document.getElementById("mm").value) {
        mm = document.getElementById("mm").value;
    }
    if (document.getElementById("ss").value) {
        ss = document.getElementById("ss").value;
    }
    getTimestamp(hh, mm, ss);
}

// Converting into timestamp
function getTimestamp(h = 0, m = 0, s = 0) {
    if (typeof dt === 'undefined') {
        dt = '1970-01-01';
    }

    let [y, mo, d] = dt.split("-");
    mo = mo - 1;
    var fullTime = new Date(y, mo, d, h, m, s, 0);
    ts_ml = Date.parse(fullTime);
    const ts = ts_ml / 1000;

    document.getElementById("getTS").innerHTML = ts;
}

// Auto tab functionality
function autoTab(field1, len, field2) {
    if (document.getElementById(field1).value.length == len) {
        document.getElementById(field2).focus();
    }
}