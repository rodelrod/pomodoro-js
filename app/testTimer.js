var test = require('tape');
tested = require('./utils');

test("calculates remaining seconds on a running timer", function(t) {
    t.equal(
        tested.remainingTime(
            25, 
            new Date('2016-01-01 00:00:00'), 
            new Date('2016-01-01 00:09:10')
        ),
        (25 * 60) - (9 * 60 + 10),
        "timer is still running and there's some time left"
    );
    t.equal(
        tested.remainingTime(
            25, 
            new Date('2016-01-01 00:00:00'), 
            new Date('2016-01-01 00:29:10')
        ),
        0,
        "timer has ran out"
    );
    t.throws(
        tested.remainingTime.bind(
            null,
            25, 
            new Date('2016-01-01 00:09:10'),
            new Date('2016-01-01 00:00:00') 
        ),
        /Negative elapsed time/,
        "negative elapsed time throws an exception"
    );
    t.end();
});
