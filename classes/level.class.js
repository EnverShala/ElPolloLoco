class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectables;
    level_end_x = 2200;

    constructor(enemies, clouds, collectables, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.collectables = collectables;
        this.backgroundObjects = backgroundObjects;
    }
}