/**
* Advent of Code 2017
* Day 17
*
* URL: http://adventofcode.com/2017/day/17
**/
function insert_n(arr :number[], len :number, n :number, i :number) :number[] {
    let _arr = arr.slice();
    let temp  :number;
    let temp2 :number;
    
    temp    = _arr[i];
    _arr[i] = n;
    
    for(let j = i+1; j < len; j++) {
        temp2   = _arr[j];
        _arr[j] = temp;
        temp    = temp2;
    }
    
    return _arr;
}

function spin(pos :number, spin_n :number, len :number) :number {
    return (pos + spin_n) % len;
}

function spinlock(spin_n :number, round_n :number, target :number) :number {
    if     (target === 0)     return _spinlock_zero(spin_n, round_n);
    else if(round_n > target) return _spinlock_higher(spin_n, round_n, target);
    else                      return _spinlock(spin_n, round_n, target);
}

// Standard spinlock
function _spinlock(spin_n :number, round_n :number, target :number) :number {
   let arr = new Array(round_n+1);
   let pos = 0;
   
   for(let i = 1, len = 1; i <= round_n; i++, len++) {
       pos = spin(pos, spin_n, len);
       arr = insert_n(arr, len, i, pos+1);
       pos++;
   }
    
   return arr[ (arr.indexOf(target) + 1) % arr.length ];
}

// Optimized for cases whre round_n > target
function _spinlock_higher(spin_n :number, round_n :number, target :number) :number {
   let target_n = 0;
   let pos      = 0;
   let target_i = 0;
   
   for(let i = 1, len = 1; i <= round_n; i++, len++) {
       pos = spin(pos, spin_n, len);
       
       if(i === target) {
            target_i = pos+1;
       }
       else if(pos === target_i) {
            target_n = i;
       }
       else if(pos < target_i) {
           target_i++;
       }
       
       pos++;
   }
    
   return target_n;
}

// Optimized for 0
function _spinlock_zero(spin_n :number, round_n :number) :number {
   let target_n = 0;
   let pos      = 0;
   
   for(let i = 1, len = 1; i <= round_n; i++, len++) {
       pos = spin(pos, spin_n, len);
       
       if(pos === 0) target_n = i;
       
       pos++;
   }
    
   return target_n;
}

// @ts-ignore
function main() {
    const input = 367;
    
    const a = spinlock(input,     2017, 2017);
    const b = spinlock(input, 50000000,    0);
    
    console.log({first: a, second: b});
}


main();
