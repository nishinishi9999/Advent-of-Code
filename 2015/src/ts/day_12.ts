import * as jsonfile from 'jsonfile';

//type Obj = number | string | Obj[] | { [propName :string] :Obj }
type Obj = any

function has_red(obj :Obj) {
  return Object.keys(obj).some( key =>
    obj[key] === 'red'
  );
}

function traverse_json(obj :Obj, ignore_red :boolean) :number {
  // Number
  if( typeof(obj) === 'number' ) {
    return obj;
  }
  // String
  else if( typeof(obj) === 'string' ) {
    return 0;
  }
  // Array
  else if( obj.length !== undefined ) {
    return obj.map( (_obj :Obj) =>
      traverse_json(_obj, ignore_red)
    )
    .reduce( (acc :number, n :number) => acc + n, 0 );
  }
  // JSON
  else {
    if(ignore_red && has_red(obj)) {
      return 0;
    }
    else {
      return Object.keys(obj).map( key =>
        traverse_json(obj[key], ignore_red)
      )
      .reduce( (acc, n) => acc + n, 0 );
    }
  }
}

function main() {
  const input = jsonfile.readFileSync('../../input/day_12.json');
    
  const first  = traverse_json(input, false);
  const second = traverse_json(input, true);
  
  console.log({ first, second });
}

main();

