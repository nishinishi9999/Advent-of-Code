
import * as fs from 'fs';

export interface NumberJSON {
  [propName :string] :number
}

export interface NumberArrJSON {
  [propName :string] :number[]
}

export interface StringJSON {
  [propName :string] :string[]
}

export interface AnyJSON {
  [propName :string] :any
}

export const read_file = (path :string) :string => fs.readFileSync(path, 'utf8');

export const format_as_strings = (file :string) :string[] => file.split('\n')
  .filter(_=>_);

export const format_as_numbers = (file :string) :number[] => format_as_strings(file)
  .map( n => parseInt(n) );

// JSON manipulation
export const inc_key = (json :NumberJSON, key :number) :NumberJSON => {
  const _key = key.toString();
  return { [_key]: json[_key] ? json[_key]+1 : 1 }
}

export function obj_max(obj :AnyJSON) :any {
  return Object.keys(obj).sort( (a, b) => obj[b] - obj[a] )[0];
}

export function obj_min(obj :AnyJSON) :any {
  return Object.keys(obj).sort( (a, b) => obj[a] - obj[b] )[0];
}

export function obj_find_key(obj :AnyJSON, val :any) :any {
  return Object.keys(obj).find( key => obj[key] === val );
}


