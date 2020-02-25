
function Mage(game, spritesheet, X, Y) {
    this.animation = new MyAnimation(spritesheet, 0, 0, 300, 300, 0.1, 24, true, false);
    this.attackAnimation = new MyAnimation(spritesheet, 0, 300, 300, 300, 0.1,12, true, false);
    this.deathAnimation = new MyAnimation(spritesheet, 0, 900, 300, 300, 0.2, 15, false, false);
    this.hp = 100;
    this.attackdamage = 0;
    this.range = 200;
    this.targeting = null;
    this.moving = true;
    this.attacking = false;
    this.finished = false;
    this.death = false;
    this.projectileFire = false;
    this.speed = 100;
    this.ctx = game.ctx;
    this.laneEnd = getLaneEnd(Y);
    this.x = X;
    this.y = Y;
    this.enemytouching = false;
    this.type = "hero";
    this.name = "mage";
    this.boundingbox = new BoundingBox(this.x + 67, this.y + 2, 3, this.attackAnimation.frameHeight * .1);
    this.hp_bar = new EnemyHP(this.x + 30, this.y + 80, 35, 5);
    this.hp_current = Mage_attributes.HP;
    this.hp_scale = 35;

    // Entity.call(this, game, 248, 469);
    Entity.call(this, game, X, Y);
}

Mage.prototype = new Entity();
Mage.prototype.constructor = Mage;

Mage.prototype.update = function () {
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
                this.enemytouching = true;
            } 
            break;
        } else{
            console.log("not colliding");
            this.enemytouching = false;
            break;
        }
        //     this.moving = false;
        //     if (this.hp_current > 0) {
        //         this.attacking = true;
        //     } else {
        //         this.attacking = false;

        //     }
        //     break; 
        // } 

        else if (this.boundingbox.rangeCheck(entity.boundingbox, this.range) && entity.type !== this.type){
            console.log('DETECT ENEMY IN RANGE');
            this.moving = false;
            this.attacking = true;
            this.targeting = entity;
            break;
        }
        else if (entity.name === "bluehp" && this.boundingbox.rangeCheck(entity.boundingbox1, this.range - 25)) {
            // console.log('Colliding ' + entity.type);
            this.moving = false;
            this.attacking = true;
            this.targeting = entity;
            break;
        }
         else if (entity.name === "bluehp" && this.boundingbox.rangeCheck(entity.boundingbox2, this.range - 25)) {
            // console.log('Colliding ' + entity.type);
            this.moving = false;
            this.attacking = true;
            this.targeting = entity;
            break;
        } else if (entity.name === "bluehp" && this.boundingbox.rangeCheck(entity.boundingbox3, this.range - 25)) {
            // console.log('Colliding ' + entity.type);
            this.moving = false;
            this.attacking = true;
            this.targeting = entity;
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
    if (this.targeting !== null) {
        // console.log("TARGETING");
        // console.log("REMOVE FROM WORLD " + entity.removeFromWorld);
      if (this.attackAnimation.currentFrame() === 4 && !this.projectileFire) {
            this.projectileFire = true;
            if (!this.enemytouching){
            this.game.addEntity(new Lightning(this.game, AM.getAsset("./img/Mage/Lightning.png"), this.x, this.y));
            }
            if (PLAY_MUSIC) {
                AM.getMusic("./img/music/lightning.ogg").play();
            }

        }

        if (this.attackAnimation.currentFrame() === 8) {
            this.projectileFire = false;
        }

        // else if (entity.name !== "Arrow" && entity.removeFromWorld) {
        else if (this.targeting.removeFromWorld) {
            // console.log("KILLED ENEMY");
            this.attacking = false;
            this.moving = true;
            this.targeting = null;
            this.attackAnimation.elapsedTime = 0;
            this.animation.elapsedTime = 0;
        }
    }
    // else if (this.moving) {
    else {
        // console.log("NOT TARGETING");
        this.x += this.game.clockTick * this.speed;
        // if (this.x > this.laneEnd) {
        //     this.moving = false;
        //     this.attacking = true;
        // }

        // this.attacking = false;
        // this.moving = true;
    }
    // if (this.attacking) {
    //     if (this.attackAnimation.currentFrame() === 4 && !this.projectileFire) {
    //         this.projectileFire = true;
    //         this.game.addEntity(new Lightning(this.game, AM.getAsset("./img/Mage/Lightning.png"), this.x, this.y));
    //         if (PLAY_MUSIC) {
    //             AM.getMusic("./img/music/lightning.ogg").play();
    //         }
    //         /*
    //         var spellChosen = Math.floor(Math.random() * 2);
    //         if (spellChosen === 1) {
                

    //         } else {
    //             this.game.addEntity(new MageFireball(this.game, AM.getAsset("./img/Fireball/Fireball.png"), this.x, this.y));

    //         }
            
    //         */ 

            
    //     }
    //     if (this.attackAnimation.currentFrame() === 8) {
    //         this.projectileFire = false;
    //     }
    //     if (entity.removeFromWorld && !this.projectileFire) {
    //         this.attacking = false;
    //         this.moving = true;
    //         this.attackAnimation.elapsedTime = 0;
    //         this.animation.elapsedTime = 0;
    //     }
    // }
    // else if (this.moving) {
    //     this.x += this.game.clockTick * this.speed;
    //     if (this.x > this.laneEnd) {
    //         this.moving = false;
    //         this.attacking = true;
    //     }

    // }
    this.boundingbox = new BoundingBox(this.x + 67, this.y + 2, 3, this.animation.frameHeight * .1);
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

Mage.prototype.draw = function () {
    

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
   
    if (this.hp_current > 0 && this.moving) {
        //bounding box test
        // this.ctx.strokeStyle = "red";
        // this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y + offset, 0.3);
    } else if (this.hp_current > 0 && this.attacking) {
        //bounding box test
        // this.ctx.strokeStyle = "red";
        // this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
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
        //debugger;
        if (!this.death) {
            this.death = true;
        } else if (this.death && this.deathAnimation.currentFrame() === 14) {
            this.removeFromWorld = true;
        }
    }
    Entity.prototype.draw.call(this);
}