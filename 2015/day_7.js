/******************************
* Advent of code 2015 - Day 7
******************************/
var fs = require('fs');


var input = fs.readFileSync('./input/day_7.txt', 'utf8')
    .split('\n')
    .map( function(line) { return line.trim(); } );

var vars;


/*************************************************************************************
* c is an integer   : return c
* c isn't an integer: check if c exists, return vars[c] if it does and false if not
/************************************************************************************/
function get_val(c)
    {
        if(Number.isInteger(parseInt(c))) { return parseInt(c); }
        else { return vars[c] == undefined ? false : parseInt(vars[c]) }
    }


/******************************
* 16-bit binary not operation
******************************/
function _not(n, key)
    {
        var pad = '0000000000000000';
        
        n = get_val(n);
        if(n === false) { return false; }
        
        
        /****************************************************************************
        * Dec -> binary string -> add pad -> replace 0s for 1s and 1s for 0s -> dec
        ****************************************************************************/
        n = n.toString(2);
        n = pad.substr(0, pad.length - n.length) + n;
        n = parseInt( n.replace(/0/g, 2).replace(/1/g, 0).replace(/2/g, 1), 2 );
        
        
        vars[key] = n;
        
        return true;
    }

function _and(n, m, key)
    {
        n = get_val(n);
        m = get_val(m);
        
        if(n === false || m === false) { return false; }
        
        vars[key] = n & m;
        
        return true;
    }
function _or(n, m, key)
    {
        n = get_val(n);
        m = get_val(m);
        
        if(n === false || m === false) { return false; }
        
        vars[key] = n | m;
        
        return true;
    }
function _lshift(n, m, key)
    {
        n = get_val(n);
        m = get_val(m);
        
        if(n === false || m === false) { return false; }
        
        vars[key] = n << m;
        
        return true;
    }
function _rshift(n, m, key)
    {
        n = get_val(n);
        m = get_val(m);
        
        if(n === false || m === false) { return false; }
        
        vars[key] = n >> m;
        
        return true;
    }
function _assign(n, key)
    {
        n = get_val(n);
        
        if(n === false) { return false; }
        
        vars[key] = n;
        
        return true;
    }

function main(input, override)
    {
        vars = {};
        var result;
        
        while(input.length > 0)
            {
                var line  = input.shift();
                var parts = line.split(' ');
                
                if(parts.length == 3)         { result = _assign(parts[0], parts[2]); }
                else if(parts[0] == 'NOT')    { result = _not   (parts[1], parts[3]); }
                else if(parts[1] == 'AND')    { result = _and   (parts[0], parts[2], parts[4]); }
                else if(parts[1] == 'OR')     { result = _or    (parts[0], parts[2], parts[4]); }
                else if(parts[1] == 'LSHIFT') { result = _lshift(parts[0], parts[2], parts[4]); }
                else if(parts[1] == 'RSHIFT') { result = _rshift(parts[0], parts[2], parts[4]); }
                
                if(result === false) { input.push(line); }
                
                
                /********************
                * Override signal b
                ********************/
                if(override) { vars[override.param] = override.val; }
            }
        
        
        return vars.a;
    }


var a  = main(input.slice(), false);
var a2 = main(input.slice(), {param: 'b', val: a});

console.log(a, a2);