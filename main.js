var AM = new AssetManager();
var is_enemy_spawn = false;
var count = 0;
// Copy of Animation class from Lecture 5 for player controlled units
class MyAnimation {
    constructor(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
        this.spriteSheet = spriteSheet;
        this.startX = startX;
        this.startY = startY;
        this.frameWidth = frameWidth;
        this.frameDuration = frameDuration;
        this.frameHeight = frameHeight;
        this.frames = frames;
        this.totalTime = frameDuration * frames;
        this.elapsedTime = 0;
        this.loop = loop;
        this.reverse = reverse;
    }

    drawFrame(tick, ctx, x, y, scaleBy) {
        var scaleBy = scaleBy || 1;
        this.elapsedTime += tick;
        if (this.loop) {
            if (this.isDone()) {
                this.elapsedTime = 0;
            }
        } else if (this.isDone()) {
            return;
        }
        var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
        var vindex = 0;
        if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
            index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
            vindex++;
        }
        while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
            index -= Math.floor(this.spriteSheet.width / this.frameWidth);
            vindex++;
        }

        var locX = x;
        var locY = y;
        var offset = vindex === 0 ? this.startX : 0;
        ctx.drawImage(this.spriteSheet,
            index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
            this.frameWidth, this.frameHeight,
            locX, locY,
            this.frameWidth * scaleBy,
            this.frameHeight * scaleBy);

    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    isDone() {
        return (this.elapsedTime >= this.totalTime);

    }

    

    

}


function getLaneEnd(yValue) {
    if (yValue === 385) { // lane 1
        return 1080;
    } else if (yValue === 468) { // lane 2
        return 1109;
    } else if (yValue === 551) { // lane 3
        return 1200;
    }


}

// Player controlled unit bandit
function Bandit(game, spritesheet, X, Y) {
    // scale 0.125
    this.animation = new MyAnimation(spritesheet, 0, 0, 621, 569, 0.4, 8, true, false);
    this.attackAnimation = new MyAnimation(spritesheet, 0, 625, 621, 569, 0.2, 8, true, false);
    this.moving = true;
    this.attacking = false;
    this.speed = 100;
    this.ctx = game.ctx;
    this.laneEnd = getLaneEnd(Y);
    // Entity.call(this, game, 248, 469);
    Entity.call(this, game, X, Y);
}

Bandit.prototype = new Entity();
Bandit.prototype.constructor = Bandit;

Bandit.prototype.update = function () {
    if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        if (this.x > this.laneEnd) {
            this.moving = false;
            this.attacking = true;
        }

    }

    Entity.prototype.update.call(this);
}

Bandit.prototype.draw = function () {
    if (this.moving) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.125);
    } else {
        this.attackAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.125);
    }
    Entity.prototype.draw.call(this);
}

// Player controlled unit bandit
function Knight(game, spritesheet, X, Y) {
    // scale 0.125
    this.animation = new MyAnimation(spritesheet, 0, 0, 550, 598, 0.4, 8, true, false);
    this.attackAnimation = new MyAnimation(spritesheet, 0, 600, 550, 598, 0.2, 8, true, false);
    this.moving = true;
    this.attacking = false;
    this.speed = 100;
    this.ctx = game.ctx;
    this.laneEnd = getLaneEnd(Y);

    // Entity.call(this, game, 248, 469);
    Entity.call(this, game, X, Y);
}

Knight.prototype = new Entity();
Knight.prototype.constructor = Knight;

Knight.prototype.update = function () {
    if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        if (this.x > this.laneEnd + 10) {
            this.moving = false;
            this.attacking = true;
        }

    }

    Entity.prototype.update.call(this);
}

Knight.prototype.draw = function () {
    if (this.moving) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.125);
    } else {
        this.attackAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.125);
    }
    Entity.prototype.draw.call(this);
}

// Player controlled unit bandit
function Samurai(game, spritesheet, X, Y) {
    // scale 0.125
    this.animation = new MyAnimation(spritesheet, 0, 0, 738, 611, 0.4, 8, true, false);
    this.attackAnimation = new MyAnimation(spritesheet, 0, 738, 738, 611, 0.2, 8, true, false);
    this.moving = true;
    this.attacking = false;
    this.speed = 100;
    this.ctx = game.ctx;
    this.laneEnd = getLaneEnd(Y);

    // Entity.call(this, game, 248, 469);
    Entity.call(this, game, X, Y);
}

