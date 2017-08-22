/*******************************
* Advent of code 2015 - Day 11
*******************************/
const input = 'hepxcrrq';
const A     = 'abcdefghijklmnopqrstuvwxyz'.split('');


/*******************************
* Increment alphabetical array
*******************************/
function inc_arr(arr)
    {
        var carry = 0;
        var str   = '';
        
        arr[arr.length-1]++;
        
        for(var i = 0, len = arr.length; i < len; i++)
            {
                if( carry )
                    {
                        arr[len-i-1] += carry;
                        carry = 0;
                    }
                
                if( arr[len-i-1] == A.length )
                    {
                        arr[len-i-1] = 0;
                        carry = 1;
                    }
            }
    }

/***************************************
* Convert alphabetical array to string
***************************************/
function to_str(arr)
    {
        var str = '';
        
        for(var i = 0; i < arr.length; i++)
            {
                str += A[ arr[i] ];
            }

        return str;
    }

/***************************************
* Convert string to alphabetical array
***************************************/
function to_arr(str)
    {
        return input.split('').map( (c) => A.indexOf(c) );
    }

function is_valid(arr)
    {
        var str = to_str(arr);
        
        if( /i|o|l/.test(str) || !/(.)\1.*(.)\2/.test(str) ) { return false; }

        var prev = P[0];
        var len  = 1;
        for(var i = 1; i < P.length; i++)
            {
                len  = P[i] == prev + 1 ? len+1 : 1;
                prev = P[i];
                
                if(len == 3) { return true; }
            }
        
        return false;
    }


var P = to_arr(input);

while(!is_valid(P)) { inc_arr(P); }
console.log( to_str(P) );

inc_arr(P);
while(!is_valid(P)) { inc_arr(P); }
console.log( to_str(P) );