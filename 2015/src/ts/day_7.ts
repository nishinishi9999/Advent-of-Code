import * as Util from './util'

interface Arg {
  arg_type :string,
  val      :(number | string)
}

interface Cmd {
  cmd   :string,
  arg1  :Arg,
  arg2? :Arg,
  arg_n :number,
  to    :string
}

function parse_arg(val :string) :Arg {
  const _val = parseInt(val);

  return Number.isInteger(_val)
    ? { arg_type: 'num', val: _val }
    : { arg_type: 'sig', val:  val };
}

function parse_input(input :string[]) :Cmd[] {
  return input.map( line => {
    const parts = line.split(' ');

    switch(parts.length) {
      case 3 : return {
        cmd  : "TO",
        arg1 : parse_arg(parts[0]),
        to   : parts[2],
        arg_n: 1
      }
      case 4 : return {
        cmd  : 'NOT',
        arg1 : parse_arg(parts[1]),
        to   : parts[3],
        arg_n: 1
      }
      case 5 : return {
        cmd  : parts[1],
        arg1 : parse_arg(parts[0]),
        arg2 : parse_arg(parts[2]),
        to   : parts[4],
        arg_n: 2
      }
      default: throw Error("Cannot parse command: " + line)
    }
  });
}

class Machine {
  MAX_VAL :number;

  cmd     :Cmd[];
  signals :Util.NumberJSON;
  ptr     :number;
  done    :number;

  constructor(cmd :Cmd[], signals :Util.NumberJSON = {}) {
    this.MAX_VAL = 65535;

    this.signals = signals;
    this.cmd     = cmd.slice();

    this.ptr     = 0;
    this.done    = 0;
  }

  get_val(arg :Arg) :(number | undefined) {
    if (arg.arg_type == 'num')
      return <number>arg.val;
    else
      return this.signals[arg.val];
  }

  has_val(arg :Arg) :boolean {
    return arg.arg_type == 'num' || this.signals[arg.val] !== undefined;
  }

  can_run(cmd :Cmd) :boolean {
    return this.has_val(cmd.arg1) && ( cmd.arg_n == 1 || this.has_val(<Arg>cmd.arg2) );
  }

  not   (n :number)            :number { return n >= 0 ? this.MAX_VAL-n : this.MAX_VAL+n; }
  and   (n :number, m :number) :number { return n  & m; }
  or    (n :number, m :number) :number { return n  | m; }
  lshift(n :number, m :number) :number { return n << m; }
  rshift(n :number, m :number) :number { return n >> m; }

  run() :number {
    for(; this.cmd.length; this.ptr = (this.ptr+1) % this.cmd.length) {
      const cmd = this.cmd[this.ptr];

      if( this.can_run(cmd) ) {
        const a = <number>this.get_val(cmd.arg1);
        const b = <number>(cmd.arg_n == 2 ? this.get_val(<Arg>cmd.arg2) : 0);
        let val;

        switch(cmd.cmd) {
          case 'TO'     : val = a;                 break;
          case 'NOT'    : val = this.not(a);       break;
          case 'AND'    : val = this.and(a, b);    break;
          case 'OR'     : val = this.or(a, b);     break;
          case 'LSHIFT' : val = this.lshift(a, b); break;
          case 'RSHIFT' : val = this.rshift(a, b); break;
        }

        if( this.signals[cmd.to] === undefined )
          this.signals[cmd.to] = <number>val;
        
        this.cmd.splice(this.ptr, 1);
        this.ptr = 0;
      }
    }

    return this.signals.a;
  }
}

function main() :void {
  const input = Util.read_lines('../../input/day_7.txt');
  const cmd   = parse_input(input);

  const first  = new Machine(cmd).run();
  const second = new Machine(cmd, { b: first }).run();

  console.log({ first, second });
}

main();

