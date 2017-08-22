/********************************
* Advent of code 2015 - Day 20
********************************/
const TARGET = 33100000;


function get_divisors(n)
    {
        var limit    = Math.ceil(Math.sqrt(n));
        var divisors = [];
        
        for(var i = 1; i <= limit; i++)
            {
                if(n % i == 0) { divisors.push(i); }
            }
        
        for(var i = 0, len = divisors.length; i < len; i++)
            {
                divisors.push( n/divisors[i] );
            }
        
        return divisors;
    }

function get_house_n(present_n, house_limit)
    {
        var divisors;
        var total;
        var i, j;
        
        for(i = 1;; i++)
            {
                total    = 0;
                divisors = get_divisors(i);
                
                for(j = 0; j < divisors.length; j++)
                    {
                        var presents = divisors[j]*present_n;
                        
                        if(house_limit && i > divisors[j]*50 ) { continue; }
                        
                        total += presents;
                    }
                
                if(total >= TARGET) { return i; }
            }
    }


console.log( get_house_n(10, false), get_house_n(11, 50) );