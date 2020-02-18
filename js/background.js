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
    this.damage = "noDamage";
    this.level = 0;
    this.up = true;
    this.playMusic = true;
    this.backgroundstart = AM.getAsset("./img/Background/Start.png");
    this.startmusic =  AM.getMusic("./img/music/start.mp3");

    // this.firework_animation = new MyAnimation(AM.getAsset("./img/Others/Firework.png"), 0, 0, 255, 250, 0.07, 28, false, true);
    //Entity.call(this, game, 0, 0);
    this.startmusic.play();
};
//Background.prototype = new Entity();
//Background.prototype.constructor = Background;

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,this.x, this.y);
    if (START && this.game.mouseXY != null && (this.game.mouseXY.x >= 610 && this.game.mouseXY.x <= 765) && (this.game.mouseXY.y >= 502 && this.game.mouseXY.y <= 555)) {
        this.ctx.drawImage(AM.getAsset("./img/Background/EasyText.png"), 584, 481, 200, 100);
    }
    if (START && this.game.mouseXY != null && (this.game.mouseXY.x >= 602 && this.game.mouseXY.x <= 863) && (this.game.mouseXY.y >= 579 && this.game.mouseXY.y <= 629)) {
        this.ctx.drawImage(AM.getAsset("./img/Background/MediumText.png"), 583, 551, 300, 100);
    }
    if (START && this.game.mouseXY != null && (this.game.mouseXY.x >= 603 && this.game.mouseXY.x <= 777) && (this.game.mouseXY.y >= 649 && this.game.mouseXY.y <= 699)) {
        this.ctx.drawImage(AM.getAsset("./img/Background/HardText.png"), 591, 620, 200, 100);
    }
    if (START && this.game.mouseXY != null && (this.game.mouseXY.x >= 614 && this.game.mouseXY.x <= 881) && (this.game.mouseXY.y >= 711 && this.game.mouseXY.y <= 771)) {
        this.ctx.drawImage(AM.getAsset("./img/Background/TutorialText.png"), 601, 690, 300, 100);
    }
    if (this.game.mouseXY != null && (this.game.mouseXY.x >= 1280 && this.game.mouseXY.x <= 1406) && (this.game.mouseXY.y >= 751 && this.game.mouseXY.y <= 780)) {
        this.ctx.drawImage(AM.getAsset("./img/Background/SoundText.png"), 1272, 739, 140, 50);
    } 
    if (!START && this.game.mouseXY != null && (this.game.mouseXY.x >= 20 && this.game.mouseXY.x <= 182) && (this.game.mouseXY.y >=  12 && this.game.mouseXY.y <= 64)) {
        this.ctx.drawImage(AM.getAsset("./img/Background/BackText.png"), 18, 1, 180, 80);
    }  
    if (START && this.one < 10 && this.one > 1) {
        this.ctx.drawImage(AM.getAsset("./img/Background/StartLights3.png"), 0, 0);
    }
    if (START && this.one < 20 && this.one > 9){
        this.ctx.drawImage(AM.getAsset("./img/Background/StartLights4.png"), 0, 0);
    } 
    if (START && this.one < 30 && this.one > 19) {
        this.ctx.drawImage(AM.getAsset("./img/Background/StartLights5.png"), 0, 0);
    }
    if (START && this.one < 40 && this.one > 29) {
        this.ctx.drawImage(AM.getAsset("./img/Background/StartLights6.png"), 0, 0);
    }
    // no damage lights
    if (this.damage === "noDamage" && !START && this.one < 10 && this.one > 1) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsNoDamage1.png"), 0, 0);
    }
    if (this.damage === "noDamage" && !START && this.one < 20 && this.one > 9){
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsNoDamage2.png"), 0, 0);
    } 
    if (this.damage === "noDamage" && !START && this.one < 30 && this.one > 19) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsNoDamage3.png"), 0, 0);
    }
    if (this.damage === "noDamage" && !START && this.one < 40 && this.one > 29) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsNoDamage4.png"), 0, 0);
    }

    // left damage lights
    if (this.damage === "leftDamage" && !START && this.one < 10 && this.one > 1) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsLeftDamage1.png"), 0, 0);
    }
    if (this.damage === "leftDamage" && !START && this.one < 20 && this.one > 9){
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsLeftDamage2.png"), 0, 0);
    } 
    if (this.damage === "leftDamage" && !START && this.one < 30 && this.one > 19) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsLeftDamage3.png"), 0, 0);
    } 
    if (this.damage === "leftDamage" && !START && this.one < 40 && this.one > 29) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsLeftDamage4.png"), 0, 0);
    }


    // right damage lights
    if (this.damage === "rightDamage" && !START && this.one < 10 && this.one > 1) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsRightDamage1.png"), 0, 0);
    }
    if (this.damage === "rightDamage" && !START && this.one < 20 && this.one > 9){
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsRightDamage2.png"), 0, 0);
    } 
    if (this.damage === "rightDamage" && !START && this.one < 30 && this.one > 19) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsRightDamage3.png"), 0, 0);
    }
    if (this.damage === "rightDamage" && !START && this.one < 40 && this.one > 29) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsRightDamage4.png"), 0, 0);
    }

    // double damage lights
    if (this.damage === "doubleDamage" && !START && this.one < 10 && this.one > 1) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsDoubleDamage1.png"), 0, 0);
    }
    if (this.damage === "doubleDamage" && !START && this.one < 20 && this.one > 9){
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsDoubleDamage2.png"), 0, 0);
    } 
    if (this.damage === "doubleDamage" && !START && this.one < 30 && this.one > 19) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsDoubleDamage3.png"), 0, 0);
    }
    if (this.damage === "doubleDamage" && !START && this.one < 40 && this.one > 29) {
        this.ctx.drawImage(AM.getAsset("./img/Background/LightsDoubleDamage4.png"), 0, 0);
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
    if (WIN_LEVEL){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
        this.ctx.fillRect(0, 0, 1440, 810);
        this.ctx.restore();
        this.ctx.drawImage(AM.getAsset("./img/Background/Victory1.png"), 450, 270);
        this.ctx.drawImage(AM.getAsset("./img/Background/NextLevel.png"), 500, 450);
    }
    if (WIN_GAME){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
        this.ctx.fillRect(0, 0, 1440, 810);
        this.ctx.restore();
        // this.firework_animation.drawFrame(this.game.clockTick, this.ctx, 300, 150, 3.5);
        this.ctx.drawImage(AM.getAsset("./img/Background/Victory1.png"), 450, 270);
        this.ctx.drawImage(AM.getAsset("./img/Background/PlayAgain.png"), 480, 500);
    }
    if (WIN_LEVEL && this.game.mouseXY != null && (this.game.mouseXY.x >= 490 && this.game.mouseXY.x <= 920) && (this.game.mouseXY.y >=  460 && this.game.mouseXY.y <= 530)) {
        //debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/NextLevel1.png"), 500, 450);
    }  
    if (GAME_OVER && this.game.mouseXY != null && (this.game.mouseXY.x >= 480 && this.game.mouseXY.x <= 890) && (this.game.mouseXY.y >=  510 && this.game.mouseXY.y <= 580)) {
        debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/PlayAgain1.png"), 480, 500);
    }  
    Entity.prototype.draw.call(this);
};

