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

function showDamage(damageValue) {
    this.changeHP(damageValue);
    this.renderHP();
}

export { changeHP, elHP, renderHP, showDamage };
