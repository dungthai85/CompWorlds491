

/**
*
*This function is to draw the hover for the lanes, the shadow of the characters,
*and also draws the units onto the board.
*/
function UnitsControl (game){
    this.game = game;
    this.type = "unitsControl";
    this.unitName = null;
    this.lane = null;
    this.ctx = game.ctx;
    this.shadow = false;
    this.timemeter = 0;
    this.maxelixir = 338;
    this.speed = 50;
    this.oneElixir = 338/10;
    this.x = 0;
    Entity.call(this, game, 0, 687);
}

UnitsControl.prototype = new Entity();
UnitsControl.prototype.constructor = UnitsControl;

UnitsControl.prototype.update = function () {
    if (this.x < this.maxelixir){
        this.x += this.game.clockTick * this.speed;
    }
    if (this.game.menu.clicked && this.game.menu.id === "Knight" && this.x > 135) {
        this.unitName = "Knight";
        this.shadow = true;
    } else if (this.game.menu.clicked && this.game.menu.id === "Bandit" && this.x > 101) {
        this.unitName = "Bandit";
        this.shadow = true;
    } else if (this.game.menu.clicked && this.game.menu.id === "Samurai" && this.x > 67.6) {
        this.unitName = "Samurai";
        this.shadow = true;
    } else if (this.game.menu.clicked && this.game.menu.id === "Goblin" && this.x > 67.6) {
        this.unitName = "Goblin";
        this.shadow = true;
    }
    if (this.game.lane !== 0 && this.unitName != null){
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
        if (laneY && this.unitName === "Knight") {
            //debugger;
            this.game.addEntity(new Knight(this.game, AM.getAsset("./img/Knight/Knight.png"), 305, laneY));
            this.unitName = null;
            this.lane = null;
            is_enemy_spawn_1 = true;
            if (this.x - this.oneElixir*4 < 96){
                this.x = 0
            } else {
                this.x = this.x - this.oneElixir*4;
            }
        } else if (laneY && this.unitName === "Bandit") {
            this.game.addEntity(new Bandit(this.game, AM.getAsset("./img/Bandit/Bandit.png"), 305, laneY));
            this.unitName = null;
            this.lane = null;
            is_enemy_spawn_2 = true;
            if (this.x - this.oneElixir*3 < 0){
                this.x = 0
            } else {
                this.x = this.x - this.oneElixir*3;
            }

        } else if (laneY && this.unitName === "Samurai") {
            this.game.addEntity(new Samurai(this.game, AM.getAsset("./img/Samurai/Samurai.png"), 305, laneY));
            this.unitName = null;
            this.lane = null;
            is_enemy_spawn_1 = true;
            if (this.x - this.oneElixir*3 < 0){
                this.x = 0
            } else {
                this.x = this.x - this.oneElixir*3;
            }
        } else if (laneY && this.unitName === "Goblin") {
            this.game.addEntity(new Goblin(this.game, AM.getAsset("./img/Goblin/Goblin.png"), 305, laneY));
            this.unitName = null;
            this.lane = null;
            if (this.x - this.oneElixir*2 < 0){
                this.x = 0
            } else {
                this.x = this.x - this.oneElixir*2;
            }
        }
    }
    if (is_enemy_spawn_1) {
        this.game.addEntity(new Orc(this.game,AM.getAsset("./img/enemy_team/orc/orc.png"), 1000, 370));
        this.game.addEntity(new ReaperMan(this.game,AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"), 1000, 455));
        this.game.addEntity(new FallenAngel(this.game,AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"), 1000, 535));
        is_enemy_spawn_1 = false;
    }
    else if (is_enemy_spawn_2) {
        this.game.addEntity(new Orc(this.game,AM.getAsset("./img/enemy_team/orc/orc.png"), 1000, 370));
        this.game.addEntity(new ReaperMan(this.game,AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"), 1000, 455));
        this.game.addEntity(new FallenAngel(this.game,AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"), 1000, 535));
        is_enemy_spawn_2 = false;
    }
    Entity.prototype.update.call(this);
}

UnitsControl.prototype.draw = function () {
    if (this.unitName === "Knight" && this.shadow){
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

    this.ctx.fillStyle = "rgb(255, 0, 89)";
    this.ctx.fillRect(43, 687, this.x, 34);
    Entity.prototype.draw.call(this);
}