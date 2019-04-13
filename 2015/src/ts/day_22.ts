interface Character {
  hp   :number;
  dmg  :number;
  def  :number;
  mana :number;
}

interface Spell {
  name  :string;
  cost  :number;
  timer :number;
}

interface Effect {
  name  :string;
  timer :number;
}

const SPELLS = [
  { name: 'magic_missile', cost: 53,  timer: 0 },
  { name: 'drain',         cost: 73,  timer: 0 },
  { name: 'shield',        cost: 113, timer: 6 },
  { name: 'poison',        cost: 173, timer: 6 },
  { name: 'recharge',      cost: 229, timer: 5 }
];

const DECREMENT_EFFECT = {
  name  : 'decrement_hp',
  timer : Infinity
};

function set_character(character :Character, opts :{ [prop :string] :number }) :Character {
  return Object.freeze({
    hp   : opts.hp   === undefined ? character.hp   : opts.hp,
    dmg  : opts.dmg  === undefined ? character.dmg  : opts.dmg,
    def  : opts.def  === undefined ? character.def  : opts.def,
    mana : opts.mana === undefined ? character.mana : opts.mana,
  });
}

function modify_hp(character :Character, diff :number) :Character {
  return set_character(character, { hp: character.hp + diff });
}

function modify_def(character :Character, diff :number) :Character {
  return set_character(character, { def: character.def + diff });
}

function modify_mana(character :Character, diff :number) :Character {
  return set_character(character, { mana: character.mana + diff });
}

function concat_effect(effects: Effect[], spell :Spell) :Effect[] {
  return effects.concat({ name: spell.name, timer: spell.timer });
}

function is_dead(character :Character) :boolean {
  return character.hp <= 0;
}

// < 1309
// > 900
function process_effects(
  player  :Character,
  boss    :Character,
  _effects :Effect[],
  turn    :boolean
) :[Character, Character, Effect[]] {

  const effects  = _effects.map( effect => ({
    name  : effect.name,
    timer : effect.timer - 1
  }));

  const [_player, _boss] = effects.reduce( ([player, boss], effect) => {
    switch(effect.name) {
      case 'shield': {
        if(effect.timer === 0)
          return [
            modify_def(player, -7),
            boss
          ];
        else
          return [player, boss];
      }
      case 'poison': {
        return [
          player,
          modify_hp(boss, -3)
        ];
      }
      case 'recharge': {
        return [
          modify_mana(player, 101),
          boss
        ];
      }
      case 'decrement_hp': {
        // player.hp--
        if(turn)
          return [
            modify_hp(player, -1),
            boss
          ];
        else
          return [player, boss];
      }
      default: {
        throw 'Invalid effect: ' + effect.name;
      }
    }
  }, [player, boss]);

  return [_player, _boss, effects.filter( effect => effect.timer > 0 )];
}

function exec_spell(
  _player  :Character,
  boss     :Character,
  effects  :Effect[],
  spell    :Spell
) :[Character, Character, Effect[]] {

  const player = modify_mana(_player, -spell.cost);

  switch(spell.name) {
    case 'magic_missile': return [
      player,
      modify_hp(boss, -4),
      effects
    ];
    case 'drain': return [
      modify_hp(player, 2),
      modify_hp(boss,  -2),
      effects
    ];
    case 'shield': return [
      modify_def(player, 7),
      boss,
      concat_effect(effects, spell)
    ];
    case 'poison': return [
      player,
      boss,
      concat_effect(effects, spell)
    ];
    case 'recharge': return [
      player,
      boss,
      concat_effect(effects, spell)
    ];
    default: throw 'Invalid spell: ' + spell.name;
  }
}

function sim_battle(
  player    :Character,
  boss      :Character,
  effects   :Effect[],
  spent     :number,
  max_cost  :number,
  turn      :boolean
) :number {

  if(spent >= max_cost) {
    return 999999;
  }
  else {
    // process effects
    const [_player, _boss, _effects] = process_effects(player, boss, effects, turn);

    // Player is dead because of hp decrement
    if(is_dead(_player)) {
      return 777777;
    }
    // Boss is dead, return spent mana
    else if(is_dead(_boss)) {
      return spent;
    }
    else {
      // Player turn: 
      //   Execute spell
      //   If boss is dead, return
      if(turn) {
        const spells = SPELLS.filter( spell => 
             // Has enoguh mana
             spell.cost <= _player.mana
            // Doesn't have active effects
          && _effects.find( _ => _.name === spell.name) === undefined
        );

        return spells.length === 0 ? 888888 : spells.map( spell => {
          let [__player, __boss, __effects] = exec_spell(_player, _boss, _effects, spell);

          if(is_dead(__boss))
            return spent+spell.cost;
          else
            return sim_battle(__player, __boss, __effects, spent+spell.cost, max_cost, !turn);
        })
        .sort( (a, b) => a-b )[0];
      }
      // Boss turn
      //   Attack player
      else {
        const __player = modify_hp(
          _player,
          -Math.max(1, _boss.dmg - _player.def)
        );

        if(is_dead(__player))
          return Infinity;
        else
          return sim_battle(__player, _boss, _effects, spent, max_cost, !turn);
      }
    }
  }
}

function main() {
  const boss = Object.freeze({
    hp   : 51,
    dmg  : 9,
    def  : 0,
    mana : 0
  });
  const player = Object.freeze({
    hp   : 50,
    dmg  : 0,
    def  : 0,
    mana : 500
  });

  const first  = sim_battle(player, boss, [], 0, 1000, true);
  const second = sim_battle(player, boss, [DECREMENT_EFFECT], 0, 1500, true);
  console.log([first, second]);
}

main();

