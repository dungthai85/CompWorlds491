var AM = new AssetManager();
var is_enemy_spawn_1 = false;
var is_enemy_spawn_2 = false;

function getLaneEnd(yValue) {
    if (yValue === 385) { // lane 1
        return 1080;
    } else if (yValue === 468) { // lane 2
        return 1109;
    } else if (yValue === 551) { // lane 3
        return 1200;
    }
}

function RedHP(game){
    this.game = game;
    this.ctx = game.ctx;
    this.full = true;
    this.half = false;
    this.quarter = false;
    this.type = "hero";
    this.name ="redhp";
    this.hp = 1000;
    this.hpbar = 296;
    this.boundingbox = new BoundingBox(290, 400, 1, 65);
    this.boundingbox1 = new BoundingBox(290, 400, 1, 65);
    this.boundingbox2 = new BoundingBox(290, 480, 1, 65);
    this.boundingbox3 = new BoundingBox(250, 550, 1, 65);
    this.x = 288;
  
}

RedHP.prototype = new Entity();
RedHP.prototype.constructor = RedHP;

RedHP.prototype.update = function () {
   // console.log(this.hp);
    var entity;
    for(var i = 0; i < this.game.entities.length; i ++){
        entity = this.game.entities[i];
        if (entity === this) {
            continue;
        }

        if (entity.boundingbox == null) {
            continue;
        }
        this.boundingbox = this.boundingbox1;
        //console.log('HERE ' + (this.boundingbox.collide(entity.boundingbox)) + " & "  + entity.type + " - " + this.type );
        if (this.boundingbox.rangeCheck(entity.boundingbox, 100) && entity.type !== this.type) {
            this.game.defense = true;
        }


        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {
            //console.log('Colliding ' + entity.type);
            if(entity.attack_animation.animationComplete()){
                this.hp -= 10;
            }
            this.game.defense = true;
            break;
        }
        this.boundingbox = this.boundingbox2;
        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {
            //console.log('Colliding ' + entity.type);
            if(entity.attack_animation.animationComplete()){
                this.hp -= 10;
            }
            this.game.defense = true;
            break;
        }
        this.boundingbox = this.boundingbox3;
        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {
            //console.log('Colliding ' + entity.type);
            if(entity.attack_animation.animationComplete()){
                this.hp -= 10;
            }
            this.game.defense = true;
            break;
        }
        this.game.defense = false;
    }
    this.hpbar = 296 - (1 - (this.hp/1000))*296;
    if(this.hpbar < 0){
        this.hpbar = 0;
    }
    if(this.hp < 500 && this.hp > 250){
        this.full = false;
        this.half = true;
    }
    else if(this.hp <= 250){
        this.half = false;
        this.quarter = true;
    }
}

RedHP.prototype.draw = function () {
    if (this.full){
        this.ctx.fillStyle = "rgb(58, 174, 89)";
    } 
    else if (this.half){
        this.ctx.fillStyle = "rgb(255, 174, 66)";
    } 
    else if (this.quarter){
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
    }
    //bounding box test
    
    this.ctx.fillRect(288, 137, this.hpbar, 34);
    this.ctx.strokeStyle = "red";
    //this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    this.ctx.strokeRect(this.boundingbox1.x, this.boundingbox1.y, this.boundingbox1.width, this.boundingbox1.height);
    this.ctx.strokeRect(this.boundingbox2.x, this.boundingbox2.y, this.boundingbox2.width, this.boundingbox2.height);
    this.ctx.strokeRect(this.boundingbox3.x, this.boundingbox3.y, this.boundingbox3.width, this.boundingbox3.height);
    Entity.prototype.draw.call(this);
}

function BlueHP(game){
    this.game = game;
    this.ctx = game.ctx;
    this.full = true;
    this.half = false;
    this.quarter = false;
    this.type = "enemy";
    this.name ="bluehp";
    this.hp = 1000;
    this.hpbar = 296;
    this.boundingbox = new BoundingBox(1140, 403, 1, 65);
    this.boundingbox1 = new BoundingBox(1140 , 403, 1, 65);
    this.boundingbox2 = new BoundingBox(1160, 480, 1, 65);
    this.boundingbox3 = new BoundingBox(1200, 550, 1, 65);
    this.x = 865;

}

BlueHP.prototype = new Entity();
BlueHP.prototype.constructor = BlueHP;

