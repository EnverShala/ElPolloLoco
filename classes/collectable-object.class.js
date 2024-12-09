class CollectableObject extends DrawableObject {
    constructor(x) {
        super().loadImage("img/8_coin/coin_1.png");;
        this.x = x;
        this.y = 100;
    }
}