Samurai.prototype = new Entity();
Samurai.prototype.constructor = Samurai;

Samurai.prototype.update = function () {
    if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        if (this.x > this.laneEnd) {
            this.moving = false;
            this.attacking = true;
        }

    }

    Entity.prototype.update.call(this);
}

Samurai.prototype.draw = function () {
    if (this.moving) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.125);
    } else {
        this.attackAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.125);
    }
    Entity.prototype.draw.call(this);
}

// Player controlled unit goblin
function Goblin(game, spritesheet, X, Y) {
    // scale 0.125
    this.animation = new MyAnimation(spritesheet, 0, 0, 524, 591, 0.4, 8, true, false);
    this.attackAnimation = new MyAnimation(spritesheet, 0, 600, 524, 591, 0.2, 8, true, false);
    this.moving = true;
    this.attacking = false;
    this.speed = 100;
    this.ctx = game.ctx;
    this.laneEnd = getLaneEnd(Y);

    // Entity.call(this, game, 248, 469);
    Entity.call(this, game, X, Y);
}

Goblin.prototype = new Entity();
Goblin.prototype.constructor = Goblin;

Goblin.prototype.update = function () {
    if (this.moving) {
        this.x += this.game.clockTick * this.speed;
        if (this.x > this.laneEnd) {
            this.moving = false;
            this.attacking = true;
        }

    }

    Entity.prototype.update.call(this);
}

Goblin.prototype.draw = function () {
    if (this.moving) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.125);
    } else {
        this.attackAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.125);
    }
    Entity.prototype.draw.call(this);
}

// Enemy side
function Orc(game, X, Y) {
    this.walk_animation = new MyAnimation(AM.getAsset("./img/enemy_team/orc/orc_walk.png"), 10, 0, 900, 900, 0.05, 24, true, false);
    this.attack_animation = new MyAnimation(AM.getAsset("./img/enemy_team/orc/orc_actions.png"), 0, 0, 900, 900, 0.05, 12, true, false);
    this.dead_animation = new MyAnimation(AM.getAsset("./img/enemy_team/orc/orc_actions.png"), 0, 1800, 900, 900, 0.05, 12, true, false);
    this.moving = true;
    this.attacking = false;
    this.dead = false;
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, X, Y);
}

Orc.prototype = new Entity();
Orc.prototype.constructor = Orc;

Orc.prototype.update = function () {
    
    if (this.moving) {
        this.x -= this.game.clockTick * this.speed;
        if (this.x < 250) {
            this.moving = false;
            this.attacking = true;
        }
    }
    // if (this.attacking) {
    //     if (this.attack_animation.isDone()) {
    //         this.attack_animation.elapsedTime = 0;
    //         this.attacking = false;
    //     }      
    // }
    Entity.prototype.update.call(this);
}

Orc.prototype.draw = function () {
    if (this.attacking) {
        this.attack_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1);        
    }
    else {
        this.walk_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1); 
    }
    Entity.prototype.draw.call(this);
}

function ReaperMan(game, X, Y) {
    this.walk_animation = new MyAnimation(AM.getAsset("./img/enemy_team/reaper_chibbi/reaper_walk.png"), 10, 0, 900, 900, 0.05, 24, true, false);
    this.attack_animation = new MyAnimation(AM.getAsset("./img/enemy_team/reaper_chibbi/reaper_actions.png"), 0, 0, 900, 900, 0.05, 12, true, false);
    this.dead_animation = new MyAnimation(AM.getAsset("./img/enemy_team/reaper_chibbi/reaper_actions.png"), 0, 1800, 900, 900, 0.05, 12, true, false);
    this.moving = true;
    this.attacking = false;
    this.dead = false;
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, X, Y);
}

ReaperMan.prototype = new Entity();
ReaperMan.prototype.constructor = ReaperMan;

