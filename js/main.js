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

// function EnemyControl (game){
//     this.game = game;
//     this.ctx = game.ctx;
//     this.toggle = false;
// }

// EnemyControl.prototype = new Entity();
// EnemyControl.prototype.constructor = EnemyControl;

// EnemyControl.prototype.update = function () {
    
// }
// EnemyControl.prototype.draw = function () {
//     // if (is_enemy_spawn_1) {
//     //     this.game.addEntity(new ReaperMan(this.game, 1000, 385));
//     //     this.game.addEntity(new FallenAngel(this.game, 980, 468));
//     //     this.game.addEntity(new ReaperMan(this.game, 1000, 551));
//     //     is_enemy_spawn_1 = false;
//     // }
//     // if (is_enemy_spawn_2) {
//     //     this.game.addEntity(new Orc(this.game, 1000, 385));
//     //     this.game.addEntity(new FallenAngel(this.game, 980, 468));
//     //     this.game.addEntity(new ReaperMan(this.game, 1000, 551));
//     //     is_enemy_spawn_2 = false;
//     // }
// }

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
    this.boundingbox = new BoundingBox(280, 400, 1, 65);
    this.boundingbox1 = new BoundingBox(280, 400, 1, 65);
    this.boundingbox2 = new BoundingBox(280, 470, 1, 65);
    this.boundingbox3 = new BoundingBox(280, 550, 1, 65);
    this.x = 288;
  
}

RedHP.prototype = new Entity();
RedHP.prototype.constructor = RedHP;

RedHP.prototype.update = function () {
    console.log(this.hp);
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
        if (entity.type !== this.type) {
            if (this.boundingbox1.collide(entity.boundingbox)){
                if(entity.attack_animation.animationComplete()){
                    this.hp -= 10;
                }
            } 
            else if (this.boundingbox2.collide(entity.boundingbox)){
                if(entity.attack_animation.animationComplete()){
                    this.hp -= 10;
                }
            }
            else if (this.boundingbox3.collide(entity.boundingbox)){
                if(entity.attack_animation.animationComplete()){
                    this.hp -= 10;
                }
            }
            break;
        }
    }
    this.hpbar = 296 - (1 - (this.hp/1000))*296;
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
    this.ctx.strokeRect(this.boundingbox1.x, this.boundingbox1.y, this.boundingbox1.width, this.boundingbox1.height);
    //this.ctx.strokeRect(this.boundingbox1.x, this.boundingbox1.y, this.boundingbox1.width, this.boundingbox1.height);
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

}

BlueHP.prototype = new Entity();
BlueHP.prototype.constructor = BlueHP;

BlueHP.prototype.update = function () {
    
}

BlueHP.prototype.draw = function () {
    if (this.full){
        this.ctx.fillStyle = "rgb(58, 174, 89)";
    } 
    if (this.quarter){
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
    }
    this.ctx.fillRect(856, 137, 296, 34);
}

// function ElixirBar(game){
//     this.game = game;
//     this.ctx = game.ctx;
//     this.timemeter = 0;
//     this.maxelixir = 338;
//     this.speed = 1;
// }

function ElixirBar(game){
    this.game = game;
    this.ctx = game.ctx;
    this.timemeter = 0;
    this.maxelixir = 338;
    this.speed = 50;
    this.oneElixir = 338/10;
    Entity.call(this, game, 0, 0);
}

ElixirBar.prototype = new Entity();
ElixirBar.prototype.constructor = ElixirBar;

