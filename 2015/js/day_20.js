// day 20
function factors(n) {
    let factor = {};
    const limit = Math.ceil(Math.sqrt(n)) + 1;
    for (let i = 1; i <= limit; i++) {
        if (n % i === 0) {
            factor[n / i] = true;
            factor[i] = true;
        }
    }
    return Object.keys(factor).map((n) => parseInt(n));
}
function first_higher(target) {
    let elf_n = 1;
    for (let total = 0; total < target; elf_n++) {
        total = factors(elf_n).reduce((acc, n) => acc + n, 0) * 10;
    }
    // Off by one
    return elf_n - 1;
}
function _first_higher(target) {
    let elf_n = 1;
    for (let total = 0; total < target; elf_n++) {
        total = factors(elf_n)
            .filter((n) => elf_n / n <= 50)
            .reduce((acc, n) => acc + n, 0) * 11;
    }
    // Off by one
    return elf_n - 1;
}
function main() {
    //const input = 150;
    const input = 29000000;
    const a = first_higher(input);
    const b = _first_higher(input);
    console.log({ first: a, second: b });
}
main();
