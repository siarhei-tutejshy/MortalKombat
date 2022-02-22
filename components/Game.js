import { Player } from './Player.js';
import { createPlayer } from '../creatingMethods/creatingPlayer.js';
import { generateLogs } from '../creatingMethods/creatingLogs.js';
import { winPlayer } from '../creatingMethods/createWinTitle.js';
import { HIT, ATTACK } from '../data/hitAttackData.js';
import { randomizer, createElement } from '../utils/utils.js';
import { playerImages } from '../data/imagesData.js';

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

    setImagesProperty = () => {
        const imagesForFirstPlayer = playerImages.find(
            (item) => item.name === this.player1.name
        );
        const imagesForSecondPlayer = playerImages.find(
            (item) => item.name === this.player2.name
        );

        this.player1.images = imagesForFirstPlayer;
        this.player2.images = imagesForSecondPlayer;
    };

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

     hitMoving(enemy, attack) {
        let promise = new Promise((resolve) => {
            this.player1Block.children[1].children[0].src = this.player1.images.hit[attack.hit];   
            this.player1Block.children[1].classList.add('move');
            this.player2Block.children[1].children[0].src = this.player2.images.defense;
            resolve();
        });

        promise
            .then((_) => {
                return new Promise((resolve) => {
                    this.timerId2 = setTimeout(() => {
                        this.player1Block.children[1].classList.remove('move');
                        resolve();
                    }, 700);
                });
            })
            .then((_) => {
                this.player2Block.children[1].children[0].src = this.player2.images.hit[enemy.hit];
                this.player2Block.children[1].classList.add('move2');
                this.player1Block.children[1].children[0].src = this.player1.images.defense;
            })
            .then(() => {
                this.timerId = setTimeout(() => {
                    this.player2Block.children[1].children[0].src = this.player2.img;
                    this.player2Block.children[1].classList.remove('move2');
                    this.player1Block.children[1].children[0].src = this.player1.img;   
                }, 400);
            })
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

        (this.player1.hp === 0 || this.player2.hp === 0) 
            ? this.showResult()
            : this.hitMoving(enemy, attack)
    }

    showWinner = () => {
        if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
            this.$arena.append(winPlayer(this.player2.name));
            generateLogs('end', this.player2, this.player1);
            this.player1Block.children[1].children[0].src = this.player1.images.lose; 
            this.player2Block.children[1].children[0].src = this.player2.images.win;  
        } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
            this.$arena.append(winPlayer(this.player1.name));
            generateLogs('end', this.player1, this.player2);
            this.player2Block.children[1].children[0].src = this.player2.images.lose;
            this.player1Block.children[1].children[0].src = this.player1.images.win; 
        } else if (this.player1.hp === 0 && this.player2.hp === 0) {
            this.$arena.append(winPlayer());
            generateLogs('draw');
            this.player1Block.children[1].children[0].src = this.player1.images.lose; 
            this.player2Block.children[1].children[0].src = this.player2.images.lose;
        }
    };

    showResult = () => { 
            this.$fightButton.disabled = true;
            this.$fightButton.style.opacity = '0.6';
            this.createReloadButton();
            this.showWinner();
        
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

        this.player1Block = createPlayer(this.player1);

        console.log('between');
        this.player2Block = createPlayer(this.player2);

        this.setImagesProperty();

        this.$arena.append(this.player1Block, this.player2Block);

        generateLogs('start', this.player1, this.player2);

        this.$formFight.addEventListener('submit', (event) => {
            event.preventDefault();
            this.fightAction();
        });
    };
}
