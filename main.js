const $arena = document.querySelector('.arenas');

const $fightButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 15,
};

const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    ],
    draw: 'Ничья - это тоже победа!',
};

const player1 = {
    player: 1,
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    changeHP,
    elHP,
    renderHP,
    showDamage,
};

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    changeHP,
    elHP,
    renderHP,
    showDamage,
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

function generateLogs(type, player1, player2, damage) {
    let text = '';
    let date = new Date();
    const hours =
        date.getHours().toString.length < 2
            ? 0 + date.getHours()
            : date.getHours();

    const minutes =
        date.getMinutes().toString.length < 2
            ? 0 + date.getMinutes()
            : date.getMinutes();

    date = `${hours}:${minutes}`;

    switch (type) {
        case 'start':
            text = logs[type]
                .replace('[time]', date)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
            break;

        case 'hit':
            text = `${date} - ${logs[type][randomizer(0, logs[type].length - 1)]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name)} -${damage} [${player2.hp}/100]`;
            break;

        case 'defence':
            text = `${date} - ${logs[type][randomizer(0, logs[type].length - 1)]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name)}`;
            break;

        case 'end':
            text = `${logs[type][randomizer(0, logs[type].length - 1)]
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name)}`;
            break;

        case 'draw':
            text = `${logs[type]}`;
            break;
    }

    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

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

function showDamage(damageValue) {
    this.changeHP(damageValue);
    this.renderHP();
}

function showResult() {
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
}

function fightAction() {
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
}

$arena.append(createPlayer(player1), createPlayer(player2));

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', (event) => {
    event.preventDefault();
    fightAction();
    showResult();
});
