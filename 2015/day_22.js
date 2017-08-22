/*******************************
* Advent of code 2015 - Day 22
*******************************/

/**
Player turn:
  apply effects of spells which contain turns and which counter > 0 and reduce counter
  check if boss is dead
	
  choose spell:
    if spell is active:
      choose another
    else:
      execute spell:
        if spell contains turns:
	  set counter
        else:
          do effects

  check if boss is dead

  remove shield effect if it's not active

Boss turn:
  apply effects of spells which contain turns and which counter > 0 and reduce counter
  check is boss is dead

  damage player
  check if player is dead

  remove shield effect if it's not active
**/

var player =
    {
        hp: 50,
        mp: 500,
        armor: 0
    };
var boss =
    {
        hp: 55,
        damage: 8
    };

var spells =
    {
        magic_missile:
            {
                mp: 53,
                effects: { damage: 2 }
            },
        drain:
            {
                mp: 73,
                effects: { damage: 2, hp: 2 }
            },
        shield:
            {
                mp     : 113,
                turns  : 6,
                counter: 0,
                effects: { armor: 7 }
            },
        poison:
            {
                mp     : 173,
                turns  : 6,
                counter: 0,
                effects: { damage: 3 }
            },
        recharge:
            {
                mp     : 229,
                turns  : 5,
                counter: 0,
                effects: { mp: 101 }
            }
    };


function boss_is_dead()   { return boss.hp   <= 0; }
function player_is_dead() { return player.hp <= 0; }

function apply_effects()
    {
        for(var key in spells)
            {
                var spell = spells[key];
                
                if(spell['turns'] != undefined && spell['counter'] > 0)
                    {
                        for(var effect in spell['effects'])
                            {
                                if(effect == 'damage')
                                    {
                                        boss.hp -= spell['effects'][effect];
                                    }
                                else
                                    {
                                        player[effect] += spell['effects'][effect];
                                    }
                                
                            }
                        
                        spell['counter']--;
                    }
            }
    }

function restart_stats()
    {
        spells.shield   .turns   = 6;
        spells.shield   .counter = 0;
        spells.poison   .turns   = 6;
        spells.poison   .counter = 0;
        spells.reacharge.turns   = 5;
        spells.recharge .counter = 0;
        
        player.hp    = 50;
        player.mp    = 500;
        player.armor = 0;
        
        boss.hp = 55;
    }

function check_shield_effect()
    {
        if(spells['shield']['counter'] == 0 && player.armor == 7)
            {
                player.armor = 0;
            }
    }

function simulate_battle()
    {
        var result = true;
        
        while(1)
            {
                /**************
                * Player turn
                **************/
                apply_effects();
                if( boss_is_dead() ) { break; }
                
                // Choose spell
                if( boss_is_dead() ) { break; }
                
                check_shield_effect();
                
                
                /************
                * Boss turn
                ************/
                apply_effects();
                if( boss_is_dead() ) { break; }
                
                player.hp -= boss.damage - player.armor < 1 ? 1 : boss.damage - player.armor;
                if( player_is_dead() ) { result = false; break; }
                
                check_shield_effect();
            }

        
        restart_stats();
        
        return result;
    }