ElixirBar.prototype.update = function () {
    if (this.x < this.maxelixir){
        this.x += this.game.clockTick * this.speed;
    }
    if (this.game.menu.clicked && this.game.menu.id === "Knight") {
        if (this.x - this.oneElixir*4 < 0){
            this.x = 43
        } else {
            this.x = this.x - this.oneElixir*4;
        }
    } else if (this.game.menu.clicked && this.game.menu.id === "Bandit") {
        if (this.x - this.oneElixir*3 < 0){
            this.x = 43
        } else {
            this.x = this.x - this.oneElixir*3;
        }
    } else if (this.game.menu.clicked && this.game.menu.id === "Samurai") {
        if (this.x - this.oneElixir*3 < 0){
            this.x = 43
        } else {
            this.x = this.x - this.oneElixir*3;
        }
    } else if (this.game.menu.clicked && this.game.menu.id === "Goblin") {
        if (this.x - this.oneElixir*2 < 0){
            this.x = 43
        } else {
            this.x = this.x - this.oneElixir*2;
        }
    }
    Entity.prototype.update.call(this);
}

ElixirBar.prototype.draw = function () {

    this.ctx.fillStyle = "rgb(255, 0, 89)";
    this.ctx.fillRect(43, 687, this.x, 34);
    Entity.prototype.draw.call(this);
}

function SuperBar(game){
    this.game = game;
    this.ctx = game.ctx;
    this.timemeter = 0;
    this.maxelixir = 338;
    this.speed = 25;
    Entity.call(this, game, 0, 0);
}

SuperBar.prototype = new Entity();
SuperBar.prototype.constructor = SuperBar;

SuperBar.prototype.update = function () {   
    if (this.x < this.maxelixir){
        this.x += this.game.clockTick * this.speed;
    }
    if (this.game.menu.clicked && this.game.menu.id === "Fireball") {
        if(this.x > this.maxelixir - 2){
            this.x = 0;
        }
    }
    Entity.prototype.update.call(this);
}

SuperBar.prototype.draw = function () {
    this.ctx.fillStyle = "rgb(220, 0, 0)";
    this.ctx.fillRect(1052, 687, this.x, 34);
    Entity.prototype.draw.call(this);
}


AM.queueDownload("./img/Fireball/Fireball.png");
AM.queueDownload("./img/Fireball/Fireball_icon.png");
AM.queueDownload("./img/Knight/Knight_icon.png");
AM.queueDownload("./img/Samurai/Samurai_icon.png");
AM.queueDownload("./img/Goblin/Goblin_icon.png");
AM.queueDownload("./img/Bandit/Bandit_icon.png");
AM.queueDownload("./img/Knight/Knight.png");
AM.queueDownload("./img/Samurai/Samurai.png");
AM.queueDownload("./img/Goblin/Goblin.png");
AM.queueDownload("./img/Bandit/Bandit.png");

AM.queueDownload("./img/enemy_team/reaper_chibbi/reaper_walk.png");
AM.queueDownload("./img/enemy_team/reaper_chibbi/reaper_actions1.png");
AM.queueDownload("./img/enemy_team/reaper_chibbi/reaper_attack.png");
AM.queueDownload("./img/enemy_team/orc/orc_walk.png");
AM.queueDownload("./img/enemy_team/orc/orc_actions1.png");
AM.queueDownload("./img/enemy_team/orc/orc_attack.png");
AM.queueDownload("./img/enemy_team/fallen_angel/fallen_walk.png");
AM.queueDownload("./img/enemy_team/fallen_angel/fallen_actions1.png");
AM.queueDownload("./img/enemy_team/fallen_angel/fallen_attack.png");

AM.queueDownload("./img/Background/Start.png");
AM.queueDownload("./img/Background/Tutorial.png");
AM.queueDownload("./img/Background/Map 1/NoDamage.png");
AM.queueDownload("./img/Background/Map 2/NoDamage.png");
AM.queueDownload("./img/Background/Map 3/NoDamage.png");
AM.queueDownload("./img/Background/EasyText.png");
AM.queueDownload("./img/Background/MediumText.png");
AM.queueDownload("./img/Background/HardText.png");
AM.queueDownload("./img/Background/TutorialText.png");
AM.queueDownload("./img/Background/SoundText.png");
AM.queueDownload("./img/Background/BackText.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Background/Start.png")));
    console.log("All Done!");
});
