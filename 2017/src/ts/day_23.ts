/**
* Advent of Code 2017
* Day 23
*
* URL: http://adventofcode.com/2017/day/23
**/
function asm(debug :boolean) :number {
    // @ts-ignore
    let [a, b, c, d, e, f, g, h] = [debug ? 1 : 0, 0, 0, 0, 0, 0, 0, 0];
    let line = 0;
    let n    = 0;
    
    while(true) {
        switch(line) {
            // @ts-ignore
            case 0: {
                b = 93;
                c = b;
                
                if(a !== 0) {
                    b = b * 100 + 100000;
                    c = b + 17000;
                }
            }
            // @ts-ignore
            case 9: {
                f = 1;
                d = 2;
            }
            case 11: {
                e = 2;
                n += b-e;

                // f: if for any b~e d*e-b === 0
                if( Number.isInteger(b/d) && b/d <= b-e ) {
                    f = 0;
                }
                
                d++;
                
                if(d-b !== 0) {
                    line = 11;
                    continue;
                }
                
                if(f === 0) {
                    h++;
                }
                
                if(b-c !== 0) {
                    b += 17;
                    
                    line = 9;
                    continue;
                }
            }
        }
        
        break;
    }
    
    return debug ? h : n;
}

function main() :void {
    const a = asm(false);
    const b = asm(true);
    
    console.log({ first: a, second: b });
}


main();
