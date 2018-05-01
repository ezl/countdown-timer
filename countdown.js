/*global $, document, setTimeout, clearTimeout */
(function() {

var t,
	timer_is_on = false,
	seconds = 60;

function addSecond() {
	seconds += 1;
	updateTimerDisplay()
}

function addMinute() {
	seconds += 60;
	updateTimerDisplay()
}

function clearTimer() {
	seconds = 0;
	updateTimerDisplay()
}

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
	if (seconds < 0) {
		$('body').addClass('red');
	} else {
		$('body').removeClass('red');
	}
}

function tick() {
	seconds = seconds - 1;
}
function timedCount() {
	tick();
	updateTimerDisplay();
	t = setTimeout(function() { timedCount(); },1000);
}

function doTimer() {
	clearTimeout(t);
	if (!timer_is_on) {
		$('#btn-start').html('Stop');
		$('#btn-start').removeClass('start');
		$('#btn-start').addClass('stop');
		timer_is_on = true;
		timedCount();
	} else {
		$('#btn-start').html('Start');
		$('#btn-start').removeClass('stop');
		$('#btn-start').addClass('start');
		timer_is_on = false;
	}
}

$(document).ready(function() {
	updateTimerDisplay();
	$('#btn-start').click(doTimer);
	$('#btn-clear').click(clearTimer);
	$('#btn-minute').click(addMinute);
	$('#btn-second').click(addSecond);});
})();