ReaperMan.prototype.update = function () {
    
    if (this.moving) {
        this.x -= this.game.clockTick * this.speed;
        if (this.x < 250) {
            this.moving = false;
            this.attacking = true;
        }
    }
    // if (this.attacking) {
    //     if (this.attack_animation.isDone()) {
    //         this.attack_animation.elapsedTime = 0;
    //         this.attacking = false;
    //     }      
    // }
    Entity.prototype.update.call(this);
}

ReaperMan.prototype.draw = function () {
    if (this.attacking) {
        this.attack_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1);        
    }
    else {
        this.walk_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1); 
    }
    Entity.prototype.draw.call(this);
}

function FallenAngel(game, X, Y) {
    this.walk_animation = new MyAnimation(AM.getAsset("./img/enemy_team/fallen_angel/fallen_walk.png"), 10, 0, 900, 900, 0.05, 24, true, false);
    this.attack_animation = new MyAnimation(AM.getAsset("./img/enemy_team/fallen_angel/fallen_actions.png"), 0, 0, 900, 900, 0.05, 12, true, false);
    this.dead_animation = new MyAnimation(AM.getAsset("./img/enemy_team/fallen_angel/fallen_actions.png"), 0, 1800, 900, 900, 0.05, 12, true, false);
    this.moving = true;
    this.attacking = false;
    this.dead = false;
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, X, Y);
}

FallenAngel.prototype = new Entity();
FallenAngel.prototype.constructor = FallenAngel;

FallenAngel.prototype.update = function () {
    
    if (this.moving) {
        this.x -= this.game.clockTick * this.speed;
        if (this.x < 250) {
            this.moving = false;
            this.attacking = true;
        }
    }
    // if (this.attacking) {
    //     if (this.attack_animation.isDone()) {
    //         this.attack_animation.elapsedTime = 0;
    //         this.attacking = false;
    //     }      
    // }
    Entity.prototype.update.call(this);
}

FallenAngel.prototype.draw = function () {
    if (this.attacking) {
        this.attack_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1);        
    }
    else {
        this.walk_animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.1); 
    }
    Entity.prototype.draw.call(this);
}

// function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
//     this.spriteSheet = spriteSheet;
//     this.frameWidth = frameWidth;
//     this.frameDuration = frameDuration;
//     this.frameHeight = frameHeight;
//     this.sheetWidth = sheetWidth;
//     this.frames = frames;
//     this.totalTime = frameDuration * frames;
//     this.elapsedTime = 0;
//     this.loop = loop;
//     this.scale = scale;
// }

// Animation.prototype.drawFrame = function (tick, ctx, x, y) {
//     this.elapsedTime += tick;
//     if (this.isDone()) {
//         if (this.loop) this.elapsedTime = 0;
//     }
//     var frame = this.currentFrame();
//     var xindex = 0;
//     var yindex = 0;
//     xindex = frame % this.sheetWidth;
//     yindex = Math.floor(frame / this.sheetWidth);

//     ctx.drawImage(this.spriteSheet,
//                  xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
//                  this.frameWidth, this.frameHeight,
//                  x, y,
//                  this.frameWidth * this.scale,
//                  this.frameHeight * this.scale);
// }

// Animation.prototype.currentFrame = function () {
//     return Math.floor(this.elapsedTime / this.frameDuration);
// }

