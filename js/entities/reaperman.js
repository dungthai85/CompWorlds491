/**
*
*This function is the entity reaperman that is part of the enemy troops.
*/

function ReaperMan(game, X, Y, spritesheet) {
    this.walk_animation = new MyAnimation(spritesheet, 10, 0, 900, 900, 0.03, 24, true, true);
    this.attack_animation = new MyAnimation(AM.getAsset("./img/enemy_team/reaper_chibbi/reaper_attack.png"), 0, 0, 450, 450, 0.05, 12, true, false);
    this.dead_animation = new MyAnimation(AM.getAsset("./img/enemy_team/reaper_chibbi/reaper_actions1.png"), 0, 900, 450, 450, 0.1, 12, true, false);
    // this.moving = true;
    // this.attacking = false;
    // this.dead = false;
    // this.attack_count = 0;
    // this.speed = 100;
    // this.ctx = game.ctx;
    // Entity.call(this, game, X, Y);
    this.hp = 100;
    this.moving = true;
    this.attacking = false;
    this.finished = false;
    this.speed = -100;
    this.ctx = game.ctx;
    this.laneEnd = getLaneEnd(Y);
    this.x = X;
    this.y = Y;
    this.type = "enemy";
    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 1, this.attack_animation.frameHeight*.125);
    Entity.call(this, game, X, Y);
}

ReaperMan.prototype = new Entity();
ReaperMan.prototype.constructor = ReaperMan;

ReaperMan.prototype.update = function () {
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
            console.log('Colliding ' + entity.type);
            this.moving = false;
            this.attacking = true;
            break;
        }
        // var entity = this.game.entities[i];
        // if(entity.boundingbox != null && this.boundingbox != entity.boundingbox){
        //     if(this.boundingbox.collide(entity.boundingbox)){
        //         this.moving = false;
        //         this.attacking = true;
        //     }
        // }
    }
    if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        if (this.x < 250) {
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

    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 1, this.attack_animation.frameHeight*.125);
    Entity.prototype.update.call(this);
    // if (this.moving) {
    //     this.x -= this.game.clockTick * this.speed;
    //     if (this.x < 250) {
    //         this.moving = false;
    //         this.attacking = true;
    //     }
    // }
    // if (this.attacking) {
    //     this.attack_count += 1;
    //     if (this.attack_count > 250) {
    //             this.attacking = false;
    //             this.dead = true;             
    //     }
    
    // }
    // if (this.dead) {
    //     if (this.dead_animation.isDone()) {
    //         this.dead_animation.elapsedTime = 0;
    //         this.dead = false;
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

ReaperMan.prototype.draw = function () {
    if (this.moving) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, 1, this.boundingbox.height);
        this.walk_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1);
    } else if (this.attacking) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, 1, this.boundingbox.height);
        this.attack_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);
    } else if (this.hp <= 0) {
        if (this.dead_animation.animationComplete()) {
            this.attack_animation.elapseTime = 0;
            this.removeFromWorld = true;
        
        } else {
            this.dead_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.2);
        }
    }
    Entity.prototype.draw.call(this);
    // if (this.attacking) {
    //     this.attack_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1);        
    // }
    // else if (this.moving){
    //     this.walk_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1); 
    // }
    // else if (this.dead) {
    //     this.dead_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1);
    // }
    // else {
    //     // console.log(":D")
    // }
    // Entity.prototype.draw.call(this);
}


//   if (this.moving) {
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
// 