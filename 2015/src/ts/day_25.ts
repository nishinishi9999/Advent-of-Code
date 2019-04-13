function next_n(n :number) :number {
  return (n*252533) % 33554393;
}

function first(col :number, row :number) :number {
  const col_n = Array(col).fill(0).reduce( (acc, _, i) => acc+i+1, 0) - 1;
  const row_n = Array(row-1).fill(0)
    .reduce( (acc, _, i) => acc + col + i, col_n);

  let n = 20151125;

  for(let i = 0; i < row_n; i++)
    n = next_n(n);

  return n;
}

function main() {
  const row = 2947;
  const col = 3029;

  const a = first(col, row);
  console.log(a);
}

main();