// Animation.prototype.isDone = function () {
//     return (this.elapsedTime >= this.totalTime);
// }

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
        this.game.addEntity(new RedHP(this.game));
        this.game.addEntity(new BlueHP(this.game));
        this.game.addEntity(new ElixirBar(this.game));
        this.game.addEntity(new SuperBar(this.game));

    } else if(this.game.menu.clicked && this.game.menu.id === "medium") {
        this.spritesheet = this.level2;
        this.start = false;
        this.game.addEntity(new RedHP(this.game));
        this.game.addEntity(new BlueHP(this.game));
        this.game.addEntity(new ElixirBar(this.game));
        this.game.addEntity(new SuperBar(this.game));
    } else if(this.game.menu.clicked && this.game.menu.id === "hard") {
        this.spritesheet = this.level3;
        this.start = false;
        this.game.addEntity(new RedHP(this.game));
        this.game.addEntity(new BlueHP(this.game));
        this.game.addEntity(new ElixirBar(this.game));
        this.game.addEntity(new SuperBar(this.game));
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
    if (this.start && this.game.mouseXY != null && (this.game.mouseXY.x >= 610 && this.game.mouseXY.x <= 765) && (this.game.mouseXY.y >= 502 && this.game.mouseXY.y <= 555)) {
        debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/EasyText.png"), 584, 481, 200, 100);
    }
    if (this.start && this.game.mouseXY != null && (this.game.mouseXY.x >= 602 && this.game.mouseXY.x <= 863) && (this.game.mouseXY.y >= 579 && this.game.mouseXY.y <= 629)) {
        debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/MediumText.png"), 583, 551, 300, 100);
    }
    if (this.start && this.game.mouseXY != null && (this.game.mouseXY.x >= 603 && this.game.mouseXY.x <= 777) && (this.game.mouseXY.y >= 649 && this.game.mouseXY.y <= 699)) {
        debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/HardText.png"), 591, 620, 200, 100);
    }
    if (this.start && this.game.mouseXY != null && (this.game.mouseXY.x >= 614 && this.game.mouseXY.x <= 881) && (this.game.mouseXY.y >= 711 && this.game.mouseXY.y <= 771)) {
        debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/TutorialText.png"), 601, 690, 300, 100);
    }
    if (this.start && this.game.mouseXY != null && (this.game.mouseXY.x >= 1280 && this.game.mouseXY.x <= 1406) && (this.game.mouseXY.y >= 751 && this.game.mouseXY.y <= 780)) {
        debugger;
        this.ctx.drawImage(AM.getAsset("./img/Background/SoundText.png"), 1272, 739, 140, 50);
    }

};

Background.prototype.update = function () {
};

// inheritance 
function Fireball(game, spritesheet, X, Y) {
    this.animation = new MyAnimation(spritesheet, 0, 0, 160, 160, 0.15, 12, true, false);
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
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.5);
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
    if (this.game.menu.clicked && this.game.menu.id === "Fireball") {
        this.unitName = "Fireball";
        this.shadow = true;
    } else if (this.game.menu.clicked && this.game.menu.id === "Knight") {
        this.unitName = "Knight";
        this.shadow = true;
    } else if (this.game.menu.clicked && this.game.menu.id === "Bandit") {
        this.unitName = "Bandit";
        this.shadow = true;
    } else if (this.game.menu.clicked && this.game.menu.id === "Samurai") {
        this.unitName = "Samurai";
        this.shadow = true;
    } else if (this.game.menu.clicked && this.game.menu.id === "Goblin") {
        this.unitName = "Goblin";
        this.shadow = true;
    }
    if (this.unitName === "Fireball" && this.shadow){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.drawImage(AM.getAsset("./img/Fireball/Fireball_icon.png"), this.game.mouseXY.x - 50, this.game.mouseXY.y - 50, 85.5, 80);
        this.ctx.restore();
    } else if (this.unitName === "Knight" && this.shadow){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.drawImage(AM.getAsset("./img/Knight/Knight_icon.png"), this.game.mouseXY.x - 50, this.game.mouseXY.y - 50, 85.5, 80);
        this.ctx.restore();
    } else if (this.unitName === "Bandit" && this.shadow){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.drawImage(AM.getAsset("./img/Bandit/Bandit_icon.png"), this.game.mouseXY.x - 50, this.game.mouseXY.y - 50, 85.5, 80);
        this.ctx.restore();
    } else if (this.unitName === "Samurai" && this.shadow){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.drawImage(AM.getAsset("./img/Samurai/Samurai_icon.png"), this.game.mouseXY.x - 50, this.game.mouseXY.y - 50, 85.5, 80);
        this.ctx.restore();
    } else if (this.unitName === "Goblin" && this.shadow){
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.drawImage(AM.getAsset("./img/Goblin/Goblin_icon.png"), this.game.mouseXY.x - 50, this.game.mouseXY.y - 50, 85.5, 80);
        this.ctx.restore();
    }
    if (this.game.lane != null){
        this.lane = this.game.lane;
    }
    if (this.unitName != null && this.lane != null) {
        var laneY;
        if (this.lane === 1) {
            laneY = 385;
        } else if (this.lane === 2) {
            laneY = 468
        } else if (this.lane === 3) {
            laneY = 551;
        }


        if (laneY && this.unitName === "Fireball") {
            this.game.addEntity(new Fireball(this.game, AM.getAsset("./img/Fireball/Fireball.png"), 305, laneY));
            this.unitName = null;
            this.lane = null;
        } else if (laneY && this.unitName === "Knight") {
            this.game.addEntity(new Knight(this.game, AM.getAsset("./img/Knight/Knight.png"), 305, laneY));
            is_enemy_spawn = true;
            this.unitName = null;
            this.lane = null;
        } else if (laneY && this.unitName === "Bandit") {
            this.game.addEntity(new Bandit(this.game, AM.getAsset("./img/Bandit/Bandit.png"), 305, laneY));
            is_enemy_spawn = true;
            this.unitName = null;
            this.lane = null;

        } else if (laneY && this.unitName === "Samurai") {
            this.game.addEntity(new Samurai(this.game, AM.getAsset("./img/Samurai/Samurai.png"), 305, laneY));
            is_enemy_spawn = true;
            this.unitName = null;
            this.lane = null;

        } else if (laneY && this.unitName === "Goblin") {
            this.game.addEntity(new Goblin(this.game, AM.getAsset("./img/Goblin/Goblin.png"), 305, laneY));
            is_enemy_spawn = true;
            this.unitName = null;
            this.lane = null;

        }
        if (count > 3) {
            is_enemy_spawn = false;
        }
        //this.shadow = false;
        if (is_enemy_spawn) {
            if (count > 3) {
                is_enemy_spawn = false;
            }
            count += 1;
            is_enemy_spawn = false; 
            var random_num = Math.floor(Math.random() * Math.floor(4));
            if (random_num === 0) this.game.addEntity(new Orc(this.game, 1000, laneY))
            else if (random_num === 1) this.game.addEntity(new FallenAngel(this.game, 980, laneY))
                    
            else this.game.addEntity(new ReaperMan(this.game, 970, laneY));
            }
                   
       


    }



}

