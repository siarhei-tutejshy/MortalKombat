const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['punch', 'highkick', 'fireball'],

    attack: function () {
        console.log(`${this.name} Fight...`);
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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
    const damage = randomizer(1, damageInterval);

    this.hp -= damage;

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

$randomButton.addEventListener('click', () => {
    player1.changeHP(20);
    player1.renderHP();

    player2.changeHP(20);
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arena.append(winPlayer(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arena.append(winPlayer(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arena.append(winPlayer());
    }
});

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
