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
                var _b = get_date_min(_t), _ = _b[0], _min = _b[1];
                for (var m = min; m <= _min; m++)
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
    return Object.keys(id).sort(function (id1, id2) { return id[id1] - id[id2]; })[0];
}
function hot_minute(id, timetable) {
    var min = {};
    Object.values(timetable).forEach(function (table) {
        if (table[0].id === id) {
            table.forEach(function (m, i) {
                console.log(m);
                if (m.sleep)
                    min[i] = (min[i] || 0) + 1;
            });
        }
    });
    return Object.keys(min).sort(function (a, b) { return a - b; })[0];
}
function first(timetable) {
    var id = slept_the_most(timetable);
    console.log(id);
    return hot_minute(id, timetable);
}
function main() {
    var path = 'input/day_4.txt';
    var timestamps = parse_input(Util.format_as_strings(Util.read_file(path)));
    var timetable = fill_timetable(timestamps);
    //console.log(timetable);
    var _first = first(timetable);
    console.log('First:', _first);
}
main();
