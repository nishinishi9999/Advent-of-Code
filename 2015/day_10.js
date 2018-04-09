/*******************************
* Advent of code 2015 - Day 10
*******************************/
var input = '1321131112';


function count_n(input)
    {
        var res = '';
        var n   = input[0];
        var len = 1;
        
        for(var i = 1; i < input.length; i++)
            {
                if(input[i] == n)
                    {
                        len++;
                    }
                else
                    {
                        res += len.toString() + n.toString();
                        
                        /*************************
                        * Initialize the counter
                        *************************/
                        n   = input[i];
                        len = 1;
                    }
        
                /**********************
                * Add the last digits
                **********************/
                if(!input[i+1])
                    {
                        res += len.toString() + n.toString();
                    }
            }
        
        
        return res;
    }


for(var i = 0; i < 50; i++)
    {
        var res = count_n(input);
        input   = res;
    }

console.log(res.length);

