import * as fs from 'fs'

export interface NumberJSON {
  [propType :string] :number
}

export function read_chars(path : string) :string[] {
  return fs.readFileSync(path, 'utf8')
    .trim()
    .split('');
}

export function read_lines(path :string) :string[] {
  return fs.readFileSync(path, 'utf8')
    .trim()
    .split('\n');
}

export function read_numbers(path :string) :number[] {
  return read_lines(path).map(Number);
}
