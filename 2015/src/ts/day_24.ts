import * as Util from './util'

function main() {
  const input = Util.read_numbers('../../input/day_24.txt');
  const group_size = input.reduce( (acc, n) => acc+n )/3;
}

main();

