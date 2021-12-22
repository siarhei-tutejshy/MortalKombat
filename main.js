import { player1, player2 } from './players.js';
import { $arena, $formFight } from './elements.js';
import { generateLogs } from './creatingLogs.js';
import { createPlayer } from './creatingPlayer.js';
import { fightAction } from './fight.js';
import { showResult } from './results.js';

$arena.append(createPlayer(player1), createPlayer(player2));

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', (event) => {
    event.preventDefault();
    fightAction();
    showResult();
});
