
import * as Util from './util';

interface Instr {
  op :string,
  a  :number,
  b  :number,
  c  :number
}

class ASM {
  reg   :number[];
  ip    :number;
  instr :Instr[];

  constructor(code :string, reg0 :number) {
    this.reg    = Array(6).fill(0);
    this.reg[0] = reg0;

    [this.ip, this.instr] = this.parse_code(code);
  }

  parse_code(code :string) :[ number, Instr[] ] {
    const lines = Util.lines(code);
    
    return [
      parseInt(lines[0][4]),
      lines.slice(1).map( _ =>  _.split(' ') ).map( ([op, a, b, c]) => ({
        op,
        a: parseInt(a),
        b: parseInt(b),
        c: parseInt(c)
      }))
    ];
  }

  run() :void {
    for(; this.reg[this.ip] < this.instr.length;this.reg[this.ip]++) {
      const instr = this.instr[ this.reg[this.ip] ];

      this.reg[instr.c] = this[instr.op](instr.a, instr.b);
    }

    return this.reg[0];
  }

  addr(a :number, b :number) :number { return this.reg[a] + this.reg[b]; }
  addi(a :number, b :number) :number { return this.reg[a] + b; }

  mulr(a :number, b :number) :number { return this.reg[a] * this.reg[b]; }
  muli(a :number, b :number) :number { return this.reg[a] * b; }

  banr(a :number, b :number) :number { return this.reg[a] & this.reg[b]; }
  bani(a :number, b :number) :number { return this.reg[a] & b; }

  borr(a :number, b :number) :number { return this.reg[a] | this.reg[b]; }
  bori(a :number, b :number) :number { return this.reg[a] | b; }

  setr(a :number, b :number) :number { return this.reg[a]; }
  seti(a :number, b :number) :number { return a; }

  gtir(a :number, b :number) :number { return a             > this.reg[b] ? 1 : 0; }
  gtri(a :number, b :number) :number { return this.reg[a]   > b           ? 1 : 0; }
  gtrr(a :number, b :number) :number { return this.reg[a]   > this.reg[b] ? 1 : 0; }

  eqir(a :number, b :number) :number { return a           === this.reg[b] ? 1 : 0; }
  eqri(a :number, b :number) :number { return this.reg[a] === b           ? 1 : 0; }
  eqrr(a :number, b :number) :number { return this.reg[a] === this.reg[b] ? 1 : 0; }
}

function part2() {
  const reg = Array(6).fill(0);
  //reg[0] = 1;
  let ip = 17;
  const past = [];

  while(ip < 36) {
    if(![0, 1, 2, 3, 6, 7, 8, 11, 12, 15, 16, 17, 26, 27].includes(ip))
      console.log(ip);

    //console.log(ip, reg);
    //past.push({ip, reg: reg.slice()});

    switch(ip) {
      case 1:
        reg[3] = 1;
        reg[1] = 1;
        reg[2] = reg[3]*reg[1] === reg[5] ? 1 : 0;
        ip     = reg[2] + 6; // 6 | 7
        break;
      case 2:
        reg[1] = 1;
        reg[2] = reg[3]*reg[1] === reg[5] ? 1 : 0;
        ip     = reg[2] + 6; // 6 | 7
        break;
      case 3:
        reg[2] = reg[3]*reg[1] === reg[5] ? 1 : 0;
        ip     = reg[2] + 6; // 6 | 7
        break;
      case 6:
        reg[1]++;
        reg[2] = reg[1] > reg[5] ? 1 : 0;
        ip     = reg[2] + 11;
        break;
      case 7:
        reg[1]++;
        reg[0] += reg[3];
        reg[2]  = reg[1] > reg[5] ? 1 : 0;
        ip      = reg[2] + 11; // 11 | 12
        break;
      case 8:
        reg[1]++;
        reg[2] = reg[1] > reg[5] ? 1 : 0;
        ip     = reg[2] + 11; // 11 | 12
        break;
      case 11:
        reg[2] = reg[3]*reg[1] === reg[5] ? 1 : 0;
        ip     = reg[2] + 6; // 6 | 7
        break;
      case 12:
        reg[3]++;
        reg[2] = reg[3] > reg[5] ? 1 : 0;
        ip     = reg[2] + 15; // 15 | 16
        break;
      case 15:
        reg[1] = 1;
        reg[2] = reg[3] === reg[5] ? 1 : 0;
        ip     = reg[2] + 6; // 6 | 7
        break;
      case 16: 
        ip = 257;
        break;
      case 17:
        reg[5]  = (reg[5]+2)**2 * 19 * 11;
        reg[2]  = (reg[2]+4) * 22 + 5; // 5 | 93
        reg[5] += reg[2];
        ip      = reg[0] + 26; // 26 | 27
        break;
      case 26:
        reg[3] = 1;
        reg[1] = 1;
        reg[2] = reg[5] === 1 ? 1 : 0;
        ip     = reg[2] + 6; // 6 | 7
        break;
      case 27:
        reg[5] += (27 * 28 + 29) * 30 * 14 * 32;
        reg[0]  = 0;
        reg[3]  = 1;
        reg[1]  = 3;
        reg[2]  = 0;
        ip      = 11;
        break;
      default: throw ip;
    }
  }

  //console.log(past.slice(-100));
  return reg[0];
}

function main() {
  const code = Util.read_file('../../input/day_19.txt');
  const asm  = new ASM(code);

  //console.log('First:',  new ASM(code, 0).run());
  console.log('Second:', part2());
}

main();

