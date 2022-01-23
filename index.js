const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');
const $player2 = document.querySelector('.player2');

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach((item) => {
                $tag.classList.add(item);
            });
        } else {
            $tag.classList.add(className);
        }
    }

    return $tag;
};

function createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');

    const players = await fetch(
        'https://reactmarathon-api.herokuapp.com/api/mk/players'
    ).then((res) => res.json());
    const player2 = await fetch(
        
        'https://reactmarathon-api.herokuapp.com/api/mk/player/choose'
    ).then((res) => res.json());

    let imgSrc = null;
    createEmptyPlayerBlock();

    players.forEach((item) => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

        el.addEventListener('mousemove', () => {
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {
            console.log(player2);
            localStorage.setItem('player1', JSON.stringify(item));
            localStorage.setItem('player2', JSON.stringify(player2));
            el.classList.add('active');

            const $img2 = createElement('img');
            $img2.src = player2.img;
            $player2.appendChild($img2);

            setTimeout(() => {
                window.location.pathname = 'arenas.html';
            }, 1000);
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();
