// santa 24

var fs   = require('fs');
var exec = require('child_process').exec;


var start_y = 5;
var start_x = 135;
var target  = 7;

var dead_end = [];

var min_n   = 1000000000;
var n       = 0;

var map = fs.readFileSync('input_24.txt', 'utf8')
    .split('\n')
    .map( (line) => line.trim().split('') );


function open_map(map)
    {
        for(var i = 0; i < dead_end.length; i++)
            {
                var [y, x, color] = dead_end[i];
                
                map[y][x] = '<text style="background: '+color+'">'+map[y][x]+'</text>';
            }
        
        for(var i = 0; i < map.length; i++) { map[i] = map[i].join('') }
        map = map.join('\n');
        
        var page =
            '<html><body><pre><br>'
            + map
            + '<pre><br></body></html>';

        fs.writeFileSync('abcd.html', page);
        
        exec('start abcd.html');
    }

function can_move(y, x, path)
    {
        return map[y][x] != '#' && !path.includes( y+' '+x );
    }

function get_dead_end(map, n)
    {
        for(var i = 0; i < n; i++)
            {
                for(var y = 1; y < map.length-1; y++)
                    {
                        for(var x = 1; x < map[y].length-1; x++)
                            {
                                var nswe = map[y-1][x]+map[y+1][x]+map[y][x-1]+map[y][x+1];
                                
                                if(
                                       map[y][x] == '.'
                                    && (nswe.match(/#/g) && nswe.match(/#/g).length >= 3)
                                  )
                                    {
                                        map[y][x] = '#';
                                        dead_end.push([y, x, 'red']);
                                    }
                            }
                    }
            }
    }


function get_useless_paths(map)
    {
        /**
        *   #####     ...     ###    ###
        -   #...#    #.#.#    #...  ...#
        *   #.#.#    #...#    #.#.  .#.#
        *    ...     #####    #...  ...#
        *                     ###    ###
        **/
        
        for(var y = 0; y < map.length; y++)
            {
                if(y < map.length-3)
                    {
                        for(var x = 0; x < map[y].length; x++)
                            {
                                var [line1, line2, line3, line4, line5] = ['', '', '', '', ''];
                                
                                if(x < map[y].length-4)
                                    {
                                        line1 = map[y]  .slice(x, x+5).join('');
                                        line2 = map[y+1].slice(x, x+5).join('');
                                        line3 = map[y+2].slice(x, x+5).join('');
                                        line4 = map[y+3].slice(x, x+5).join('');
                                
                                        //console.log(line1, line2, line3, line4);
                                
                                        var line1_middle = line1.substr(1, 3);
                                        var line4_middle = line4.substr(1, 3);
                                
                                        if(line1+line2+line3+line4_middle == '######...##.#.#...')
                                            {
                                                map[y+1][x+1] = '#';
                                                map[y+1][x+2] = '#';
                                                map[y+1][x+3] = '#';
                                                map[y+2][x+1] = '#';
                                                map[y+2][x+3] = '#';
                                                
                                                dead_end.push
                                                    (
                                                        [y+1, x+1, 'blue'],
                                                        [y+1, x+2, 'blue'],
                                                        [y+1, x+3, 'blue'],
                                                        [y+2, x+1, 'blue'],
                                                        [y+2, x+3, 'blue']
                                                    );
                                            }
                                        else if(line1_middle+line2+line3+line4 == '...#.#.##...######')
                                            {
                                                map[y+1][x+1] = '#';
                                                map[y+1][x+3] = '#';
                                                map[y+2][x+1] = '#';
                                                map[y+2][x+2] = '#';
                                                map[y+2][x+3] = '#';
                                                
                                                dead_end.push
                                                    (
                                                        [y+1, x+1, 'blue'],
                                                        [y+1, x+3, 'blue'],
                                                        [y+2, x+1, 'blue'],
                                                        [y+2, x+2, 'blue'],
                                                        [y+2, x+3, 'blue']
                                                    );
                                            }
                                    }
                                
                                if(y < map.length-4 && x < map[y].length - 4)
                                    {
                                        line5 = map[y+4].slice(x, x+4).join('');
                                        
                                        var line1_first = line1.substr(x, 3);
                                        var line2_first = line2.substr(x, 4);
                                        var line3_first = line3.substr(x, 4);
                                        var line4_first = line4.substr(x, 4);
                                        var line5_first = line5.substr(x, 3);
                                        
                                        var line1_end   = line1.substr(x+1, 3);
                                        var line2_end   = line2.substr(x,   4);
                                        var line3_end   = line3.substr(x,   4);
                                        var line4_end   = line4.substr(x,   4);
                                        var line5_end   = line5.substr(x+1, 3);
                                        
                                        //console.log(x, map.length, map[y].length, y, line1_first, y+1, line2_first, y+2, line3_first, y+3, line4_first, y+4, line5_first);
                                        
                                        if(
                                              line1_first
                                            + line2_first
                                            + line3_first
                                            + line4_first
                                            + line5_first == '####...#.#.#...###'
                                          )
                                            {                                              
                                                map[y+1][x+1] = '#';
                                                map[y+1][x+2] = '#';
                                                map[y+1][x+3] = '#';
                                                map[y+2][x+1] = '#';
                                                map[y+3][x+1] = '#';
                                                map[y+3][x+2] = '#';
                                                map[y+3][x+3] = '#';
                                                
                                                dead_end.push
                                                    (
                                                        [y+1, x+1, 'blue'],
                                                        [y+1, x+2, 'blue'],
                                                        [y+1, x+3, 'blue'],
                                                        [y+2, x+1, 'blue'],
                                                        [y+3, x+1, 'blue'],
                                                        [y+3, x+2, 'blue'],
                                                        [y+3, x+3, 'blue']
                                                    );
                                            }
                                        if(
                                              line1_end
                                            + line2_end
                                            + line3_end
                                            + line4_end
                                            + line5_end == '###...#.#.#...####'
                                          )
                                            {
                                                //map[]
                                                process.exit();
                                            }
                                    }
                            }
                    }
            }
        
        /**
        *   ## ##
        *   #   #
        *     #  
        *   #   # 
        *   ## ##
        **/
        
        
        
        for(var y = 0; y < map.length; y++)
            {
                for(var x = 0; x < map[y].length; x++)
                    {
                        
                    }
            }
            
    }

var dead_path = [];

function search_dead_end(limit, y, x, path)
    {
        //dead_end.push([y, x, 'green']);
        dead_path.push([y, x, 'green']);
        
        if(
               path.length > 100
            || (path.length > 0 && y == limit && map[y][x] == '.')
            || map[y][x].match(/\d/)
          )
            {
                return false;
            }
        
        if( can_move(y-1, x, path) )
            {
                if( !search_dead_end( limit, y-1, x, path.concat(y+' '+x) ) )
                    {
                        return false;
                    }
            }
        if( can_move(y+1, x, path) && y != limit)
            {
                if( !search_dead_end( limit, y+1, x, path.concat(y+' '+x) ) )
                    {
                        return false;
                    }
            }
        if( can_move(y, x-1, path) )
            {
                if( !search_dead_end( limit, y, x-1, path.concat(y+' '+x) ) )
                    {
                        return false;
                    }
            }
        if( can_move(y, x+1, path) )
            {
                if( !search_dead_end( limit, y, x+1, path.concat(y+' '+x) ) )
                    {
                        return false;
                    }
            }
        
        
        return true;
    }

function search(y, x, path)
    {
        if( map[y][x] == target)
            {
                if(path.length < min_n) { min_n = path.length; }
                console.log(path.length);
                
                process.exit();
                return;
            }
        else if(x < 110)
            {
                return;
            }
        
        if( can_move(y-1, x, path) ) { search( y-1, x, path.concat(y+' '+x) ); }
        if( can_move(y+1, x, path) ) { search( y+1, x, path.concat(y+' '+x) ); }
        if( can_move(y, x-1, path) ) { search( y, x-1, path.concat(y+' '+x) ); }
        if( can_move(y, x+1, path) ) { search( y, x+1, path.concat(y+' '+x) ); }
    }



for(var i = 0; i < 6; i++)
    {
        get_useless_paths(map);
        get_dead_end(map, 13);
    }

for(var y = 0; y < map.length; y++)
    {
        for(var x = 0; x < map[y].length; x++)
            {
                if(map[y][x] == '.')
                    {
                        dead_path = [];
                        var res = search_dead_end(y, y, x, []);
                        
                        if(res == true)
                            {
                                //console.log(res);
                                
                                for(var i = 0; i < dead_path.length; i++)
                                    {
                                        dead_end.push(dead_path[i]);
                                    }
                                    
                                //console.log(dead_end[dead_end.length-1]);
                            }
                    }
            }
    }

search(start_y, start_x, []);

//console.log(dead_end);

//open_map(map);

console.log(min_n);