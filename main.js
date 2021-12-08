const scorpio = {
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: [
        'punch',
        'highkick',
        'fireball'
    ],

    attack: function() {
        console.log(`${this.name} Fight...`);
    }
};

const subzero = {
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [
        'punch',
        'highkick',
        'freeze'
    ],

    attack: function() {
        console.log(`${this.name} Fight...`);
    }
};

function createPlayer(player, playerObj) {
    const $divPlayer = document.createElement('div');
    $divPlayer.classList.add(player);

    const $divProgressbar = document.createElement('div');
    $divProgressbar.classList.add('progressbar');

    const $divLife = document.createElement('div');
    $divLife.classList.add('life');
    $divLife.style.width = '100%';
    $divLife.innerText = playerObj.hp;

    const $divName = document.createElement('div');
    $divName.classList.add('name');
    $divName.textContent = playerObj.name;

    const $divCharacter = document.createElement('div');
    $divCharacter.classList.add('character');

    const $divImgCharacter = document.createElement('img');
    $divImgCharacter.src = playerObj.img;

    $divProgressbar.append($divLife, $divName);
    $divCharacter.append($divImgCharacter);
    $divPlayer.append($divProgressbar,$divCharacter);

    const $arena = document.querySelector('.arenas');
    $arena.append($divPlayer);
}

createPlayer('player1', scorpio);
createPlayer('player2', subzero);
