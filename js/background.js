Background.prototype.draw = function () {
    if(this.game.menu.clicked && this.game.menu.id === "easy") {
        this.spritesheet = this.level1;
        this.start = false;
        this.game.addEntity(new RedHP(this.game));
        this.game.addEntity(new BlueHP(this.game));
    } else if(this.game.menu.clicked && this.game.menu.id === "medium") {
        this.spritesheet = this.level2;
        this.start = false;
        this.game.addEntity(new RedHP(this.game));
        this.game.addEntity(new BlueHP(this.game));
    } else if(this.game.menu.clicked && this.game.menu.id === "hard") {
        this.spritesheet = this.level3;
        this.start = false;
        this.game.addEntity(new RedHP(this.game));
        this.game.addEntity(new BlueHP(this.game));
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