const createElement = (tag, className) => {
    const $tag = document.createElement(tag);

    if (className) $tag.classList.add(className);

    return $tag;
};

const randomizer = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export { createElement, randomizer };
