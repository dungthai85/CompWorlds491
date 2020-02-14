

function Knight(game, spritesheet, X, Y) {
    this.animation = new MyAnimation(spritesheet, 0, 0, 184, 200, 0.4, 8, true, false);
    this.attackAnimation = new MyAnimation(spritesheet, 0, 200, 184, 200, 0.2, 8, true, false);
    this.deathAnimation = new MyAnimation(spritesheet, 0, 600, 184, 200, 0.2, 8, false, false);
    this.hp = 150;
    this.attackdamage = 20;
    this.moving = true;
    this.attacking = false;
    this.finished = false;
    this.death = false;
    this.speed = 50;
    this.ctx = game.ctx;
    this.laneEnd = getLaneEnd(Y);
    this.x = X;
    this.y = Y;
    this.game = game;
    this.type = "hero";
    this.boundingbox = new BoundingBox(this.x + 50, this.y + 2, 1, this.attackAnimation.frameHeight*.1);
    //console.log(this.boundingbox.y);
    // Entity.call(this, game, 248, 469);

    this.hp_bar = new EnemyHP(this.x + 12.5, this.y + 65, 35, 5);
    this.hp_current = Knight_attributes.HP;
    this.hp_scale = 35;


    Entity.call(this, game, X, Y);
}

Knight.prototype = new Entity();
Knight.prototype.constructor = Knight;

Knight.prototype.update = function () {

    var entity;
    var entity2;
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
            if(entity.name === "bluehp") {
                this.hp -= entity.attackdamage;
            }
            else if (entity.attack_animation.animationComplete()) {
                // debugger;
                this.hp_current -= entity.attackdamage;


            // }
           } else {
                if (entity.attack_animation.animationComplete()) {
                    // debugger;
                    this.hp -= entity.attackdamage;


                }
           }
 
            this.moving = false;
            if (this.hp_current > 0) {
                this.attacking = true;
            } else {
                this.attacking = false;

            }
            break;
        }
        // console.log(this.hp);

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
        if (this.x > this.laneEnd + 10) {
            this.moving = false;
            this.attacking = true;
        }

    }
    this.boundingbox = new BoundingBox(this.x + 50, this.y + 2, 1, this.animation.frameHeight * .1);
    this.hp_bar = new EnemyHP(this.x + 12.5, this.y + 65, this.hp_scale - ((this.hp - this.hp_current) * (this.hp_scale / this.hp)), 10);

    Entity.prototype.update.call(this);
}

Knight.prototype.draw = function () {
    // Draw hp bar background
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillRect(this.hp_bar.x, this.hp_bar.y, 35, this.hp_bar.height);
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
        this.ctx.fillRect(this.hp_bar.x, this.hp_bar.y, this.hp_bar.width, this.hp_bar.height);
    }
    if (this.hp_current > 0 && this.moving) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, 1, this.boundingbox.height);
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.375);
    } else if (this.hp_current > 0 && this.attacking) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, 1, this.boundingbox.height);
        this.attackAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.375);
        // if (this.attackAnimation.animationComplete() && !this.finished) {
        //     this.attackAnimation.elapsedTime = 0;
        //     this.finished = true;
        //     this.hp -= 10;
        // }

        // else if (this.finished && this.attackAnimation.currentFrame() === 0) {
        //     this.finished = false;
        // }

        // else if (this.hp <= 0) {
        //     this.attacking = false;
        // }

    } else if (this.hp_current <= 0) {
        this.deathAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.375);
        if (!this.death) {
            this.death = true;
        } else if (this.death && this.deathAnimation.currentFrame() === 8) {
            this.removeFromWorld = true;
        }
    }
    Entity.prototype.draw.call(this);
}