/*global $, document, setTimeout, clearTimeout */
(function() {


/* init */

var t,
    timerIsOn = false,
    seconds = 60;

/* make the clock actually count down */

function tick() {
    seconds = seconds - 1;
    updateTimerDisplay();
    t = setTimeout(function() { tick(); }, 1000);
}

/* start, stop, clear, add time */

function startTimer() {
    $('#btn-start').html('Stop');
    $('#btn-start').removeClass('green');
    $('#btn-start').addClass('red');
    timerIsOn = true;
    tick();
}

function stopTimer() {
    clearTimeout(t);
    $('#btn-start').html('Start');
    $('#btn-start').removeClass('red');
    $('#btn-start').addClass('green');
    timerIsOn = false;
}

function clearTimer() {
    stopTimer();
    seconds = 0;
    updateTimerDisplay()
}

function addSecond() {
    seconds += 1;
    updateTimerDisplay()
}

function addMinute() {
    seconds += 60;
    updateTimerDisplay()
}

/* display stuff */

function formatDisplay(seconds) {
    var isNegative = seconds < 0;
    var magnitude = Math.abs(seconds);
    var displayMinutes = parseInt(magnitude / 60);
    var displaySeconds = magnitude % 60;
    if (displaySeconds < 10) {
        displaySeconds = "0" + displaySeconds;
    }
    var sign = isNegative ? "-" : "";
    return sign + displayMinutes + ":" + displaySeconds;
}

function updateTimerDisplay() {
    /* set the outstring */ 
    var outStr = formatDisplay(seconds);
    $('#countdown').html(outStr);
    setBackgroundColor();
}

function setBackgroundColor() {
    console.log(seconds);
    if (seconds > 15) {
        $('body').removeClass('red');
        $('body').removeClass('yellow');
    } else if ((0 < seconds) && (seconds <= 15)) {
        $('body').removeClass('red');
        $('body').addClass('yellow');
    } else if (seconds === 0) {
        if (timerIsOn === true) {
            $('body').removeClass('yellow');
            $('body').addClass('red');
        } else {
            $('body').removeClass('red');
            $('body').removeClass('yellow');
        }
    } else {
        // seconds < 0
        $('body').removeClass('yellow');
        $('body').addClass('red');
    }
}

function startStop() {
    if (!timerIsOn) {
        startTimer();
    } else {
        stopTimer();
    }
    setBackgroundColor();
}

/* actually do stuff */

$(document).ready(function() {
    updateTimerDisplay();
    $('#btn-start').click(startStop);
    $('#btn-clear').click(clearTimer);
    $('#btn-minute').click(addMinute);
    $('#btn-second').click(addSecond);});
})();
