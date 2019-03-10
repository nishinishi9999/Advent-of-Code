"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util = __importStar(require("./util"));
class Dirs {
    constructor() {
        this.N = 0;
        this.E = 1;
        this.S = 2;
        this.W = 3;
    }
}
class Cart extends Dirs {
    constructor(y, x, c) {
        super();
        this.y = y;
        this.x = x;
        this.dir = ['^', '>', 'v', '<'].indexOf(c);
        this.prev_intersection = 2;
    }
    move() {
        switch (this.dir) {
            case this.N:
                this.y--;
                break;
            case this.E:
                this.x++;
                break;
            case this.S:
                this.y++;
                break;
            case this.W:
                this.x--;
                break;
        }
    }
    turn(c) {
        switch (c) {
            case '/': {
                switch (this.dir) {
                    case this.N:
                        this.dir = this.E;
                        break;
                    case this.E:
                        this.dir = this.N;
                        break;
                    case this.S:
                        this.dir = this.W;
                        break;
                    case this.W:
                        this.dir = this.S;
                        break;
                }
                break;
            }
            case '\\': {
                switch (this.dir) {
                    case this.N:
                        this.dir = this.W;
                        break;
                    case this.E:
                        this.dir = this.S;
                        break;
                    case this.S:
                        this.dir = this.E;
                        break;
                    case this.W:
                        this.dir = this.N;
                        break;
                }
            }
        }
    }
    intersection() {
        this.prev_intersection = (this.prev_intersection + 1) % 3;
        const dirs = [this.N, this.E, this.S, this.W];
        const _dirs = [this.W, this.S, this.E, this.N];
        switch (this.prev_intersection) {
            case 2:
                this.dir = dirs[(dirs.indexOf(this.dir) + 1) % dirs.length];
                break;
            case 0:
                this.dir = _dirs[(_dirs.indexOf(this.dir) + 1) % _dirs.length];
                break;
        }
    }
    is_in(y, x) {
        return this.y === y && this.x === x;
    }
}
class Simulation extends Dirs {
    constructor(map, carts) {
        super();
        this.map = map;
        this.carts = carts;
        this.has_colluded = false;
        this.collusion_coord = [];
        this.tick_n = 0;
    }
    tick() {
        this.tick_n++;
        this.carts_left().forEach(cart => {
            if (!cart.has_colluded) {
                let y, x;
                switch (cart.dir) {
                    case this.N:
                        y = cart.y - 1;
                        x = cart.x;
                        break;
                    case this.E:
                        y = cart.y;
                        x = cart.x + 1;
                        break;
                    case this.S:
                        y = cart.y + 1;
                        x = cart.x;
                        break;
                    case this.W:
                        y = cart.y;
                        x = cart.x - 1;
                        break;
                }
                const _cart = this.carts_left().find(_cart => _cart.is_in(y, x));
                if (_cart) {
                    if (!this.has_collusion) {
                        this.has_collusion = true;
                        this.collusion_coord = [x, y];
                    }
                    cart.has_colluded = true;
                    _cart.has_colluded = true;
                }
                else {
                    const c = this.map[y][x];
                    cart.move();
                    switch (c) {
                        case '-':
                        case '|':
                            break;
                        case '/':
                        case '\\':
                            cart.turn(c);
                            break;
                        case '+':
                            cart.intersection();
                            break;
                        default:
                            throw `Invalid char: "${c}" at [${y},${x}]`;
                    }
                }
            }
        });
    }
    carts_left() {
        return this.carts.filter(_ => !_.has_colluded);
    }
    print_map() {
        const map = this.map.map(_ => _.slice());
        const carts = this.carts_left();
        carts.forEach(cart => {
            map[cart.y][cart.x] = ['^', '>', 'v', '<'][cart.dir];
        });
        console.log(map.map(_ => _.join('')).join('\n'));
        //console.log(this.carts);
        console.log();
        console.log();
    }
}
function parse_input(input) {
    const map = Array(input.length).fill(0).map(_ => []);
    const carts = [];
    input.forEach((line, y) => line.forEach((c, x) => {
        switch (c) {
            case '^':
            case 'v':
                map[y].push('|');
                carts.push(new Cart(y, x, c));
                break;
            case '<':
            case '>':
                map[y].push('-');
                carts.push(new Cart(y, x, c));
                break;
            default:
                map[y].push(c);
        }
    }));
    return new Simulation(map, carts);
}
function first(sim) {
    while (!sim.has_collusion)
        sim.tick();
    return sim.collusion_coord.join(',');
}
function second(sim) {
    sim.print_map();
    while (sim.carts_left().length > 1) {
        sim.tick();
        sim.print_map();
    }
    const cart = sim.carts_left()[0];
    return [cart.x, cart.y].join(',');
}
function main() {
    const input = Util.char_arrs(Util.read_file('./input/__day_13.txt'));
    console.log('First:', first(parse_input(input)));
    console.log('Second:', second(parse_input(input)));
}
main();
