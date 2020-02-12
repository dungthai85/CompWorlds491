/**
*
*This function is the entity orc that is part of the enemy troops.
*/


function Orc(game, spritesheet, X, Y) {
    this.walk_animation = new MyAnimation(spritesheet, 0, 0, 300, 300, 0.05, 24, true, false);
    this.attack_animation = new MyAnimation(spritesheet, 0, 300, 300, 300, 0.05, 12, true, false);
    this.dead_animation = new MyAnimation(spritesheet, 0, 600, 300, 300, 0.05, 12, false, false);
    this.attackdamage = 15;
    this.moving = true;
    this.attacking = false;
    this.finished = false;
    this.speed = -75;
    this.ctx = game.ctx;
    this.endLane = getEndPointEnemy(Y);
    this.x = X;
    this.y = Y;
    this.hp = 130;
    this.full = true;
    this.half = false;
    this.quarter = false;
    this.type = "enemy";
    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 1, this.attack_animation.frameHeight*.20);
    this.hpbar = new EnemyHP(game, 1000, this.x, this.y + 40, 5, this.attack_animation.frameHeight*.20);
    Entity.call(this, game, X, Y);
}

Orc.prototype = new Entity();
Orc.prototype.constructor = Orc;

Orc.prototype.update = function () {
    var entity;
    for(var i = 0; i < this.game.entities.length; i ++){
        entity = this.game.entities[i];
        if (entity === this) {
            continue;
        }

        if (entity.boundingbox == null) {
            continue;
        }

        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {
            this.moving = false;
            this.attacking = true;
            break;
        }
    }
    if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        if (this.x < this.endLane) {
            this.moving = false;
            this.attacking = true;
        }

    }
    if (this.attack_animation.animationComplete() && !this.finished) {
        this.hp -= 10;
    }

    else if (this.finished && this.attack_animation.currentFrame() === 0) {
        this.finished = false;
    }

    else if (this.hp <= 0) {
        this.attacking = false;
    }

    // update hp bar
    if(this.hpbar < 0){
        this.hpbar = 0;
    }
    else if(this.hp < 500 && this.hp > 250){
        this.full = false;
        this.half = true;
    }
    else if(this.hp <= 250){
        this.half = false;
        this.quarter = true;
    }

    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 1, this.attack_animation.frameHeight*.20);
    this.hpbar = new EnemyHP(this.game, 1000, this.x+20, this.y + 75, this.hp*0.4, 13);
    Entity.prototype.update.call(this);
}


Orc.prototype.draw = function () {
    // Draw hp bar
    if (this.full){
        this.ctx.fillStyle = "rgb(58, 174, 89)";
    } 
    else if (this.half){
        this.ctx.fillStyle = "rgb(255, 174, 66)";
    } 
    else if (this.quarter){
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
    }
    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(this.hpbar.x, this.hpbar.y,this.hpbar.width,this.hpbar.height);

    // Draw animation and boundingbow
    if (this.moving) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.walk_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.30);
    } else if (this.attacking) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.attack_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.30);
    } else if (this.hp <= 0) {
        this.dead_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.30);
        if (this.dead_animation.animationComplete()) {

            this.removeFromWorld = true;
        } else {
            this.dead_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.20);
        }
    }
    Entity.prototype.draw.call(this);
}

function getEndPointEnemy(yValue) {
    if (yValue === 370) { // lane 1
        return 270;
    } else if (yValue === 455) { // lane 2
        return 250;
    } else if (yValue === 535) { // lane 3
        return 170;
    }
}