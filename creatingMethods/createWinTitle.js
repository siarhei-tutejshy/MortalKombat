import { createElement } from '../utils/utils.js';

const winPlayer = (name) => {
    const $winPlayer = createElement('div', 'loseTitle');

    if (name) {
        $winPlayer.innerText = `${name} win!`;
    } else {
        $winPlayer.innerText = `DRAW!`;
    }
    return $winPlayer;
};
export { winPlayer };
