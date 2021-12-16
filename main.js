const $arena = document.querySelector('.arenas');

const $fightButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 15,
};

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['punch', 'highkick', 'fireball'],

    attack: function () {
        console.log(`${this.name} Fight...`);
    },
    changeHP,
    elHP,
    renderHP,
    showDamage
};

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['punch', 'highkick', 'freeze'],

    attack: function () {
        console.log(`${this.name} Fight...`);
    },
    changeHP,
    elHP,
    renderHP,
    showDamage
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) $tag.classList.add(className);

    return $tag;
}

function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeHP(damageInterval) {
    this.hp -= damageInterval;

    if (this.hp <= 0) this.hp = 0;

    return this.hp;
}

function elHP() {
    const $playerLife = document.querySelector(`.player${this.player} .life`);

    return $playerLife;
}

function renderHP() {
    const $playerLife = this.elHP();

    $playerLife.style.width = `${this.hp}%`;
}

function winPlayer(name) {
    const $winPlayer = createElement('div', 'loseTitle');

    if (name) {
        $winPlayer.innerText = `${name} win!`;
    } else {
        $winPlayer.innerText = `DRAW!`;
    }
    return $winPlayer;
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadWrap.append($reloadButton);
    $arena.append($reloadWrap);

    $reloadButton.addEventListener('click', () => window.location.reload());
}

function createPlayer(playerObj) {
    const $divPlayer = createElement('div', `player${playerObj.player}`);

    const $divProgressbar = createElement('div', 'progressbar');

    const $divLife = createElement('div', 'life');
    $divLife.style.width = `${playerObj.hp}%`;

    const $divName = createElement('div', 'name');
    $divName.textContent = playerObj.name;

    const $divCharacter = createElement('div', 'character');

    const $divImgCharacter = createElement('img');
    $divImgCharacter.src = playerObj.img;

    $divProgressbar.append($divLife, $divName);
    $divCharacter.append($divImgCharacter);
    $divPlayer.append($divProgressbar, $divCharacter);

    return $divPlayer;
}

$arena.append(createPlayer(player1), createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[randomizer(0, 2)];
    const defense = ATTACK[randomizer(0, 2)];

    return {
        value: randomizer(1, HIT[hit]),
        hit,
        defense,
    };
}

function ownAttack() {
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
}

function showDamage (damageValue) {
    this.changeHP(damageValue);
    this.renderHP();
}

function fightAction() {
    const enemy = enemyAttack();
    const attack = ownAttack();

    if (enemy.hit !== attack.defense) {
        player1.showDamage(enemy.value)
    } 

    if (attack.hit !== enemy.defense) {
        player2.showDamage(attack.value)
    } 
        
    if (player1.hp === 0 || player2.hp === 0) {
        $fightButton.disabled = true;
        $fightButton.style.opacity = '0.6';
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arena.append(winPlayer(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arena.append(winPlayer(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arena.append(winPlayer());
    }
}

$formFight.addEventListener('submit', (event) => {
    event.preventDefault();
    fightAction();
});
