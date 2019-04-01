import * as Util from './util'

function is_nice(str :string) :boolean {
  const match = str.match(/[aiueo]/g);

  return !/ab|cd|pq|xy/.test(str)
    && /(\w)\1/.test(str)
    && /[aiueo]/.test(str)
    && match !== null && match.length >= 3;
}

function _is_nice(str :string) :boolean {
  return /(\w{2}).*\1/.test(str)
      && /(\w).\1/.test(str);
}

function main() {
  const input = Util.read_lines('../../input/day_5.txt');
    
  const first  = input.filter(is_nice).length;
  const second = input.filter(_is_nice).length;
  
  console.log({ first, second });
}

main();

