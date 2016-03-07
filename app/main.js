utils = require('./utils');

var startBtn = document.getElementById("start-button");
var stopBtn = document.getElementById("stop-button");
var minutesDisplay = document.getElementById("minutes");
var secondsDisplay = document.getElementById("seconds");
var alarmSound = document.getElementById("alarm-sound");
var tickingSound = document.getElementById("ticking-sound");
var volumeRange = document.getElementById("volume-range");
var pomodoroDuration = 1;   // Hard coded, for now
var startTime = 0;  // initialized with 0 (no start time)
var timeLeft = null;
var checkIntervalId = null;


window.onload = function () {
    resetTimer(pomodoroDuration);
}

function resetTimer(pomodoroDuration) {
    minutesDisplay.textContent = utils.pad(pomodoroDuration);
    secondsDisplay.textContent = "00";
    startTime = 0;
}

function updateDisplay(timeLeft) {
    minutesDisplay.textContent = utils.pad(utils.remainingMinutes(timeLeft));
    secondsDisplay.textContent = utils.pad(utils.remainingSeconds(timeLeft));
}

startBtn.onclick = function(event) {
  if (startTime != 0) {
    // Pomodoro already in action
    return null;
  } else {
    tickingSound.volume = volumeRange.value;
    tickingSound.play();
    utils.fadeOut(tickingSound, volumeRange.value);
    startTime = new Date(Date.now());
    checkIntervalId = setInterval(
        function () {
            timeLeft = utils.remainingTime(
                pomodoroDuration,
                startTime,
                new Date(Date.now())
            );
            updateDisplay(timeLeft);
            /* Stop updating the display once we reach 0 */
            if (timeLeft == 0) {
                alarmSound.play();
                clearInterval(checkIntervalId);
            };
        },
        500
    );
  } 
};

stopBtn.onclick = function(event) {
  if (startTime == 0) {
    // Pomodoro wasn't started yet
    return null;
  } else {
    clearInterval(checkIntervalId);
    resetTimer(pomodoroDuration)
  } 
};

