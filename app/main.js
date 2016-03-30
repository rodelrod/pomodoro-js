utils = require('./utils');
Sortable = require('sortablejs');
/*
 * Load Vex JS and CSS
 */
// Fix for npm vex require: https://github.com/webpack/webpack/issues/1344
vex = require('vex-js/js/vex.js');
vex.dialog = require('vex-js/js/vex.dialog.js');
require('vex-js/css/vex.css');
require('vex-js/css/vex-theme-default.css');
vex.defaultOptions.className = 'vex-theme-default';

var toggleBtn = document.getElementById("toggle-timer-button");
var doneBtn = document.getElementById("done-button");
var minutesDisplay = document.getElementById("minutes");
var secondsDisplay = document.getElementById("seconds");
var alarmSound = document.getElementById("alarm-sound");
var tickingSound = document.getElementById("ticking-sound");
var volumeRange = document.getElementById("volume-range");
var addTaskBtn = document.getElementById("addTask");
var pomodoroDuration = 25;   // Hard coded, for now
var startTime = 0;  // initialized with 0 (no start time)
var timeLeft = null;
var checkIntervalId = null;


window.onload = function () {
    resetTimer(pomodoroDuration);
    setupTaskList();
};

function resetTimer(pomodoroDuration) {
    minutesDisplay.textContent = utils.pad(pomodoroDuration);
    secondsDisplay.textContent = "00";
    startTime = 0;
}

function updateDisplay(timeLeft) {
    minutesDisplay.textContent = utils.pad(utils.remainingMinutes(timeLeft));
    secondsDisplay.textContent = utils.pad(utils.remainingSeconds(timeLeft));
}


toggleBtn.onclick = function(event) {
    // checking time every 500 ms will lead to jumpy updates but keeps 
    // CPU usage down. Fell free to lower this to 100 ms or whatever.
    var poll_interval = 500
    if (startTime != 0) {
        toggleBtn.textContent = "Start timer";
      // Pomodoro already in action
      clearInterval(checkIntervalId);
      resetTimer(pomodoroDuration);
    } else {
        // Pomodoro wasn't started yet
        toggleBtn.textContent = "Stop timer";
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
                }
            },
            500
        );
    } 
};

doneBtn.onclick = function(event) {
  if (startTime == 0) {
    // Pomodoro wasn't started yet
    return null;
  } else {
    // Pomodoro already in action
    clearInterval(checkIntervalId);
    resetTimer(pomodoroDuration);
  }
};

/*
 *  Task List
 */

function setupTaskList() {
    var editable = document.getElementById('editable');
    var editableList = Sortable.create(editable, {
        animation: 150,
        filter: '.js-remove',
        onFilter: function (evt) {
            var el = editableList.closest(evt.item); // get dragged item
            el && el.parentNode.removeChild(el);
        }
    });
}

addTaskBtn.onclick = function () {
    vex.dialog.prompt({
        message: 'Gimme a task',
        placeholder: 'Name of task',
        callback: function(value) {
            return console.log(value);
        }
    });
};

