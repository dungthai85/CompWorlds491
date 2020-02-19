/**
*
*This function is the entity ReaperMan that is part of the enemy troops.
*/

function ReaperMan(game, spritesheet, POSITION, LEVEL) {
    this.ctx = game.ctx;
    this.walk_animation = new MyAnimation(spritesheet, 0, 0, 300, 300, 0.05, 24, true, false);
    this.attack_animation = new MyAnimation(spritesheet, 0, 300, 300, 300, 0.05, 12, true, false);
    this.dead_animation = new MyAnimation(spritesheet, 0, 600, 300, 300, 0.05, 12, false, false);
    this.moving = true;
    this.attacking = false;
    this.finished = false;
    this.dead = false;

    this.hp = ReaperMan_attributes.HP * LEVEL; 
    this.attackdamage = ReaperMan_attributes.DAMAGE;
    this.speed = ReaperMan_attributes.SPEED * LEVEL;

    // this.hp_full = true;
    // this.hp_half = false;
    // this.hp_quarter = false;
    this.type = "enemy";
    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 1, this.attack_animation.frameHeight*.20);
    this.hp_bar = new EnemyHP(this.x + 30, this.y + 80, 35, 10);
    this.hp_current = ReaperMan_attributes.HP * LEVEL;
    this.hp_scale = 35;
    this.x = POSITION[0];
    this.y = POSITION[1];
    this.endLane = getEndPointEnemy(this.y);
    Entity.call(this, game, this.x, this.y);
}

ReaperMan.prototype = new Entity();
ReaperMan.prototype.constructor = ReaperMan;

ReaperMan.prototype.update = function () {
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
            console.log('Colliding ' + entity.name);
            if(entity.name === "redhp") {
                this.hp -= entity.attackdamage;
            }
            else if (entity.attackAnimation.animationComplete()) {
                // debugger;
                this.hp_current -= entity.attackdamage;


            }
            this.moving = false;
            if (this.hp_current > 0) {
                this.attacking = true;
            } else {
                this.attacking = false;

            }
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

    } else if (this.attacking) {
        if(entity.removeFromWorld){
            this.attacking = false;
            this.moving = true;
            this.attack_animation.elapsedTime = 0;
            this.walk_animation.elapsedTime = 0;
        }

    }
    // Update the boundingbox
    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 1, this.attack_animation.frameHeight*.20);

    // hp after scaled formula:
    // hp_scale = 250, hp_total = 1000 => ratio: 1/4
    // hp_after_scale = hp_scale - ((total_hp - current_hp) * ratio)
    this.hp_bar = new EnemyHP(this.x + 30, this.y + 80, this.hp_scale - ((this.hp - this.hp_current) * (this.hp_scale / this.hp)), 10);
    Entity.prototype.update.call(this);
}


ReaperMan.prototype.draw = function () {


    // Draw animation and boundingbow
    if (this.moving && this.hp_current > 0 ) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.walk_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.30);
    } else if (this.attacking && this.hp_current > 0 ) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.attack_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.30);
        if (this.attack_animation.animationComplete() && !this.finished) {
            this.finished = true;
        }

        else if (this.finished && this.attack_animation.currentFrame() === 0) {
            this.finished = false;
        }

        else if (this.hp_current <= 0) {
            this.attacking = false;
        }
    } else if (this.hp_current <= 0) {
        this.dead_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.375);
        if (!this.death) {
            this.death = true;
        } else if (this.death && this.dead_animation.currentFrame() === 8) {
            this.removeFromWorld = true;
        }
    }
    // Draw hp bar background
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillRect(this.hp_bar.x, this.hp_bar.y,35,this.hp_bar.height);
    // Draw hp bar
    if (!this.dead) {
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
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
