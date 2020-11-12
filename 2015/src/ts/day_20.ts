function factors(n :number) :number[] {
  const limit  = Math.ceil( Math.sqrt(n) ) + 1;
  const factor :{ [propName :number] :boolean } = {};
  
  for(let i = 1; i <= limit; i++) {
    if(n % i === 0) {
      factor[n/i] = true;
      factor[i] = true;
    }
  }
  
  return Object.keys(factor).map(Number);
}

function first_higher(target :number) :number {
  let elf_n = 1;
  
  for(let total = 0; total < target; elf_n++)
    total = factors(elf_n).reduce( (acc, n) => acc + n, 0 ) * 10;
  
  // Off by one
  return elf_n - 1;
}

function _first_higher(target :number) :number {
  let elf_n = 1;
  
  for(let total = 0; total < target; elf_n++) {
    total = factors(elf_n)
      .filter( n => elf_n / n <= 50 )
      .reduce( (acc, n) => acc + n, 0 ) * 11;
  }
  
  // Off by one
  return elf_n - 1;
}

function main() :void {
  const input = 29000000;
  
  const first  = first_higher(input);
  const second = 1;//_first_higher(input);
  
  console.log({ first, second });
}

main();

