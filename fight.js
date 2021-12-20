import { enemyAttack, ownAttack } from './attacks.js';
import { generateLogs } from './creatingLogs.js';
import { player1, player2 } from './players.js';


const fightAction = () => {
    const enemy = enemyAttack();
    const attack = ownAttack();

    if (enemy.hit !== attack.defense) {
        player1.showDamage(enemy.value);
        generateLogs('hit', player2, player1, enemy.value);
    } else generateLogs('defence', player2, player1);

    if (attack.hit !== enemy.defense) {
        player2.showDamage(attack.value);
        generateLogs('hit', player1, player2, attack.value);
    } else generateLogs('defence', player1, player2);
};

export { fightAction };
