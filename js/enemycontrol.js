function EnemyControl (game, difficulty){
    this.game = game;
    this.ctx = game.ctx;
    this.start_time = new Date();
    this.elapsed = 0;
    this.difficulty = difficulty;
    // this.spawn_lane_position_x = [9]
    this.spawn_lane_position = [370, 455, 535];
}

EnemyControl.prototype = new Entity();
EnemyControl.prototype.constructor = EnemyControl;

EnemyControl.prototype.update = function () {
    // Get current time
    var checkpoint_time = new Date();
    // Calculate time difference, strip the ms, and round it to the second.
    var curr_elapsed = (checkpoint_time - this.start_time)/1000;

    
    // Prevent update too many times
    if (this.difficulty === 1) {
        if (this.elapsed < curr_elapsed - 3) {
            this.game.addEntity(new Orc(this.game,AM.getAsset("./img/enemy_team/orc/orc.png"), 1000, this.spawn_lane_position[Math.floor(Math.random() * 3)]));
            this.game.addEntity(new ReaperMan(this.game,AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"), 1000, this.spawn_lane_position[Math.floor(Math.random() * 3)]));
            this.game.addEntity(new FallenAngel(this.game,AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"), 1000, this.spawn_lane_position[Math.floor(Math.random() * 3)]));
            this.elapsed = curr_elapsed;
        }
    }

    if (this.difficulty === 2) {
        if (this.elapsed < curr_elapsed - 0.5) {
            this.game.addEntity(new Orc(this.game,AM.getAsset("./img/enemy_team/orc/orc.png"), 1000, this.spawn_lane_position[Math.floor(Math.random() * 3)]));
            this.game.addEntity(new ReaperMan(this.game,AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"), 1000, this.spawn_lane_position[Math.floor(Math.random() * 3)]));
            this.game.addEntity(new FallenAngel(this.game,AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"), 1000, this.spawn_lane_position[Math.floor(Math.random() * 3)]));
            this.elapsed = curr_elapsed;
        }
    }

    if (this.difficulty === 3) {
        if (this.elapsed < curr_elapsed) {
            this.game.addEntity(new Orc(this.game,AM.getAsset("./img/enemy_team/orc/orc.png"), 1000, this.spawn_lane_position[Math.floor(Math.random() * 3)]));
            this.game.addEntity(new ReaperMan(this.game,AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"), 1000, this.spawn_lane_position[Math.floor(Math.random() * 3)]));
            this.game.addEntity(new FallenAngel(this.game,AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"), 1000, this.spawn_lane_position[Math.floor(Math.random() * 3)]));
            this.elapsed = curr_elapsed;
        }
    }


}
EnemyControl.prototype.draw = function () {
}


function EnemyHP(game, hp_amount,x ,y, width, height){
    this.game = game;
    this.ctx = game.ctx;
    this.full = true;
    this.half = false;
    this.quarter = false;
    this.type = "enemy";
    // this.name ="enemy_hp";
    this.hp = hp_amount;
    this.hpbar = 296;
    // this.x = 865;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

}

EnemyHP.prototype = new Entity();
EnemyHP.prototype.constructor = EnemyHP;

EnemyHP.prototype.update = function () {
    this.hpbar = 296 - (1 - (this.hp/1000))*296;
    if(this.hpbar < 0){
        this.hpbar = 0;
    }
    else if(this.hp < 500 && this.hp > 250){
        this.full = false;
        this.half = true;
    }
    else if(this.hp <= 250){
        this.half = false;
        this.quarter = true;
    }
    Entity.prototype.update.call(this);   
}

EnemyHP.prototype.draw = function () {
//    // console.log("draw1" + this.hpbar);
//     if (this.full){
//         this.ctx.fillStyle = "rgb(58, 174, 89)";
//     } 
//     else if (this.half){
//         this.ctx.fillStyle = "rgb(255, 174, 66)";
//     } 
//     else if (this.quarter){
//         this.ctx.fillStyle = "rgba(240, 52, 52, 1)";
//     }
//     //console.log("draw" + this.hpbar);
//     this.ctx.fillRect(856, 137, this.hpbar, 34);
//     this.ctx.strokeStyle = "red";
//     //this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
//     // this.ctx.strokeRect(this.boundingbox1.x, this.boundingbox1.y, this.boundingbox1.width, this.boundingbox1.height);
//     // this.ctx.strokeRect(this.boundingbox2.x, this.boundingbox2.y, this.boundingbox2.width, this.boundingbox2.height);
//     // this.ctx.strokeRect(this.boundingbox3.x, this.boundingbox3.y, this.boundingbox3.width, this.boundingbox3.height);
//     // this.ctx.fillRect(856, 137, this.hpbar, 34);
//     Entity.prototype.draw.call(this);
}