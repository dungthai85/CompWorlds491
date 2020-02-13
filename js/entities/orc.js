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
    this.hp_full = true;
    this.hp_half = false;
    this.hp_quarter = false;
    this.type = "enemy";
    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 1, this.attack_animation.frameHeight*.20);
    this.hp_bar = new EnemyHP(this.x, this.y + 40, 5, this.attack_animation.frameHeight*.20);
    Entity.call(this, game, X, Y);
}

Orc.prototype = new Entity();
Orc.prototype.constructor = Orc;

Orc.prototype.update = function () {
    // Update boundingbox
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
    // Update animation
    if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        if (this.x < this.endLane) {
            this.moving = false;
            this.attacking = true;
        }

    }
    if (this.attack_animation.animationComplete() && !this.finished) {
        this.hp -= 5;
    }

    else if (this.finished && this.attack_animation.currentFrame() === 0) {
        this.finished = false;
    }

    else if (this.hp <= 0) {
        this.attacking = false;
    }
    // Update the boundingbox
    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 1, this.attack_animation.frameHeight*.20);
    // Update the hp bar
    if (this.hp < 0) {
        this.dead = true;
    } else if ((this.hp < orc_chibbi_attributes.HP / 2) && (this.hp > orc_chibbi_attributes.HP / 4)) {
        this.hp_full = false;
        this.hp_half = true;
    } else if ((this.hp < orc_chibbi_attributes.HP / 4 && (this.hp >= 0))) {
        this.hp_half = false;
        this.hp_quarter = true;
    }
    this.hp_bar = new EnemyHP(this.x + 30, this.y + 80, this.hp*0.25, 10);
    Entity.prototype.update.call(this);
}


Orc.prototype.draw = function () {
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
    } else if (this.dead) {
        this.dead_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.30);
        if (this.dead_animation.animationComplete()) {

            this.removeFromWorld = true;
        } else {
            this.dead_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.20);
        }
    }

    // Draw hp bar
    if (!this.dead) {
        if (this.hp_full){
            this.ctx.fillStyle = "rgb(0, 62, 0)";
        } 
        else if (this.hp_half){
            this.ctx.fillStyle = "rgb(255, 174, 66)";
        } 
        else if (this.hp_quarter){
            this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
        } 
        this.ctx.fillRect(this.hp_bar.x, this.hp_bar.y,this.hp_bar.width,this.hp_bar.height);
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