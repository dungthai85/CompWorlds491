function EnemyUnit(game, ENTITY_NAME, POSITION, LEVEL) {
    var ENEMY = Enemy_Generator(ENTITY_NAME);

    if (is_castle_under_attack) {
        if (POSITION[1] === 535) this.x = POSITION[0] + 150;
        else this.x = POSITION[0] + 55;
    }
    else this.x = POSITION[0];
    this.y = POSITION[1];
    
    this.walk_animation = new MyAnimation(ENEMY.sprite_sheet, 0, 0, 300, 300, 0.05, 24, true, false);
    this.attack_animation = new MyAnimation(ENEMY.sprite_sheet, 0, 300, 300, 300, 0.05, 12, true, false);
    this.dead_animation = new MyAnimation(ENEMY.sprite_sheet, 0, 600, 300, 300, 0.05, 12, false, false);
    
    this.moving = true;
    this.attacking = false;
    this.finished = false;
    this.death = false;

    this.hp = ENEMY.HP * LEVEL; 
    this.attack_damage = ENEMY.DAMAGE;
    this.speed = ENEMY.SPEED * LEVEL;

    this.type = "enemy";

    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 3, this.attack_animation.frameHeight*.20);
    this.hp_bar = new EnemyHP(this.x + 30, this.y + 80, 35, 10);
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
        if (entity === this) {
            continue;
        }

        if (entity.boundingbox == null) {
            continue;
        }

        if (entity.type !== this.type && this.boundingbox.collide(entity.boundingbox)) {
            // console.log('Colliding ' + entity.name);
            this.moving = false;
            if (this.hp_current > 0) {
                if (PLAY_MUSIC) {
                    this.attack_sound.play();
                } else {
                    this.attack_sound.pause();
                }
                this.attacking = true;
            } else {
                this.attacking = false;
            }
            if (this.attack_animation.animationComplete()) this.attack_sound.play();
            if (entity.name === "redhp") {

            } else if (entity.name === "Fireball") {

            } else if (entity.name === "Arrow") {
                this.hp_current -= entity.attackdamage;
                this.moving = true;
                this.attacking = false;
                entity.removeFromWorld = true;
                break;
            } else if (entity.name === "Spell") {
                this.hp_current -= entity.attackdamage;
                this.moving = true;
                this.attacking = false;
                entity.removeFromWorld = true;
                break;
            } else if (entity.attackAnimation.animationComplete()) {
                this.hp_current -= entity.attackdamage;
            }
            // this.moving = false;
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
        if (entity.removeFromWorld) {
            this.attacking = false;
            this.moving = true;
            this.attack_animation.elapsedTime = 0;
            this.walk_animation.elapsedTime = 0;
        }

    }
    // Update the boundingbox
    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20, 3, this.attack_animation.frameHeight * .20);

    // hp after scaled formula:
    // hp_scale = 250, hp_total = 1000 => ratio: 1/4
    // hp_after_scale = hp_scale - ((total_hp - current_hp) * ratio)
    this.hp_bar = new EnemyHP(this.x + 30, this.y + 80, this.hp_scale - ((this.hp - this.hp_current) * (this.hp_scale / this.hp)), 10);
    Entity.prototype.update.call(this);
}


EnemyUnit.prototype.draw = function () {
    // Draw animation and boundingbow
    if (this.moving && this.hp_current > 0 ) {
        //bounding box test
        // this.ctx.strokeStyle = "red";
        // this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.walk_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.30);
    } else if (this.attacking && this.hp_current > 0 ) {
        //bounding box test
        // this.ctx.strokeStyle = "red";
        // this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
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
            SPEED : -35
        }
    } else if (ENTITY_NAME === "FallenAngel") {
        enemy = {
            sprite_sheet : AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"),
            HP : 150 * MULTIPLY,
            DAMAGE : 20,
            SPEED : -25
        }
    } else if (ENTITY_NAME === "ReaperMan") {
        enemy = {
            sprite_sheet : AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"),
            HP : 120 * MULTIPLY,
            DAMAGE : 15,
            SPEED : -40
        }
    }

    return enemy
}
