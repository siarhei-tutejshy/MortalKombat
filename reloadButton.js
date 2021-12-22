import { $arena } from './elements.js';
import { createElement } from './utils.js';


const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadWrap.append($reloadButton);
    $arena.append($reloadWrap);

    $reloadButton.addEventListener('click', () => window.location.reload());
};

export { createReloadButton };
