import { createElement } from './utils.js';

const createPlayer = (playerObj) => {
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
};

export { createPlayer };
