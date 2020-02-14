var Orc_attributes = {
    HP : 130,
    DAMAGE : 15,
    SPEED : -35
};

var ReaperMan_attributes = {
    HP : 120,
    DAMAGE : 15,
    SPEED : -40
};

var FallenAngel_attributes = {
    HP : 150,
    DAMAGE : 20,
    SPEED : -25
};

function EnemyControl (game, difficulty){
    this.game = game;
    this.ctx = game.ctx;
    this.start_time = new Date();
    this.elapsed = 0;
    this.difficulty = difficulty;
    this.spawn_lane_position = [[1100, 370], [1125, 455], [1150, 535]];
}

EnemyControl.prototype = new Entity();
EnemyControl.prototype.constructor = EnemyControl;

EnemyControl.prototype.update = function () {
    // Get current time
    var checkpoint_time = new Date();
    // Calculate time difference, strip the ms, and round it to the second.
    var curr_elapsed = (checkpoint_time - this.start_time)/1000;

    
    //Prevent update too many times
    if (this.difficulty === 1) {
        if (this.elapsed < curr_elapsed - 10) {
            this.game.addEntity(new Orc(this.game,AM.getAsset("./img/enemy_team/orc/orc.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.game.addEntity(new ReaperMan(this.game,AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.game.addEntity(new FallenAngel(this.game,AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.elapsed = curr_elapsed;
        }
    }

    if (this.difficulty === 2) {
        if (this.elapsed < curr_elapsed - 2.5) {
            this.game.addEntity(new Orc(this.game,AM.getAsset("./img/enemy_team/orc/orc.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.game.addEntity(new ReaperMan(this.game,AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.game.addEntity(new FallenAngel(this.game,AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.elapsed = curr_elapsed;
        }
    }

    if (this.difficulty === 3) {
        if (this.elapsed < curr_elapsed - 3) {
            this.game.addEntity(new Orc(this.game,AM.getAsset("./img/enemy_team/orc/orc.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.game.addEntity(new ReaperMan(this.game,AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.game.addEntity(new FallenAngel(this.game,AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.elapsed = curr_elapsed;
        }
    }


}
EnemyControl.prototype.draw = function () {
}

function EnemyHP(x ,y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}