BlueHP.prototype.update = function () {
    var entity;
    for(var i = 0; i < this.game.entities.length; i ++){
        entity = this.game.entities[i];
        if (entity === this) {
            continue;
        }

        if (entity.boundingbox == null) {
            continue;
        }
        this.boundingbox = this.boundingbox1;
        //console.log('HERE ' + (this.boundingbox.collide(entity.boundingbox)) + " & "  + entity.type + " - " + this.type );
        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {
            //console.log('Colliding ' + entity.type);
            if (entity.name === "Fireball"){
                //debugger
                this.hp -= FIREBALL_DAMAGE;
            } else if (entity.name === "Arrow") {
                this.hp -= ARROW_DAMAGE;
            } else if (entity.name !== "Fireball" && entity.attackAnimation.animationComplete()) {
                this.hp -= 10;
            }
            break;
        }
        this.boundingbox = this.boundingbox2;
        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {
            if (entity.name === "Fireball"){
                //debugger
                this.hp -= FIREBALL_DAMAGE;
            } else if (entity.name === "Arrow") {
                this.hp -= ARROW_DAMAGE;
            } else if(entity.name !== "Fireball" && entity.attackAnimation.animationComplete()){
                this.hp -= 10;
            }
            break;
        }
        this.boundingbox = this.boundingbox3;
        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {
            if (entity.name === "Fireball"){
                //debugger
                this.hp -= FIREBALL_DAMAGE;
            } else if (entity.name === "Arrow") {
                this.hp -= ARROW_DAMAGE;
            } else if(entity.name !== "Fireball" && entity.attackAnimation.animationComplete()){
                this.hp -= 10;
            }
            break;
        }
    }
    this.hpbar = 296 - (1 - (this.hp/1000))*296;
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
    Entity.prototype.update.call(this);   
}

BlueHP.prototype.draw = function () {
   // console.log("draw1" + this.hpbar);
    if (this.full){
        this.ctx.fillStyle = "rgb(58, 174, 89)";
    } 
    else if (this.half){
        this.ctx.fillStyle = "rgb(255, 174, 66)";
    } 
    else if (this.quarter){
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
    }
    //console.log("draw" + this.hpbar);
    this.ctx.fillRect(856, 137, this.hpbar, 34);
    this.ctx.strokeStyle = "red";
    //this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    this.ctx.strokeRect(this.boundingbox1.x, this.boundingbox1.y, this.boundingbox1.width, this.boundingbox1.height);
    this.ctx.strokeRect(this.boundingbox2.x, this.boundingbox2.y, this.boundingbox2.width, this.boundingbox2.height);
    this.ctx.strokeRect(this.boundingbox3.x, this.boundingbox3.y, this.boundingbox3.width, this.boundingbox3.height);
    // this.ctx.fillRect(856, 137, this.hpbar, 34);
    Entity.prototype.draw.call(this);
}


function SuperBar(game){
    this.game = game;
    this.ctx = game.ctx;
    this.timemeter = 0;
    this.maxelixir = 338;
    this.speed = 25;
    this.unitName = null;
    this.shadow = false;
    this.type = "hero";
    Entity.call(this, game, 0, 0);
}

SuperBar.prototype = new Entity();
SuperBar.prototype.constructor = SuperBar;

SuperBar.prototype.update = function () {  
    this.x += this.game.clockTick * this.speed;
    if (this.game.menu.clicked && this.game.menu.id === "Fireball" && this.timemeter >= this.maxelixir) {
        this.unitName = "Fireball";
        this.shadow = true;
    } 
    if (this.unitName != null && this.game.lane !== 0) {
        //debugger;
        var laneY;
        if (this.game.lane === 1) {
            laneY = 385;
        } else if (this.game.lane === 2) {
            laneY = 468
        } else if (this.game.lane === 3) {
            laneY = 551;
        }
        if (laneY && this.unitName === "Fireball") {
            this.game.addEntity(new Fireball(this.game, AM.getAsset("./img/Fireball/Fireball.png"), 305, laneY));
            if(this.timemeter > this.maxelixir - 2){
                this.timemeter = 0;
            }
            this.unitName = null;
            this.game.lane = null;
            is_enemy_spawn_2 = true;
        } 
    }
    if (this.timemeter < this.maxelixir){
        this.timemeter += this.game.clockTick * this.speed;
    }

    Entity.prototype.update.call(this);
}

