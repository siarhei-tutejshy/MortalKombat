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
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) $tag.classList.add(className);

    return $tag;
}

function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeHP(player) {
    const $playerLife = document.querySelector(`.player${player.player} .life`);
    const damage = randomizer(1, 20);

    player.hp -= damage;

    if (player.hp <= 0) player.hp = 0;

    $playerLife.style.width = `${player.hp}%`;
}

function winPlayer(name) {
    const $winPlayer = createElement('div', 'loseTitle');
    $winPlayer.innerText = `${name} win!`;

    $randomButton.disabled = true;

    return $winPlayer;
}

$randomButton.addEventListener('click', () => {
    changeHP(player1);
    changeHP(player2);

    if (player1.hp === 0) {
        $arena.append(winPlayer(player2.name));
    } else if (player2.hp === 0) {
        $arena.append(winPlayer(player1.name));
    }
});

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
