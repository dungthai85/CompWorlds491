// JavaScript source code
function MeleeHero(game, unit, X, Y) {
    var HERO = MeleeUnitSelect(unit);
    this.animation = HERO.move;
    this.attackAnimation = HERO.attack;
    this.deathAnimation = HERO.death;
    this.hp = HERO.HP * MULTIPLY_HERO;
    this.attackdamage = HERO.attackdamage;

    this.moving = true;
    this.attacking = false;
    this.finished = false;

    this.death = false;
    this.speed = HERO.speed;
    this.ctx = game.ctx;
    this.laneEnd = getLaneEnd(Y);
    this.x = X;
    this.y = Y;
    this.type = HERO.type;
    this.name = unit;
    this.deathSound = HERO.deathsound;
    // this.boundingbox = new BoundingBox(this.x + 63, this.y + 2, 5, this.attackAnimation.frameHeight * .1);
    this.boundingbox = new BoundingBox(this.x + HERO.boundingbox_xoffset, this.y + HERO.boundingbox_yoffset,
        HERO.boundingbox_width, this.attackAnimation.frameHeight * .1);

    this.hp_bar = new EnemyHP(this.x + HERO.hp_xoffset, this.y + HERO.hp_yoffset, 35, 5);
    this.hp_current = HERO.HP * MULTIPLY_HERO;
    this.hp_scale = 35;


    // Entity.call(this, game, 248, 469);
    Entity.call(this, game, X, Y);
}

MeleeHero.prototype = new Entity();
MeleeHero.prototype.constructor = MeleeHero;

MeleeHero.prototype.update = function () {
    var entity;
    for (var i = 0; i < this.game.entities.length; i++) {
        entity = this.game.entities[i];

        if (entity === this) {
            continue;
        }

        if (entity.boundingbox == null) {
            continue;
        }
        if (entity.name === "redhp") {
            continue;
        }

        //console.log('HERE ' + (this.boundingbox.collide(entity.boundingbox)) + " & "  + entity.type + " - " + this.type );
        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {
            // console.log('Colliding ' + entity.type);
            if (entity.name !== "bluehp" && entity.attack_animation.animationComplete()) {
                this.hp_current -= entity.attack_damage;
            }
            this.moving = false;
            if (this.hp_current > 0) {
                this.attacking = true;
            } else {
                this.attacking = false;

            }
            break;
        } else if (entity.name === "bluehp" && this.boundingbox.collide(entity.boundingbox1)) {
            // console.log('Colliding ' + entity.type);
            this.moving = false;
            this.attacking = true;
            break;
        }
        else if (entity.name === "bluehp" && this.boundingbox.collide(entity.boundingbox2)) {
            // console.log('Colliding ' + entity.type);
            this.moving = false;
            this.attacking = true;
            break;
        } else if (entity.name === "bluehp" && this.boundingbox.collide(entity.boundingbox3)) {
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
        if (entity.removeFromWorld) {
            this.attacking = false;
            this.moving = true;
            this.attackAnimation.elapsedTime = 0;
            this.animation.elapsedTime = 0;
        }
    }
    else if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        /*
        if (this.x > this.laneEnd) {
            this.moving = false;
            this.attacking = true;
        }*/

    }
    // this.boundingbox = new BoundingBox(this.x + 63, this.y + 2, 5, this.animation.frameHeight * .1);
    var HERO = MeleeUnitSelect(this.name);
    this.boundingbox = new BoundingBox(this.x + HERO.boundingbox_xoffset, this.y + HERO.boundingbox_yoffset,
        HERO.boundingbox_width, this.attackAnimation.frameHeight * .1);
    this.hp_bar = new EnemyHP(this.x + HERO.hp_xoffset, this.y + HERO.hp_yoffset, this.hp_scale - ((this.hp - this.hp_current) * (this.hp_scale / this.hp)), 10);
    Entity.prototype.update.call(this);
}

