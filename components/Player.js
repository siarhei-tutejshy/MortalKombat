export class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
    }

    changeHP = (damageInterval) => {
        this.hp -= damageInterval;

        if (this.hp <= 0) this.hp = 0;

        return this.hp;
    };

    elHP = () => {
        const $playerLife = document.querySelector(
            `.player${this.player} .life`
        );

        return $playerLife;
    };

    renderHP = () => {
        const $playerLife = this.elHP();

        $playerLife.style.width = `${this.hp}%`;
    };

    showDamage = (damageValue) => {
        this.changeHP(damageValue);
        this.renderHP();
    };
}
