/**
*
*This function is the entity orc that is part of the enemy troops.
*/


function Orc(game, spritesheet, X, Y ) {
    this.walk_animation = new MyAnimation(spritesheet, 0, 0, 300, 300, 0.05, 24, true, false);
    this.attack_animation = new MyAnimation(spritesheet, 0, 300, 300, 300, 0.05, 12, true, false);
    this.dead_animation = new MyAnimation(spritesheet, 0, 600, 300, 300, 0.05, 12, false, false);
    this.hp = 100;
    this.moving = true;
    this.attacking = false;
    this.finished = false;
    this.speed = -100;
    this.ctx = game.ctx;
    this.endLane = getEndPointEnemy(Y);
    this.x = X;
    this.y = Y;
    this.type = "enemy";
    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 1, this.attack_animation.frameHeight*.20);
    Entity.call(this, game, X, Y);
}

Orc.prototype = new Entity();
Orc.prototype.constructor = Orc;

Orc.prototype.update = function () {
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
    }
    if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        if (this.x < this.endLane) {
            this.moving = false;
            this.attacking = true;
        }

    }
    if (this.attack_animation.animationComplete() && !this.finished) {
        // this.hp -= 10;
    }

    else if (this.finished && this.attack_animation.currentFrame() === 0) {
        this.finished = false;
    }

    else if (this.hp <= 0) {
        this.attacking = false;
    }

    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 1, this.attack_animation.frameHeight*.20);
    Entity.prototype.update.call(this);
    // if (this.moving) {
    //     this.x -= this.game.clockTick * this.speed;
    //     if (this.x < 250) {
    //         this.moving = false;
    //         this.attacking = true;
    //     }
    // }
    // // if (this.attacking) {
    // //     if (this.attack_animation.isDone()) {
    // //         this.attack_animation.elapsedTime = 0;
    // //         this.attacking = false;
    // //     }      
    // // }
    // Entity.prototype.update.call(this);
}


Orc.prototype.draw = function () {
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
    // if (this.attacking) {
    //     this.attack_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1);        
    // }
    // else {
    //     this.walk_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1); 
    // }
    // Entity.prototype.draw.call(this);
}

// if (this.moving) {
//     this.walk_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1);
// } else if (this.attacking) {
//     this.attack_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);
//     if (this.attack_animation.animationComplete() && !this.finished) {
//         this.hp -= 10;
//     }

//     else if (this.finished && this.attack_animation.currentFrame() === 0) {
//         this.finished = false;
//     }

//     else if (this.hp <= 0) {
//         this.attacking = false;
//     }

// } else if (this.hp <= 0) {
//     this.dead_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);
//     if (this.dead_animation.animationComplete()) {
//         this.removeFromWorld = true;
//     }
// }
function getEndPointEnemy(yValue) {
    if (yValue === 370) { // lane 1
        return 270;
    } else if (yValue === 455) { // lane 2
        return 250;
    } else if (yValue === 535) { // lane 3
        return 170;
    }
}