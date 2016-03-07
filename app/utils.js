/* 
 * Returns number of seconds remaining to the end of the Pomodoro
 *
 * All of the time variables are normalized to seconds in the code.
 *
 * Args:
 *  duration: in minutes of interval being read (pomodoro or break)
 *  startTime: datetime of when the counter started
 *  currentTime: current datetime
 */
function remainingTime(duration_minutes, startTime, currentTime) {
    duration = duration_minutes * 60;
    if (startTime == 0) {
        // timer wasn't started
        return duration;
    }
    elapsedTime = (currentTime - startTime) / 1000;  // ms -> s conversion
    if (elapsedTime < 0) {
        throw Error("Negative elapsed time.");
    } else if (elapsedTime >= duration) {
        return 0;
    } else {
        return duration - elapsedTime;
    }
}

function remainingMinutes(timeLeft) {
    return Math.floor(timeLeft / 60);
}

function remainingSeconds(timeLeft) {
    return Math.floor(timeLeft % 60);   
}

/* Pad number with leading zero if necessary. We always want 2 digits. */
function pad(num) {
    var s = "" + num;
    if (s.length == 1) {
        return "0" + s;
    } else {
        return s;
    }
}

function fadeOut(sound, baseVolume) {
    // TODO: make this play well with the volume control
    var step = baseVolume / 20;
    var fadeInterval = setInterval(
        function () {
            if (sound.volume  - step <  0.0) {
                sound.volume = 0.0;
                clearInterval(fadeInterval);
            } else {
                sound.volume -= step;
            }
        },
        200
    )
}

exports.remainingTime = remainingTime;
exports.remainingMinutes = remainingMinutes;
exports.remainingSeconds = remainingSeconds;
exports.pad = pad;
exports.fadeOut = fadeOut;
