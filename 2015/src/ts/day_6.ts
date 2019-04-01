import * as Util from './util'

interface Command {
    cmd :string;
    from: {
        y :number;
        x :number;
    };
    to: {
        y :number;
        x :number;
    };
}

function parse_input(input :string[]) :Command[] {
  return input.map( line => {
    const parts = line.split(' ');
    const cmd_i = parts[0] === 'toggle' ? 0 : 1;
      
      return {
        cmd: parts[cmd_i],
        from: {
          y: parseInt( parts[cmd_i+1].split(',')[0] ),
          x: parseInt( parts[cmd_i+1].split(',')[1] )
        },
        to: {
          y: parseInt( parts[cmd_i+3].split(',')[0] ),
          x: parseInt( parts[cmd_i+3].split(',')[1] )
        }
      }
  });
}

function create_grid(size :number) :number[][] {
  return Array(size)
    .fill(0)
    .map( () => Array(size).fill(0) );
}

function clone_grid(grid :number[][]) :number[][] {
  return Array(grid.length)
    .fill(0)
    .map( (_, i) => grid[i].slice() );
}

function run_cmd(cmd :Command, grid :number[][]) :number[][] {
  const _grid = clone_grid(grid);
  
  for(let y = cmd.from.y; y < cmd.to.y+1; y++) {
    for(let x = cmd.from.x; x < cmd.to.x+1; x++) {
      _grid[y][x] = cmd.cmd === 'on'
        ? 1
        : cmd.cmd === 'off'
          ? 0
          : _grid[y][x] === 1 ? 0 : 1;
    }
  }
  
  return _grid;
}

function _run_cmd(cmd :Command, grid :number[][]) :number[][] {
  const _grid = clone_grid(grid);
  
  for(let y = cmd.from.y; y < cmd.to.y+1; y++) {
    for(let x = cmd.from.x; x < cmd.to.x+1; x++) {
      _grid[y][x] = cmd.cmd === 'on'
        ? _grid[y][x] + 1
        : cmd.cmd === 'off'
          ? (_grid[y][x] - 1) < 0 ? 0 : _grid[y][x] - 1
          : _grid[y][x] + 2;
    }
  }
  
  return _grid;
}

function grid_state(cmd :Command[], mode :boolean) :number {
  let grid = create_grid(1000);
  
  for(let i = 0; i < cmd.length; i++) {
    if(mode)
      grid = run_cmd(cmd[i], grid);
    else
      grid = _run_cmd(cmd[i], grid);
  }
  
  return grid.reduce( (acc, arr) =>
    acc + arr.reduce( (_acc, n) => _acc + n )
  , 0);
}

function main() :void {
  const input = Util.read_lines('../../input/day_6.txt');
  const cmd   = parse_input(input);
  
  const first = grid_state(cmd, true);
  const second = grid_state(cmd, false);
  
  console.log({ first, second });
}

main();