MeleeHero.prototype.draw = function () {
    // Draw hp bar background
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillRect(this.hp_bar.x, this.hp_bar.y + 6, 35, this.hp_bar.height);
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
        this.ctx.fillRect(this.hp_bar.x, this.hp_bar.y + 6, this.hp_bar.width, this.hp_bar.height);
    }

    if (this.hp_current > 0 && this.moving) {
        //bounding box test
        // this.ctx.strokeStyle = "red";
        // this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y - 4, 0.45);
    } else if (this.hp_current > 0 && this.attacking) {
        //bounding box test
        // this.ctx.strokeStyle = "red";
        // this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.attackAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y - 4, 0.45);
        if (this.attackAnimation.animationComplete() && !this.finished) {
            this.finished = true;
        }

        else if (this.finished && this.attackAnimation.currentFrame() === 0) {
            this.finished = false;
        }

        else if (this.hp_current <= 0) {
            this.attacking = false;

        }

    } else if (this.hp_current <= 0) {
        this.deathAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y - 4, 0.45);



        if (!this.death) {

            this.death = true;
            if (PLAY_MUSIC) {
                this.deathSound.play();
            } else {
                this.deathSound.pause();
            }
        } else if (this.death && this.deathAnimation.currentFrame() === 8) {
            this.removeFromWorld = true;
        }

    }
    Entity.prototype.draw.call(this);
}

function MeleeUnitSelect(name) {
    var unit;
    debugger;
    if (name === "Bandit") {
        var spritesheet = AM.getAsset("./img/Bandit/Bandit.png");
        var animation = new MyAnimation(spritesheet, 0, 0, 207, 190, 0.1, 8, true, false);
        var attackAnimation = new MyAnimation(spritesheet, 0, 207, 207, 190, 0.1, 8, true, false);
        var deathAnimation = new MyAnimation(spritesheet, 0, 621, 207, 190, 0.2, 8, false, false);

        unit = {
            move: animation,
            attack: attackAnimation,
            death: deathAnimation,
            type: "hero",
            HP: 130,
            attackdamage: 15,
            speed: 75,
            boundingbox_xoffset: 63,
            boundingbox_yoffset: 2,
            boundingbox_width: 5,
            hp_xoffset: 30,
            hp_yoffset: 60,

            deathsound: AM.getMusic("./img/music/BanditDeath.wav")

        };

    } else if (name === "Goblin") {
        var spritesheet = AM.getAsset("./img/Goblin/Goblin.png");
        var animation = new MyAnimation(spritesheet, 0, 0, 175, 197, 0.1, 8, true, false);
        var attackAnimation = new MyAnimation(spritesheet, 0, 197, 175, 197, 0.1, 8, true, false);
        var deathAnimation = new MyAnimation(spritesheet, 0, 591, 175, 197, 0.2, 8, false, false);
        unit = {
            move: animation,
            attack: attackAnimation,
            death: deathAnimation,
            type: "hero",
            HP: 100,
            attackdamage: 10,
            speed: 100,
            boundingbox_xoffset: 52,
            boundingbox_yoffset: 2,
            boundingbox_width: 5,
            hp_xoffset: 30,
            hp_yoffset: 60,
            deathsound: AM.getMusic("./img/music/BanditDeath.wav")
        }


    } else if (name === "Knight") {
        var spritesheet = AM.getAsset("./img/Knight/Knight.png");
        var animation = new MyAnimation(spritesheet, 0, 0, 184, 200, 0.1, 8, true, false);
        var attackAnimation = new MyAnimation(spritesheet, 0, 200, 184, 200, 0.1, 8, true, false);
        var deathAnimation = new MyAnimation(spritesheet, 0, 600, 184, 200, 0.2, 8, false, false);
        unit = {
            move: animation,
            attack: attackAnimation,
            death: deathAnimation,
            type: "hero",
            HP: 150,
            attackdamage: 20,
            speed: 50,
            boundingbox_xoffset: 50,
            boundingbox_yoffset: 2,
            boundingbox_width: 5,
            hp_xoffset: 12.5,
            hp_yoffset: 65,
            deathsound: AM.getMusic("./img/music/KnightDeath.wav")
        }
    } else if (name === "Samurai") {
        var spritesheet = AM.getAsset("./img/Samurai/Samurai.png");
        var animation = new MyAnimation(spritesheet, 0, 0, 246, 204, 0.1, 8, true, false);
        var attackAnimation = new MyAnimation(spritesheet, 0, 246, 246, 204, 0.1, 8, true, false);
        var deathAnimation = new MyAnimation(spritesheet, 0, 738, 246, 204, 0.2, 8, false, false);
        unit = {
            move: animation,
            attack: attackAnimation,
            death: deathAnimation,
            type: "hero",
            HP: 130,
            attackdamage: 15,
            speed: 75,
            boundingbox_xoffset: 73,
            boundingbox_yoffset: 2,
            boundingbox_width: 5,
            hp_xoffset: 35,
            hp_yoffset: 65.5,
            deathsound: AM.getMusic("./img/music/SamuraiDeath.wav")
        }

    }

    return unit;
}