Background.prototype.update = function () {
    if (this.up){
        this.one++;
    }
    if (!this.up){
        this.one--;
    }
    if (this.one === 39){
        this.up = false;
    }
    if (this.one === 1){
        this.up = true;
    }
    if(this.game.menu.clicked && this.game.menu.id === "easy") {
        this.level = 1;
        this.spritesheet = AM.getAsset("./img/Background/Map 1/NoDamage.png");
        this.damage = "noDamage";
    } else if(this.game.menu.clicked && this.game.menu.id === "medium") {
        this.level = 2;
        this.spritesheet = AM.getAsset("./img/Background/Map 2/NoDamage.png");
        this.damage = "noDamage";
    } else if(this.game.menu.clicked && this.game.menu.id === "hard") {
        this.level = 3;
        this.spritesheet = AM.getAsset("./img/Background/Map 3/NoDamage.png");
    } else if(this.game.menu.clicked && this.game.menu.id === "tutorial") {
        this.level = 0;
        this.spritesheet = AM.getAsset("./img/Background/Tutorial.png");;
        START = false;
        this.damage = "noDamage";
    } else if(this.game.menu.clicked && this.game.menu.id === "back") {
        this.level = 0;
        START = true;
        GAME_OVER = false;
        WIN_GAME = false;
        WIN_LEVEL = false;
        var len = this.game.entities.length;
        for (var i = 1; i < len; i ++){
            this.game.entities[i].removeFromWorld = true;
        }
        this.damage = "noDamage";
        console.log("clicked back");
    } 
    if (WIN_LEVEL && this.game.menu.clicked && this.game.menu.id === "NextLevel"){
        this.level++;
        if (this.level === 1){
            this.spritesheet = AM.getAsset("./img/Background/Map 1/NoDamage.png");
            this.damage = "noDamage";
        } else if(this.level === 2){
            this.spritesheet = AM.getAsset("./img/Background/Map 2/NoDamage.png");
            this.damage = "noDamage";
        } else if(this.level === 3){
            this.spritesheet = AM.getAsset("./img/Background/Map 3/NoDamage.png");
            this.damage = "noDamage";
        }
        WIN_LEVEL = false;
        this.game.addEntity(new RedHP(this.game));
        this.game.addEntity(new BlueHP(this.game));
        this.game.addEntity(new SuperBar(this.game));
        this.game.addEntity(new UnitsControl(this.game));
    }

    if (this.level !== 0 && START){
        this.game.addEntity(new RedHP(this.game));
        this.game.addEntity(new BlueHP(this.game));
        this.game.addEntity(new SuperBar(this.game));
        this.game.addEntity(new UnitsControl(this.game));
        this.game.addEntity(new EnemyControl(this.game, this.level));
        START = false;
    }
    if ((GAME_OVER || WIN_GAME) && this.game.menu.clicked && this.game.menu.id === "PlayAgain"){
        if (this.level === 1){
            this.spritesheet = AM.getAsset("./img/Background/Map 1/NoDamage.png");
            this.damage = "noDamage";
        } else if(this.level === 2){
            this.spritesheet = AM.getAsset("./img/Background/Map 2/NoDamage.png");
            this.damage = "noDamage";
        } else if(this.level === 3){
            this.spritesheet = AM.getAsset("./img/Background/Map 3/NoDamage.png");
            this.damage = "noDamage";
        }
        this.game.addEntity(new RedHP(this.game));
        this.game.addEntity(new BlueHP(this.game));
        this.game.addEntity(new SuperBar(this.game));
        this.game.addEntity(new UnitsControl(this.game));
        //this.game.addEntity(new EnemyControl(this.game, this.level));
        GAME_OVER = false;
        WIN_GAME = false;
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
                    this.damage = "leftDamage";
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
                    this.damage = "rightDamage";
                } 
                if(entity.hpbar <= 0){
                    var len = this.game.entities.length;
                    for (var i = 1; i < len; i ++){
                        this.game.entities[i].removeFromWorld = true;
                    }
                    if (this.level === 1 || this.level === 2){
                        WIN_LEVEL = true;
                    } else if(this.level === 3){
                        WIN_GAME = true;
                    }
                }
            }
            if (temp === 2){
                if (this.level === 1) this.spritesheet = AM.getAsset("./img/Background/Map 1/DoubleDamage.png");
                else if(this.level === 2) this.spritesheet = AM.getAsset("./img/Background/Map 2/DoubleDamage.png");
                else if(this.level === 3) this.spritesheet = AM.getAsset("./img/Background/Map 3/DoubleDamage.png");
                this.damage = "doubleDamage";
            } 
        }
    }

    if (this.game.menu.clicked && this.game.menu.id === "SoundOnOff") {
        this.playMusic = !this.playMusic;
    }
    if (this.playMusic){
        this.startmusic.play();
    } else if(!this.playMusic){
        this.startmusic.pause();
    }

    if (WIN_GAME && FIRE_ON) {
        this.game.addEntity(new Firework(this.game));
        FIRE_ON = false;
    }

    if (START) {
        this.spritesheet = this.backgroundstart;
        START = true;
    }

    //Entity.prototype.update.call(this);
};
