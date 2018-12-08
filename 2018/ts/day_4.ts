
import * as Util from './util';
import {NumberJSON} from './util';

interface Timestamp {
  id     :number,
  month  :number,
  day    :number,
  hour   :number,
  min    :number,
  action :string
}

interface TimeTable {
  [propName :string] :{
    id    :number,
    sleep :boolean
  }
}

function sort_timestamps(timestamps :Timestamp[]) :Timestamp[] {
  return timestamps.sort( (t1, t2) =>
      t1.month === t2.month && t1.day === t2.day && t1.hour === t2.hour ? t1.min  - t2.min
    : t1.month === t2.month && t1.day === t2.day                        ? t1.hour - t2.hour
    : t1.month === t2.month                                             ? t1.day  - t2.day
    : t1.month - t2.month
  );
}

function parse_input(input :string[]) :Timestamp[] {
  return sort_timestamps( input.map( str => {
    const match = str.match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.+)/);

    if(match && match.length === 7) {
      const [month, day, hour, min, _action] = match.slice(2);
      const action = _action === 'wakes up' ? 'wakeup' : _action === 'falls asleep' ? 'fall' : 'begin';
      const id =  action === 'begin'
        ? parseInt( _action.split(' ').find(_=>_[0]==='#').substr(1) )
        : -1;

      return {
        id    : id,
        month : parseInt(month),
        day   : parseInt(day),
        hour  : parseInt(hour),
        min   : parseInt(min),
        action
      };
    }
    else {
      throw 'No match: ' + str;
    }
  }) );
}

function get_date_min(t :Timestamp) :[string, number] {
  const date = `${t.month}-${t.day + (t.hour === 23 ? 1 : 0)}`;
  const min  = t.hour === 23 ? 0 : t.min;

  return [date, min];
}

function fill_timetable(timestamps :Timestamp[]) :TimeTable {
  const table = <TimeTable>{};

  for(let i = 0; i < timestamps.length; i++) {
    const t           = timestamps[i];
    const [date, min] = get_date_min(t);
    
    if( t.action == 'begin' ) {
      table[date] = Array(60).fill({ sleep: false, id: t.id });
    }  
    else if( t.action === 'fall' ) {
      if( timestamps[i+1] && timestamps[i+1].action === 'wakeup' ) {
        const _t       = timestamps[++i];
        const [, _min] = get_date_min(_t);
        
        for(let m = min; m < _min; m++) {
          table[date][m].sleep = true;
        }
      }
      else {
        throw 'No contiguous wake up.';
      }
    }
  }

  return table;
}

function slept_the_most(timetable :TimeTable) :number {
  const id = <NumberJSON>{};

  Object.values(timetable).forEach( table =>
    id[table[0].id] = (id[table[0].id]||0) + table.filter(_=>_.sleep).length
  );

  return parseInt( Util.obj_max(id) );
}

function hot_minute(id :number, timetable :TimeTable) :number {
  const min = {};

  Object.values(timetable).forEach( table => {
    if( table[0].id === id ) {
      table.forEach( (m, i) => {
        if(m.sleep)
          min[i] = (min[i]||0) + 1;
      })
    }
  });

  return parseInt( Util.obj_max(min) );
}

function first(timetable :TimeTable) :number {
  const id = slept_the_most(timetable);
  return id * hot_minute(id, timetable);
}

function mins_slept(timetable :TimeTable) :[{ [propName] :number[] }] {
  const mins = Array(60).fill(0).map(_=>({}));

  Object.values(timetable).forEach( table => {
    table.forEach( (m, i) => {
      if( m.sleep )
        mins[i][m.id] = (mins[i][m.id]||0) + 1
    })
  });

  return mins;
}

function second(timetable :TimeTable) :number {
  const mins = mins_slept(timetable);

  // Maximum minutes slept in any given minute
  const max_mins = mins.map( min =>
    Object.keys(min).length ? Object.values(min).sort( (a, b) => b-a )[0] : 0
  );

  // Minute with the most minutes slept
  const max_key = parseInt( Util.obj_max(max_mins) );
  // Id with the most minutes slept
  const max_id = Util.obj_find_key(mins[max_key], max_mins[max_key]);

  return max_id*max_key;
}

function main() {
  const path = 'input/day_4.txt';
  const timestamps = parse_input( Util.format_as_strings( Util.read_file(path) ) );
  const timetable  = fill_timetable(timestamps);

  const _first  = first(timetable);
  const _second = second(timetable);
  console.log('First:', _first);
  console.log('Second:', _second);
}

main();

