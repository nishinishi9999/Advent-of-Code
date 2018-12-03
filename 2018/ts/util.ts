
import * as fs from 'fs';

export interface NumberJSON {
  [propName :string] :number
}

export interface NumberArrJSON {
  [propName :string] :number[]
}

export const read_file = (path :string) :string => fs.readFileSync(path, 'utf8');

export const format_as_strings = (file :string) :string[] => file.split('\n')
  .filter(_=>_);

export const format_as_numbers = (file :string) :number[] => format_as_strings(file)
  .map( n => parseInt(n) );

// JSON manipulation
export const inc_key = (json :NumberJSON, key :number) => {
  const _key = key.toString();
  return { [_key]: json[_key] ? json[_key]+1 : 1 }
}

