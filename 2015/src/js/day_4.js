"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
function md5(data) {
    return crypto.createHash('md5')
        .update(data)
        .digest('hex');
}
function first_md5(key, zero_n) {
    const target = '0'.repeat(zero_n);
    let digest = '';
    let n;
    for (n = 0; digest.substr(0, zero_n) !== target; n++)
        digest = md5(`${key}${n}`);
    return n - 1;
}
function main() {
    const input = 'ckczppom';
    const first = first_md5(input, 5);
    const second = first_md5(input, 6);
    console.log({ first, second });
}
main();
