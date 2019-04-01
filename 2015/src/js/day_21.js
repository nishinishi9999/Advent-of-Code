"use strict";
// day 21
function simulate(player, boss) {
}
function find_min(boss, weapon, armor, ring) {
}
function main() {
    let boss = {
        hp: 103,
        dmg: 9,
        def: 2
    };
    let weapon = {
        dagger: { cost: 8, dmg: 4 },
        shortsword: { cost: 10, dmg: 5 },
        warhammer: { cost: 25, dmg: 6 },
        longsword: { cost: 40, dmg: 7 },
        greataxe: { cost: 74, dmg: 8 }
    };
    let armor = {
        leather: { cost: 13, def: 4 },
        chainmail: { cost: 31, def: 5 },
        splintmail: { cost: 53, def: 6 },
        bandedmail: { cost: 75, def: 7 },
        platemail: { cost: 102, def: 8 }
    };
    let ring = {
        dmg_1: { cost: 25, dmg: 1 },
        dmg_2: { cost: 50, dmg: 2 },
        dmg_3: { cost: 100, dmg: 3 },
        def_1: { cost: 20, def: 1 },
        def_2: { cost: 40, def: 2 },
        def_3: { cost: 80, def: 3 }
    };
    const a = find_min(boss, weapon, armor, ring);
}
main();
