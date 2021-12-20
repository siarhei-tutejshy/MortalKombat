import { changeHP, renderHP, elHP, showDamage } from './healthchange.js';

export const player1 = {
    player: 1,
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    changeHP,
    elHP,
    renderHP,
    showDamage,
};

export const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    changeHP,
    elHP,
    renderHP,
    showDamage,
};
