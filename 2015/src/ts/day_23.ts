import * as Util from './util';

interface Command {
  cmd  :string;
  arg1 :number;
  arg2 :number;
}

class Intr {
  cmds :Command[];
  r    :number[];
  ip   :number;
  cmdN :number;

  constructor(path :string, a :number) {
    const input = Util.read_lines('../../input/day_23.txt');
    
    this.cmds = this.parseCommands(input);
    this.r    = [a, 0];
    this.ip   = 0;
    this.cmdN = this.cmds.length;
  }

  parseArg(s :string) :number {
    switch( s.split(',')[0] ) {
      case 'a' : return 0;
      case 'b' : return 1;
      default  : return Number(s);
    }
  }

  parseCommands(lines :string[]) :Command[] {
    return lines.map( line => {
      let l = line.split(' ');

      return {
        cmd  : l[0],
        arg1 : this.parseArg(l[1]),
        arg2 : l.length === 1 ? Infinity : Number(l[2])
      };
    });
  }

  runCmd(cmd :Command) :void {
    const a1 = cmd.arg1;
    const a2 = cmd.arg2;

    switch(cmd.cmd) {
      case 'hlf':
        this.r[a1] = Math.floor(this.r[a1]/2);
        break;
      case 'tpl':
        this.r[a1] = this.r[a1]*3;
        break;
      case 'inc':
        this.r[a1]++;
        break;
      case 'jmp':
        this.ip += a1 - 1;
        break;
      case 'jie':
        if( !(this.r[a1] % 2) ) this.ip += a2 - 1;
        break;
      case 'jio':
        if( this.r[a1] === 1 ) this.ip += a2 - 1;
        break;
      default: throw 'Command not valid: ' + cmd.cmd + '\n';
    }
  }

  runCmds() :number {
    for(; this.ip < this.cmdN; this.ip++)
      this.runCmd(this.cmds[this.ip]);

    return this.r[1];
  }
}


function main() {
  const first  = (new Intr('../../input/day_23.txt', 0)).runCmds();
  const second = (new Intr('../../input/day_23.txt', 1)).runCmds();

  console.log(first, second);
}

main();

