// day 2
import * as fs from 'fs';


function read_input(path :string) :number[][] {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map( (line) => line.split('x').map( (n) => parseInt(n) ) );
}

function square_feet(l :number, w :number, h :number) :number {
    return 2*l*w + 2*w*h + 2*h*l;
}

function smallest_area(l :number, w :number, h :number) :number {
    let sort = [l, w, h].sort( (a, b) => a-b );
    
    return sort[0]*sort[1];
}

function smallest_perimeter(l :number, w :number, h :number) :number {
    let sort = [l, w, h].sort( (a, b) => a-b );
    
    return sort[0]*2 + sort[1]*2;
}

function cubic_feet(l :number, w :number, h :number) :number {
    return l*w*h;
}

function total_square_feet(input :number[][]) :number {
    return input.map( ([l, w, h]) =>
        square_feet(l, w, h) + smallest_area(l, w, h)
    )
    .reduce( (acc, n) => acc + n, 0 );
}

function total_ribbon_feet(input :number[][]) :number {
    return input.map( ([l, w, h]) =>
        smallest_perimeter(l, w, h) + cubic_feet(l, w, h)
    )
    .reduce( (acc, n) => acc + n, 0 );
}

function main() :void {
    let input = read_input('input/day_2.txt');
    
    const a = total_square_feet(input);
    const b = total_ribbon_feet(input);
    
    console.log({ first: a, second: b });
}


main();
