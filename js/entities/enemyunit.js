function EnemyUnit(game, ENTITY_NAME, POSITION, LEVEL) {
    var ENEMY = Enemy_Generator(ENTITY_NAME);

    if (is_castle_under_attack) {
        if (POSITION[1] === 535) this.x = POSITION[0] + 50;
        else this.x = POSITION[0] + 20;
    } else this.x = POSITION[0];
    this.y = POSITION[1];
    
    if (ENEMY.TYPE === "Boss") {
        this.walk_animation = new MyAnimation(ENEMY.sprite_sheet, 0, 0, 400, 250, 0.05, 10, true, false);
        this.attack_animation = new MyAnimation(ENEMY.sprite_sheet, 0, 400, 400, 250, 0.05, 10, true, false);
        this.hurt_animation = new MyAnimation(ENEMY.sprite_sheet, 0, 800, 400, 250, 0.1, 10, false, false);
        this.dead_animation = new MyAnimation(ENEMY.sprite_sheet, 0, 1200, 400, 250, 0.1, 10, false, false);
        this.FORM_SCALE = 1.00;
        this.effect = new MyAnimation(AM.getAsset("./img/Others/hit_effect.png"), 0, 0, 1024, 1024, 0.03, 16, true, false);
    } else {
        this.walk_animation = new MyAnimation(ENEMY.sprite_sheet, 0, 0, 300, 300, 0.05, 24, true, false);
        this.attack_animation = new MyAnimation(ENEMY.sprite_sheet, 0, 300, 300, 300, 0.05, 12, true, false);
        this.dead_animation = new MyAnimation(ENEMY.sprite_sheet, 0, 600, 300, 300, 0.05, 12, false, false);     
        this.FORM_SCALE = 0.30;   
        this.effect = new MyAnimation(AM.getAsset("./img/Others/hit_effect.png"), 0, 0, 1024, 1024, 0.03, 16, true, false);
    }
    
    // this.effect = new MyAnimation(AM.getAsset("./img/Others/effects.png"), 0, 0, 59.9, 90, 0.05, 14, true, false);
    this.moving = true;
    this.attacking = false;
    this.finished = false;
    this.death = false;
    this.hp = ENEMY.HP * LEVEL; 
    this.attack_damage = ENEMY.DAMAGE;
    this.speed = ENEMY.SPEED * LEVEL;
    // this.speed = -220;
    this.type = "enemy";
    this.name = ENTITY_NAME;

    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 3, this.attack_animation.frameHeight*.20);
    this.hp_bar = new EnemyHP(this.x + 30, this.y + 80, 35, 10);
    this.hpbarwidth = this.hp_bar.width;
    this.hp_current = ENEMY.HP * LEVEL;
    this.hp_scale = 35;

    this.attack_sound =  AM.getMusic("./img/music/sword_swipe_2.mp3");
    this.endLane = getEndPointEnemy(this.y);

    this.ctx = game.ctx;
    Entity.call(this, game, this.x, this.y);
}

EnemyUnit.prototype = new Entity();
EnemyUnit.prototype.constructor = EnemyUnit;

EnemyUnit.prototype.update = function () {
    var entity;
    for (var i = 0; i < this.game.entities.length; i++) {
        entity = this.game.entities[i];
        if (entity === this || entity.boundingbox == null || entity.name === "bluehp") {
            continue;
        }

        // if (entity.boundingbox == null) {
        //     continue;
        // }
        // if (entity.name === "bluehp"){
        //     continue;
        // }
        if (entity.type !== this.type && entity.name !== "redhp" && this.boundingbox.collide(entity.boundingbox)) {
            // console.log('Colliding ' + entity.name);
            this.moving = false;
            if (this.hp_current > 0) {
                if (PLAY_MUSIC) {
                    this.attack_sound.play();
                } else {
                    this.attack_sound.pause();
                }
                this.attacking = true;
                
                this.target = entity;
            } else {
                this.attacking = false;
            }
            // if (this.attack_animation.animationComplete()) this.attack_sound.play();
            if (entity.name === "Fireball") {
                if (this.name === "TrollWarlord") this.hp_current -= FIREBALL_DAMAGE;
            } else if (entity.name === "Arrow" || entity.name === "Spell") {
                this.hp_current -= entity.attackdamage;
                this.moving = true;
                this.attacking = false;
                entity.removeFromWorld = true;
                break;
            }  else if (entity.attackAnimation.animationComplete()) {
                this.hp_current -= entity.attackdamage;
            }
            // this.moving = false;
            break;
        } else if (entity.name === "redhp" && (this.boundingbox.collide(entity.boundingbox1) || this.boundingbox.collide(entity.boundingbox2) || this.boundingbox.collide(entity.boundingbox3))) {
            // console.log('Colliding ' + entity.type);
            this.moving = false;
            this.attacking = true;
            break;
        }
        //  else if (entity.name === "redhp" && this.boundingbox.collide(entity.boundingbox2)) {
        //     // console.log('Colliding ' + entity.type);
        //     this.moving = false;
        //     this.attacking = true;
        //     break;
        // } else if (entity.name === "redhp" && this.boundingbox.collide(entity.boundingbox3)) {
        //     // console.log('Colliding ' + entity.type);
        //     this.moving = false;
        //     this.attacking = true;
        //     break;
        // }

    }
    // Update animation
    if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        // if (this.x < this.endLane) {
        //     this.moving = false;
        //     this.attacking = true;
        // }

    } else if (this.attacking) {
        if (entity.removeFromWorld) {
            this.attacking = false;
            this.moving = true;
            this.attack_animation.elapsedTime = 0;
            this.walk_animation.elapsedTime = 0;
        }
    }
    // Update the boundingbox
    // hp after scaled formula:
    // hp_scale = 250, hp_total = 1000 => ratio: 1/4
    // hp_after_scale = hp_scale - ((total_hp - current_hp) * ratio)
    if (this.name === "TrollWarlord") {
        this.boundingbox = new BoundingBox(this.x + 120, this.y + 100, 3, this.attack_animation.frameHeight*.50);
        this.hp_bar = new EnemyHP(this.x + 150, this.y + 230, (this.hp_scale*3) - ((this.hp - this.hp_current) * ((this.hp_scale*3) / this.hp)), 15);
    } 
    else {
        this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 3, this.attack_animation.frameHeight * .20);
        this.hp_bar = new EnemyHP(this.x + 30, this.y + 80, this.hp_scale - ((this.hp - this.hp_current) * (this.hp_scale / this.hp)), 10);
    }
    Entity.prototype.update.call(this);
}


