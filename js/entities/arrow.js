// JavaScript source code

function Arrow(game, spritesheet, X, Y) {

    this.animation = new MyAnimation(spritesheet, 0, 0, 320, 128, 0.15, 1, true, false);
    this.speed = 200;
    this.ctx = game.ctx;
    this.attackdamage = 25;
    this.x = X;
    this.y = Y;
    this.orginalx = X;
    this.type = "hero";
    this.name = "Arrow";
    this.hit = false;
    this.boundingbox = new BoundingBox(this.x + 46, this.y + 2, 3, this.animation.frameHeight * .35);
    Entity.call(this, game, X, Y);
}

Arrow.prototype = new Entity();
Arrow.prototype.constructor = Arrow;

function determineLane(y) {
    if (y === 385) {
        return 1;
    } else if (y === 468) {
        return 2;
    } else if (y === 551) {
        return 3;
    }

}

Arrow.prototype.update = function () {
    // for (var i = 0; i < this.game.entities.length; i++) {
    //     entity = this.game.entities[i];
    //     if (entity === this) {
    //         continue;
    //     }

    //     if (entity.boundingbox == null) {
    //         continue;
    //     }
    //     //console.log('HERE ' + (this.boundingbox.collide(entity.boundingbox)) + " & "  + entity.type + " - " + this.type );
    //     // if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type || this.x - this.orginalx > 302) {
    //     //         // this.removeFromWorld = true;
    //     //     break;
    //     // }
    // }
    if (this.x - this.orginalx > 320){
        this.removeFromWorld = true;
    }
    if (this.x < 1400) {
        this.x += this.game.clockTick * this.speed;
        // this.boundingbox = new BoundingBox(this.x + 46, this.y +2, 3, this.animation.frameHeight * .35);
        this.boundingbox = new BoundingBox(this.x + 65, this.y +2, 3, this.animation.frameHeight * .35);
        Entity.prototype.update.call(this);
    }
}

Arrow.prototype.draw = function () {
    var offset = 0;
    if (determineLane(this.y) === 1) {
        offset = -14;
    } else if (determineLane(this.y) === 2) {
        offset = -15;
    } else if (determineLane(this.y) === 3) {
        offset = -15;
    }
    if (this.x < 1135) {
        //bounding box test
        // this.ctx.strokeStyle = "red";
        // this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x + (390 * 0.125), this.y + 46 + offset, 0.125);
        Entity.prototype.draw.call(this);
    }
}