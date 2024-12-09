class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  speedY = 0;
  acceleration = 3.0;
  height = 280;
  y = 150;

  moveRight() {
    this.x += this.speed * 30;
  }

  moveLeft() {
    this.x -= this.speed * 30;
  }

  applyFalling() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if(this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  playAnimation(images) {
    if (this.currentImage >= images.length) {
        this.currentImage = 0;
    }

    let path = images[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  // fore using this function, set object.currentImage = 0;
  playAnimationOnce(images) {    
    setInterval(() => {
      if(this.currentImage == images.length) {
        clearInterval();
        return;
      }

      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 50);
  }

  jump() {
    this.speedY = 30;
  }

  isColliding(mo) {
    return (this.x + 25) + (this.width - 25) > mo.x &&
    (this.y + 225) + (this.height - 50) > mo.y &&
    (this.x + 25) < mo.x &&
    (this.y + 225) < mo.y + mo.height;
  }

  isHitting(mo) {
    return this.x + this.width > mo.x &&
    this.y + (this.height) > mo.y &&
    this.x < mo.x &&
    this.y < mo.y + mo.height;
  }

  jumpedOn(mo) {
    return (this.x + 25) + (this.width - 25) > mo.x &&
    this.y + this.height > mo.y &&
    (this.x + 25) < mo.x &&
    this.isAboveGround(); // &&
    //this.y < mo.y + mo.height;
  }

  hit() {
    this.energy -= 5;

    if(this.energy < 0) { this.energy = 0; }
    else { this.lastHit = new Date().getTime(); }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 300;
  }
}