EnemyUnit.prototype.draw = function () {
    // Draw animation and boundingbow
    if (this.moving && this.hp_current > 0 ) {
        //bounding box test
        // this.ctx.strokeStyle = "red";
        // this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.walk_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, this.FORM_SCALE);
    } else if (this.attacking && this.hp_current > 0 ) {
        //bounding box test
        // this.ctx.strokeStyle = "red";
        // this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.attack_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, this.FORM_SCALE);

        if (this.name === "TrollWarlord") this.effect.drawFrame(this.game.clockTick, this.ctx, this.x - 30, this.y, 0.3);
        else this.effect.drawFrame(this.game.clockTick, this.ctx, this.x - 30, this.y, 0.1);
        
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
        if (this.name === "TrollWarlord")  {
            this.dead_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, this.FORM_SCALE);
            // if (this.hurt_animation.animationComplete()) this.dead_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, this.FORM_SCALE);
        } else this.dead_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, this.FORM_SCALE);

        if (!this.death) {
            this.death = true;
        } else if (this.death && this.dead_animation.currentFrame() === 8) {
            this.removeFromWorld = true;
        }
    }
    // Draw hp bar background
    this.ctx.fillStyle = "rgb(255,255,255)";
    if (this.name === "TrollWarlord") this.ctx.fillRect(this.hp_bar.x, this.hp_bar.y,this.hpbarwidth,this.hp_bar.height);
    else this.ctx.fillRect(this.hp_bar.x, this.hp_bar.y,35,this.hp_bar.height);
    // Draw hp bar
    if (!this.death) {
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
        this.ctx.fillRect(this.hp_bar.x, this.hp_bar.y,this.hp_bar.width,this.hp_bar.height);
    }

    Entity.prototype.draw.call(this);
}

function Enemy_Generator(ENTITY_NAME) {
    var enemy;
    var MULTIPLY = 3;
    if (ENTITY_NAME === "Orc") {
        enemy = {
            sprite_sheet : AM.getAsset("./img/enemy_team/orc/orc.png"),
            HP : 130 * MULTIPLY,
            DAMAGE : 15,
            SPEED : -35,
            TYPE : "Unit"
        }
    } else if (ENTITY_NAME === "FallenAngel") {
        enemy = {
            sprite_sheet : AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"),
            HP : 150 * MULTIPLY,
            DAMAGE : 20,
            SPEED : -25,
            TYPE : "Unit"
        }
    } else if (ENTITY_NAME === "ReaperMan") {
        enemy = {
            sprite_sheet : AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"),
            HP : 120 * MULTIPLY,
            DAMAGE : 15,
            SPEED : -40,
            TYPE : "Unit"
        }
    } else if (ENTITY_NAME === "TrollWarlord") {
        enemy = {
            sprite_sheet : AM.getAsset("./img/enemy_team/boss/troll_warlord.png"),
            HP : 1000 * MULTIPLY,
            DAMAGE : 15,
            SPEED : -50,
            TYPE : "Boss"
        }
    } else if (ENTITY_NAME === "DeathKnight") {
        enemy = {
            sprite_sheet : AM.getAsset("./img/enemy_team/death_knight/death_knight.png"),
            HP : 100 * MULTIPLY,
            DAMAGE : 15,
            SPEED : -50,
            TYPE : "Unit"
        }
    } 

    return enemy
}