const fs = require('fs');

const input = fs.readFileSync('./input/day_2.txt', 'utf8')
    .split('\r\n')                                                  // line
    .map( (line) => line.split('\t').map( (n) => parseInt(n) ))     // int values


// first part ( max - min )
var a = input.map( function(line)
    {
        var sort = line.sort( (a, b) => a-b );
        
        return sort[sort.length-1] - sort[0];
    })
    
    // sum array
    .reduce( (res, n) => res+n );


// second part ( a % b == 0 )
var b = input.map( function(line)
    {
        var sort = line.sort( (a, b) => b-a );
        
        for(var i = 0; i < sort.length; i++)
            {
                for(var j = i+1; j < sort.length; j++)
                    {
                        if(sort[i] % sort[j] == 0)
                            {
                                return sort[i] / sort[j];
                            }
                    }
            }
    })
    
    // sum array
    .reduce( (res, n) => res+n );


console.log(a);
console.log(b);
