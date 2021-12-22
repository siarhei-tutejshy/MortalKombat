import { HIT, ATTACK } from './hitAttackData.js';
import { randomizer } from './utils.js';
import { $formFight } from './elements.js';

const enemyAttack = () => {
    const hit = ATTACK[randomizer(0, 2)];
    const defense = ATTACK[randomizer(0, 2)];

    return {
        value: randomizer(1, HIT[hit]),
        hit,
        defense,
    };
};

const ownAttack = () => {
    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = randomizer(1, HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defense = item.value;
        }
        item.checked = false;
    }
    return attack;
};

export { enemyAttack, ownAttack };
