function look_and_say(input :string) :string {
  const match = input.match(/(\d)\1*/g);

  if(match)
    return match.map( n => n.length.toString() + n[0] ).join('');
  else
    throw 'No match'
}

function look_and_say_len(str :string, round_n :number) :number {
  if (round_n)
    return look_and_say_len( look_and_say(str), round_n-1 );
  else
    return str.length;
}

function main() :void {
  const input = '1321131112';
  
  const first  = look_and_say_len(input, 40);
  const second = look_and_say_len(input, 50);
  
  console.log({ first, second });
}

main();

