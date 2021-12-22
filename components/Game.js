import { Player } from './Player.js';
import { createPlayer } from '../creatingMethods/creatingPlayer.js';
import { generateLogs } from '../creatingMethods/creatingLogs.js';
import { winPlayer } from '../creatingMethods/createWinTitle.js';
import { HIT, ATTACK } from '../data/hitAttackData.js';
import { randomizer, createElement } from '../utils/utils.js';

export class Game {
    constructor() {
        this.player1 = new Player({
            player: 1,
            name: 'Scorpio',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        });
        this.player2 = new Player({
            player: 2,
            name: 'Subzero',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        });
        this.$arena = document.querySelector('.arenas');
        this.$fightButton = document.querySelector('.button');
        this.$formFight = document.querySelector('.control');
    }

    enemyAttack = () => {
        const hit = ATTACK[randomizer(0, 2)];
        const defense = ATTACK[randomizer(0, 2)];
        return {
            value: randomizer(1, HIT[hit]),
            hit,
            defense,
        };
    };

    ownAttack = () => {
        const attack = {};
        for (let item of this.$formFight) {
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

    fightAction = () => {
        const enemy = this.enemyAttack();
        const attack = this.ownAttack();

        if (enemy.hit !== attack.defense) {
            this.player1.showDamage(enemy.value);
            generateLogs('hit', this.player2, this.player1, enemy.value);
        } else generateLogs('defence', this.player2, this.player1);

        if (attack.hit !== enemy.defense) {
            this.player2.showDamage(attack.value);
            generateLogs('hit', this.player1, this.player2, attack.value);
        } else generateLogs('defence', this.player1, this.player2);
    };

    showResult = () => {
        if (this.player1.hp === 0 || this.player2.hp === 0) {
            this.$fightButton.disabled = true;
            this.$fightButton.style.opacity = '0.6';
            this.createReloadButton();
        }

        if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
            this.$arena.append(winPlayer(this.player2.name));
            generateLogs('end', this.player2, this.player1);
        } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
            this.$arena.append(winPlayer(this.player1.name));
            generateLogs('end', this.player1, this.player2);
        } else if (this.player1.hp === 0 && this.player2.hp === 0) {
            this.$arena.append(winPlayer());
            generateLogs('draw');
        }
    };

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $reloadButton = createElement('button', 'button');
        $reloadButton.innerText = 'Restart';

        $reloadWrap.append($reloadButton);
        this.$arena.append($reloadWrap);

        $reloadButton.addEventListener('click', () => window.location.reload());
    };

    start = () => {
        this.$arena.append(
            createPlayer(this.player1),
            createPlayer(this.player2)
        );

        generateLogs('start', this.player1, this.player2);

        this.$formFight.addEventListener('submit', (event) => {
            event.preventDefault();
            this.fightAction();
            this.showResult();
        });
    };
}
