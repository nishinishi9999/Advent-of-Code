// day 6
const fs = require('fs');

var mem = fs.readFileSync('./input/day_6.txt', 'utf8').split('\t').map( (n) => parseInt(n) );


function redistribute()
    {
        var sort  = mem.slice().sort( (a, b) => b-a );
        var index = mem.indexOf( sort[0] );
        
        
        var bank = mem[index];
        mem[index] = 0;
        
        for(var i = index+1; bank > 0; i++)
            {
                i = i%mem.length;
                
                mem[i] += 1;
                bank--;
            }

        return mem.join(' ');
    }


var past = {};
var a = 1;      // In order to compensate for the last execution
var b = 1;      // In order to compensate for the last execution
var s, loop_s;

past[ mem.join('') ] = true;


FIRST:
for(;; a++)
    {
        s = redistribute();
        
        if(past[s] !== undefined)
            {
                loop_s = s;
                
                SECOND:
                for(;; b++)
                    {
                        s = redistribute();
                        
                        if(s == loop_s) { break FIRST; }
                    }
            }
        else
            {
                past[s] = 1;
            }
    }

console.log('first:', a, 'second:', b);
