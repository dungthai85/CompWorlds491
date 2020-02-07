
function Bandit(game, spritesheet, X, Y) {
    // scale 0.125
    this.animation = new MyAnimation(spritesheet, 0, 0, 621, 569, 0.1, 8, true, false);
    this.attackAnimation = new MyAnimation(spritesheet, 0, 625, 621, 569, 0.05, 8, true, false);
    this.deathAnimation = new MyAnimation(spritesheet, 0, 1863, 621, 569, 0.2, 8, true, false);
    this.hp = 20;
    this.moving = true;
    this.attacking = false;
    this.finished = false;
    this.speed = 90;
    this.ctx = game.ctx;
    this.laneEnd = getLaneEnd(Y);
    this.x = X;
    this.y = Y;
    this.type = "hero";
    this.boundingbox = new BoundingBox(this.x + 63, this.y + 2, 1, this.attackAnimation.frameHeight*.1);
    // Entity.call(this, game, 248, 469);
    Entity.call(this, game, X, Y);
}

Bandit.prototype = new Entity();
Bandit.prototype.constructor = Bandit;

Bandit.prototype.update = function () {
    var entity;
    for(var i = 0; i < this.game.entities.length; i ++){
        entity = this.game.entities[i];

        if (entity === this) {
            continue;
        }

        if (entity.boundingbox == null) {
            continue;
        }

        //console.log('HERE ' + (this.boundingbox.collide(entity.boundingbox)) + " & "  + entity.type + " - " + this.type );
        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {
            // console.log('Colliding ' + entity.type);
            this.moving = false;
            this.attacking = true;
            break;
        }

        // if (!entity.removeFromWorld) {
        //     this.moving = true;
        //     this.attacking = false;
        //     break;
        // }

        // if(entity.boundingbox != null && this.boundingbox != entity.boundingbox){
        //     if(this.boundingbox.collide(entity.boundingbox) && entity.type != this.type){
        //         this.moving = false;
        //         this.attacking = true;
        //         break;
        //     }
        // }
    }
    if (this.attacking){
        if(entity.removeFromWorld){
            this.attacking = false;
            this.moving = true;
            this.attackAnimation.elapsedTime = 0;
            this.animation.elapsedTime = 0;
        }
    }
    else if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        if (this.x > this.laneEnd) {
            this.moving = false;
            this.attacking = true;
        }

    }
    this.boundingbox = new BoundingBox(this.x + 63, this.y + 2, 1, this.animation.frameHeight*.1);
    Entity.prototype.update.call(this);
}

Bandit.prototype.draw = function () {
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
            this.finished = true;
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
