


function Goblin(game, spritesheet, X, Y) {
    // scale 0.125
    this.animation = new MyAnimation(spritesheet, 0, 0, 524, 591, 0.4, 8, true, false);
    this.attackAnimation = new MyAnimation(spritesheet, 0, 600, 524, 591, 0.2, 8, true, false);
    this.deathAnimation = new MyAnimation(spritesheet, 0, 1800, 524, 591, 0.2, 8, true, false);
    this.hp = 10;
    this.moving = true;
    this.attacking = false;
    this.finished = false;
    this.speed = 100;
    this.ctx = game.ctx;
    this.laneEnd = getLaneEnd(Y);
    this.x = X;
    this.y = Y;

    this.boundingbox = new BoundingBox(this.x + 2, this.y + 2, this.attackAnimation.frameWidth*.1, this.attackAnimation.frameHeight*.1);

    // Entity.call(this, game, 248, 469);
    Entity.call(this, game, X, Y);
}

Goblin.prototype = new Entity();
Goblin.prototype.constructor = Goblin;

Goblin.prototype.update = function () {
    if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        if (this.x > this.laneEnd) {
            this.moving = false;
            this.attacking = true;
        }

    }
    this.boundingbox = new BoundingBox(this.x + 2, this.y + 2, this.animation.frameWidth*.1, this.animation.frameHeight*.1);
    Entity.prototype.update.call(this);
}

Goblin.prototype.draw = function () {
    if (this.moving) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.125);
    } else if (this.attacking) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.attackAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.125);
        if (this.attackAnimation.animationComplete() && !this.finished) {
            this.hp -= 10;
        }

        else if (this.finished && this.attackAnimation.currentFrame() === 0) {
            this.finished = false;
        }

        else if (this.hp <= 0) {
            this.attacking = false;
        }

    } else if (this.hp <= 0) {
        this.deathAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.125);
        if (this.deathAnimation.animationComplete()) {
            this.removeFromWorld = true;
        }
    }
    Entity.prototype.draw.call(this);
}