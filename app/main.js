utils = require('./utils');

var startBtn = document.getElementById("start-button");
var stopBtn = document.getElementById("stop-button");
var minutesDisplay = document.getElementById("minutes");
var secondsDisplay = document.getElementById("seconds");
var pomodoroDuration = 25;   // Hard coded, for now
var startTime = 0;  // initialized with 0 (no start time)
var checkIntervalId = null;


function updateDisplay(startTime) {
    var currentTime = new Date(Date.now());
    timeLeft = utils.remainingTime(
        pomodoroDuration,
        startTime,
        currentTime
    );
    minutesDisplay.textContent = utils.remainingMinutes(timeLeft);
    secondsDisplay.textContent = utils.remainingSeconds(timeLeft);
    console.log("time left = " + timeLeft);
}

startBtn.onclick = function(event) {
  if (startTime != 0) {
    // Pomodoro already in action
    return null;
  } else {
    startTime = new Date(Date.now());
    checkIntervalId = setInterval(
        function () {
           return updateDisplay(startTime);
        },
        500
    );
    // TODO: this check keeps going forever even after the end of the pomodoro (until someone says stop).
  } 
};

stopBtn.onclick = function(event) {
  if (startTime == 0) {
    // Pomodoro wasn't started yet
    return null;
  } else {
    clearInterval(checkIntervalId);
    startTime = 0;
    minutesDisplay.text = pomodoroDuration;
    secondsDisplay.text = 0;
  } 
};

