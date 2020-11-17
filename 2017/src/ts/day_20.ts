/**
* Advent of Code 2017
* Day 20
*
* URL: http://adventofcode.com/2017/day/20
**/
import * as fs from 'fs';


interface VectorJSON {
    x :number;
    y :number;
    z :number;
}

interface ParticleJSON {
    pos      :VectorJSON;
    v        :VectorJSON;
    a        :VectorJSON;
    collided :boolean;
}


function read_input(path :string) :string[][] {
    return fs.readFileSync(path, 'utf8')
        .trim() 
        .split('\n')
        .map( (line) => line.split(', ') );
}

function parse_input(input :string[][]) :ParticleJSON[] {
    return input.map( (arr) => {
        let pos = arr[0].match(/<(.+?),(.+?),(.+?)>/);
        let v   = arr[1].match(/<(.+?),(.+?),(.+?)>/);
        let a   = arr[2].match(/<(.+?),(.+?),(.+?)>/);
        
        return {
            // @ts-ignore
            pos: { x: parseInt(pos[1]), y: parseInt(pos[2]), z: parseInt(pos[3]) },
            // @ts-ignore
            v:   { x: parseInt(v[1]),   y: parseInt(v[2]),   z: parseInt(v[3])   },
            // @ts-ignore
            a:   { x: parseInt(a[1]),   y: parseInt(a[2]),   z: parseInt(a[3])   },
            collided: false
        };
    });
}

function clone_particle(p :ParticleJSON) :ParticleJSON {
    return {
        pos : Object.assign({}, p.pos),
        v   : Object.assign({}, p.v),
        a   : Object.assign({}, p.a),
        collided: p.collided
    };
}

function average_a(particle :ParticleJSON) {
    return Math.abs(particle.a.x) + Math.abs(particle.a.y) + Math.abs(particle.a.z);
}

function simulate(particle :ParticleJSON[]) :number {
    let min_a = Infinity;
    let min_i = 0;
    
    for(let i = 0; i < particle.length; i++) {
        const a = average_a( particle[i] );
        
        if(a < min_a) {
            min_i = i;
            min_a = a;
        }
    }
    
    return min_i;
}

function next_tick(p :ParticleJSON) :ParticleJSON {
    let _p = clone_particle(p);
    
    ['x', 'y', 'z'].forEach( (axis) => {
         // @ts-ignore
        _p.v[axis]   = _p.v[axis]   + _p.a[axis];
         // @ts-ignore
        _p.pos[axis] = _p.pos[axis] + _p.v[axis];
    });
    
    return _p;
}

function simulate_collision(particle :ParticleJSON[], tick_n :number) :number {
    let key :string;
    let i   :number;
    let j   :number;
    
    
    for(i = 0; i < tick_n; i++) {
        let pos = {};
        
        for(j = 0; j < particle.length; j++) {
            if(!particle[j].collided) {
                particle[j] = next_tick( particle[j] );
                
                // Create a table of positions
                key = particle[j].pos.x
                    + ',' + particle[j].pos.y
                    + ',' + particle[j].pos.z;
                
                // @ts-ignore
                pos[key] = pos[key] === undefined ? [j] : pos[key].concat(j);
            }
        }
        
        // Delete repeated positions
        for(const _key in pos) {
            // @ts-ignore
            if(pos[_key].length > 1) {
                // @ts-ignore
                pos[_key].forEach( (n) => {
                    particle[n].collided = true;
                });
            }
        }
    }
    
    
    return particle.filter( (p) => !p.collided ).length;
}

function main() :void {
    let input     = read_input('../../input/day_20.txt');
    let particles = parse_input(input);

    const a = simulate(particles);
    const b = simulate_collision(particles, 100);
    
    console.log({ first: a, second: b });
}


main();
