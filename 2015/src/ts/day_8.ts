import * as Util from './util'

function diff(str :string) :number {
  return str.length - eval(str).length;
}

function _diff(str :string) :number {
  return encoded_str(str).length - str.length;
}

function encoded_str(str :string) {
  return '"'
    + str.replace(/\\/g, '\\\\')
         .replace(/"/g, '\\"')
    + '"';
}

function str_len_diff(input :string[]) :number {
  return input.map(diff).reduce( (acc, n) => acc + n, 0 );
}

function _str_len_diff(input :string[]) :number {
  return input.map(_diff).reduce( (acc, n) => acc + n, 0 );
}

function main() :void {
  const input = Util.read_lines('../../input/day_8.txt');
    
  const first  = str_len_diff(input);
  const second = _str_len_diff(input);
  
  console.log({ first, second });
}

main();

