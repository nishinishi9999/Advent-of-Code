// day 17
import * as fs from 'fs';


function* bin_gen(len :number) {
    let n :number;
    let bin    = '';
    let target = 2**len;
    
    for(n = 0; n < target; n++) {
        bin = n.toString(2)
            .padStart(len, '0');
        
        yield bin;
    }
}

function read_input(path :string) :number[] {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map( (n) => parseInt(n) );
}

function find_pos(input :number[], target :number) :number[] {
    let gen  = bin_gen(input.length);
    let pos  = 0;
    let n    = {};
    let done = false;
    let bin   :string;
    let total :number;
    
    while(true) {
        let next = gen.next();
        bin  = next.value;
        done = next.done;
        
        if(done) {
            break;
        }
        else {
            total = 0;
            
            for(let i = 0; i < bin.length; i++) {
                if(bin[i] === '1') {
                    total += input[i];
                }
                
                if(total > target) {
                    break;
                }
            }
            
            if(total === target) {
                let len = bin.split('').filter( (_n) => _n === '1' ).length;
                
                pos++;
                
                if(n[len] === undefined) n[len] = 1;
                else n[len]++;
            }
        }
    }
    
    
    const min = n[ Object.keys(n).sort( (a, b) => parseInt(a) - parseInt(b) )[0] ];
    
    return [pos, min];
}

function main() {
    let input = read_input('input/day_17.txt');
    const target = 150;
    
    const [a, b] = find_pos(input, target);
    
    console.log({ first: a, second: b });
}


main();
