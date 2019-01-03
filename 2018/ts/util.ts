
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

export const lines     = (file :string) :string[]   => file.split('\n').filter(_=>_);
export const numbers   = (file :string) :number[]   => lines(file).map( n => parseInt(n) );
export const char_arrs = (file :string) :string[][] => lines(file).map(_=>_.split(''));

// JSON manipulation
export const inc_key = (json :NumberJSON, key :number) :NumberJSON => {
  const _key = key.toString();
  return { [_key]: json[_key] ? json[_key]+1 : 1 }
}

export function obj_sum(obj :NumberJSON) :number {
  return Object.values(obj).reduce( (acc, n) => acc+n );
}

export function obj_max<T>(obj :{ [propName :string] :T }) :T {
  return Object.keys(obj).sort( (a, b) => obj[b] - obj[a] )[0];
}

export function obj_min(obj :AnyJSON) :any {
  return Object.keys(obj).sort( (a, b) => obj[a] - obj[b] )[0];
}

export function obj_find_key(obj :AnyJSON, val :any) :any {
  return Object.keys(obj).find( key => obj[key] === val );
}


