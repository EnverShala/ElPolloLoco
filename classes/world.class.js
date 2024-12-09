class World {

    character = new Character();

    level = level1;

    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    collectedBottles = 5;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100)
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }

            this.throwableObjects.forEach((bottle) => {
                if(bottle.isHitting(enemy)) {
                    clearInterval(bottle.intervalID);
                    bottle.currentImage = 0; // needed for playAnimationOnce
                    bottle.playAnimationOnce(bottle.IMAGES_BOTTLE_SPLASH);
                    //enemy.loseEnergy();

                    // remove the actual bottle from the array (recognize it via the x value)
                    setTimeout(() => {
                        this.throwableObjects = this.throwableObjects.filter(b => b.x != bottle.x);
                    }, 2000);
                    
                    console.log("getroffen");
                }
            });
        });

        /*
        vergleicht den x wert des kollidierenden collectables mit denen des arrays und filtert
        das collectable mit dem selben x wert raus, da nur die collectables drinnen bleiben die != NICHT den selben x wert haben
        */  

        this.level.collectables.forEach((collectable) => {
            if(this.character.isColliding(collectable)) {
                level1.collectables = level1.collectables.filter(c => (c.x != collectable.x) && (c.y != collectable.y));
            }
        });
    }

    checkThrowObjects() {
        if(this.collectedBottles <= 0) { return; }

        if(this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
            bottle.otherDirection = this.character.otherDirection;
            this.throwableObjects.push(bottle);
            bottle.throw();
            this.collectedBottles--;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);

        // fixed Objects here between these 2 translations
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function() { self.draw(); });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    addObjectsToMap(o) {
        o.forEach(o => { this.addToMap(o); });
    }
}