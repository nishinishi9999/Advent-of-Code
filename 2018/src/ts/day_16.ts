
import * as Util from './util';

interface State {
  [propName :string] :number
}

class ASM {
  constructor(parts :string[]) {
    this.reg   = [0, 0, 0, 0];
    this.state = this.parse_samples(parts[0]);
    this.code  = this.parse_code(parts[1]);

    this.funcs = 'addr addi mulr muli banr bani borr bori setr seti gtir gtri gtrr eqir eqri eqrr'
      .split(' ');

    this.ops = this.find_ops();
  }

  parse_samples(input :string) :State[] {
    return input.split('\n\n').map( _ => {
      const lines = Util.lines(_);
      const [op, a, b, c] = lines[1].split(' ').map(Number);

      return {
        before : lines[0].split(': ')[1] .slice(1, -1).split(', ').map(Number),
        after  : lines[2].split(':  ')[1].slice(1, -1).split(', ').map(Number),
        op, a, b, c
      };
    });
  }

  parse_code(input :string) :number[][] {
    return Util.lines(input).map( _ => _.split(' ').map(Number) );
  }

  set_regs(arr : number[]) :boolean {
    for(let i = 0; i < arr.length; i++) {
      this.reg[i] = arr[i];
    }
  }

  are_equal(arr1 :number[], arr2 :number[]) :boolean {
    for(let i = 0; i < arr1.length; i++) {
      if(arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  op_n() :number {
    return this.state.filter( s => {
      return this.funcs.filter( f_name => {
        this.set_regs(s.before);
        this.reg[s.c] = this[f_name](s.a, s.b);
        return this.are_equal(this.reg, s.after);
      }).length >= 3;
    }).length;
  }

  find_ops() :void {
    const ops = Array(16).fill('');
    let n = 0;

    while( ops.includes('') ) {
      this.state.filter( s => ops[s.op] === '' ).forEach( s => {  
        let f_names = [];
        
        this.funcs.forEach( f_name => {
          this.set_regs(s.before);
          this.reg[s.c] = this[f_name](s.a, s.b);

          if( this.are_equal(this.reg, s.after) )
            f_names.push(f_name);
        });
        
        f_names = f_names.filter( f_name =>
          !ops.includes(f_name)
        );

        if(f_names.length === 1)
          ops[s.op] = f_names[0];
      });
    }

    return ops;
  }

  run() :void {
    this.reg = [0, 0, 0, 0];

    this.code.forEach( ([op, a, b, c]) =>
      this.reg[c] = this[this.ops[op]](a, b)
    );

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

function main() :void {
  const input = Util.read_file('./input/day_16.txt');
  const parts = input.split('\n\n\n');
  
  const asm = new ASM(parts);
  console.log('First:', asm.op_n());
  console.log('Second:', asm.run());
}

main();

