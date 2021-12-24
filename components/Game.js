import { Player } from './Player.js';
import { createPlayer } from '../creatingMethods/creatingPlayer.js';
import { generateLogs } from '../creatingMethods/creatingLogs.js';
import { winPlayer } from '../creatingMethods/createWinTitle.js';
import { HIT, ATTACK } from '../data/hitAttackData.js';
import { randomizer, createElement } from '../utils/utils.js';

export class Game {
    constructor() {
        this.player1 = new Player({
            ...JSON.parse(localStorage.getItem('player1')),
            player: 1,
        });
        this.player2 = new Player({
            ...JSON.parse(localStorage.getItem('player2')),
            player: 2,
        });
        this.$arena = document.querySelector('.arenas');
        this.$fightButton = document.querySelector('.button');
        this.$formFight = document.querySelector('.control');
    }

    async attack() {
        const attack = {};
        for (let item of this.$formFight) {
            if (item.checked && item.name === 'hit') attack.hit = item.value;

            if (item.checked && item.name === 'defence')
                attack.defense = item.value;

            item.checked = false;
        }
        let response = await fetch(
            'http://reactmarathon-api.herokuapp.com/api/mk/player/fight',
            {
                method: 'POST',
                body: JSON.stringify({
                    hit: attack.hit,
                    defence: attack.defense,
                }),
            }
        ).then((data) => data.json());
        return response;
    }

    async fightAction() {
        const attacks = await this.attack();
        const enemy = attacks.player1;
        const attack = attacks.player2;

        if (enemy.hit !== attack.defense) {
            this.player1.showDamage(enemy.value);
            generateLogs('hit', this.player2, this.player1, enemy.value);
        } else generateLogs('defence', this.player2, this.player1);

        if (attack.hit !== enemy.defense) {
            this.player2.showDamage(attack.value);
            generateLogs('hit', this.player1, this.player2, attack.value);
        } else generateLogs('defence', this.player1, this.player2);
    }

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

        $reloadButton.addEventListener(
            'click',
            () => (window.location = 'index.html')
        );
    };

    start = () => {
        this.$arena.classList.add(`arena${randomizer(1, 5)}`);

        this.$arena.append(
            createPlayer(this.player1),
            createPlayer(this.player2)
        );

        generateLogs('start', this.player1, this.player2);

        this.$formFight.addEventListener('submit', (event) => {
            event.preventDefault();
            this.fightAction().then(() => this.showResult());
        });
    };
}
