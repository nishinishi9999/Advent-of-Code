"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 4
const crypto = require("crypto");
function md5(data) {
    return crypto.createHash('md5')
        .update(data)
        .digest('hex');
}
function first_md5(key, zero_n) {
    let digest = '';
    let target = '0'.repeat(zero_n);
    let n = 0;
    while (digest.substr(0, zero_n) !== target) {
        n++;
        digest = md5(`${key}${n}`);
    }
    return n;
}
function main() {
    const input = 'ckczppom';
    const a = first_md5(input, 5);
    const b = first_md5(input, 6);
    console.log({ first: a, second: b });
}
main();
