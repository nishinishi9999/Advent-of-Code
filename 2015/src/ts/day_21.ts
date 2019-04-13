interface Item {
  name  :string;
  cost  :number;
  dmg   :number;
  armor :number;
}

interface Character {
  hp  :number;
  dmg :number;
  def :number;
}

const WEAPONS :Item[] = [
  { name: "dagger",     cost: 8,  dmg: 4, armor: 0 },
  { name: "shortsword", cost: 10, dmg: 5, armor: 0 },
  { name: "warhammer",  cost: 25, dmg: 6, armor: 0 },
  { name: "longsword",  cost: 40, dmg: 7, armor: 0 },
  { name: "greataxe",   cost: 74, dmg: 8, armor: 0 }
];

const ARMOR :Item[] = [
  { name: "fill",       cost: 0,  dmg: 0, armor: 0 },
  { name: "leather",    cost: 13,  dmg: 0, armor: 1 },
  { name: "chainmail",  cost: 31,  dmg: 0, armor: 2 },
  { name: "splintmail", cost: 53,  dmg: 0, armor: 3 },
  { name: "bandedmail", cost: 75,  dmg: 0, armor: 4 },
  { name: "platemail",  cost: 102, dmg: 0, armor: 5 }
];

const RINGS :Item[] = [
  { name: "fill",  cost: 0,   dmg: 0, armor: 0 },
  { name: "fill2", cost: 0,   dmg: 0, armor: 0 },
  { name: "dmg+1", cost: 25,  dmg: 1, armor: 0 },
  { name: "dmg+2", cost: 50,  dmg: 2, armor: 0 },
  { name: "dmg+3", cost: 100, dmg: 3, armor: 0 },
  { name: "def+1", cost: 20,  dmg: 0, armor: 1 },
  { name: "def+2", cost: 40,  dmg: 0, armor: 2 },
  { name: "def+3", cost: 80,  dmg: 0, armor: 3 }
];

function sim_dmg(a :Character, b :Character) :number {
  return Math.max(0, b.dmg - a.def);
}

function sim_battle(atk :number, def :number) :boolean {
  const player = {
    hp  : 100,
    dmg : atk,
    def : def
  };

  const boss = {
    hp  : 103,
    dmg : 9,
    def : 2
  };

  let turn = true;

  for(let turn = true; player.hp > 0 && boss.hp > 0; turn = !turn ) {
    // Player's turn
    if(turn)
      boss.hp -= sim_dmg(boss, player);
    // Boss' turn
    else
      player.hp -= sim_dmg(player, boss)
  }

  return boss.hp <= 0;
}

function find_f(initial_cost :number, f :Function) :number {
  let cost = initial_cost;

  WEAPONS.forEach( (weapon :Item) =>
    ARMOR.forEach( (armor :Item) =>
      RINGS.forEach( (ring1 :Item) =>
        RINGS.forEach( (ring2 :Item) => {
          if(ring1.name == ring2.name)
            return;
          else {
            const atk   = weapon.dmg + ring1.dmg + ring2.dmg;
            const def   = armor.armor + ring1.armor + ring2.armor;
            const _cost = weapon.cost + armor.cost + ring1.cost + ring2.cost;

            if( f(cost, _cost, atk, def) )
              cost = _cost;
          }
        })
      )
    )
  );

  return cost;
}

function find_least(cost :number, _cost :number, atk :number, def :number) :boolean {
  return _cost < cost && sim_battle(atk, def);
}

function find_most(cost :number, _cost :number, atk :number, def :number) :boolean {
  return cost < _cost && !sim_battle(atk, def);
}

function main() :void {
  const first  = find_f(Infinity, find_least);
  const second = find_f(0, find_most);
  console.log({ first, second });
}

main();

