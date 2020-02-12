/**
*
*This function that changes the background.
*/

function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.type = "background";
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.one = 0;
    this.backgroundstart = AM.getAsset("./img/Background/Start.png");
    this.level = 0;
    this.gameover = false;
    this.tutorial = AM.getAsset("./img/Background/Tutorial.png");
    //Entity.call(this, game, 0, 0);
};
//Background.prototype = new Entity();
//Background.prototype.constructor = Background;

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,this.x, this.y);
    if (START && this.game.mouseXY != null && (this.game.mouseXY.x >= 610 && this.game.mouseXY.x <= 765) && (this.game.mouseXY.y >= 502 && this.game.mouseXY.y <= 555)) {
        //debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/EasyText.png"), 584, 481, 200, 100);
    }
    if (START && this.game.mouseXY != null && (this.game.mouseXY.x >= 602 && this.game.mouseXY.x <= 863) && (this.game.mouseXY.y >= 579 && this.game.mouseXY.y <= 629)) {
        //debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/MediumText.png"), 583, 551, 300, 100);
    }
    if (START && this.game.mouseXY != null && (this.game.mouseXY.x >= 603 && this.game.mouseXY.x <= 777) && (this.game.mouseXY.y >= 649 && this.game.mouseXY.y <= 699)) {
        //debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/HardText.png"), 591, 620, 200, 100);
    }
    if (START && this.game.mouseXY != null && (this.game.mouseXY.x >= 614 && this.game.mouseXY.x <= 881) && (this.game.mouseXY.y >= 711 && this.game.mouseXY.y <= 771)) {
        //debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/TutorialText.png"), 601, 690, 300, 100);
    }
    if (this.game.mouseXY != null && (this.game.mouseXY.x >= 1280 && this.game.mouseXY.x <= 1406) && (this.game.mouseXY.y >= 751 && this.game.mouseXY.y <= 780)) {
        //debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/SoundText.png"), 1272, 739, 140, 50);
    } 
    if (!START && this.game.mouseXY != null && (this.game.mouseXY.x >= 20 && this.game.mouseXY.x <= 182) && (this.game.mouseXY.y >=  12 && this.game.mouseXY.y <= 64)) {
        //debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/BackText.png"), 18, 1, 180, 80);
    }  
    if (GAME_OVER){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
        this.ctx.fillRect(0, 0, 1440, 810);
        this.ctx.restore();
        this.ctx.drawImage(AM.getAsset("./img/Background/GameOver.png"), 200, 250);
        this.ctx.drawImage(AM.getAsset("./img/Background/PlayAgain.png"), 480, 500);
    }
    // this.one++;
    // if (!START && this.one % 15 === 0){
    //     this.ctx.drawImage(AM.getAsset("./img/Background/Flag1.png"), 0, 0);
    // } else if (!START && this.one % 15 !== 0) {
    //     this.ctx.drawImage(AM.getAsset("./img/Background/Flag2.png"), 0, 0);
    // }
    //Entity.prototype.draw.call(this);
};

Background.prototype.update = function () {

    if(this.game.menu.clicked && this.game.menu.id === "easy") {
        this.level = 1;
        this.spritesheet = AM.getAsset("./img/Background/Map 1/NoDamage.png");
    } else if(this.game.menu.clicked && this.game.menu.id === "medium") {
        this.level = 2;
        this.spritesheet = AM.getAsset("./img/Background/Map 2/NoDamage.png");
    } else if(this.game.menu.clicked && this.game.menu.id === "hard") {
        this.level = 3;
        this.spritesheet = AM.getAsset("./img/Background/Map 3/NoDamage.png");
    } else if(this.game.menu.clicked && this.game.menu.id === "tutorial") {
        this.level = 0;
        this.spritesheet = this.tutorial;
        START = false;
    } else if(this.game.menu.clicked && this.game.menu.id === "back") {
        this.level = 0;
        START = true;
        var len = this.game.entities.length;
        for (var i = 1; i < len; i ++){
            this.game.entities[i].removeFromWorld = true;
        }
        console.log("clicked back");
    } 

    if (this.level !== 0 && START){
        this.game.addEntity(new RedHP(this.game));
        this.game.addEntity(new BlueHP(this.game));
        this.game.addEntity(new SuperBar(this.game));
        this.game.addEntity(new UnitsControl(this.game));
        //  this.game.addEntity(new EnemyControl(this.game));
        START = false;
    }
    if (GAME_OVER && this.game.menu.clicked && this.game.menu.id === "PlayAgain"){
        if (this.level === 1){
            this.spritesheet = AM.getAsset("./img/Background/Map 1/NoDamage.png");
        } else if(this.level === 2){
            this.spritesheet = AM.getAsset("./img/Background/Map 2/NoDamage.png");
        } else if(this.level === 3){
            this.spritesheet = AM.getAsset("./img/Background/Map 3/NoDamage.png");
        }
        this.game.addEntity(new RedHP(this.game));
        this.game.addEntity(new BlueHP(this.game));
        this.game.addEntity(new SuperBar(this.game));
        this.game.addEntity(new UnitsControl(this.game));
        GAME_OVER = false;
    }
    if (this.level !== 0){
        var len = this.game.entities.length;
        var temp = 0; 
        for (var i = 0; i < len; i ++){
            var entity = this.game.entities[i];
            if (entity === this) continue;
            if(entity.name === "redhp"){
                if (entity.half || entity.quarter){
                    if (this.level === 1) this.spritesheet = AM.getAsset("./img/Background/Map 1/LeftDamage.png");
                    else if(this.level === 2) this.spritesheet = AM.getAsset("./img/Background/Map 2/LeftDamage.png");
                    else if(this.level === 3) this.spritesheet = AM.getAsset("./img/Background/Map 3/LeftDamage.png");
                    temp++;
                } 
                if(entity.hpbar <= 0){
                    var len = this.game.entities.length;
                    for (var i = 1; i < len; i ++){
                        this.game.entities[i].removeFromWorld = true;
                    }
                    GAME_OVER = true;
                }
            }
            if(entity.name === "bluehp"){
               if (entity.half || entity.quarter){
                    temp++;
                    if (this.level === 1) this.spritesheet = AM.getAsset("./img/Background/Map 1/RightDamage.png");
                    else if(this.level === 2) this.spritesheet = AM.getAsset("./img/Background/Map 2/RightDamage.png");
                    else if(this.level === 3) this.spritesheet = AM.getAsset("./img/Background/Map 3/RightDamage.png");
                } 
                if(entity.hpbar <= 0){
                    var len = this.game.entities.length;
                    for (var i = 1; i < len; i ++){
                        this.game.entities[i].removeFromWorld = true;
                    }
                    GAME_OVER = true;
                }
            }
            if (temp === 2){
                if (this.level === 1) this.spritesheet = AM.getAsset("./img/Background/Map 1/DoubleDamage.png");
                else if(this.level === 2) this.spritesheet = AM.getAsset("./img/Background/Map 2/DoubleDamage.png");
                else if(this.level === 3) this.spritesheet = AM.getAsset("./img/Background/Map 3/DoubleDamage.png");
            } 
        }
    }

    if (START) {
        this.spritesheet = this.backgroundstart;
        START = true;
    }

    //Entity.prototype.update.call(this);
};