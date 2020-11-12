import * as crypto from 'crypto';

function md5(data :string) :string {
  return crypto.createHash('md5')
    .update(data)
    .digest('hex');
}

function first_md5(key :string, zero_n :number) :number {
  const target = '0'.repeat(zero_n);
  let digest = '';
  let n;
  
  for(n = 0; digest.substr(0, zero_n) !== target; n++)
    digest = md5(key + n.toString());
  
  return n-1;
}

function main() {
  const input = 'ckczppom';
  
  const first  = first_md5(input, 5);
  const second = 1;//first_md5(input, 6);
  
  console.log({ first, second });
}

main();

