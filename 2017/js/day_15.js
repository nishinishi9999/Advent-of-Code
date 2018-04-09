function* gen(start_val, factor, mult) {
    const _factor = factor;
    const mod = 2147483647;
    const pad = '0'.repeat(16);
    let _prev = start_val;
    let _prev_bin;
    while (true) {
        _prev = (_prev * _factor) % mod;
        if (_prev % mult === 0) {
            _prev_bin = _prev.toString(2);
            yield _prev_bin.length >= 16
                ? _prev_bin
                : _prev_bin.padStart(16, '0');
        }
    }
}
function pair_match(n, m) {
    for (var i = 1; i <= 16; i++) {
        if (n[n.length - i] !== m[m.length - i])
            return false;
    }
    return true;
}
function find_pairs(a, b, round_n, use_mult) {
    const gen_a = gen(a.start_val, a.factor, use_mult ? a.mult : 1);
    const gen_b = gen(b.start_val, b.factor, use_mult ? b.mult : 1);
    let n = 0;
    for (var i = 0; i < round_n; i++) {
        //if(i % 1000000 === 0) console.log(i);
        if (pair_match(gen_a.next().value, gen_b.next().value)) {
            n++;
        }
    }
    return n;
}
function main() {
    const gen_a = {
        start_val: 883,
        factor: 16807,
        mult: 4
    };
    const gen_b = {
        start_val: 879,
        factor: 48271,
        mult: 8
    };
    const a = find_pairs(gen_a, gen_b, 40000000, false);
    const b = find_pairs(gen_a, gen_b, 5000000, true);
    console.log({ first: a, second: b });
}
main();
