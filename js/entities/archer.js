
function Archer(game, spritesheet, X, Y) {
    this.animation = new MyAnimation(spritesheet, 0, 0, 300, 300, 0.15, 24, true, false);
    this.attackAnimation = new MyAnimation(spritesheet, 0, 300, 300, 300, 0.2, 9, true, false);
    this.deathAnimation = new MyAnimation(spritesheet, 0, 900, 300, 300, 0.2, 15, false, false);
    this.playSound = true;
    this.hp = 100;
    this.attackdamage = 15;
    this.range = 300;
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
    this.arrowSound = AM.getMusic("./img/music/arrow1.mp3");
    this.boundingbox = new BoundingBox(this.x + 67, this.y + 2, 1, this.attackAnimation.frameHeight * .1);

    this.hp_bar = new EnemyHP(this.x + 30, this.y + 80, 35, 5);
    this.hp_current = Archer_attributes.HP;
    this.hp_scale = 35;

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
            if (entity.name !== "bluehp" && entity.attack_animation.animationComplete()) {
                // debugger;
                this.hp_current -= entity.attack_damage;
            }
            this.moving = false;
            if (this.hp_current > 0) {
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


            if (this.playSound) {
                this.arrowSound.play();
            }
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
    this.boundingbox = new BoundingBox(this.x + 67, this.y + 2, 1, this.animation.frameHeight * .1);
    this.hp_bar = new EnemyHP(this.x + 30, this.y + 80, this.hp_scale - ((this.hp - this.hp_current) * (this.hp_scale / this.hp)), 10);

    Entity.prototype.update.call(this);
}

function determineLane(y) {
    if (y === 385) {
        return 1;
    } else if (y === 468) {
        return 2;
    } else if (y === 551) {
        return 3;
    }

}

Archer.prototype.draw = function () {
    if (this.game.menu.clicked && this.game.menu.id === "SoundOnOff") {
        this.playSound = !this.playSound;
    }

    var offset = 0;
    if (determineLane(this.y) === 1) {
        offset = -14;
    } else if (determineLane(this.y) === 2) {
        offset = -15;
    } else if (determineLane(this.y) === 3) {
        offset = -15;
    }


    // Draw hp bar background
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillRect(this.hp_bar.x, this.hp_bar.y + offset, 35, this.hp_bar.height);
    // Draw hp bar
    if (!this.death) {
        // if (this.hp_full){
        //     this.ctx.fillStyle = "rgb(0, 62, 0)";
        // } 
        // else if (this.hp_half){
        //     this.ctx.fillStyle = "rgb(255, 174, 66)";
        // } 
        // else if (this.hp_quarter){
        //     this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
        // } 

        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
        this.ctx.fillRect(this.hp_bar.x, this.hp_bar.y + offset, this.hp_bar.width, this.hp_bar.height);
    }
    debugger;
    if (this.hp_current > 0 && this.moving) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y + offset, 0.3);
    } else if (this.hp_current > 0 && this.attacking) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.attackAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y + offset, 0.3);
        if (this.attackAnimation.animationComplete() && !this.finished) {
            // this.hp -= 10;
            this.finished = true;
        }

        else if (this.finished && this.attackAnimation.currentFrame() === 0) {
            this.finished = false;
        }

        else if (this.hp_current <= 0) {
            this.attacking = false;
        }

    } else if (this.hp_current <= 0) {
        this.deathAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y + offset, 0.3);
        debugger;
        if (!this.death) {
            this.death = true;
        } else if (this.death && this.deathAnimation.currentFrame() === 14) {
            this.removeFromWorld = true;
        }
    }
    Entity.prototype.draw.call(this);
}