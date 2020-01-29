var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.start = true;
    this.startBackground = AM.getAsset("./img/Background/Start.png");
    this.level1 = AM.getAsset("./img/Background/Map 1/NoDamage.png");
    this.level2 =  AM.getAsset("./img/Background/Map 2/NoDamage.png");
    this.level3 =  AM.getAsset("./img/Background/Map 3/NoDamage.png");
    this.tutorial = AM.getAsset("./img/Background/Tutorial.png");
};

Background.prototype.draw = function () {
    if(this.game.menu.clicked && this.game.menu.id === "easy") {
        this.spritesheet = this.level1;
        this.start = false;
    } else if(this.game.menu.clicked && this.game.menu.id === "medium") {
        this.spritesheet = this.level2;
        this.start = false;
    } else if(this.game.menu.clicked && this.game.menu.id === "hard") {
        this.spritesheet = this.level3;
        this.start = false;
    } else if(this.game.menu.clicked && this.game.menu.id === "tutorial") {
        this.spritesheet = this.tutorial;
        this.start = false;
    } else if(this.game.menu.clicked && this.game.menu.id === "back") {
        this.start = true;
        this.game.reset();
    } 
    if (this.start) {
        this.spritesheet = this.startBackground;
        this.start = true;
    }
    this.ctx.drawImage(this.spritesheet,this.x, this.y);
};

Background.prototype.update = function () {
};

function MushroomDude(game, spritesheet) {
    this.animation = new Animation(spritesheet, 189, 230, 5, 0.10, 14, true, 1);
    this.x = 0;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

MushroomDude.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

MushroomDude.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
}


// inheritance 
function Cheetah(game, spritesheet) {
    this.animation = new Animation(spritesheet, 512, 256, 2, 0.05, 8, true, 0.5);
    this.speed = 350;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 250);
}

Cheetah.prototype = new Entity();
Cheetah.prototype.constructor = Cheetah;

Cheetah.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

Cheetah.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance 
function Fireball(game, spritesheet, X, Y) {
    this.animation = new Animation(spritesheet, 160, 160, 5, 0.15, 12, true, 0.5);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, X, Y);
}

Fireball.prototype = new Entity();
Fireball.prototype.constructor = Fireball;

Fireball.prototype.update = function () {
    if (this.x < 1135){
        this.x += this.game.clockTick * this.speed;
        Entity.prototype.update.call(this);
    } 
}

Fireball.prototype.draw = function () {
    if (this.x < 1135){
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        Entity.prototype.draw.call(this);
    }
}

function UnitsControl (game){
    this.game = game;
    this.unitName = null;
    this.lane = null;
    this.ctx = game.ctx;
    this.shadow = false;
}

UnitsControl.prototype = new Entity();
UnitsControl.prototype.constructor = UnitsControl;

UnitsControl.prototype.update = function () {
    
}

UnitsControl.prototype.draw = function () {
    if(this.game.menu.clicked && this.game.menu.id === "Fireball") {
        this.unitName = "Fireball";
        this.shadow = true;
    } 
    if (this.unitName === "Fireball" && this.shadow && this.game.mouse){
        this.ctx.globalAlpha = 0.5;
        //console.log(this.game.mouse.x);
        this.ctx.drawImage(AM.getAsset("./img/Fireball_icon.png"), this.game.mouse.x - 50, this.game.mouse.y - 50, 85.5, 80);
    }
    if (this.game.lane != null){
        this.lane = this.game.lane;
    }
    if (this.unitName != null && this.lane != null){
        if (this.unitName === "Fireball" && this.lane === 1){
            this.game.addEntity(new Fireball(this.game, AM.getAsset("./img/Fireball.png"), 305, 385));
            this.unitName = null;
            this.lane = null;
        } else if (this.unitName === "Fireball" && this.lane === 2){
            this.game.addEntity(new Fireball(this.game, AM.getAsset("./img/Fireball.png"), 305, 468));
            this.unitName = null;
            this.lane = null;
        } else if (this.unitName === "Fireball" && this.lane === 3){
            this.game.addEntity(new Fireball(this.game, AM.getAsset("./img/Fireball.png"), 305, 551));
            this.unitName = null;
            this.lane = null;
        }
    }
}




//AM.queueDownload("./img/RobotUnicorn.png");
//AM.queueDownload("./img/mushroomdude.png");
//AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/Fireball.png");
AM.queueDownload("./img/Fireball_icon.png");
AM.queueDownload("./img/Background/Start.png");
AM.queueDownload("./img/Background/Tutorial.png");
AM.queueDownload("./img/Background/Map 1/NoDamage.png");
AM.queueDownload("./img/Background/Map 2/NoDamage.png");
AM.queueDownload("./img/Background/Map 3/NoDamage.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Background/Start.png")));
    gameEngine.addEntity(new UnitsControl(gameEngine));
    //gameEngine.addEntity(new Fireball(gameEngine, AM.getAsset("./img/Fireball.png")));
    //gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Background/Map 1/NoDamage.png")));
    //gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/mushroomdude.png")));
    //gameEngine.addEntity(new Cheetah(gameEngine, AM.getAsset("./img/runningcat.png")));


    console.log("All Done!");
});
