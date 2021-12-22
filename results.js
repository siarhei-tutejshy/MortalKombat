import { generateLogs } from './creatingLogs.js';
import { $fightButton, $arena } from './elements.js';
import { createReloadButton } from './reloadButton.js';
import { winPlayer } from './winner.js';
import { player1, player2 } from './players.js';

const showResult = () => {
    if (player1.hp === 0 || player2.hp === 0) {
        $fightButton.disabled = true;
        $fightButton.style.opacity = '0.6';
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arena.append(winPlayer(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arena.append(winPlayer(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arena.append(winPlayer());
        generateLogs('draw');
    }
};

export { showResult };
