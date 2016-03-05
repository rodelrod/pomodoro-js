/* 
 * Returns number of seconds remaining to the end of the Pomodoro i
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

exports.remainingTime = remainingTime;
exports.remainingMinutes = remainingMinutes;
exports.remainingSeconds = remainingSeconds;
