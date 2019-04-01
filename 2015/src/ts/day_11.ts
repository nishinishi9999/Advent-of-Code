function increment_pwd(pwd :number[], A :string[]) :number[] {
  const _pwd  = pwd.slice();
  
  for(let i = _pwd.length-1; i >= 0; i--) {
    _pwd[i]++;
    
    if(_pwd[i] == A.length)
        _pwd[i] = 0;
    else
        break;
  }
  
  return _pwd;
}

function has_increasing(pwd :number[]) :boolean {
  for(let i = 1; i < pwd.length-1; i++) {
    if(pwd[i-1] === pwd[i]-1 && pwd[i+1] === pwd[i]+1)
      return true;
  }
  
  return false;
}

function has_invalid(pwd :number[]) :boolean {
  return !(pwd.includes(8) || pwd.includes(11) || pwd.includes(14));
}

function has_overlapping(pwd :number[], A :string[]) :boolean {
  let pairs = 0;
  
  for(let i = 0; i < pwd.length-1;) {
    if(pwd[i] === pwd[i+1]) {
      pairs++;
      i += 2;
    }
    else {
      i++;
    }
  }
  
  return pairs > 1; 
}

function next_valid_pwd(start_pwd :string) :string {
  const A = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let pwd = start_pwd.split('').map( (c) => A.indexOf(c) );

  for( pwd = increment_pwd(pwd, A);
       !(has_increasing(pwd) && has_invalid(pwd) && has_overlapping(pwd, A))
       ;) {
      pwd = increment_pwd(pwd, A);
  }

  return pwd.map( (c) => A[c] ).join('');
}

function main() :void {
  const input = 'cqjxjnds';
  
  const first  = next_valid_pwd(input);
  const second = next_valid_pwd(first);
  
  console.log({ first, second });
}

main();

