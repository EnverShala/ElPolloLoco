class StatusBar extends DrawableObject {
    IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
        return this.percentage / 20 | 0; // | 0 wandelt die Zahl in eine ganze Zahl ohne Nachkommastelle um
    }
}