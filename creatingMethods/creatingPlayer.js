import { createElement } from '../utils/utils.js';

const createPlayer = ({ player, hp, name, img }) => {
    const $divPlayer = createElement('div', `player${player}`);

    const $divProgressbar = createElement('div', 'progressbar');

    const $divLife = createElement('div', 'life');
    $divLife.style.width = `${hp}%`;

    const $divName = createElement('div', 'name');
    $divName.textContent = name;

    const $divCharacter = createElement('div', 'character');

    const $divImgCharacter = createElement('img');
    $divImgCharacter.src = img;

    $divProgressbar.append($divLife, $divName);
    $divCharacter.append($divImgCharacter);
    $divPlayer.append($divProgressbar, $divCharacter);

    return $divPlayer;
};

export { createPlayer };
