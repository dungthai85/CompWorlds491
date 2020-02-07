


function Fireball(game, spritesheet, X, Y) {
    this.animation = new MyAnimation(spritesheet, 0, 0, 160, 160, 0.15, 12, true, false);
    this.speed = 100;
    this.ctx = game.ctx;
    this.x = X;
    this.y = Y;
    this.type = "hero";
    this.name = "Fireball";
    this.boundingbox = new BoundingBox(this.x + 67, this.y + 2, 1, this.animation.frameHeight*.35);
    Entity.call(this, game, X, Y);
}

Fireball.prototype = new Entity();
Fireball.prototype.constructor = Fireball;

Fireball.prototype.update = function () {
    for(var i = 0; i < this.game.entities.length; i ++){
        entity = this.game.entities[i];
        if (entity === this) {
            continue;
        }

        if (entity.boundingbox == null) {
            continue;
        }

        //console.log('HERE ' + (this.boundingbox.collide(entity.boundingbox)) + " & "  + entity.type + " - " + this.type );
        if (this.boundingbox.collide(entity.boundingbox) && entity.type !== this.type) {
            entity.removeFromWorld = true;

            break;
        }
    }
    if (this.x < 1135){
        this.x += this.game.clockTick * this.speed;
        this.boundingbox = new BoundingBox(this.x + 67, this.y + 8, 1, this.animation.frameHeight*.35);
        Entity.prototype.update.call(this);
    } 
}

Fireball.prototype.draw = function () {
    if (this.x < 1135){
        //bounding box test
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 0.5);
        Entity.prototype.draw.call(this);
    } 
}