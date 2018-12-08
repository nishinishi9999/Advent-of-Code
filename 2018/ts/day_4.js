"use strict";
exports.__esModule = true;
var Util = require("./util");
function sort_timestamps(timestamps) {
    return timestamps.sort(function (t1, t2) {
        return t1.month === t2.month && t1.day === t2.day && t1.hour === t2.hour ? t1.min - t2.min
            : t1.month === t2.month && t1.day === t2.day ? t1.hour - t2.hour
                : t1.month === t2.month ? t1.day - t2.day
                    : t1.month - t2.month;
    });
}
function parse_input(input) {
    return sort_timestamps(input.map(function (str) {
        var match = str.match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.+)/);
        if (match && match.length === 7) {
            var _a = match.slice(2), month = _a[0], day = _a[1], hour = _a[2], min = _a[3], _action = _a[4];
            var action = _action === 'wakes up' ? 'wakeup' : _action === 'falls asleep' ? 'fall' : 'begin';
            var id = action === 'begin'
                ? parseInt(_action.split(' ').find(function (_) { return _[0] === '#'; }).substr(1))
                : -1;
            return {
                id: id,
                month: parseInt(month),
                day: parseInt(day),
                hour: parseInt(hour),
                min: parseInt(min),
                action: action
            };
        }
        else {
            throw 'No match: ' + str;
        }
    }));
}
function get_date_min(t) {
    var date = t.month + "-" + (t.day + (t.hour === 23 ? 1 : 0));
    var min = t.hour === 23 ? 0 : t.min;
    return [date, min];
}
function fill_timetable(timestamps) {
    var table = {};
    var _loop_1 = function (i) {
        var t = timestamps[i];
        var _a = get_date_min(t), date = _a[0], min = _a[1];
        if (t.action == 'begin') {
            table[date] = Array(60).fill(0).map(function () { return ({ sleep: false, id: t.id }); });
        }
        else if (t.action === 'fall') {
            if (timestamps[i + 1] && timestamps[i + 1].action === 'wakeup') {
                var _t = timestamps[++i];
                var _b = get_date_min(_t), _min = _b[1];
                for (var m = min; m < _min; m++)
                    table[date][m].sleep = true;
            }
            else {
                throw 'No contiguous wake up.';
            }
        }
        out_i_1 = i;
    };
    var out_i_1;
    for (var i = 0; i < timestamps.length; i++) {
        _loop_1(i);
        i = out_i_1;
    }
    return table;
}
function slept_the_most(timetable) {
    var id = {};
    Object.values(timetable).forEach(function (table) {
        return id[table[0].id] = (id[table[0].id] || 0) + table.filter(function (_) { return _.sleep; }).length;
    });
    return parseInt(Util.obj_max(id));
}
function hot_minute(id, timetable) {
    var min = {};
    Object.values(timetable).forEach(function (table) {
        if (table[0].id === id) {
            table.forEach(function (m, i) {
                if (m.sleep)
                    min[i] = (min[i] || 0) + 1;
            });
        }
    });
    return parseInt(Util.obj_max(min));
}
function first(timetable) {
    var id = slept_the_most(timetable);
    return id * hot_minute(id, timetable);
}
function mins_slept(timetable) {
    var mins = Array(60).fill(0).map(function (_) { return ({}); });
    Object.values(timetable).forEach(function (table) {
        table.forEach(function (m, i) {
            if (m.sleep)
                mins[i][m.id] = (mins[i][m.id] || 0) + 1;
        });
    });
    return mins;
}
function second(timetable) {
    var mins = mins_slept(timetable);
    // Maximum minutes slept in any given minute
    var max_mins = mins.map(function (min) {
        return Object.keys(min).length ? Object.values(min).sort(function (a, b) { return b - a; })[0] : 0;
    });
    // Minute with the most minutes slept
    var max_key = parseInt(Util.obj_max(max_mins));
    // Id with the most minutes slept
    var max_id = Util.obj_find_key(mins[max_key], max_mins[max_key]);
    return max_id * max_key;
}
function main() {
    var path = 'input/day_4.txt';
    var timestamps = parse_input(Util.format_as_strings(Util.read_file(path)));
    var timetable = fill_timetable(timestamps);
    var _first = first(timetable);
    var _second = second(timetable);
    console.log('First:', _first);
    console.log('Second:', _second);
}
main();