SuperBar.prototype.draw = function () {
    //debugger;
    if (this.timemeter < this.maxelixir){  
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
        this.ctx.fillRect(904, 647, 106, 101);
        this.ctx.restore();
    }
    if (this.unitName === "Fireball" && this.shadow){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.drawImage(AM.getAsset("./img/Fireball/Fireball_icon.png"), this.game.mouseXY.x - 50, this.game.mouseXY.y - 50, 85.5, 80);
        this.ctx.restore();
    } 
    this.ctx.fillStyle = "rgb(220, 0, 0)";
    this.ctx.fillRect(1052, 687, this.timemeter, 34);

    // hover lane 1
    if (this.unitName != null && this.shadow && this.game.mouseXY != null && (this.game.mouseXY.x >= 305 && this.game.mouseXY.x <= 1135) && (this.game.mouseXY.y >=  410 && this.game.mouseXY.y <= 482)){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
        this.ctx.fillRect(315, 410, 405, 72);
        this.ctx.restore();
    }

    // hover lane 2
    if (this.unitName != null && this.shadow && this.game.mouseXY != null && (this.game.mouseXY.x >= 305 && this.game.mouseXY.x <= 1135) && (this.game.mouseXY.y >=  484 && this.game.mouseXY.y <= 556)){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
        this.ctx.fillRect(315, 484, 405, 72);
        this.ctx.restore();
    }

    // hover lane 3
    if (this.unitName != null && this.shadow && this.game.mouseXY != null && (this.game.mouseXY.x >= 305 && this.game.mouseXY.x <= 1135) && (this.game.mouseXY.y >=  558 && this.game.mouseXY.y <= 630)){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
        this.ctx.fillRect(315, 558, 405, 72);
        this.ctx.restore();
    }
    Entity.prototype.draw.call(this);
}


AM.queueDownload("./img/Fireball/Fireball.png");
AM.queueDownload("./img/Fireball/Fireball_icon.png");
AM.queueDownload("./img/Knight/Knight_icon.png");
AM.queueDownload("./img/Samurai/Samurai_icon.png");
AM.queueDownload("./img/Goblin/Goblin_icon.png");
AM.queueDownload("./img/Bandit/Bandit_icon.png");
AM.queueDownload("./img/Archer/Archer_icon.png");
AM.queueDownload("./img/Archer/Archer_Full_Walk.png");
AM.queueDownload("./img/Archer/Arrow.png");
AM.queueDownload("./img/Knight/Knight.png");
AM.queueDownload("./img/Samurai/Samurai.png");
AM.queueDownload("./img/Goblin/Goblin.png");
AM.queueDownload("./img/Bandit/Bandit.png");
AM.queueDownload("./img/Archer/Archer.png");

AM.queueDownload("./img/enemy_team/orc/orc.png");
AM.queueDownload("./img/enemy_team/reaper_chibbi/reaper.png");
AM.queueDownload("./img/enemy_team/fallen_angel/fallen_angel.png");

AM.queueDownload("./img/Background/Start.png");
AM.queueDownload("./img/Background/Tutorial.png");
AM.queueDownload("./img/Background/Map 1/NoDamage.png");
AM.queueDownload("./img/Background/Map 2/NoDamage.png");
AM.queueDownload("./img/Background/Map 3/NoDamage.png");

AM.queueDownload("./img/Background/Map 1/DoubleDamage.png");
AM.queueDownload("./img/Background/Map 2/DoubleDamage.png");
AM.queueDownload("./img/Background/Map 3/DoubleDamage.png");

AM.queueDownload("./img/Background/Map 1/LeftDamage.png");
AM.queueDownload("./img/Background/Map 2/LeftDamage.png");
AM.queueDownload("./img/Background/Map 3/LeftDamage.png");

AM.queueDownload("./img/Background/Map 1/RightDamage.png");
AM.queueDownload("./img/Background/Map 2/RightDamage.png");
AM.queueDownload("./img/Background/Map 3/RightDamage.png");

AM.queueDownload("./img/Background/EasyText.png");
AM.queueDownload("./img/Background/MediumText.png");
AM.queueDownload("./img/Background/HardText.png");
AM.queueDownload("./img/Background/TutorialText.png");
AM.queueDownload("./img/Background/SoundText.png");
AM.queueDownload("./img/Background/BackText.png");

AM.queueDownload("./img/Background/GameOver.png");
AM.queueDownload("./img/Background/PlayAgain.png");

AM.queueDownload("./img/Background/Flag1.png");
AM.queueDownload("./img/Background/Flag2.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Background/Start.png")));
    console.log("All Done!");
});
