// JavaScript source code

function Lightning(game, spritesheet, X, Y) {

    this.animation = new MyAnimation(spritesheet, 0, 0, 209, 125, 0.05, 9, true, false);
    this.speed = 200;
    this.ctx = game.ctx;
    this.attackdamage = 150;
    this.orginalx = X;
    this.x = X;
    this.y = Y;
    this.type = "hero";
    this.name = "Spell";
    this.boundingbox = new BoundingBox(this.x + 67, this.y + 2, 3, this.animation.frameHeight * .45);
    Entity.call(this, game, X, Y);
}

Lightning.prototype = new Entity();
Lightning.prototype.constructor = Lightning;

function determineLane(y) {
    if (y === 385) {
        return 1;
    } else if (y === 468) {
        return 2;
    } else if (y === 551) {
        return 3;
    }

}

Lightning.prototype.update = function () {
    // for (var i = 0; i < this.game.entities.length; i++) {
    //     entity = this.game.entities[i];
    //     if (entity === this) {
    //         continue;
    //     }

    //     if (entity.boundingbox == null) {
    //         continue;
    //     }

    //     //console.log('HERE ' + (this.boundingbox.collide(entity.boundingbox)) + " & "  + entity.type + " - " + this.type );
    //     if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type || this.x - this.orginalx > 202) {
           
    //         this.removeFromWorld = true;

    //         break;
    //     }
    // }
    if (this.x - this.orginalx > 210){
        this.removeFromWorld = true;
    }
    if (this.x < 1315) {
        this.x += this.game.clockTick * this.speed;
        this.boundingbox = new BoundingBox(this.x + 120, this.y + 8, 3, this.animation.frameHeight * .45);
        Entity.prototype.update.call(this);
    }
}

Lightning.prototype.draw = function () {
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
       // debugger;
        // this.ctx.strokeStyle = "red";
        // this.ctx.strokeRect(this.boundingbox.x + 21, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x + (390 * 0.25), this.y + 46 + offset, 0.25);

        // this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y - 82.5 + offset, 0.75);
        Entity.prototype.draw.call(this);
    }
}// JavaScript source code
