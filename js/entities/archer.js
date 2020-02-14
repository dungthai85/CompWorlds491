
function Archer(game, spritesheet, X, Y) {
    this.animation = new MyAnimation(spritesheet, 0, 0, 300, 300, 0.15, 24, true, false);
    this.attackAnimation = new MyAnimation(spritesheet, 0, 300, 300, 300, 0.2, 9, true, false);
    this.deathAnimation = new MyAnimation(spritesheet, 0, 900, 300, 300, 0.2, 15, false, false);
    this.hp = 100;
    this.attackdamage = 0;
    this.range = 400;
    this.moving = true;
    this.attacking = false;
    this.finished = false;
    this.death = false;
    this.arrowFire = false;
    this.speed = 100;
    this.ctx = game.ctx;
    this.laneEnd = getLaneEnd(Y);
    this.x = X;
    this.y = Y;
    this.type = "hero";
    this.boundingbox = new BoundingBox(this.x + 52, this.y + 2, 1, this.attackAnimation.frameHeight * .1);

    // Entity.call(this, game, 248, 469);
    Entity.call(this, game, X, Y);
}

Archer.prototype = new Entity();
Archer.prototype.constructor = Archer;

Archer.prototype.update = function () {
    var entity;
    for (var i = 0; i < this.game.entities.length; i++) {
        entity = this.game.entities[i];

        if (entity === this) {
            continue;
        }

        if (entity.boundingbox == null) {
            continue;
        }

        //console.log('HERE ' + (this.boundingbox.collide(entity.boundingbox)) + " & "  + entity.type + " - " + this.type );
        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {
            if(entity.name === "bluehp") {
                this.hp -= entity.attackdamage;
            }
            else if (entity.attack_animation.animationComplete()) {
                // debugger;
                this.hp -= entity.attackdamage;


            }
            this.moving = false;
            if (this.hp > 0) {
                this.attacking = true;
            } else {
                this.attacking = false;

            }
            break;

            
        } else if (this.boundingbox.rangeCheck(entity.boundingbox, this.range) && entity.type !== this.type) {
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
    if (this.attacking) {
        if (this.attackAnimation.currentFrame() === 4 && !this.arrowFire) {
            this.arrowFire = true;
            this.game.addEntity(new Arrow(this.game, AM.getAsset("./img/Archer/Arrow.png"), this.x, this.y));

        }

        if (this.attackAnimation.currentFrame() === 8) {
            this.arrowFire = false;
        }

        if (entity.removeFromWorld) {
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
    this.boundingbox = new BoundingBox(this.x + 52, this.y + 2, 1, this.animation.frameHeight * .1);
    Entity.prototype.update.call(this);
}

Archer.prototype.draw = function () {
    if (this.hp > 0 && this.moving) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.3);
    } else if (this.hp > 0 && this.attacking) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.attackAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.3);
        if (this.attackAnimation.animationComplete() && !this.finished) {
            // this.hp -= 10;
            this.finished = true;
        }

        else if (this.finished && this.attackAnimation.currentFrame() === 0) {
            this.finished = false;
        }

        else if (this.hp <= 0) {
            this.attacking = false;
        }

    } else if (this.hp <= 0) {
        this.deathAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.3);
        if (!this.death) {
            this.death = true;
        } else if (this.death && this.deathAnimation.currentFrame() === 15) {
            this.removeFromWorld = true;
        }
    }
    Entity.prototype.draw.call(this);
}