// day 3

/**
  +-------------------------------+
  | 37   36   35  34  33  32   31 |
  |    +---------------------+    |
  | 38 | 17   16  15  14  13 | 30 |
  |    |    +-----------+    |    |
  | 39 | 18 | 5   4   3 | 12 | 29 |                     
  |    |    |   +---+   |    |    |
  | 40 | 19 | 6 |  1  2 | 11 | 28 |
  |    |    |   +-------+    |    |
  | 41 | 20 | 7   8   9 * 10 | 27 |
  |    |    +----------------+    |
  | 42 | 21  22  23  24   25 * 26 |
  |    +--------------------------+
  | 43   44  45  46  47   48   49 * 50
  +-------------------------------------

series      : 4 - 15 - 34 ...
progression : +3 +11 +19 (n-1 + 8)
width       : n-1 + 2

**/

var n     = 4; // top value
var w     = 3; // line width
var diff  = 3; // progression difference
var input = 347991;

var mean_dist = 1; // mean distance
var rel_dist;      // relative distance between input and n
var half_w;

var i;


while(n < input)
    {
        diff += 8;
        w    += 2;
        mean_dist++;
        
        n += diff;
    }

rel_dist = n-input;
half_w   = (w-1)/2+1;


// same
if( rel_dist == 0 )
    {
        
    }
// top
else if( rel_dist < half_w )
    {
        mean_dist += rel_dist;
    }
// right
else if( rel_dist < (half_w + w-2) )
    {
        mean_dist += rel_dist;
        rel_dist  -= half_w;
        
        mean_dist += rel_dist > (w-2)/2 ? rel_dist : -rel_dist;
    }
// bottom
else if( rel_dist < (half_w + (w-2)*2) )
    {
        mean_dist += rel_dist;
        rel_dist  -= half_w + w-2;
        
        mean_dist += rel_dist > (w-2)/2 ? rel_dist : -rel_dist;
    }
// left
else if( rel_dist < (half_w + (w-2)*2 + (w-3)) )
    {
        mean_dist += rel_dist;
    }
// previous top
else if( rel_dist < (half_w + (w-2)*2 + (w-3)) + ((w-3)/2) )
    {
        mean_dist += rel_dist
    }



console.log({top: n, input: input, w: w, half_w: half_w, diff: diff, mean: mean_dist, rel: rel_dist});
