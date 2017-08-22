/*******************************
* Advent of code 2015 - Day 21
*******************************/
function simulate_battle(player, boss)
    {
        var total_dmg_player = player.damage - boss.armor < 1 ? 1 : player.damage - boss.armor;
        var total_dmg_boss   = boss.damage - player.armor < 1 ? 1 : boss.damage - player.armor;
        
        var result = false;
        
        while(1)
            {
                // Player turn
                boss.hp   -= total_dmg_player;
                if(boss.hp <= 0) { result = true; break; }
                
                // Boss turn
                player.hp -= total_dmg_boss;
                if(player.hp <= 0) { break; }
            }
        
        player.hp = 100;
        boss.hp   = 100;
        
        return result;
    }


var player =
    {
        hp     : 100,
        damage : 0,
        armor  : 0
    };

const boss =
    {
        hp     : 100,
        damage : 8,
        armor  : 2
    };

const shop =
    {
        weapons:
            {
                dagger     : { cost:  8, damage: 4, armor: 0 },
                shortsword : { cost: 10, damage: 5, armor: 0 },
                warhammer  : { cost: 25, damage: 6, armor: 0 },
                longsword  : { cost: 40, damage: 7, armor: 0 },
                greataxe   : { cost: 74, damage: 8, armor: 0 }
            },
        armor:
            {
                none       : { cost:  0,  damage: 0, armor: 0 },
                leather    : { cost: 13,  damage: 0, armor: 1 },
                chainmail  : { cost: 31,  damage: 0, armor: 2 },
                splintmail : { cost: 53,  damage: 0, armor: 3 },
                bandedmail : { cost: 75,  damage: 0, armor: 4 },
                platemail  : { cost: 102, damage: 0, armor: 5 }
            },
        ring1:
            {
                none     : { cost:   0, damage: 0, armor: 0 },
                damage1  : { cost:  25, damage: 1, armor: 0 },
                damage2  : { cost:  50, damage: 2, armor: 0 },
                damage3  : { cost: 100, damage: 3, armor: 0 },
                defense1 : { cost:  20, damage: 0, armor: 1 },
                defense2 : { cost:  40, damage: 0, armor: 2 },
                defense3 : { cost:  80, damage: 0, armor: 3 }
            },
        ring2:
            {
                none     : { cost:   0, damage: 0, armor: 0 },
                damage1  : { cost:  25, damage: 1, armor: 0 },
                damage2  : { cost:  50, damage: 2, armor: 0 },
                damage3  : { cost: 100, damage: 3, armor: 0 },
                defense1 : { cost:  20, damage: 0, armor: 1 },
                defense2 : { cost:  40, damage: 0, armor: 2 },
                defense3 : { cost:  80, damage: 0, armor: 3 }
            }
    };


var lowest_cost  = 1000;
var highest_cost = 0;

for(var weapon in shop['weapons'])
    {
        for(var armor in shop['armor'])
            {
                for(var ring1 in shop['ring1'])
                    {
                        for(var ring2 in shop['ring2'])
                            {
                                if(ring1 == ring2 && ring1 != 'none') { continue; }
                                
                                player.damage =
                                    shop['weapons'][weapon].damage
                                    + shop['ring1'][ring1].damage
                                    + shop['ring2'][ring2].damage;
                                
                                player.armor =
                                    shop['armor'][armor].armor
                                    + shop['ring1'][ring1].armor
                                    + shop['ring2'][ring2].armor;
                                    
                                var cost =
                                    shop['weapons'][weapon].cost
                                    + shop['armor'][armor].cost
                                    + shop['ring1'][ring1].cost
                                    + shop['ring2'][ring2].cost;
                                
                                
                                var dmg_player = player.damage - boss.armor < 1 ? 1 : player.damage - boss.armor;
                                var dmg_boss   = boss.damage - player.armor < 1 ? 1 : boss.damage - player.armor;
                                
                                if(dmg_player >= dmg_boss) { if(cost < lowest_cost)  { lowest_cost  = cost; } }
                                else                       { if(cost > highest_cost) { highest_cost = cost; } }
                            }
                    }
            }
    }

console.log(lowest_cost, highest_cost);