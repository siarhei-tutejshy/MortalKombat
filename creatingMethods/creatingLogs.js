import { logs } from '../data/logsData.js';
import { randomizer } from '../utils/utils.js';

let { start, end, hit, defence, draw } = logs;
const $chat = document.querySelector('.chat');

const generateLogs = (...rest) => {
    let [type, player1, player2, damage] = rest;
    let text = '';
    let date = new Date();
    date = date.toLocaleTimeString();

    switch (type) {
        case 'start':
            text = start
                .replace('[time]', date)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
            break;

        case 'hit':
            text = `${date} - ${hit[randomizer(0, hit.length - 1)]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name)} -${damage} [${
                player2.hp
            }/100]`;
            break;

        case 'defence':
            text = `${date} - ${defence[randomizer(0, defence.length - 1)]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name)}`;
            break;

        case 'end':
            text = `${end[randomizer(0, end.length - 1)]
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name)}`;
            break;

        case 'draw':
            text = `${draw}`;
            break;
    }

    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
};

export { generateLogs };
