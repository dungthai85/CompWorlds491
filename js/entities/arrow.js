// JavaScript source code

function Arrow(game, spritesheet, X, Y) {

    this.animation = new MyAnimation(spritesheet, 0, 0, 320, 128, 0.15, 1, true, false);
    this.speed = 100;
    this.ctx = game.ctx;
    this.x = X;
    this.y = Y;
    this.type = "hero";
    this.name = "Arrow";
    this.boundingbox = new BoundingBox(this.x + 67, this.y + 2, 1, this.animation.frameHeight * .35);
    Entity.call(this, game, X, Y);
}

Arrow.prototype = new Entity();
Arrow.prototype.constructor = Arrow;

Arrow.prototype.update = function () {
    for (var i = 0; i < this.game.entities.length; i++) {
        entity = this.game.entities[i];
        if (entity === this) {
            continue;
        }

        if (entity.boundingbox == null) {
            continue;
        }

        //console.log('HERE ' + (this.boundingbox.collide(entity.boundingbox)) + " & "  + entity.type + " - " + this.type );
        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {

                this.removeFromWorld = true;
            
            break;
        }
    }
    if (this.x < 1135) {
        this.x += this.game.clockTick * this.speed;
        this.boundingbox = new BoundingBox(this.x + 67, this.y + 8, 1, this.animation.frameHeight * .35);
        Entity.prototype.update.call(this);
    }
}

Arrow.prototype.draw = function () {
    if (this.x < 1135) {
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x + (390 * 0.125), this.y + 46, 0.125);
        Entity.prototype.draw.call(this);
    }
}