function RedHP(game){
    this.game = game;
    this.ctx = game.ctx;
    this.full = true;
    this.half = false;
    this.quarter = false;

}

RedHP.prototype = new Entity();
RedHP.prototype.constructor = RedHP;

RedHP.prototype.update = function () {
    
}

RedHP.prototype.draw = function () {
    if (this.full){
        this.ctx.fillStyle = "rgb(58, 174, 89)";
    } 
    if (this.quarter){
        this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
    }
    this.ctx.fillRect(288, 137, 296, 34);
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

function ElixirBar(game){
    this.game = game;
    this.ctx = game.ctx;
    this.timemeter = 0;
    this.maxelixir = 338;
    this.speed = 1;
}

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
    Entity.prototype.update.call(this);
}

ElixirBar.prototype.draw = function () {
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
    Entity.prototype.update.call(this);
}

SuperBar.prototype.draw = function () {
    if (this.game.menu.clicked && this.game.menu.id === "Fireball") {
        if(this.x > this.maxelixir - 2){
            this.x = 0;
        }
    }
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
// AM.queueDownload("./img/Fireball.png");
// AM.queueDownload("./img/Fireball_icon.png");
// AM.queueDownload("./img/Knight_icon.png");
// AM.queueDownload("./img/Samurai_icon.png");
// AM.queueDownload("./img/Goblin_icon.png");
// AM.queueDownload("./img/Bandit_icon.png");
// AM.queueDownload("./img/Knight.png");
// AM.queueDownload("./img/Samurai.png");
// AM.queueDownload("./img/Goblin.png");
// AM.queueDownload("./img/Bandit.png");

AM.queueDownload("./img/enemy_team/reaper_chibbi/reaper_walk.png");
AM.queueDownload("./img/enemy_team/reaper_chibbi/reaper_actions.png");
AM.queueDownload("./img/enemy_team/orc/orc_walk.png");
AM.queueDownload("./img/enemy_team/orc/orc_actions.png");
AM.queueDownload("./img/enemy_team/fallen_angel/fallen_walk.png");
AM.queueDownload("./img/enemy_team/fallen_angel/fallen_actions.png");



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
AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Background/Start.png")));
    gameEngine.addEntity(new UnitsControl(gameEngine));
    console.log("All Done!");
});
