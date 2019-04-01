"use strict";
function look_and_say(input) {
    const match = input.match(/(\d)\1*/g);
    if (match)
        return match.map(n => n.length.toString() + n[0]).join('');
    else
        throw 'No match';
}
function look_and_say_len(str, round_n) {
    if (round_n)
        return look_and_say_len(look_and_say(str), round_n - 1);
    else
        return str.length;
}
function main() {
    const input = '1321131112';
    const first = look_and_say_len(input, 40);
    const second = look_and_say_len(input, 50);
    console.log({ first, second });
}
main();
